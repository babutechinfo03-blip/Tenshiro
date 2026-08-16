import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const AssessmentCertificate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const certRef = useRef(null);
    const report = location.state?.report;

    if (!report || report.integrityScore < 85) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#fff' }}>
                <h2>Certificate not available.</h2>
                <p>Certificates are only issued for verified sessions with an Integrity Score of 85% or higher.</p>
                <button onClick={() => navigate('/career-simulation')} className="btn-primary-large">Return</button>
            </div>
        );
    }

    const handleDownload = () => {
        const element = certRef.current;
        const opt = {
            margin: 0,
            filename: `tenshiro_certificate_${report.sessionId}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'px', format: [1000, 707], orientation: 'landscape' }
        };
        html2pdf().set(opt).from(element).save();
    };

    return (
        <div className="cert-page-container">
            <div className="cert-toolbar">
                <button className="btn-outline" onClick={() => navigate('/career-simulation')}>← Back to Hub</button>
                <button className="btn-primary" onClick={handleDownload}>📥 Download PDF</button>
            </div>

            <div className="cert-wrapper" ref={certRef}>
                <div className="cert-border">
                    <div className="cert-content">
                        <div className="cert-logo">Tenshiro</div>
                        <h1 className="cert-title">Verified Assessment Certificate</h1>
                        <p className="cert-subtitle">This certifies that</p>
                        <h2 className="cert-name">Candidate #{report.sessionId.slice(-6)}</h2>
                        <p className="cert-text">
                            has successfully completed the heavily proctored <strong>{report.moduleTitle}</strong> simulation
                            with an exceptional Integrity Score of <strong>{report.integrityScore}%</strong>.
                        </p>
                        
                        <div className="cert-scores">
                            <div className="cert-score-item">
                                <span className="label">Overall Score</span>
                                <span className="val">{report.scores.overall}%</span>
                            </div>
                            <div className="cert-score-item">
                                <span className="label">Communication</span>
                                <span className="val">{report.scores.communication}%</span>
                            </div>
                            <div className="cert-score-item">
                                <span className="label">Technical</span>
                                <span className="val">{report.scores.technical}%</span>
                            </div>
                        </div>

                        <div className="cert-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginTop: 'auto', padding: '0 2rem' }}>
                            <div className="cert-badge" style={{ margin: 0 }}>
                                <div className="cert-badge-icon">🛡️</div>
                                <div>Verified Identity & Integrity</div>
                            </div>

                            <div className="cert-signature-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div className="cert-date" style={{ marginBottom: '1.5rem' }}>
                                    <strong>Date:</strong> {new Date(report.completedAt).toLocaleDateString()}
                                </div>
                                <div className="cert-signature" style={{ textAlign: 'center', borderTop: '2px solid #cbd5e1', paddingTop: '0.5rem', width: '250px' }}>
                                    <div>AI Assessment Board</div>
                                    <span>Tenshiro Official</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentCertificate;
