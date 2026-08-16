import React, { useState } from 'react';
import { FiX, FiCheck, FiCpu, FiStar, FiDownload, FiLayers } from 'react-icons/fi';
import TemplateEngine from './TemplateEngine';

const safeData = {
    personal: {
        name: 'John Doe',
        title: 'Software Developer',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        location: 'Chennai, India',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        website: 'johndoe.dev'
    },
    objective: 'Dedicated software engineer with hands-on experience designing, building, and deploying scalable web apps and relational databases.',
    skills: 'React, Node.js, JavaScript, SQL, Python, Git, Docker',
    experience: [
        { role: 'Software Engineer', company: 'Tech Solutions Inc', duration: '2024 - Present', desc: '- Optimized SQL query schemas and improved latency.\n- Collaborated on microservice integrations.', location: 'Chennai, India' },
        { role: 'Developer Intern', company: 'Global Apps Corp', duration: '2023 - 2024', desc: '- Developed responsive layout forms and workflows.\n- Refactored user interface controls.', location: 'Bangalore, India' }
    ],
    projects: [
        { title: 'Platform Redesign', tech: 'React, Node, SQL', desc: '- Rebuilt dashboards into fluid interfaces.\n- Enabled security authorization.', link: 'github.com/johndoe/platform' },
        { title: 'Database Migrator', tech: 'Node, Python', desc: '- Programmed automated ETL scripts.', link: 'github.com/johndoe/migrator' }
    ],
    education: [
        { degree: 'B.S. Computer Science', school: 'Global University', year: '2020 - 2024', gpa: '9.2 CGPA', location: 'Chennai, India' }
    ],
    certifications: [
        { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' }
    ],
    achievements: '- Top 5% in National Hackathon\n- Published research paper on cloud scaling heuristics',
    extra: 'Active contributor to open-source software.'
};

const TemplatePreviewModal = ({ template, onClose, onUse }) => {
    if (!template) return null;

    const { name, category, atsFriendly, downloads, popularity, recommendedFor, industry, config } = template;
    const { layout, colors, fonts, headerStyle, sectionSpacing } = config;
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(0.5);
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = entry.contentRect.width;
                if (width > 0) {
                    setScale(width / 620);
                }
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const modalStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem',
            animation: 'fadeIn 0.25s ease-out',
        },
        content: {
            background: 'var(--bg-main)',
            width: '100%',
            maxWidth: '960px',
            height: '85vh',
            borderRadius: '28px',
            border: '1px solid var(--border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        previewColumn: {
            background: '#0f172a',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRight: '1px solid var(--border)',
        },
        infoColumn: {
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
            background: 'var(--bg-main)',
            overflowY: 'hidden',
        },
        mockA4Paper: {
            width: '100%',
            aspectRatio: '1 / 1.414',
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative'
        },
        metaItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: 'var(--bg-secondary)',
            padding: '10px 14px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
        },
        metaTitle: {
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
        },
        metaValue: {
            fontSize: '0.95rem',
            color: 'var(--text-main)',
            fontWeight: 800,
        }
    };

    const renderMiniA4 = () => {
        const translateY = page === 2 ? -877 : 0;
        return (
            <div style={{
                width: '620px',
                height: '877px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: `${translateY * scale}px`,
                left: 0,
                pointerEvents: 'none',
                transition: 'top 0.3s ease-in-out'
            }}>
                <TemplateEngine data={safeData} config={config} />
            </div>
        );
    };

    return (
        <div style={modalStyles.overlay}>
            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
            
            <div style={modalStyles.content}>
                {/* Left side preview */}
                <div style={modalStyles.previewColumn}>
                    {/* Header Controls */}
                    <div style={{ display: 'flex', gap: '10px', position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                        <button 
                            onClick={() => setPage(1)} 
                            style={{ 
                                padding: '6px 12px', 
                                border: 'none', 
                                background: page === 1 ? '#6366f1' : 'rgba(255,255,255,0.08)', 
                                color: '#fff', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 800
                            }}
                        >
                            Page 1
                        </button>
                        <button 
                            onClick={() => setPage(2)} 
                            style={{ 
                                padding: '6px 12px', 
                                border: 'none', 
                                background: page === 2 ? '#6366f1' : 'rgba(255,255,255,0.08)', 
                                color: '#fff', 
                                borderRadius: '8px', 
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 800
                            }}
                        >
                            Page 2
                        </button>
                    </div>

                    {/* Main schematic page preview */}
                    <div style={{ width: '95%', maxWidth: '430px', transform: 'scale(1.02)', aspectRatio: '1 / 1.414', position: 'relative' }}>
                        <div ref={containerRef} style={modalStyles.mockA4Paper}>
                            {template.thumbnailUrl ? (
                                <img 
                                    src={template.thumbnailUrl} 
                                    alt={name} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                            ) : (
                                renderMiniA4()
                            )}
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FiLayers /> Simulated design wireframe preview
                    </div>
                </div>

                {/* Right side information */}
                <div style={modalStyles.infoColumn}>
                    {/* Fixed Title & Close Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div>
                            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>{name}</h2>
                            <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontWeight: 600 }}>{category} Template Layout</p>
                        </div>
                        <button 
                            onClick={onClose} 
                            style={{ 
                                width: '36px', 
                                height: '36px', 
                                borderRadius: '50%', 
                                border: '1px solid var(--border)', 
                                background: 'var(--bg-secondary)', 
                                color: 'var(--text-main)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
                        >
                            <FiX size={18} />
                        </button>
                    </div>

                    <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '0 0 1.25rem 0' }} />

                    {/* Scrollable middle container */}
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingRight: '4px', marginBottom: '1rem' }} className="custom-scroll">
                        {/* Features checklist */}
                        <div>
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>Design Highlights</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}><FiCheck style={{ color: '#10b981' }} /> ATS Friendly Parser-Safe</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}><FiCheck style={{ color: '#10b981' }} /> Responsive Page-Break handling</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}><FiCheck style={{ color: '#10b981' }} /> {layout === 'timeline' ? 'Timeline structure' : layout === 'standard' ? 'Standard header' : 'Sidebar layout'}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}><FiCheck style={{ color: '#10b981' }} /> Dynamic color accents</div>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div style={modalStyles.metaItem}>
                                <span style={modalStyles.metaTitle}>ATS Rating</span>
                                <span style={{ ...modalStyles.metaValue, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}><FiCpu /> {atsFriendly}% Score</span>
                            </div>
                            <div style={modalStyles.metaItem}>
                                <span style={modalStyles.metaTitle}>Popularity</span>
                                <span style={{ ...modalStyles.metaValue, color: '#eab308', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}><FiStar style={{ fill: '#eab308' }} /> {popularity} / 5.0</span>
                            </div>
                            <div style={modalStyles.metaItem}>
                                <span style={modalStyles.metaTitle}>Recommended for</span>
                                <span style={{ ...modalStyles.metaValue, fontSize: '0.9rem' }}>{recommendedFor}</span>
                            </div>
                            <div style={modalStyles.metaItem}>
                                <span style={modalStyles.metaTitle}>Target Industry</span>
                                <span style={{ ...modalStyles.metaValue, fontSize: '0.9rem' }}>{industry}</span>
                            </div>
                        </div>
                    </div>

                    {/* Fixed Footer at the bottom */}
                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><FiDownload /> {downloads.toLocaleString()} used this month</span>
                            <span style={{ fontStyle: 'italic' }}>Fonts: {fonts.header.replace(/['\,]/g, '')} & {fonts.body.replace(/['\,]/g, '')}</span>
                        </div>

                        <button 
                            onClick={() => onUse(template)}
                            style={{ 
                                width: '100%', 
                                padding: '1rem', 
                                border: 'none', 
                                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', 
                                color: '#fff', 
                                borderRadius: '14px', 
                                fontSize: '1rem', 
                                fontWeight: 900, 
                                cursor: 'pointer',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                gap: '8px',
                                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(99, 102, 241, 0.4)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.3)'; }}
                        >
                            Use This Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplatePreviewModal;
