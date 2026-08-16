import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    FaArrowLeft, FaCoins, FaFire, FaRobot, FaGamepad, FaTrophy, 
    FaArrowRight, FaLock, FaGift, FaPlay, FaKey, FaShieldAlt, FaQuestionCircle, 
    FaCheckCircle, FaTrash, FaCheck, FaExclamationTriangle, FaHeartbeat, FaBalanceScale,
    FaLightbulb, FaTools, FaMapMarkerAlt, FaHatWizard, FaChess, FaSearch, FaVolumeUp, FaShareAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './CareerLearningAcademy.css';

const CareerLearningAcademy = () => {
    const { role, skill } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { language } = useLanguage();

    const roleName = decodeURIComponent(role).replace(/-/g, ' ');
    const skillName = decodeURIComponent(skill).replace(/-/g, ' ');

    // ─────────────────────────────────────────────────────────────────────────
    // PLATFORM STATS STATE (Universal HUD)
    // ─────────────────────────────────────────────────────────────────────────
    const [xp, setXp] = useState(6250);
    const [coins, setCoins] = useState(480);
    const [level, setLevel] = useState(12);
    const [streak, setStreak] = useState(5);
    const [inventory, setInventory] = useState(['Shield of Syntax', 'Debug Potion', 'Logic Sword']);
    
    // ─────────────────────────────────────────────────────────────────────────
    // PROGRESSION STATE
    // ─────────────────────────────────────────────────────────────────────────
    const [activeWorld, setActiveWorld] = useState('Beginner'); // Beginner, Intermediate, Advanced, Master, Project, Legend
    const [activeStage, setActiveStage] = useState('Discover'); // Discover, Play, Experiment, Practice, Challenge, Master, Build Project
    const [activeMission, setActiveMission] = useState('Tutorial Mission'); // Tutorial, Practice, Challenge, Mini Game, Boss Battle
    const [completedMissions, setCompletedMissions] = useState({});

    // Win Modals
    const [showRewardModal, setShowRewardModal] = useState(false);
    const [earnedRewards, setEarnedRewards] = useState({ xp: 0, coins: 0, item: '' });

    // AI Game Master NPC State
    const [gmText, setGmText] = useState(
        `Welcome to the ${skillName} track! I am your AI Game Master. Today you will conquer the ${activeWorld} World through interactive gaming, starting with the Discover stage!`
    );

    // ─────────────────────────────────────────────────────────────────────────
    // UNIVERSAL GAME ENGINE CLASSIFICATION
    // ─────────────────────────────────────────────────────────────────────────
    // Determine game type dynamically based on topic / skill
    const getGameType = () => {
        const title = (skillName + ' ' + roleName).toLowerCase();
        if (title.includes('html') || title.includes('css') || title.includes('design') || title.includes('layout') || title.includes('ui') || title.includes('ux') || title.includes('creative') || title.includes('builder')) {
            return 'BUILDER';
        }
        if (title.includes('javascript') || title.includes('python') || title.includes('programming') || title.includes('code') || title.includes('algorithm') || title.includes('logic')) {
            return 'PUZZLE';
        }
        if (title.includes('finance') || title.includes('business') || title.includes('entrepreneurship') || title.includes('economy') || title.includes('bank') || title.includes('tycoon')) {
            return 'TYCOON';
        }
        if (title.includes('medical') || title.includes('doctor') || title.includes('anatomy') || title.includes('biology') || title.includes('healthcare') || title.includes('patient')) {
            return 'SIMULATION';
        }
        if (title.includes('law') || title.includes('court') || title.includes('history') || title.includes('communication') || title.includes('speak') || title.includes('social')) {
            return 'ROLEPLAY';
        }
        if (title.includes('math') || title.includes('aptitude') || title.includes('reasoning') || title.includes('gate') || title.includes('strategy')) {
            return 'STRATEGY';
        }
        if (title.includes('cybersecurity') || title.includes('security') || title.includes('defense') || title.includes('network') || title.includes('fortress')) {
            return 'DEFENSE';
        }
        if (title.includes('data') || title.includes('sql') || title.includes('analyst') || title.includes('database') || title.includes('detective')) {
            return 'DETECTIVE';
        }
        return 'SANDBOX'; // Default game type
    };

    const gameType = getGameType();

    // ─────────────────────────────────────────────────────────────────────────
    // DYNAMIC INTERACTIVE GAME STATES
    // ─────────────────────────────────────────────────────────────────────────
    
    // BUILDER: Blocks placed
    const [builderBlocks, setBuilderBlocks] = useState([]);
    
    // PUZZLE: Programming sequence commands
    const [puzzleCommands, setPuzzleCommands] = useState([]);
    const [robotPos, setRobotPos] = useState({ x: 0, y: 0 });
    const [robotLog, setRobotLog] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);

    // TYCOON: Business metrics
    const [tycoonCash, setTycoonCash] = useState(50000);
    const [tycoonTurn, setTycoonTurn] = useState(1);
    const [tycoonSliders, setTycoonSliders] = useState({ price: 25, marketing: 1000, salaries: 1500 });

    // SIMULATION: Gauges/Dials
    const [simVitals, setSimVitals] = useState({ heartRate: 75, temperature: 98.6, oxygen: 98 });

    // ROLEPLAY: Dialogue node
    const [dialogueNode, setDialogueNode] = useState(0);

    // STRATEGY: Puzzle Grid/Maze
    const [mazePos, setMazePos] = useState({ x: 0, y: 0 });

    // DEFENSE: Castle wall active shields
    const [castleHealth, setCastleHealth] = useState(100);
    const [activeDefense, setActiveDefense] = useState('');

    // DETECTIVE: Case evidence logs
    const [clueRevealed, setClueRevealed] = useState(false);

    // ─────────────────────────────────────────────────────────────────────────
    // GAME ACTION HANDLERS
    // ─────────────────────────────────────────────────────────────────────────
    const handleQuestSuccess = (bonusXp = 100, bonusCoins = 30) => {
        setXp(prev => {
            const nextXp = prev + bonusXp;
            if (nextXp >= level * 650) {
                setLevel(l => l + 1);
                setGmText(`✨ Ding! LEVEL UP! You are now Level ${level + 1}!`);
            }
            return nextXp;
        });
        setCoins(prev => prev + bonusCoins);
        setEarnedRewards({ xp: bonusXp, coins: bonusCoins, item: 'Legendary Scroll' });
        setShowRewardModal(true);

        const missionKey = `${activeWorld}-${activeMission}-${activeStage}`;
        setCompletedMissions(prev => ({ ...prev, [missionKey]: true }));
        setGmText(`🏆 Outstanding Strategy! You conquered the ${activeStage} phase of this mission.`);
    };

    // JS Robot command simulator
    const executeRobotCommands = async () => {
        if (isSimulating) return;
        setIsSimulating(true);
        setRobotPos({ x: 0, y: 0 });
        setRobotLog('Booting robot runtime...');

        let current = { x: 0, y: 0 };
        for (let i = 0; i < puzzleCommands.length; i++) {
            const cmd = puzzleCommands[i];
            await new Promise(r => setTimeout(r, 500));
            if (cmd === 'UP') current.y = Math.max(0, current.y - 1);
            if (cmd === 'DOWN') current.y = Math.min(3, current.y + 1);
            if (cmd === 'LEFT') current.x = Math.max(0, current.x - 1);
            if (cmd === 'RIGHT') current.x = Math.min(3, current.x + 1);
            setRobotPos({ ...current });
        }

        if (current.x === 3 && current.y === 3) {
            setRobotLog('🎯 Destination Lock Gained! Program Executed Successfully.');
            handleQuestSuccess(120, 40);
        } else {
            setRobotLog(`🤖 Robot stopped at (${current.x}, ${current.y}). Expected (3,3).`);
        }
        setIsSimulating(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle at 50% 0%, #0d111c, #07090e)',
            color: '#e5e7eb',
            fontFamily: "'Outfit', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box'
        }}>
            
            {/* ─── PLATFORM HUD ─── */}
            <div style={{
                height: '75px',
                background: 'rgba(15, 23, 42, 0.6)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2rem',
                boxSizing: 'border-box'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <button 
                        onClick={() => navigate('/academy')}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#9ca3af',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <FaArrowLeft size={16} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.65rem', background: '#8b5cf6', color: 'white', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: '4px' }}>TENSHIRO ENGINE</span>
                            <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>{skillName} Universe</h2>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Active World: {activeWorld} (Level {level})</span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                        <FaTrophy color="#818cf8" size={14} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{xp} XP</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(234, 179, 8, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '12px', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                        <FaCoins color="#fbbf24" size={14} />
                        <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>{coins} Coins</span>
                    </div>
                </div>
            </div>

            {/* ─── MAIN PLATFORM CANVAS ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', flex: 1, overflow: 'hidden' }}>
                
                {/* Left Panel: Level Syllabi Tree & AI GM */}
                <div style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem',
                    gap: '1.5rem',
                    overflowY: 'auto'
                }}>
                    {/* AI Game Master NPC */}
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12), rgba(236, 72, 153, 0.05))',
                        border: '1.5px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '20px',
                        padding: '1.25rem',
                        position: 'relative'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <FaHatWizard color="#a78bfa" size={18} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.5px' }}>AI Game Master</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.4, color: '#e5e7eb' }}>
                            {gmText}
                        </p>
                    </div>

                    {/* Game Worlds Map Node */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Syllabus World Maps</span>
                        {['Beginner', 'Intermediate', 'Advanced', 'Master', 'Project', 'Legend'].map((world) => {
                            const isCurrent = activeWorld === world;
                            return (
                                <div 
                                    key={world}
                                    onClick={() => {
                                        setActiveWorld(world);
                                        setGmText(`Teleporting to the ${world} World map... Make sure to clear the Boss stage!`);
                                    }}
                                    style={{
                                        background: isCurrent ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                        border: isCurrent ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid rgba(255, 255, 255, 0.04)',
                                        borderRadius: '14px',
                                        padding: '0.75rem 1rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isCurrent ? '#a78bfa' : 'white' }}>{world} World</span>
                                    {isCurrent ? <FaMapMarkerAlt color="#a78bfa" size={12} /> : <FaLock color="#4b5563" size={10} />}
                                </div>
                            );
                        })}
                    </div>

                    {/* World Stages Selector */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Adventure Stages</span>
                        {['Discover', 'Play', 'Experiment', 'Practice', 'Challenge', 'Master', 'Build Project'].map((stage) => {
                            const isCurrentStage = activeStage === stage;
                            return (
                                <button
                                    key={stage}
                                    onClick={() => {
                                        setActiveStage(stage);
                                        setGmText(`Stage changed: ${stage}. Load your custom game engine configurations now.`);
                                    }}
                                    style={{
                                        background: isCurrentStage ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'rgba(255,255,255,0.03)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        boxShadow: isCurrentStage ? '0 4px 10px rgba(139,92,246,0.3)' : 'none'
                                    }}
                                >
                                    🎮 {stage}
                                </button>
                            );
                        })}
                    </div>

                </div>

                {/* Right Panel: Universal Game Console */}
                <div style={{
                    padding: '2.5rem',
                    background: 'radial-gradient(circle at 50% 50%, #0f172a, #0b0f19)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflowY: 'auto'
                }}>
                    
                    <div style={{
                        width: '100%',
                        maxWidth: '850px',
                        background: 'rgba(30, 41, 59, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        boxSizing: 'border-box'
                    }}>
                        
                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: BUILDER (Layout, Design, Structures)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'BUILDER' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaTools color="#8b5cf6" /> Universal Sandbox Builder
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Assemble and stack layouts blocks to build the required concept structures.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Available Bricks</span>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                            {['Header NavBar', 'Grid Container', 'Card Widget', 'Action Button'].map((b) => (
                                                <button
                                                    key={b}
                                                    onClick={() => setBuilderBlocks([...builderBlocks, b])}
                                                    style={{
                                                        background: 'rgba(139, 92, 246, 0.1)',
                                                        border: '1px dashed rgba(139, 92, 246, 0.4)',
                                                        color: '#c084fc',
                                                        padding: '0.5rem 0.8rem',
                                                        borderRadius: '8px',
                                                        fontSize: '0.78rem',
                                                        fontWeight: 700,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    + {b}
                                                </button>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: '1.5rem' }}>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Assembly Stack</span>
                                            <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', minHeight: '110px', padding: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                                {builderBlocks.length === 0 && <span style={{ fontSize: '0.78rem', color: '#4b5563' }}>No blocks stacked. Click above to build.</span>}
                                                {builderBlocks.map((b, i) => (
                                                    <div key={i} style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '6px', padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}>
                                                        🧱 {b}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Visual Output Preview</span>
                                        <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', height: '210px', marginTop: '0.5rem', padding: '0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            {builderBlocks.length === 0 && <span style={{ color: '#4b5563', fontSize: '0.78rem', textAlign: 'center', marginTop: '4rem' }}>Empty Canvas</span>}
                                            {builderBlocks.includes('Header NavBar') && (
                                                <div style={{ background: '#1e293b', padding: '0.4rem', borderRadius: '6px', fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between' }}>
                                                    <strong>🏰 Citadel</strong>
                                                    <span>Map | Quests</span>
                                                </div>
                                            )}
                                            {builderBlocks.includes('Grid Container') && (
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                                                    <div style={{ background: '#334155', height: '30px', borderRadius: '4px' }} />
                                                    <div style={{ background: '#334155', height: '30px', borderRadius: '4px' }} />
                                                </div>
                                            )}
                                            {builderBlocks.includes('Card Widget') && (
                                                <div style={{ background: '#1e293b', padding: '0.5rem', borderRadius: '6px', fontSize: '0.68rem' }}>Widget Block Loaded</div>
                                            )}
                                            {builderBlocks.includes('Action Button') && (
                                                <button style={{ background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', padding: '0.4rem', fontSize: '0.7rem', fontWeight: 700 }}>Validate</button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleQuestSuccess(100, 20)}
                                    disabled={builderBlocks.length < 2}
                                    style={{
                                        width: '100%',
                                        background: builderBlocks.length >= 2 ? 'linear-gradient(135deg, #10b981, #059669)' : '#1e293b',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.8rem',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Build Real Project Simulation
                                </button>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: PUZZLE (Logic, Code, Algorithms)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'PUZZLE' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaRobot color="#818cf8" /> Command Programming Puzzle
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Instruct the logic drone step-by-step to compile successfully and reach the target (3, 3).
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Logic Commands</span>
                                        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                            {['UP', 'DOWN', 'LEFT', 'RIGHT'].map((cmd) => (
                                                <button
                                                    key={cmd}
                                                    onClick={() => setPuzzleCommands([...puzzleCommands, cmd])}
                                                    style={{
                                                        background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', color: 'white',
                                                        padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700
                                                    }}
                                                >
                                                    {cmd}
                                                </button>
                                            ))}
                                            {puzzleCommands.length > 0 && (
                                                <button onClick={() => setPuzzleCommands([])} style={{ background: '#ef444420', color: '#ef4444', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700 }}>Reset</button>
                                            )}
                                        </div>

                                        <div style={{ marginTop: '1rem', background: '#0b0f19', borderRadius: '12px', padding: '1rem', minHeight: '100px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                                            {puzzleCommands.length === 0 && <span style={{ color: '#4b5563' }}>// Queue instructions...</span>}
                                            {puzzleCommands.map((c, i) => (
                                                <div key={i} style={{ color: '#818cf8' }}>{`step${i + 1}(): drone.move${c.charAt(0) + c.slice(1).toLowerCase()}();`}</div>
                                            ))}
                                            {robotLog && <div style={{ color: '#34d399', marginTop: '0.5rem', fontWeight: 700 }}>{robotLog}</div>}
                                        </div>
                                    </div>

                                    {/* Grid Visual */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 45px)', gap: '4px', background: '#1e293b', padding: '6px', borderRadius: '12px' }}>
                                            {[0, 1, 2, 3].map((y) => (
                                                [0, 1, 2, 3].map((x) => {
                                                    const isRobot = robotPos.x === x && robotPos.y === y;
                                                    const isTarget = x === 3 && y === 3;
                                                    return (
                                                        <div
                                                            key={`${x}-${y}`}
                                                            style={{
                                                                width: '45px', height: '45px', background: isTarget ? '#eab30820' : '#334155', borderRadius: '8px',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                                                                border: isTarget ? '1.5px dashed #fbbf24' : 'none'
                                                            }}
                                                        >
                                                            {isRobot ? '🤖' : isTarget ? '🌟' : ''}
                                                        </div>
                                                    );
                                                })
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={executeRobotCommands}
                                    disabled={puzzleCommands.length === 0 || isSimulating}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.8rem',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isSimulating ? 'Compiling Run...' : 'Execute Drone Logic ⚡'}
                                </button>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: TYCOON (Business, Strategy)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'TYCOON' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaCoins color="#eab308" /> Startup Empire Tycoon
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Launch a virtual startup, adjust pricing and marketing dials, and reach $60,000 cash!
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af' }}>
                                                <span>Product Price</span>
                                                <span>${tycoonSliders.price}</span>
                                            </div>
                                            <input type="range" min="10" max="60" value={tycoonSliders.price} onChange={e => setTycoonSliders({ ...tycoonSliders, price: parseInt(e.target.value) })} style={{ width: '100%' }} />
                                        </div>

                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af' }}>
                                                <span>Marketing Dial</span>
                                                <span>${tycoonSliders.marketing}</span>
                                            </div>
                                            <input type="range" min="500" max="5000" step="500" value={tycoonSliders.marketing} onChange={e => setTycoonSliders({ ...tycoonSliders, marketing: parseInt(e.target.value) })} style={{ width: '100%' }} />
                                        </div>
                                    </div>

                                    <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>TURN: {tycoonTurn}</span>
                                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#10b981', margin: '0.2rem 0' }}>${tycoonCash.toLocaleString()}</div>
                                        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Seed capital left</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        const profit = (tycoonSliders.marketing / 10) * (100 - tycoonSliders.price) - tycoonSliders.salaries;
                                        const nextCash = tycoonCash + profit;
                                        setTycoonCash(nextCash);
                                        setTycoonTurn(tycoonTurn + 1);
                                        if (nextCash >= 60000) {
                                            handleQuestSuccess(150, 40);
                                        } else {
                                            setGmText(`Turn ${tycoonTurn} complete. Cash updated to $${nextCash.toLocaleString()}.`);
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '0.8rem',
                                        borderRadius: '12px',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    End Business Turn & Audit Sales
                                </button>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: SIMULATION (Medical, Sciences)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'SIMULATION' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaHeartbeat color="#14b8a6" /> VR Laboratory Diagnostics
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Stabilize patient vitals or calibrate bio-reactor systems.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                                            <span>Heart Rate</span>
                                            <span style={{ color: '#14b8a6', fontWeight: 700 }}>{simVitals.heartRate} BPM</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                                            <span>Oxygen Level</span>
                                            <span style={{ color: '#14b8a6', fontWeight: 700 }}>{simVitals.oxygen}%</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Action Treatments</span>
                                        <button onClick={() => {
                                            setSimVitals({ heartRate: 72, temperature: 98.6, oxygen: 99 });
                                            handleQuestSuccess(120, 30);
                                        }} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.6rem', color: 'white', cursor: 'pointer', textAlign: 'left' }}>
                                            💉 Inject Epinephrine
                                        </button>
                                        <button onClick={() => {
                                            setSimVitals({ ...simVitals, oxygen: 95 });
                                        }} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.6rem', color: 'white', cursor: 'pointer', textAlign: 'left' }}>
                                            🌬️ Adjust Oxygen Flow
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: ROLEPLAY (Law, History, Communication)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'ROLEPLAY' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaBalanceScale color="#e11d48" /> Courtroom & Story Role Play
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Engage in dialogue with the AI NPC witness and choose strategic responses.
                                </p>

                                <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.72rem', color: '#e11d48', fontWeight: 800, textTransform: 'uppercase' }}>Witness Statement</span>
                                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>
                                        {dialogueNode === 0 
                                            ? 'I swear I saw the suspect near the building bank vault at exactly 9:00 PM, holding a black logic sword.'
                                            : 'Wait, now that I recall, the streetlights were dark and I could only see shadows...'}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {dialogueNode === 0 ? (
                                        <>
                                            <button onClick={() => setDialogueNode(1)} style={{ textAlign: 'left', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', color: 'white', cursor: 'pointer' }}>
                                                Objection! Witness has testified that streetlights were broken that night.
                                            </button>
                                            <button onClick={() => setGmText('Objection overruled. Focus on concrete evidence.')} style={{ textAlign: 'left', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1rem', color: 'white', cursor: 'pointer' }}>
                                                No Objection. Proceed with questioning.
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleQuestSuccess(140, 35)} style={{ textAlign: 'left', background: '#10b98120', border: '1px solid #10b981', borderRadius: '12px', padding: '1rem', color: 'white', cursor: 'pointer' }}>
                                            Case closed. The testimony is discredited. Claim victory!
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: DEFENSE (Cybersecurity, Networks)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'DEFENSE' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaShieldAlt color="#059669" /> Castle Firewall Network Defense
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Deploy security ports and firewall defenses to mitigate incoming server exploits.
                                </p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                                            <span>Citadel Gateway Health</span>
                                            <span style={{ color: '#059669', fontWeight: 700 }}>{castleHealth}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${castleHealth}%`, height: '100%', background: '#059669' }} />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase' }}>Active Defense Shields</span>
                                        {['Block Port 80 DDoS', 'Apply SSL Certificate', 'Sanitize DB Inputs'].map((shield) => (
                                            <button 
                                                key={shield}
                                                onClick={() => {
                                                    setActiveDefense(shield);
                                                    setGmText(`Firewall protocol deployed: ${shield}. Exploit cleared!`);
                                                    handleQuestSuccess(130, 30);
                                                }}
                                                style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.6rem', color: '#34d399', cursor: 'pointer', fontWeight: 700 }}
                                            >
                                                🛡️ {shield}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: DETECTIVE (Data, Analysis, SQL)
                            ───────────────────────────────────────────────────── */}
                        {gameType === 'DETECTIVE' && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaKey color="#0ea5e9" /> Server Database Clue Detective
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Inspect raw registry records to gather incriminating clues.
                                </p>

                                <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.72rem', color: '#0ea5e9', fontWeight: 800, textTransform: 'uppercase' }}>Clue Investigation Log</span>
                                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>
                                        Identify the database query log entry where the hacker accessed the master ledger.
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                    {['SELECT * FROM logs WHERE severity = "Critical";', 'SELECT suspect_ip FROM access_ledger WHERE ledger_accessed = TRUE;'].map((query, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => {
                                                setClueRevealed(true);
                                                handleQuestSuccess(120, 25);
                                            }}
                                            style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.8rem', color: '#38bdf8', cursor: 'pointer', fontFamily: 'monospace', fontSize: '0.78rem', textAlign: 'left' }}
                                        >
                                            🔍 {query}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ─────────────────────────────────────────────────────
                            RENDER TYPE: STRATEGY (Aptitude, Math, Default Sandbox)
                            ───────────────────────────────────────────────────── */}
                        {(gameType === 'STRATEGY' || gameType === 'SANDBOX') && (
                            <div>
                                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FaGamepad color="#a855f7" /> RPG Strategy Puzzle Maze
                                </h3>
                                <p style={{ margin: '0 0 1.5rem 0', color: '#9ca3af', fontSize: '0.85rem' }}>
                                    Select the correct strategic action card to resolve this logic maze scenario.
                                </p>

                                <div style={{ background: '#0b0f19', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '0.72rem', color: '#a855f7', fontWeight: 800, textTransform: 'uppercase' }}>Maze Gate Riddle</span>
                                    <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.92rem', fontWeight: 600, lineHeight: 1.5 }}>
                                        To disable the lock, you must choose the most cost-effective blueprint model.
                                    </p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {[
                                        'Construct a lightweight modular layout blueprint.',
                                        'Deploy a heavy layout structure requiring triple the resources.'
                                    ].map((opt, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => {
                                                if (idx === 0) {
                                                    handleQuestSuccess(100, 20);
                                                } else {
                                                    setGmText('❌ Strategy failed! The structure collapsed. Try a lighter layout model.');
                                                }
                                            }}
                                            style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '0.8rem', color: 'white', cursor: 'pointer', textAlign: 'left', fontWeight: 700 }}
                                        >
                                            🗺️ {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* Reward Modal */}
            <AnimatePresence>
                {showRewardModal && (
                    <div style={{
                        position: 'fixed', inset: 0,
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            style={{
                                background: '#1e1b4b',
                                border: '2px solid rgba(139,92,246,0.5)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                width: '380px',
                                textAlign: 'center',
                                boxShadow: '0 20px 50px rgba(139,92,246,0.3)'
                            }}
                        >
                            <div style={{ fontSize: '4.5rem', marginBottom: '1rem', filter: 'drop-shadow(0 0 12px rgba(139,92,246,0.5))' }}>🎁</div>
                            <h2 style={{ margin: '0 0 0.5rem 0', color: '#c084fc', fontSize: '1.8rem', fontWeight: 900 }}>Quest Completed!</h2>
                            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', margin: '0 0 2rem 0' }}>
                                You successfully completed the simulation and unlocked the loot chest.
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a78bfa' }}>+{earnedRewards.xp}</span>
                                    <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700 }}>XP</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>+{earnedRewards.coins}</span>
                                    <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700 }}>Coins</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ec4899' }}>1</span>
                                    <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 700 }}>Item</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowRewardModal(false)}
                                style={{
                                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 2rem',
                                    borderRadius: '12px',
                                    fontWeight: 900,
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    width: '100%',
                                    transition: 'all 0.2s'
                                }}
                            >
                                Claim Loot & Continue
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CareerLearningAcademy;
