import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft, FiDownload, FiSave, FiEye, FiSettings, FiCpu,
    FiPlus, FiTrash2, FiMenu, FiMinimize2, FiMaximize2, FiShare2,
    FiFileText, FiLinkedin, FiLayout, FiCheck, FiAlertCircle
} from 'react-icons/fi';
import { RESUME_SECTIONS, FONT_OPTIONS, RESUME_TEMPLATES, COMPANY_RESUME_KEYWORDS } from './resumeTemplates';
import { analyzeResume } from './ResumeAnalyzer';

const ResumeBuilder = ({ template: initialTemplate, sector, onBack }) => {
    // Core State
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('professional_resume_draft');
        return saved ? JSON.parse(saved) : {
            personal: { name: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '' },
            objective: '',
            education: [{ school: '', degree: '', year: '', gpa: '', location: '' }],
            skills: '',
            projects: [{ title: '', desc: '', tech: '', link: '' }],
            experience: [{ company: '', role: '', duration: '', desc: '', location: '' }],
            certifications: [{ name: '', issuer: '', year: '' }],
            achievements: '',
            extra: '',
        };
    });

    const [versions, setVersions] = useState(() => {
        const saved = localStorage.getItem('professional_resume_versions');
        return saved ? JSON.parse(saved) : [];
    });

    const [template, setTemplate] = useState(initialTemplate);
    const [sectionOrder, setSectionOrder] = useState(template.layout.sectionOrder);
    const [zoom, setZoom] = useState(0.8);
    const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'layout' | 'ai-tools'
    const [activeSection, setActiveSection] = useState('personal');
    const [previewMode, setPreviewMode] = useState('standard'); // 'standard' | 'recruiter' | 'dark'
    const [editorView, setEditorView] = useState('resume'); // 'resume' | 'cover-letter' | 'linkedin'
    const [isSaving, setIsSaving] = useState(false);
    const [aiProcessing, setAiProcessing] = useState(false);

    const previewRef = useRef(null);

    // Analysis
    const analysis = useMemo(() => analyzeResume(resumeData, template.company), [resumeData, template]);

    // Auto-save logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSaving(true);
            localStorage.setItem('professional_resume_draft', JSON.stringify(resumeData));

            // Create a version every 5 minutes if data changed significantly
            const now = Date.now();
            const lastVersion = versions[0];
            if (!lastVersion || now - lastVersion.timestamp > 300000) {
                const newVersions = [{ timestamp: now, data: resumeData }, ...versions].slice(0, 10);
                setVersions(newVersions);
                localStorage.setItem('professional_resume_versions', JSON.stringify(newVersions));
            }

            setTimeout(() => setIsSaving(false), 800);
        }, 1000);
        return () => clearTimeout(timer);
    }, [resumeData]);

    // AI Features Logic
    const ALL_KEYWORDS = COMPANY_RESUME_KEYWORDS;

    const generateCoverLetterContent = () => {
        const { personal, experience } = resumeData;
        const currentExp = experience[0] || {};
        return `
Dear Hiring Manager at ${template.company},

I am writing to express my enthusiastic interest in the professional opportunities within your ${sector.label} team. With a background as a ${currentExp.role || 'Professional'} and hands-on experience at ${currentExp.company || 'top-tier firms'}, I have developed a deep understanding of the industry standards that ${template.company} champions.

During my tenure at ${currentExp.company || 'my previous role'}, I was instrumental in driving key initiatives that align with your core values of ${ALL_KEYWORDS[template.company]?.slice(0, 3).join(', ') || 'innovation and excellence'}. My expertise in ${resumeData.skills.split(',').slice(0, 3).join(', ')} makes me a strong candidate to contribute to your ongoing success.

I am particularly drawn to ${template.company} because of your commitment to ${ALL_KEYWORDS[template.company]?.[0] || 'cutting-edge solutions'}. I look forward to the possibility of discussing how my skills and experiences can benefit your team.

Sincerely,
${personal.name || '[Your Name]'}
        `.trim();
    };

    const generateLinkedInContent = () => {
        const { personal, skills, experience } = resumeData;
        const currentExp = experience[0] || {};
        const topSkills = skills.split(',').slice(0, 5).map(s => s.trim()).join(' | ');

        return {
            headline: `${currentExp.role || 'Aspiring Professional'} | ${sector.label} Specialist | ${topSkills}`,
            about: `Passionate ${sector.label} professional with experience in ${skills.split(',').slice(0, 3).join(', ')}. Currently focusing on ${ALL_KEYWORDS[template.company]?.slice(0, 2).join(' and ') || 'industry-leading practices'} at ${currentExp.company || 'scale'}. Proven track record of delivering results and driving impact.`,
            experience: experience.map(exp => ({
                title: exp.role,
                company: exp.company,
                bullet: `Spearheaded ${exp.role} initiatives at ${exp.company}, leveraging ${skills.split(',')[0]} to drive performance.`
            }))
        };
    };

    const [aiContent, setAiContent] = useState({ coverLetter: '', linkedin: null });

    useEffect(() => {
        if (editorView === 'cover-letter') {
            setAiProcessing(true);
            setTimeout(() => {
                setAiContent(prev => ({ ...prev, coverLetter: generateCoverLetterContent() }));
                setAiProcessing(false);
            }, 1000);
        } else if (editorView === 'linkedin') {
            setAiProcessing(true);
            setTimeout(() => {
                setAiContent(prev => ({ ...prev, linkedin: generateLinkedInContent() }));
                setAiProcessing(false);
            }, 1000);
        }
    }, [editorView, resumeData, template, sector]); // Added dependencies for AI content generation

    const handleInputChange = (section, field, value, index = null) => {
        setResumeData(prev => {
            const newData = { ...prev };
            if (index !== null) {
                const arr = [...newData[section]];
                arr[index] = { ...arr[index], [field]: value };
                newData[section] = arr;
            } else if (field) {
                newData[section] = { ...newData[section], [field]: value };
            } else {
                newData[section] = value;
            }
            return newData;
        });
    };

    const addListEntry = (section) => {
        const defaultEntries = {
            education: { school: '', degree: '', year: '', gpa: '', location: '' },
            projects: { title: '', desc: '', tech: '', link: '' },
            experience: { company: '', role: '', duration: '', desc: '', location: '' },
            certifications: { name: '', issuer: '', year: '' }
        };
        handleInputChange(section, null, [...resumeData[section], defaultEntries[section]]);
    };

    const removeListEntry = (section, index) => {
        const arr = [...resumeData[section]];
        arr.splice(index, 1);
        handleInputChange(section, null, arr);
    };

    const handleDownload = (format) => {
        setIsSaving(true);
        if (format === 'pdf') {
            window.print();
        } else {
            const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${resumeData.personal.name || 'Resume'}_v${versions.length}.txt`;
            a.click();
        }
        setTimeout(() => setIsSaving(false), 500);
    };

    const handleShare = () => {
        const shareData = {
            title: 'My Professional Resume',
            text: `Check out my ${template.name} resume generated via Tenshiro!`,
            url: window.location.href
        };
        try {
            navigator.share(shareData);
        } catch (e) {
            alert('Sharing link copied to clipboard!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const styles = {
        mainContainer: {
            display: 'grid',
            gridTemplateColumns: '80px 400px 1fr',
            height: '100vh',
            background: 'var(--bg-main)',
            overflow: 'hidden',
            color: 'var(--text-main)'
        },
        navRail: {
            background: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 0',
            gap: '2.5rem'
        },
        editorPanel: {
            background: 'var(--bg-main)',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        previewPanel: {
            background: '#0f172a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            overflowY: 'auto',
            position: 'relative'
        },
        a4Paper: {
            width: '210mm',
            minHeight: '297mm',
            background: previewMode === 'dark' ? '#1e293b' : '#fff',
            color: previewMode === 'dark' ? '#f1f5f9' : '#1e293b',
            padding: template.layout.margins || '1in',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            fontFamily: template.layout.fontFamily,
            fontSize: template.layout.fontSize || '10.5pt',
            lineHeight: template.layout.lineHeight || '1.4',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative'
        },
        railBtn: (active) => ({
            width: 50,
            height: 50,
            borderRadius: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            background: active ? '#6366f1' : 'transparent',
            color: active ? '#fff' : 'var(--text-muted)',
            border: 'none',
            boxShadow: active ? '0 8px 16px rgba(99, 102, 241, 0.3)' : 'none'
        }),
        strengthMeter: {
            height: 6,
            background: 'rgba(0,0,0,0.05)',
            borderRadius: 10,
            overflow: 'hidden',
            marginTop: 10
        }
    };

    return (
        <div style={styles.mainContainer}>
            <style>{`
                @media print {
                    @page { size: A4; margin: 10mm; }
                    body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    body * { visibility: hidden; }
                    .resume-a4, .resume-a4 * { visibility: visible; }
                    .resume-a4 { 
                        visibility: visible;
                        position: absolute !important; 
                        left: 0 !important; 
                        top: 0 !important; 
                        transform: scale(1) !important; 
                        box-shadow: none !important; 
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        color: black !important;
                        background: white !important;
                    }
                    .resume-section { break-inside: avoid; margin-bottom: 20px; }
                    button, .nav-rail, .sticky-toolbar { display: none !important; }
                }
                .custom-scroll::-webkit-scrollbar { width: 5px; }
                .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
                input, textarea, select { outline: none; transition: all 0.2s; border: 1px solid transparent; }
                input:focus, textarea:focus { border-color: #6366f1 !important; background: rgba(99, 102, 241, 0.05) !important; }
            `}</style>

            {/* 1. Global Navigation Rail */}
            <div style={styles.navRail}>
                <button onClick={onBack} style={{ ...styles.railBtn(false), background: 'var(--bg-main)', border: '1px solid var(--border)' }}><FiArrowLeft /></button>
                <div style={{ height: 1, width: 30, background: 'var(--border)' }} />
                <button onClick={() => setActiveTab('sections')} style={styles.railBtn(activeTab === 'sections')}><FiMenu /></button>
                <button onClick={() => setActiveTab('layout')} style={styles.railBtn(activeTab === 'layout')}><FiLayout /></button>
                <button onClick={() => setActiveTab('ai-tools')} style={styles.railBtn(activeTab === 'ai-tools')}><FiCpu /></button>
                <div style={{ marginTop: 'auto' }} />
                <button onClick={() => setPreviewMode(previewMode === 'dark' ? 'standard' : 'dark')} style={styles.railBtn(previewMode === 'dark')}><FiSettings /></button>
            </div>

            {/* 2. Focused Editor Panel */}
            <div style={styles.editorPanel}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0 }}>Smart Editor</h2>
                        <span style={{ fontSize: '0.7rem', color: '#6366f1', fontWeight: 800, textTransform: 'uppercase' }}>{template.company} • {template.name}</span>
                    </div>
                    {isSaving && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><FiSave style={{ color: '#1A3263' }} /></motion.div>}
                </div>

                <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                    {activeTab === 'sections' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {/* Section Navigation Tabs */}
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                {RESUME_SECTIONS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => setActiveSection(s.id)}
                                        style={{
                                            padding: '8px 14px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700,
                                            border: '1px solid var(--border)',
                                            background: activeSection === s.id ? '#6366f1' : 'var(--bg-secondary)',
                                            color: activeSection === s.id ? '#fff' : 'var(--text-muted)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>

                            {/* Dynamic Section Forms */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeSection}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                >
                                    {activeSection === 'personal' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                                                <div className="input-group">
                                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>FULL NAME</label>
                                                    <input value={resumeData.personal.name} onChange={e => handleInputChange('personal', 'name', e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
                                                </div>
                                                <div className="input-group">
                                                    <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>EMAIL</label>
                                                    <input value={resumeData.personal.email} onChange={e => handleInputChange('personal', 'email', e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
                                                </div>
                                            </div>
                                            <div className="input-group">
                                                <label style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: 5 }}>LINKS (LinkedIn, Portfolio, etc.)</label>
                                                <input value={resumeData.personal.linkedin} onChange={e => handleInputChange('personal', 'linkedin', e.target.value)} placeholder="linkedin.com/in/..." style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)' }} />
                                            </div>
                                        </div>
                                    )}

                                    {activeSection === 'experience' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {resumeData.experience.map((exp, i) => (
                                                <motion.div key={i} layout style={{ padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1' }}>POSITION #{i + 1}</span>
                                                        <FiTrash2 onClick={() => removeListEntry('experience', i)} style={{ cursor: 'pointer', color: '#ef4444' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <input value={exp.company} onChange={e => handleInputChange('experience', 'company', e.target.value, i)} placeholder="Company Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }} />
                                                        <input value={exp.role} onChange={e => handleInputChange('experience', 'role', e.target.value, i)} placeholder="Job Role" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.9rem', color: 'var(--text-main)' }} />
                                                        <textarea value={exp.desc} onChange={e => handleInputChange('experience', 'desc', e.target.value, i)} placeholder="Describe impact and achievements..." style={{ background: 'transparent', border: 'none', minHeight: 100, fontSize: '0.85rem', resize: 'none', color: 'var(--text-main)' }} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <button onClick={() => addListEntry('experience')} style={{ padding: '12px', borderRadius: 12, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}><FiPlus /> Add Work Experience</button>
                                        </div>
                                    )}

                                    {activeSection === 'education' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {resumeData.education.map((edu, i) => (
                                                <motion.div key={i} layout style={{ padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1' }}>EDUCATION #{i + 1}</span>
                                                        <FiTrash2 onClick={() => removeListEntry('education', i)} style={{ cursor: 'pointer', color: '#ef4444' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <input value={edu.school} onChange={e => handleInputChange('education', 'school', e.target.value, i)} placeholder="School / University" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }} />
                                                        <input value={edu.degree} onChange={e => handleInputChange('education', 'degree', e.target.value, i)} placeholder="Degree / Certificate" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.9rem', color: 'var(--text-main)' }} />
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                                            <input value={edu.year} onChange={e => handleInputChange('education', 'year', e.target.value, i)} placeholder="Year" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.85rem', color: 'var(--text-main)' }} />
                                                            <input value={edu.gpa} onChange={e => handleInputChange('education', 'gpa', e.target.value, i)} placeholder="GPA / %" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.85rem', color: 'var(--text-main)' }} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <button onClick={() => addListEntry('education')} style={{ padding: '12px', borderRadius: 12, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}><FiPlus /> Add Education</button>
                                        </div>
                                    )}

                                    {activeSection === 'projects' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {resumeData.projects.map((proj, i) => (
                                                <motion.div key={i} layout style={{ padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1' }}>PROJECT #{i + 1}</span>
                                                        <FiTrash2 onClick={() => removeListEntry('projects', i)} style={{ cursor: 'pointer', color: '#ef4444' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <input value={proj.title} onChange={e => handleInputChange('projects', 'title', e.target.value, i)} placeholder="Project Title" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }} />
                                                        <textarea value={proj.desc} onChange={e => handleInputChange('projects', 'desc', e.target.value, i)} placeholder="Describe the project objective and your role..." style={{ background: 'transparent', border: 'none', minHeight: 80, fontSize: '0.85rem', resize: 'none', color: 'var(--text-main)' }} />
                                                        <input value={proj.tech} onChange={e => handleInputChange('projects', 'tech', e.target.value, i)} placeholder="Technologies used (React, Node, etc.)" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.85rem', color: 'var(--text-main)' }} />
                                                        <input value={proj.link} onChange={e => handleInputChange('projects', 'link', e.target.value, i)} placeholder="Project Link (GitHub / Live)" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.85rem', color: 'var(--text-main)' }} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <button onClick={() => addListEntry('projects')} style={{ padding: '12px', borderRadius: 12, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}><FiPlus /> Add Project</button>
                                        </div>
                                    )}

                                    {activeSection === 'certifications' && (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {resumeData.certifications.map((cert, i) => (
                                                <motion.div key={i} layout style={{ padding: '1.25rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1' }}>CERTIFICATION #{i + 1}</span>
                                                        <FiTrash2 onClick={() => removeListEntry('certifications', i)} style={{ cursor: 'pointer', color: '#ef4444' }} />
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                        <input value={cert.name} onChange={e => handleInputChange('certifications', 'name', e.target.value, i)} placeholder="Certification Name" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '1rem', fontWeight: 800, color: 'var(--text-main)' }} />
                                                        <input value={cert.issuer} onChange={e => handleInputChange('certifications', 'issuer', e.target.value, i)} placeholder="Issuing Organization" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.9rem', color: 'var(--text-main)' }} />
                                                        <input value={cert.year} onChange={e => handleInputChange('certifications', 'year', e.target.value, i)} placeholder="Year" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', padding: '5px 0', fontSize: '0.85rem', color: 'var(--text-main)' }} />
                                                    </div>
                                                </motion.div>
                                            ))}
                                            <button onClick={() => addListEntry('certifications')} style={{ padding: '12px', borderRadius: 12, border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700 }}><FiPlus /> Add Certification</button>
                                        </div>
                                    )}

                                    {/* Default fallback for text areas like Achievements/Objective */}
                                    {['objective', 'achievements', 'skills', 'extra'].includes(activeSection) && (
                                        <div>
                                            <div style={{ marginBottom: 15, padding: '12px', borderRadius: 12, background: 'rgba(99, 102, 241, 0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <FiCpu style={{ color: '#6366f1' }} />
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>AI Tip: Keep this under 200 words for better readability.</span>
                                            </div>
                                            <textarea
                                                value={resumeData[activeSection]}
                                                onChange={e => handleInputChange(activeSection, null, e.target.value)}
                                                placeholder={`Write your ${activeSection} here...`}
                                                style={{ width: '100%', minHeight: 250, padding: 15, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.6 }}
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}

                    {activeTab === 'layout' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 15 }}>Section Reordering</h3>
                                <Reorder.Group axis="y" values={sectionOrder} onReorder={setSectionOrder}>
                                    {sectionOrder.map(sid => (
                                        <Reorder.Item
                                            key={sid}
                                            value={sid}
                                            style={{
                                                padding: '12px 15px', borderRadius: 12, background: 'var(--bg-secondary)',
                                                border: '1px solid var(--border)', marginBottom: 10, cursor: 'grab',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                                <FiMenu style={{ color: 'var(--text-muted)' }} />
                                                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{RESUME_SECTIONS.find(s => s.id === sid)?.label}</span>
                                            </div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            </div>

                            <div>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: 15 }}>Typography</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {FONT_OPTIONS.map(f => (
                                        <button
                                            key={f.value}
                                            onClick={() => setTemplate({ ...template, layout: { ...template.layout, fontFamily: f.value } })}
                                            style={{
                                                padding: '12px', textAlign: 'left', borderRadius: 10, border: '1px solid var(--border)',
                                                background: template.layout.fontFamily === f.value ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                                fontFamily: f.value, cursor: 'pointer'
                                            }}
                                        >
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai-tools' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Strength Meter */}
                            <div style={{ padding: '1.5rem', borderRadius: 20, background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Resume Strength</span>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#6366f1' }}>{analysis.score}%</span>
                                </div>
                                <div style={styles.strengthMeter}>
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${analysis.score}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: '#6366f1' }} />
                                </div>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 15, lineHeight: 1.4 }}>
                                    Matched <b>{analysis.matched.length}</b> keywords from <b>{template.company}</b> standards.
                                </p>
                            </div>

                            <button onClick={() => setEditorView('cover-letter')} style={{ padding: '15px', borderRadius: 14, border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                                <FiFileText /> Generate Cover Letter
                            </button>
                            <button onClick={() => setEditorView('linkedin')} style={{ padding: '15px', borderRadius: 14, border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                                <FiLinkedin /> LinkedIn Optimizer
                            </button>

                            <div style={{ marginTop: '1rem' }}>
                                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: 12 }}>Keyword Optimization</h4>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {analysis.missing.map(k => (
                                        <span key={k} style={{ padding: '5px 12px', borderRadius: 8, background: '#ef444410', color: '#ef4444', border: '1px solid #ef444420', fontSize: '0.75rem', fontWeight: 700 }}>+ {k}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                    <button onClick={() => handleDownload('pdf')} style={{ width: '100%', padding: '1.1rem', borderRadius: 14, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)' }}>
                        <FiDownload /> Export Production PDF
                    </button>
                </div>
            </div>

            {/* 3. Live Preview & Toolbar */}
            <div style={styles.previewPanel}>
                <div className="sticky-toolbar" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 15, alignItems: 'center', marginBottom: 40 }}>
                    <div style={{ display: 'flex', gap: 5 }}>
                        <button onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} style={{ padding: 8, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiMinimize2 /></button>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff', width: 40, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
                        <button onClick={() => setZoom(Math.min(1.2, zoom + 0.1))} style={{ padding: 8, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiMaximize2 /></button>
                    </div>
                    <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
                    <button onClick={() => setPreviewMode('standard')} style={{ background: previewMode === 'standard' ? '#6366f1' : 'transparent', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: '0.7rem', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>A4 PAPER</button>
                    <button onClick={() => setPreviewMode('recruiter')} style={{ background: previewMode === 'recruiter' ? '#6366f1' : 'transparent', border: 'none', padding: '6px 12px', borderRadius: 6, fontSize: '0.7rem', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>RECRUITER VIS</button>
                    <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
                    <FiShare2 style={{ color: '#fff', cursor: 'pointer' }} />
                </div>

                <motion.div
                    layout
                    className="resume-a4"
                    style={styles.a4Paper}
                    ref={previewRef}
                >
                    {/* Real-time Header */}
                    <div style={{ textAlign: template.layout.headerStyle === 'left-aligned' ? 'left' : 'center', marginBottom: '25pt', paddingBottom: 15, borderBottom: '1.5pt solid #334155' }}>
                        <h1 style={{ margin: 0, fontSize: '24pt', fontWeight: 900, textTransform: 'uppercase' }}>{resumeData.personal.name || 'Your Name'}</h1>
                        <div style={{ marginTop: 10, fontSize: '10pt', color: 'var(--text-muted)', display: 'flex', justifyContent: template.layout.headerStyle === 'left-aligned' ? 'flex-start' : 'center', gap: 15, flexWrap: 'wrap' }}>
                            {resumeData.personal.email && <span>{resumeData.personal.email}</span>}
                            {resumeData.personal.phone && <span>{resumeData.personal.phone}</span>}
                            {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                        </div>
                        {resumeData.personal.linkedin && <div style={{ marginTop: 5, fontSize: '9pt', color: '#6366f1', textDecoration: 'underline' }}>{resumeData.personal.linkedin}</div>}
                    </div>

                    {/* Section Mapping based on Reordered State */}
                    {sectionOrder.map(sid => {
                        if (sid === 'personal') return null;
                        const sectionData = resumeData[sid];
                        if (!sectionData || (Array.isArray(sectionData) && sectionData.length === 0) || (typeof sectionData === 'string' && !sectionData)) return null;

                        return (
                            <div key={sid} className="resume-section" style={{ marginBottom: template.layout.sectionSpacing || '15pt' }}>
                                <h3 style={{ fontSize: '12pt', fontWeight: 900, textTransform: 'uppercase', borderBottom: '1pt solid #cbd5e1', paddingBottom: 4, marginBottom: 8 }}>
                                    {RESUME_SECTIONS.find(s => s.id === sid)?.label}
                                </h3>

                                {sid === 'objective' && <p style={{ margin: 0, fontSize: '10pt', whiteSpace: 'pre-wrap' }}>{resumeData.objective}</p>}

                                {sid === 'experience' && resumeData.experience.map((exp, i) => (
                                    <div key={i} style={{ marginBottom: 10 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                                            <span>{exp.company} — {exp.role}</span>
                                            <span style={{ fontSize: '9pt' }}>{exp.duration}</span>
                                        </div>
                                        <p style={{ margin: '3pt 0 0', fontSize: '9.5pt', color: previewMode === 'dark' ? '#cbd5e1' : '#4b5563', whiteSpace: 'pre-wrap' }}>{exp.desc}</p>
                                    </div>
                                ))}

                                {sid === 'education' && resumeData.education.map((edu, i) => (
                                    <div key={i} style={{ marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                                            <span>{edu.school} — {edu.degree}</span>
                                            <span style={{ fontSize: '9pt' }}>{edu.year}</span>
                                        </div>
                                        {edu.gpa && <div style={{ fontSize: '9pt', opacity: 0.8 }}>GPA: {edu.gpa}</div>}
                                    </div>
                                ))}

                                {sid === 'projects' && resumeData.projects.map((proj, i) => (
                                    <div key={i} style={{ marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800 }}>
                                            <span>{proj.title}</span>
                                            {proj.link && <span style={{ fontSize: '8pt', color: '#6366f1' }}>{proj.link}</span>}
                                        </div>
                                        <p style={{ margin: '2pt 0', fontSize: '9.5pt', color: previewMode === 'dark' ? '#cbd5e1' : '#4b5563', whiteSpace: 'pre-wrap' }}>{proj.desc}</p>
                                        {proj.tech && <div style={{ fontSize: '8.5pt', fontStyle: 'italic', opacity: 0.8 }}>Tech Stack: {proj.tech}</div>}
                                    </div>
                                ))}

                                {sid === 'certifications' && resumeData.certifications.map((cert, i) => (
                                    <div key={i} style={{ marginBottom: 6 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                                            <span>{cert.name} — {cert.issuer}</span>
                                            <span style={{ fontSize: '9pt' }}>{cert.year}</span>
                                        </div>
                                    </div>
                                ))}

                                {sid === 'skills' && (
                                    <p style={{ margin: 0, fontSize: '10pt' }}>
                                        <b>Core Competencies:</b> {resumeData.skills}
                                    </p>
                                )}

                                {sid === 'achievements' && <p style={{ margin: 0, fontSize: '10pt', whiteSpace: 'pre-wrap' }}>{resumeData.achievements}</p>}

                                {sid === 'extra' && <p style={{ margin: 0, fontSize: '10pt', whiteSpace: 'pre-wrap' }}>{resumeData.extra}</p>}
                            </div>
                        );
                    })}

                    {/* ATS Footer */}
                    <div style={{ position: 'absolute', bottom: 30, left: 0, right: 0, textAlign: 'center', fontSize: '7pt', opacity: 0.5, borderTop: '0.5pt solid #e2e8f0', paddingTop: 10 }}>
                        Proprietary ATS-Optimized Format for {template.company} Standard Compatibility • Generated by Tenshiro Resume Intelligence v2.0
                    </div>
                </motion.div>
            </div>

            {/* Modal for Cover Letter / LinkedIn */}
            <AnimatePresence>
                {editorView !== 'resume' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', padding: '4rem', display: 'flex', justifyContent: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                            style={{ background: 'var(--bg-main)', width: '100%', maxWidth: 1000, borderRadius: 32, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                        >
                            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                    {editorView === 'cover-letter' ? <FiFileText style={{ fontSize: '2rem', color: '#6366f1' }} /> : <FiLinkedin style={{ fontSize: '2rem', color: '#6366f1' }} />}
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>AI {editorView === 'cover-letter' ? 'Cover Letter' : 'LinkedIn'} Generator</h3>
                                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>Using your resume data to build a matching profile.</p>
                                    </div>
                                </div>
                                <button onClick={() => setEditorView('resume')} style={{ padding: 12, borderRadius: 100, border: 'none', background: 'var(--bg-secondary)', cursor: 'pointer' }}><FiArrowLeft /></button>
                            </div>
                            <div style={{ flex: 1, padding: '3rem', display: 'flex', gap: '3rem' }}>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 20 }}>Generated Profile</h4>
                                    <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 20, minHeight: 400, border: '1px solid var(--border)', lineHeight: 1.6 }}>
                                        {aiProcessing ? (
                                            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}><FiCpu style={{ fontSize: '3rem', color: '#6366f1' }} /></motion.div>
                                                <p style={{ fontWeight: 700 }}>AI is analyzing your profile...</p>
                                            </div>
                                        ) : (
                                            <div style={{ whiteSpace: 'pre-wrap', fontFamily: editorView === 'cover-letter' ? 'serif' : 'inherit' }}>
                                                {editorView === 'cover-letter' ? (
                                                    aiContent.coverLetter
                                                ) : (
                                                    <div>
                                                        <div style={{ marginBottom: 30, padding: 15, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 12 }}>
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', marginBottom: 5 }}>HEADLINE</div>
                                                            <div style={{ fontWeight: 800 }}>{aiContent.linkedin?.headline}</div>
                                                        </div>
                                                        <div style={{ marginBottom: 30 }}>
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', marginBottom: 5 }}>ABOUT</div>
                                                            <p style={{ margin: 0 }}>{aiContent.linkedin?.about}</p>
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', marginBottom: 5 }}>EXPERIENCE HIGHLIGHTS</div>
                                                            {aiContent.linkedin?.experience.map((exp, i) => (
                                                                <div key={i} style={{ marginBottom: 15 }}>
                                                                    <div style={{ fontWeight: 700 }}>{exp.title} at {exp.company}</div>
                                                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{exp.bullet}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ width: 300 }}>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 20 }}>Optimization Tips</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                                        {[1, 2, 3].map(i => (
                                            <div key={i} style={{ display: 'flex', gap: 12 }}>
                                                <FiCheckCircle style={{ color: '#1A3263', marginTop: 4 }} />
                                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Use action verbs like 'Architected' and 'Spearheaded' for impact.</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => { }} style={{ width: '100%', marginTop: '2rem', padding: '1rem', borderRadius: 14, background: '#6366f1', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer' }}>Recalculate AI</button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeBuilder;
