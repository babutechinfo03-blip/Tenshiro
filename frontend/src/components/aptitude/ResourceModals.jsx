import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Shared Modal Styles ──────────────────────────────────────────────── */
const MODAL_CSS = `
  @keyframes rm-fadeIn  { from{opacity:0}               to{opacity:1} }
  @keyframes rm-slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes rm-spin    { to{transform:rotate(360deg)} }

  .rm-overlay {
    position:fixed; inset:0; z-index:9999;
    background:rgba(10,10,20,0.75); backdrop-filter:blur(10px);
    display:flex; align-items:center; justify-content:center;
    animation:rm-fadeIn .2s ease;
    padding:1rem;
  }
  .rm-panel {
    background:#fff; border-radius:22px; box-shadow:0 32px 80px rgba(0,0,0,0.28);
    animation:rm-slideUp .25s ease; position:relative;
    display:flex; flex-direction:column; overflow:hidden;
    max-height:92vh;
  }
  .rm-header {
    display:flex; align-items:flex-start; justify-content:space-between;
    padding:1.4rem 1.75rem 1.2rem; border-bottom:1px solid #f0f2f8; flex-shrink:0;
  }
  .rm-title  { font-size:1.15rem; font-weight:900; color:#0f172a; margin:0 0 .2rem; }
  .rm-sub    { font-size:.8rem; color:#94a3b8; font-weight:500; }
  .rm-close  {
    width:34px; height:34px; border-radius:8px; border:1px solid #e2e8f0;
    background:#f8fafc; cursor:pointer; font-size:1.1rem; display:flex;
    align-items:center; justify-content:center; flex-shrink:0; transition:all .15s;
  }
  .rm-close:hover { background:#fee2e2; border-color:#fca5a5; color:#dc2626; }
  .rm-body   { overflow-y:auto; flex:1; }
  .rm-body::-webkit-scrollbar { width:4px; }
  .rm-body::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:10px; }
  .rm-footer {
    padding:1rem 1.75rem; border-top:1px solid #f0f2f8; display:flex; gap:.75rem;
    align-items:center; flex-shrink:0; background:#fff;
  }
  .rm-btn {
    padding:.6rem 1.2rem; border-radius:9px; border:none; cursor:pointer;
    font-weight:700; font-size:.82rem; font-family:'Inter',sans-serif; transition:all .18s;
    display:flex; align-items:center; gap:6px;
  }
  .rm-btn.primary { background:linear-gradient(135deg,#6366f1,#8b5cf6); color:#fff; box-shadow:0 4px 14px #6366f130; }
  .rm-btn.primary:hover { box-shadow:0 6px 20px #6366f145; transform:translateY(-1px); }
  .rm-btn.secondary { background:#f1f5f9; color:#475569; }
  .rm-btn.secondary:hover { background:#e2e8f0; }
  .rm-badge { display:inline-flex; align-items:center; padding:3px 9px; border-radius:99px; font-size:.68rem; font-weight:800; }
`;

/* ─── Helpers ─────────────────────────────────────────────────────────── */
const Overlay = ({ children, onClose }) => {
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose]);

    return (
        <div className="rm-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <style>{MODAL_CSS}</style>
            {children}
        </div>
    );
};

/* ════════════════════════════════════════════════════════════════
   1. VIDEO MODAL
════════════════════════════════════════════════════════════════ */
export const VideoModal = ({ topic, url, isEmbed, onClose }) => {
    const iframeRef = useRef(null);

    // Stop video on close
    const handleClose = useCallback(() => {
        if (iframeRef.current) iframeRef.current.src = '';
        onClose();
    }, [onClose]);

    const ytSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(topic + ' aptitude tricks shortcuts')}`;

    return (
        <Overlay onClose={handleClose}>
            <div className="rm-panel" style={{ width: '100%', maxWidth: 860 }}>
                <div className="rm-header">
                    <div>
                        <div className="rm-title">▶️ {topic} — Video Tutorial</div>
                        <div className="rm-sub">Watch and learn at your own pace</div>
                    </div>
                    <button className="rm-close" onClick={handleClose}>✕</button>
                </div>

                <div className="rm-body" style={{ background: '#000' }}>
                    {isEmbed ? (
                        <iframe
                            ref={iframeRef}
                            src={url}
                            width="100%"
                            height="460"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none', display: 'block' }}
                            title={`${topic} tutorial`}
                        />
                    ) : (
                        <div style={{ padding: '3rem', textAlign: 'center', background: '#0f0f0f', color: '#fff', minHeight: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.25rem' }}>
                            <div style={{ fontSize: '4rem' }}>▶️</div>
                            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{topic} Tutorial</h3>
                            <p style={{ color: '#94a3b8', fontSize: '.9rem', maxWidth: 380, lineHeight: 1.6 }}>
                                This video playlist covers all core concepts, shortcuts and exam patterns for {topic}.
                            </p>
                            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a href={url} target="_blank" rel="noopener noreferrer"
                                    style={{ padding: '.75rem 1.5rem', borderRadius: 12, background: '#ff0000', color: '#fff', fontWeight: 800, fontSize: '.9rem', textDecoration: 'none' }}>
                                    ▶ Open on YouTube
                                </a>
                                <a href={ytSearch} target="_blank" rel="noopener noreferrer"
                                    style={{ padding: '.75rem 1.5rem', borderRadius: 12, background: '#1e293b', color: '#fff', fontWeight: 700, fontSize: '.9rem', textDecoration: 'none' }}>
                                    🔍 Search More Videos
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="rm-footer">
                    <span style={{ fontSize: '.78rem', color: '#94a3b8' }}>💡 Tip: Watch at 1.5× speed for exam prep</span>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="rm-btn secondary" style={{ marginLeft: 'auto', textDecoration: 'none' }}>↗ Open in YouTube</a>
                    <button className="rm-btn primary" onClick={handleClose}>✓ Done Watching</button>
                </div>
            </div>
        </Overlay>
    );
};

/* ════════════════════════════════════════════════════════════════
   2. PDF / FORMULA MODAL
════════════════════════════════════════════════════════════════ */
export const PdfModal = ({ topic, mode, formulaContent, onClose }) => {
    const [zoom, setZoom] = useState(100);
    const [dark, setDark] = useState(false);
    const [bookmarked, setBookmarked] = useState(() => {
        try { return JSON.parse(localStorage.getItem('apt_bookmarked_sheets') || '[]').includes(topic); }
        catch { return false; }
    });

    const toggleBookmark = () => {
        setBookmarked(b => {
            const next = !b;
            try {
                const arr = JSON.parse(localStorage.getItem('apt_bookmarked_sheets') || '[]');
                const updated = next ? [...arr, topic] : arr.filter(t => t !== topic);
                localStorage.setItem('apt_bookmarked_sheets', JSON.stringify(updated));
            } catch (_) { }
            return next;
        });
    };

    const contentBg = dark ? '#0f172a' : '#fff';
    const contentColor = dark ? '#e2e8f0' : '#1e293b';

    const genericFormula = `
        <h3 style="margin:0 0 1rem">${topic} — Formula Reference</h3>
        <p style="color:#64748b;margin:0 0 1.5rem;font-size:.9rem">Core formulas, derivations, and quick-reference rules for ${topic}.</p>
        <div style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:10px;padding:1rem;margin-bottom:.75rem;font-family:monospace;font-size:.92rem;color:#4338ca">
            Formula 1: Apply the primary formula for ${topic} directly to the given values.
        </div>
        <div style="background:#f0f4ff;border:1px solid #c7d2fe;border-radius:10px;padding:1rem;margin-bottom:.75rem;font-family:monospace;font-size:.92rem;color:#4338ca">
            Formula 2: Derived rule for special cases in ${topic} problems.
        </div>
        <div style="background:#fef9ee;border:1px solid #fde68a;border-radius:10px;padding:1rem;margin-bottom:.75rem;font-size:.88rem;color:#92400e">
            ⚡ Shortcut: Identify the question type first, then select the right formula variant.
        </div>
        <p style="font-size:.82rem;color:#94a3b8;margin-top:1.5rem">
            Practice using these formulas on 5 questions daily for best retention.
        </p>
    `;

    const content = formulaContent || genericFormula;

    return (
        <Overlay onClose={onClose}>
            <div className="rm-panel" style={{ width: '100%', maxWidth: 740 }}>
                <div className="rm-header">
                    <div>
                        <div className="rm-title">{mode === 'formula' ? '📐' : '📄'} {topic} — {mode === 'formula' ? 'Formula Sheet' : 'PDF Notes'}</div>
                        <div className="rm-sub">{mode === 'formula' ? 'Quick reference & shortcuts' : 'Comprehensive study notes'}</div>
                    </div>
                    <button className="rm-close" onClick={onClose}>✕</button>
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.75rem 1.75rem', borderBottom: '1px solid #f0f2f8', background: '#f8fafc', flexShrink: 0, flexWrap: 'wrap' }}>
                    <button onClick={() => setZoom(z => Math.max(60, z - 20))} className="rm-btn secondary" style={{ padding: '.35rem .75rem', fontSize: '.8rem' }}>− Zoom</button>
                    <span style={{ fontSize: '.8rem', fontWeight: 800, color: '#475569', minWidth: 48, textAlign: 'center' }}>{zoom}%</span>
                    <button onClick={() => setZoom(z => Math.min(180, z + 20))} className="rm-btn secondary" style={{ padding: '.35rem .75rem', fontSize: '.8rem' }}>+ Zoom</button>
                    <button onClick={() => setZoom(100)} className="rm-btn secondary" style={{ padding: '.35rem .75rem', fontSize: '.8rem' }}>Reset</button>
                    <button onClick={() => setDark(d => !d)} className="rm-btn secondary" style={{ padding: '.35rem .75rem', fontSize: '.8rem' }}>
                        {dark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                    <button onClick={toggleBookmark} style={{ marginLeft: 'auto', padding: '.35rem .75rem', borderRadius: 8, border: `1px solid ${bookmarked ? '#fde68a' : '#e2e8f0'}`, background: bookmarked ? '#fef9ee' : '#f8fafc', color: bookmarked ? '#d97706' : '#64748b', fontWeight: 800, fontSize: '.8rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .15s' }}>
                        {bookmarked ? '★ Bookmarked' : '☆ Bookmark'}
                    </button>
                </div>

                {/* PDF Content */}
                <div className="rm-body" style={{ padding: '1.5rem 2rem', background: dark ? '#1e293b' : '#f8fafc' }}>
                    <div style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top center',
                        background: contentBg,
                        color: contentColor,
                        borderRadius: 14,
                        padding: '2rem',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                        border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
                        marginBottom: zoom > 100 ? `${(zoom - 100) * 4}px` : 0,
                        lineHeight: 1.8,
                        fontSize: '.93rem',
                    }}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>

                <div className="rm-footer">
                    <span style={{ fontSize: '.75rem', color: '#94a3b8' }}>📄 Estimated read time: 5–10 min</span>
                    <button className="rm-btn secondary" style={{ marginLeft: 'auto' }} onClick={() => window.print()}>🖨️ Print</button>
                    <button className="rm-btn primary" onClick={onClose}>Done</button>
                </div>
            </div>
        </Overlay>
    );
};

/* ════════════════════════════════════════════════════════════════
   3. PYQ / COMPANY / GOVT MODAL
════════════════════════════════════════════════════════════════ */
export const PYQModal = ({ topic, mode, questions, sets, onClose }) => {
    const [activeSet, setActiveSet] = useState(mode === 'companySet' ? 'TCS' : mode === 'govtSet' ? 'SSC CGL' : 'pyq');
    const [qIdx, setQIdx] = useState(0);
    const [answered, setAnswered] = useState({});
    const [showExp, setShowExp] = useState({});
    const [score, setScore] = useState(0);

    const currentQuestions = (() => {
        if (mode === 'pyq') return questions || [];
        if (mode === 'companySet') return sets[activeSet] || [];
        if (mode === 'govtSet') return sets[activeSet] || [];
        return [];
    })();

    const q = currentQuestions[qIdx];
    const total = currentQuestions.length;
    const answeredCount = Object.keys(answered).length;

    const handleAnswer = (optIdx) => {
        if (answered[qIdx] !== undefined) return;
        const isCorrect = optIdx === q.ans;
        setAnswered(prev => ({ ...prev, [qIdx]: optIdx }));
        if (isCorrect) setScore(s => s + 1);
    };

    const resetQuiz = () => {
        setQIdx(0);
        setAnswered({});
        setShowExp({});
        setScore(0);
    };

    const setKeys = mode === 'companySet' ? Object.keys(sets) : mode === 'govtSet' ? Object.keys(sets) : [];
    const modeConfig = {
        pyq: { icon: '📑', title: 'Previous Year Questions', color: '#6366f1' },
        companySet: { icon: '🏢', title: 'Company Pattern Questions', color: '#7e22ce' },
        govtSet: { icon: '🏛️', title: 'Govt Exam PYQs', color: '#c2410c' },
    };
    const mc = modeConfig[mode] || modeConfig.pyq;

    return (
        <Overlay onClose={onClose}>
            <div className="rm-panel" style={{ width: '100%', maxWidth: 740 }}>
                {/* Header */}
                <div className="rm-header">
                    <div>
                        <div className="rm-title">{mc.icon} {topic} — {mc.title}</div>
                        <div className="rm-sub">{answeredCount}/{total} answered · Score: {score}/{answeredCount || '–'}</div>
                    </div>
                    <button className="rm-close" onClick={onClose}>✕</button>
                </div>

                {/* Set selector for company/govt */}
                {setKeys.length > 0 && (
                    <div style={{ display: 'flex', gap: '.5rem', padding: '.75rem 1.75rem', borderBottom: '1px solid #f0f2f8', flexWrap: 'wrap', flexShrink: 0, background: '#f8fafc' }}>
                        {setKeys.map(k => (
                            <button key={k} onClick={() => { setActiveSet(k); resetQuiz(); }}
                                style={{ padding: '.4rem .9rem', borderRadius: 8, border: `1px solid ${activeSet === k ? mc.color : '#e2e8f0'}`, background: activeSet === k ? mc.color + '12' : '#fff', color: activeSet === k ? mc.color : '#64748b', fontWeight: 700, fontSize: '.78rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all .15s' }}>
                                {k}
                            </button>
                        ))}
                    </div>
                )}

                {/* Progress bar */}
                <div style={{ padding: '0 1.75rem', flexShrink: 0 }}>
                    <div style={{ height: 3, background: '#f0f2f8', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: mc.color, transition: 'width .3s', width: total ? `${((qIdx + 1) / total) * 100}%` : '0%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '.5rem 0 .75rem', fontSize: '.72rem', fontWeight: 700, color: '#94a3b8' }}>
                        <span>Question {qIdx + 1} of {total}</span>
                        {(mode === 'companySet' || mode === 'govtSet') && q?.tag && (
                            <span className="rm-badge" style={{ background: mc.color + '12', color: mc.color }}>{q.tag}</span>
                        )}
                        {mode === 'govtSet' && q?.year && (
                            <span className="rm-badge" style={{ background: '#f0fdf4', color: '#059669' }}>📅 {q.year}</span>
                        )}
                    </div>
                </div>

                {/* Question Body */}
                <div className="rm-body" style={{ padding: '0 1.75rem 1rem' }}>
                    {!q ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                            <p>No questions available for this set yet. Check back soon!</p>
                        </div>
                    ) : (
                        <>
                            {/* Question */}
                            <div style={{ background: '#f8fafc', border: '1px solid #e8eaf0', borderRadius: 14, padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
                                <p style={{ margin: 0, fontWeight: 700, color: '#0f172a', fontSize: '.95rem', lineHeight: 1.65 }}>{q.q}</p>
                                {q.difficulty && (
                                    <span className="rm-badge" style={{ marginTop: '.6rem', background: q.difficulty === 'Easy' ? '#ecfdf5' : q.difficulty === 'Hard' ? '#fff1f2' : '#fffbeb', color: q.difficulty === 'Easy' ? '#059669' : q.difficulty === 'Hard' ? '#e11d48' : '#d97706' }}>
                                        {q.difficulty}
                                    </span>
                                )}
                            </div>

                            {/* Options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginBottom: '1rem' }}>
                                {q.opts.map((opt, i) => {
                                    const isChosen = answered[qIdx] === i;
                                    const isCorrect = i === q.ans;
                                    const isAnswered = answered[qIdx] !== undefined;
                                    let bg = '#fff', border = '#e2e8f0', color = '#1e293b';
                                    if (isAnswered) {
                                        if (isCorrect) { bg = '#ecfdf5'; border = '#6ee7b7'; color = '#065f46'; }
                                        else if (isChosen && !isCorrect) { bg = '#fff1f2'; border = '#fca5a5'; color = '#9f1239'; }
                                    }
                                    return (
                                        <button key={i} onClick={() => handleAnswer(i)}
                                            style={{ padding: '.85rem 1.25rem', borderRadius: 11, border: `2px solid ${border}`, background: bg, color, fontWeight: isAnswered && isCorrect ? 800 : 600, fontSize: '.88rem', cursor: isAnswered ? 'default' : 'pointer', textAlign: 'left', transition: 'all .15s', fontFamily: 'Inter,sans-serif', display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ minWidth: 24, height: 24, borderRadius: 6, background: isAnswered ? (isCorrect ? '#1A3263' : isChosen ? '#ef4444' : '#e2e8f0') : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 900, color: isAnswered && (isCorrect || isChosen) ? '#fff' : '#64748b', flexShrink: 0 }}>
                                                {isAnswered ? (isCorrect ? '✓' : isChosen ? '✕' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation */}
                            {answered[qIdx] !== undefined && (
                                <div>
                                    <button onClick={() => setShowExp(prev => ({ ...prev, [qIdx]: !prev[qIdx] }))}
                                        style={{ padding: '.45rem 1rem', borderRadius: 8, border: '1px solid #c7d2fe', background: '#eef2ff', color: '#4338ca', fontWeight: 700, fontSize: '.78rem', cursor: 'pointer', fontFamily: 'Inter,sans-serif', marginBottom: '.6rem' }}>
                                        {showExp[qIdx] ? '▲ Hide Explanation' : '▼ Show Explanation'}
                                    </button>
                                    {showExp[qIdx] && (
                                        <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '1rem 1.25rem', fontSize: '.85rem', color: '#3730a3', lineHeight: 1.65 }}>
                                            💡 {q.exp}
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="rm-footer">
                    <button onClick={resetQuiz} className="rm-btn secondary">🔄 Restart</button>
                    <span style={{ fontSize: '.78rem', color: '#94a3b8', marginLeft: '.5rem' }}>
                        Score: <strong style={{ color: score > answeredCount / 2 ? '#1A3263' : '#ef4444' }}>{score}/{answeredCount || 0}</strong>
                    </span>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '.6rem' }}>
                        <button onClick={() => { if (qIdx > 0) setQIdx(i => i - 1); }} className="rm-btn secondary" disabled={qIdx === 0} style={{ opacity: qIdx === 0 ? .4 : 1 }}>← Prev</button>
                        {qIdx < total - 1
                            ? <button onClick={() => setQIdx(i => i + 1)} className="rm-btn primary">Next →</button>
                            : <button onClick={onClose} className="rm-btn primary" style={{ background: 'linear-gradient(135deg,#1A3263,#059669)' }}>✓ Finish</button>
                        }
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

/* ════════════════════════════════════════════════════════════════
   4. RESOURCE BUTTON (drop-in replacement for the <a> elements)
════════════════════════════════════════════════════════════════ */
export const ResourceButton = ({ icon, label, desc, isNew, fileSize, readTime, onClick, loading }) => {
    const [pressed, setPressed] = useState(false);

    const handleClick = async () => {
        setPressed(true);
        setTimeout(() => setPressed(false), 180);
        await onClick();
    };

    return (
        <button onClick={handleClick}
            style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.1rem',
                borderRadius: 13, border: '1px solid #e8eaf0', background: pressed ? '#f1f5f9' : '#f8fafc',
                cursor: loading ? 'wait' : 'pointer', textAlign: 'left', width: '100%',
                transition: 'all .18s', fontFamily: 'Inter,sans-serif',
                transform: pressed ? 'scale(0.97)' : 'scale(1)',
                boxShadow: pressed ? 'none' : '0 1px 3px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#a5b4fc'; e.currentTarget.style.background = '#eef2ff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8eaf0'; e.currentTarget.style.background = pressed ? '#f1f5f9' : '#f8fafc'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; }}>

            <div style={{ fontSize: '1.6rem', flexShrink: 0, width: 40, textAlign: 'center' }}>
                {loading ? <span style={{ display: 'inline-block', width: 20, height: 20, border: '2px solid #c7d2fe', borderTop: '2px solid #6366f1', borderRadius: '50%', animation: 'rm-spin 0.7s linear infinite' }} /> : icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '.85rem', color: '#0f172a' }}>{label}</span>
                    {isNew && <span style={{ fontSize: '.6rem', background: '#1A3263', color: '#fff', borderRadius: 99, padding: '1px 6px', fontWeight: 800, letterSpacing: '.4px' }}>NEW</span>}
                </div>
                <div style={{ fontSize: '.73rem', color: '#94a3b8', marginTop: 2 }}>{desc}</div>
                {(fileSize || readTime) && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                        {fileSize && <span style={{ fontSize: '.67rem', color: '#b0b8c8', fontWeight: 600 }}>📦 {fileSize}</span>}
                        {readTime && <span style={{ fontSize: '.67rem', color: '#b0b8c8', fontWeight: 600 }}>⏱ {readTime}</span>}
                    </div>
                )}
            </div>

            <span style={{ fontSize: '.75rem', color: '#c7d2fe', flexShrink: 0 }}>↗</span>
        </button>
    );
};

export default { VideoModal, PdfModal, PYQModal, ResourceButton };
