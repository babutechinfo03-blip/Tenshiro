import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
    FiMic, FiSquare, FiSend, FiVolume2,
    FiVolumeX, FiTrash2, FiCpu, FiUser, FiInfo
} from 'react-icons/fi';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const AIChatAssistant = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to PathPilot AI. I am your executive career mentor. How can I assist your career progression today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [interimText, setInterimText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [mute, setMute] = useState(false);
    const scrollRef = useRef(null);

    // Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = useRef(null);

    useEffect(() => {
        if (SpeechRecognition) {
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

            recognition.current.onresult = (event) => {
                let interim = '';
                let final = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final += event.results[i][0].transcript;
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                
                if (interim) {
                    setInterimText(interim);
                }
                if (final) {
                    setInput(prev => prev + ' ' + final);
                    setInterimText('');
                }
            };

            recognition.current.onerror = (e) => {
                console.error("Speech recognition error", e);
                setIsListening(false);
            };
            recognition.current.onend = () => {
                setIsListening(false);
                setInterimText('');
            };
        }
    }, [language, SpeechRecognition]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const toggleListening = () => {
        if (isListening) {
            recognition.current?.stop();
        } else {
            setInput('');
            setInterimText('');
            recognition.current?.start();
            setIsListening(true);
        }
    };

    const speak = (text, langOverride, force = false) => {
        if (!force && (mute || !window.speechSynthesis)) return;
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const currentLang = langOverride || language;
        utterance.lang = currentLang === 'ta' ? 'ta-IN' : currentLang === 'hi' ? 'hi-IN' : 'en-US';
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async (textOverride) => {
        const text = textOverride || input;
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setInterimText('');
        setIsThinking(true);

        try {
            const history = messages.slice(-5).map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

            const response = await axios.post('/api/pathpilot-ai', {
                message: text,
                history,
                language: language
            });

            const aiText = response.data.reply || "Sorry, I couldn't process that.";
            const detectedLang = response.data.language || language;

            const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai', lang: detectedLang };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
            speak(aiText, detectedLang);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'ai' };
            setMessages(prev => [...prev, errorMsg]);
            setIsThinking(false);
        }
    };

    return (
        <div className="ai-assistant-page" style={{ 
            height: 'calc(100vh - 120px)', 
            background: '#ffffff',
            color: '#1e293b',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: "'Inter', sans-serif",
            position: 'relative'
        }}>
            {/* Header Controls (Minimal, Full Width) */}
            <div style={{
                padding: '1rem 2rem',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#ffffff',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#374151',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#ffffff'
                    }}>
                        <FiCpu size={16} />
                    </div>
                    <div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>PATHPILOT AI</span>
                        <span style={{ fontSize: '0.75rem', color: '#10b981', marginLeft: '10px', fontWeight: 600 }}>● Online</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => {
                            const newMute = !mute;
                            setMute(newMute);
                            if (!newMute && messages.length > 0) {
                                const lastMsg = messages[messages.length - 1];
                                if (lastMsg.sender === "ai") {
                                    speak(lastMsg.text, lastMsg.lang, true);
                                }
                            } else if (newMute) {
                                window.speechSynthesis.cancel();
                            }
                        }}
                        style={{
                            background: '#ffffff',
                            border: '1px solid rgba(0,0,0,0.08)',
                            color: '#475569',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                        onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                    >
                        {mute ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
                        {mute ? "Unmute" : "Mute"}
                    </button>

                    <button 
                        onClick={() => setMessages([{ id: 1, text: "Welcome to PathPilot AI. I am your executive career mentor. How can I assist your career progression today?", sender: 'ai' }])}
                        style={{
                            background: '#ffffff',
                            border: '1px solid rgba(0,0,0,0.08)',
                            color: '#e11d48',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#fff1f2'}
                        onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                    >
                        <FiTrash2 size={15} /> Clear Chat
                    </button>
                </div>
            </div>

            {/* Chat Messages Scrolling Container (Full Width) */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem 10% 140px 10%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                background: '#ffffff'
            }} className="custom-scroll">
                <style>{`
                    .custom-scroll::-webkit-scrollbar { width: 6px; }
                    .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
                `}</style>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        style={{
                            display: 'flex',
                            gap: '16px',
                            width: '100%',
                            maxWidth: '900px',
                            margin: '0 auto',
                            alignSelf: 'center',
                            flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                        }}
                    >
                        <div style={{
                            width: '36px', height: '36px', borderRadius: '50%',
                            background: msg.sender === 'user' ? '#1f2937' : '#4b5563',
                            color: '#ffffff',
                            display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.9rem',
                            flexShrink: 0
                        }}>
                            {msg.sender === 'user' ? <FiUser /> : <FiCpu />}
                        </div>
                        <div style={{
                            flex: 1,
                            padding: '0.5rem 0',
                            color: '#000000',
                            fontSize: '0.98rem',
                            lineHeight: 1.6
                        }}>
                            <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#64748b', marginBottom: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                                {msg.sender === 'user' ? 'YOU' : 'PATHPILOT MENTOR'}
                            </div>
                            <div style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                                {msg.sender === 'user' ? (
                                    <div style={{ display: 'inline-block', background: '#f4f4f5', padding: '10px 16px', borderRadius: '12px', textAlign: 'left', color: '#000000', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                                        {msg.text}
                                    </div>
                                ) : (
                                    <>
                                        <div className="markdown-content">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                        <button
                                            onClick={() => speak(msg.text, msg.lang)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: '#475569',
                                                cursor: 'pointer',
                                                marginTop: '0.5rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 800,
                                                padding: 0
                                            }}
                                        >
                                            <FiVolume2 /> Listen
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                
                {isThinking && (
                    <div style={{ display: 'flex', gap: '8px', width: '100%', maxWidth: '900px', margin: '0 auto', alignSelf: 'center', paddingLeft: '52px' }}>
                        <div className="thinking-dot" style={{ width: '8px', height: '8px', background: '#4b5563', borderRadius: '50%', animation: 'thinkingWave 1.2s infinite' }} />
                        <div className="thinking-dot" style={{ width: '8px', height: '8px', background: '#4b5563', borderRadius: '50%', animation: 'thinkingWave 1.2s infinite 0.2s' }} />
                        <div className="thinking-dot" style={{ width: '8px', height: '8px', background: '#4b5563', borderRadius: '50%', animation: 'thinkingWave 1.2s infinite 0.4s' }} />
                        <style>{`
                            @keyframes thinkingWave {
                                0%, 100% { transform: translateY(0); opacity: 0.4; }
                                50% { transform: translateY(-6px); opacity: 1; }
                            }
                        `}</style>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Bottom Input Area (Full Width, Centered Capsule) */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 10%',
                background: 'linear-gradient(to top, #ffffff 80%, rgba(255, 255, 255, 0))',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                {/* Speech Interim Text Preview */}
                <AnimatePresence>
                    {(isListening || interimText) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            style={{
                                background: '#f8fafc',
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: '12px',
                                padding: '10px 18px',
                                width: '100%',
                                maxWidth: '750px',
                                boxSizing: 'border-box',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#374151', display: 'inline-block' }} />
                            <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 700, marginRight: '10px' }}>Voice Live:</span>
                            <span style={{ fontSize: '0.88rem', color: '#1e293b', flex: 1 }}>{interimText || "Listening..."}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Text & Mic Input Bar */}
                <div style={{
                    width: '100%',
                    maxWidth: '750px',
                    display: 'flex',
                    alignItems: 'center',
                    background: '#f1f5f9',
                    borderRadius: '24px',
                    padding: '8px 16px',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    boxSizing: 'border-box'
                }}>
                    <button
                        onClick={toggleListening}
                        style={{
                            background: isListening ? '#374151' : 'transparent',
                            color: isListening ? '#ffffff' : '#64748b',
                            border: 'none',
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            marginRight: '8px',
                            fontSize: '1.1rem'
                        }}
                        title={isListening ? "Stop Voice Input" : "Voice Input"}
                    >
                        {isListening ? <FiSquare size={16} /> : <FiMic size={18} />}
                    </button>

                    <input
                        type="text"
                        placeholder={isListening ? "Listening natively..." : "Type your message..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        style={{
                            flex: 1,
                            background: 'transparent',
                            border: 'none',
                            color: '#0f172a',
                            outline: 'none',
                            fontSize: '0.98rem',
                            padding: '8px 0'
                        }}
                    />

                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        style={{
                            background: 'transparent',
                            color: input.trim() ? '#1f2937' : 'rgba(0, 0, 0, 0.15)',
                            border: 'none',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: input.trim() ? 'pointer' : 'default',
                            transition: 'all 0.2s',
                            marginLeft: '8px'
                        }}
                    >
                        <FiSend size={18} />
                    </button>
                </div>
            </div>

            <style>{`
                .markdown-content { font-size: 0.98rem; color: #000000 !important; }
                .markdown-content p { margin: 0 0 0.8rem 0; color: #000000 !important; }
                .markdown-content p:last-child { margin-bottom: 0; }
                .markdown-content ul, .markdown-content ol { margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; color: #000000 !important; }
                .markdown-content li { margin-bottom: 0.4rem; color: #000000 !important; }
                .markdown-content strong { font-weight: 700; color: #000000; }
                .markdown-content h1, .markdown-content h2, .markdown-content h3 { margin: 1.5rem 0 0.8rem 0; font-size: 1.05em; font-weight: 800; color: #000000 !important; }
                .markdown-content h1:first-child, .markdown-content h2:first-child, .markdown-content h3:first-child { margin-top: 0; }
                .markdown-content code { background: rgba(0,0,0,0.05); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; color: #0f172a; }
                .markdown-content pre { background: #f8fafc; padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; border: 1px solid rgba(0,0,0,0.05); }
                .markdown-content pre code { background: transparent; padding: 0; }
            `}</style>
        </div>
    );
};

export default AIChatAssistant;
