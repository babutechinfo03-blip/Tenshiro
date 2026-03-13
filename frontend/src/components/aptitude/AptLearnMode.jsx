import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORIES } from './questionBank';
import { getTopicContent } from './topicContent';
import { VideoModal, PdfModal, PYQModal, ResourceButton } from './ResourceModals';
import { getTopicResources, trackResourceUsage } from './resourceData';

/* ─── styles ─────────────────────────────────────────────── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes spin   { to{transform:rotate(360deg)} }
  @keyframes pulse  { 0%,100%{opacity:0.6} 50%{opacity:0.3} }

  .lm-wrap { display:flex; gap:1.5rem; min-height:84vh; font-family:'Inter',sans-serif; animation:fadeUp .4s ease; color: var(--text-main); }

  /* sidebar */
  .lm-sidebar { width:272px; flex-shrink:0; display:flex; flex-direction:column; gap:1rem; }
  .lm-card { background: var(--bg-secondary); border:1px solid var(--border); border-radius:16px; padding:1.25rem; }
  .lm-cat-btn { width:100%; display:flex; align-items:center; gap:10px; padding:.65rem 1rem; border-radius:10px;
    border:none; cursor:pointer; text-align:left; font-weight:700; font-size:.82rem;
    transition:all .18s; font-family:'Inter',sans-serif; }
  .lm-topic-btn { width:100%; display:flex; align-items:center; justify-content:space-between;
    padding:.6rem 1rem; border-radius:8px; border:none; cursor:pointer; text-align:left;
    font-weight:500; font-size:.8rem; transition:all .16s; font-family:'Inter',sans-serif; }
  .lm-section-label { font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.8px;
    color: var(--text-muted); margin-bottom:.75rem; }

  /* content area */
  .lm-content { flex:1; background: var(--bg-secondary); border:1px solid var(--border); border-radius:20px;
    overflow-y:auto; max-height:90vh; }
  .lm-content::-webkit-scrollbar { width:5px; }
  .lm-content::-webkit-scrollbar-thumb { background: var(--border); border-radius:10px; }
  .lm-sidebar::-webkit-scrollbar { width:5px; }
  .lm-sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius:10px; }

  /* hero */
  .lm-hero { padding:2.5rem 2.5rem 1.5rem; border-bottom:1px solid var(--border); }
  .lm-hero h1 { font-size:1.9rem; font-weight:900; color: var(--text-main); margin:0 0 .5rem; }
  .lm-badge { display:inline-flex; align-items:center; gap:5px; padding:3px 10px; border-radius:99px;
    font-size:.68rem; font-weight:700; }

  /* sections */
  .lm-section { padding:1.5rem 2.5rem; border-bottom:1px solid var(--border); }
  .lm-section:last-child { border-bottom:none; }
  .lm-sec-title { font-size:1rem; font-weight:800; color: var(--text-main); margin:0 0 1.25rem;
    display:flex; align-items:center; gap:8px; }

  /* stat cards */
  .lm-stats { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:.75rem; }
  .lm-stat { background: var(--bg-primary); border:1px solid var(--border); border-radius:12px; padding:1rem;
    display:flex; flex-direction:column; gap:4px; }
  .lm-stat-label { font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color: var(--text-muted); }
  .lm-stat-value { font-size:.9rem; font-weight:700; color: var(--text-main); }

  /* accordion */
  .lm-accord { border:1px solid var(--border); border-radius:12px; overflow:hidden; margin-bottom:.75rem; }
  .lm-accord-head { display:flex; align-items:center; justify-content:space-between;
    padding:1rem 1.25rem; cursor:pointer; background: var(--bg-primary); border:none; width:100%;
    text-align:left; font-weight:700; font-size:.88rem; color: var(--text-main); font-family:'Inter',sans-serif;
    transition:background .15s; }
  .lm-accord-head:hover { background: var(--bg-card); }
  .lm-accord-body { padding:1rem 1.25rem; font-size:.87rem; color: var(--text-muted); line-height:1.7;
    border-top:1px solid var(--border); background: var(--bg-secondary); }

  /* formula box */
  .lm-formula { background: var(--primary-glow); border:1px solid var(--border); border-radius:12px; padding:1rem 1.25rem;
    font-family:'Courier New',monospace; font-size:.9rem; color: var(--primary); font-weight:700;
    margin-bottom:.6rem; }

  /* shortcut chips */
  .lm-chips { display:flex; flex-wrap:wrap; gap:.5rem; }
  .lm-chip { display:flex; align-items:center; gap:6px; padding:.5rem .9rem; border-radius:8px;
    background: var(--primary-glow); border:1px solid var(--border); font-size:.8rem; font-weight:600; color: var(--primary); }

  /* example cards */
  .lm-ex { background: var(--bg-primary); border:1px solid var(--border); border-radius:12px; margin-bottom:.75rem; }
  .lm-ex-q { padding:1rem 1.25rem; font-weight:700; color: var(--text-main); font-size:.88rem;
    display:flex; align-items:flex-start; gap:10px; }
  .lm-ex-s { padding:.75rem 1.25rem 1rem; font-size:.85rem; color: var(--text-muted); line-height:1.7;
    border-top:1px solid var(--border); }
  .lm-ex-toggle { padding:.4rem .9rem; border-radius:6px; border:1px solid var(--border);
    background: var(--bg-card); color: var(--primary); font-size:.73rem; font-weight:700; cursor:pointer;
    font-family:'Inter',sans-serif; white-space:nowrap; }

  /* mistake cards */
  .lm-mistake { display:flex; gap:10px; align-items:flex-start; padding:.9rem 1.1rem;
    background: rgba(239, 68, 68, 0.05); border:1px solid rgba(239, 68, 68, 0.2); border-radius:12px; margin-bottom:.6rem; }
  .lm-mistake-icon { font-size:1.1rem; flex-shrink:0; margin-top:1px; }
  .lm-mistake-text { font-size:.85rem; color: var(--danger); line-height:1.6; font-weight:600; }

  /* practice buttons */
  .lm-prac-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:.75rem; }
  .lm-prac-btn { padding:.8rem .5rem; border-radius:12px; border:none; cursor:pointer;
    font-weight:700; font-size:.8rem; transition:all .2s; font-family:'Inter',sans-serif;
    display:flex; align-items:center; justify-content:center; gap:6px; }

  /* resource grid */
  .lm-res-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:.75rem; }
  .lm-res-item { display:flex; align-items:center; gap:10px; padding:1rem; border-radius:12px;
    border:1px solid var(--border); background: var(--bg-primary); text-decoration:none; transition:all .2s;
    color: var(--text-main); }
  .lm-res-item:hover { border-color: var(--primary); background: var(--bg-card); transform:translateY(-2px); }
  .lm-res-icon { font-size:1.5rem; flex-shrink:0; }
  .lm-res-label { font-size:.8rem; font-weight:700; color: var(--text-main); }
  .lm-res-desc  { font-size:.7rem; color: var(--text-muted); }

  /* AI insight cards */
  .lm-ai-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(170px,1fr)); gap:.75rem; }
  .lm-ai-card { background: var(--bg-glass); border:1px solid var(--border);
    border-radius:14px; padding:1.1rem; }
  .lm-ai-label { font-size:.68rem; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color: var(--primary); }
  .lm-ai-value { font-size:.95rem; font-weight:800; color: var(--text-main); margin-top:4px; }

  /* nav bar */
  .lm-nav-bar { display:flex; align-items:center; gap:.75rem; padding:1.25rem 2.5rem;
    border-top:1px solid var(--border); background: var(--bg-secondary); }
  .lm-nav-btn { padding:.6rem 1.2rem; border-radius:10px; border:1px solid var(--border);
    background: var(--bg-primary); color: var(--text-muted); font-weight:700; font-size:.8rem; cursor:pointer;
    transition:all .18s; font-family:'Inter',sans-serif; display:flex; align-items:center; gap:6px; }
  .lm-nav-btn:hover { border-color: var(--primary); color: var(--primary); background: var(--bg-card); }
  .lm-nav-btn.primary { background: linear-gradient(135deg, var(--primary), var(--accent)); color:#fff;
    border:none; box-shadow:0 4px 16px var(--primary-glow); }
  .lm-nav-btn.primary:hover { box-shadow:0 6px 24px var(--primary-glow); transform:translateY(-1px); }

  /* progress chip */
  .lm-prog { display:flex; align-items:center; justify-content:space-between;
    background: var(--bg-primary); border-radius:10px; padding:.6rem 1rem; margin-top:.75rem; }
  .lm-prog-bar-wrap { height:5px; background: var(--border); border-radius:99px; overflow:hidden; margin:.3rem 0; }
  .lm-prog-bar { height:100%; border-radius:99px; background:linear-gradient(90deg, var(--primary), var(--accent)); transition:width .4s; }

  /* empty / welcome */
  .lm-welcome { display:flex; flex-direction:column; align-items:center; justify-content:center;
    min-height:60vh; text-align:center; padding:3rem; color: var(--text-main); }

  /* live dot */
  .live-dot { width:7px; height:7px; border-radius:50%; background:#1A3263; display:inline-block; margin-right:4px; }
`;

/* ─── helpers ─────────────────────────────────────────────── */
const C_TAG = ({ color, children }) => (
    <span className="lm-badge" style={{ background: color + '18', color }}>{children}</span>
);

const AccordionItem = ({ title, children, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="lm-accord">
            <button className="lm-accord-head" onClick={() => setOpen(o => !o)}>
                <span>{title}</span>
                <span style={{ fontSize: '.8rem', color: '#94a3b8', transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}>▼</span>
            </button>
            {open && <div className="lm-accord-body">{children}</div>}
        </div>
    );
};

const ExampleCard = ({ ex, idx }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="lm-ex">
            <div className="lm-ex-q">
                <span style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '2px 8px', fontSize: '.7rem', fontWeight: 800, flexShrink: 0 }}>Q{idx + 1}</span>
                <span style={{ flex: 1 }}>{ex.q}</span>
                <button className="lm-ex-toggle" onClick={() => setShow(s => !s)}>{show ? 'Hide' : 'Solution'}</button>
            </div>
            {show && <div className="lm-ex-s">💡 {ex.solution}</div>}
        </div>
    );
};

/* ─── main component ─────────────────────────────────────────── */
const AptLearnMode = ({ onStartPractice }) => {
    const [selCat, setSelCat] = useState(CATEGORIES[0].key);
    const [selTopic, setSelTopic] = useState(null);
    const [completed, setCompleted] = useState(() => {
        try { return new Set(JSON.parse(localStorage.getItem('apt_completed') || '[]')); }
        catch { return new Set(); }
    });
    const [readSec, setReadSec] = useState(0);
    const timerRef = useRef(null);
    const contentRef = useRef(null);
    // Resource modal state
    const [activeModal, setActiveModal] = useState(null); // null | 'video' | 'pdf' | 'formula' | 'pyq' | 'companySet' | 'govtSet'
    const [resLoading, setResLoading] = useState(null); // which button is loading
    const openResource = useCallback(async (type, resources) => {
        setResLoading(type);
        trackResourceUsage(type, selTopic, type);
        await new Promise(r => setTimeout(r, 180)); // brief spinner
        setResLoading(null);
        setActiveModal({ type, resources });
    }, [selTopic]);

    // Reading timer
    useEffect(() => {
        if (selTopic) {
            setReadSec(0);
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => setReadSec(s => s + 1), 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [selTopic]);

    const toggleComplete = useCallback((topic) => {
        setCompleted(prev => {
            const next = new Set(prev);
            next.has(topic) ? next.delete(topic) : next.add(topic);
            localStorage.setItem('apt_completed', JSON.stringify([...next]));
            return next;
        });
    }, []);

    const cat = CATEGORIES.find(c => c.key === selCat);
    const topicIdx = cat.topics.indexOf(selTopic);
    const prevTopic = topicIdx > 0 ? cat.topics[topicIdx - 1] : null;
    const nextTopic = topicIdx < cat.topics.length - 1 ? cat.topics[topicIdx + 1] : null;

    const completedInCat = cat.topics.filter(t => completed.has(t)).length;
    const pct = Math.round((completedInCat / cat.topics.length) * 100);

    const content = selTopic ? getTopicContent(selCat, selTopic) : null;
    const fmtTime = (s) => s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;

    const navigate = (topic) => {
        setSelTopic(topic);
        if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const practiceButtons = [
        { label: '⚡ Easy', diff: 'Easy', style: { background: '#ecfdf5', color: '#059669', border: '1px solid #6ee7b7' } },
        { label: '🔥 Medium', diff: 'Medium', style: { background: '#fffbeb', color: '#d97706', border: '1px solid #fcd34d' } },
        { label: '💥 Hard', diff: 'Hard', style: { background: '#fff1f2', color: '#e11d48', border: '1px solid #fca5a5' } },
        { label: '📋 Sectional Mock', diff: 'Adaptive', style: { background: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' } },
        { label: '🏢 Company Style', diff: 'Medium', style: { background: '#fdf4ff', color: '#7e22ce', border: '1px solid #d8b4fe' } },
        { label: '🏛️ Govt PYQs', diff: 'Hard', style: { background: '#fff7ed', color: '#c2410c', border: '1px solid #fdba74' } },
    ];

    const topicResources = selTopic ? getTopicResources(selTopic) : null;

    return (
        <>
            <div className="lm-wrap">
                <style>{S}</style>

                {/* ── Sidebar ── */}
                <aside className="lm-sidebar">
                    {/* Categories */}
                    <div className="lm-card">
                        <div className="lm-section-label">Categories</div>
                        {CATEGORIES.map(c => (
                            <button key={c.key} className="lm-cat-btn"
                                onClick={() => { setSelCat(c.key); setSelTopic(null); }}
                                style={{
                                    background: selCat === c.key ? c.color : 'transparent',
                                    color: selCat === c.key ? '#fff' : '#64748b',
                                }}>
                                <span style={{ fontSize: '1.15rem' }}>{c.icon}</span>
                                <span>{c.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Topics + Progress */}
                    <div className="lm-card" style={{ flex: 1, overflowY: 'auto', maxHeight: '58vh' }}>
                        <div className="lm-section-label">Topics — {cat.label}</div>

                        {/* progress bar */}
                        <div style={{ marginBottom: '1rem' }}>
                            <div className="lm-prog">
                                <span style={{ fontSize: '.75rem', fontWeight: 700, color: '#475569' }}>{completedInCat}/{cat.topics.length} done</span>
                                <span style={{ fontSize: '.75rem', fontWeight: 800, color: cat.color }}>{pct}%</span>
                            </div>
                            <div className="lm-prog-bar-wrap">
                                <div className="lm-prog-bar" style={{ width: `${pct}%`, background: cat.color }} />
                            </div>
                        </div>

                        {cat.topics.map(t => (
                            <button key={t} className="lm-topic-btn"
                                onClick={() => navigate(t)}
                                style={{
                                    background: selTopic === t ? cat.color + '12' : 'transparent',
                                    color: selTopic === t ? cat.color : '#475569',
                                    fontWeight: selTopic === t ? 700 : 500,
                                }}>
                                <span>{completed.has(t) ? '✅' : '📄'} {t}</span>
                                {completed.has(t) && <span style={{ fontSize: '.65rem', color: '#1A3263', fontWeight: 800 }}>Done</span>}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* ── Content ── */}
                <div className="lm-content" ref={contentRef}>
                    {!selTopic ? (
                        <div className="lm-welcome">
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📖</div>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginBottom: '.75rem' }}>Select a Topic to Begin</h2>
                            <p style={{ color: '#64748b', maxWidth: 420, lineHeight: 1.7 }}>
                                Choose any topic from the left panel to access a full structured learning module — with concepts, formulas, examples, and practice.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
                                {cat.topics.slice(0, 4).map(t => (
                                    <button key={t} onClick={() => navigate(t)}
                                        style={{ padding: '.65rem 1.2rem', borderRadius: 10, border: `1px solid ${cat.color}40`, background: cat.color + '10', color: cat.color, fontWeight: 700, fontSize: '.85rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* ─ Hero ─ */}
                            <div className="lm-hero">
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
                                            <C_TAG color={cat.color}>{cat.icon} {cat.label}</C_TAG>
                                            <C_TAG color="#0ea5e9">{content.overview.difficulty}</C_TAG>
                                            <C_TAG color="#1A3263">Weightage: {content.overview.weightage}</C_TAG>
                                            {completed.has(selTopic) && <C_TAG color="#1A3263">✅ Completed</C_TAG>}
                                        </div>
                                        <h1 className="lm-hero" style={{ padding: 0, border: 'none', fontSize: '1.9rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>{selTopic}</h1>
                                        <p style={{ margin: '.5rem 0 0', color: '#64748b', fontSize: '.92rem', lineHeight: 1.6, maxWidth: 640 }}>{content.overview.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {selTopic && (
                                            <span style={{ fontSize: '.75rem', color: '#94a3b8', fontWeight: 600 }}>
                                                ⏱ {fmtTime(readSec)} reading
                                            </span>
                                        )}
                                        <button onClick={() => toggleComplete(selTopic)}
                                            style={{ padding: '.65rem 1.2rem', borderRadius: 11, border: `1px solid ${completed.has(selTopic) ? '#fca5a580' : '#6366f130'}`, background: completed.has(selTopic) ? '#ecfdf5' : '#eef2ff', color: completed.has(selTopic) ? '#059669' : '#4338ca', fontWeight: 800, fontSize: '.82rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                                            {completed.has(selTopic) ? '✅ Completed' : '○ Mark Done'}
                                        </button>
                                        <button onClick={() => onStartPractice(selCat, selTopic)}
                                            style={{ padding: '.65rem 1.4rem', borderRadius: 11, border: 'none', background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, color: '#fff', fontWeight: 800, fontSize: '.85rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif', boxShadow: `0 6px 20px ${cat.color}35` }}>
                                            🚀 Practice Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* ─ Section 1: Overview Stats ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">📊 Topic Overview</div>
                                <div className="lm-stats">
                                    <div className="lm-stat">
                                        <div className="lm-stat-label">Difficulty</div>
                                        <div className="lm-stat-value">{content.overview.difficulty}</div>
                                    </div>
                                    <div className="lm-stat">
                                        <div className="lm-stat-label">Weightage</div>
                                        <div className="lm-stat-value">{content.overview.weightage}</div>
                                    </div>
                                    <div className="lm-stat">
                                        <div className="lm-stat-label">Where Asked</div>
                                        <div className="lm-stat-value" style={{ fontSize: '.8rem' }}>{content.overview.askedIn.join(', ')}</div>
                                    </div>
                                    <div className="lm-stat" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                                        <div className="lm-stat-label" style={{ color: '#059669' }}>Why Important</div>
                                        <div className="lm-stat-value" style={{ fontSize: '.78rem', color: '#065f46' }}>{content.overview.importance}</div>
                                    </div>
                                </div>
                            </div>

                            {/* ─ Section 2: Core Concepts ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">💡 Core Concepts</div>
                                {content.concepts.map((c, i) => (
                                    <AccordionItem key={i} title={c.title} defaultOpen={i === 0}>
                                        {c.content}
                                    </AccordionItem>
                                ))}
                            </div>

                            {/* ─ Section 3: Formulas & Shortcuts ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">📐 Formulas & Shortcuts</div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <div style={{ fontSize: '.78rem', fontWeight: 700, color: '#4338ca', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '.6rem' }}>Key Formulas</div>
                                    {content.formulas.map((f, i) => (
                                        <div key={i} className="lm-formula">{f}</div>
                                    ))}
                                </div>
                                <div>
                                    <div style={{ fontSize: '.78rem', fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '.6rem' }}>Quick Tricks & Memory Tips</div>
                                    <div className="lm-chips">
                                        {content.shortcuts.map((s, i) => (
                                            <div key={i} className="lm-chip">🔥 {s}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ─ Section 4: Solved Examples ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">✅ Solved Examples</div>
                                <p style={{ fontSize: '.83rem', color: '#64748b', margin: '0 0 1rem' }}>Click "Solution" to reveal the step-by-step answer.</p>
                                {content.examples.map((ex, i) => <ExampleCard key={i} ex={ex} idx={i} />)}
                            </div>

                            {/* ─ Section 5: Common Mistakes ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">⚠️ Common Mistakes to Avoid</div>
                                {content.mistakes.map((m, i) => (
                                    <div key={i} className="lm-mistake">
                                        <div className="lm-mistake-icon">🔴</div>
                                        <div className="lm-mistake-text">{m}</div>
                                    </div>
                                ))}
                            </div>

                            {/* ─ Section 6: Practice ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">✏️ Practice This Topic</div>
                                <div className="lm-prac-grid">
                                    {practiceButtons.map((pb, i) => (
                                        <button key={i} className="lm-prac-btn" style={pb.style}
                                            onClick={() => onStartPractice(selCat, selTopic, pb.diff)}>
                                            {pb.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* ─ Section 7: Resources ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">🔗 Resource Links</div>
                                {topicResources && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '.65rem' }}>
                                        <ResourceButton
                                            icon="▶️" label="YouTube Tutorial" desc="~20 min playlist" readTime="20 min"
                                            loading={resLoading === 'video'}
                                            onClick={() => openResource('video', topicResources.video)}
                                        />
                                        <ResourceButton
                                            icon="📄" label="PDF Notes" desc="Comprehensive study notes" fileSize="2.4 MB" readTime="~10 min"
                                            loading={resLoading === 'pdf'}
                                            onClick={() => openResource('pdf', topicResources.pdf)}
                                        />
                                        <ResourceButton
                                            icon="📐" label="Formula Sheet" desc="Quick reference PDF" fileSize="1.1 MB" isNew readTime="~5 min"
                                            loading={resLoading === 'formula'}
                                            onClick={() => openResource('formula', topicResources.formula)}
                                        />
                                        <ResourceButton
                                            icon="📑" label="Previous Year Qs" desc="10 curated PYQs" readTime="~15 min"
                                            loading={resLoading === 'pyq'}
                                            onClick={() => openResource('pyq', topicResources.pyq)}
                                        />
                                        <ResourceButton
                                            icon="🏢" label="Company Set" desc="TCS / Infosys / Wipro" readTime="~20 min"
                                            loading={resLoading === 'companySet'}
                                            onClick={() => openResource('companySet', topicResources.companySet)}
                                        />
                                        <ResourceButton
                                            icon="🏛️" label="Govt Exam PYQs" desc="SSC / IBPS / RRB" readTime="~20 min"
                                            loading={resLoading === 'govtSet'}
                                            onClick={() => openResource('govtSet', topicResources.govtSet)}
                                        />
                                    </div>
                                )}
                            </div>
                            {/* ─ Section 8: AI Insights ─ */}
                            <div className="lm-section">
                                <div className="lm-sec-title">🤖 AI Insights</div>
                                <div className="lm-ai-grid">
                                    <div className="lm-ai-card">
                                        <div className="lm-ai-label">Most Tested</div>
                                        <div className="lm-ai-value" style={{ fontSize: '.85rem' }}>{content.aiInsights.mostTested}</div>
                                    </div>
                                    <div className="lm-ai-card">
                                        <div className="lm-ai-label">Avg Solve Time</div>
                                        <div className="lm-ai-value">{content.aiInsights.avgTime}</div>
                                    </div>
                                    <div className="lm-ai-card">
                                        <div className="lm-ai-label">AI Difficulty</div>
                                        <div className="lm-ai-value">{content.aiInsights.aiDifficulty}</div>
                                    </div>
                                    <div className="lm-ai-card">
                                        <div className="lm-ai-label">Daily Practice</div>
                                        <div className="lm-ai-value">{content.aiInsights.dailyCount} Questions</div>
                                    </div>
                                </div>
                            </div>

                            {/* ─ Navigation ─ */}
                            <div className="lm-nav-bar">
                                <button className="lm-nav-btn" onClick={() => navigate(prevTopic)} disabled={!prevTopic}
                                    style={{ opacity: prevTopic ? 1 : .4, cursor: prevTopic ? 'pointer' : 'default' }}>
                                    ← {prevTopic || 'Previous'}
                                </button>
                                <button className="lm-nav-btn" onClick={() => setSelTopic(null)}
                                    style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                    ↩ Back to {cat.label}
                                </button>
                                <button className="lm-nav-btn primary" onClick={() => navigate(nextTopic)} disabled={!nextTopic}
                                    style={{ opacity: nextTopic ? 1 : .4, cursor: nextTopic ? 'pointer' : 'default' }}>
                                    {nextTopic || 'Next'} →
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── Resource Modals ── */}
            {activeModal?.type === 'video' && (
                <VideoModal
                    topic={selTopic}
                    url={activeModal.resources.url}
                    isEmbed={activeModal.resources.isEmbed}
                    onClose={() => setActiveModal(null)}
                />
            )}
            {(activeModal?.type === 'pdf' || activeModal?.type === 'formula') && (
                <PdfModal
                    topic={selTopic}
                    mode={activeModal.type}
                    formulaContent={activeModal.resources.formulaContent}
                    onClose={() => setActiveModal(null)}
                />
            )}
            {(activeModal?.type === 'pyq' || activeModal?.type === 'companySet' || activeModal?.type === 'govtSet') && (
                <PYQModal
                    topic={selTopic}
                    mode={activeModal.type}
                    questions={activeModal.resources.questions}
                    sets={activeModal.resources.sets}
                    onClose={() => setActiveModal(null)}
                />
            )}
        </>
    );
};

export default AptLearnMode;
