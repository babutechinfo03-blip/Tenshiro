import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaCode, FaServer, FaMobile, FaCloud, FaShieldAlt, FaRobot,
    FaChartLine, FaPalette, FaGraduationCap, FaBriefcase, FaSearch,
    FaArrowRight, FaStar, FaBook, FaUsers, FaFire, FaCoins, FaUser,
    FaTrophy, FaLock, FaCompass, FaMedal, FaShieldVirus, FaDatabase,
    FaHeartbeat, FaBalanceScale, FaSeedling, FaChalkboardTeacher,
    FaBroadcastTower, FaBrain, FaGem, FaGamepad, FaUserPlus, FaChevronRight,
    FaCrosshairs, FaCheckCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// GAME WORLD KINGDOMS DATA (15 Domains)
// ─────────────────────────────────────────────────────────────────────────────
const GAME_WORLDS = [
    {
        id: 'it-software',
        name: 'IT & Software Kingdom',
        icon: FaCode,
        color: '#6366f1',
        description: 'Build software fortresses, craft components, and conquer the coding realm.',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        roles: [
            { title: 'Frontend Developer Path', skills: ['HTML', 'CSS', 'JavaScript', 'React'], level: 'Beginner', learners: '12K' },
            { title: 'Backend Developer Path', skills: ['Node.js', 'Express.js', 'REST API', 'MySQL'], level: 'Intermediate', learners: '8K' },
            { title: 'Full Stack Developer Path', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MySQL', 'MongoDB'], level: 'All Levels', learners: '15K' }
        ]
    },
    {
        id: 'gov-exams',
        name: 'Government Exam Empire',
        icon: FaGraduationCap,
        color: '#f59e0b',
        description: 'Conquer the imperial vaults and master history, polity, and general knowledge.',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        roles: [
            { title: 'UPSC Path', skills: ['History', 'Geography', 'Polity', 'Economy'], level: 'All Levels', learners: '22K' },
            { title: 'TNPSC Path', skills: ['Tamil Nadu History', 'Indian Polity', 'Aptitude'], level: 'Beginner', learners: '15K' }
        ]
    },
    {
        id: 'commerce-finance',
        name: 'Commerce & Finance City',
        icon: FaChartLine,
        color: '#10b981',
        description: 'Master accounting grimoires, audits, and double-entry sorcery.',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        roles: [
            { title: 'CA Path', skills: ['Accounting Fundamentals', 'Taxation', 'Audit'], level: 'Advanced', learners: '9K' }
        ]
    },
    {
        id: 'business-entrepreneurship',
        name: 'Business & Entrepreneurship Island',
        icon: FaBriefcase,
        color: '#ec4899',
        description: 'Build startups, launch empires, pitch to AI investors, and gain funding.',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
        roles: [
            { title: 'Entrepreneur Path', skills: ['Business Model Canvas', 'Fundraising', 'Marketing'], level: 'All Levels', learners: '6.5K' }
        ]
    },
    {
        id: 'design-creative',
        name: 'Design & Creative Universe',
        icon: FaPalette,
        color: '#f97316',
        description: 'Command colors, layouts, Photoshop canvases, and shape realities.',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
        roles: [
            { title: 'Designer Path', skills: ['UI/UX Design', 'Figma', 'Typography'], level: 'Beginner', learners: '7K' }
        ]
    },
    {
        id: 'medical-healthcare',
        name: 'Medical & Healthcare Planet',
        icon: FaHeartbeat,
        color: '#14b8a6',
        description: 'Diagnose patients, administer treatment in VR, and learn anatomical systems.',
        gradient: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
        roles: [
            { title: 'Doctor Path', skills: ['Anatomy', 'Diagnostics', 'Pharmacology'], level: 'Advanced', learners: '4.8K' }
        ]
    },
    {
        id: 'engineering-galaxy',
        name: 'Engineering Galaxy',
        icon: FaServer,
        color: '#3b82f6',
        description: 'Construct bridges, compile assemblies, and design futuristic cities.',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        roles: [
            { title: 'Mechanical Path', skills: ['Machine Design', 'Thermodynamics', 'AutoCAD'], level: 'Intermediate', learners: '3.9K' }
        ]
    },
    {
        id: 'law-judiciary',
        name: 'Law & Judiciary Realm',
        icon: FaBalanceScale,
        color: '#8b5cf6',
        description: 'Argue cases in simulated courtrooms, master constitutional lore, and win verdicts.',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        roles: [
            { title: 'Lawyer Path', skills: ['Constitutional Law', 'Criminal Procedure', 'Contract Law'], level: 'Intermediate', learners: '5K' }
        ]
    },
    {
        id: 'agriculture-world',
        name: 'Agriculture World',
        icon: FaSeedling,
        color: '#84cc16',
        description: 'Manage smart organic hydroponic fields, study soil matrices, and master yields.',
        gradient: 'linear-gradient(135deg, #84cc16 0%, #4d7c0f 100%)',
        roles: [
            { title: 'Smart Farmer Path', skills: ['Soil Science', 'Hydroponics', 'Crop Pathology'], level: 'Beginner', learners: '2.5K' }
        ]
    },
    {
        id: 'teaching-academy',
        name: 'Teaching Academy',
        icon: FaChalkboardTeacher,
        color: '#06b6d4',
        description: 'Tutor virtual students, guide class modules, and research pedagogy methods.',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        roles: [
            { title: 'Educator Path', skills: ['Child Development', 'Pedagogical Design', 'Assessment'], level: 'Beginner', learners: '3.1K' }
        ]
    },
    {
        id: 'media-communication',
        name: 'Media & Communication City',
        icon: FaBroadcastTower,
        color: '#e11d48',
        description: 'Host simulated shows, write journalism logs, and build communication influence.',
        gradient: 'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
        roles: [
            { title: 'Journalist Path', skills: ['Reporting', 'Media Ethics', 'Digital Broadcast'], level: 'Intermediate', learners: '3.7K' }
        ]
    },
    {
        id: 'data-science',
        name: 'Data Science Planet',
        icon: FaDatabase,
        color: '#0284c7',
        description: 'Decrypt dataset matrices, solve predictive algorithms, and visual patterns.',
        gradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        roles: [
            { title: 'Data Scientist Path', skills: ['Python', 'Pandas', 'Statistics', 'SQL'], level: 'Intermediate', learners: '8K' }
        ]
    },
    {
        id: 'ai-ml',
        name: 'AI & Machine Learning Universe',
        icon: FaRobot,
        color: '#7c3aed',
        description: 'Train neural models, code conversational NPCs, and configure transformers.',
        gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
        roles: [
            { title: 'AI Engineer Path', skills: ['Deep Learning', 'Transformers', 'NLP', 'TensorFlow'], level: 'Advanced', learners: '6K' }
        ]
    },
    {
        id: 'cybersecurity',
        name: 'Cybersecurity Fortress',
        icon: FaShieldAlt,
        color: '#059669',
        description: 'Defend castles from simulated malware, configure firewalls, and intercept packets.',
        gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        roles: [
            { title: 'Security Architect Path', skills: ['Penetration Testing', 'Cryptography', 'OWASP'], level: 'Advanced', learners: '4.5K' }
        ]
    },
    {
        id: 'civil-services',
        name: 'Civil Services Kingdom',
        icon: FaUser,
        color: '#d97706',
        description: 'Manage city infrastructure, allocate resources, and handle emergency scenarios.',
        gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        roles: [
            { title: 'Civil Servant Path', skills: ['Public Administration', 'Resource Management', 'Policy Action'], level: 'All Levels', learners: '7.8K' }
        ]
    }
];

const LEADERBOARD = [
    { rank: 1, name: 'Sanjai (You)', xp: 12450, avatar: '👤', title: 'Professional' },
    { rank: 2, name: 'Rohan Developer', xp: 10200, avatar: '🧙‍♂️', title: 'Professional' },
    { rank: 3, name: 'Priya Designer', xp: 9550, avatar: '🧝‍♀️', title: 'Specialist' },
    { rank: 4, name: 'Amit UPSC', xp: 8900, avatar: '👨‍💼', title: 'Specialist' },
    { rank: 5, name: 'AI Tutor Bot', xp: 8120, avatar: '🤖', title: 'Learner' }
];

const BADGES = [
    { id: 1, name: 'Consistency King', icon: '🔥', desc: 'Maintain a 7-day streak' },
    { id: 2, name: 'Speed Learner', icon: '⚡', desc: 'Complete 3 missions in 1 day' },
    { id: 3, name: 'Project Champion', icon: '🏆', desc: 'Complete a simulation project' },
    { id: 4, name: 'Domain Master', icon: '👑', desc: 'Defeat a Boss Battle' },
    { id: 5, name: 'Career Legend', icon: '💎', desc: 'Unlock Level 100' }
];

const INVENTORY = [
    { name: 'Shield of Syntax', icon: '🛡️', type: 'Defense', desc: 'Allows skipping 1 syntax mistake' },
    { name: 'Debug Potion', icon: '🧪', type: 'Consumable', desc: 'Instantly reveals hints' },
    { name: 'Logic Sword', icon: '⚔️', type: 'Offense', desc: 'Deals 2x damage to Boss bugs' }
];

const AcademyHub = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKingdom, setSelectedKingdom] = useState(null);
    const [userStats, setUserStats] = useState({
        level: 12,
        xp: 6250,
        nextLevelXp: 7500,
        coins: 480,
        streak: 5,
        careerRank: 'Specialist'
    });

    const handleStartQuest = (role, skill) => {
        navigate(`/learn/${encodeURIComponent(role)}/${encodeURIComponent(skill)}`);
    };

    const progressPercentage = (userStats.xp / userStats.nextLevelXp) * 100;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, #111827, #030712)',
            color: '#f3f4f6',
            fontFamily: "'Outfit', sans-serif",
            padding: '2rem 1.5rem',
            paddingBottom: '5rem',
            boxSizing: 'border-box'
        }}>
            {/* ─────────────────────────────────────────────────────────────────
                HUD BAR (Player Status)
                ───────────────────────────────────────────────────────────────── */}
            <div style={{
                background: 'rgba(31, 41, 55, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                padding: '1.25rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '2.5rem',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}>
                {/* Profile Circle & Ranks */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                        border: '2px solid rgba(255,255,255,0.2)'
                    }}>
                        👤
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Sanjai</h2>
                        <span style={{
                            background: 'linear-gradient(90deg, #fb7185, #f43f5e)',
                            color: 'white',
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            👑 {userStats.careerRank}
                        </span>
                    </div>
                </div>

                {/* Level and XP Bar */}
                <div style={{ flex: 1, minWidth: '220px', maxWidth: '380px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem', color: '#9ca3af' }}>
                        <span style={{ color: '#a5b4fc' }}>LEVEL {userStats.level}</span>
                        <span>{userStats.xp} / {userStats.nextLevelXp} XP</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: '#374151', borderRadius: '6px', overflow: 'hidden', padding: '1px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '5px', transition: 'width 0.4s' }} />
                    </div>
                </div>

                {/* Flame Streak & Coins */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem 1rem', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                        <FaFire size={20} color="#f59e0b" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.5))' }} />
                        <span style={{ fontWeight: 800, color: '#f59e0b' }}>{userStats.streak} Day Streak</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(234, 179, 8, 0.1)', padding: '0.5rem 1rem', borderRadius: '16px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                        <FaCoins size={20} color="#eab308" style={{ filter: 'drop-shadow(0 0 6px rgba(234,179,8,0.5))' }} />
                        <span style={{ fontWeight: 800, color: '#eab308' }}>{userStats.coins} Coins</span>
                    </div>
                </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────────
                MAIN PAGE COLUMNS
                ───────────────────────────────────────────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }} className="academy-main-grid">
                
                {/* Left: Quests & Game Kingdoms */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    
                    {/* Top: Active Adventure */}
                    <div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaCompass color="#6366f1" /> Continue Your Adventure
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                            {/* Daily Quest Card */}
                            <div 
                                onClick={() => handleStartQuest('Full Stack Developer', 'HTML')}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), rgba(168, 85, 247, 0.05))',
                                    border: '1px solid rgba(99, 102, 241, 0.25)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.25)'; }}
                            >
                                <span style={{ background: '#6366f1', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '6px', position: 'absolute', right: '1.25rem', top: '1.25rem' }}>DAILY QUEST</span>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800 }}>Assemble HTML Castle Blocks</h4>
                                <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0 0 1.25rem 0' }}>Place website layout bricks to construct the layout wall.</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>+50 XP & +10 Coins</span>
                                    <button style={{ background: '#6366f1', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        Play Now <FaArrowRight size={10} />
                                    </button>
                                </div>
                            </div>

                            {/* Weekly Challenge Card */}
                            <div 
                                onClick={() => handleStartQuest('Cyber Security Engineer', 'OWASP')}
                                style={{
                                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.05))',
                                    border: '1px solid rgba(16, 185, 129, 0.25)',
                                    borderRadius: '20px',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease-in-out'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.25)'; }}
                            >
                                <span style={{ background: '#10b981', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.25rem 0.5rem', borderRadius: '6px', position: 'absolute', right: '1.25rem', top: '1.25rem' }}>CHALLENGE</span>
                                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem', fontWeight: 800 }}>Defend Castle Firewall</h4>
                                <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: '0 0 1.25rem 0' }}>Configure security rules to intercept incoming port packets.</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>+150 XP & +40 Coins</span>
                                    <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        Play Now <FaArrowRight size={10} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section: Game Worlds Kingdoms */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <FaGamepad color="#a855f7" /> Game Worlds
                            </h3>
                            {/* Search bar */}
                            <div style={{ position: 'relative', width: '220px' }}>
                                <FaSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '0.8rem' }} />
                                <input
                                    type="text"
                                    placeholder="Search world..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        padding: '0.4rem 0.6rem 0.4rem 2rem',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Kingdom Map Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            {GAME_WORLDS.filter(k => k.name.toLowerCase().includes(searchTerm.toLowerCase())).map((k) => {
                                const IconComp = k.icon;
                                const isSelected = selectedKingdom === k.id;
                                return (
                                    <div key={k.id} style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div 
                                            onClick={() => setSelectedKingdom(isSelected ? null : k.id)}
                                            style={{
                                                background: 'rgba(31, 41, 55, 0.3)',
                                                border: `1.5px solid ${isSelected ? k.color : 'rgba(255, 255, 255, 0.05)'}`,
                                                borderRadius: '20px',
                                                padding: '1.25rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                boxShadow: isSelected ? `0 0 20px ${k.color}15` : 'none',
                                                display: 'flex',
                                                gap: '1rem',
                                                alignItems: 'center'
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = k.color; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isSelected ? k.color : 'rgba(255, 255, 255, 0.05)'; }}
                                        >
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '12px',
                                                background: k.gradient,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexShrink: 0
                                            }}>
                                                <IconComp size={20} color="white" />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{k.name}</h4>
                                                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{k.description}</p>
                                            </div>
                                            <FaChevronRight size={12} style={{ color: '#4b5563', transform: isSelected ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                                        </div>

                                        {/* Dropdown Paths inside selection */}
                                        <AnimatePresence>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    style={{
                                                        background: 'rgba(31, 41, 55, 0.15)',
                                                        borderRadius: '0 0 16px 16px',
                                                        border: '1px solid rgba(255,255,255,0.03)',
                                                        borderTop: 'none',
                                                        padding: '1rem',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '0.75rem',
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: k.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Adventure Paths</span>
                                                    {k.roles.map((path, idx) => (
                                                        <div key={idx} style={{
                                                            background: 'rgba(255,255,255,0.02)',
                                                            border: '1px solid rgba(255,255,255,0.05)',
                                                            borderRadius: '12px',
                                                            padding: '0.75rem',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '0.5rem'
                                                        }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>{path.title}</span>
                                                                <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{path.learners} players</span>
                                                            </div>
                                                            {/* Path Node Tree Preview */}
                                                            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.2rem 0' }}>
                                                                {path.skills.map((skill, sidx) => (
                                                                    <button
                                                                        key={sidx}
                                                                        onClick={() => handleStartQuest(path.title, skill)}
                                                                        style={{
                                                                            background: sidx === 0 ? k.color : 'rgba(31, 41, 55, 0.6)',
                                                                            color: sidx === 0 ? 'white' : '#9ca3af',
                                                                            border: 'none',
                                                                            padding: '0.35rem 0.65rem',
                                                                            borderRadius: '8px',
                                                                            fontSize: '0.72rem',
                                                                            fontWeight: 700,
                                                                            cursor: 'pointer',
                                                                            whiteSpace: 'nowrap',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.25rem',
                                                                            transition: 'all 0.2s'
                                                                        }}
                                                                        onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.15)'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
                                                                    >
                                                                        {sidx > 0 && <FaLock size={8} />} {skill}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Right Column: Inventory, Badges, Leaderboard */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Leaderboard Panel */}
                    <div style={{
                        background: 'rgba(31, 41, 55, 0.25)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '20px',
                        padding: '1.25rem'
                    }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaTrophy color="#eab308" /> Arena Leaderboard
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {LEADERBOARD.map((p, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '12px',
                                    background: p.name.includes('You') ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.01)',
                                    border: p.name.includes('You') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(255,255,255,0.03)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: idx === 0 ? '#fbbf24' : idx === 1 ? '#9ca3af' : '#b45309', width: '18px' }}>
                                            #{p.rank}
                                        </span>
                                        <span style={{ fontSize: '1.1rem' }}>{p.avatar}</span>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{p.name}</span>
                                            <span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>{p.title}</span>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#a5b4fc' }}>{p.xp} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Inventory Items */}
                    <div style={{
                        background: 'rgba(31, 41, 55, 0.25)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '20px',
                        padding: '1.25rem'
                    }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaGem color="#f43f5e" /> Quest Inventory
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                            {INVENTORY.map((item, idx) => (
                                <div 
                                    key={idx} 
                                    title={`${item.name} (${item.type}): ${item.desc}`}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        padding: '0.75rem 0.5rem',
                                        textAlign: 'center',
                                        cursor: 'help',
                                        transition: 'transform 0.15s'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'; }}
                                >
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>{item.icon}</div>
                                    <div style={{ fontSize: '0.62rem', fontWeight: 800, color: '#e5e7eb', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Badges Earned */}
                    <div style={{
                        background: 'rgba(31, 41, 55, 0.25)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '20px',
                        padding: '1.25rem'
                    }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaMedal color="#60a5fa" /> Unlocked Badges
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {BADGES.map((b) => (
                                <div 
                                    key={b.id} 
                                    title={`${b.name}: ${b.desc}`}
                                    style={{
                                        background: 'rgba(96, 165, 250, 0.08)',
                                        border: '1px solid rgba(96, 165, 250, 0.25)',
                                        borderRadius: '12px',
                                        padding: '0.4rem 0.6rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.72rem',
                                        fontWeight: 700,
                                        cursor: 'help'
                                    }}
                                >
                                    <span>{b.icon}</span>
                                    <span>{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AcademyHub;
