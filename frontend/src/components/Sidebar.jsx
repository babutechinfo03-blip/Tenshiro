import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCompass, FaBriefcase, FaBrain, FaFileAlt, FaUserCircle, FaBookOpen, FaRobot, FaComments, FaUserGraduate, FaTachometerAlt } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);

    const isActive = (path) => location.pathname === path;

    if (['/login', '/register', '/'].includes(location.pathname)) return null;

    const menuItems = [
        { path: '/overview', icon: <FaTachometerAlt />, label: 'Overview' },
        { path: '/domains', icon: <FaCompass />, label: 'Domains' },
        { path: '/jobs-internships?type=internship', icon: <FaUserGraduate />, label: 'Internships' },
        { path: '/jobs-internships?type=job', icon: <FaBriefcase />, label: 'Jobs' },
        { path: '/communication-intelligence', icon: <FaComments />, label: "Communication" },
        { path: '/aptitude', icon: <FaBrain />, label: 'Aptitude' },
        { path: '/resume', icon: <FaFileAlt />, label: 'Resume' },

        { path: '/interview-prep', icon: <FaBookOpen />, label: 'Prep Hub' },
        { path: '/ai-assistant', icon: <FaRobot />, label: "AI Assistant" },
    ];

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        backdropFilter: 'blur(4px)',
                        transition: 'opacity 0.3s ease'
                    }}
                />
            )}

            <motion.aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{ width: isHovered ? 'var(--sidebar-expanded-width)' : 'var(--sidebar-collapsed-width)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    height: 'calc(100vh - var(--header-height))',
                    borderRight: '1px solid var(--border)',
                    padding: '1.5rem 0',
                    backgroundColor: 'var(--bg-surface)',
                    position: 'fixed',
                    top: 'var(--header-height)',
                    left: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 50,
                    overflow: 'hidden'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                    {/* User Profile */}
                    {user && (
                        <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem',
                                background: 'var(--bg-secondary)',
                                borderRadius: '16px',
                                border: '1px solid var(--border)',
                                width: '100%',
                                overflow: 'hidden'
                            }}>
                                <FaUserCircle style={{ fontSize: '1.5rem', color: 'var(--primary)', flexShrink: 0 }} />
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}
                                        >
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap' }}>
                                                {user.username}
                                            </span>
                                            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Pro Member</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 1rem' }}>
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem',
                                    borderRadius: '16px',
                                    textDecoration: 'none',
                                    color: isActive(item.path) ? 'white' : 'var(--text-muted)',
                                    backgroundColor: isActive(item.path) ? 'var(--primary)' : 'transparent',
                                    fontWeight: 600,
                                    transition: 'background-color 0.2s',
                                    width: '100%',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap'
                                }}
                                className="group"
                            >
                                <span style={{ fontSize: '1.3rem', flexShrink: 0, display: 'flex', minWidth: '24px', justifyContent: 'center' }}>
                                    {item.icon}
                                </span>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            style={{ fontSize: '0.9rem' }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Tooltip for collapsed state */}
                                {!isHovered && (
                                    <div className="tooltip" style={{
                                        position: 'absolute',
                                        left: '70px',
                                        padding: '0.5rem 0.75rem',
                                        background: '#1e293b',
                                        color: 'white',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        opacity: 0,
                                        pointerEvents: 'none',
                                        transition: 'all 0.2s ease',
                                        visibility: 'hidden'
                                    }}>
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                <div style={{
                    marginTop: 'auto',
                    width: '100%',
                    padding: '1.5rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    overflow: 'hidden'
                }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: 'white', fontWeight: 900, fontSize: '0.8rem' }}>T4</span>
                    </div>
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, whiteSpace: 'nowrap' }}
                            >
                                © 2024 Tenshiro
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </motion.aside>

            <style>{`
                .group:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(10px);
                }
            `}</style>
        </>
    );
};

export default Sidebar;
