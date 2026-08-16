import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FiUploadCloud, FiFileText, FiTrash2, FiCpu, FiTrendingUp, 
    FiCheckCircle, FiAlertTriangle, FiBookOpen, FiUserCheck, FiTarget,
    FiGrid, FiChevronRight, FiClock, FiActivity, FiRefreshCw, FiArrowLeft
} from 'react-icons/fi';

const ResumeAtsIntelligence = () => {
    // Input state
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');

    // Status states
    const [isParsing, setIsParsing] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [error, setError] = useState('');

    // Analysis report state
    const [report, setReport] = useState(null);

    // History states
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [selectedHistoryId, setSelectedHistoryId] = useState(null);

    // Fetch history on mount
    useEffect(() => {
        fetchHistory();
        // Setup PDF.js worker URL
        if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
        }
    }, []);

    const fetchHistory = async () => {
        setLoadingHistory(true);
        try {
            const res = await axios.get('/api/resume/history');
            setHistory(res.data);
        } catch (err) {
            console.error("Failed to load resume analysis history:", err);
        } finally {
            setLoadingHistory(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const ext = selectedFile.name.split('.').pop().toLowerCase();
            if (ext === 'pdf' || ext === 'docx') {
                setFile(selectedFile);
                setError('');
            } else {
                setError('Please upload a PDF or DOCX file.');
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            const ext = droppedFile.name.split('.').pop().toLowerCase();
            if (ext === 'pdf' || ext === 'docx') {
                setFile(droppedFile);
                setError('');
            } else {
                setError('Please upload a PDF or DOCX file.');
            }
        }
    };

    const parseFile = async (selectedFile) => {
        const ext = selectedFile.name.split('.').pop().toLowerCase();
        
        if (ext === 'pdf') {
            if (!window.pdfjsLib) {
                throw new Error("PDF.js library failed to load. Please refresh the page.");
            }
            setStatusMessage("Reading PDF contents...");
            const arrayBuffer = await selectedFile.arrayBuffer();
            const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items.map(item => item.str).join(' ');
                text += pageText + '\n';
            }
            return text;
        } else if (ext === 'docx') {
            if (!window.mammoth) {
                throw new Error("Mammoth.js library failed to load. Please refresh the page.");
            }
            setStatusMessage("Reading Word Document contents...");
            const arrayBuffer = await selectedFile.arrayBuffer();
            const result = await window.mammoth.extractRawText({ arrayBuffer });
            return result.value;
        }
        throw new Error("Unsupported file format.");
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a resume file first.');
            return;
        }
        if (!jobDescription || jobDescription.trim().length < 20) {
            setError('Please paste a job description (at least 20 characters) to analyze against.');
            return;
        }

        setIsParsing(true);
        setStatusMessage("Parsing uploaded document...");
        setError('');
        setReport(null);

        try {
            // Step 1: Parse resume file in the browser
            const extractedText = await parseFile(file);
            
            if (!extractedText || extractedText.trim().length < 50) {
                throw new Error("Could not extract sufficient text from the resume. Please ensure it is not scanned or empty.");
            }

            // Step 2: Trigger backend analysis with parsed text
            setIsParsing(false);
            setIsAnalyzing(true);
            setStatusMessage("Consulting ATS Scanners & AI Recruiters...");

            const payload = {
                resumeText: extractedText,
                targetRole: 'General',
                jobDescription: jobDescription
            };

            const response = await axios.post('/api/resume/analyze', payload);
            setReport(response.data);
            
            // Refresh history
            fetchHistory();
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred during resume analysis.');
            setIsParsing(false);
            setIsAnalyzing(false);
        } finally {
            setIsParsing(false);
            setIsAnalyzing(false);
            setStatusMessage('');
        }
    };

    const handleLoadHistoryItem = async (id) => {
        setIsAnalyzing(true);
        setStatusMessage("Retrieving analysis report...");
        setError('');
        setSelectedHistoryId(id);
        
        try {
            const res = await axios.get(`/api/resume/history/${id}`);
            setReport(res.data);
        } catch (err) {
            console.error("Failed to load historical report:", err);
            setError("Failed to retrieve the report.");
        } finally {
            setIsAnalyzing(false);
            setStatusMessage('');
        }
    };

    const handleDeleteHistoryItem = async (e, id) => {
        e.stopPropagation();
        if (!window.confirm("Are you sure you want to delete this analysis record?")) return;

        try {
            await axios.delete(`/api/resume/history/${id}`);
            setHistory(prev => prev.filter(item => item.id !== id));
            if (report && report.id === id) {
                setReport(null);
            }
        } catch (err) {
            console.error("Failed to delete history item:", err);
        }
    };

    // Color code scores and ranges
    const getScoreColor = (score) => {
        if (score >= 90) return '#10b981'; // Emerald (Excellent)
        if (score >= 75) return '#6366f1'; // Indigo (Good)
        if (score >= 60) return '#f59e0b'; // Amber (Needs Improvement)
        return '#ef4444'; // Crimson (High Risk)
    };

    const getScoreCategory = (score) => {
        if (score >= 90) return { label: 'Excellent', desc: 'Highly compatible and stands out to recruiters.' };
        if (score >= 75) return { label: 'Good', desc: 'Solid candidate profile, meets most standard criteria.' };
        if (score >= 60) return { label: 'Needs Improvement', desc: 'Notable gaps that might cause early ATS filtering.' };
        return { label: 'High Risk', desc: 'Significant issues. Likely to be automatically filtered out.' };
    };

    return (
        <div className="ats-intelligence-container" style={{ color: 'var(--text-main)' }}>
            <style>{`
                .ats-grid {
                    display: grid;
                    grid-template-columns: 320px 1fr;
                    gap: 2rem;
                }
                @media (max-width: 1024px) {
                    .ats-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .upload-zone {
                    border: 2px dashed var(--border);
                    border-radius: 20px;
                    padding: 3rem 1.5rem;
                    text-align: center;
                    cursor: pointer;
                    background: var(--bg-secondary);
                    transition: all 0.2s ease;
                }
                .upload-zone:hover {
                    border-color: #6366f1;
                    background: rgba(99, 102, 241, 0.02);
                }
                .score-ring {
                    position: relative;
                    width: 160px;
                    height: 160px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .circular-chart {
                    display: block;
                    margin: 10px auto;
                    max-width: 100%;
                    max-height: 100%;
                }
                .circle-bg {
                    fill: none;
                    stroke: var(--border);
                    stroke-width: 3.8;
                }
                .circle {
                    fill: none;
                    stroke-width: 3.8;
                    stroke-linecap: round;
                    transition: stroke-dasharray 1s ease 0s;
                }
                .gauge-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 2.2rem;
                    font-weight: 900;
                }
                .detail-card {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 24px;
                    padding: 2rem;
                    margin-bottom: 2rem;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }
                .timeline-phase {
                    position: relative;
                    padding-left: 2.5rem;
                    margin-bottom: 2rem;
                }
                .timeline-phase::before {
                    content: '';
                    position: absolute;
                    left: 9px;
                    top: 0;
                    bottom: -2rem;
                    width: 2px;
                    background: var(--border);
                }
                .timeline-phase:last-child::before {
                    display: none;
                }
                .timeline-dot {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #6366f1;
                    border: 4px solid var(--bg-secondary);
                    box-shadow: 0 0 0 2px #6366f1;
                }
                .history-item {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 1rem;
                    cursor: pointer;
                    margin-bottom: 0.75rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s;
                }
                .history-item:hover {
                    border-color: #6366f1;
                    transform: translateY(-2px);
                }
                .tag-matched {
                    background: rgba(16, 185, 129, 0.1);
                    color: #10b981;
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }
                .tag-missing {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
                .spinner {
                    border: 4px solid rgba(99, 102, 241, 0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #6366f1;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            <div className="ats-grid">
                {/* Left Panel: Inputs / History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    
                    {/* Control Panel */}
                    <div className="detail-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FiCpu style={{ color: '#6366f1' }} /> Scanner Settings
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                            {/* Job Description TextArea */}
                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>JOB DESCRIPTION</label>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here — AI will match your resume against it precisely..."
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        padding: '12px',
                                        borderRadius: '12px',
                                        border: jobDescription ? '1px solid rgba(99,102,241,0.4)' : '1px solid var(--border)',
                                        background: 'var(--bg-main)',
                                        color: 'var(--text-main)',
                                        fontSize: '0.85rem',
                                        resize: 'vertical',
                                        lineHeight: 1.6,
                                        outline: 'none',
                                        transition: 'border-color 0.2s',
                                        boxSizing: 'border-box'
                                    }}
                                />
                                {!jobDescription && (
                                    <p style={{ fontSize: '0.7rem', color: '#f59e0b', margin: '6px 0 0', lineHeight: 1.4 }}>
                                        ⚠️ Paste a job description to enable precise AI analysis.
                                    </p>
                                )}
                                {jobDescription && (
                                    <p style={{ fontSize: '0.7rem', color: '#10b981', margin: '6px 0 0', lineHeight: 1.4 }}>
                                        ✓ Job description ready — {jobDescription.trim().split(/\s+/).length} words
                                    </p>
                                )}
                            </div>

                            {/* File Upload Zone */}
                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>RESUME FILE</label>
                                {!file ? (
                                    <div 
                                        className="upload-zone"
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        onClick={() => document.getElementById('ats-file-input').click()}
                                    >
                                        <FiUploadCloud style={{ fontSize: '2.5rem', color: '#6366f1', marginBottom: '1rem' }} />
                                        <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 6 }}>Drag & Drop Resume</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Supports PDF, DOCX (Max 5MB)</div>
                                        <input 
                                            id="ats-file-input"
                                            type="file"
                                            accept=".pdf,.docx"
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        background: 'var(--bg-main)',
                                        border: '1px solid var(--border)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                                            <FiFileText style={{ color: '#6366f1', fontSize: '1.2rem', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {file.name}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => setFile(null)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', fontSize: '0.75rem', fontWeight: 700 }}>
                                    <FiAlertTriangle /> {error}
                                </div>
                            )}

                            {/* Trigger Button */}
                            <button
                                onClick={handleAnalyze}
                                disabled={isParsing || isAnalyzing}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: (isParsing || isAnalyzing) ? 'var(--border)' : '#6366f1',
                                    color: '#fff',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    cursor: (isParsing || isAnalyzing) ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 10,
                                    boxShadow: (isParsing || isAnalyzing) ? 'none' : '0 8px 20px rgba(99, 102, 241, 0.25)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FiRefreshCw className={(isParsing || isAnalyzing) ? "spin" : ""} style={{ animation: (isParsing || isAnalyzing) ? "spin 1s linear infinite" : "none" }} />
                                {(isParsing || isAnalyzing) ? "Processing..." : "Analyze Resume"}
                            </button>
                        </div>
                    </div>

                    {/* History Panel */}
                    <div className="detail-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <FiClock style={{ color: '#6366f1' }} /> Scanner History
                        </h3>

                        {loadingHistory ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                                <div className="spinner"></div>
                            </div>
                        ) : history.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)', fontSize: '0.8rem', border: '1px dashed var(--border)', borderRadius: '16px' }}>
                                No past analysis records found.
                            </div>
                        ) : (
                            <div className="custom-scroll" style={{ overflowY: 'auto', maxHeight: '350px', flex: 1 }}>
                                {history.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleLoadHistoryItem(item.id)}
                                        className="history-item"
                                        style={{
                                            borderColor: report?.id === item.id ? '#6366f1' : 'var(--border)',
                                            background: report?.id === item.id ? 'rgba(99, 102, 241, 0.02)' : 'var(--bg-secondary)'
                                        }}
                                    >
                                        <div style={{ minWidth: 0, flex: 1 }}>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                Job Description Analysis
                                            </div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 900, color: getScoreColor(item.ats_score) }}>
                                                {item.ats_score}%
                                            </span>
                                            <button 
                                                onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                                            >
                                                <FiTrash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Results / Splash Loading */}
                <div style={{ minWidth: 0 }}>
                    <AnimatePresence mode="wait">
                        {/* 1. Loading State */}
                        {(isParsing || isAnalyzing) && (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                style={{
                                    height: '100%',
                                    minHeight: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--border)',
                                    padding: '3rem'
                                }}
                            >
                                <div className="spinner" style={{ width: 60, height: 60, borderWidth: 6, marginBottom: '2rem' }}></div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: 8 }}>AI Intelligence Scan in Progress</h3>
                                <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '400px', fontSize: '0.95rem' }}>
                                    {statusMessage || "Parsing your resume document and scanning against target role guidelines..."}
                                </p>
                            </motion.div>
                        )}

                        {/* 2. Welcome State */}
                        {!report && !(isParsing || isAnalyzing) && (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    height: '100%',
                                    minHeight: '500px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '24px',
                                    border: '1px dashed var(--border)',
                                    padding: '3rem',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎯</div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                                    Resume ATS Intelligence Scan
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '500px', margin: '12px auto 2rem', lineHeight: 1.6 }}>
                                    Upload your resume (PDF/DOCX) and compare it against industry standards or a custom Job Description. Find missing skills, formatting issues, and receive a complete AI career improvement roadmap.
                                </p>
                                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        <FiCheckCircle style={{ color: '#10b981' }} /> AI Formatting Audit
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        <FiCheckCircle style={{ color: '#10b981' }} /> Keyword Gap Map
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        <FiCheckCircle style={{ color: '#10b981' }} /> Recruiter Suggestions
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* 3. Detailed Results State */}
                        {report && !(isParsing || isAnalyzing) && (
                            <motion.div
                                key="report"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Top Scores Section */}
                                <div className="detail-card">
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
                                        {/* Radial Gauge */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div className="score-ring">
                                                <svg viewBox="0 0 36 36" className="circular-chart">
                                                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                                    <path 
                                                        className="circle" 
                                                        strokeDasharray={`${report.ats_score}, 100`}
                                                        stroke={getScoreColor(report.ats_score)}
                                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                                    />
                                                </svg>
                                                <div className="gauge-text" style={{ color: getScoreColor(report.ats_score) }}>
                                                    {report.ats_score}%
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginTop: 8 }}>
                                                ATS compatibility score
                                            </div>
                                        </div>

                                        {/* Category Rating Info */}
                                        <div style={{ flex: 1, minWidth: '220px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <span style={{
                                                    fontSize: '1.4rem', 
                                                    fontWeight: 900, 
                                                    color: getScoreColor(report.ats_score)
                                                }}>
                                                    {getScoreCategory(report.ats_score).label}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: 100, fontWeight: 700 }}>
                                                    Job Description Match
                                                </span>
                                            </div>
                                            <p style={{ margin: '8px 0 1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                                {getScoreCategory(report.ats_score).desc}
                                            </p>
                                            
                                            {/* Sub scores progress meters */}
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                {[
                                                    { label: 'Job Match', val: report.job_match_score },
                                                    { label: 'Skill Match', val: report.skill_match_score },
                                                    { label: 'Resume Quality', val: report.resume_quality_score },
                                                    { label: 'Placement Readiness', val: report.placement_readiness_score }
                                                ].map(sub => (
                                                    <div key={sub.label}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 800, marginBottom: 4 }}>
                                                            <span>{sub.label}</span>
                                                            <span>{sub.val}%</span>
                                                        </div>
                                                        <div style={{ height: 6, background: 'var(--border)', borderRadius: 100, overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${sub.val}%`, background: getScoreColor(sub.val), borderRadius: 100 }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Probabilities and Career Outlook Cards */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                                    {[
                                        { label: 'Shortlisting Chance', val: report.shortlisting_probability, icon: <FiTarget style={{ color: '#3b82f6' }} /> },
                                        { label: 'Interview Chance', val: report.interview_probability, icon: <FiUserCheck style={{ color: '#6366f1' }} /> },
                                        { label: 'Placement Chance', val: report.placement_probability, icon: <FiTrendingUp style={{ color: '#10b981' }} /> }
                                    ].map(prob => (
                                        <div key={prob.label} className="detail-card" style={{ padding: '1.25rem 1.5rem', marginBottom: 0, display: 'flex', alignItems: 'center', gap: 15 }}>
                                            <div style={{ width: 45, height: 45, borderRadius: 12, background: 'var(--bg-main)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContext: 'center', fontSize: '1.2rem', justifyContent: 'center' }}>
                                                {prob.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{prob.label}</div>
                                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)', marginTop: 2 }}>{prob.val}%</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Strengths and Weaknesses */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                                    {/* Strengths */}
                                    <div className="detail-card" style={{ marginBottom: 0, borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiCheckCircle /> Profile Strengths
                                        </h4>
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {report.strengths?.map((str, idx) => (
                                                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{str}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* Weaknesses / Formatting */}
                                    <div className="detail-card" style={{ marginBottom: 0, borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiAlertTriangle /> Critical Gaps
                                        </h4>
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {report.weaknesses?.map((wk, idx) => (
                                                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{wk}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Keyword Match Analysis Heatmap */}
                                <div className="detail-card">
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FiGrid style={{ color: '#6366f1' }} /> Keyword Gap Mapping
                                    </h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                                        ATS systems scan keywords to screen candidates. The following checklist marks matched keywords and labels critical missing terms:
                                    </p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                        {report.matched_skills && report.matched_skills.length > 0 && (
                                            <div>
                                                <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>✅ Matched / Detected Skills</h5>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                    {report.matched_skills.map(tag => (
                                                        <span key={tag} className="tag-matched" style={{ padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                                                            ✓ {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {(!report.matched_skills || report.matched_skills.length === 0) && (
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '10px 14px', border: '1px dashed var(--border)', borderRadius: 10 }}>
                                                ℹ️ Matched skills will appear here after a new analysis.
                                            </div>
                                        )}

                                        <div>
                                            <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Missing Skills & Tech</h5>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {report.missing_skills?.map(tag => (
                                                    <span key={tag} className="tag-missing" style={{ padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                                                        + {tag}
                                                    </span>
                                                ))}
                                                {report.missing_technologies?.map(tag => (
                                                    <span key={tag} className="tag-missing" style={{ padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, filter: 'hue-rotate(30deg)' }}>
                                                        + {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Missing General Keywords</h5>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                                {report.missing_keywords?.map(tag => (
                                                    <span key={tag} className="tag-missing" style={{ padding: '5px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, filter: 'hue-rotate(-45deg)' }}>
                                                        + {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ATS Formatting Issues */}
                                {report.ats_formatting_issues && report.ats_formatting_issues.length > 0 && (
                                    <div className="detail-card" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiAlertTriangle /> ATS Scanner Compatibility Audit
                                        </h4>
                                        <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                            {report.ats_formatting_issues.map((issue, idx) => (
                                                <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{issue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Recruiter-Style Feedback */}
                                <div className="detail-card">
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <FiUserCheck style={{ color: '#6366f1' }} /> Recruiter Overview
                                    </h4>
                                    <div style={{ 
                                        padding: '1.5rem', 
                                        background: 'var(--bg-main)', 
                                        borderRadius: '16px', 
                                        border: '1px solid var(--border)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.6,
                                        whiteSpace: 'pre-wrap'
                                    }}>
                                        {report.recruiter_review?.replace(/###\s+/gi, '')}
                                    </div>
                                </div>

                                {/* Rewrite Suggestions */}
                                {report.rewrites && report.rewrites.length > 0 && (
                                    <div className="detail-card">
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <FiFileText style={{ color: '#6366f1' }} /> Resume Rewrite Assistant
                                        </h4>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {report.rewrites.map((rw, idx) => (
                                                <div key={idx} style={{ padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--bg-main)' }}>
                                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>SUGGESTION #{idx + 1}</span>
                                                        <span style={{ color: '#f59e0b' }}>REWRITE DETAILS</span>
                                                    </div>
                                                    
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <div style={{ fontSize: '0.85rem', color: '#ef4444', textDecoration: 'line-through', opacity: 0.8 }}>
                                                            <b>Original:</b> "{rw.before}"
                                                        </div>
                                                        <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>
                                                            <b>Recruiter Version:</b> "{rw.after}"
                                                        </div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 8, marginTop: 4, fontStyle: 'italic' }}>
                                                            <b>Impact Rationale:</b> {rw.reason}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Career Improvement Roadmap */}
                                {report.roadmap && report.roadmap.length > 0 && (
                                    <div className="detail-card">
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <FiBookOpen style={{ color: '#6366f1' }} /> Career Improvement Roadmap
                                        </h4>

                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {report.roadmap.map((phase, idx) => (
                                                <div key={idx} className="timeline-phase">
                                                    <div className="timeline-dot" />
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                                                        <h5 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
                                                            {phase.phase}
                                                        </h5>
                                                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', background: 'rgba(99, 102, 241, 0.08)', padding: '2px 8px', borderRadius: 100 }}>
                                                            {phase.duration}
                                                        </span>
                                                    </div>
                                                    
                                                    <ul style={{ paddingLeft: '1.1rem', margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                                                        {phase.tasks.map((task, taskIdx) => (
                                                            <li key={taskIdx} style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                                {task}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Re-analyze CTA */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                                    <button 
                                        onClick={() => { setReport(null); setFile(null); }}
                                        style={{
                                            padding: '12px 24px',
                                            borderRadius: '12px',
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-main)',
                                            fontWeight: 800,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 8,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <FiArrowLeft /> Scan Another Resume
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ResumeAtsIntelligence;
