import React from 'react';
import { useProctoring } from '../../context/ProctoringContext';

const ViolationOverlay = () => {
    const { currentWarning, acknowledgeWarning } = useProctoring();

    if (!currentWarning) return null;

    const { level, title, message, canDismiss } = currentWarning;

    let overlayClass = 'vo-overlay-warning';
    if (level === 'critical') overlayClass = 'vo-overlay-critical';
    if (level === 'terminated') overlayClass = 'vo-overlay-terminated';

    return (
        <div className={`vo-overlay ${overlayClass}`}>
            <div className="vo-card">
                <div className="vo-icon">
                    {level === 'terminated' ? '⛔' : level === 'critical' ? '🔴' : '⚠️'}
                </div>
                <h2 className="vo-title">{title}</h2>
                <p className="vo-message">{message}</p>

                {level === 'terminated' ? (
                    <div className="vo-footer-text">
                        The interview session has ended. Your performance and integrity data will be saved.
                    </div>
                ) : (
                    <div className="vo-actions">
                        {canDismiss && (
                            <button className="vo-btn vo-btn-primary" onClick={acknowledgeWarning}>
                                Acknowledge & Return
                            </button>
                        )}
                        <p className="vo-subtext">Continuing the violation will result in further penalties.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViolationOverlay;
