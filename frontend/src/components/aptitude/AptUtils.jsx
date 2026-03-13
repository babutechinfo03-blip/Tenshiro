import { useState, useRef, useCallback, useMemo } from 'react';
import { CATEGORIES, TRACKS, COMPANY_DETAILS, BADGES, RESOURCES, PIPELINE_STEPS, COMPANY_SECTIONS, generateTest } from './questionBank';

// ─── Utils ─────────────────────────────────────────────────────────────────────
// ─── Utils ─────────────────────────────────────────────────────────────────────
export const avg = arr => arr.length ? Math.round(arr.reduce((s, x) => s + x, 0) / arr.length) : 0;
export const pctile = p => p >= 95 ? '99th' : p >= 85 ? '95th' : p >= 75 ? '85th' : p >= 65 ? '75th' : p >= 50 ? '60th' : '20th';
export const grade = p => p >= 80 ? { l: 'Excellent 🏆', c: '#1A3263' } : p >= 65 ? { l: 'Good 👍', c: '#6366f1' } : p >= 50 ? { l: 'Average 📚', c: '#f59e0b' } : { l: 'Needs Work 💪', c: '#ef4444' };

// loadP — load aptitude performance data from localStorage (used by Chatbot for context)
export const loadP = () => {
    try {
        const raw = localStorage.getItem('apt_perf');
        return raw ? JSON.parse(raw) : { attempts: [], bookmarks: [], streak: 0, readiness: 0, resourceStatus: {} };
    } catch (_) {
        return { attempts: [], bookmarks: [], streak: 0, readiness: 0, resourceStatus: {} };
    }
};

// mkBlueprint — generate a performance blueprint from a test result (used by Chatbot for context)
export const mkBlueprint = (result, extraData = {}) => {
    if (!result) return { strong: [], weak: [], score: 0, pct: 0 };
    const qs = result.questions || [];
    const ans = result.ans || {};
    const wrongCats = {};
    qs.forEach((q, i) => {
        if (ans[i] !== q.answer) {
            const cat = q.category || 'general';
            wrongCats[cat] = (wrongCats[cat] || 0) + 1;
        }
    });
    const weak = Object.entries(wrongCats).sort((a, b) => b[1] - a[1]).map(([cat]) => cat);
    const allCats = ['quantitative', 'logical', 'verbal', 'di'];
    const strong = allCats.filter(c => !weak.includes(c));
    return { strong, weak, score: result.score || 0, pct: result.pct || 0, ...extraData };
};

export const getKPIs = p => {
    const a = p.attempts || [];
    return {
        overall: avg(a.map(x => x.pct)),
        placement: avg(a.filter(x => ['quantitative', 'logical'].includes(x.category)).map(x => x.pct)),
        govt: avg(a.filter(x => x.is_govt || x.isGovt).map(x => x.pct)),
        company: avg(a.filter(x => x.company_id || x.company).map(x => x.pct)),
        speed: avg(a.map(x => x.time_efficiency || x.timeEff || 50)),
        total: a.length
    };
};

export const getReadiness = (p) => p.readiness || 0;

export const getRadar = p => {
    const a = p.attempts || [];
    const bc = c => avg(a.filter(x => x.category === c).map(x => x.pct)) || 30;
    return {
        Arithmetic: bc('quantitative'),
        Algebra: Math.max(20, bc('quantitative') - 8),
        'Data Interp.': bc('dataInterpretation'),
        Logical: bc('logical'),
        Verbal: bc('verbal'),
        Speed: avg(a.map(x => x.time_efficiency || x.timeEff || 50)) || 30
    };
};

export const earnedBadges = p => {
    // Badges can now be enriched with streak/readiness from backend
    return []; // Logic to be refined based on backend badge implementation if needed
};


// ─── SVG Radar ─────────────────────────────────────────────────────────────────

export const Radar = ({ data, size = 250 }) => {
    const cx = size / 2, cy = size / 2, mr = size / 2 - 42;
    const ks = Object.keys(data), n = ks.length;
    const ang = i => (i * 2 * Math.PI / n) - Math.PI / 2;
    const pt = (i, f) => ({ x: cx + mr * Math.cos(ang(i)) * f, y: cy + mr * Math.sin(ang(i)) * f });
    const poly = f => ks.map((_, i) => { const p = pt(i, f); return `${p.x},${p.y}`; }).join(' ');
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {[.25, .5, .75, 1].map((r, i) => <polygon key={i} points={poly(r)} fill="none" stroke="var(--border)" strokeWidth="1" />)}
            {ks.map((_, i) => { const p = pt(i, 1); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border)" strokeWidth="1" />; })}
            <polygon points={ks.map((k, i) => { const p = pt(i, (data[k] || 0) / 100); return `${p.x},${p.y}`; }).join(' ')} fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="2.5" />
            {ks.map((k, i) => { const p = pt(i, (data[k] || 0) / 100); return <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#6366f1" />; })}
            {ks.map((k, i) => { const p = pt(i, 1.28); return <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fill="var(--text-muted)" fontSize="9" fontWeight="700">{k}</text>; })}
        </svg>
    );
};

// ─── SectionHeader ─────────────────────────────────────────────────────────────
export const SH = ({ c, t, s }) => (
    <div style={{ marginBottom: '1rem', paddingLeft: '0.75rem', borderLeft: `3px solid ${c}` }}>
        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 900, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: 1 }}>{t}</h2>
        <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{s}</span>
    </div>
);

// ─── Hero Section ──────────────────────────────────────────────────────────────
export const HeroSection = ({ kpis, perf }) => {
    const trend = (perf.attempts || []).slice(-5).map(a => a.pct);
    const cards = [
        { l: 'Aptitude Index', v: `${kpis.overall}%`, c: '#6366f1', i: '🧠', s: `${kpis.total} tests taken` },
        { l: 'Placement Ready', v: `${kpis.placement}%`, c: '#8b5cf6', i: '💻', s: 'IT companies' },
        { l: 'Govt Readiness', v: `${kpis.govt}%`, c: '#f59e0b', i: '🏛️', s: 'SSC/IBPS/UPSC' },
        { l: 'Company Conf.', v: `${kpis.company}%`, c: '#1A3263', i: '🏢', s: 'Mock avg' },
        { l: 'Speed Index', v: `${kpis.speed}pts`, c: '#06b6d4', i: '⚡', s: 'Time efficiency' },
        { l: 'Score Trend', v: trend.length > 1 ? (trend[trend.length - 1] >= trend[0] ? '📈 Up' : '📉 Dip') : '⚡ Start', c: '#ec4899', i: '📊', s: trend.length > 1 ? `${trend[0]}% → ${trend[trend.length - 1]}%` : 'Take tests to see' },
    ];
    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 52, height: 52, background: 'linear-gradient(135deg,#6366f1,#a855f7)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', boxShadow: '0 8px 24px rgba(99,102,241,.35)' }}>🧠</div>
                    <div style={{ textAlign: 'left' }}>
                        <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg,#6366f1,#a855f7,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Aptitude Intelligence Engine</h1>
                        <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Structured · Adaptive · Market-Aligned</p>
                    </div>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '1rem' }}>
                {cards.map((c, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', border: `1px solid ${c.c}30`, borderRadius: 18, padding: '1.25rem 1rem', textAlign: 'center', transition: 'all .25s' }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 28px ${c.c}25`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: 5 }}>{c.i}</div>
                        <div style={{ color: c.c, fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{c.v}</div>
                        <div style={{ fontSize: '0.6rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, margin: '5px 0 3px' }}>{c.l}</div>
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>{c.s}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Learning Pipeline ─────────────────────────────────────────────────────────
export const Pipeline = ({ onStep, activeTab }) => (
    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.25rem', marginBottom: '2.5rem' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '1rem' }}>🗺 Your Learning Architecture</div>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {PIPELINE_STEPS.map((step, i) => {
                const active = step.tab === activeTab;
                return (
                    <div key={step.id} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <div onClick={() => onStep(step.tab)} style={{ flex: 1, padding: '0.85rem 0.5rem', borderRadius: 12, background: active ? 'linear-gradient(135deg,#6366f1,#a855f7)' : 'var(--bg-primary)', border: `1px solid ${active ? 'transparent' : 'var(--border)'}`, cursor: 'pointer', textAlign: 'center', transition: 'all .2s' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: 3 }}>{step.icon}</div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: active ? '#fff' : 'var(--text-main)' }}>{step.label}</div>
                            <div style={{ fontSize: '0.6rem', color: active ? 'rgba(255,255,255,.7)' : 'var(--text-muted)', marginTop: 2 }}>{step.desc}</div>
                        </div>
                        {i < PIPELINE_STEPS.length - 1 && <div style={{ width: 22, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>→</div>}
                    </div>
                );
            })}
        </div>
    </div>
);

// ─── Track Selector ────────────────────────────────────────────────────────────
export const TrackPanel = ({ onStart }) => {
    const [open, setOpen] = useState(null);
    const track = TRACKS.find(t => t.id === open);
    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <SH c="#8b5cf6" t="Track Based Preparation" s="Select your target — get a tailored roadmap" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginBottom: open ? '1.25rem' : 0 }}>
                {TRACKS.map(tr => {
                    const on = open === tr.id;
                    return (
                        <div key={tr.id} onClick={() => setOpen(on ? null : tr.id)} style={{ background: on ? tr.gradient : 'var(--bg-secondary)', border: `2px solid ${on ? 'transparent' : tr.color + '30'}`, borderRadius: 18, padding: '1.5rem', cursor: 'pointer', transition: 'all .3s', transform: on ? 'translateY(-3px)' : 'none', boxShadow: on ? `0 8px 32px ${tr.color}30` : 'none' }}>
                            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{tr.icon}</div>
                            <div style={{ fontWeight: 900, fontSize: '1rem', color: on ? '#fff' : 'var(--text-main)', marginBottom: 5 }}>{tr.label}</div>
                            <div style={{ fontSize: '0.75rem', color: on ? 'rgba(255,255,255,.75)' : 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>{tr.description}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {tr.companies.slice(0, 3).map((c, i) => <span key={i} style={{ fontSize: '0.62rem', padding: '2px 7px', borderRadius: 6, background: on ? 'rgba(255,255,255,.2)' : `${tr.color}18`, color: on ? '#fff' : tr.color, fontWeight: 700 }}>{c}</span>)}
                            </div>
                        </div>
                    );
                })}
            </div>
            {track && (
                <div style={{ background: 'var(--bg-secondary)', border: `1px solid ${track.color}30`, borderRadius: 16, padding: '1.75rem', animation: 'fadeInUp .3s ease' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.25rem' }}>{track.icon} {track.label} — Module Breakdown</div>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${track.modules.length},1fr)`, gap: '1rem', marginBottom: '1.5rem' }}>
                        {track.modules.map((mod, i) => (
                            <div key={i} style={{ background: 'var(--bg-primary)', border: `1px solid ${track.color}20`, borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.3rem', marginBottom: 6 }}>{mod.icon}</div>
                                <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.8rem', marginBottom: 4 }}>{mod.name}</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 10 }}>{mod.difficulty} · {mod.count}Qs</div>
                                <button onClick={e => { e.stopPropagation(); onStart({ category: mod.category, catLabel: mod.name, difficulty: mod.difficulty, count: mod.count, time: Math.round(mod.count * 1.5), color: track.color, track: track.id }); }} style={{ width: '100%', padding: '0.42rem', borderRadius: 8, border: 'none', background: track.color, color: '#fff', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer' }}>▶ Start</button>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
                        {track.roadmap.map((step, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, padding: '0.55rem 0.85rem', background: `${track.color}10`, borderRadius: 10, border: `1px solid ${track.color}20` }}>
                                <div style={{ width: 22, height: 22, borderRadius: '50%', background: track.color, color: '#fff', fontWeight: 800, fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                                <span style={{ fontSize: '0.77rem', color: 'var(--text-main)', lineHeight: 1.4 }}>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Category Cards ─────────────────────────────────────────────────────────────
export const CatCard = ({ cat, perf, onStart }) => {
    const [diff, setDiff] = useState('Easy');
    const [cnt, setCnt] = useState(10);
    const [ai, setAi] = useState(false);
    const attempts = (perf.attempts || []).filter(a => a.category === cat.key);
    const prog = avg(attempts.map(a => a.pct));
    const last = attempts[attempts.length - 1];
    return (
        <div style={{ background: 'var(--bg-secondary)', border: `1px solid ${cat.color}28`, borderRadius: 20, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', transition: 'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 10px 32px ${cat.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 42, height: 42, background: cat.accent, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{cat.icon}</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.88rem' }}>{cat.label}</div>
                    <div style={{ fontSize: '0.66rem', color: cat.color, fontWeight: 700 }}>{attempts.length} sessions</div>
                </div>
                <div onClick={() => setAi(p => !p)} style={{ width: 32, height: 18, borderRadius: 99, background: ai ? cat.color : 'var(--border)', transition: 'all .2s', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: ai ? 16 : 2, transition: 'left .2s' }} />
                </div>
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}><span>Progress</span><span style={{ color: cat.color, fontWeight: 800 }}>{prog}%</span></div>
                <div style={{ background: 'var(--border)', borderRadius: 99, height: 6 }}>
                    <div style={{ width: `${prog}%`, height: '100%', background: `linear-gradient(90deg,${cat.color},${cat.color}88)`, borderRadius: 99, transition: 'width 1s ease', minWidth: prog > 0 ? 6 : 0 }} />
                </div>
                {last && <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', marginTop: 4 }}>Last: <span style={{ color: cat.color, fontWeight: 800 }}>{last.score}/{last.total}</span></div>}
            </div>
            {ai ? (
                <div style={{ fontSize: '0.72rem', color: cat.color, fontWeight: 700, padding: '0.45rem', borderRadius: 8, background: cat.accent, textAlign: 'center' }}>🤖 Adaptive Mode Active — AI targets your weak topics</div>
            ) : (
                <div style={{ display: 'flex', gap: 5 }}>
                    {['Easy', 'Medium', 'Hard'].map(d => <button key={d} onClick={() => setDiff(d)} style={{ flex: 1, padding: '4px 2px', borderRadius: 7, border: `1px solid ${diff === d ? cat.color : 'var(--border)'}`, background: diff === d ? cat.color : 'transparent', color: diff === d ? '#fff' : 'var(--text-muted)', fontSize: '0.63rem', fontWeight: 700, cursor: 'pointer' }}>{d}</button>)}
                </div>
            )}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <select value={cnt} onChange={e => setCnt(Number(e.target.value))} style={{ flex: 1, padding: '5px 8px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.76rem', cursor: 'pointer' }}>
                    {[10, 20, 30, 50].map(c => <option key={c} value={c}>{c} Questions</option>)}
                </select>
                <span style={{ fontSize: '0.7rem', color: cat.color, fontWeight: 800, whiteSpace: 'nowrap' }}>⏱ {Math.round(cnt * 1.5)}m</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {cat.topics.slice(0, 3).map((t, i) => <span key={i} style={{ fontSize: '0.6rem', padding: '2px 7px', borderRadius: 99, background: cat.accent, color: cat.color, fontWeight: 700 }}>{t}</span>)}
            </div>
            <button onClick={() => onStart({ category: cat.key, catLabel: cat.label, difficulty: ai ? 'Adaptive' : diff, count: cnt, time: Math.round(cnt * 1.5), color: cat.color })}
                style={{ width: '100%', padding: '0.68rem', borderRadius: 12, border: 'none', background: `linear-gradient(135deg,${cat.color},${cat.color}cc)`, color: '#fff', fontWeight: 800, fontSize: '0.86rem', cursor: 'pointer' }}>
                🚀 Start{ai ? ' Adaptive' : ''} Practice
            </button>
        </div>
    );
};

// ─── Company Mode ──────────────────────────────────────────────────────────────
export const CompanyMode = ({ onStart }) => {
    const [sel, setSel] = useState('TCS');
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    const [activeAccordion, setActiveAccordion] = useState('strategy');

    const sections = useMemo(() => {
        return COMPANY_SECTIONS.map(section => ({
            ...section,
            companies: section.companies.filter(cid => {
                const co = COMPANY_DETAILS[cid];
                if (!co) return false;
                const matchesSearch = (co.name + cid).toLowerCase().includes(search.toLowerCase());

                const sId = section.id;
                const matchesCategory = filter === 'All' ||
                    (filter === 'IT' && (sId === 'it_giants' || sId === 'global_mnc')) ||
                    (filter === 'Core' && sId === 'core') ||
                    (filter === 'Govt' && sId === 'govt') ||
                    (filter === 'Banking' && sId === 'banking') ||
                    (filter === 'Product-Based' && sId === 'product') ||
                    (filter === 'Consulting' && sId === 'global_mnc' && ['Accenture', 'Deloitte', 'EY', 'PwC', 'KPMG'].includes(cid));

                return matchesSearch && matchesCategory;
            })
        })).filter(s => s.companies.length > 0);
    }, [search, filter]);

    const co = COMPANY_DETAILS[sel] || Object.values(COMPANY_DETAILS)[0];
    const tmax = Math.max(...(co?.trend || [60]));

    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <SH c="#1A3263" t="Company & Exam Intelligence" s="Analyze patterns of 50+ companies, MNCs, and Government exams" />

            <div style={{ display: 'flex', gap: '1.5rem', height: 600 }}>
                {/* Search & List Sidebar */}
                <div style={{ width: 240, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search company or exam..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.8rem', outline: 'none' }}
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.75rem', cursor: 'pointer', outline: 'none' }}
                        >
                            {['All', 'IT', 'Core', 'Govt', 'Banking', 'Product-Based', 'Consulting'].map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>

                    <div style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, overflowY: 'auto' }} className="custom-scroll">
                        {sections.map(section => (
                            <div key={section.id} style={{ marginBottom: 5 }}>
                                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, padding: '0.8rem 1rem 0.4rem', background: 'var(--bg-secondary)', position: 'sticky', top: 0, zIndex: 1, borderBottom: '1px solid var(--border)' }}>
                                    {section.label}
                                </div>
                                {section.companies.map(cid => {
                                    const c = COMPANY_DETAILS[cid];
                                    const isSel = sel === cid;
                                    return (
                                        <div key={cid} onClick={() => setSel(cid)} style={{ padding: '0.6rem 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, background: isSel ? `${c.color}15` : 'transparent', borderLeft: `3px solid ${isSel ? c.color : 'transparent'}`, transition: 'all .25s' }}>
                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: isSel ? 'var(--bg-secondary)' : 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', border: `1px solid ${isSel ? c.color : 'var(--border)'}`, flexShrink: 0, boxShadow: isSel ? `0 0 10px ${c.color}40` : 'none' }}>
                                                {c.logo}
                                            </div>
                                            <span style={{ fontWeight: isSel ? 800 : 600, color: isSel ? 'var(--text-main)' : 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cid}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display Panel */}
                <div style={{ flex: 1, background: 'var(--bg-secondary)', border: `1px solid ${co.color}30`, borderRadius: 20, padding: '2rem', overflowY: 'auto', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            <div style={{ fontSize: '3rem', width: 70, height: 70, background: 'var(--bg-card)', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${co.color}25`, boxShadow: `0 10px 20px ${co.color}15` }}>{co.logo}</div>
                            <div>
                                <h3 style={{ margin: 0, color: 'var(--text-main)', fontWeight: 900, fontSize: '1.4rem' }}>{co.name}</h3>
                                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                    <span style={{ fontSize: '0.7rem', color: co.color, fontWeight: 800, textTransform: 'uppercase', background: `${co.color}15`, padding: '2px 8px', borderRadius: 6 }}>{co.role}</span>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{co.pattern}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Difficulty Analysis</div>
                            <div style={{ display: 'flex', gap: 3, justifyContent: 'flex-end', marginTop: 6 }}>
                                {Array.from({ length: 10 }, (_, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 2, background: i < co.difficulty ? co.color : 'var(--border)', boxShadow: i < co.difficulty ? `0 0 8px ${co.color}40` : 'none' }} />)}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: co.color, fontWeight: 900, marginTop: 4 }}>Level: {co.difficulty >= 8 ? 'Extreme' : co.difficulty >= 6 ? 'Intense' : 'Balanced'} ({co.difficulty}/10)</div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1.5 }}>Section Weightage & Cutoffs</div>
                            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)' }}>
                                {co.sections.map((sec, i) => (
                                    <div key={i} style={{ marginBottom: 15 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.82rem' }}>
                                            <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{sec.name}</span>
                                            <span style={{ color: co.color, fontWeight: 900 }}>{sec.weight}%</span>
                                        </div>
                                        <div style={{ background: 'var(--border)', borderRadius: 99, height: 7, overflow: 'hidden' }}>
                                            <div style={{ width: `${sec.weight}%`, height: '100%', background: co.color, borderRadius: 99, boxShadow: `0 0 10px ${co.color}50` }} />
                                        </div>
                                    </div>
                                ))}
                                <div style={{ marginTop: 20, padding: '1rem', background: `linear-gradient(135deg, ${co.color}10, transparent)`, borderRadius: 12, border: `1px solid ${co.color}25`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Expected Cut-off</div>
                                        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: co.color }}>{co.cutoff}+</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Time Limit</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }}>{co.duration || 60} Mins</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 15, letterSpacing: 1.5 }}>5-Year Trend & AI Prediction</div>
                            <div style={{ background: 'var(--bg-card)', borderRadius: 16, padding: '1.5rem', border: '1px solid var(--border)', height: '100%' }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 100, marginBottom: 15, paddingBottom: 10, borderBottom: '1px solid var(--border)' }}>
                                    {co.trend.map((v, i) => {
                                        const yr = new Date().getFullYear() - 4 + i;
                                        return (
                                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                                <div style={{ width: '100%', height: `${(v / tmax) * 80}px`, background: i === 4 ? `linear-gradient(to top, ${co.color}, ${co.color}88)` : `${co.color}25`, borderRadius: '4px 4px 0 0', minHeight: 10, position: 'relative' }}>
                                                    <div style={{ position: 'absolute', top: -18, width: '100%', textAlign: 'center', fontSize: '0.6rem', fontWeight: 800, color: i === 4 ? co.color : 'var(--text-muted)' }}>{v}</div>
                                                </div>
                                                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 700 }}>{yr}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ padding: '0.75rem', background: '#ec489910', borderRadius: 10, border: '1px solid #ec489930', marginBottom: '1rem' }}>
                                    <div style={{ fontSize: '0.65rem', color: '#ec4899', fontWeight: 900, textTransform: 'uppercase', marginBottom: 4 }}>🤖 AI Difficulty Prediction</div>
                                    <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-main)', lineHeight: 1.4 }}>Complexity expected to rise by 12% in upcoming cycles. Focus on {co.category} speed.</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    <button onClick={() => onStart({ category: co.category, catLabel: co.name, difficulty: 'Adaptive', count: 20, time: co.duration || 30, color: co.color, company: sel, mode: co.mode })}
                                        style={{ gridColumn: '1 / span 2', padding: '0.8rem', borderRadius: 12, border: 'none', background: `linear-gradient(135deg,${co.color},${co.color}cc)`, color: '#fff', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', boxShadow: `0 8px 20px ${co.color}30` }}>
                                        📋 Start Premium Mock
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { id: 'strategy', title: '🎯 Time Management Strategy', content: `Spend 40% time on ${co.sections[0].name}, keep 5 mins for final review. Target 90% accuracy in Verbal to offset Quant difficulty.` },
                            { id: 'scoring', title: '📈 High Scoring Topics', content: `${co.category === 'quantitative' ? 'Percentages, Profit & Loss, and Data Interpretation' : 'Puzzles, Blood Relations and Syllogism'} are historically the highest yield topics for ${sel}.` },
                            { id: 'mistakes', title: '⚠️ Common Elimination Mistakes', content: 'Missing negative marking details, over-spending time on complex puzzles, and ignoring basic English grammar rules.' }
                        ].map(item => (
                            <div key={item.id} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                                <div onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)} style={{ padding: '1rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: activeAccordion === item.id ? `${co.color}08` : 'transparent' }}>
                                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)' }}>{item.title}</span>
                                    <span>{activeAccordion === item.id ? '−' : '+'}</span>
                                </div>
                                {activeAccordion === item.id && (
                                    <div style={{ padding: '0 1rem 1rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                        {item.content}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: '2rem' }}>
                        <a href={co.website} target="_blank" rel="noopener noreferrer" style={{ flex: 1, padding: '0.7rem', borderRadius: 12, border: `1px solid ${co.color}40`, color: co.color, fontWeight: 800, fontSize: '0.75rem', textAlign: 'center', textDecoration: 'none', background: 'transparent' }}>🔗 Portal</a>
                        <button style={{ flex: 1, padding: '0.7rem', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontWeight: 800, fontSize: '0.75rem' }}>📄 Syllabus</button>
                        <button style={{ flex: 1, padding: '0.7rem', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-main)', fontWeight: 800, fontSize: '0.75rem' }}>⌛ PYQs</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ─── Resource Engine ────────────────────────────────────────────────────────────
export const ResourceEngine = ({ perf, onBookmark, onStatusUpdate }) => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const bm = perf.bookmarks || [];
    const statusMap = perf.resourceStatus || {}; // { title: 'Completed' }

    const icons = { video: '▶️', pdf: '📄', download: '💾', book: '📚', shortcut: '⚡', formula: '🧬', mock: '🎯', pyq: '⌛' };
    const colors = { video: '#6366f1', pdf: '#ef4444', shortcut: '#f59e0b', formula: '#1A3263', mock: '#ec4899', pyq: '#06b6d4' };

    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <SH c="#06b6d4" t="AI Curated Preparation Resources" s="Intelligent library mapped to your weak areas and targets" />

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, padding: '0.7rem 1.25rem', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', outline: 'none' }}
                />
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    style={{ padding: '0.7rem 1rem', borderRadius: 14, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}
                >
                    {['All', 'Video', 'PDF', 'Shortcut', 'Formula', 'Mock', 'PYQ'].map(f => <option key={f} value={f.toLowerCase()}>{f}</option>)}
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }}>
                {CATEGORIES.map(cat => (
                    <div key={cat.key} style={{ background: 'var(--bg-card)', border: `1px solid ${cat.color}20`, borderRadius: 20, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.25rem' }}>
                            <div style={{ width: 36, height: 36, background: `${cat.color}15`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>{cat.icon}</div>
                            <span style={{ fontWeight: 900, color: cat.color, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>{cat.label}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(RESOURCES[cat.key] || []).filter(r => {
                                const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
                                const matchesFilter = filter === 'all' || r.type === filter;
                                return matchesSearch && matchesFilter;
                            }).map((res, i) => {
                                const bookmarked = bm.includes(res.title);
                                const status = statusMap[res.title] || 'Not Started';
                                const statusColor = status === 'Completed' ? '#1A3263' : status === 'In Progress' ? '#f59e0b' : 'var(--text-muted)';

                                return (
                                    <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 14, padding: '1rem', display: 'flex', alignItems: 'center', gap: 12, transition: 'all .2s' }}>
                                        <div style={{ width: 40, height: 40, background: `${colors[res.type] || '#ccc'}15`, color: colors[res.type], borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>{icons[res.type] || '📌'}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-main)' }}>{res.title}</div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
                                                <span style={{ fontSize: '0.65rem', color: colors[res.type] || 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{res.type}</span>
                                                <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--border)' }}></span>
                                                <select
                                                    value={status}
                                                    onChange={e => onStatusUpdate(res.title, e.target.value)}
                                                    style={{ background: 'transparent', border: 'none', color: statusColor, fontSize: '0.65rem', fontWeight: 800, cursor: 'pointer', outline: 'none', padding: 0 }}
                                                >
                                                    <option value="Not Started">Not Started</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            <a href={res.link} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 12px', borderRadius: 8, background: `${cat.color}20`, color: cat.color, fontWeight: 800, fontSize: '0.7rem', textDecoration: 'none', border: `1px solid ${cat.color}35` }}>Open</a>
                                            <button onClick={() => onBookmark(res.title)} style={{ padding: '6px', borderRadius: 8, border: '1px solid var(--border)', background: bookmarked ? '#f59e0b22' : 'transparent', color: bookmarked ? '#f59e0b' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>{bookmarked ? '★' : '☆'}</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Gamification + Progress Tracker ─────────────────────────────────────────
export const GamificationPanel = ({ perf, radar }) => {
    const eb = earnedBadges(perf);
    const streak = perf.streak || 0;
    const wDone = Math.min((perf.attempts || []).filter(a => {
        const wk = Date.now() - 7 * 86400000;
        return a.date && a.date > wk && a.pct >= 75;
    }).length, 5);
    return (
        <div style={{ marginBottom: '2.5rem' }}>
            <SH c="#ec4899" t="Progress & Gamification" s="Skill radar, streaks, badges and weekly challenges" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                {/* Radar */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem', fontSize: '0.85rem', alignSelf: 'flex-start' }}>📡 Skill Radar</div>
                    <Radar data={radar} size={220} />
                </div>
                {/* Streak + History */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', fontSize: '0.85rem' }}>📈 Score History</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', background: streak > 0 ? '#f59e0b15' : 'var(--bg-primary)', padding: '0.7rem', borderRadius: 10, border: `1px solid ${streak > 0 ? '#f59e0b40' : 'var(--border)'}` }}>
                        <div style={{ fontSize: '2rem' }}>🔥</div>
                        <div><div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#f59e0b' }}>{streak} Day</div><div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Practice Streak</div></div>
                    </div>
                    {(perf.attempts || []).length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>No history yet. Start a test!</div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
                            {(perf.attempts || []).slice(-10).map((a, i) => {
                                const tc = a.pct >= 70 ? '#1A3263' : a.pct >= 40 ? '#f59e0b' : '#ef4444';
                                const lbl = { quantitative: 'Q', logical: 'L', verbal: 'V', dataInterpretation: 'DI' };
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }} title={`${a.pct}%`}>
                                        <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>{a.pct}%</span>
                                        <div style={{ width: '100%', height: `${a.pct}%`, background: tc, borderRadius: '3px 3px 0 0', minHeight: 6 }} />
                                        <span style={{ fontSize: '0.52rem', color: 'var(--text-muted)' }}>{lbl[a.category] || 'T'}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {/* Badges + Weekly */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.85rem' }}>🏅 Badges & Weekly</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                        {BADGES.map(b => {
                            const earned = eb.includes(b.id);
                            return (
                                <div key={b.id} title={b.desc} style={{ textAlign: 'center', opacity: earned ? 1 : 0.3, transition: 'opacity .2s' }}>
                                    <div style={{ fontSize: '1.4rem', marginBottom: 2 }}>{b.icon}</div>
                                    <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 700 }}>{b.label}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,.1),rgba(168,85,247,.08))', border: '1px solid rgba(99,102,241,.2)', borderRadius: 12, padding: '0.85rem' }}>
                        <div style={{ fontWeight: 800, color: '#6366f1', fontSize: '0.78rem', marginBottom: 6 }}>🎯 Weekly Challenge</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-main)', marginBottom: 8, lineHeight: 1.5 }}>Complete 5 sets with 75%+ accuracy this week</div>
                        <div style={{ background: 'var(--border)', borderRadius: 99, height: 6, marginBottom: 5 }}>
                            <div style={{ width: `${(wDone / 5) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#a855f7)', borderRadius: 99, transition: 'width .5s' }} />
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{wDone}/5 completed · Reward: ⚡ Speed King Badge</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
