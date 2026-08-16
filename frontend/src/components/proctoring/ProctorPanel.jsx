import React from 'react';
import { useProctoring } from '../../context/ProctoringContext';

const ProctorPanel = ({ snapshotCountdown }) => {
    const {
        faceStatus, audioStatus, networkStatus,
        isProctoringActive, violationCount, integrityScore,
        tabSwitchCount, fullscreenExitCount, snapshots,
        currentRound, questionNumber, totalQuestions
    } = useProctoring();

    const getStatusPill = (status, goodLabel, badLabel, warnLabel = null) => {
        let cls = 'pp-pill-good', label = goodLabel;
        if (status === 'missing' || status === 'multiple' || status === 'suspicious' || status === 'offline' || status === 'bad') {
            cls = 'pp-pill-bad'; label = badLabel;
        } else if (status === 'looking_away' || status === 'slow' || status === 'warn') {
            cls = 'pp-pill-warn'; label = warnLabel || badLabel;
        }
        return <span className={`pp-pill ${cls}`}>{label}</span>;
    };

    const integrityColor =
        integrityScore >= 80 ? '#10b981' :
        integrityScore >= 60 ? '#f59e0b' : '#ef4444';

    return (
        <div className="proctor-panel">
            {/* Header */}
            <div className="pp-header">
                <div className="pp-live-dot" />
                <span className="pp-header-title">PROCTOR LIVE</span>
            </div>

            {/* Integrity Gauge */}
            <div className="pp-integrity-gauge">
                <div className="pp-gauge-label">Integrity Score</div>
                <div className="pp-gauge-value" style={{ color: integrityColor }}>
                    {integrityScore}%
                </div>
                <div className="pp-gauge-bar">
                    <div className="pp-gauge-fill" style={{ width: `${integrityScore}%`, background: integrityColor }} />
                </div>
                <div className="pp-gauge-sublabel">
                    {integrityScore >= 85 ? '🏆 Excellent' : integrityScore >= 70 ? '⚠️ Moderate' : '🚨 At Risk'}
                </div>
            </div>

            {/* Status Grid */}
            <div className="pp-status-section">
                <div className="pp-status-title">Live Monitoring</div>

                <div className="pp-status-row">
                    <span className="pp-status-icon">👤</span>
                    <span className="pp-status-label">Face</span>
                    {getStatusPill(faceStatus, '✓ Detected', '✗ Not Found', '! Looking Away')}
                </div>

                <div className="pp-status-row">
                    <span className="pp-status-icon">🎤</span>
                    <span className="pp-status-label">Audio</span>
                    {getStatusPill(audioStatus, '✓ Clean', '! Suspicious')}
                </div>

                <div className="pp-status-row">
                    <span className="pp-status-icon">🖥</span>
                    <span className="pp-status-label">Fullscreen</span>
                    {getStatusPill(
                        document.fullscreenElement ? 'ok' : 'bad',
                        '✓ Locked', '✗ Exited'
                    )}
                </div>

                <div className="pp-status-row">
                    <span className="pp-status-icon">🔁</span>
                    <span className="pp-status-label">Tab</span>
                    {getStatusPill(
                        tabSwitchCount === 0 ? 'ok' : 'warn',
                        '✓ Focused', `${tabSwitchCount} Switch${tabSwitchCount !== 1 ? 'es' : ''}`
                    )}
                </div>

                <div className="pp-status-row">
                    <span className="pp-status-icon">📶</span>
                    <span className="pp-status-label">Network</span>
                    {getStatusPill(networkStatus, '✓ Good', '✗ Offline', '! Slow')}
                </div>
            </div>

            {/* Violations */}
            <div className="pp-violations-section">
                <div className="pp-status-title">Violations</div>
                <div className="pp-violations-count" style={{ color: violationCount === 0 ? '#10b981' : violationCount === 1 ? '#f59e0b' : '#ef4444' }}>
                    {violationCount} / 3
                </div>
                <div className="pp-violation-bars">
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className="pp-vbar"
                            style={{
                                background: violationCount > i
                                    ? (i === 0 ? '#f59e0b' : i === 1 ? '#ef4444' : '#7f1d1d')
                                    : 'rgba(255,255,255,0.1)'
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Snapshot Info */}
            <div className="pp-snapshot-section">
                <div className="pp-status-title">📸 Snapshots</div>
                <div className="pp-snapshot-count">{snapshots?.length || 0} captured</div>
                {snapshotCountdown !== undefined && (
                    <div className="pp-snapshot-timer">Next in {snapshotCountdown}s</div>
                )}
            </div>

            {/* Round Info */}
            <div className="pp-round-section">
                <div className="pp-status-title">Progress</div>
                <div className="pp-round-name">{currentRound}</div>
                <div className="pp-question-count">Q {questionNumber} of {totalQuestions}</div>
                <div className="pp-round-progress">
                    <div className="pp-round-fill" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }} />
                </div>
            </div>
        </div>
    );
};

export default ProctorPanel;
