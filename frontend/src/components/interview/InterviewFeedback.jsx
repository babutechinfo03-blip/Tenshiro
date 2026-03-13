import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis,
    ResponsiveContainer
} from 'recharts';
import {
    FaCheckCircle, FaExclamationTriangle, FaLightbulb,
    FaBook, FaRedo
} from 'react-icons/fa';

const InterviewFeedback = ({ results, onRestart }) => {
    const { t } = useLanguage();
    if (!results) return null;

    const chartData = [
        { subject: t('interview.subjects.overall'), A: results.scores.overall, fullMark: 100 },
        { subject: t('interview.subjects.confidence'), A: results.scores.confidence, fullMark: 100 },
        { subject: t('interview.subjects.technical'), A: results.scores.technicalDepth, fullMark: 100 },
        { subject: t('interview.subjects.communication'), A: results.scores.communication, fullMark: 100 },
        { subject: t('interview.subjects.companyFit'), A: results.scores.companyFit, fullMark: 100 },
    ];

    return (
        <div className="interview-feedback animate-in">
            <h2 style={{ marginBottom: '2.5rem', textAlign: 'center' }}>{t('interview.performanceAnalysis')}</h2>

            <div className="feedback-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
                <div className="chart-section" style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>{t('interview.skillMatrix')}</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="var(--border)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="var(--primary)"
                                    fill="var(--primary)"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="score-value" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <span style={{ fontSize: '3.5rem', color: 'var(--primary)' }}>{results.scores.overall}</span>
                        <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/100</span>
                        <p className="score-label">{t('interview.overallScore')}</p>
                    </div>
                </div>

                <div className="scores-breakdown">
                    <div className="feedback-grid">
                        <div className="score-card">
                            <div className="score-label">{t('interview.subjects.confidence')}</div>
                            <div className="score-value" style={{ fontSize: '1.75rem' }}>{results.scores.confidence}%</div>
                        </div>
                        <div className="score-card">
                            <div className="score-label">{t('interview.subjects.technical')}</div>
                            <div className="score-value" style={{ fontSize: '1.75rem' }}>{results.scores.technicalDepth}%</div>
                        </div>
                        <div className="score-card">
                            <div className="score-label">{t('interview.subjects.communication')}</div>
                            <div className="score-value" style={{ fontSize: '1.75rem' }}>{results.scores.communication}%</div>
                        </div>
                    </div>

                    <div className="analysis-card" style={{ marginTop: '2rem', background: 'rgba(26, 50, 99, 0.05)', borderColor: 'rgba(26, 50, 99, 0.2)' }}>
                        <h3 style={{ color: '#1A3263' }}><FaCheckCircle /> {t('interview.keyStrengths')}</h3>
                        <ul className="analysis-list">
                            {results.strengths.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="analysis-section">
                <div className="analysis-card" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <h3 style={{ color: '#ef4444' }}><FaExclamationTriangle /> {t('interview.improvementAreas')}</h3>
                    <ul className="analysis-list">
                        {results.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>
                <div className="analysis-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                    <h3 style={{ color: 'var(--primary)' }}><FaLightbulb /> {t('interview.aiSuggestions')}</h3>
                    <ul className="analysis-list">
                        {results.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>
            </div>

            <div className="resources-section" style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
                <h3><FaBook /> {t('interview.recommendedResources')}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                    {results.resources.map((r, i) => (
                        <div key={i} style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', fontSize: '0.9rem', fontWeight: 600 }}>
                            {r}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <button className="btn-primary" onClick={onRestart} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem' }}>
                    <FaRedo /> {t('interview.practiceAnother')}
                </button>
            </div>
        </div>
    );
};

export default InterviewFeedback;
