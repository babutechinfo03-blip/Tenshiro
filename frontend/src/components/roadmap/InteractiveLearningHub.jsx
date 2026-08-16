import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaTimes, FaPlay, FaCode, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './InteractiveLearningHub.css';

const InteractiveLearningHub = ({ skill, role, onClose }) => {
    const { token } = useAuth();
    const { language } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [tutorial, setTutorial] = useState(null);
    const [codeContent, setCodeContent] = useState('');
    const [output, setOutput] = useState('');

    useEffect(() => {
        fetchTutorial();
    }, [skill, role]);

    const fetchTutorial = async () => {
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:5000/api/ai/skill-tutorial', 
                { skill, role, language },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setTutorial(res.data);
            setCodeContent(res.data.example_code || '');
        } catch (err) {
            console.error("Failed to fetch tutorial", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRunCode = () => {
        // Simple mock execution based on language mode
        if (!tutorial) return;
        
        if (tutorial.language_mode === 'javascript' || tutorial.language_mode === 'js') {
            try {
                // Capture console.log
                let logs = [];
                const originalLog = console.log;
                console.log = (...args) => logs.push(args.join(' '));
                
                // Extremely basic sandbox eval (only for demo purposes)
                new Function(codeContent)();
                
                console.log = originalLog;
                setOutput(logs.join('\n') || 'Execution complete. No output.');
            } catch (error) {
                setOutput(`Error: ${error.message}`);
            }
        } else if (tutorial.language_mode === 'html') {
            setOutput('HTML Preview updating...');
        } else {
            // For other languages like Python, Java without a backend compiler
            setOutput(`Simulated Output for ${tutorial.language_mode}:\nRunning code...\nCode executed successfully.`);
        }
    };

    return (
        <div className="learning-hub-overlay">
            <div className="learning-hub-container">
                {/* Header */}
                <div className="learning-hub-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="hub-logo">
                            <FaCode size={20} color="var(--primary)" />
                        </div>
                        <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
                            {skill} <span style={{ fontWeight: 400, opacity: 0.7 }}>Masterclass</span>
                        </h2>
                    </div>
                    <button className="hub-close-btn" onClick={onClose}><FaTimes size={20} /></button>
                </div>

                {/* Body */}
                <div className="learning-hub-body">
                    {loading ? (
                        <div className="hub-loading-state">
                            <div className="loader">Preparing interactive environment...</div>
                        </div>
                    ) : tutorial ? (
                        <>
                            {/* Left Pane - Theory */}
                            <div className="hub-theory-pane">
                                <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>{tutorial.title}</h1>
                                
                                <div className="markdown-content">
                                    <ReactMarkdown>{tutorial.theory}</ReactMarkdown>
                                </div>
                                
                                <div className="practice-prompt-box">
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>
                                        <FaCheckCircle /> Challenge
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{tutorial.practice_prompt}</p>
                                </div>
                            </div>

                            {/* Right Pane - Try It Yourself (W3Schools style) */}
                            <div className="hub-editor-pane">
                                <div className="editor-header">
                                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Try it Yourself</span>
                                    <button className="run-btn" onClick={handleRunCode}>
                                        <FaPlay size={12} /> Run Code
                                    </button>
                                </div>
                                <div className="editor-container">
                                    <textarea 
                                        className="code-editor"
                                        value={codeContent}
                                        onChange={(e) => setCodeContent(e.target.value)}
                                        spellCheck="false"
                                    />
                                </div>
                                
                                {tutorial.language_mode === 'html' ? (
                                    <div className="output-container">
                                        <div className="output-header">Result Preview</div>
                                        <div className="html-preview-box" dangerouslySetInnerHTML={{ __html: codeContent }}></div>
                                    </div>
                                ) : (
                                    <div className="output-container">
                                        <div className="output-header">Console Output</div>
                                        <pre className="console-output">{output}</pre>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="hub-error-state">Failed to load tutorial.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractiveLearningHub;
