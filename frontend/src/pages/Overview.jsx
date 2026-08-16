import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaCompass, FaBriefcase, FaComments, FaBrain, FaFileAlt,
    FaMicrophone, FaBookOpen, FaRobot, FaUserGraduate, FaArrowRight,
    FaLayerGroup, FaTachometerAlt, FaChartBar, FaStar, FaExternalLinkAlt
} from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const hexToRgb = (hex) => {
    if (!hex) return '16, 185, 129';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
};

const OverviewCard = ({ feature, index }) => (
    <a
        href={feature.path}
        target="_blank"
        rel="noopener noreferrer"
        className="overview-card-outer-link"
    >
        <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                delay: index * 0.04,
                ease: "easeOut"
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="overview-feature-card-elite"
            style={{
                '--feature-color': feature?.color || '#1A3263',
                '--feature-color-rgb': hexToRgb(feature?.color || '#1A3263')
            }}
        >
            <div className="card-mesh-bg" />
            <div className="card-border-glow" />

            <div className="card-header-elite">
                <div className="icon-platform-container">
                    <div className="icon-glow" />
                    {feature.icon}
                </div>
                <div className="card-action-hint">
                    <FaExternalLinkAlt size={12} />
                </div>
            </div>

            <div className="card-body-elite">
                <h3>{feature?.title || 'Feature'}</h3>
                <p>{feature?.desc || 'Module description'}</p>
            </div>

            <div className="card-footer-elite">
                <div className="status-indicator">
                    <div className="pulse-dot" />
                    <span>Active Module</span>
                </div>
                <div className="arrow-circle">
                    <FaArrowRight size={14} />
                </div>
            </div>
        </Motion.div>
    </a>
);

const Overview = () => {
    const { t } = useLanguage();

    const features = [
        {
            path: '/domains',
            icon: <FaCompass />,
            title: 'Career Path',
            desc: 'Navigate 120+ high-growth domains with AI precision.',
            color: '#1A3263'
        },
        {
            path: '/jobs-internships?type=job',
            icon: <FaBriefcase />,
            title: 'Jobs',
            desc: 'Access elite career opportunities across global markets.',
            color: '#6366f1'
        },
        {
            path: '/jobs-internships?type=internship',
            icon: <FaUserGraduate />,
            title: 'Internships',
            desc: 'Secure high-impact internships to accelerate your growth.',
            color: '#1A3263'
        },
        {
            path: '/communication-intelligence',
            icon: <FaComments />,
            title: 'Communication Hub',
            desc: 'Elevate your professional presence with AI feedback.',
            color: '#1A3263'
        },
        {
            path: '/aptitude',
            icon: <FaBrain />,
            title: 'Aptitude Mastery',
            desc: 'Precision training for logical and quantitative excellence.',
            color: '#ec4899'
        },
        {
            path: '/resume',
            icon: <FaFileAlt />,
            title: 'Resume Builder',
            desc: 'Construct industry-leading ATS-optimized resumes.',
            color: '#8b5cf6'
        },
        {
            path: '/interview',
            icon: <FaMicrophone />,
            title: 'AI Mock Interviews',
            desc: 'Immersive simulations with real-time performance analytics.',
            color: '#06b6d4'
        },
        {
            path: '/interview-prep',
            icon: <FaBookOpen />,
            title: 'Interview Preparation',
            desc: 'Master technical and behavioral frameworks for success.',
            color: '#f43f5e'
        },
        {
            path: '/ai-assistant',
            icon: <FaRobot />,
            title: 'AI Assistant',
            desc: 'Instant specialized intelligence for any career query.',
            color: '#14b8a6'
        },
    ];

    return (
        <div className="overview-elite-container">
            <div className="page-background-effects">
                <div className="glow-orb-1" />
                <div className="glow-orb-2" />
            </div>

            <header className="overview-elite-header">
                <Motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="header-main"
                >
                    <div className="elite-badge-container">
                        <FaStar className="sparkle-icon" />
                        <span>PREMIUM INTELLIGENCE</span>
                    </div>
                    <h1>Neural <span className="text-secondary-gradient">Dashboard</span></h1>
                    <p>Experience the next generation of career orchestration with our unified AI-driven ecosystem.</p>
                </Motion.div>

                <div className="header-quick-metrics">
                    <div className="metric-box">
                        <span className="metric-val">12</span>
                        <span className="metric-label">Neural Modules</span>
                    </div>
                    <div className="metric-box">
                        <span className="metric-val">Active</span>
                        <span className="metric-label">System Status</span>
                    </div>
                </div>
            </header>

            <div className="overview-elite-grid">
                {features.map((feature, idx) => (
                    <OverviewCard key={idx} feature={feature} index={idx} />
                ))}
            </div>

            <style>{`
                .overview-elite-container {
                    padding: 40px 60px 80px;
                    max-width: 1600px;
                    margin: 0 auto;
                    position: relative;
                    min-height: 100vh;
                    contain: content;
                }

                .page-background-effects {
                    position: fixed;
                    inset: 0;
                    z-index: -1;
                    overflow: hidden;
                    pointer-events: none;
                    transform: translateZ(0);
                    will-change: transform;
                }

                .glow-orb-1 {
                    position: absolute;
                    top: -10%;
                    right: -10%;
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, rgba(26, 50, 99, 0.05) 0%, transparent 60%);
                    filter: blur(40px);
                    will-change: transform;
                    transform: translateZ(0);
                }

                .glow-orb-2 {
                    position: absolute;
                    bottom: -10%;
                    left: -10%;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 60%);
                    filter: blur(40px);
                    will-change: transform;
                    transform: translateZ(0);
                }

                .overview-elite-header {
                    margin-bottom: 60px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }

                .elite-badge-container {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 16px;
                    background: rgba(26, 50, 99, 0.1);
                    border: 1px solid rgba(26, 50, 99, 0.2);
                    border-radius: 100px;
                    color: var(--primary);
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    margin-bottom: 24px;
                }

                .overview-elite-header h1 {
                    font-size: 4rem;
                    font-weight: 950;
                    letter-spacing: -0.05em;
                    line-height: 1;
                    margin-bottom: 16px;
                    color: var(--text-main);
                }

                .text-secondary-gradient {
                    color: var(--accent);
                }

                .overview-elite-header p {
                    font-size: 1.3rem;
                    color: var(--text-muted);
                    max-width: 650px;
                    line-height: 1.4;
                    font-weight: 500;
                }

                .header-quick-metrics {
                    display: flex;
                    gap: 24px;
                }

                .metric-box {
                    padding: 16px 32px;
                    background: var(--bg-glass);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    transform: translateZ(0);
                }

                .metric-val { font-size: 1.5rem; font-weight: 900; color: var(--primary); }
                .metric-label { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

                .overview-elite-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 32px;
                }

                .overview-feature-card-elite {
                    position: relative;
                    background: var(--bg-glass);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid var(--border);
                    border-radius: 36px;
                    padding: 40px;
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    overflow: hidden;
                    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease;
                    will-change: transform, opacity;
                    transform: translateZ(0);
                }

                .card-mesh-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(at 0% 0%, rgba(var(--feature-color-rgb), 0.05) 0%, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(var(--feature-color-rgb), 0.05) 0%, transparent 50%);
                    z-index: 0;
                    pointer-events: none;
                }

                .card-border-glow {
                    position: absolute;
                    inset: 0;
                    border-radius: 36px;
                    padding: 2px;
                    background: linear-gradient(135deg, var(--feature-color), transparent, var(--feature-color));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }

                .overview-feature-card-elite:hover .card-border-glow {
                    opacity: 0.4;
                }

                .card-header-elite {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    z-index: 1;
                }

                .icon-platform-container {
                    position: relative;
                    width: 76px;
                    height: 76px;
                    border-radius: 24px;
                    background: var(--bg-surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--feature-color);
                    font-size: 2.2rem;
                    transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.05);
                    will-change: transform;
                    transform: translateZ(0);
                }

                .icon-glow {
                    position: absolute;
                    inset: -4px;
                    border-radius: 28px;
                    background: var(--feature-color);
                    filter: blur(10px);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }

                .overview-feature-card-elite:hover .icon-glow {
                    opacity: 0.15;
                }

                .overview-feature-card-elite:hover .icon-platform-container {
                    background: var(--feature-color);
                    color: white;
                    transform: scale(1.05) translateY(-2px);
                    box-shadow: 0 15px 30px -10px var(--feature-color);
                }

                .card-action-hint {
                    width: 36px;
                    height: 36px;
                    border-radius: 12px;
                    background: var(--bg-surface);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                    opacity: 0.4;
                    transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
                }

                .overview-feature-card-elite:hover .card-action-hint {
                    background: var(--feature-color);
                    color: white;
                    opacity: 1;
                }

                .card-body-elite { z-index: 1; }
                .card-body-elite h3 {
                    font-size: 1.7rem;
                    font-weight: 800;
                    margin-bottom: 12px;
                    color: var(--text-main);
                    letter-spacing: -0.03em;
                }
                .card-body-elite p {
                    font-size: 1.05rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    font-weight: 500;
                }

                .card-footer-elite {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;
                    z-index: 1;
                }

                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--text-muted);
                    padding: 6px 14px;
                    background: rgba(0,0,0,0.03);
                    border-radius: 100px;
                }

                .pulse-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #1A3263;
                    box-shadow: 0 0 0 rgba(26, 50, 99, 0.4);
                    animation: pulse 2.5s infinite;
                    will-change: box-shadow;
                }

                @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(26, 50, 99, 0.4); }
                    70% { box-shadow: 0 0 0 8px rgba(26, 50, 99, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(26, 50, 99, 0); }
                }

                .arrow-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    border: 1px solid var(--border);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--primary);
                    transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                    will-change: transform;
                    transform: translateZ(0);
                }

                .overview-feature-card-elite:hover .arrow-circle {
                    background: var(--primary);
                    color: white;
                    border-color: var(--primary);
                    transform: rotate(-10deg) scale(1.05);
                }

                .overview-card-outer-link {
                    text-decoration: none;
                    color: inherit;
                    display: block;
                    transform: translateZ(0);
                }

                @media (max-width: 1200px) {
                    .overview-elite-header h1 { font-size: 3.2rem; }
                    .overview-elite-container { padding: 40px; }
                }

                @media (max-width: 768px) {
                    .overview-elite-header { flex-direction: column; align-items: flex-start; gap: 40px; }
                    .header-quick-metrics { width: 100%; }
                    .metric-box { flex: 1; }
                    .overview-elite-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default Overview;
