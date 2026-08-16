import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaForward, FaVolumeUp } from 'react-icons/fa';
import { SIMULATION_MODULES, generateNextResponse } from '../components/simulation/SimulationEngine';
import { useProctoring } from '../context/ProctoringContext';

import PreCheckWizard from '../components/proctoring/PreCheckWizard';
import ProctorPanel from '../components/proctoring/ProctorPanel';
import TopStatusBar from '../components/proctoring/TopStatusBar';
import ViolationOverlay from '../components/proctoring/ViolationOverlay';
import CandidateFeed from '../components/proctoring/CandidateFeed';
import AssessmentReport from './AssessmentReport';
import './CareerSimulation.css';

const CareerSimulationRoom = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const moduleId = location.state?.moduleId || 'corporate';
    const moduleTitle = location.state?.moduleTitle || 'Assessment';
    const moduleConfig = SIMULATION_MODULES[moduleId] || SIMULATION_MODULES['corporate'];

    const {
        startProctoring, stopProctoring, generateFinalReport,
        isProctoringActive, isTerminated, setQuestionNumber, setCurrentRound,
        integrityScore
    } = useProctoring();

    // ── Shell State ──────────────────────────────────────────────────────────
    const [phase, setPhase] = useState('precheck'); // 'precheck' | 'interview' | 'report'
    const [finalReport, setFinalReport] = useState(null);

    // ── Interview State ──────────────────────────────────────────────────────
    const [activeSpeakerId, setActiveSpeakerId] = useState(null);
    const [currentQuestionText, setCurrentQuestionText] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [ttsStatus, setTtsStatus] = useState('Initializing...');
    const [timeRemaining, setTimeRemaining] = useState(1800); // 30 mins
    const [hesitations, setHesitations] = useState(0);

    // ── Refs ─────────────────────────────────────────────────────────────────
    const stepRef = useRef(0);
    const recognitionRef = useRef(null);
    const answerTextRef = useRef('');
    const videoRefs = useRef({});
    const activeSpeakerRef = useRef(null);
    const isFinishedRef = useRef(false);
    const voicesRef = useRef([]);

    // ── Load Voices ─────────────────────────────────────────────────────────
    useEffect(() => {
        const load = () => voicesRef.current = window.speechSynthesis.getVoices();
        if ('speechSynthesis' in window) {
            load();
            window.speechSynthesis.onvoiceschanged = load;
        }
    }, []);

    // ── Speech Recognition ──────────────────────────────────────────────────
    useEffect(() => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;
        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event) => {
            let finalPart = '';
            let interimPart = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalPart += event.results[i][0].transcript;
                } else {
                    interimPart += event.results[i][0].transcript;
                }
            }
            if (finalPart) {
                answerTextRef.current = (answerTextRef.current + ' ' + finalPart).trim();
            }
            setAnswerText((answerTextRef.current + ' ' + interimPart).trim());
        };

        rec.onend = () => {
            if (phase === 'interview' && !activeSpeakerRef.current && !isFinishedRef.current && !isTerminated) {
                // Keep listening until manual submit
                try { rec.start(); } catch {}
            }
        };

        rec.onerror = () => setIsRecording(false);
        recognitionRef.current = rec;

        return () => { try { rec.stop(); } catch {} };
    }, [phase, isTerminated]); // autoSubmitAnswer handles the logic

    // ── Video Sync ──────────────────────────────────────────────────────────
    useEffect(() => {
        Object.entries(videoRefs.current).forEach(([id, el]) => {
            if (el) id === activeSpeakerId ? el.play().catch(()=>{}) : el.pause();
        });
    }, [activeSpeakerId]);

    // ── Timer ───────────────────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'interview' || isTerminated) return;
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    handleEndInterview();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [phase, isTerminated]);

    // ── TTS engine ──────────────────────────────────────────────────────────
    const speakAI = useCallback((panelist, text) => {
        if (!('speechSynthesis' in window)) return;
        window.speechSynthesis.resume();
        window.speechSynthesis.cancel();

        setActiveSpeakerId(panelist.id);
        activeSpeakerRef.current = panelist.id;
        setCurrentQuestionText(text);
        setIsRecording(false);
        try { recognitionRef.current?.stop(); } catch {}

        const utt = new SpeechSynthesisUtterance(text);
        const voice = voicesRef.current.find(v => panelist.voice && v.name.toLowerCase().includes(panelist.voice.toLowerCase()))
            || voicesRef.current.find(v => v.lang.startsWith('en'))
            || voicesRef.current[0];
        if (voice) utt.voice = voice;
        utt.rate = 0.95;

        let done = false;
        const onEnd = () => {
            if (done) return;
            done = true;
            setActiveSpeakerId(null);
            activeSpeakerRef.current = null;
            setTtsStatus('Your turn — speak your answer');

            if (!isFinishedRef.current && !isTerminated) {
                setTimeout(() => {
                    try {
                        answerTextRef.current = '';
                        setAnswerText('');
                        recognitionRef.current?.start();
                        setIsRecording(true);
                    } catch {}
                }, 400);
            }
        };
        utt.onend = onEnd;
        utt.onerror = onEnd;

        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utt);
    }, [isTerminated]);

    // ── Submit Answer ───────────────────────────────────────────────────────
    const autoSubmitAnswer = useCallback((text) => {
        setIsRecording(false);
        try { recognitionRef.current?.stop(); } catch {}

        const fillers = (text.match(/\b(um|uh|like|you know)\b/gi) || []).length;
        setHesitations(prev => prev + fillers);
        setAnswerText('');
        answerTextRef.current = '';
        setTtsStatus('Panel evaluating...');

        setTimeout(() => {
            const currentStep = stepRef.current;
            const nextAction = generateNextResponse(moduleConfig, currentStep, text);
            if (nextAction) {
                stepRef.current = currentStep + 1;
                setQuestionNumber(Math.min(currentStep + 2, moduleConfig.script.length));
                // Hacky round detection based on step (for demo)
                const roundLabels = ['HR Round', 'Technical Round', 'Project Round', 'Managerial Round', 'Final Evaluation'];
                setCurrentRound(roundLabels[Math.min(Math.floor(currentStep / 1.5), 4)]);
                
                speakAI(nextAction.speaker, nextAction.text);
            } else {
                handleEndInterview();
            }
        }, 1500);
    }, [moduleConfig, speakAI, setQuestionNumber, setCurrentRound]);

    // ── Lifecycle ───────────────────────────────────────────────────────────
    const handlePreCheckPassed = () => {
        startProctoring({
            isStrict: true,
            modId: moduleId,
            modTitle: moduleTitle,
            totalQ: moduleConfig.script.length
        });
        setPhase('interview');
        
        // Start interview script
        stepRef.current = 1;
        setQuestionNumber(1);
        setCurrentRound('HR Round');
        const first = moduleConfig.script[0];
        const speaker = moduleConfig.panel.find(p => p.id === first.speaker);
        setTimeout(() => speakAI(speaker, first.text), 1000); // Wait for transition
    };

    const handlePreCheckCancel = () => {
        navigate('/career-simulation');
    };

    const handleEndInterview = useCallback(() => {
        isFinishedRef.current = true;
        try { recognitionRef.current?.stop(); } catch {}
        stopProctoring();

        // Calculate scores
        const commScore = Math.max(50, 95 - (hesitations * 2));
        const techScore = Math.floor(Math.random() * 15) + 75; // Mock
        const overallScore = Math.floor((commScore + techScore + integrityScore) / 3);

        const report = generateFinalReport({
            overall: overallScore,
            communication: commScore,
            technical: techScore,
            confidence: Math.floor(Math.random() * 10) + 80,
            leadership: Math.floor(Math.random() * 15) + 75
        });

        setFinalReport(report);
        setPhase('report');
    }, [hesitations, integrityScore, generateFinalReport, stopProctoring]);

    // Auto-end if terminated
    useEffect(() => {
        if (isTerminated && phase === 'interview') {
            handleEndInterview();
        }
    }, [isTerminated, phase, handleEndInterview]);

    // ── Render ──────────────────────────────────────────────────────────────
    if (phase === 'precheck') {
        return <PreCheckWizard moduleConfig={moduleConfig} onPassed={handlePreCheckPassed} onCancel={handlePreCheckCancel} />;
    }

    if (phase === 'report') {
        return <AssessmentReport report={finalReport} onReturn={() => navigate('/career-simulation')} />;
    }

    const isSpeakingPanelist = activeSpeakerId !== null;

    return (
        <div className={`proctored-room-shell theme-${moduleConfig.theme}`}>
            <ViolationOverlay />
            
            <div className="proctored-layout">
                {/* Main Assessment Area */}
                <div className="proctored-main-col">
                    <TopStatusBar timeRemaining={timeRemaining} onEndInterview={handleEndInterview} />
                    
                    <div className="room-center-stage">
                        <div className="panel-members-container">
                            {moduleConfig.panel.map(panelist => {
                                const isSpeaking = activeSpeakerId === panelist.id;
                                const isMuted = isSpeakingPanelist && !isSpeaking;

                                return (
                                    <div key={panelist.id} className={`interview-video-wrapper ${isSpeaking ? 'speaking' : ''} ${isMuted ? 'muted-panelist' : ''}`}>
                                        <video
                                            src={panelist.video}
                                            poster={panelist.poster}
                                            loop muted playsInline
                                            ref={el => videoRefs.current[panelist.id] = el}
                                            className="live-video"
                                        />
                                        <div className="panelist-badge">
                                            <span className="badge-name">{panelist.name}</span>
                                            <span className="badge-role">{panelist.role}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Question Text */}
                        {activeSpeakerId && (
                            <div className="question-overlay-card">
                                <div className="question-speaker-name">
                                    {moduleConfig.panel.find(p => p.id === activeSpeakerId)?.name}
                                </div>
                                <div className="question-text">"{currentQuestionText}"</div>
                            </div>
                        )}
                    </div>

                    <div className="candidate-response-area">
                        <div className="tts-status">{ttsStatus}</div>
                        {!isSpeakingPanelist && !isTerminated ? (
                            <div className="response-live-container">
                                <div className="speaking-indicator live">
                                    <div className="dot" /> Listening...
                                </div>
                                {answerText && <div className="live-transcript">"{answerText}"</div>}
                                <div className="response-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                                    <button className="btn-primary" onClick={() => autoSubmitAnswer(answerTextRef.current)}>
                                        Submit Answer
                                    </button>
                                    <button className="action-btn skip-btn" onClick={() => autoSubmitAnswer('')}>
                                        Skip Question <FaForward />
                                    </button>
                                </div>
                            </div>
                        ) : <div style={{ height: 80 }} />}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="proctored-side-col">
                    <CandidateFeed />
                    <ProctorPanel />
                </div>
            </div>
        </div>
    );
};

export default CareerSimulationRoom;
