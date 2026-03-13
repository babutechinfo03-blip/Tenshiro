import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaRobot, FaLightbulb, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const PracticeAssistant = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [tip, setTip] = useState('');

    const tips = {
        '/dashboard': "Check your Master Planner! You have a study session scheduled for today.",
        '/scheduler': "Consistency is key. Try to block at least 45 minutes for focused learning.",
        '/courses': "Harvard's CS50 is highly recommended for building strong foundations.",
        '/roadmap': "Don't rush to Phase 3. Mastery of fundamentals in Phase 1 ensures better interview performance.",
        '/interview': "Maintain eye contact with the AI interviewer and speak clearly. The analytics are watching!"
    };

    useEffect(() => {
        const path = location.pathname;
        const matchedTip = Object.keys(tips).find(key => path.startsWith(key));
        setTip(tips[matchedTip] || "How can I help you today?");

        // Proactive pop-up after 3 seconds on new page
        const timer = setTimeout(() => setIsOpen(true), 3000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1rem'
        }}>
            {isOpen && (
                <div style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--primary)',
                    borderRadius: '1.5rem',
                    padding: '1.5rem',
                    width: '300px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    animation: 'slideIn 0.3s ease-out',
                    position: 'relative'
                }}>
                    <style>{`
                        @keyframes slideIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                        <FaTimes />
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <FaLightbulb color="var(--primary)" />
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary)', letterSpacing: '1px' }}>PROACTIVE TIP</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{tip}</p>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px var(--primary-glow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? <FaChevronDown /> : <FaRobot />}
            </button>
        </div>
    );
};

export default PracticeAssistant;
