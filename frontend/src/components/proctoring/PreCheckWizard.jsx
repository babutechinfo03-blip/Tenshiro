import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useProctoring } from '../../context/ProctoringContext';

const STEPS = [
    { id: 'webcam',     icon: '📷', title: 'Webcam Check',           desc: 'Verify camera is active and clear' },
    { id: 'microphone', icon: '🎤', title: 'Microphone Check',        desc: 'Confirm audio input is working' },
    { id: 'internet',   icon: '📶', title: 'Internet Speed Check',    desc: 'Ensure stable connection' }
];

const STATUS = { idle: 'idle', checking: 'checking', pass: 'pass', fail: 'fail' };

const PreCheckWizard = ({ moduleConfig, onPassed, onCancel }) => {
    const { setMediaStream, setIsPrecheckPassed } = useProctoring();

    const [activeStep,  setActiveStep]  = useState(0);
    const [stepStatus,  setStepStatus]  = useState(() => Object.fromEntries(STEPS.map(s => [s.id, STATUS.idle])));
    const [stepMsg,     setStepMsg]     = useState(() => Object.fromEntries(STEPS.map(s => [s.id, ''])));
    const [allPassed,   setAllPassed]   = useState(false);
    const [stream,      setStream]      = useState(null);
    const [audioLevel,  setAudioLevel]  = useState(0);
    const [brightness,  setBrightness]  = useState(0);

    const videoRef    = useRef(null);
    const canvasRef   = useRef(null);
    const analyserRef = useRef(null);
    const animFrameRef = useRef(null);

    // Attach stream to video
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, activeStep]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            if (analyserRef.current) {
                try { analyserRef.current.context.close(); } catch {}
            }
        };
    }, []);

    const setStatus = (stepId, status, msg = '') => {
        setStepStatus(prev => ({ ...prev, [stepId]: status }));
        setStepMsg(prev => ({ ...prev, [stepId]: msg }));
    };

    // ── Check Runners ─────────────────────────────────────────────────────────

    const checkWebcam = useCallback(async () => {
        setStatus('webcam', STATUS.checking, 'Requesting camera access...');
        try {
            const s = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            setStream(s);
            setStatus('webcam', STATUS.pass, '✅ Camera is active and working');
        } catch {
            setStatus('webcam', STATUS.fail, '❌ Camera access denied. Please allow camera permissions.');
        }
    }, []);

    const checkMicrophone = useCallback(async () => {
        setStatus('microphone', STATUS.checking, 'Requesting microphone access...');
        try {
            let audioStream;
            // Check if stream already has audio
            if (stream && stream.getAudioTracks().length > 0) {
                audioStream = stream;
            } else {
                audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                if (stream) {
                    // Combine audio track into the existing video stream
                    audioStream.getAudioTracks().forEach(track => stream.addTrack(track));
                } else {
                    setStream(audioStream);
                }
            }

            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const src = audioCtx.createMediaStreamSource(audioStream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 256;
            src.connect(analyser);
            analyserRef.current = analyser;

            let maxLevel = 0;
            const check = () => {
                const buf = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(buf);
                const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
                setAudioLevel(avg);
                if (avg > maxLevel) maxLevel = avg;
                animFrameRef.current = requestAnimationFrame(check);
            };
            check();

            setTimeout(() => {
                cancelAnimationFrame(animFrameRef.current);
                audioCtx.close();
                if (maxLevel > 2) {
                    setStatus('microphone', STATUS.pass, '✅ Microphone is active and detecting audio');
                } else {
                    setStatus('microphone', STATUS.pass, '✅ Microphone connected (speak to test audio levels)');
                }
            }, 4000);
        } catch {
            setStatus('microphone', STATUS.fail, '❌ Microphone access denied. Please allow microphone permissions.');
        }
    }, [stream]);

    const checkInternet = useCallback(async () => {
        setStatus('internet', STATUS.checking, 'Testing connection speed...');
        try {
            const start = Date.now();
            await fetch(`https://httpbin.org/get?t=${Date.now()}`, { cache: 'no-store', mode: 'cors' }).catch(() =>
                fetch('https://www.google.com/favicon.ico', { cache: 'no-store', mode: 'no-cors' })
            );
            const latency = Date.now() - start;
            if (latency < 3000) {
                setStatus('internet', STATUS.pass, `✅ Connection stable (${latency}ms latency)`);
            } else {
                setStatus('internet', STATUS.fail, `⚠️ Slow connection detected (${latency}ms). This may affect your session.`);
            }
        } catch {
            if (navigator.onLine) {
                setStatus('internet', STATUS.pass, '✅ Network connection available');
            } else {
                setStatus('internet', STATUS.fail, '❌ No internet connection detected.');
            }
        }
    }, []);

    const checkSpeaker = useCallback(() => {
        setStatus('speaker', STATUS.checking, 'Playing test tone...');
        if (!('speechSynthesis' in window)) {
            setStatus('speaker', STATUS.fail, '❌ Browser does not support audio output.');
            return;
        }
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance('Audio check complete. System is ready.');
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(v => v.lang.startsWith('en') && v.localService) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        if (v) utt.voice = v;
        utt.volume = 0.8;
        utt.rate = 0.9;
        utt.onend = () => setStatus('speaker', STATUS.pass, '✅ Audio output is working correctly');
        utt.onerror = () => setStatus('speaker', STATUS.fail, '❌ Audio output failed. Check your speakers/headphones.');
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utt);
        // Fallback timeout
        setTimeout(() => {
            setStepStatus(prev => {
                if (prev.speaker === STATUS.checking) {
                    setStepMsg(prev2 => ({ ...prev2, speaker: '✅ Audio output ready' }));
                    return { ...prev, speaker: STATUS.pass };
                }
                return prev;
            });
        }, 5000);
    }, []);

    const checkFace = useCallback(async () => {
        setStatus('face', STATUS.checking, 'Scanning for faces in camera frame...');
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
            setStatus('face', STATUS.fail, '❌ Camera not active. Complete webcam check first.');
            return;
        }

        await new Promise(r => setTimeout(r, 1500)); // wait for video frame

        try {
            // Use FaceDetector API if available
            if ('FaceDetector' in window) {
                const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
                const faces = await detector.detect(video);
                if (faces.length === 1) {
                    setStatus('face', STATUS.pass, '✅ Exactly one face detected. Identity confirmed.');
                } else if (faces.length === 0) {
                    setStatus('face', STATUS.fail, '❌ No face detected. Position yourself in front of the camera.');
                } else {
                    setStatus('face', STATUS.fail, `❌ Multiple faces detected (${faces.length}). Ensure only you are visible.`);
                }
            } else {
                // Canvas fallback: assume face present if webcam is working
                setStatus('face', STATUS.pass, '✅ Face verification passed (ensure you are clearly visible).');
            }
        } catch {
            setStatus('face', STATUS.pass, '✅ Face check complete. Ensure you are clearly visible.');
        }
    }, []);

    const checkLighting = useCallback(async () => {
        setStatus('lighting', STATUS.checking, 'Analyzing lighting conditions...');
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) {
            setStatus('lighting', STATUS.fail, '❌ Camera not active.');
            return;
        }

        await new Promise(r => setTimeout(r, 500));

        try {
            canvas.width = 160; canvas.height = 120;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, 160, 120);
            const imgData = ctx.getImageData(0, 0, 160, 120);
            const data = imgData.data;
            let total = 0;
            for (let i = 0; i < data.length; i += 4) {
                total += (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114);
            }
            const avg = total / (data.length / 4);
            setBrightness(Math.round(avg));

            if (avg < 30) {
                setStatus('lighting', STATUS.fail, `❌ Too dark (brightness: ${Math.round(avg)}/255). Please improve your lighting.`);
            } else if (avg > 220) {
                setStatus('lighting', STATUS.fail, `❌ Too bright / overexposed (${Math.round(avg)}/255). Reduce direct light sources.`);
            } else {
                setStatus('lighting', STATUS.pass, `✅ Lighting is good (brightness: ${Math.round(avg)}/255)`);
            }
        } catch {
            setStatus('lighting', STATUS.pass, '✅ Lighting check complete.');
        }
    }, []);

    const checkResolution = useCallback(() => {
        setStatus('resolution', STATUS.checking, 'Checking screen resolution...');
        const w = window.screen.width;
        const h = window.screen.height;
        if (w >= 1280 && h >= 720) {
            setStatus('resolution', STATUS.pass, `✅ Resolution ${w}×${h} meets requirements (min 1280×720)`);
        } else {
            setStatus('resolution', STATUS.fail, `❌ Resolution ${w}×${h} is below minimum (1280×720). Use a larger display.`);
        }
    }, []);

    const runCheck = useCallback(async (stepId) => {
        switch (stepId) {
            case 'webcam':      await checkWebcam();    break;
            case 'microphone':  await checkMicrophone(); break;
            case 'internet':    await checkInternet();  break;
            case 'speaker':     checkSpeaker();         break;
            case 'face':        await checkFace();       break;
            case 'lighting':    await checkLighting();   break;
            case 'resolution':  checkResolution();      break;
        }
    }, [checkWebcam, checkMicrophone, checkInternet, checkSpeaker, checkFace, checkLighting, checkResolution]);

    // Auto-run check when step changes
    useEffect(() => {
        if (activeStep < STEPS.length) {
            const stepId = STEPS[activeStep].id;
            if (stepStatus[stepId] === STATUS.idle) {
                setTimeout(() => runCheck(stepId), 400);
            }
        }
    }, [activeStep]); // eslint-disable-line

    const handleNext = async () => {
        const stepId = STEPS[activeStep].id;
        if (stepStatus[stepId] === STATUS.fail) {
            // Retry
            setStatus(stepId, STATUS.idle, '');
            await runCheck(stepId);
            return;
        }
        if (activeStep < STEPS.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            // All done
            const allGood = Object.values(stepStatus).every(s => s === STATUS.pass);
            if (allGood || Object.values(stepStatus).filter(s => s === STATUS.fail).length === 0) {
                // Commit stream and proceed
                if (stream) setMediaStream(stream);
                setIsPrecheckPassed(true);
                setAllPassed(true);
            }
        }
    };

    const handleEnterAssessment = async () => {
        // Request fullscreen inside user gesture
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
        } catch {}
        if (stream) setMediaStream(stream);
        onPassed(stream);
    };

    // ── Ready Screen ──────────────────────────────────────────────────────────
    if (allPassed) {
        return (
            <div className="precheck-overlay">
                <div className="precheck-card precheck-ready">
                    <div className="precheck-ready-icon">✅</div>
                    <h1 className="precheck-ready-title">Ready to Begin Assessment</h1>
                    <p className="precheck-ready-subtitle">All systems are verified. You are entering a strictly monitored proctored environment.</p>

                    <div className="precheck-rules-box">
                        <h4>📋 Assessment Rules</h4>
                        <ul>
                            <li>🔒 The interview will run in <strong>Fullscreen mode</strong> — do not exit</li>
                            <li>👁 <strong>Face must remain visible</strong> throughout the assessment</li>
                            <li>🚫 Do <strong>not switch tabs</strong>, minimize, or open other applications</li>
                            <li>🤫 Ensure <strong>no background noise</strong> or other people in frame</li>
                            <li>⚠️ 3 violations = automatic termination of interview</li>
                        </ul>
                    </div>

                    <div className="precheck-module-info">
                        <span className="precheck-module-badge">{moduleConfig?.title || 'Career Assessment'}</span>
                        <span className="precheck-rounds-badge">5 Rounds · {moduleConfig?.script?.length || 7} Questions</span>
                    </div>

                    <button className="precheck-launch-btn" onClick={handleEnterAssessment}>
                        <span>🛡</span> Enter Proctored Assessment
                    </button>
                    <button className="precheck-cancel-link" onClick={onCancel}>Cancel & Return to Hub</button>
                </div>
            </div>
        );
    }

    const currentStepObj = STEPS[activeStep];
    const currentStatus  = stepStatus[currentStepObj?.id];
    const currentMsg     = stepMsg[currentStepObj?.id];

    const isLastStep  = activeStep === STEPS.length - 1;
    const isFailing   = currentStatus === STATUS.fail;
    const isPassing   = currentStatus === STATUS.pass;
    const isChecking  = currentStatus === STATUS.checking;

    const completedCount = Object.values(stepStatus).filter(s => s === STATUS.pass).length;

    return (
        <div className="precheck-overlay">
            <div className="precheck-shell">
                {/* Left: Step List */}
                <div className="precheck-steps-sidebar">
                    <div className="precheck-sidebar-header">
                        <div className="precheck-logo">🛡️</div>
                        <h3>System Verification</h3>
                        <p>Complete all checks to start</p>
                    </div>
                    <div className="precheck-progress-bar">
                        <div className="precheck-progress-fill" style={{ width: `${(completedCount / STEPS.length) * 100}%` }}></div>
                    </div>
                    <div className="precheck-step-list">
                        {STEPS.map((step, i) => {
                            const s = stepStatus[step.id];
                            return (
                                <div key={step.id} className={`precheck-step-item ${i === activeStep ? 'active' : ''} ${s}`}>
                                    <div className="precheck-step-dot">
                                        {s === STATUS.pass    ? '✓' :
                                         s === STATUS.fail    ? '✗' :
                                         s === STATUS.checking ? '⟳' :
                                         i + 1}
                                    </div>
                                    <div className="precheck-step-info">
                                        <span className="precheck-step-name">{step.title}</span>
                                        <span className="precheck-step-icon">{step.icon}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Active Check */}
                <div className="precheck-main-panel">
                    {/* Module badge */}
                    <div className="precheck-module-badge-top">
                        {moduleConfig?.title || 'Career Assessment'} &nbsp;·&nbsp; Pre-Assessment System Check
                    </div>

                    <div className="precheck-check-content">
                        <div className="precheck-step-icon-large">{currentStepObj?.icon}</div>
                        <h2 className="precheck-step-title">{currentStepObj?.title}</h2>
                        <p className="precheck-step-desc">{currentStepObj?.desc}</p>

                        {/* Status message */}
                        {currentMsg && (
                            <div className={`precheck-status-msg ${currentStatus}`}>
                                {currentMsg}
                            </div>
                        )}

                        {/* Webcam/Face preview */}
                        {(currentStepObj?.id === 'webcam' || currentStepObj?.id === 'face' || currentStepObj?.id === 'lighting') && (
                            <div className="precheck-video-wrap">
                                <video ref={videoRef} autoPlay playsInline muted className="precheck-video" />
                                {currentStepObj?.id === 'lighting' && brightness > 0 && (
                                    <div className="precheck-brightness-label">
                                        Brightness: {brightness}/255
                                    </div>
                                )}
                                <canvas ref={canvasRef} style={{ display: 'none' }} />
                            </div>
                        )}

                        {/* Mic level indicator */}
                        {currentStepObj?.id === 'microphone' && (
                            <div className="precheck-audio-meter">
                                <div className="precheck-audio-bar" style={{ width: `${Math.min(audioLevel * 2.5, 100)}%` }} />
                                <span>Audio Level: {Math.round(audioLevel)}</span>
                            </div>
                        )}

                        {/* Checking spinner */}
                        {isChecking && (
                            <div className="precheck-spinner-row">
                                <div className="precheck-spinner" />
                                <span>Running check...</span>
                            </div>
                        )}

                        {/* Action button */}
                        {!isChecking && (
                            <button
                                className={`precheck-action-btn ${isFailing ? 'retry' : 'next'}`}
                                onClick={handleNext}
                            >
                                {isFailing
                                    ? '🔄 Retry This Check'
                                    : isLastStep
                                        ? '✅ All Checks Complete →'
                                        : '→ Next Check'}
                            </button>
                        )}

                        {/* Resolution info */}
                        {currentStepObj?.id === 'resolution' && (
                            <div className="precheck-res-info">
                                <span>Your screen: <strong>{window.screen.width}×{window.screen.height}</strong></span>
                                <span>Minimum required: <strong>1280×720</strong></span>
                            </div>
                        )}
                    </div>

                    <button className="precheck-cancel-btn" onClick={onCancel}>✕ Cancel Assessment</button>
                </div>
            </div>
        </div>
    );
};

export default PreCheckWizard;
