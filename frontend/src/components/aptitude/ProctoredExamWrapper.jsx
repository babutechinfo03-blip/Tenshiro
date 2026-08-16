import React, { useState, useEffect, useRef } from 'react';
import { useProctoring } from '../../context/ProctoringContext';

const ProctoredExamWrapper = ({ children, config, onCancel }) => {
    const { startProctoring, stopProctoring, setMediaStream } = useProctoring();
    const [step, setStep] = useState(0); // 0: Init, 1: Cam/Mic, 2: Face Verify, 3: Fullscreen, 4: Ready, 5: Active Exam
    const [stream, setLocalStream] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [error, setError] = useState(null);
    
    const videoRef = useRef(null);

    // Attach stream to video element
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream, step]);

    // Cleanup on unmount if exam never started
    useEffect(() => {
        return () => {
            if (step < 5 && stream) {
                stream.getTracks().forEach(t => t.stop());
            }
        };
    }, [step, stream]);


    const requestMedia = async () => {
        setError(null);
        try {
            const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(media);
            setMediaStream(media);
            setStep(2); // Move to Face Verification
        } catch (err) {
            console.error('Media error:', err);
            setError('Camera and Microphone permissions are required to proceed.');
        }
    };

    const startFaceVerification = () => {
        setIsScanning(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setScanProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsScanning(false);
                setStep(3); // Move to Fullscreen / Env check
            }
        }, 100);
    };

    const requestFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            }
            setStep(4); // Ready
        } catch (err) {
            console.error('Fullscreen error:', err);
            setError('Fullscreen mode is required for the proctored environment.');
        }
    };

    const launchExam = () => {
        const isStrict = config?.type === 'company' || config?.type === 'mock' || config?.id?.toLowerCase().includes('mega');
        startProctoring({ isStrict });
        setStep(5);
    };

    if (step === 5) {
        return (
            <div className="proctored-exam-container" style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)', zIndex: 9999, overflowY: 'auto' }}>
                {children}
            </div>
        );
    }

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'var(--bg-primary)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Outfit', sans-serif" }}>
            <style>{`
                .proc-card { background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; width: 100%; max-width: 600px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2); animation: fadeInUp 0.4s ease; }
                .proc-btn { width: 100%; padding: 1.2rem; border-radius: 16px; border: none; font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; margin-top: 1.5rem; }
                .proc-btn-primary { background: linear-gradient(135deg, #1A3263, #6366f1); color: white; box-shadow: 0 10px 20px rgba(99,102,241,0.2); }
                .proc-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 15px 25px rgba(99,102,241,0.3); }
                .proc-btn-danger { background: transparent; color: #ef4444; border: 1px solid #ef444430; margin-top: 1rem; }
                .scan-line { position: absolute; left: 0; right: 0; height: 3px; background: #00ff00; box-shadow: 0 0 15px #00ff00; animation: scan 2s infinite ease-in-out; }
                @keyframes scan { 0% { top: 10%; } 50% { top: 90%; } 100% { top: 10%; } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div style={{ position: 'absolute', top: 30, left: 30, fontSize: '1.2rem', fontWeight: 900, color: '#6366f1', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}></div>
                AI-Proctored Environment
            </div>

            <div className="proc-card">
                {error && <div style={{ background: '#ef444415', color: '#ef4444', padding: '1rem', borderRadius: 12, marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.9rem' }}>{error}</div>}

                {step === 0 && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛡️</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>Strict Proctored Exam</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>This assessment requires a secure environment. You will need to grant Camera and Microphone access, verify your identity, and enter Fullscreen mode.</p>
                        <div style={{ display: 'grid', gap: '1rem', textAlign: 'left', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: 15, alignItems: 'center', background: 'var(--bg-primary)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '1.5rem' }}>📷</span> <div><strong>Camera Tracking:</strong> Monitors focus and presence.</div>
                            </div>
                            <div style={{ display: 'flex', gap: 15, alignItems: 'center', background: 'var(--bg-primary)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '1.5rem' }}>🎤</span> <div><strong>Audio Monitoring:</strong> Detects background voices.</div>
                            </div>
                            <div style={{ display: 'flex', gap: 15, alignItems: 'center', background: 'var(--bg-primary)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border)' }}>
                                <span style={{ fontSize: '1.5rem' }}>🖥️</span> <div><strong>Environment Lock:</strong> Tab switching is prohibited.</div>
                            </div>
                        </div>
                        <button className="proc-btn proc-btn-primary" onClick={() => setStep(1)}>Begin System Checks →</button>
                    </>
                )}

                {step === 1 && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎥</div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>Grant Permissions</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Please allow access to your camera and microphone when prompted by your browser.</p>
                        <button className="proc-btn proc-btn-primary" onClick={requestMedia}>Request Access</button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>AI Face Verification</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please look directly into the camera to verify your identity.</p>
                        
                        <div style={{ width: 280, height: 280, margin: '0 auto', borderRadius: '50%', overflow: 'hidden', border: `4px solid ${isScanning ? '#00ff00' : 'var(--border)'}`, position: 'relative', background: '#000' }}>
                            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}></video>
                            {isScanning && <div className="scan-line"></div>}
                        </div>

                        {isScanning ? (
                            <div style={{ marginTop: '2rem' }}>
                                <div style={{ color: '#00ff00', fontWeight: 800, marginBottom: '0.5rem' }}>Analyzing Facial Coordinates... {scanProgress}%</div>
                                <div style={{ height: 6, background: 'var(--border)', borderRadius: 10, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${scanProgress}%`, background: '#00ff00', transition: 'width 0.1s' }}></div>
                                </div>
                            </div>
                        ) : (
                            <button className="proc-btn proc-btn-primary" onClick={startFaceVerification}>Start Verification Scan</button>
                        )}
                    </>
                )}

                {step === 3 && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔲</div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>Secure Exam Environment</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>To prevent unauthorized access to other applications, the exam must run in Fullscreen mode. Exiting Fullscreen during the test will result in a violation.</p>
                        <button className="proc-btn proc-btn-primary" onClick={requestFullscreen}>Enter Fullscreen Mode</button>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', marginBottom: '1rem' }}>System Ready</h2>
                        <p style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '2rem' }}>All checks passed. You are entering a strictly monitored zone.</p>
                        
                        <div style={{ background: '#05966915', border: '1px solid #05966930', padding: '1.5rem', borderRadius: 16, textAlign: 'left', marginBottom: '2rem' }}>
                            <h4 style={{ margin: '0 0 1rem 0', color: '#059669', fontSize: '1rem' }}>Rules of Engagement:</h4>
                            <ul style={{ margin: 0, paddingLeft: 20, color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                                <li>Do not look away from the screen for extended periods.</li>
                                <li>Do not exit fullscreen or switch tabs.</li>
                                <li>Ensure no other faces enter the camera frame.</li>
                                <li>Do not talk or allow background noise.</li>
                            </ul>
                        </div>

                        <button className="proc-btn proc-btn-primary" onClick={launchExam}>Acknowledge & Start Exam</button>
                    </>
                )}

                <button className="proc-btn proc-btn-danger" onClick={onCancel}>Cancel & Return to Dashboard</button>
            </div>
        </div>
    );
};

export default ProctoredExamWrapper;
