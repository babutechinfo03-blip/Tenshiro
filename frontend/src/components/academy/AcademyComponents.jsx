import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaCheckCircle, FaTimesCircle, FaTrophy, FaFire, FaRobot, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const API = 'http://localhost:5000/api';

// ----------------------------------------------------------------------
// 1. Live Code Editor
// ----------------------------------------------------------------------
export const LiveEditor = ({ codeSnippet, language }) => {
    const [code, setCode] = useState(codeSnippet || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    const handleRun = () => {
        setIsRunning(true);
        setOutput('');
        setTimeout(() => {
            if (language === 'javascript' || language === 'js') {
                try {
                    let logs = [];
                    const originalLog = console.log;
                    console.log = (...args) => logs.push(args.join(' '));
                    new Function(code)();
                    console.log = originalLog;
                    setOutput(logs.join('\n') || 'Execution complete. No output.');
                } catch (error) {
                    setOutput('Error: ' + error.message);
                }
            } else if (language === 'html') {
                setOutput('HTML preview active.');
            } else {
                setOutput('Simulated Output for ' + language + ':\nRunning code...\nCode executed successfully.');
            }
            setIsRunning(false);
        }, 600);
    };

    return (
        <div style={{ background: '#1e1e1e', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #333', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#252526', borderBottom: '1px solid #333' }}>
                <span style={{ color: '#cecece', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>
                    Try it Yourself — {language}
                </span>
                <button
                    onClick={handleRun}
                    disabled={isRunning}
                    style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '0.5rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}
                >
                    <FaPlay size={10} /> {isRunning ? 'Running...' : 'Run Code'}
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck="false"
                    style={{ background: 'transparent', color: '#9cdcfe', border: 'none', padding: '1rem', fontFamily: 'monospace', minHeight: '150px', resize: 'vertical', outline: 'none', fontSize: '0.95rem' }}
                />
                {language === 'html' ? (
                    <div style={{ borderTop: '1px solid #333', padding: '1rem', background: 'white', color: 'black', minHeight: '100px' }} dangerouslySetInnerHTML={{ __html: code }} />
                ) : (
                    <div style={{ borderTop: '1px solid #333', padding: '1rem', background: '#1e1e1e', color: '#ce9178', minHeight: '100px', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                        {output || 'Output will appear here...'}
                    </div>
                )}
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 2. MCQ Quiz Engine
// ----------------------------------------------------------------------
export const QuizEngine = ({ quizData, onComplete }) => {
    const [selectedOpt, setSelectedOpt] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    if (!quizData) return null;

    const isCorrect = selectedOpt === quizData.correct_answer;

    const handleSubmit = () => {
        setSubmitted(true);
        if (isCorrect && onComplete) onComplete();
    };

    return (
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: '1.1rem' }}>Knowledge Check</h3>
            <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>{quizData.question}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {quizData.options.map((opt, idx) => {
                    let btnStyle = {
                        textAlign: 'left', padding: '1rem', borderRadius: '0.5rem',
                        border: '1px solid var(--border)', background: 'transparent',
                        cursor: 'pointer', transition: '0.2s', color: 'var(--text-main)'
                    };
                    if (submitted) {
                        if (opt === quizData.correct_answer) {
                            btnStyle.background = 'rgba(16, 185, 129, 0.1)';
                            btnStyle.borderColor = '#10b981';
                        } else if (opt === selectedOpt && !isCorrect) {
                            btnStyle.background = 'rgba(239, 68, 68, 0.1)';
                            btnStyle.borderColor = '#ef4444';
                        }
                    } else if (selectedOpt === opt) {
                        btnStyle.borderColor = 'var(--primary)';
                        btnStyle.background = 'rgba(212, 175, 55, 0.05)';
                    }
                    return (
                        <button key={idx} onClick={() => !submitted && setSelectedOpt(opt)} style={btnStyle}>
                            {opt}
                        </button>
                    );
                })}
            </div>
            {!submitted ? (
                <button
                    onClick={handleSubmit}
                    disabled={!selectedOpt}
                    style={{ marginTop: '1.5rem', width: '100%', background: 'var(--primary)', color: 'black', padding: '0.75rem', borderRadius: '0.5rem', border: 'none', fontWeight: 600, cursor: 'pointer', opacity: selectedOpt ? 1 : 0.5 }}
                >
                    Submit Answer
                </button>
            ) : (
                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: isCorrect ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                    {isCorrect ? <FaCheckCircle /> : <FaTimesCircle />}
                    {isCorrect ? 'Correct! You earned 50 XP.' : 'Incorrect. Review the theory and try again.'}
                </div>
            )}
        </div>
    );
};

// ----------------------------------------------------------------------
// 3. Gamification HUD
// ----------------------------------------------------------------------
export const GamificationHUD = ({ profile }) => {
    if (!profile) return null;
    const currentLevelXP = profile.xp % 500;
    const progressPercent = (currentLevelXP / 500) * 100;

    return (
        <div style={{ background: 'linear-gradient(145deg, var(--bg-surface) 0%, var(--bg-main) 100%)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.2rem' }}>
                    <FaTrophy /> Lvl {profile.level}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b', fontWeight: 600 }}>
                    <FaFire /> {profile.streak} Day Streak
                </div>
            </div>
            <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>XP: {profile.xp}</span>
                <span>Next Level: {500 - currentLevelXP} XP</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: progressPercent + '%', height: '100%', background: 'var(--primary)', transition: 'width 0.5s ease-out' }}></div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// 4. In-Lesson AI Tutor
// ----------------------------------------------------------------------
export const AITutor = ({ currentTopic, token }) => {
    const [messages, setMessages] = useState([{ role: 'ai', text: 'Hi! I\'m your AI Tutor. Need help understanding ' + currentTopic + '?' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);
        try {
            const res = await axios.post(
                API + '/academy/ask-tutor',
                { topic: currentTopic, message: userMsg },
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I encountered an error connecting to my brain.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '400px', background: 'var(--bg-surface)', borderRadius: '1rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <FaRobot color="var(--primary)" /> Ask AI Tutor
            </div>
            <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                            background: m.role === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                            color: m.role === 'user' ? 'black' : 'var(--text-main)',
                            padding: '0.75rem 1rem', borderRadius: '1rem', maxWidth: '85%', fontSize: '0.9rem', lineHeight: 1.5
                        }}
                    >
                        {m.text}
                    </div>
                ))}
                {loading && <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI is thinking...</div>}
            </div>
            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about the lesson..."
                    style={{ flex: 1, background: 'var(--bg-secondary)', border: 'none', padding: '0.75rem 1rem', borderRadius: '2rem', color: 'var(--text-main)', outline: 'none' }}
                />
                <button
                    onClick={handleSend}
                    disabled={loading}
                    style={{ background: 'var(--primary)', color: 'black', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                    <FaPaperPlane size={14} />
                </button>
            </div>
        </div>
    );
};
