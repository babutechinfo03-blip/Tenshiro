import React, { useState, useEffect, useRef } from 'react';
import { CATEGORIES } from './questionBank';

/**
 * CareerNavigator AI Assistant
 * Provides personalized guidance, eligibility predictions, and proactive alerts.
 */
export const CareerNavigator = ({ perf, radar, activeTab }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: "Hello! I'm your CareerNavigator AI. Based on your recent performance, I've analyzed your eligibility for top tech roles. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Derived AI Insights
    const bestCat = Object.keys(radar || {}).reduce((a, b) => (radar[a] > radar[b] ? a : b), 'quantitative');
    const weakCat = Object.keys(radar || {}).reduce((a, b) => (radar[a] < radar[b] ? a : b), 'logical');
    const eligibility = Math.round((Object.values(radar || {}).reduce((s, v) => s + v, 0) / 4) * 1.2); // Simple heuristic

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate AI thinking and response
        setTimeout(() => {
            let reply = "I'm analyzing that for you...";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('eligibility') || lowerInput.includes('chance')) {
                reply = `Based on your current Skill Radar (${eligibility}% overall), you have a strong chance for TCS and Infosys. I recommend boosting your ${weakCat} score to qualify for Product-based MNCs.`;
            } else if (lowerInput.includes('weak') || lowerInput.includes('improve')) {
                reply = `Your ${weakCat} logic needs high-intensity practice. I've added 3 premium resources to your AI Resource Library specifically for this.`;
            } else if (lowerInput.includes('roadmap') || lowerInput.includes('plan')) {
                reply = `Your custom 30-day roadmap is ready! We'll focus on ${weakCat} for the first week, followed by mock marathons for your target companies.`;
            } else {
                reply = `That's a great question about your career. Currently, your ${bestCat} is exceptional. Would you like to see which companies value this most?`;
            }

            setMessages(prev => [...prev, { role: 'assistant', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: 65,
                    height: 65,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    zIndex: 1000,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                {isOpen ? '✕' : '🤖'}
                {!isOpen && (
                    <div style={{ position: 'absolute', top: -5, right: -5, width: 22, height: 22, background: '#ef4444', borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#fff', fontWeight: 900 }}>3</div>
                )}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '6rem',
                    right: '2rem',
                    width: 400,
                    height: 600,
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 24,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 1000,
                    animation: 'slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}>
                    {/* Header */}
                    <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, #6366f120, #a855f720)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 45, height: 45, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🤖</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#fff' }}>CareerNavigator AI</div>
                            <div style={{ fontSize: '0.7rem', color: '#1A3263', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1A3263', display: 'inline-block' }}></span>
                                Proactive Guidance Active
                            </div>
                        </div>
                    </div>

                    {/* Proactive Insights Ribbon */}
                    <div style={{ padding: '0.75rem 1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: 10, overflowX: 'auto' }} className="custom-scroll-hidden">
                        <div style={{ whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: 8, background: '#6366f115', border: '1px solid #6366f130', fontSize: '0.65rem', color: '#6366f1', fontWeight: 800 }}>⚡ Eligibility: High</div>
                        <div style={{ whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: 8, background: '#f59e0b15', border: '1px solid #f59e0b30', fontSize: '0.65rem', color: '#f59e0b', fontWeight: 800 }}>🎯 Target: Amazon</div>
                        <div style={{ whiteSpace: 'nowrap', padding: '4px 10px', borderRadius: 8, background: '#1A326315', border: '1px solid #1A326330', fontSize: '0.65rem', color: '#1A3263', fontWeight: 800 }}>🚀 Streak: {perf.streak || 0}d</div>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="custom-scroll">
                        {messages.map((m, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start', gap: 4 }}>
                                <div style={{
                                    maxWidth: '85%',
                                    padding: '0.9rem 1.1rem',
                                    borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                    background: m.role === 'user' ? '#6366f1' : 'rgba(255, 255, 255, 0.05)',
                                    color: '#fff',
                                    fontSize: '0.82rem',
                                    lineHeight: 1.5,
                                    border: m.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                                    boxShadow: m.role === 'user' ? '0 5px 15px rgba(99, 102, 241, 0.2)' : 'none'
                                }}>
                                    {m.text}
                                </div>
                                <span style={{ fontSize: '0.6rem', color: 'rgba(255, 255, 255, 0.3)', fontWeight: 600 }}>{m.time}</span>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div style={{ padding: '0 1.5rem 1rem', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {['Eligibility Check', 'Weak Areas?', 'Next Goal', 'Roadmap'].map(s => (
                            <button key={s} onClick={() => { setInput(s); handleSend(); }} style={{ padding: '6px 12px', borderRadius: 99, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}>
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1.5rem', background: 'rgba(0, 0, 0, 0.2)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: 10 }}>
                        <input
                            type="text"
                            placeholder="Ask CareerNavigator AI..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: 14, border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.05)', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                        />
                        <button
                            onClick={handleSend}
                            style={{ width: 45, height: 45, borderRadius: 12, border: 'none', background: '#6366f1', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            ↗️
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .custom-scroll-hidden::-webkit-scrollbar { display: none; }
            `}</style>
        </>
    );
};
