import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssessmentReport = ({ report, onReturn }) => {
    const navigate = useNavigate();

    if (!report) {
        return (
            <div className="report-container">
                <h2>No report data available.</h2>
                <button onClick={onReturn} className="btn-primary-large">Return to Hub</button>
            </div>
        );
    }

    const { scores, integrityScore, violationCount, violations, hiringProbability, moduleTitle } = report;
    const isTerminated = violationCount >= 3;

    return (
        <div className="report-container">
            <div className="report-header">
                <div className="report-title-badge">Assessment Result</div>
                <h1>{moduleTitle}</h1>
                <p>Detailed evaluation and integrity report for your session.</p>
            </div>

            {isTerminated && (
                <div className="report-terminated-alert">
                    <span className="alert-icon">⛔</span>
                    <div className="alert-text">
                        <h3>Interview Terminated</h3>
                        <p>This assessment was terminated due to exceeding the maximum allowed integrity violations.</p>
                    </div>
                </div>
            )}

            <div className="report-scores-grid">
                <div className="report-score-card">
                    <div className="score-val">{scores.overall}%</div>
                    <div className="score-label">Overall Score</div>
                </div>
                <div className="report-score-card">
                    <div className="score-val">{scores.communication}%</div>
                    <div className="score-label">Communication</div>
                </div>
                <div className="report-score-card">
                    <div className="score-val">{scores.technical}%</div>
                    <div className="score-label">Technical</div>
                </div>
                <div className="report-score-card" style={{ border: `2px solid ${integrityScore >= 80 ? '#10b981' : '#ef4444'}` }}>
                    <div className="score-val" style={{ color: integrityScore >= 80 ? '#10b981' : '#ef4444' }}>
                        {integrityScore}%
                    </div>
                    <div className="score-label">Integrity Score</div>
                </div>
            </div>

            <div className="report-details-grid">
                <div className="report-panel">
                    <h3>Probability of Hiring</h3>
                    <div className={`hiring-probability-badge ${hiringProbability.toLowerCase()}`}>
                        {hiringProbability}
                    </div>
                    <p className="panel-desc">
                        Based on industry benchmarks for {moduleTitle}, your performance places you in the <strong>{hiringProbability}</strong> probability band.
                    </p>
                </div>

                <div className="report-panel">
                    <h3>Integrity Log ({violationCount} Violations)</h3>
                    {violations.length === 0 ? (
                        <div className="log-empty">✅ Perfect integrity maintained. No violations recorded.</div>
                    ) : (
                        <ul className="log-list">
                            {violations.map(v => (
                                <li key={v.id} className={`log-item ${v.severity}`}>
                                    <span className="log-time">{new Date(v.timestamp).toLocaleTimeString()}</span>
                                    <span className="log-type">{v.type}</span>
                                    <span className="log-msg">{v.message}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="report-actions">
                {integrityScore >= 85 && !isTerminated && (
                    <button 
                        className="btn-primary-large cert-btn"
                        onClick={() => navigate('/assessment-certificate', { state: { report } })}
                    >
                        🏆 View Verified Certificate
                    </button>
                )}
                <button className="btn-outline-large" onClick={onReturn}>
                    Return to Hub
                </button>
            </div>
        </div>
    );
};

export default AssessmentReport;
