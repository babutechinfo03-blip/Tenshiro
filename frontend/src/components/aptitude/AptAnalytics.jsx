import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as ReRadar
} from 'recharts';
import { mkBlueprint, pctile, grade } from './AptUtils';

const AptAnalytics = ({ result, history, radarData, onRetry, onBack }) => {
    // -------------------------------------------------------------------------
    // RENDER: HISTORY MODE (General Analytics Tab)
    // -------------------------------------------------------------------------
    if (history) {
        const chartData = history.slice(0, 10).reverse().map((a, i) => ({
            name: `Test ${i + 1}`,
            score: a.pct
        }));

        const skillMatrix = Object.entries(radarData || {}).map(([label, val]) => ({
            subject: label,
            A: val,
            fullMark: 100
        }));

        return (
            <div style={{ animation: 'fadeInUp 0.6s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: -1 }}>Performance Intelligence</h2>
                        <p style={{ color: 'var(--text-muted)', margin: '5px 0 0', fontWeight: 500 }}>AI-powered analytics and readiness blueprint</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                    {/* Readiness Graph */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 28, padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: 10 }}>📈 Readiness Trajectory</h3>
                        <div style={{ height: 350, width: '100%' }}>
                            {history.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                        <Tooltip
                                            contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--text-main)' }}
                                            itemStyle={{ color: '#6366f1', fontWeight: 800 }}
                                        />
                                        <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Start your first session to unlock growth tracking.</div>
                            )}
                        </div>
                    </div>

                    {/* Skill Spider */}
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 28, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '2rem' }}>🎯 Intelligence Spider</h3>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {skillMatrix.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillMatrix}>
                                        <PolarGrid stroke="var(--border)" />
                                        <PolarAngleAxis dataKey="subject" stroke="var(--text-muted)" fontSize={11} fontWeight={700} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <ReRadar name="Skills" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} dot />
                                    </RadarChart>
                                </ResponsiveContainer>
                            ) : (
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>Your skill tree will bloom once you complete practice sets.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // RENDER: RESULT MODE (After single test)
    // -------------------------------------------------------------------------
    if (!result) return null;

    const { correct, total, pct, timeEff, topicBreakdown, sillyMistakes, catLabel, category, color, blueprint } = result;
    const g = grade(pct);
    // Use server-side blueprint if valid, otherwise fallback to local generation
    const bp = (blueprint && blueprint.plan) ? blueprint : mkBlueprint(result, topicBreakdown || {});

    return (
        <div style={{ padding: '1rem', animation: 'fadeInUp 0.6s ease' }}>
            {/* Top Score Banner */}
            <div style={{ background: 'var(--bg-secondary)', border: `1px solid ${color}30`, borderRadius: 24, padding: '3rem 2rem', textAlign: 'center', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: `${color}10`, borderRadius: '50%', filter: 'blur(60px)' }}></div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.5rem' }}>{catLabel} Result</div>
                <div style={{ fontSize: '5rem', fontWeight: 900, color: g.c, lineHeight: 1, marginBottom: '0.5rem' }}>{pct}%</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: g.c }}>{g.l}</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Performance Percentile: <strong style={{ color: 'var(--text-main)' }}>~{pctile(pct)}</strong></div>
            </div>

            {/* Readiness & Rank Estimation (New) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid #6366f150', borderRadius: 24, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Company Readiness</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6366f1' }}>{Math.max(0, pct - 5)}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>Target: TCS, Infosys, Zoho</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid #1A326350', borderRadius: 24, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Govt Exam Readiness</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1A3263' }}>{Math.max(0, pct - 12)}%</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>Target: SSC, Bank PO</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', border: '1px solid #f59e0b50', borderRadius: 24, padding: '1.5rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Est. Global Rank</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b' }}>#{Math.max(1, 1000 - Math.round(pct * 9.5))}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>Top {100 - pct}% of aspirants</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
                {[
                    { label: 'Accuracy', value: `${pct}%`, icon: '🎯', color: '#1A3263' },
                    { label: 'Solve Speed', value: `${timeEff} Q/m`, icon: '⚡', color: '#06b6d4' },
                    { label: 'Questions', value: `${correct}/${total}`, icon: '✅', color: '#6366f1' },
                    { label: 'Time Spent', value: `${Math.round(result.timeUsed / 60)}m`, icon: '⏱️', color: '#ec4899' }
                ].map((stat, i) => (
                    <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 20, padding: '1.5rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>{stat.icon}</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: 8 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                {/* Section/Topic Breakdown */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>📊 Section-wise Analysis</h3>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {Object.entries(topicBreakdown || {}).map(([topic, data]) => {
                            const tp = Math.round((data.correct / data.total) * 100);
                            const tc = tp >= 75 ? '#1A3263' : tp >= 50 ? '#f59e0b' : '#ef4444';
                            return (
                                <div key={topic}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{topic}</span>
                                        <span style={{ fontWeight: 800, color: tc }}>{tp}% Mastery</span>
                                    </div>
                                    <div style={{ background: 'var(--border)', borderRadius: 99, height: 8 }}>
                                        <div style={{ width: `${tp}%`, height: '100%', background: tc, borderRadius: 99, boxShadow: `0 0 10px ${tc}40` }} />
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                        {data.correct} Correct • {data.total - data.correct} Incorrect • Avg Time: {Math.round(result.timeUsed / total)}s/q
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {/* AI Insights */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #6366f110, #a855f710)', border: '2px solid #6366f120', borderRadius: 24, padding: '2rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#6366f1', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>🤖 AI Performance Insight</h3>
                        <p style={{ color: 'var(--text-main)', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                            {bp.summary || (pct >= 80
                                ? `Outstanding! Your ${catLabel} performance is in the top 5% of aspirants. Focusing on your time management in ${bp.weak?.[0] || 'advanced sections'} could secure an 'Elite' rank.`
                                : pct >= 60
                                    ? `Solid footing. You're clear for basic ${catLabel} rounds, but for high-tier roles/exams, you need to tighten up ${bp.weak?.[0] || 'your core logic'}.`
                                    : `Focus required. The ${catLabel} pattern demands higher accuracy in ${bp.weak?.slice(0, 2).join(', ') || 'fundamentals'}. Re-attempting foundational practice sets is advised.`
                            )}
                        </p>
                    </div>


                    {sillyMistakes > 0 && (
                        <div style={{ background: '#f59e0b10', border: '2px solid #f59e0b30', borderRadius: 20, padding: '1.5rem', display: 'flex', gap: 15 }}>
                            <div style={{ fontSize: '2rem' }}>⚠️</div>
                            <div>
                                <h4 style={{ margin: 0, color: '#f59e0b', fontWeight: 900, fontSize: '1rem' }}>Silly Mistake Detector: {sillyMistakes}</h4>
                                <p style={{ margin: '5px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>You missed {sillyMistakes} easy question(s). This indicates a possible dip in concentration.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Improvement Blueprint */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.5rem' }}>🗺 AI Personalized Study Plan — <span style={{ color: color }}>{bp.headline || 'Optimization Path'}</span></h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
                    <div>
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: '1rem' }}>Action Plan</div>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {(bp.plan || []).map((step, i) => (
                                <div key={i} style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: color, color: '#fff', fontWeight: 900, fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
                <button onClick={onRetry} style={{ flex: 1, padding: '1.2rem', borderRadius: 18, border: 'none', background: `linear-gradient(135deg, ${color}, ${color}cc)`, color: '#fff', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', boxShadow: `0 10px 30px ${color}30` }}>🔄 Mastery Loop: Retry Test</button>
                <button onClick={onBack} style={{ flex: 1, padding: '1.2rem', borderRadius: 18, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-main)', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>← Back to Ecosystem</button>
            </div>
        </div>
    );
};

export default AptAnalytics;
