import React, { useState, useEffect } from 'react';
import { MOCK_PATTERNS, COMPANY_SECTIONS, COMPANY_DETAILS } from './questionBank';

// Mock Progress Helpers
export const getMockStats = () => {
    try {
        const raw = localStorage.getItem('apt_mock_progress');
        return raw ? JSON.parse(raw) : { history: [], badges: [], xp: 0 };
    } catch {
        return { history: [], badges: [], xp: 0 };
    }
};

export const updateMockProgress = (config, result) => {
    const stats = getMockStats();
    const newEntry = {
        type: config.id,
        level: config.level || 'Mixed',
        score: result.score,
        total: result.total,
        pct: result.pct,
        accuracy: result.accuracy,
        timeTaken: result.timeTaken,
        date: new Date().toISOString()
    };

    stats.history.push(newEntry);
    stats.xp += Math.round(result.score * (config.questions / 10)); // Reward based on length and score

    localStorage.setItem('apt_mock_progress', JSON.stringify(stats));
    return stats;
};

const SH = ({ c, t, s }) => (
    <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>{c}</span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t}</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1rem' }}>{s}</p>
    </div>
);

const MockEngine = ({ onStartTest }) => {
    const [view, setView] = useState('type'); // 'type' | 'sub' | 'details'
    const [selectedType, setSelectedType] = useState(null);
    const [selectedSub, setSelectedSub] = useState(null);
    const [stats, setStats] = useState(getMockStats());

    const mockTypes = [
        { id: 'beginner', label: 'Beginner Level', icon: '🐣', desc: '40 Questions • 40 Mins', color: '#1A3263', pattern: MOCK_PATTERNS.beginner },
        { id: 'intermediate', label: 'Intermediate Level', icon: '🚀', desc: '60 Questions • 60 Mins', color: '#6366f1', pattern: MOCK_PATTERNS.intermediate },
        { id: 'advanced', label: 'Advanced Level', icon: '🔥', desc: '75 Questions • 75 Mins', color: '#f59e0b', pattern: MOCK_PATTERNS.advanced },
        { id: 'company', label: 'Company Placement', icon: '🏢', desc: 'TCS, Amazon, Microsoft Patterns', color: '#ec4899' },
        { id: 'govt', label: 'Government Exam', icon: '🏛️', desc: 'SSC CGL, Bank PO, TNPSC', color: '#ef4444' },
        { id: 'adaptive', label: 'Adaptive AI Mock', icon: '🧠', desc: 'Dynamic level based on you', color: '#a855f7', pattern: MOCK_PATTERNS.adaptive },
        { id: 'mega', label: 'Mega 100 Grand Test', icon: '🏆', desc: '100 Questions • 120 Mins', color: '#06b6d4', pattern: MOCK_PATTERNS.mega }
    ];

    const handleSelectType = (type) => {
        setSelectedType(type);
        if (type.id === 'company' || type.id === 'govt') {
            setView('sub');
        } else {
            setView('details');
        }
    };

    const handleSelectSub = (subKey) => {
        setSelectedSub(subKey);
        setView('details');
    };

    const startTest = () => {
        let config = {};
        if (selectedType.id === 'company' || selectedType.id === 'govt') {
            const pattern = MOCK_PATTERNS[selectedSub] || MOCK_PATTERNS.intermediate;
            const details = COMPANY_DETAILS[selectedSub];
            config = {
                id: selectedSub,
                type: 'mock',
                catLabel: `${details?.name || selectedSub} Pattern Mock`,
                questions: pattern.questions,
                duration: pattern.duration,
                difficulty: 'Mixed',
                marking: pattern.marking,
                sections: details?.sections
            };
        } else {
            const p = selectedType.pattern;
            config = {
                id: selectedType.id,
                type: 'mock',
                catLabel: p.label,
                questions: p.questions,
                duration: p.duration,
                difficulty: p.difficulty,
                isAdaptive: p.isAdaptive
            };
        }
        onStartTest(config);
    };

    return (
        <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            {view === 'type' && (
                <>
                    <SH c="📋" t="Advanced Mock Engine" s="Choose your battlefield. Multi-level, Sector-based, and AI Adaptive mocks." />

                    {/* XP & Stats mini-panel */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                        {[
                            { l: 'Mocks Taken', v: stats.history.length, c: '#6366f1' },
                            { l: 'Avg Accuracy', v: `${Math.round(stats.history.reduce((a, b) => a + b.accuracy, 0) / stats.history.length || 0)}%`, c: '#1A3263' },
                            { l: 'Total XP', v: stats.xp.toLocaleString(), c: '#f59e0b' },
                            { l: 'Global Rank', v: stats.xp > 1000 ? '#452' : 'Unranked', c: '#ec4899' }
                        ].map((s, i) => (
                            <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', padding: '1.2rem', borderRadius: 20, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>{s.l}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.c }}>{s.v}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {mockTypes.map(type => (
                            <button key={type.id} onClick={() => handleSelectType(type)}
                                style={{
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem', textAlign: 'left', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', overflow: 'hidden'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.borderColor = type.color;
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'var(--border)';
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{type.icon}</div>
                                <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fff' }}>{type.label}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{type.desc}</p>
                                <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: '5rem', opacity: 0.05, filter: 'grayscale(1)' }}>{type.icon}</div>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {view === 'sub' && (
                <>
                    <button onClick={() => setView('type')} style={{ background: 'transparent', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>← Select Other Type</button>
                    <SH c={selectedType.id === 'company' ? '🏢' : '🏛️'} t={selectedType.id === 'company' ? 'Company Placements' : 'Government Exams'} s={`Select a specific ${selectedType.id === 'company' ? 'company' : 'exam'} to load their recruitment pattern.`} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        {COMPANY_SECTIONS.filter(s => selectedType.id === 'company' ? !['govt', 'banking'].includes(s.id) : ['govt', 'banking'].includes(s.id)).map(section => (
                            <div key={section.id}>
                                <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1rem', marginLeft: '0.5rem' }}>{section.label}</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                    {section.companies.map(c => (
                                        <button key={c} onClick={() => handleSelectSub(c)}
                                            style={{
                                                background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.2rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700, color: '#fff'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
                                            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {view === 'details' && (
                <div style={{ maxWidth: 800, margin: '2rem auto' }}>
                    <button onClick={() => setView(selectedSub ? 'sub' : 'type')} style={{ background: 'transparent', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>← Go Back</button>

                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 32, padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ fontSize: '4rem' }}>{selectedSub ? (COMPANY_DETAILS[selectedSub]?.logo || '🏢') : selectedType.icon}</div>
                            <div>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, margin: 0 }}>{selectedSub || selectedType.label}</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.2rem' }}>{selectedSub ? 'Sector Integrated Mock' : 'Level-Based Assessment'}</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                            {[
                                { l: 'Questions', v: (MOCK_PATTERNS[selectedSub] || selectedType?.pattern)?.questions || 60, i: '📝' },
                                { l: 'Duration', v: `${(MOCK_PATTERNS[selectedSub] || selectedType?.pattern)?.duration || 60}m`, i: '⏱️' },
                                { l: 'Difficulty', v: selectedSub ? (COMPANY_DETAILS[selectedSub]?.difficulty + '/10') : 'Tiered', i: '📊' }
                            ].map((d, i) => (
                                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 24, textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{d.i}</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{d.l}</div>
                                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{d.v}</div>
                                </div>
                            ))}
                        </div>

                        {selectedSub && COMPANY_DETAILS[selectedSub] && (
                            <div style={{ marginBottom: '3rem' }}>
                                <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Section Weights</h4>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {COMPANY_DETAILS[selectedSub].sections.map(s => (
                                        <div key={s.name} style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1', padding: '0.5rem 1rem', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700 }}>
                                            {s.name}: {s.weight}%
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button onClick={startTest}
                            style={{
                                width: '100%', padding: '1.5rem', borderRadius: 20, border: 'none', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', fontSize: '1.2rem', fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 20px -10px rgba(99,102,241,0.5)', transition: 'all 0.3s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Launch Mock Engine →
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>
                            ⚠ Auto-submit enabled. Results will generate an AI Performance Report.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MockEngine;
