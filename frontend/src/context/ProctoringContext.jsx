import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ProctoringContext = createContext(null);

const SESSION_KEY = 'tenshiro_proctor_session';

export const ProctoringProvider = ({ children }) => {
    // ── Core State ────────────────────────────────────────────────────────────
    const [isProctoringActive, setIsProctoringActive] = useState(false);
    const [strictMode, setStrictMode]               = useState(false);
    const [violations, setViolations]               = useState([]);
    const [violationCount, setViolationCount]       = useState(0);
    const [maxViolations, setMaxViolations]         = useState(3);
    const [currentWarning, setCurrentWarning]       = useState(null);
    const [mediaStream, setMediaStream]             = useState(null);
    const [isTerminated, setIsTerminated]           = useState(false);

    // ── New Proctoring State ───────────────────────────────────────────────────
    const [integrityScore, setIntegrityScore]       = useState(100);
    const [faceStatus, setFaceStatus]               = useState('ok'); // 'ok' | 'missing' | 'multiple' | 'looking_away'
    const [audioStatus, setAudioStatus]             = useState('clean'); // 'clean' | 'suspicious'
    const [networkStatus, setNetworkStatus]         = useState('good'); // 'good' | 'slow' | 'offline'
    const [tabSwitchCount, setTabSwitchCount]       = useState(0);
    const [fullscreenExitCount, setFullscreenExitCount] = useState(0);
    const [snapshots, setSnapshots]                 = useState([]); // base64 images
    const [currentRound, setCurrentRound]           = useState('HR Round');
    const [questionNumber, setQuestionNumber]       = useState(1);
    const [totalQuestions, setTotalQuestions]       = useState(1);
    const [isPrecheckPassed, setIsPrecheckPassed]   = useState(false);
    const [sessionId]                               = useState(() => `session_${Date.now()}`);
    const [sessionStartTime]                        = useState(() => new Date().toISOString());
    const [moduleId, setModuleId]                   = useState(null);
    const [moduleTitle, setModuleTitle]             = useState('');

    // ── Refs ──────────────────────────────────────────────────────────────────
    const lastViolationRef   = useRef(0);
    const snapshotTimerRef   = useRef(null);
    const networkTimerRef    = useRef(null);
    const videoRefForSnap    = useRef(null); // set externally
    const isProctoringRef    = useRef(false);
    const isTerminatedRef    = useRef(false);

    // Keep refs in sync
    useEffect(() => { isProctoringRef.current = isProctoringActive; }, [isProctoringActive]);
    useEffect(() => { isTerminatedRef.current = isTerminated; }, [isTerminated]);

    // ── Integrity Score Helpers ────────────────────────────────────────────────
    const deductIntegrity = useCallback((points) => {
        setIntegrityScore(prev => Math.max(0, prev - points));
    }, []);

    // ── Violation Logger ─────────────────────────────────────────────────────
    const logViolation = useCallback((type, message, severity = 'warning') => {
        if (!isProctoringRef.current || isTerminatedRef.current) return;

        // Debounce violations (1.5 seconds)
        const now = Date.now();
        if (now - lastViolationRef.current < 1500) return;
        lastViolationRef.current = now;

        const violation = {
            id: now.toString(),
            type,
            message,
            severity, // 'warning' | 'critical'
            timestamp: new Date().toISOString()
        };

        setViolations(prev => [violation, ...prev]);

        // Track specific types
        if (type === 'tab_hidden' || type === 'blur') {
            setTabSwitchCount(prev => prev + 1);
        }
        if (type === 'fullscreen_exit') {
            setFullscreenExitCount(prev => prev + 1);
            // Re-enforce fullscreen immediately
            document.documentElement.requestFullscreen().catch(() => {});
        }

        // Integrity deduction
        const deduction = severity === 'critical' ? 20 : 10;
        deductIntegrity(deduction);

        setViolationCount(prev => {
            const nextCount = prev + 1;

            if (nextCount >= maxViolations) {
                setIsTerminated(true);
                isTerminatedRef.current = true;
                setCurrentWarning({
                    level: 'terminated',
                    title: '⛔ Interview Terminated',
                    message: 'You have exceeded the maximum number of violations. Your interview has been automatically terminated.',
                    canDismiss: false
                });
            } else if (nextCount === 2) {
                setCurrentWarning({
                    level: 'critical',
                    title: '🔴 Final Warning — One More Will Terminate',
                    message: `Violation #${nextCount}: ${message}. One more violation will permanently terminate your interview.`,
                    canDismiss: true
                });
            } else {
                setCurrentWarning({
                    level: 'warning',
                    title: `⚠️ Integrity Violation #${nextCount}`,
                    message: `${message} This has been logged and will affect your Integrity Score.`,
                    canDismiss: true
                });
            }
            return nextCount;
        });
    }, [maxViolations, deductIntegrity]);

    // ── Snapshot Capture ──────────────────────────────────────────────────────
    const captureSnapshot = useCallback(() => {
        const video = videoRefForSnap.current;
        if (!video || !isProctoringRef.current || isTerminatedRef.current) return;
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 240;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 320, 240);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
            const snap = { id: Date.now().toString(), dataUrl, timestamp: new Date().toISOString() };
            setSnapshots(prev => [...prev, snap]);
        } catch (e) {
            console.warn('Snapshot capture failed:', e);
        }
    }, []);

    // ── Network Monitoring ────────────────────────────────────────────────────
    const checkNetwork = useCallback(async () => {
        if (!isProctoringRef.current) return;
        if (!navigator.onLine) {
            setNetworkStatus('offline');
            logViolation('network_offline', 'Network connection lost during assessment.', 'warning');
            return;
        }
        try {
            const start = Date.now();
            await fetch('https://www.google.com/favicon.ico', { cache: 'no-store', mode: 'no-cors' });
            const latency = Date.now() - start;
            setNetworkStatus(latency > 3000 ? 'slow' : 'good');
        } catch {
            setNetworkStatus('slow');
        }
    }, [logViolation]);

    // ── Proctor Controls ──────────────────────────────────────────────────────
    const startProctoring = useCallback(({ isStrict = false, modId = null, modTitle = '', totalQ = 7 } = {}) => {
        setIsProctoringActive(true);
        isProctoringRef.current = true;
        setStrictMode(isStrict);
        setMaxViolations(1); // One violation = automatic termination
        setViolationCount(0);
        setViolations([]);
        setIsTerminated(false);
        isTerminatedRef.current = false;
        setCurrentWarning(null);
        setIntegrityScore(100);
        setFaceStatus('ok');
        setAudioStatus('clean');
        setNetworkStatus('good');
        setTabSwitchCount(0);
        setFullscreenExitCount(0);
        setSnapshots([]);
        setCurrentRound('HR Round');
        setQuestionNumber(1);
        setTotalQuestions(totalQ);
        setModuleId(modId);
        setModuleTitle(modTitle);

        // Start periodic snapshots (every 30s)
        snapshotTimerRef.current = setInterval(captureSnapshot, 30000);
        // Network check every 60s
        networkTimerRef.current = setInterval(checkNetwork, 60000);
    }, [captureSnapshot, checkNetwork]);

    const stopProctoring = useCallback(() => {
        setIsProctoringActive(false);
        isProctoringRef.current = false;
        clearInterval(snapshotTimerRef.current);
        clearInterval(networkTimerRef.current);
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
        }
    }, [mediaStream]);

    const acknowledgeWarning = useCallback(() => {
        setCurrentWarning(null);
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    }, []);

    // ── Global Event Listeners (active only during proctoring) ────────────────
    useEffect(() => {
        if (!isProctoringActive || isTerminated) return;

        const handleBlur = () => logViolation('blur', 'Focus lost: Switched to another application.', 'warning');
        const handleVisibilityChange = () => {
            if (document.hidden && !isTerminatedRef.current) {
                setTabSwitchCount(c => c + 1);
                // Immediately terminate on tab switch
                logViolation('tab_switch', 'You navigated away from the interview tab.', 'critical');
                setIsTerminated(true);
                isTerminatedRef.current = true;
                setCurrentWarning({
                    level: 'terminated',
                    title: '⛔ Interview Terminated',
                    message: 'You have navigated away from the interview tab, which is a critical violation of the proctoring rules.',
                    canDismiss: false
                });
            }
        };
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                logViolation('fullscreen_exit', 'You exited fullscreen mode. This is not allowed during assessment.', 'warning');
            }
        };
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
            logViolation('beforeunload', 'Attempted to refresh or close the browser window.', 'critical');
        };
        const blockEvent = (e) => e.preventDefault();

        window.addEventListener('blur', handleBlur);
        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('contextmenu', blockEvent);
        document.addEventListener('copy', blockEvent);
        document.addEventListener('paste', blockEvent);
        document.addEventListener('selectstart', blockEvent);

        return () => {
            window.removeEventListener('blur', handleBlur);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('contextmenu', blockEvent);
            document.removeEventListener('copy', blockEvent);
            document.removeEventListener('paste', blockEvent);
            document.removeEventListener('selectstart', blockEvent);
        };
    }, [isProctoringActive, isTerminated, logViolation]);

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    useEffect(() => {
        return () => {
            clearInterval(snapshotTimerRef.current);
            clearInterval(networkTimerRef.current);
            if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
        };
    }, [mediaStream]);

    // ── Report Generator ──────────────────────────────────────────────────────
    const generateFinalReport = useCallback((scores = {}) => {
        const report = {
            sessionId,
            sessionStartTime,
            moduleId,
            moduleTitle,
            completedAt: new Date().toISOString(),
            integrityScore,
            violationCount,
            violations,
            snapshots: snapshots.length,
            tabSwitchCount,
            fullscreenExitCount,
            scores,
            hiringProbability: integrityScore > 85 && (scores.overall || 80) > 75 ? 'High' : 'Medium'
        };
        // Persist to localStorage
        try {
            const existing = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
            existing.unshift(report);
            localStorage.setItem(SESSION_KEY, JSON.stringify(existing.slice(0, 20))); // keep last 20
        } catch (e) {}
        return report;
    }, [sessionId, sessionStartTime, moduleId, moduleTitle, integrityScore, violationCount, violations, snapshots, tabSwitchCount, fullscreenExitCount]);

    return (
        <ProctoringContext.Provider value={{
            // State
            isProctoringActive, strictMode, violationCount, maxViolations,
            violations, currentWarning, mediaStream, isTerminated,
            integrityScore, faceStatus, audioStatus, networkStatus,
            tabSwitchCount, fullscreenExitCount, snapshots,
            currentRound, questionNumber, totalQuestions,
            isPrecheckPassed, sessionId, moduleId, moduleTitle,
            // Setters
            setMediaStream, setFaceStatus, setAudioStatus, setNetworkStatus,
            setCurrentRound, setQuestionNumber, setTotalQuestions,
            setIsPrecheckPassed, videoRefForSnap,
            // Actions
            startProctoring, stopProctoring, acknowledgeWarning,
            logViolation, captureSnapshot, generateFinalReport, deductIntegrity
        }}>
            {children}
        </ProctoringContext.Provider>
    );
};

export const useProctoring = () => useContext(ProctoringContext);
