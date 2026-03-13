import { useState, useEffect, useCallback } from 'react';
import { CATEGORIES } from './questionBank';

// ─── Progress Storage ───────────────────────────────────────────────────────────
const STORAGE_KEY = 'apt_practice_progress';

const loadProgress = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (_) { return {}; }
};

const saveProgress = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) { }
};

const getTopicKey = (catKey, topic) => `${catKey}__${topic}`;

const getTopicProgress = (progress, catKey, topic) => {
    const key = getTopicKey(catKey, topic);
    return progress[key] || {
        easyCompleted: false, mediumCompleted: false, hardCompleted: false,
        accuracy: 0, totalAttempts: 0, xp: 0, mastery: 0
    };
};

// ─── Mastery Ring ──────────────────────────────────────────────────────────────
const MasteryRing = ({ pct = 0, size = 50, color = '#6366f1', stroke = 5 }) => {
    const r = (size - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;
    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
                strokeWidth={stroke} strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
            <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle"
                style={{ fill: color, fontSize: size * 0.22, fontWeight: 900, transform: 'rotate(90deg)', transformOrigin: 'center' }}>
                {pct}%
            </text>
        </svg>
    );
};

// ─── Difficulty Button Config ──────────────────────────────────────────────────
const DIFFICULTIES = [
    { id: 'Easy', label: 'Easy', icon: '🟢', desc: '10 questions • Foundational', color: '#1A3263', count: 10 },
    { id: 'Medium', label: 'Medium', icon: '🟡', desc: '15 questions • Core skills', color: '#f59e0b', count: 15 },
    { id: 'Hard', label: 'Hard', icon: '🔴', desc: '15 questions • Expert level', color: '#ef4444', count: 15 },
    { id: 'Company', label: 'Company Level', icon: '🏢', desc: '20 questions • Interview-style', color: '#6366f1', count: 20 },
    { id: 'Govt', label: 'Govt PYQs', icon: '🏛️', desc: '20 questions • Exam pattern', color: '#8b5cf6', count: 20 },
    { id: 'Mixed', label: 'Mixed Practice', icon: '🔀', desc: '20 questions • All levels', color: '#06b6d4', count: 20 },
    { id: 'FullTopic', label: 'Full Topic Mock', icon: '🏁', desc: '30 questions • 30 mins timed', color: '#ec4899', count: 30, timed: true },
];

// ─── PracticeEngine ─────────────────────────────────────────────────────────────
export const PracticeEngine = ({ onStartTest }) => {
    const [stage, setStage] = useState('category');   // category | topic | difficulty
    const [selCat, setSelCat] = useState(null);
    const [selTopic, setSelTopic] = useState(null);
    const [progress, setProgress] = useState(loadProgress);
    const [hoverCat, setHoverCat] = useState(null);
    const [hoverTopic, setHoverTopic] = useState(null);

    // Refresh progress from storage when component mounts
    useEffect(() => { setProgress(loadProgress()); }, []);

    const handleCatSelect = (cat) => {
        setSelCat(cat);
        setStage('topic');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTopicSelect = (topic) => {
        setSelTopic(topic);
        setStage('difficulty');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDifficultySelect = useCallback((diff) => {
        if (!selCat || !selTopic) return;

        const isFull = diff.id === 'FullTopic';
        const isMixed = diff.id === 'Mixed';
        const isCompany = diff.id === 'Company';
        const isGovt = diff.id === 'Govt';

        let difficulty = diff.id;
        if (isCompany || isGovt || isMixed) difficulty = 'Adaptive';

        const config = {
            category: selCat.key,
            topic: selTopic,
            difficulty: isFull ? 'Mixed' : difficulty,
            count: diff.count,
            catLabel: `${selTopic} — ${diff.label}`,
            color: selCat.color,
            type: isFull ? 'full_topic' : 'practice',
            duration: isFull ? 30 : null,
            isCompanyLevel: isCompany,
            isGovtPYQ: isGovt,
        };
        onStartTest(config);
    }, [selCat, selTopic, onStartTest]);

    const goBack = () => {
        if (stage === 'difficulty') { setStage('topic'); setSelTopic(null); }
        else if (stage === 'topic') { setStage('category'); setSelCat(null); }
    };

    // ── Compute category mastery ──────────────────────────────────────────────
    const getCatMastery = (cat) => {
        const topics = cat.topics || [];
        if (!topics.length) return 0;
        const total = topics.reduce((sum, t) => {
            const tp = getTopicProgress(progress, cat.key, t);
            return sum + tp.mastery;
        }, 0);
        return Math.round(total / topics.length);
    };

    const getTopicMastery = (topic) => {
        if (!selCat) return 0;
        return getTopicProgress(progress, selCat.key, topic).mastery || 0;
    };

    const isDiffLocked = (diff) => {
        if (!selTopic || !selCat) return false;
        const tp = getTopicProgress(progress, selCat.key, selTopic);
        if (diff.id === 'Medium' && !tp.easyCompleted) return true;
        if (diff.id === 'Hard' && !tp.mediumCompleted) return true;
        return false;
    };

    // ── Styles ───────────────────────────────────────────────────────────────
    const card = (selected, color, hover) => ({
        background: selected || hover ? `${color}12` : 'var(--bg-secondary)',
        border: `1.5px solid ${selected || hover ? color : 'var(--border)'}`,
        borderRadius: 20,
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
        transform: hover ? 'translateY(-4px)' : 'none',
        boxShadow: hover ? `0 12px 30px ${color}25` : 'none',
    });

    // ───────────────────────────────────────────────────────────────────────────
    // STAGE: CATEGORY
    // ───────────────────────────────────────────────────────────────────────────
    if (stage === 'category') return (
        <div style={{ animation: 'fadeInUp 0.45s ease' }}>
            <style>{`
                @keyframes fadeInUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }
                .pe-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; borderRadius:99px; fontSize:0.65rem; fontWeight:800; textTransform:uppercase; letterSpacing:1px; }
            `}</style>

            <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2rem' }}>✏️</span>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)' }}>Topic-Wise Practice</h2>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>Select a category to begin structured practice</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {CATEGORIES.map(cat => {
                    const mastery = getCatMastery(cat);
                    const hover = hoverCat === cat.key;
                    return (
                        <div key={cat.key}
                            style={card(false, cat.color, hover)}
                            onClick={() => handleCatSelect(cat)}
                            onMouseEnter={() => setHoverCat(cat.key)}
                            onMouseLeave={() => setHoverCat(null)}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${cat.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                                    {cat.icon}
                                </div>
                                <MasteryRing pct={mastery} size={52} color={cat.color} stroke={5} />
                            </div>

                            <h3 style={{ margin: '0 0 0.4rem', fontWeight: 900, fontSize: '1.1rem', color: 'var(--text-main)' }}>{cat.label}</h3>
                            <p style={{ margin: '0 0 1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                                {cat.topics.length} topics available
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.25rem' }}>
                                {cat.topics.slice(0, 4).map(t => {
                                    const tp = getTopicProgress(progress, cat.key, t);
                                    return (
                                        <span key={t} style={{ padding: '3px 9px', borderRadius: 99, fontSize: '0.68rem', fontWeight: 700, background: tp.mastery >= 50 ? `${cat.color}20` : 'var(--bg-primary)', color: tp.mastery >= 50 ? cat.color : 'var(--text-muted)', border: `1px solid ${tp.mastery >= 50 ? cat.color + '40' : 'var(--border)'}` }}>
                                            {tp.mastery >= 50 ? '✓ ' : ''}{t}
                                        </span>
                                    );
                                })}
                                {cat.topics.length > 4 && (
                                    <span style={{ padding: '3px 9px', borderRadius: 99, fontSize: '0.68rem', fontWeight: 700, background: 'var(--bg-primary)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>
                                        +{cat.topics.length - 4} more
                                    </span>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {['Easy', 'Medium', 'Hard'].map((level, li) => {
                                        const doneCount = cat.topics.filter(t => {
                                            const tp = getTopicProgress(progress, cat.key, t);
                                            return li === 0 ? tp.easyCompleted : li === 1 ? tp.mediumCompleted : tp.hardCompleted;
                                        }).length;
                                        const dotColor = li === 0 ? '#1A3263' : li === 1 ? '#f59e0b' : '#ef4444';
                                        return (
                                            <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: doneCount > 0 ? dotColor : 'var(--border)' }} />
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>{doneCount}/{cat.topics.length}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <span style={{ fontSize: '0.8rem', color: cat.color, fontWeight: 800 }}>
                                    Explore →
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // ───────────────────────────────────────────────────────────────────────────
    // STAGE: TOPIC
    // ───────────────────────────────────────────────────────────────────────────
    if (stage === 'topic') return (
        <div style={{ animation: 'fadeInUp 0.4s ease' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
                <button onClick={goBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 1rem', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
                    ← Back
                </button>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/</span>
                <span style={{ fontSize: '1.2rem' }}>{selCat.icon}</span>
                <span style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: '1rem' }}>{selCat.label}</span>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)' }}>Select a Topic</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Click any topic to choose difficulty and begin practice</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.1rem' }}>
                {(selCat.topics || []).map((topic, idx) => {
                    const tp = getTopicProgress(progress, selCat.key, topic);
                    const mastery = tp.mastery || 0;
                    const hover = hoverTopic === topic;
                    const xp = tp.xp || 0;

                    return (
                        <div key={topic}
                            style={card(false, selCat.color, hover)}
                            onClick={() => handleTopicSelect(topic)}
                            onMouseEnter={() => setHoverTopic(topic)}
                            onMouseLeave={() => setHoverTopic(null)}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${selCat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, color: selCat.color }}>
                                    {idx + 1}
                                </div>
                                <MasteryRing pct={mastery} size={44} color={selCat.color} stroke={4} />
                            </div>

                            <h4 style={{ margin: '0 0 0.5rem', fontWeight: 900, fontSize: '0.95rem', color: 'var(--text-main)' }}>{topic}</h4>

                            <div style={{ display: 'flex', gap: 6, marginBottom: '0.85rem' }}>
                                {[
                                    { label: 'E', done: tp.easyCompleted, color: '#1A3263' },
                                    { label: 'M', done: tp.mediumCompleted, color: '#f59e0b' },
                                    { label: 'H', done: tp.hardCompleted, color: '#ef4444' },
                                ].map(({ label, done, color }) => (
                                    <div key={label} style={{ width: 26, height: 26, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 900, background: done ? color : 'var(--bg-primary)', color: done ? '#fff' : 'var(--text-muted)', border: done ? 'none' : '1px solid var(--border)' }}>
                                        {done ? '✓' : label}
                                    </div>
                                ))}
                                {mastery >= 80 && (
                                    <div style={{ marginLeft: 'auto', fontSize: '0.65rem', padding: '3px 8px', borderRadius: 99, background: `${selCat.color}20`, color: selCat.color, fontWeight: 800 }}>
                                        🏆 Mastered
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    ⚡ {xp} XP {tp.accuracy > 0 ? `• ${tp.accuracy}% accuracy` : ''}
                                </span>
                                <span style={{ fontSize: '0.75rem', color: selCat.color, fontWeight: 800 }}>Start →</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    // ───────────────────────────────────────────────────────────────────────────
    // STAGE: DIFFICULTY
    // ───────────────────────────────────────────────────────────────────────────
    if (stage === 'difficulty') {
        const topicProg = getTopicProgress(progress, selCat.key, selTopic);
        return (
            <div style={{ animation: 'fadeInUp 0.4s ease', maxWidth: 800, margin: '0 auto' }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
                    <button onClick={goBack} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 1rem', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 700, cursor: 'pointer', fontSize: '0.82rem' }}>
                        ← Back
                    </button>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/</span>
                    <span style={{ fontSize: '1rem' }}>{selCat.icon}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer' }} onClick={() => { setStage('topic'); setSelTopic(null); }}>{selCat.label}</span>
                    <span style={{ color: 'var(--text-muted)' }}>/</span>
                    <span style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: '0.95rem' }}>{selTopic}</span>
                </div>

                {/* Topic Summary Card */}
                <div style={{ background: `linear-gradient(135deg, ${selCat.color}15, ${selCat.color}05)`, border: `1px solid ${selCat.color}30`, borderRadius: 24, padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <MasteryRing pct={topicProg.mastery} size={80} color={selCat.color} stroke={7} />
                    <div style={{ flex: 1 }}>
                        <h2 style={{ margin: '0 0 0.4rem', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>{selTopic}</h2>
                        <p style={{ margin: '0 0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {topicProg.totalAttempts > 0
                                ? `${topicProg.totalAttempts} questions attempted • ${topicProg.accuracy}% accuracy • ${topicProg.xp} XP earned`
                                : 'Start practicing to build your mastery score'}
                        </p>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {[
                                { label: 'Easy', done: topicProg.easyCompleted, color: '#1A3263' },
                                { label: 'Medium', done: topicProg.mediumCompleted, color: '#f59e0b', locked: !topicProg.easyCompleted },
                                { label: 'Hard', done: topicProg.hardCompleted, color: '#ef4444', locked: !topicProg.mediumCompleted },
                            ].map(({ label, done, color, locked }) => (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 8, background: done ? `${color}20` : locked ? 'var(--bg-primary)' : `${color}10`, border: `1px solid ${done ? color : locked ? 'var(--border)' : color + '40'}` }}>
                                    <span style={{ fontSize: '0.65rem' }}>{done ? '✅' : locked ? '🔒' : '⚪'}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: done ? color : locked ? 'var(--text-muted)' : color }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Difficulty Options */}
                <h3 style={{ fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
                    Choose Difficulty
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                    {DIFFICULTIES.map(diff => {
                        const locked = isDiffLocked(diff);
                        return (
                            <button key={diff.id}
                                disabled={locked}
                                onClick={() => !locked && handleDifficultySelect(diff)}
                                style={{
                                    textAlign: 'left',
                                    padding: '1.5rem',
                                    borderRadius: 18,
                                    border: `1.5px solid ${locked ? 'var(--border)' : diff.color + '50'}`,
                                    background: locked ? 'var(--bg-secondary)' : `${diff.color}08`,
                                    cursor: locked ? 'not-allowed' : 'pointer',
                                    opacity: locked ? 0.5 : 1,
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onMouseEnter={e => { if (!locked) { e.currentTarget.style.background = `${diff.color}18`; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 25px ${diff.color}25`; } }}
                                onMouseLeave={e => { e.currentTarget.style.background = `${diff.color}08`; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {locked && (
                                    <div style={{ position: 'absolute', top: 10, right: 10, fontSize: '1rem' }}>🔒</div>
                                )}
                                <div style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>{diff.icon}</div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 900, color: locked ? 'var(--text-muted)' : diff.color, marginBottom: '0.3rem' }}>{diff.label}</div>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{diff.desc}</div>
                                {diff.timed && (
                                    <div style={{ marginTop: '0.75rem', padding: '3px 8px', borderRadius: 8, background: `${diff.color}20`, color: diff.color, fontSize: '0.65rem', fontWeight: 800, display: 'inline-block' }}>
                                        ⏱️ TIMED
                                    </div>
                                )}
                                {locked && (
                                    <div style={{ marginTop: '0.75rem', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                                        Complete previous level to unlock
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
};

// ─── Progress Updater (call from AptitudeDashboard after test finishes) ─────────
export const updatePracticeProgress = (config, result) => {
    if (!config?.category || !config?.topic) return;
    const progress = loadProgress();
    const key = getTopicKey(config.category, config.topic);
    const existing = progress[key] || { easyCompleted: false, mediumCompleted: false, hardCompleted: false, accuracy: 0, totalAttempts: 0, xp: 0, mastery: 0 };

    const pct = result?.pct || 0;
    const newAttempts = existing.totalAttempts + (result?.questions?.length || config.count || 0);
    const newAccuracy = Math.round((existing.accuracy * existing.totalAttempts + pct * (result?.questions?.length || config.count || 0)) / newAttempts);
    const xpEarned = Math.round(pct * 0.5 + (pct >= 80 ? 25 : pct >= 60 ? 10 : 5));

    const passed = pct >= 60;
    const updated = {
        ...existing,
        totalAttempts: newAttempts,
        accuracy: newAccuracy,
        xp: existing.xp + xpEarned,
        easyCompleted: existing.easyCompleted || (config.difficulty === 'Easy' && passed),
        mediumCompleted: existing.mediumCompleted || (config.difficulty === 'Medium' && passed),
        hardCompleted: existing.hardCompleted || (config.difficulty === 'Hard' && passed),
    };

    // Calculate mastery
    const levels = [updated.easyCompleted, updated.mediumCompleted, updated.hardCompleted];
    const levelScore = levels.filter(Boolean).length * 25;
    updated.mastery = Math.min(100, Math.round(levelScore + newAccuracy * 0.25));

    progress[key] = updated;
    saveProgress(progress);
    return updated;
};

export default PracticeEngine;
