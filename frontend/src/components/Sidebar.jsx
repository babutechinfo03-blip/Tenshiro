import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCompass, FaBriefcase, FaBrain, FaFileAlt, FaUserCircle, FaBookOpen, FaRobot, FaComments, FaUserGraduate, FaTachometerAlt, FaGraduationCap, FaSun, FaMoon, FaUserTie, FaBook, FaSignOutAlt } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const Sidebar = ({ isOpen, onClose }) => {
    const { t, language, setLanguage } = useLanguage();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

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
        { path: '/career-simulation', icon: <FaUserTie />, label: 'Career Simulation' },
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
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsDropdownOpen(false); // also close dropdown when mouse leaves the sidebar for clean UX
                }}
                animate={{ width: isHovered ? 'var(--sidebar-expanded-width)' : 'var(--sidebar-collapsed-width)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{
                    height: '100vh',
                    borderRight: '1px solid var(--border)',
                    padding: '1.5rem 0',
                    backgroundColor: 'var(--bg-surface)',
                    position: 'fixed',
                    top: 0,
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
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="sidebar-profile-btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.6rem 0.75rem',
                                    background: isDropdownOpen
                                        ? 'rgba(31, 41, 55, 0.08)'
                                        : 'var(--bg-secondary)',
                                    borderRadius: '14px',
                                    border: isDropdownOpen
                                        ? '1px solid rgba(31, 41, 55, 0.3)'
                                        : '1px solid var(--border)',
                                    width: '100%',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxSizing: 'border-box',
                                    boxShadow: isDropdownOpen
                                        ? '0 4px 16px rgba(0,0,0,0.08)'
                                        : '0 2px 6px rgba(0,0,0,0.06)',
                                    textAlign: 'left',
                                    outline: 'none',
                                }}
                            >
                                {/* Avatar circle */}
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: isDropdownOpen
                                        ? 'linear-gradient(135deg, #1f2937, #111827)'
                                        : 'linear-gradient(135deg, #374151, #1f2937)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                    transition: 'background 0.2s',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                }}>
                                    <FaUserCircle style={{ fontSize: '1.1rem', color: '#fff' }} />
                                </div>

                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -8 }}
                                            style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}
                                        >
                                            <span style={{
                                                fontSize: '0.82rem',
                                                fontWeight: 800,
                                                color: isDropdownOpen ? 'var(--text-main)' : 'var(--text-main)',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                transition: 'color 0.2s',
                                                letterSpacing: '-0.01em'
                                            }}>
                                                {user.username}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Chevron — only visible when expanded */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{ flexShrink: 0, marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                                        >
                                            <FiChevronDown
                                                size={14}
                                                style={{
                                                    color: isDropdownOpen ? 'var(--text-main)' : 'var(--text-muted)',
                                                    transition: 'transform 0.25s ease, color 0.2s',
                                                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Dropdown Menu contents */}
                            <AnimatePresence>
                                {isDropdownOpen && isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '16px',
                                            padding: '12px',
                                            marginTop: '8px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '12px',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Theme Toggle */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTheme();
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                background: 'var(--bg-main)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--text-main)',
                                                cursor: 'pointer',
                                                fontSize: '0.82rem',
                                                fontWeight: 800,
                                                padding: '8px 12px',
                                                borderRadius: '10px',
                                                transition: 'all 0.2s',
                                                boxSizing: 'border-box'
                                            }}
                                            className="sidebar-theme-toggle"
                                        >
                                            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                            {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
                                        </button>
                                        {/* Language Selector */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            padding: '4px 6px',
                                            boxSizing: 'border-box'
                                        }}>
                                            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>Language</span>
                                            <select
                                                value={language}
                                                onChange={(e) => setLanguage(e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                style={{
                                                    background: 'var(--bg-main)',
                                                    border: '1px solid var(--border)',
                                                    borderRadius: '8px',
                                                    padding: '4px 8px',
                                                    fontSize: '0.78rem',
                                                    fontWeight: 750,
                                                    color: 'var(--text-main)',
                                                    cursor: 'pointer',
                                                    outline: 'none'
                                                }}
                                            >
                                                <option value="en">English</option>
                                                <option value="ta">Tamil</option>
                                                <option value="hi">Hindi</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                                    padding: '0.7rem 0.75rem',
                                    borderRadius: '14px',
                                    textDecoration: 'none',
                                    color: isActive(item.path) ? 'white' : 'var(--text-muted)',
                                    backgroundColor: isActive(item.path) ? 'var(--primary)' : 'transparent',
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    width: '100%',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    boxShadow: isActive(item.path) ? '0 4px 14px rgba(0,0,0,0.15)' : 'none',
                                }}
                                className={`group sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
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
                    padding: '1rem',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    overflow: 'hidden'
                }}>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="sidebar-logout-footer-btn"
                    >
                        <span style={{ fontSize: '1.2rem', flexShrink: 0, display: 'flex', minWidth: '24px', justifyContent: 'center' }}>
                            <FaSignOutAlt />
                        </span>
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    style={{ fontSize: '0.85rem', fontWeight: 700 }}
                                >
                                    Logout
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* Logo & Copyright */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0 0.5rem'
                    }}>
                        <div style={{ width: '32px', height: '32px', background: '#1f2937', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}>
                            <FaGraduationCap size={18} color="white" />
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
                </div>
            </motion.aside>

            <style>{`
                .group:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(10px);
                }
                /* Profile button hover */
                .sidebar-profile-btn:hover {
                    background: rgba(31, 41, 55, 0.06) !important;
                    border-color: rgba(31, 41, 55, 0.2) !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.06) !important;
                    transform: translateY(-1px);
                }
                .sidebar-profile-btn:active {
                    transform: scale(0.97) translateY(0px) !important;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.04) !important;
                }
                /* Logout button styling */
                .sidebar-logout-footer-btn {
                    display: flex !important;
                    align-items: center !important;
                    gap: 1rem !important;
                    padding: 1.5rem 1.3rem !important;
                    border-radius: 14px !important;
                    border: 1px solid rgba(239, 68, 68, 0.15) !important;
                    background: rgba(239, 68, 68, 0.04) !important;
                    color: #ef4444 !important;
                    cursor: pointer !important;
                    width: 100% !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    box-sizing: border-box !important;
                    white-space: nowrap !important;
                    overflow: hidden !important;
                    box-shadow: 0 2px 5px rgba(239, 68, 68, 0.02) !important;
                }
                .sidebar-logout-footer-btn:hover {
                    background: linear-gradient(135deg, #f43f5e, #e11d48) !important;
                    border-color: transparent !important;
                    color: #ffffff !important;
                    box-shadow: 0 6px 16px rgba(244, 63, 94, 0.3) !important;
                    transform: translateY(-2px);
                }
                .sidebar-logout-footer-btn:active {
                    transform: scale(0.97) translateY(0px) !important;
                    box-shadow: 0 2px 6px rgba(244, 63, 94, 0.2) !important;
                }
                /* Nav link hover */
                .sidebar-nav-link:not(.active):hover {
                    background-color: rgba(31, 41, 55, 0.05) !important;
                    color: var(--text-main) !important;
                    transform: translateX(3px);
                    box-shadow: inset 3px 0 0 rgba(31, 41, 55, 0.4);
                    border-radius: 14px !important;
                }
                .sidebar-nav-link:not(.active):hover span:first-child {
                    filter: brightness(1.2);
                    color: var(--text-main);
                }
                .sidebar-nav-link:active {
                    transform: scale(0.97) translateX(0px) !important;
                }
                .sidebar-nav-link.active:hover {
                    filter: brightness(1.1);
                }
            `}</style>
        </>
    );
};

export default Sidebar;
