import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CATEGORIES } from './questionBank';

const AptResourceHub = ({ bookmarks, onBookmark }) => {
    const [selCat, setSelCat] = useState('quantitative');
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/aptitude/resources', { params: { category: selCat } });
                setResources(res.data);
            } catch (err) {
                console.error('Failed to load resources', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, [selCat]);

    const cat = CATEGORIES.find(c => c.key === selCat);
    const icons = { video: '📺', pdf: '📄', book: '📚', worksheet: '📝', link: '🔗' };

    return (
        <div style={{ padding: '1rem', animation: 'fadeInUp 0.5s ease' }}>
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>

            {/* Header */}
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem', background: 'linear-gradient(135deg,#06b6d4,#6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Resource Hub</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Formula Books, Shortcut Guides, PYQs, and Video Playlists</p>
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: '3rem' }}>
                <button onClick={() => setSelCat('All')}
                    style={{ background: selCat === 'All' ? '#6366f1' : 'var(--bg-secondary)', color: selCat === 'All' ? '#fff' : 'var(--text-muted)', padding: '0.8rem 1.5rem', borderRadius: 16, fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', border: '1px solid var(--border)' }}>
                    All Categories
                </button>
                {CATEGORIES.map(c => (
                    <button key={c.key} onClick={() => setSelCat(c.key)}
                        style={{ background: selCat === c.key ? c.color : 'var(--bg-secondary)', color: selCat === c.key ? '#fff' : 'var(--text-muted)', padding: '0.8rem 1.5rem', borderRadius: 16, fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8, border: '1px solid ' + (selCat === c.key ? 'transparent' : 'var(--border)') }}>
                        <span>{c.icon}</span> {c.label}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem' }}>
                {/* Main List */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {loading ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem' }}>
                            <div className="spinner" style={{ border: `4px solid #6366f120`, borderTop: `4px solid #6366f1`, borderRadius: '50%', width: 40, height: 40, animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                        </div>
                    ) : resources.length > 0 ? resources.map((res, i) => {
                        const isBookmarked = bookmarks?.includes(res.title);
                        const rCat = CATEGORIES.find(c => c.key === res.category) || cat;
                        return (
                            <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '1.5rem', transition: 'all 0.2s', position: 'relative' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = rCat.color; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ width: 50, height: 50, background: rCat.accent, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>{icons[res.type] || '📌'}</div>
                                    <button onClick={() => onBookmark(res.title)}
                                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.5rem', color: isBookmarked ? '#f59e0b' : 'var(--text-muted)', padding: 0 }}>
                                        {isBookmarked ? '★' : '☆'}
                                    </button>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{res.title}</h3>
                                <div style={{ display: 'flex', gap: 6, marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.65rem', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: 6, color: 'var(--text-muted)', fontWeight: 800 }}>{res.type.toUpperCase()}</span>
                                    {res.is_premium && <span style={{ fontSize: '0.65rem', background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '4px 8px', borderRadius: 6, color: '#fff', fontWeight: 800 }}>PREMIUM</span>}
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <a href={res.link} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', padding: '0.75rem', borderRadius: 12, background: rCat.color, color: '#fff', fontWeight: 800, fontSize: '0.85rem', textDecoration: 'none' }}>Access Resource</a>
                                </div>
                            </div>
                        );
                    }) : (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
                            <h3 style={{ color: 'var(--text-main)' }}>No resources found for this category yet</h3>
                        </div>
                    )}
                </div>

                {/* Sidebar: Highlights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '1.5rem' }}>
                        <h4 style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>🔥 Popular Downloads</h4>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {['Formula cheat sheet', 'Last 10 year PYQs', 'Fast Math shortcuts'].map((t, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>📈</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{t} <span style={{ color: '#1A3263', marginLeft: 5 }}>↓</span></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', borderRadius: 24, padding: '1.5rem', color: '#fff', boxShadow: '0 15px 30px #06b6d430' }}>
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 900 }}>Aptitude OS Premium</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: 1.6, opacity: 0.9 }}>Get access to 500+ PDF worksheets and priority AI doubt solving.</p>
                        <button style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem', borderRadius: 14, border: 'none', background: '#fff', color: '#06b6d4', fontWeight: 900, fontSize: '0.9rem', cursor: 'pointer' }}>Upgrade Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AptResourceHub;
