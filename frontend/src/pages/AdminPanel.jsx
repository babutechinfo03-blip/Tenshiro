import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SESSION_KEY = 'tenshiro_proctor_session';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        try {
            const data = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
            setSessions(data);
        } catch (e) {
            console.error('Failed to load sessions', e);
        }
    }, []);

    const handleClearAll = () => {
        if (window.confirm('Are you sure you want to clear all proctoring session logs?')) {
            localStorage.removeItem(SESSION_KEY);
            setSessions([]);
            setSelectedSession(null);
        }
    };

    const handleExport = (session) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(session, null, 2));
        const anchor = document.createElement('a');
        anchor.setAttribute("href", dataStr);
        anchor.setAttribute("download", `tenshiro_proctor_report_${session.sessionId}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    };

    return (
        <div className="admin-panel-container">
            <div className="admin-header">
                <h1>🛡️ Proctoring Admin Dashboard</h1>
                <div className="admin-actions">
                    <button className="btn-outline" onClick={() => navigate('/career-simulation')}>Back to Hub</button>
                    <button className="btn-primary" onClick={handleClearAll} style={{ background: '#ef4444' }}>Clear All Data</button>
                </div>
            </div>

            <div className="admin-grid">
                {/* Session List */}
                <div className="admin-list-col">
                    <h2>Session Logs ({sessions.length})</h2>
                    {sessions.length === 0 ? (
                        <p className="admin-empty">No sessions recorded yet.</p>
                    ) : (
                        <div className="admin-session-list">
                            {sessions.map(s => (
                                <div 
                                    key={s.sessionId} 
                                    className={`admin-session-card ${selectedSession?.sessionId === s.sessionId ? 'active' : ''}`}
                                    onClick={() => setSelectedSession(s)}
                                >
                                    <div className="session-card-header">
                                        <strong>{s.moduleTitle}</strong>
                                        <span className={`integrity-badge ${s.integrityScore >= 80 ? 'good' : 'bad'}`}>
                                            {s.integrityScore}%
                                        </span>
                                    </div>
                                    <div className="session-card-meta">
                                        <span>{new Date(s.sessionStartTime).toLocaleString()}</span>
                                        <span>{s.violationCount} Violations</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Session Details */}
                <div className="admin-details-col">
                    {selectedSession ? (
                        <div className="admin-details-card">
                            <div className="details-header">
                                <h2>Session Details: {selectedSession.sessionId}</h2>
                                <button className="btn-outline" onClick={() => handleExport(selectedSession)}>Export JSON</button>
                            </div>

                            <div className="details-grid-4">
                                <div className="detail-box">
                                    <div className="label">Overall Score</div>
                                    <div className="val">{selectedSession.scores.overall}%</div>
                                </div>
                                <div className="detail-box">
                                    <div className="label">Integrity</div>
                                    <div className="val" style={{ color: selectedSession.integrityScore >= 80 ? '#10b981' : '#ef4444' }}>{selectedSession.integrityScore}%</div>
                                </div>
                                <div className="detail-box">
                                    <div className="label">Violations</div>
                                    <div className="val">{selectedSession.violationCount}</div>
                                </div>
                                <div className="detail-box">
                                    <div className="label">Probability</div>
                                    <div className="val">{selectedSession.hiringProbability}</div>
                                </div>
                            </div>

                            <h3>Violation Log</h3>
                            {selectedSession.violations.length === 0 ? (
                                <p>No violations recorded.</p>
                            ) : (
                                <ul className="admin-violation-list">
                                    {selectedSession.violations.map(v => (
                                        <li key={v.id} className={v.severity}>
                                            <span className="time">{new Date(v.timestamp).toLocaleTimeString()}</span>
                                            <span className="type">[{v.type}]</span>
                                            <span className="msg">{v.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            <h3>Network & System Metadata</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)' }}>
                                <li>Tab Switches: {selectedSession.tabSwitchCount}</li>
                                <li>Fullscreen Exits: {selectedSession.fullscreenExitCount}</li>
                            </ul>

                        </div>
                    ) : (
                        <div className="admin-empty-details">
                            <p>Select a session to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
