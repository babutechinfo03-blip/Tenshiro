import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { questionBank, generateTest } from './questionBank';

// Normalize a question from backend (options may be JSON string) to consistent shape
const normalizeQ = (q, i) => ({
    ...q,
    id: q.id || i + 1,
    options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
    marks: q.marks || 1,
    negative_marks: q.negative_marks || 0,
    category: q.category || 'quantitative',
});

// Build local fallback questions for a given config
const buildLocalFallback = (config) => {
    if (config.type === 'mock') {
        const cats = ['quantitative', 'logical', 'verbal', 'dataInterpretation'];
        const perCat = 15;
        const qs = [];
        cats.forEach(cat => {
            const pool = questionBank[cat] || [];
            const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, perCat);
            shuffled.forEach(q => qs.push({ ...q, category: cat, marks: 1, negative_marks: 0.25 }));
        });
        return qs;
    }
    const cat = config.category || 'quantitative';
    const pool = questionBank[cat] || questionBank.quantitative || [];
    let filtered = config.difficulty && config.difficulty !== 'Adaptive'
        ? pool.filter(q => q.difficulty === config.difficulty)
        : pool;
    if (!filtered.length) filtered = pool;
    return [...filtered]
        .sort(() => Math.random() - 0.5)
        .slice(0, config.count || 10)
        .map(q => ({ ...q, category: cat, marks: 1, negative_marks: 0.25 }));
};

// ─── Test Engine ───────────────────────────────────────────────────────────────
export const TestEngine = ({ config, onFinish }) => {
    const [questions, setQuestions] = useState([]);
    const [cur, setCur] = useState(0);
    const [ans, setAns] = useState({});
    const [marked, setMarked] = useState(new Set());
    const [time, setTime] = useState(0);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const iRef = useRef(null);

    // Initial Load: Sync or Start Session
    useEffect(() => {
        let fallbackTimer;

        const init = async () => {
            setLoading(true);

            // 2s Safety Fallback: Start a timer to force stop loading if sync/fetch is too slow
            fallbackTimer = setTimeout(() => {
                setLoading(currentLoading => {
                    if (currentLoading) {
                        console.warn('AptTestEngine: Load timeout (2s). Forcing fallback.');
                        const c = config.type === 'mock' ? 60 : (config.count || 10);
                        const fb = buildLocalFallback({ ...config, count: c });
                        setQuestions(fb);
                        const duration = config.type === 'mock' ? 60 : (config.duration || fb.length);
                        setTime(duration * 60);
                        return false;
                    }
                    return false;
                });
            }, 2000);

            try {
                // 1. Check for active session
                const resSync = await axios.get('/api/aptitude/session/sync');
                if (resSync.data && !resSync.data.expired) {
                    const session = resSync.data;
                    const qs = typeof session.questions === 'string' ? JSON.parse(session.questions) : session.questions;
                    setQuestions(qs);
                    setAns(typeof session.answers === 'string' ? JSON.parse(session.answers || '{}') : session.answers || {});

                    const now = new Date();
                    const end = new Date(session.end_time);
                    const remaining = Math.max(0, Math.floor((end - now) / 1000));
                    setTime(remaining);
                    clearTimeout(fallbackTimer);
                    setLoading(false);
                    return;
                }

                // 2. No active session, start new one
                if (config) {
                    const c = config.type === 'mock' ? 60 : (config.count || 10);
                    let qs = [];
                    try {
                        const resQs = await axios.get('/api/aptitude/questions', { params: { ...config, count: c } });
                        qs = (resQs.data || []).map(normalizeQ);
                    } catch (_) { }

                    if (!qs.length) {
                        console.info('API returned 0 questions — loading curated local set.');
                        qs = buildLocalFallback({ ...config, count: c });
                    }

                    try {
                        const resStart = await axios.post('/api/aptitude/session/start', {
                            config: { ...config, count: c },
                            questions: qs
                        });
                        const now = new Date();
                        const end = new Date(resStart.data.endTime);
                        setTime(Math.max(0, Math.floor((end - now) / 1000)));
                    } catch (_) {
                        const duration = config.type === 'mock' ? 60 : ((config.duration || qs.length));
                        setTime(duration * 60);
                    }
                    setQuestions(qs);
                }
            } catch (err) {
                console.error('Test Engine Init Failed:', err);
                const c = config.type === 'mock' ? 60 : (config.count || 10);
                const fb = buildLocalFallback({ ...config, count: c });
                setQuestions(fb);
                setTime((config.duration || fb.length) * 60);
            } finally {
                clearTimeout(fallbackTimer);
                setLoading(false);
            }
        };
        init();

        return () => {
            clearInterval(iRef.current);
            clearTimeout(fallbackTimer);
        };
    }, [config]);


    // Timer Logic
    useEffect(() => {
        if (loading || !questions.length) return;

        iRef.current = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(iRef.current);
                    autoSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(iRef.current);
    }, [loading, questions.length]);

    // Auto-Save every 10 seconds
    useEffect(() => {
        if (loading || !questions.length) return;
        const autoSaveTimer = setInterval(() => {
            localStorage.setItem(`mock_ans_${config.id || 'default'}`, JSON.stringify(ans));
            localStorage.setItem(`mock_cur_${config.id || 'default'}`, cur);
        }, 10000);
        return () => clearInterval(autoSaveTimer);
    }, [ans, cur, loading, config.id, questions.length]);


    const autoSubmit = () => {
        if (!isSubmitting) doSubmit();
    };

    const doSubmit = async () => {
        setIsSubmitting(true);
        clearInterval(iRef.current);

        try {
            // Send all answers to server for calculation
            const res = await axios.post('/api/aptitude/submit', {
                result: {
                    category: config.type === 'mock' ? 'Full Mock' : config.category,
                    difficulty: config.difficulty,
                    timeUsed: (config.duration || 30) * 60 - time,
                    ans: ans
                }
            });

            onFinish({
                ...res.data,
                category: config.type === 'mock' ? 'Full Mock' : config.category,
                catLabel: config.catLabel,
                color: config.color || '#6366f1',
                questions: questions,
                ans: ans
            });
        } catch (err) {
            console.error('Submission failed', err);
            // Fallback: local calculation if server fails
            const correct = questions.filter((q, i) => ans[i] === q.answer).length;
            onFinish({
                pct: Math.round((correct / questions.length) * 100),
                score: correct,
                totalMarks: questions.length,
                questions: questions,
                ans: ans
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
            <div style={{ border: `4px solid ${config?.color || '#6366f1'}20`, borderTop: `4px solid ${config?.color || '#6366f1'}`, borderRadius: '50%', width: 50, height: 50, animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Loading curated question set...</p>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    // Guard: questions not loaded yet or empty after loading
    if (!questions || questions.length === 0) return (
        <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📋</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>Preparing Your Question Set</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>We're building a personalized set for you. Please wait...</p>
            <button onClick={() => window.location.reload()} style={{ padding: '0.8rem 2rem', borderRadius: 14, border: 'none', background: config?.color || '#6366f1', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>Retry</button>
        </div>
    );

    // Sections Logic
    const sectionNames = [...new Set(questions.map(q => q.category))];
    const categoryLabels = {
        quantitative: 'Mathematics',
        logical: 'Logical Reasoning',
        verbal: 'Verbal Ability',
        dataInterpretation: 'Data Interpretation',
        advanced: 'Advanced Sections'
    };

    const q = questions[cur] || questions[0];
    if (!q) return null; // Extra safety guard
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    const urgent = time < 300; // 5 minutes

    return (
        <div style={{ display: 'flex', gap: '2rem', animation: 'fadeInUp 0.5s ease' }}>
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .q-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); border: 2px solid transparent; }
                .q-btn:hover { border-color: ${config.color || '#6366f1'}; transform: translateY(-2px); }
                .q-btn.active { border-color: ${config.color || '#6366f1'}; background: ${config.color || '#6366f1'}15 !important; }
                .sec-tab { padding: 0.8rem 1.5rem; border-radius: 14px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); font-weight: 700; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
                .sec-tab.active { background: ${config.color || '#6366f1'}; color: #fff; border-color: ${config.color || '#6366f1'}; }
            `}</style>

            {/* Main Test Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Section Tabs (New) */}
                <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {sectionNames.map(sec => {
                        const firstIdx = questions.findIndex(ques => ques.category === sec);
                        const isActive = q.category === sec;
                        return (
                            <button key={sec} onClick={() => setCur(firstIdx)} className={`sec-tab ${isActive ? 'active' : ''}`}>
                                {categoryLabels[sec] || sec}
                            </button>
                        );
                    })}
                </div>

                {/* Header Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '1.5rem 2.5rem' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Current Section</div>
                        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)' }}>{categoryLabels[q.category] || q.category}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '3rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Section Progress</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>
                                {questions.filter((ques, idx) => ques.category === q.category && ans[idx] !== undefined).length}
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/{questions.filter(ques => ques.category === q.category).length}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: urgent ? '#ef4444' : 'var(--text-muted)', textTransform: 'uppercase' }}>Time Left</div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: urgent ? '#ef4444' : (config.color || '#6366f1'), fontFamily: 'monospace' }}>{mins}:{secs}</div>
                        </div>
                    </div>
                </div>


                {/* Question Card */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 32, padding: '3.5rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, height: 6, background: config.color || '#6366f1', width: `${((cur + 1) / questions.length) * 100}%`, transition: 'width 0.4s ease' }} />
                    <div style={{ display: 'flex', gap: 10, marginBottom: '2rem' }}>
                        <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 99, background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontWeight: 800 }}>ID: #{q.id}</span>
                        <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 99, background: '#6366f115', color: '#6366f1', fontWeight: 800 }}>{q.difficulty}</span>
                        <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 99, background: '#1A326315', color: '#1A3263', fontWeight: 800 }}>{categoryLabels[q.category] || q.category}</span>
                        <span style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: 99, background: (q.negative_marks || 0) < 0 ? '#ef444415' : '#1A326315', color: (q.negative_marks || 0) < 0 ? '#ef4444' : '#1A3263', fontWeight: 800 }}>M: +{q.marks || 1} / -{Math.abs(q.negative_marks || 0)}</span>
                    </div>
                    <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>{q.question}</p>
                </div>


                {/* Options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                    {q.options && (typeof q.options === 'string' ? JSON.parse(q.options) : q.options).map((opt, idx) => {
                        const isSel = ans[cur] === idx;
                        return (
                            <button key={idx} onClick={() => setAns(p => ({ ...p, [cur]: idx }))}
                                style={{ textAlign: 'left', padding: '1.5rem 2rem', borderRadius: 20, background: isSel ? (config.color || '#6366f1') + '10' : 'var(--bg-secondary)', border: `2px solid ${isSel ? (config.color || '#6366f1') : 'var(--border)'}`, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 20 }}>
                                <div style={{ width: 34, height: 34, borderRadius: '50%', background: isSel ? (config.color || '#6366f1') : 'var(--bg-primary)', color: isSel ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.85rem', border: isSel ? 'none' : '1px solid var(--border)' }}>{String.fromCharCode(65 + idx)}</div>
                                <span style={{ fontSize: '1rem', fontWeight: isSel ? 800 : 500, color: isSel ? 'var(--text-main)' : 'var(--text-muted)' }}>{opt}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: 15 }}>
                        <button onClick={() => setCur(c => Math.max(0, c - 1))} disabled={cur === 0}
                            style={{ padding: '0.9rem 2rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontWeight: 800, cursor: cur === 0 ? 'not-allowed' : 'pointer', opacity: cur === 0 ? 0.5 : 1 }}>← Previous</button>
                        <button onClick={() => setMarked(p => { const n = new Set(p); n.has(cur) ? n.delete(cur) : n.add(cur); return n; })}
                            style={{ padding: '0.9rem 2rem', borderRadius: 16, border: '1px solid #f59e0b', background: marked.has(cur) ? '#f59e0b10' : 'transparent', color: '#f59e0b', fontWeight: 800, cursor: 'pointer' }}>
                            {marked.has(cur) ? '★ Unmark' : '☆ Mark for Review'}
                        </button>
                    </div>

                    {cur === questions.length - 1 ? (
                        <button onClick={() => setModal(true)} style={{ padding: '1rem 3.5rem', borderRadius: 18, border: 'none', background: 'linear-gradient(135deg, #1A3263, #059669)', color: '#fff', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(26, 50, 99, 0.3)' }}>Finish Session</button>
                    ) : (
                        <button onClick={() => setCur(c => c + 1)} style={{ padding: '1rem 3.5rem', borderRadius: 18, border: 'none', background: config.color || '#6366f1', color: '#fff', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', boxShadow: `0 10px 25px ${(config.color || '#6366f1')}30` }}>Next Question →</button>
                    )}
                </div>
            </div>

            {/* Question Sidebar */}
            <div style={{ width: 320, flexShrink: 0 }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 28, padding: '2rem', sticky: 'top', position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '1.5rem', letterSpacing: 1 }}>Question Navigator</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: '2.5rem' }}>
                        {questions.map((_, i) => {
                            let status = 'none'; // none, answered, marked, active
                            if (i === cur) status = 'active';
                            else if (marked.has(i)) status = 'marked';
                            else if (ans[i] !== undefined) status = 'answered';

                            return (
                                <button key={i} onClick={() => setCur(i)} className="q-btn"
                                    style={{
                                        aspectRatio: 1, borderRadius: 12, border: 'none', fontWeight: 900, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                                        background: status === 'active' ? (config.color || '#6366f1') : status === 'marked' ? '#f59e0b' : status === 'answered' ? '#1A3263' : 'var(--bg-primary)',
                                        color: status === 'none' ? 'var(--text-muted)' : '#fff',
                                        boxShadow: status === 'active' ? `0 0 15px ${(config.color || '#6366f1')}40` : 'none'
                                    }}>
                                    {i + 1}
                                </button>
                            );
                        })}
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#1A3263' }} /> Answered</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: '#f59e0b' }} /> Marked for Review</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: 'var(--bg-primary)' }} /> Not Attempted</div>
                    </div>

                    <button onClick={() => setModal(true)}
                        style={{ width: '100%', marginTop: '2.5rem', padding: '1.25rem', borderRadius: 18, border: 'none', background: 'var(--text-main)', color: 'var(--bg-primary)', fontWeight: 900, cursor: 'pointer', transition: 'all 0.2s' }}>
                        Submit All Answers
                    </button>
                </div>
            </div>

            {/* Final Submit Modal */}
            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '3.5rem', borderRadius: 32, maxWidth: 500, width: '90%', border: '1px solid var(--border)', textAlign: 'center', animation: 'fadeInUp 0.3s ease' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🏁</div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>End Session?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>You have attempted <strong>{Object.keys(ans).length}</strong> questions out of <strong>{questions.length}</strong>. Once submitted, you cannot modify your answers.</p>
                        <div style={{ display: 'flex', gap: 15 }}>
                            <button onClick={() => setModal(false)} style={{ flex: 1, padding: '1rem', borderRadius: 16, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', fontWeight: 800, cursor: 'pointer' }}>Cancel</button>
                            <button onClick={() => { setModal(false); doSubmit(); }} style={{ flex: 1.5, padding: '1rem', borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #1A3263, #059669)', color: '#fff', fontWeight: 900, cursor: 'pointer' }}>Yes, Submit Test</button>
                        </div>
                    </div>
                </div>
            )}

            {isSubmitting && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                    <div style={{ border: '5px solid #fff2', borderTop: '5px solid #1A3263', borderRadius: '50%', width: 60, height: 60, animation: 'spin 1.5s linear infinite' }}></div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>Calculating Real-Time Score...</div>
                </div>
            )}
        </div>
    );
};

