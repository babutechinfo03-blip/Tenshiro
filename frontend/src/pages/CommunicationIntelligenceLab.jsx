import React, { useState, useEffect, useRef } from 'react';
import {
    FaBookOpen, FaArrowLeft, FaPlayCircle, FaCheckCircle, FaExclamationCircle,
    FaLightbulb, FaVideo, FaChalkboardTeacher, FaGamepad, FaSearch, FaExternalLinkAlt,
    FaClock, FaTrophy, FaRedo, FaLink, FaChartLine, FaMicrophone, FaVolumeUp, FaBriefcase,
    FaEnvelope, FaUsers, FaUserTie, FaAward, FaBrain, FaHandsHelping, FaShieldAlt,
    FaDownload, FaTimes, FaStar, FaCertificate
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './CommunicationIntelligenceLab.css';
import CommunicationTestRunner from '../components/communication/CommunicationTestRunner';

const CommunicationIntelligenceLab = () => {
    const { user } = useAuth();
    const [mainTab, setMainTab] = useState('learning'); // 'learning' | 'assessment'
    const [activeSection, setActiveSection] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedSubtopicIndex, setSelectedSubtopicIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showCertModal, setShowCertModal] = useState(false);
    const certRef = useRef(null);

    // Assessment scores
    const [quizScore, setQuizScore] = useState(82);
    const [speakingScore, setSpeakingScore] = useState(85);

    const getLevel = (score) => {
        if (score <= 40) return 'Beginner';
        if (score <= 60) return 'Intermediate';
        if (score <= 80) return 'Advanced';
        if (score <= 90) return 'Professional';
        return 'Placement Ready';
    };

    const overallReadiness = Math.round((quizScore + speakingScore) / 2);

    // Data states
    const [grammarTopics, setGrammarTopics] = useState([]);
    const [courses, setCourses] = useState([]);
    const [videos, setVideos] = useState([]);
    const [resources, setResources] = useState([]);

    // Search
    const [searchQuery, setSearchQuery] = useState('');

    // Grammar Practice states
    const [practiceTopicSelected, setPracticeTopicSelected] = useState(null);
    const [mockTestActive, setMockTestActive] = useState(false);
    const [mockTestQuestions, setMockTestQuestions] = useState([]);
    const [mockTestAnswers, setMockTestAnswers] = useState({});
    const [mockTestSubmitted, setMockTestSubmitted] = useState(false);
    const [mockTimer, setMockTimer] = useState(600);
    const [mockLoading, setMockLoading] = useState(false);
    const mockTimerRef = React.useRef(null);

    // Section Filter States
    const [activePlatform, setActivePlatform] = useState('All');
    const [activeLevel, setActiveLevel] = useState('All');
    const [activeTopic, setActiveTopic] = useState('All');
    const [activeCat, setActiveCat] = useState('All');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [gRes, cRes, vRes, rRes] = await Promise.all([
                axios.get('/api/comm/grammar', config).catch(() => ({ data: [] })),
                axios.get('/api/comm/courses', config).catch(() => ({ data: [] })),
                axios.get('/api/comm/videos', config).catch(() => ({ data: [] })),
                axios.get('/api/comm/resources', config).catch(() => ({ data: [] }))
            ]);

            setGrammarTopics(gRes.data);
            setCourses(cRes.data);
            setVideos(vRes.data);
            setResources(rRes.data);
        } catch (error) {
            console.error("Error fetching lab data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Cleanup active section state changes
    useEffect(() => {
        setSelectedTopic(null);
        setPracticeTopicSelected(null);
        setMockTestActive(false);
        setMockTestQuestions([]);
        setMockTestAnswers({});
        setMockTestSubmitted(false);
        setMockTimer(600);
        if (mockTimerRef.current) clearInterval(mockTimerRef.current);
        setActivePlatform('All');
        setActiveLevel('All');
        setActiveTopic('All');
        setActiveCat('All');
        setSearchQuery('');
    }, [activeSection]);

    // Mock test timer
    useEffect(() => {
        if (mockTestActive && !mockTestSubmitted) {
            mockTimerRef.current = setInterval(() => {
                setMockTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(mockTimerRef.current);
                        handleMockSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(mockTimerRef.current);
    }, [mockTestActive, mockTestSubmitted]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const fetchTopicQuiz = async (topicId) => {
        setMockLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/api/comm/topic-quiz?topicId=${topicId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMockTestQuestions(res.data);
            setMockTestAnswers({});
            setMockTestSubmitted(false);
            setMockTimer(600);
            setMockTestActive(true);
        } catch (err) {
            console.error('Failed to fetch quiz', err);
        } finally {
            setMockLoading(false);
        }
    };

    const handleMockAnswer = (qId, optIdx) => {
        if (mockTestSubmitted) return;
        setMockTestAnswers(prev => ({ ...prev, [qId]: optIdx }));
    };

    const handleMockSubmit = () => {
        clearInterval(mockTimerRef.current);
        setMockTestSubmitted(true);
        setMockTestActive(false);
    };

    const getMockScore = () => {
        return mockTestQuestions.reduce((acc, q) => {
            return acc + (mockTestAnswers[q.id] === q.answer ? 1 : 0);
        }, 0);
    };

    const sections = [
        { id: 'grammar-learn', title: 'Grammar Learning', icon: <FaChalkboardTeacher />, color: '#6366f1', desc: 'Complete English grammar modules from basics to advanced.' },
        { id: 'grammar-practice', title: 'Grammar Practice', icon: <FaGamepad />, color: '#1A3263', desc: 'Interactive quizzes for all grammar topics.' },
        { id: 'courses', title: 'Communication Courses', icon: <FaBookOpen />, color: '#1A3263', desc: 'Curated courses from Harvard, Coursera, and more.' },
        { id: 'youtube', title: 'YouTube Learning Hub', icon: <FaVideo />, color: '#ef4444', desc: '200+ selected video lessons on professional speaking.' },
        { id: 'resources', title: 'Resource Library', icon: <FaLightbulb />, color: '#8b5cf6', desc: 'Guides and tips for communication improvement.' },
    ];

    const assessmentTests = [
        { id: 'comm-quiz', title: 'Communication Quiz Assessment', icon: <FaBrain />, color: '#6366f1', diff: 'Adaptive', dur: '15m', skills: 'Grammar, Vocab, Reading, Comm IQ', impact: 'High' },
        { id: 'ai-speaking', title: 'AI Speaking Assessment', icon: <FaMicrophone />, color: '#ec4899', diff: 'Intermediate', dur: '10m', skills: 'Fluency, Pronunciation, Confidence', impact: 'Very High' }
    ];

    return (
        <div className="comm-lab-container">
            <div className="comm-bg-elements">
                <div className="comm-blob blob-gold" />
                <div className="comm-blob blob-purple" />
            </div>

            {!activeSection ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <header className="comm-hero">
                        <div className="comm-badge"><FaLightbulb /><span>Premium Intelligence</span></div>
                        <h1>Communication <span style={{ color: 'var(--primary)' }}>Intelligence Lab</span></h1>
                        <p>Master English Communication with Structured Learning, Real Resources, and AI Practice.</p>
                        
                        {/* Main Tab Toggle */}
                        <div className="comm-main-tabs">
                            <button className={mainTab === 'learning' ? 'active' : ''} onClick={() => setMainTab('learning')}>
                                <FaChalkboardTeacher /> Learning Hub
                            </button>
                            <button className={mainTab === 'assessment' ? 'active' : ''} onClick={() => setMainTab('assessment')}>
                                <FaChartLine /> Assessment Center
                            </button>
                        </div>
                    </header>

                    {mainTab === 'learning' ? (
                        <div className="comm-grid">
                            {sections.map((sec, idx) => (
                                <motion.div
                                    key={sec.id}
                                    className="comm-card-premium"
                                    onClick={() => setActiveSection(sec.id)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <div className="card-icon-wrapper" style={{ background: `${sec.color}15`, color: sec.color }}>{sec.icon}</div>
                                    <div className="card-content">
                                        <h3>{sec.title}</h3>
                                        <p>{sec.desc}</p>
                                    </div>
                                    <div className="card-footer-elite"><FaPlayCircle /></div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="assessment-center-view">
                            
                            {/* Mastery Dashboard */}
                            <div className="mastery-dashboard">
                                <div className="mastery-card score-card">
                                    <div className="score-circle" style={{ background: `conic-gradient(var(--primary) ${overallReadiness}%, var(--border) 0)` }}>
                                        <span>{overallReadiness}%</span>
                                    </div>
                                    <div className="score-details">
                                        <h3>Overall Communication Readiness</h3>
                                        <div className="level-badge">{getLevel(overallReadiness)}</div>
                                    </div>
                                </div>
                                <div className="mastery-card metrics-card">
                                    <div className="metric"><span className="m-label">Communication Quiz</span> <span className="m-val">{quizScore}%</span></div>
                                    <div className="metric"><span className="m-label">AI Speaking</span> <span className="m-val">{speakingScore}%</span></div>
                                </div>
                                <div className="mastery-card coach-card">
                                    <h3><FaUserTie /> AI Communication Coach</h3>
                                    <ul className="coach-insights">
                                        <li><strong>Speaking:</strong> Try spelling and pronunciation exercises to improve fluency.</li>
                                        <li><strong>Quiz Accuracy:</strong> Your theoretical vocabulary is outstanding.</li>
                                        <li><strong>Daily Task:</strong> Attempt the Placement communication scenario to verify readiness.</li>
                                    </ul>
                                </div>
                                <div className="mastery-card cert-card">
                                    <FaAward className="cert-icon" />
                                    <h3>Certification</h3>
                                    <p className="cert-desc">Score-based professional certificate</p>
                                    <button className="cert-btn" onClick={() => setShowCertModal(true)}><FaCertificate /> View Certificate</button>
                                </div>
                            </div>

                            <h2 className="section-title-premium" style={{ marginTop: '3rem', fontSize: '1.8rem' }}>Communication Test Center</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Complete these AI-proctored tests to unlock your Professional Communication Certification.</p>

                            {/* Assessment Tests Grid */}
                            <div className="comm-grid">
                                {assessmentTests.map((test, idx) => (
                                    <motion.div
                                        key={test.id}
                                        className="comm-card-premium test-card"
                                        onClick={() => setActiveSection(test.id)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <div className="card-header-row">
                                            <div className="card-icon-wrapper" style={{ background: `${test.color}15`, color: test.color }}>{test.icon}</div>
                                            <span className="diff-badge" style={{ color: test.color, borderColor: `${test.color}50` }}>{test.diff}</span>
                                        </div>
                                        <div className="card-content">
                                            <h3>{test.title}</h3>
                                            <div className="test-meta">
                                                <span><FaClock /> {test.dur}</span>
                                                <span><FaChartLine /> {test.impact} Impact</span>
                                            </div>
                                            <p className="skills-measured"><strong>Skills:</strong> {test.skills}</p>
                                        </div>
                                        <div className="card-footer-elite"><FaPlayCircle /></div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* ═══ Certificate Modal ═══ */}
                            {showCertModal && (
                                <div className="cert-modal-overlay" onClick={() => setShowCertModal(false)}>
                                    <div className="cert-modal-container" onClick={(e) => e.stopPropagation()}>
                                        <div className="cert-modal-actions">
                                            <button className="cert-download-btn" onClick={() => {
                                                const certEl = certRef.current;
                                                if (!certEl) return;
                                                
                                                // Use html2canvas-like approach with native canvas
                                                const canvas = document.createElement('canvas');
                                                const scale = 2;
                                                canvas.width = 900 * scale;
                                                canvas.height = 640 * scale;
                                                const ctx = canvas.getContext('2d');
                                                ctx.scale(scale, scale);
                                                
                                                // Background
                                                const gradient = ctx.createLinearGradient(0, 0, 900, 640);
                                                gradient.addColorStop(0, '#0f0f23');
                                                gradient.addColorStop(0.5, '#1a1a3e');
                                                gradient.addColorStop(1, '#0f0f23');
                                                ctx.fillStyle = gradient;
                                                ctx.fillRect(0, 0, 900, 640);
                                                
                                                // Border
                                                ctx.strokeStyle = '#f59e0b';
                                                ctx.lineWidth = 3;
                                                ctx.strokeRect(20, 20, 860, 600);
                                                ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
                                                ctx.lineWidth = 1;
                                                ctx.strokeRect(30, 30, 840, 580);
                                                
                                                // Corner decorations
                                                ctx.fillStyle = '#f59e0b';
                                                [{ x: 25, y: 25 }, { x: 865, y: 25 }, { x: 25, y: 605 }, { x: 865, y: 605 }].forEach(p => {
                                                    ctx.beginPath();
                                                    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
                                                    ctx.fill();
                                                });
                                                
                                                // Title badge
                                                ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
                                                ctx.beginPath();
                                                ctx.roundRect(300, 45, 300, 30, 15);
                                                ctx.fill();
                                                ctx.fillStyle = '#f59e0b';
                                                ctx.font = '600 11px Inter, sans-serif';
                                                ctx.textAlign = 'center';
                                                ctx.fillText('TENSHIRO COMMUNICATION INTELLIGENCE', 450, 65);
                                                
                                                // Main title
                                                ctx.fillStyle = '#ffffff';
                                                ctx.font = '800 36px Inter, sans-serif';
                                                ctx.fillText('Certificate of Achievement', 450, 120);
                                                
                                                // Subtitle
                                                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                                                ctx.font = '400 14px Inter, sans-serif';
                                                ctx.fillText('This certificate is proudly presented to', 450, 155);
                                                
                                                // Name
                                                ctx.fillStyle = '#f59e0b';
                                                ctx.font = '800 32px Inter, sans-serif';
                                                ctx.fillText(user?.name || 'Student', 450, 200);
                                                
                                                // Separator
                                                const sepGrad = ctx.createLinearGradient(200, 0, 700, 0);
                                                sepGrad.addColorStop(0, 'transparent');
                                                sepGrad.addColorStop(0.5, '#f59e0b');
                                                sepGrad.addColorStop(1, 'transparent');
                                                ctx.strokeStyle = sepGrad;
                                                ctx.lineWidth = 1.5;
                                                ctx.beginPath();
                                                ctx.moveTo(200, 220);
                                                ctx.lineTo(700, 220);
                                                ctx.stroke();
                                                
                                                // Description
                                                ctx.fillStyle = 'rgba(255,255,255,0.6)';
                                                ctx.font = '400 13px Inter, sans-serif';
                                                ctx.fillText('For successfully completing the Communication Intelligence Assessment Program', 450, 250);
                                                ctx.fillText(`and achieving ${getLevel(overallReadiness)} level proficiency in professional communication.`, 450, 270);
                                                
                                                // Score boxes
                                                const boxY = 300;
                                                const boxW = 180;
                                                const boxH = 90;
                                                const boxes = [
                                                    { label: 'Communication Quiz', score: quizScore, x: 235 },
                                                    { label: 'AI Speaking', score: speakingScore, x: 485 }
                                                ];
                                                
                                                boxes.forEach(box => {
                                                    ctx.fillStyle = 'rgba(255,255,255,0.04)';
                                                    ctx.beginPath();
                                                    ctx.roundRect(box.x, boxY, boxW, boxH, 12);
                                                    ctx.fill();
                                                    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                                                    ctx.lineWidth = 1;
                                                    ctx.stroke();
                                                    
                                                    ctx.fillStyle = '#ffffff';
                                                    ctx.font = '900 28px Inter, sans-serif';
                                                    ctx.fillText(`${box.score}%`, box.x + boxW / 2, boxY + 42);
                                                    
                                                    ctx.fillStyle = 'rgba(255,255,255,0.5)';
                                                    ctx.font = '600 11px Inter, sans-serif';
                                                    ctx.fillText(box.label, box.x + boxW / 2, boxY + 68);
                                                });
                                                
                                                // Overall score circle
                                                const cx = 450, cy = 450;
                                                ctx.beginPath();
                                                ctx.arc(cx, cy, 42, 0, Math.PI * 2);
                                                ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
                                                ctx.fill();
                                                ctx.strokeStyle = '#f59e0b';
                                                ctx.lineWidth = 3;
                                                ctx.stroke();
                                                
                                                ctx.fillStyle = '#f59e0b';
                                                ctx.font = '900 26px Inter, sans-serif';
                                                ctx.fillText(`${overallReadiness}%`, cx, cy + 8);
                                                
                                                ctx.fillStyle = 'rgba(255,255,255,0.5)';
                                                ctx.font = '600 11px Inter, sans-serif';
                                                ctx.fillText('OVERALL READINESS', cx, cy + 58);
                                                
                                                // Level badge
                                                const level = getLevel(overallReadiness);
                                                ctx.fillStyle = '#f59e0b';
                                                ctx.beginPath();
                                                ctx.roundRect(370, 520, 160, 32, 16);
                                                ctx.fill();
                                                ctx.fillStyle = '#0f0f23';
                                                ctx.font = '800 13px Inter, sans-serif';
                                                ctx.fillText(`★  ${level.toUpperCase()}  ★`, cx, 541);
                                                
                                                // Date
                                                const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
                                                ctx.fillStyle = 'rgba(255,255,255,0.4)';
                                                ctx.font = '400 12px Inter, sans-serif';
                                                ctx.fillText(`Issued on ${date}`, 450, 580);
                                                
                                                // Footer
                                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                                ctx.font = '400 10px Inter, sans-serif';
                                                ctx.fillText('Tenshiro Communication Intelligence Lab · AI-Proctored Assessment', 450, 600);
                                                
                                                // Download
                                                const link = document.createElement('a');
                                                link.download = `Tenshiro_Communication_Certificate_${(user?.name || 'Student').replace(/\s/g, '_')}.png`;
                                                link.href = canvas.toDataURL('image/png');
                                                link.click();
                                            }}>
                                                <FaDownload /> Download Certificate
                                            </button>
                                            <button className="cert-modal-close" onClick={() => setShowCertModal(false)}>
                                                <FaTimes />
                                            </button>
                                        </div>

                                        {/* Certificate Preview */}
                                        <div className="cert-preview" ref={certRef}>
                                            <div className="cert-border">
                                                <div className="cert-inner">
                                                    <div className="cert-corner tl" />
                                                    <div className="cert-corner tr" />
                                                    <div className="cert-corner bl" />
                                                    <div className="cert-corner br" />

                                                    <div className="cert-header-badge">TENSHIRO COMMUNICATION INTELLIGENCE</div>
                                                    <h1 className="cert-title">Certificate of Achievement</h1>
                                                    <p className="cert-subtitle">This certificate is proudly presented to</p>
                                                    <h2 className="cert-name">{user?.name || 'Student'}</h2>
                                                    <div className="cert-separator" />
                                                    <p className="cert-body">
                                                        For successfully completing the Communication Intelligence Assessment Program
                                                        and achieving <strong>{getLevel(overallReadiness)}</strong> level proficiency in professional communication.
                                                    </p>

                                                    <div className="cert-scores-row">
                                                        <div className="cert-score-box">
                                                            <div className="csb-value">{quizScore}%</div>
                                                            <div className="csb-label">Communication Quiz</div>
                                                        </div>
                                                        <div className="cert-score-box">
                                                            <div className="csb-value">{speakingScore}%</div>
                                                            <div className="csb-label">AI Speaking</div>
                                                        </div>
                                                    </div>

                                                    <div className="cert-overall">
                                                        <div className="cert-overall-circle">
                                                            <span className="coc-val">{overallReadiness}%</span>
                                                        </div>
                                                        <span className="cert-overall-label">OVERALL READINESS</span>
                                                    </div>

                                                    <div className="cert-level-badge">
                                                        <FaStar /> {getLevel(overallReadiness).toUpperCase()} <FaStar />
                                                    </div>

                                                    <div className="cert-date">
                                                        Issued on {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </div>
                                                    <div className="cert-footer-text">
                                                        Tenshiro Communication Intelligence Lab · AI-Proctored Assessment
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            ) : (
                <div className="section-view">
                    {['comm-quiz', 'ai-speaking'].includes(activeSection) ? (
                        <CommunicationTestRunner testId={activeSection} onBack={() => setActiveSection(null)} />
                    ) : (
                        <>
                            <div className="section-header-row">
                                <button className="back-btn-lab" onClick={() => { setActiveSection(null); setSearchQuery(''); }}>
                                    <FaArrowLeft /> Dashboard
                                </button>
                                {['courses', 'youtube', 'resources'].includes(activeSection) && (
                                    <div className="search-bar-modern">
                                        <FaSearch />
                                        <input
                                            type="text"
                                            placeholder="Search in this module..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div key={activeSection} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>

                                    {/* ─── Grammar Learn ─── */}
                                    {activeSection === 'grammar-learn' && (
                                <div className="grammar-learning-view">
                                    {!selectedTopic ? (
                                        <>
                                            <h2 className="section-title-premium">Grammar Mastery</h2>
                                            <div className="grammar-grid">
                                                {grammarTopics.map(topic => (
                                                    <div
                                                        key={topic.id}
                                                        className="grammar-card interactive"
                                                        onClick={() => {
                                                            setSelectedTopic(topic);
                                                            setSelectedSubtopicIndex(0);
                                                        }}
                                                    >
                                                        <h3>{topic.title}</h3>
                                                        <p className="g-desc">{topic.description}</p>
                                                        <div className="read-more-btn">Explore Topic <FaArrowLeft style={{ transform: 'rotate(180deg)' }} /></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w3-lesson-view">
                                            <div className="w3-sidebar">
                                                <div className="w3-sidebar-header">
                                                    <button className="w3-back-btn" onClick={() => setSelectedTopic(null)}>
                                                        <FaArrowLeft /> Back to Topics
                                                    </button>
                                                    <h3 className="w3-topic-title">{selectedTopic.title}</h3>
                                                </div>
                                                <div className="w3-sidebar-menu">
                                                    {selectedTopic.subtopics?.map((sub, idx) => (
                                                        <button
                                                            key={idx}
                                                            className={`w3-nav-item ${selectedSubtopicIndex === idx ? 'active' : ''}`}
                                                            onClick={() => setSelectedSubtopicIndex(idx)}
                                                        >
                                                            {sub.title}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="w3-main-content">
                                                {selectedTopic.subtopics && selectedTopic.subtopics[selectedSubtopicIndex] ? (
                                                    <div className="w3-content-inner">
                                                        <h1 className="w3-lesson-title">{selectedTopic.subtopics[selectedSubtopicIndex].title}</h1>
                                                        {selectedTopic.subtopics[selectedSubtopicIndex].structure && (
                                                            <div className="w3-syntax-box">
                                                                <h4>Structure / Syntax</h4>
                                                                <div className="w3-code-block">
                                                                    {selectedTopic.subtopics[selectedSubtopicIndex].structure}
                                                                </div>
                                                            </div>
                                                        )}
                                                        <div className="w3-explanation">
                                                            <p>{selectedTopic.subtopics[selectedSubtopicIndex].explanation}</p>
                                                        </div>
                                                        {selectedTopic.subtopics[selectedSubtopicIndex].examples && selectedTopic.subtopics[selectedSubtopicIndex].examples.length > 0 && (
                                                            <div className="w3-example-box">
                                                                <h4>Examples</h4>
                                                                <ul className="w3-example-list">
                                                                    {selectedTopic.subtopics[selectedSubtopicIndex].examples.map((ex, j) => (
                                                                        <li key={j}>{ex}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                        <div className="w3-bottom-nav">
                                                            <button
                                                                className="w3-btn prev-btn"
                                                                disabled={selectedSubtopicIndex === 0}
                                                                onClick={() => setSelectedSubtopicIndex(prev => prev - 1)}
                                                            >
                                                                <FaArrowLeft /> Previous
                                                            </button>
                                                            <button
                                                                className="w3-btn next-btn"
                                                                disabled={selectedSubtopicIndex === (selectedTopic.subtopics.length - 1)}
                                                                onClick={() => setSelectedSubtopicIndex(prev => prev + 1)}
                                                            >
                                                                Next <FaArrowLeft style={{ transform: 'rotate(180deg)' }} />
                                                            </button>
                                                        </div>
                                                        {(selectedTopic.practiceLink || selectedTopic.resourceLink) && (
                                                            <div className="w3-extra-resources">
                                                                <h4>Extra Mastery Materials</h4>
                                                                <div className="practice-resource-links">
                                                                    {selectedTopic.practiceLink && (
                                                                        <a href={selectedTopic.practiceLink} target="_blank" rel="noreferrer" className="practice-btn-lab">
                                                                            <FaGamepad /> Practice Topic
                                                                        </a>
                                                                    )}
                                                                    {selectedTopic.resourceLink && (
                                                                        <a href={selectedTopic.resourceLink} target="_blank" rel="noreferrer" className="resource-btn-lab">
                                                                            <FaExternalLinkAlt /> View Extra Resources
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="w3-empty-content">No content available for this lesson.</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ─── Grammar Practice ─── */}
                            {activeSection === 'grammar-practice' && (
                                <div className="grammar-practice-view">
                                    {!practiceTopicSelected && !mockTestActive && !mockTestSubmitted && (
                                        <>
                                            <h2 className="section-title-premium">Grammar Practice</h2>
                                            <p className="practice-subtitle">Choose a grammar topic to practice with real exercises or take an advanced timed mock test.</p>
                                            <div className="practice-topic-grid">
                                                {grammarTopics.map((topic, idx) => (
                                                    <motion.div
                                                        key={topic.id}
                                                        className="practice-topic-card"
                                                        onClick={() => setPracticeTopicSelected(topic)}
                                                        initial={{ opacity: 0, y: 15 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.03 }}
                                                        whileHover={{ scale: 1.03 }}
                                                    >
                                                        <div className="ptc-number">#{idx + 1}</div>
                                                        <h4>{topic.title}</h4>
                                                        <p>{topic.description}</p>
                                                        <div className="ptc-footer">
                                                            {topic.practiceLink && <span className="ptc-badge practice"><FaLink /> Practice</span>}
                                                            <span className="ptc-badge quiz"><FaGamepad /> Quiz</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </>
                                    )}

                                    {practiceTopicSelected && !mockTestActive && !mockTestSubmitted && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="practice-detail-view">
                                            <button className="back-btn-lab" onClick={() => setPracticeTopicSelected(null)}>
                                                <FaArrowLeft /> All Topics
                                            </button>
                                            <h2 className="section-title-premium" style={{ marginTop: '1rem' }}>{practiceTopicSelected.title}</h2>
                                            <p className="practice-subtitle">{practiceTopicSelected.description}</p>
                                            <div className="practice-links-section">
                                                <h3><FaLink /> Practice on These Sites</h3>
                                                <div className="ext-links-grid">
                                                    {practiceTopicSelected.practiceLink && (
                                                        <a href={practiceTopicSelected.practiceLink} target="_blank" rel="noreferrer" className="ext-link-card navy">
                                                            <div className="elc-icon"><FaGamepad /></div>
                                                            <div>
                                                                <div className="elc-title">Interactive Exercises</div>
                                                                <div className="elc-site">{new URL(practiceTopicSelected.practiceLink).hostname.replace('www.', '')}</div>
                                                            </div>
                                                            <FaExternalLinkAlt className="elc-arrow" />
                                                        </a>
                                                    )}
                                                    {practiceTopicSelected.resourceLink && (
                                                        <a href={practiceTopicSelected.resourceLink} target="_blank" rel="noreferrer" className="ext-link-card blue">
                                                            <div className="elc-icon"><FaBookOpen /></div>
                                                            <div>
                                                                <div className="elc-title">Learn & Reference</div>
                                                                <div className="elc-site">{new URL(practiceTopicSelected.resourceLink).hostname.replace('www.', '')}</div>
                                                            </div>
                                                            <FaExternalLinkAlt className="elc-arrow" />
                                                        </a>
                                                    )}
                                                    <a href="https://www.perfect-english-grammar.com/" target="_blank" rel="noreferrer" className="ext-link-card purple">
                                                        <div className="elc-icon"><FaChalkboardTeacher /></div>
                                                        <div>
                                                            <div className="elc-title">Perfect English Grammar</div>
                                                            <div className="elc-site">perfect-english-grammar.com</div>
                                                        </div>
                                                        <FaExternalLinkAlt className="elc-arrow" />
                                                    </a>
                                                    <a href="https://learnenglish.britishcouncil.org/grammar" target="_blank" rel="noreferrer" className="ext-link-card blue">
                                                        <div className="elc-icon"><FaBookOpen /></div>
                                                        <div>
                                                            <div className="elc-title">British Council Grammar</div>
                                                            <div className="elc-site">britishcouncil.org</div>
                                                        </div>
                                                        <FaExternalLinkAlt className="elc-arrow" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mock-cta-section">
                                                <div className="mock-cta-info">
                                                    <FaTrophy className="mock-cta-icon" />
                                                    <div>
                                                        <h3>Advanced Mock Test</h3>
                                                        <p>10 advanced questions · 10 minute timer · Instant score & explanations</p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="start-mock-btn"
                                                    onClick={() => fetchTopicQuiz(practiceTopicSelected.id)}
                                                    disabled={mockLoading}
                                                >
                                                    {mockLoading ? 'Loading...' : <><FaGamepad /> Start Mock Test</>}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {mockTestActive && !mockTestSubmitted && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mock-test-view">
                                            <div className="mock-test-header">
                                                <div className="mock-test-title">
                                                    <FaGamepad />
                                                    <span>{practiceTopicSelected?.title} — Mock Test</span>
                                                </div>
                                                <div className={`mock-timer ${mockTimer < 60 ? 'danger' : ''}`}>
                                                    <FaClock /> {formatTime(mockTimer)}
                                                </div>
                                            </div>
                                            <div className="mock-progress-bar">
                                                <div className="mock-progress-fill" style={{ width: `${(Object.keys(mockTestAnswers).length / mockTestQuestions.length) * 100}%` }} />
                                            </div>
                                            <p className="mock-progress-text">{Object.keys(mockTestAnswers).length} / {mockTestQuestions.length} answered</p>
                                            <div className="mock-questions-list">
                                                {mockTestQuestions.map((q, idx) => (
                                                    <div key={q.id} className="mock-question-card">
                                                        <div className="mq-number">Q{idx + 1}</div>
                                                        <p className="mq-text">{q.question}</p>
                                                        <div className="mq-options">
                                                            {q.options.map((opt, i) => (
                                                                <button
                                                                    key={i}
                                                                    className={`mq-opt ${mockTestAnswers[q.id] === i ? 'selected' : ''}`}
                                                                    onClick={() => handleMockAnswer(q.id, i)}
                                                                >
                                                                    <span className="mq-opt-letter">{String.fromCharCode(65 + i)}</span>
                                                                    {opt}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mock-submit-row">
                                                <button className="mock-submit-btn" onClick={handleMockSubmit}>
                                                    <FaCheckCircle /> Submit Test
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {mockTestSubmitted && (
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mock-score-view">
                                            <div className="score-badge-big">
                                                <FaTrophy />
                                                <div className="score-number">{getMockScore()} / {mockTestQuestions.length}</div>
                                                <div className="score-label">
                                                    {getMockScore() >= 8 ? '🏆 Excellent!' : getMockScore() >= 6 ? '👍 Good job!' : getMockScore() >= 4 ? '📚 Keep Practicing!' : '💪 Try Again!'}
                                                </div>
                                            </div>
                                            <div className="score-review-list">
                                                {mockTestQuestions.map((q, idx) => {
                                                    const userAns = mockTestAnswers[q.id];
                                                    const isCorrect = userAns === q.answer;
                                                    return (
                                                        <div key={q.id} className={`score-review-card ${isCorrect ? 'correct' : 'wrong'}`}>
                                                            <div className="src-header">
                                                                <span className="src-num">Q{idx + 1}</span>
                                                                {isCorrect ? <FaCheckCircle className="src-icon correct" /> : <FaExclamationCircle className="src-icon wrong" />}
                                                            </div>
                                                            <p className="src-question">{q.question}</p>
                                                            <div className="src-answers">
                                                                {userAns !== undefined && userAns !== q.answer && (
                                                                    <div className="src-your-answer">Your answer: <strong>{q.options[userAns]}</strong></div>
                                                                )}
                                                                <div className="src-correct-answer">Correct: <strong>{q.options[q.answer]}</strong></div>
                                                            </div>
                                                            <div className="src-explanation"><FaLightbulb /> {q.explanation}</div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="score-actions">
                                                <button className="score-retry-btn" onClick={() => fetchTopicQuiz(practiceTopicSelected.id)}>
                                                    <FaRedo /> Retry Test
                                                </button>
                                                <button className="score-back-btn" onClick={() => { setMockTestSubmitted(false); setPracticeTopicSelected(null); }}>
                                                    <FaArrowLeft /> Try Another Topic
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            )}

                            {/* ─── Courses ─── */}
                            {activeSection === 'courses' && (() => {
                                const platforms = ['All', 'Coursera', 'Udemy', 'LinkedIn Learning', 'edX', 'Harvard Online', 'FutureLearn', 'NPTEL', 'Alison', 'Skillshare', 'Google', 'Swayam'];
                                const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];
                                const platformColors = {
                                    'Coursera': '#0056D2', 'Udemy': '#a435f0', 'LinkedIn Learning': '#0077b5',
                                    'edX': '#02262B', 'Harvard Online': '#A51C30', 'FutureLearn': '#DE0072',
                                    'NPTEL': '#f57c00', 'Alison': '#5cb85c', 'Skillshare': '#00FF84',
                                    'Google': '#4285F4', 'Swayam': '#1565c0', 'Microsoft Learn': '#00BCF2',
                                };
                                const filtered = courses.filter(c => {
                                    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchPlatform = activePlatform === 'All' || c.platform === activePlatform;
                                    const matchLevel = activeLevel === 'All' || c.level === activeLevel;
                                    return matchSearch && matchPlatform && matchLevel;
                                });
                                const renderStars = (rating) => {
                                    const full = Math.floor(rating);
                                    return '★'.repeat(full) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
                                };
                                return (
                                    <div className="courses-premium-view">
                                        <div className="courses-hero-header">
                                            <div>
                                                <h2 className="section-title-premium">Communication Courses</h2>
                                                <p className="practice-subtitle">{filtered.length} curated courses from world's top learning platforms</p>
                                            </div>
                                        </div>
                                        <div className="course-filter-block">
                                            <div className="filter-label">Platform</div>
                                            <div className="platform-pills">
                                                {platforms.map(p => (
                                                    <button key={p} className={`platform-pill ${activePlatform === p ? 'active' : ''}`}
                                                        style={activePlatform === p && p !== 'All' ? { background: platformColors[p], borderColor: platformColors[p], color: '#fff' } : {}}
                                                        onClick={() => setActivePlatform(p)}>{p}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="course-filter-block">
                                            <div className="filter-label">Level</div>
                                            <div className="platform-pills">
                                                {levels.map(l => (
                                                    <button key={l} className={`platform-pill ${activeLevel === l ? 'active' : ''}`} onClick={() => setActiveLevel(l)}>{l}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="courses-premium-grid">
                                            {filtered.map((c, idx) => (
                                                <motion.a
                                                    key={c.id} href={c.link} target="_blank" rel="noreferrer" className="course-premium-card"
                                                    initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.02, 0.5) }}
                                                >
                                                    <div className="cpc-header">
                                                        <span className="cpc-platform" style={{ background: `${platformColors[c.platform] || '#6366f1'}18`, color: platformColors[c.platform] || '#6366f1' }}>{c.platform}</span>
                                                        <span className="cpc-level">{c.level}</span>
                                                    </div>
                                                    <h4 className="cpc-title">{c.title}</h4>
                                                    <p className="cpc-desc">{c.description}</p>
                                                    <div className="cpc-footer">
                                                        <span className="cpc-stars">{renderStars(c.rating || 4.5)}</span>
                                                        <span className="cpc-enroll">Enroll Free <FaExternalLinkAlt /></span>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* ─── YouTube ─── */}
                            {activeSection === 'youtube' && (() => {
                                const topicFilters = ['All', 'Pronunciation', 'Grammar', 'Business English', 'Interview', 'Vocabulary', 'Fluency', 'IELTS', 'Spoken English'];
                                const filtered = videos.filter(v => {
                                    const matchSearch = !searchQuery || v.title.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchTopic = activeTopic === 'All' || v.topic === activeTopic;
                                    return matchSearch && matchTopic;
                                });
                                return (
                                    <div className="youtube-premium-view">
                                        <h2 className="section-title-premium">YouTube Learning Hub <span className="item-count">({filtered.length})</span></h2>
                                        <div className="topic-pills-row">
                                            {topicFilters.map(t => (
                                                <button key={t} className={`topic-pill ${activeTopic === t ? 'active' : ''}`} onClick={() => setActiveTopic(t)}>{t}</button>
                                            ))}
                                        </div>
                                        <div className="youtube-premium-grid">
                                            {filtered.map((v, idx) => (
                                                <motion.a
                                                    key={v.id} href={v.link} target="_blank" rel="noreferrer" className="yt-premium-card"
                                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(idx * 0.02, 0.4) }}
                                                >
                                                    <div className="yt-thumb-wrapper">
                                                        <img src={v.thumbnail} alt={v.title} className="yt-thumb" onError={e => { e.target.src = 'https://via.placeholder.com/320x180/1e293b/6366f1?text=Video'; }} />
                                                        <div className="yt-play-overlay"><FaPlayCircle /></div>
                                                        {v.duration && <span className="yt-duration">{v.duration}</span>}
                                                    </div>
                                                    <div className="yt-info">
                                                        <span className="yt-topic-badge">{v.topic}</span>
                                                        <h4 className="yt-title">{v.title}</h4>
                                                        <span className="yt-channel">{v.channel}</span>
                                                    </div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* ─── Resources ─── */}
                            {activeSection === 'resources' && (() => {
                                const categoriesFilter = ['All', 'Grammar', 'Speaking', 'Writing', 'Listening', 'Vocabulary', 'Test Prep', 'Practice'];
                                const filtered = resources.filter(r => {
                                    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.siteName.toLowerCase().includes(searchQuery.toLowerCase());
                                    const matchCat = activeCat === 'All' || r.category === activeCat;
                                    return matchSearch && matchCat;
                                });
                                return (
                                    <div className="resources-premium-view">
                                        <h2 className="section-title-premium">Resource Library <span className="item-count">({filtered.length})</span></h2>
                                        <div className="topic-pills-row">
                                            {categoriesFilter.map(c => (
                                                <button key={c} className={`topic-pill ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>
                                            ))}
                                        </div>
                                        <div className="resources-premium-grid">
                                            {filtered.map((r, idx) => (
                                                <motion.a
                                                    key={r.id} href={r.link} target="_blank" rel="noreferrer" className="resource-premium-card"
                                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(idx * 0.02, 0.4) }}
                                                >
                                                    <div className="rp-header">
                                                        <span className="rp-category">{r.category}</span>
                                                        <span className="rp-site">{r.siteName}</span>
                                                    </div>
                                                    <h4 className="rp-title">{r.title}</h4>
                                                    <p className="rp-desc">{r.description}</p>
                                                    <div className="rp-footer">Visit Website <FaExternalLinkAlt /></div>
                                                </motion.a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })()}

                            {activeSection === 'test-runner' && (
                                <CommunicationTestRunner />
                            )}

                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </div>
    )}
</div>
);
};

export default CommunicationIntelligenceLab;
