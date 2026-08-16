import React, { useEffect, useState } from 'react';
import { useProctoring } from '../../context/ProctoringContext';

const TopStatusBar = ({ timeRemaining, onEndInterview }) => {
    const {
        integrityScore, violationCount, questionNumber, totalQuestions,
        currentRound, faceStatus, networkStatus, isTerminated
    } = useProctoring();

    const [displayTime, setDisplayTime] = useState(timeRemaining);

    useEffect(() => {
        setDisplayTime(timeRemaining);
    }, [timeRemaining]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const integrityColor =
        integrityScore >= 80 ? '#10b981' :
        integrityScore >= 60 ? '#f59e0b' : '#ef4444';

    const roundColors = {
        'HR Round':         '#6366f1',
        'Technical Round':  '#3b82f6',
        'Project Round':    '#8b5cf6',
        'Managerial Round': '#f59e0b',
        'Final Evaluation': '#10b981',
    };
    const roundColor = roundColors[currentRound] || '#6366f1';

    return (
        <div className="proctor-top-bar">
            {/* Left: Timer */}
            <div className="ptb-section ptb-left">
                <div className={`ptb-timer ${displayTime < 300 ? 'urgent' : ''}`}>
                    <span className="ptb-timer-icon">⏱</span>
                    <span className="ptb-timer-value">{formatTime(displayTime)}</span>
                    <span className="ptb-timer-label">Remaining</span>
                </div>
            </div>

            {/* Center: Round + Question */}
            <div className="ptb-section ptb-center">
                <div className="ptb-round-badge" style={{ borderColor: roundColor, color: roundColor }}>
                    {currentRound}
                </div>
                <div className="ptb-question-badge">
                    Q {questionNumber} / {totalQuestions}
                </div>
            </div>

            {/* Right: Scores + Warnings */}
            <div className="ptb-section ptb-right">
                {/* Network */}
                <div className={`ptb-indicator ${networkStatus === 'good' ? 'good' : 'warn'}`}>
                    <span>📶</span>
                    <span>{networkStatus === 'good' ? 'Online' : networkStatus === 'slow' ? 'Slow' : 'Offline'}</span>
                </div>

                {/* Face */}
                <div className={`ptb-indicator ${faceStatus === 'ok' ? 'good' : 'bad'}`}>
                    <span>👤</span>
                    <span>{faceStatus === 'ok' ? 'Face OK' : faceStatus === 'missing' ? 'No Face' : 'Multi-Face'}</span>
                </div>

                {/* Warnings */}
                {violationCount > 0 && (
                    <div className="ptb-warnings-badge">
                        <span>⚠️</span>
                        <span>{violationCount} Warning{violationCount !== 1 ? 's' : ''}</span>
                    </div>
                )}

                {/* Integrity */}
                <div className="ptb-integrity" style={{ '--integrity-color': integrityColor }}>
                    <div className="ptb-integrity-ring">
                        <svg viewBox="0 0 36 36" className="ptb-ring-svg">
                            <path
                                className="ptb-ring-bg"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path
                                className="ptb-ring-fill"
                                style={{ stroke: integrityColor, strokeDasharray: `${integrityScore}, 100` }}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.5" className="ptb-ring-text" style={{ fill: integrityColor }}>
                                {integrityScore}
                            </text>
                        </svg>
                    </div>
                    <span className="ptb-integrity-label">Integrity</span>
                </div>

                {/* End Interview */}
                {!isTerminated && (
                    <button className="ptb-end-btn" onClick={onEndInterview}>
                        End Interview
                    </button>
                )}
            </div>
        </div>
    );
};

export default TopStatusBar;
