import React from 'react';
import { FiUser } from 'react-icons/fi';
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

const TemplateCard = ({ template, onClick }) => {
    const { name, atsFriendly, config } = template;
    const { colors } = config;

    const [scale, setScale] = React.useState(0.28);
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

    const renderMiniA4 = () => {
        return (
            <div style={{
                width: '620px',
                height: '877px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none'
            }}>
                <TemplateEngine data={safeData} config={config} />
            </div>
        );
    };

    return (
        <div 
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '12px',
                gap: '12px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            }}
            className="premium-template-card"
        >
            <style>{`
                .premium-template-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 16px 35px rgba(0, 0, 0, 0.08);
                    border-color: ${colors.primary};
                }
                .premium-template-card:hover .mini-a4-sheet {
                    transform: scale(1.02);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
                }
            `}</style>

            {/* A4 Sheet Container */}
            <div 
                className="mini-a4-sheet"
                ref={containerRef}
                style={{
                    width: '100%',
                    aspectRatio: '1 / 1.414',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                }}
            >
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

            {/* Template Card Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
                <span style={{ 
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.92rem', 
                    fontWeight: 800, 
                    color: 'var(--text-main)',
                    maxWidth: '180px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {name}
                </span>

                <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    background: atsFriendly >= 95 ? 'rgba(16, 185, 129, 0.08)' : 'rgba(99, 102, 241, 0.08)', 
                    color: atsFriendly >= 95 ? '#10b981' : '#6366f1', 
                    fontSize: '0.68rem', 
                    fontWeight: 850,
                    letterSpacing: '0.3px'
                }}>
                    {atsFriendly >= 95 ? 'Top pick' : `ATS ${atsFriendly}%`}
                </span>
            </div>
        </div>
    );
};

export default TemplateCard;
