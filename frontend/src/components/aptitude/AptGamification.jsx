import React from 'react';
import { BADGES, WEEKLY_CHALLENGE } from './questionBank';
import { earnedBadges } from './AptUtils';

const AptGamification = ({ perf }) => {
    const eb = earnedBadges(perf);
    const streak = perf.streak || 0;
    const attempts = perf.attempts || [];

    // Calculate weekly progress
    const weekStart = Date.now() - 7 * 86400000;
    const weeklyCount = attempts.filter(a => a.date > weekStart && a.pct >= 75).length;
    const progress = Math.min((weeklyCount / WEEKLY_CHALLENGE.target) * 100, 100);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', animation: 'fadeInUp 0.6s ease' }}>
            {/* Streaks and Levels */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>🔥 Mastery Streak</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'linear-gradient(135deg, #f59e0b20, #ef444420)', padding: '2rem', borderRadius: 20, border: '1px solid #f59e0b30', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '4rem' }}>🔥</div>
                    <div>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>{streak}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Day Practice Streak</div>
                    </div>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: 1 }}>Performance Levels</h4>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[
                        { l: 'Novice', p: '0-20%', active: attempts.length < 5, c: '#94a3b8' },
                        { l: 'Scholar', p: '20-50%', active: attempts.length >= 5 && attempts.length < 15, c: '#1A3263' },
                        { l: 'Master', p: '50-80%', active: attempts.length >= 15 && attempts.length < 50, c: '#6366f1' },
                        { l: 'Elite', p: '80%+', active: attempts.length >= 50, c: '#a855f7' }
                    ].map((level, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: 12, background: level.active ? level.c + '15' : 'var(--bg-card)', border: level.active ? `2px solid ${level.c}` : '1px solid var(--border)', opacity: level.active ? 1 : 0.6 }}>
                            <span style={{ fontWeight: 800, color: level.active ? level.c : 'var(--text-main)' }}>{level.l}</span>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{level.p}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges and Milestones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem' }}>🏅 Achievement Badges</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                        {BADGES.map(badge => {
                            const earned = eb.includes(badge.id);
                            return (
                                <div key={badge.id} style={{ textAlign: 'center', padding: '1.25rem', borderRadius: 16, background: earned ? 'linear-gradient(135deg, #6366f110, #a855f710)' : 'var(--bg-card)', border: earned ? '1px solid #6366f140' : '1px solid var(--border)', opacity: earned ? 1 : 0.4, transition: 'all 0.3s' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: 10, filter: earned ? 'none' : 'grayscale(100%)' }}>{badge.icon}</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: earned ? 'var(--text-main)' : 'var(--text-muted)' }}>{badge.label}</div>
                                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: 5 }}>{badge.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Weekly Quest */}
                <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: 24, padding: '2rem', color: '#fff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                        <div>
                            <h3 style={{ margin: 0, fontWeight: 900 }}>🎯 Weekly Quest</h3>
                            <p style={{ margin: '5px 0 0', opacity: 0.9, fontSize: '0.9rem' }}>{WEEKLY_CHALLENGE.title}</p>
                        </div>
                        <div style={{ fontSize: '2rem' }}>⚡</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 99, height: 10, marginBottom: '1rem' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: '#fff', borderRadius: 99, boxShadow: '0 0 15px #fff' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700 }}>
                        <span>{weeklyCount} / {WEEKLY_CHALLENGE.target} Completed</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', fontStyle: 'italic', opacity: 0.8 }}>Reward: {WEEKLY_CHALLENGE.reward}</p>
                </div>
            </div>
        </div>
    );
};

export default AptGamification;
