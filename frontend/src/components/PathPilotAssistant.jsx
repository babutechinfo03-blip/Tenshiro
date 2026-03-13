import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
    FaPaperPlane,
    FaMicrophone,
    FaStop,
    FaTimes,
    FaRobot,
    FaDownload,
    FaTrash,
    FaCog,
    FaHistory,
    FaKeyboard,
    FaMicrophoneSlash,
    FaWaveSquare,
    FaVolumeUp,
    FaUser
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import '../styles/PathPilotAssistant.css';

const QUICK_ACTIONS = [
    "Resume Help",
    "Interview Prep",
    "Career Roadmap",
    "Find Jobs",
    "Skill Learning"
];

const PathPilotAssistant = () => {
    const { user } = useAuth();

    // UI State
    const [isOpen, setIsOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    // Chat State
    const [messages, setMessages] = useState([
        { text: "Hello! I am PathPilot AI — your personal career mentor. How can I help you today?", sender: 'ai', timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Voice & Mode State
    const [language, setLanguage] = useState('en');
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const synthesisRef = useRef(null);

    // Initial message on open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                text: "Welcome back! I'm ready to guide your career. What's on your mind?",
                sender: 'ai',
                timestamp: new Date()
            }]);
        }
    }, [isOpen]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    // Initialize Web Speech APIs
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (e) => {
                const transcript = e.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
                // Proactively send if it's a clear voice command
                if (transcript.length > 3) {
                    setTimeout(() => handleSend(transcript), 500);
                }
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        if ('speechSynthesis' in window) {
            synthesisRef.current = window.speechSynthesis;
        }
    }, []);

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) return alert("Microphone not supported.");
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            const langMap = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN' };
            recognitionRef.current.lang = langMap[language] || 'en-US';
            setInput('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const handleSend = async (textOverride) => {
        const msgText = textOverride || input;
        if (!msgText.trim()) return;

        const userMsg = { text: msgText, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsListening(false);
        setIsTyping(true);

        try {
            const history = messages.slice(-10).map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
            }));

            const res = await axios.post('/api/pathpilot-ai', {
                message: msgText,
                history,
                language
            });

            const replyText = res.data.reply || "Sorry, I couldn't process that.";
            const detectedLang = res.data.language || language;

            setLanguage(detectedLang);
            const aiMsg = { text: replyText, sender: 'ai', timestamp: new Date(), lang: detectedLang };
            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            setMessages(prev => [...prev, {
                text: "I'm having trouble connecting right now. Let's try again in a moment.",
                sender: 'ai',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const speak = (text, langOverride, force = false) => {
        if (!force && (isMuted || !window.speechSynthesis)) return;
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const currentLang = langOverride || language;
        const langMap = { en: 'en-US', ta: 'ta-IN', hi: 'hi-IN' };
        utterance.lang = langMap[currentLang] || 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    const clearChat = () => {
        if (window.confirm("Clear this conversation history?")) {
            setMessages([{ text: "History cleared. Starting fresh!", sender: 'ai', timestamp: new Date() }]);
        }
    };

    return (
        <div className="pathpilot-container">
            {/* Premium Floating Button */}
            {!isOpen && (
                <button
                    className="pathpilot-fab"
                    onClick={() => setIsOpen(true)}
                    title="Ask PathPilot AI"
                >
                    <FaRobot className="pathpilot-fab-icon" />
                </button>
            )}

            {/* Premium Chat Window */}
            {isOpen && (
                <div className="pathpilot-window">
                    {/* Header */}
                    <div className="pathpilot-header">
                        <div className="pathpilot-header-left">
                            <div className="pathpilot-ai-badge">
                                <FaRobot />
                            </div>
                            <div className="pathpilot-header-info">
                                <h3>PathPilot AI</h3>
                                <p>Your Career Assistant</p>
                            </div>
                        </div>
                        <div className="pathpilot-header-tools">
                            <button
                                className="pp-tool-btn"
                                title={isMuted ? "Unmute" : "Mute"}
                                onClick={() => {
                                    const newMuted = !isMuted;
                                    setIsMuted(newMuted);
                                    if (!newMuted && messages.length > 0) {
                                        const last = messages[messages.length - 1];
                                        if (last.sender === 'ai') speak(last.text, last.lang, true);
                                    } else if (newMuted) {
                                        window.speechSynthesis.cancel();
                                    }
                                }}
                            >
                                {isMuted ? <FaMicrophoneSlash size={14} /> : <FaVolumeUp size={14} />}
                            </button>
                            <button className="pp-tool-btn" title="Clear Chat" onClick={clearChat}>
                                <FaTrash size={12} />
                            </button>
                            <button className="pp-tool-btn" title="Settings">
                                <FaCog size={12} />
                            </button>
                            <button className="pp-tool-btn close" onClick={() => setIsOpen(false)}>
                                <FaTimes size={14} />
                            </button>
                        </div>
                        <style>{`
            .pp-msg-volume {
                opacity: 0.6;
                transition: opacity 0.2s;
            }
            .pp-msg-volume:hover {
                opacity: 1;
            }
        `}</style>
                    </div>

                    {/* Chat History Section */}
                    <div className="pathpilot-history-toggle" onClick={() => setShowHistory(!showHistory)}>
                        <FaHistory size={12} />
                        <span>{showHistory ? "Hide session history" : "View session history"}</span>
                    </div>

                    {/* Messages Area */}
                    <div className="pathpilot-body">
                        {messages.map((m, i) => (
                            <div key={i} className={`pp-message ${m.sender}`}>
                                <div className={`pp-bubble ${m.sender}`}>
                                    {m.sender === 'user' ? (
                                        m.text
                                    ) : (
                                        <>
                                            <div className="markdown-content">
                                                <ReactMarkdown>{m.text}</ReactMarkdown>
                                            </div>
                                            <button
                                                className="pp-msg-volume"
                                                onClick={() => speak(m.text, m.lang)}
                                                title="Read Aloud"
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: 'var(--pp-primary)',
                                                    cursor: 'pointer',
                                                    marginTop: '0.5rem',
                                                    padding: '2px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                <FaVolumeUp />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="pp-message ai">
                                <div className="pp-typing">
                                    <div className="pp-dot"></div>
                                    <div className="pp-dot"></div>
                                    <div className="pp-dot"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions Bar */}
                    <div className="pathpilot-quick-actions">
                        {QUICK_ACTIONS.map((action, idx) => (
                            <button
                                key={idx}
                                className="pp-q-btn"
                                onClick={() => handleSend(action)}
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="pathpilot-footer">
                        <div className="pp-input-container">
                            <FaMicrophone
                                className={`pp-action-icon ${isListening ? 'active' : ''}`}
                                onClick={toggleVoiceInput}
                            />
                            <input
                                type="text"
                                placeholder="Ask anything about your career..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isListening}
                            />
                            <button
                                className="pp-send-btn"
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                            >
                                <FaPaperPlane size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Voice UI Overlay */}
                    {isListening && (
                        <div className="pp-voice-active">
                            <div className="pp-waveform">
                                <div className="pp-wave-bar"></div>
                                <div className="pp-wave-bar"></div>
                                <div className="pp-wave-bar"></div>
                                <div className="pp-wave-bar"></div>
                                <div className="pp-wave-bar"></div>
                            </div>
                            <div className="pp-voice-status">Listening...</div>
                            <button
                                className="pp-tool-btn"
                                style={{ marginTop: '2rem', width: '48px', height: '48px' }}
                                onClick={() => setIsListening(false)}
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PathPilotAssistant;
