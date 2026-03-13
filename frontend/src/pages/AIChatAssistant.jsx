import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import {
    FaMicrophone, FaStop, FaPaperPlane, FaVolumeUp,
    FaVolumeMute, FaRobot, FaUser, FaEraser
} from 'react-icons/fa';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../styles/PathPilotAssistant.css';

const AIChatAssistant = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I am PathPilot AI — your dedicated career mentor. How can I guide you today?", sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
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
            recognition.current.continuous = false;
            recognition.current.interimResults = false;
            recognition.current.lang = language === 'ta' ? 'ta-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

            recognition.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                handleSend(transcript);
            };

            recognition.current.onerror = () => setIsListening(false);
            recognition.current.onend = () => setIsListening(false);
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
        setIsThinking(true);

        try {
            // Send full conversation history
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

            // Sync with LanguageContext
            // Note: The LanguageProvider automatically updates i18n and local storage
            // If the backend detected a different language from input, we sync the UI.

            const aiMsg = { id: Date.now() + 1, text: aiText, sender: 'ai', lang: detectedLang };
            setMessages(prev => [...prev, aiMsg]);
            setIsThinking(false);
            // speak(aiText, detectedLang); // REMOVED AUTO SPEAK
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMsg = { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting to my brain right now.", sender: 'ai' };
            setMessages(prev => [...prev, errorMsg]);
            setIsThinking(false);
        }
    };

    return (
        <div className="ai-assistant-page" style={{ height: 'calc(100vh - var(--header-height) - 40px)', padding: '1rem' }}>
            <div className="chat-interface elite-card" style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                position: 'relative'
            }}>
                {/* Header */}
                <div className="chat-header" style={{
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--bg-secondary)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="ai-avatar pulse" style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--primary-gradient)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white'
                        }}>
                            <FaRobot />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>PATHPILOT AI</h3>
                            <span style={{ fontSize: '0.75rem', color: '#d4af37' }}>● MENTOR ONLINE</span>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                            onClick={() => {
                                const newMute = !mute;
                                setMute(newMute);
                                // If unmuting, read the last AI message if available
                                if (!newMute && messages.length > 0) {
                                    const lastMsg = messages[messages.length - 1];
                                    if (lastMsg.sender === "ai") {
                                        speak(lastMsg.text, lastMsg.lang, true); // Force speak on unmute
                                    }
                                } else if (newMute) {
                                    window.speechSynthesis.cancel();
                                }
                            }}
                            className="icon-btn"
                            title={mute ? "Unmute Assistant" : "Mute Assistant"}
                        >
                            {mute ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>
                        <button onClick={() => setMessages([messages[0]])} className="icon-btn" title="Clear Chat">
                            <FaEraser />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="messages-container" style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.5rem',
                    paddingBottom: '7rem', // Space for the floating input
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem' // Increased gap slightly for better readability
                }}>
                    {messages.map((msg) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                display: 'flex',
                                gap: '0.5rem',
                                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row'
                            }}
                        >
                            <div style={{
                                width: '32px', height: '32px', borderRadius: '50%',
                                background: msg.sender === 'user' ? 'var(--bg-secondary)' : 'var(--primary-gradient)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem',
                                border: '1px solid var(--border)', flexShrink: 0
                            }}>
                                {msg.sender === 'user' ? <FaUser /> : <FaRobot color="white" />}
                            </div>
                            <div style={{
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                background: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-secondary)',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                                fontSize: '0.95rem',
                                border: '1px solid var(--border)',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {msg.sender === 'user' ? (
                                    msg.text
                                ) : (
                                    <>
                                        <div className="markdown-content">
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        </div>
                                        <button
                                            onClick={() => speak(msg.text, msg.lang)}
                                            className="msg-speak-btn"
                                            title="Read aloud"
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--text-muted)',
                                                cursor: 'pointer',
                                                marginTop: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '0.9rem',
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            <FaVolumeUp style={{ marginRight: '4px' }} />
                                            <span style={{ fontSize: '0.7rem' }}>Listen</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isThinking && (
                        <div className="thinking-bubble" style={{ alignSelf: 'flex-start', display: 'flex', gap: '0.5rem' }}>
                            <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>

                {/* Input Area (ChatGPT / Gemini Style) */}
                <div className="chat-input-area" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem 2rem 2rem 2rem',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, var(--bg-surface) 40%, var(--bg-surface) 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    pointerEvents: 'none' // Let clicks pass through the gradient
                }}>
                    <div className="input-floating-pill" style={{
                        width: '100%',
                        maxWidth: '800px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'var(--bg-secondary)',
                        padding: '0.6rem 0.8rem',
                        borderRadius: '24px',
                        border: '1px solid var(--border)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        pointerEvents: 'auto',
                        transition: 'all 0.3s ease'
                    }}>
                        <button
                            className={`voice-btn ${isListening ? 'listening' : ''}`}
                            onClick={toggleListening}
                            title={isListening ? "Stop listening" : "Voice Input"}
                            style={{
                                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                                border: 'none', background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                color: isListening ? '#ef4444' : 'var(--text-muted)',
                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                cursor: 'pointer', transition: 'all 0.2s ease', fontSize: '1.1rem'
                            }}
                        >
                            {isListening ? <FaStop /> : <FaMicrophone />}
                        </button>
                        <input
                            type="text"
                            placeholder={isListening ? "Listening natively..." : "Message PathPilot AI..."}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            style={{
                                flex: 1, border: 'none', background: 'transparent',
                                color: 'var(--text-main)', outline: 'none', padding: '0.5rem',
                                fontSize: '1rem'
                            }}
                        />
                        <button
                            className="send-btn"
                            onClick={() => handleSend()}
                            disabled={!input.trim()}
                            title="Send Message"
                            style={{
                                width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                                border: 'none', background: input.trim() ? 'var(--primary)' : 'var(--bg-surface)',
                                color: input.trim() ? 'white' : 'var(--text-muted)', display: 'flex',
                                justifyContent: 'center', alignItems: 'center',
                                cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.2s ease',
                                fontSize: '1rem', opacity: input.trim() ? 1 : 0.6
                            }}
                        >
                            <FaPaperPlane style={{ marginLeft: input.trim() ? '-2px' : '0' }} />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .markdown-content { font-size: 0.95rem; line-height: 1.6; }
                .markdown-content p { margin: 0 0 0.8rem 0; }
                .markdown-content p:last-child { margin-bottom: 0; }
                .markdown-content ul, .markdown-content ol { margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; }
                .markdown-content li { margin-bottom: 0.4rem; }
                .markdown-content strong { font-weight: 700; color: inherit; }
                .markdown-content h1, .markdown-content h2, .markdown-content h3 { margin: 1.5rem 0 0.8rem 0; font-size: 1.1em; font-weight: 700; }
                .markdown-content h1:first-child, .markdown-content h2:first-child, .markdown-content h3:first-child { margin-top: 0; }
                .markdown-content code { background: rgba(0,0,0,0.1); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
                .markdown-content pre { background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
                .markdown-content pre code { background: transparent; padding: 0; }

                .dot { width: 8px; height: 8px; background: var(--primary); border-radius: 50%; opacity: 0.6; animation: dance 1s infinite alternate; }
                .dot:nth-child(2) { animation-delay: 0.2s; }
                .dot:nth-child(3) { animation-delay: 0.4s; }
                @keyframes dance { from { transform: translateY(0); } to { transform: translateY(-5px); } }
                .voice-btn.listening { animation: pulse-red 1.5s infinite; }
                @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
                .pulse { animation: pulse-primary 2s infinite; }
                @keyframes pulse-primary { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

export default AIChatAssistant;
