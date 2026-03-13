import React, { useState } from 'react';
import { TRACKS } from './questionBank';

const AptEntryFlow = ({ onSelectGoal }) => {
    const [goal, setGoal] = useState(null);

    const handleGoalSelect = (trackId) => {
        setGoal(trackId);
    };

    const handleActivitySelect = (activityId) => {
        onSelectGoal(goal, activityId);
    };

    const ACTIVITIES = [
        { id: 'learn', label: 'Learn Concepts', icon: '📚', desc: 'A-Z topic coverage', color: '#6366f1' },
        { id: 'practice', label: 'Practice Topic-wise', icon: '✏️', desc: 'Targeted skill building', color: '#1A3263' },
        { id: 'mock', label: 'Take Full Mock Test', icon: '📋', desc: 'Full exam simulation', color: '#f59e0b' },
        { id: 'company', label: 'Company / Exam Based Test', icon: '🏢', desc: 'Pattern specific practice', color: '#a855f7' },
        { id: 'analytics', label: 'Analyze My Performance', icon: '📊', desc: 'Detailed insights & AI tips', color: '#ec4899' },
    ];

    if (!goal) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', animation: 'fadeInUp 0.6s ease' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--text-main)' }}>What is your goal?</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Select a track to get started with tailored preparation.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: 1000, margin: '0 auto' }}>
                    {TRACKS.map(track => (
                        <div key={track.id} onClick={() => handleGoalSelect(track.id)}
                            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 20, padding: '2rem', cursor: 'pointer', transition: 'all 0.3s', textAlign: 'left' }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = track.color; e.currentTarget.style.boxShadow = `0 20px 40px ${track.color}20`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{track.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{track.label}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{track.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', animation: 'fadeInUp 0.6s ease' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: TRACKS.find(t => t.id === goal).color + '15', padding: '0.5rem 1rem', borderRadius: 99, marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{TRACKS.find(t => t.id === goal).icon}</span>
                <span style={{ fontWeight: 800, color: TRACKS.find(t => t.id === goal).color }}>{TRACKS.find(t => t.id === goal).label}</span>
                <button onClick={() => setGoal(null)} style={{ border: 'none', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', marginLeft: 10, fontWeight: 700 }}>Change</button>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem', color: 'var(--text-main)' }}>What do you want to do?</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', maxWidth: 1200, margin: '0 auto' }}>
                {ACTIVITIES.map(act => (
                    <div key={act.id} onClick={() => handleActivitySelect(act.id)}
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.75rem', cursor: 'pointer', transition: 'all 0.3s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.borderColor = act.color; e.currentTarget.style.background = act.color + '08'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}>
                        <div style={{ width: 60, height: 60, background: act.color + '15', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.25rem' }}>{act.icon}</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{act.label}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{act.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AptEntryFlow;
