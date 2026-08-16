import React from 'react';
import { 
    FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiGlobe, 
    FiAward, FiBookOpen, FiBriefcase, FiCompass, FiTarget, FiUser 
} from 'react-icons/fi';

const TemplateEngine = ({ data, config }) => {
    const { fonts, colors, layout, headerStyle, sectionSpacing } = config;

    // Default fallback state data matching profile template variables
    const safeData = {
        personal: {
            name: data?.personal?.name || 'Your Name',
            title: data?.personal?.title || 'Professional Title',
            email: data?.personal?.email || 'email@example.com',
            phone: data?.personal?.phone || '+123 456 7890',
            location: data?.personal?.location || 'Location, Country',
            linkedin: data?.personal?.linkedin || 'linkedin.com/in/username',
            github: data?.personal?.github || 'github.com/username',
            website: data?.personal?.website || 'portfolio.dev',
            photo: data?.personal?.photo || '' // base64 or placeholder image
        },
        objective: data?.objective || 'A highly motivated and goal-oriented professional seeking to deliver innovative solutions and drive impact.',
        skills: data?.skills || 'React, Node.js, JavaScript, Python, Express, SQL, Git',
        education: data?.education || [
            { school: 'Global University', degree: 'B.S. Computer Science', year: '2020 - 2024', gpa: '3.9 GPA', location: 'City' }
        ],
        projects: data?.projects || [
            { title: 'Project Innovation', desc: '- Developed key microservice integrations.\n- Reduced latency by 20% using advanced caching systems.', tech: 'React, Node.js', link: 'github.com/username/project' }
        ],
        experience: data?.experience || [
            { company: 'Tech Solutions Inc', role: 'Software Engineer', duration: '2024 - Present', desc: '- Led product optimization phases.\n- Mentored junior engineers.', location: 'San Francisco, CA' }
        ],
        certifications: data?.certifications || [
            { name: 'Cloud Developer Associate', issuer: 'Amazon Web Services', year: '2024' }
        ],
        achievements: data?.achievements || '- Awarded Best Innovator of the Year 2024\n- Won First Place in National Hackathon',
        extra: data?.extra || 'Active contributor to open-source software.'
    };

    // Styling helpers
    const getSpacing = () => sectionSpacing === 'spacious' ? '2rem' : '1.2rem';

    const renderBullets = (text, bulletStyle = {}) => {
        if (!text) return null;
        const bullets = text.split('\n').filter(b => b.trim());
        return (
            <ul style={{ margin: '6px 0 0 0', paddingLeft: '1.2rem', color: colors.text, fontSize: '0.88rem', lineHeight: 1.5, ...bulletStyle }}>
                {bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                        {b.replace(/^[-\*]\s*/, '')}
                    </li>
                ))}
            </ul>
        );
    };

    // Helper: Render profile photo or a beautiful vector avatar if not loaded
    const renderProfilePhoto = (size = '90px', borderRadius = '50%', defaultIcon = <FiUser />) => {
        if (safeData.personal.photo) {
            return (
                <img 
                    src={safeData.personal.photo} 
                    alt={safeData.personal.name} 
                    style={{
                        width: size,
                        height: size,
                        borderRadius: borderRadius,
                        objectFit: 'cover',
                        border: `2px solid ${colors.primary}`,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }} 
                />
            );
        }

        // Render stylish SVG fallback avatar
        return (
            <div style={{
                width: size,
                height: size,
                borderRadius: borderRadius,
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: `calc(${size} / 2.2)`,
                border: `2px solid ${colors.primary}`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
                {defaultIcon}
            </div>
        );
    };

    // 1. AltaCV Template Renderer
    const renderAltaCV = () => {
        const renderPieChart = () => {
            // Circumference of r=15.9155 is exactly 100, which maps directly to percentages
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '10px' }}>
                    <svg width="110" height="110" viewBox="0 0 32 32" style={{ transform: 'rotate(-90deg)', borderRadius: '50%', boxShadow: '0 4px 8px rgba(0,0,0,0.06)' }}>
                        {/* 35% Work */}
                        <circle r="15.9155" cx="16" cy="16" fill="transparent" stroke={colors.primary} strokeWidth="32" strokeDasharray="35 100" strokeDashoffset="0" />
                        {/* 30% Sleep */}
                        <circle r="15.9155" cx="16" cy="16" fill="transparent" stroke={colors.secondary} strokeWidth="32" strokeDasharray="30 100" strokeDashoffset="-35" />
                        {/* 15% Family */}
                        <circle r="15.9155" cx="16" cy="16" fill="transparent" stroke={colors.accent} strokeWidth="32" strokeDasharray="15 100" strokeDashoffset="-65" />
                        {/* 10% Hobbies */}
                        <circle r="15.9155" cx="16" cy="16" fill="transparent" stroke="#f97316" strokeWidth="32" strokeDasharray="10 100" strokeDashoffset="-80" />
                        {/* 10% Relaxation */}
                        <circle r="15.9155" cx="16" cy="16" fill="transparent" stroke="#10b981" strokeWidth="32" strokeDasharray="10 100" strokeDashoffset="-90" />
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem', fontWeight: 650 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: colors.primary, borderRadius: '2px' }} /> Work & Development (35%)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: colors.secondary, borderRadius: '2px' }} /> Sleep & Relax (30%)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: colors.accent, borderRadius: '2px' }} /> Family & Friends (15%)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: '#f97316', borderRadius: '2px' }} /> Hobbies & Tech (10%)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '2px' }} /> Coffee & Music (10%)</div>
                    </div>
                </div>
            );
        };

        const renderLanguageDots = (name, score) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{name}</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map(dot => (
                        <div 
                            key={dot} 
                            style={{ 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                background: dot <= score ? colors.primary : '#e2e8f0' 
                            }} 
                        />
                    ))}
                </div>
            </div>
        );

        return (
            <div style={{ padding: '2rem' }}>
                {/* AltaCV Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '1.25rem', marginBottom: getSpacing() }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '2.4rem', margin: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {safeData.personal.name}
                        </h1>
                        <h3 style={{ fontFamily: fonts.header, color: colors.secondary, fontSize: '1.1rem', margin: '4px 0 10px 0', fontWeight: 700 }}>
                            {safeData.personal.title}
                        </h3>
                        {/* Compact Contact Icons Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '0.8rem', color: colors.text }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiMail style={{ color: colors.primary }} /> {safeData.personal.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiPhone style={{ color: colors.primary }} /> {safeData.personal.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiMapPin style={{ color: colors.primary }} /> {safeData.personal.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiLinkedin style={{ color: colors.primary }} /> {safeData.personal.linkedin}</div>
                        </div>
                    </div>
                    <div>
                        {renderProfilePhoto('95px', '50%', <FiUser />)}
                    </div>
                </div>

                {/* AltaCV Two-Columns Split */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
                    
                    {/* Left Column (Primary Info) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                        
                        {/* Experience */}
                        {safeData.experience.length > 0 && (
                            <div>
                                <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                    Experience
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {safeData.experience.map((exp, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 750, fontSize: '0.92rem' }}>
                                                <span style={{ color: colors.secondary }}>{exp.role}</span>
                                                <span style={{ fontSize: '0.82rem', color: colors.text, fontWeight: 500 }}>{exp.duration}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: colors.text, margin: '2px 0 4px 0' }}>
                                                <span>{exp.company}</span>
                                                <span style={{ fontWeight: 400, fontSize: '0.8rem' }}>{exp.location}</span>
                                            </div>
                                            {renderBullets(exp.desc)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {safeData.projects.length > 0 && (
                            <div>
                                <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                    Key Projects
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {safeData.projects.map((proj, i) => (
                                        <div key={i}>
                                            <h3 style={{ fontSize: '0.9rem', fontWeight: 750, color: colors.secondary, margin: 0 }}>
                                                {proj.title}
                                            </h3>
                                            <span style={{ fontSize: '0.78rem', color: colors.primary, fontStyle: 'italic', fontWeight: 600 }}>Tech: {proj.tech}</span>
                                            {renderBullets(proj.desc)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* "A Day of My Life" Pie Chart Section */}
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                A Day of My Life
                            </h2>
                            {renderPieChart()}
                        </div>

                    </div>

                    {/* Right Column (Secondary Info / Meta) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                        
                        {/* Philosophy Box */}
                        <div style={{ background: `${colors.primary}08`, borderLeft: `4px solid ${colors.primary}`, padding: '12px', borderRadius: '4px' }}>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.8rem', textTransform: 'uppercase', color: colors.primary, fontWeight: 800, letterSpacing: '0.5px' }}>My Life Philosophy</h4>
                            <p style={{ margin: 0, fontSize: '0.82rem', fontStyle: 'italic', color: colors.text, lineHeight: 1.4 }}>
                                "{safeData.objective}"
                            </p>
                        </div>

                        {/* Most Proud Of (Achievements) */}
                        {safeData.achievements && (
                            <div>
                                <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                    Most Proud Of
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {safeData.achievements.split('\n').filter(a => a.trim()).map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                            <FiTarget style={{ color: colors.primary, marginTop: '3px', flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.82rem', color: colors.text, lineHeight: 1.3 }}>{item.replace(/^[-\*]\s*/, '')}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Strengths / Skills Pills */}
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                Strengths
                            </h2>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {safeData.skills.split(',').map((skill, idx) => (
                                    <span key={idx} style={{ padding: '4px 10px', borderRadius: '6px', background: `${colors.primary}12`, color: colors.primary, fontSize: '0.78rem', fontWeight: 750 }}>
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Languages Dots */}
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                Languages
                            </h2>
                            {renderLanguageDots('English', 5)}
                            {renderLanguageDots('Spanish', 4)}
                            {renderLanguageDots('German', 2)}
                        </div>

                        {/* Education */}
                        {safeData.education.length > 0 && (
                            <div>
                                <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.15rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '4px', marginBottom: '10px' }}>
                                    Education
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {safeData.education.map((edu, i) => (
                                        <div key={i} style={{ fontSize: '0.85rem' }}>
                                            <div style={{ fontWeight: 750, color: colors.secondary }}>{edu.degree}</div>
                                            <div style={{ color: colors.text, fontWeight: 500, fontSize: '0.8rem', margin: '2px 0' }}>{edu.school}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'gray' }}>
                                                <span>{edu.year}</span>
                                                {edu.gpa && <span>GPA: {edu.gpa}</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>

            </div>
        );
    };

    // 2. Simple Hipster CV Template Renderer
    const renderHipsterCV = () => {
        // Parses skills string to render skill percentage bars
        const renderSkillBars = () => {
            const skillList = safeData.skills.split(',').slice(0, 5).map(s => s.trim());
            const levels = [90, 80, 85, 70, 75]; // default progress bars mock levels
            return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {skillList.map((skill, i) => {
                        const level = levels[i % levels.length];
                        return (
                            <div key={i}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: colors.text, marginBottom: '2px' }}>
                                    <span>{skill}</span>
                                    <span>{level}%</span>
                                </div>
                                <div style={{ width: '100%', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${level}%`, height: '100%', background: colors.primary, borderRadius: '3px' }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        };

        return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', minHeight: '100%', gap: '1.5rem', background: '#f8fafc' }}>
                
                {/* Left Hipster Sidebar */}
                <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '2rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                    
                    {/* Centered Profile Image */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {renderProfilePhoto('110px', '50%', <FiUser />)}
                    </div>

                    {/* Sidebar: About Me */}
                    <div>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px', marginBottom: '8px', color: '#fff' }}>
                            About Me
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                            {safeData.objective}
                        </p>
                    </div>

                    {/* Sidebar: Contact details */}
                    <div>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px', marginBottom: '8px', color: '#fff' }}>
                            Contact
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiMail style={{ color: colors.accent }} /> {safeData.personal.email}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiPhone style={{ color: colors.accent }} /> {safeData.personal.phone}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiMapPin style={{ color: colors.accent }} /> {safeData.personal.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiLinkedin style={{ color: colors.accent }} /> {safeData.personal.linkedin}</div>
                            {safeData.personal.github && <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiGithub style={{ color: colors.accent }} /> {safeData.personal.github}</div>}
                        </div>
                    </div>

                    {/* Sidebar: Areas of Specialisation */}
                    <div>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '6px', marginBottom: '8px', color: '#fff' }}>
                            Core Stack
                        </h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {safeData.skills.split(',').slice(0, 6).map((skill, idx) => (
                                <span key={idx} style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', color: '#e2e8f0', fontSize: '0.7rem', fontWeight: 650 }}>
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Hipster Content Column */}
                <div style={{ padding: '2rem 2rem 2rem 0', display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                    
                    {/* Header */}
                    <div>
                        <h1 style={{ fontFamily: fonts.header, fontSize: '2.5rem', fontWeight: 900, color: colors.primary, margin: 0, textTransform: 'uppercase' }}>
                            {safeData.personal.name}
                        </h1>
                        <p style={{ fontSize: '1.05rem', fontWeight: 650, color: colors.secondary, margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {safeData.personal.title}
                        </p>
                    </div>

                    {/* Experience (Short Resume) */}
                    {safeData.experience.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 850, textTransform: 'uppercase', borderBottom: `1.5px solid ${colors.primary}`, paddingBottom: '4px', marginBottom: '10px' }}>
                                Employment History
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {safeData.experience.map((exp, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.9rem' }}>
                                            <span style={{ color: colors.secondary }}>{exp.role} @ {exp.company}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'gray', fontWeight: 500 }}>{exp.duration}</span>
                                        </div>
                                        {renderBullets(exp.desc)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education (Degrees) */}
                    {safeData.education.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 850, textTransform: 'uppercase', borderBottom: `1.5px solid ${colors.primary}`, paddingBottom: '4px', marginBottom: '10px' }}>
                                Degrees
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {safeData.education.map((edu, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.88rem' }}>
                                        <div>
                                            <strong style={{ color: colors.secondary }}>{edu.degree}</strong>
                                            <span style={{ color: colors.text }}> — {edu.school}</span>
                                        </div>
                                        <span style={{ fontSize: '0.78rem', color: 'gray' }}>{edu.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Programming Skills Progress Bars */}
                    <div>
                        <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 850, textTransform: 'uppercase', borderBottom: `1.5px solid ${colors.primary}`, paddingBottom: '4px', marginBottom: '10px' }}>
                            Programming Proficiency
                        </h2>
                        {renderSkillBars()}
                    </div>

                    {/* Certificates & Grants */}
                    {safeData.certifications.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 850, textTransform: 'uppercase', borderBottom: `1.5px solid ${colors.primary}`, paddingBottom: '4px', marginBottom: '10px' }}>
                                Certificates & Awards
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {safeData.certifications.map((cert, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                        <div><strong style={{ color: colors.secondary }}>{cert.name}</strong> — {cert.issuer}</div>
                                        <span style={{ fontSize: '0.78rem', color: 'gray' }}>{cert.year}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

            </div>
        );
    };

    // 3. Customised CurVe CV Template (Academic Style)
    const renderCurveCV = () => {
        return (
            <div style={{ padding: '2.5rem', background: '#ffffff', color: '#1e293b' }}>
                {/* Academic Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #cbd5e1', paddingBottom: '1.5rem', marginBottom: getSpacing() }}>
                    <div>
                        <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '2.2rem', margin: 0, fontWeight: 700 }}>
                            {safeData.personal.name}, Ph.D.
                        </h1>
                        <p style={{ margin: '4px 0 10px 0', fontSize: '1rem', fontStyle: 'italic', color: colors.secondary }}>
                            {safeData.personal.title}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.8rem', color: colors.text, marginTop: '8px' }}>
                            <span>{safeData.personal.email}</span>
                            <span>• {safeData.personal.phone}</span>
                            <span>• {safeData.personal.location}</span>
                            {safeData.personal.website && <span>• {safeData.personal.website}</span>}
                        </div>
                    </div>
                    <div>
                        {renderProfilePhoto('80px', '8px', <FiUser />)}
                    </div>
                </div>

                {/* CV Body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                    
                    {/* Employment History (academic-style timeline grid) */}
                    {safeData.experience.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '2px', marginBottom: '14px' }}>
                                Employment History
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {safeData.experience.map((exp, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.secondary }}>{exp.duration}</div>
                                        <div>
                                            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{exp.role}</strong>
                                            <div style={{ fontSize: '0.85rem', color: colors.text, fontStyle: 'italic', margin: '2px 0 6px 0' }}>{exp.company}, {exp.location}</div>
                                            {renderBullets(exp.desc, { paddingLeft: '1rem' })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {safeData.education.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '2px', marginBottom: '14px' }}>
                                Education
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {safeData.education.map((edu, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.secondary }}>{edu.year}</div>
                                        <div>
                                            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{edu.degree}</strong>
                                            <div style={{ fontSize: '0.85rem', color: colors.text, margin: '2px 0' }}>{edu.school}, {edu.location}</div>
                                            {edu.gpa && <div style={{ fontSize: '0.8rem', color: 'gray' }}>Performance Index: {edu.gpa}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Research Publications (Projects mapped to Publications) */}
                    <div>
                        <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '2px', marginBottom: '14px' }}>
                            Research & Publications
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {safeData.projects.map((proj, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.88rem' }}>
                                    <span style={{ color: colors.primary, fontWeight: 900 }}>•</span>
                                    <div>
                                        <strong>{safeData.personal.name}</strong>, et al. "{proj.title}." 
                                        <span style={{ fontStyle: 'italic', color: colors.secondary }}> Developed using {proj.tech}.</span>
                                        {proj.desc && <div style={{ fontSize: '0.8rem', color: 'gray', marginTop: '2px' }}>{proj.desc.replace(/^[-\*]\s*/, '')}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    {safeData.certifications.length > 0 && (
                        <div>
                            <h2 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '2px', marginBottom: '14px' }}>
                                Certifications & Honors
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {safeData.certifications.map((cert, i) => (
                                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', fontSize: '0.88rem' }}>
                                        <div style={{ fontWeight: 700, color: colors.secondary }}>{cert.year}</div>
                                        <div><strong>{cert.name}</strong> — {cert.issuer}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        );
    };

    // 4. Timeline Layout Renderer
    const renderTimeline = () => {
        const itemStyle = {
            display: 'grid',
            gridTemplateColumns: '120px 30px 1fr',
            marginBottom: '1.2rem',
            position: 'relative'
        };

        const dotStyle = {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: colors.primary,
            border: `2px solid ${colors.bg}`,
            position: 'absolute',
            left: '125px',
            top: '4px',
            zIndex: 2,
            boxShadow: '0 0 0 3px ' + colors.primary + '20'
        };

        const lineStyle = {
            position: 'absolute',
            left: '129px',
            top: '12px',
            bottom: '-20px',
            width: '2px',
            background: `${colors.primary}30`,
            zIndex: 1
        };

        return (
            <div style={{ padding: '2.5rem' }}>
                <Header />
                <ObjectiveSection />
                
                {/* Experience Timeline */}
                {safeData.experience.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Experience" />
                        <div style={{ position: 'relative', marginTop: '1rem' }}>
                            {safeData.experience.map((exp, i) => (
                                <div key={i} style={itemStyle}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.secondary, textAlign: 'right', paddingTop: '2px', paddingRight: '10px' }}>
                                        {exp.duration}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={dotStyle} />
                                        {i < safeData.experience.length - 1 && <div style={lineStyle} />}
                                    </div>
                                    <div style={{ paddingLeft: '8px' }}>
                                        <h3 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.02rem', margin: 0, fontWeight: 700 }}>
                                            {exp.role}
                                        </h3>
                                        <div style={{ fontFamily: fonts.body, color: colors.text, fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>
                                            {exp.company} — <span style={{ fontWeight: 400, fontSize: '0.8rem', fontStyle: 'italic' }}>{exp.location}</span>
                                        </div>
                                        {renderBullets(exp.desc)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education Timeline */}
                {safeData.education.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Education" />
                        <div style={{ position: 'relative', marginTop: '1rem' }}>
                            {safeData.education.map((edu, i) => (
                                <div key={i} style={itemStyle}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.secondary, textAlign: 'right', paddingTop: '2px', paddingRight: '10px' }}>
                                        {edu.year}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={dotStyle} />
                                        {i < safeData.education.length - 1 && <div style={lineStyle} />}
                                    </div>
                                    <div style={{ paddingLeft: '8px' }}>
                                        <h3 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                                            {edu.degree}
                                        </h3>
                                        <div style={{ fontFamily: fonts.body, color: colors.text, fontSize: '0.85rem', marginTop: '2px' }}>
                                            {edu.school} {edu.gpa && <span>(GPA: {edu.gpa})</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects Timeline */}
                {safeData.projects.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Projects" />
                        <div style={{ position: 'relative', marginTop: '1rem' }}>
                            {safeData.projects.map((proj, i) => (
                                <div key={i} style={itemStyle}>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: colors.secondary, textAlign: 'right', paddingTop: '2px', paddingRight: '10px' }}>
                                        {proj.tech ? proj.tech.split(',')[0].trim() : 'Project'}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div style={dotStyle} />
                                        {i < safeData.projects.length - 1 && <div style={lineStyle} />}
                                    </div>
                                    <div style={{ paddingLeft: '8px' }}>
                                        <h3 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                                            {proj.title}
                                        </h3>
                                        {renderBullets(proj.desc)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom sections (Skills, Achievements, Certifications) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                    <div>
                        <SkillsSection />
                    </div>
                    <div>
                        <AchievementsSection />
                        <CertificationsSection />
                    </div>
                </div>
            </div>
        );
    };

    // 5. Double Column Layout Renderer
    const renderDoubleColumn = () => {
        return (
            <div style={{ padding: '2.5rem' }}>
                <Header />
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2.5rem', marginTop: '1rem' }}>
                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                        <ObjectiveSection />
                        <ExperienceSection />
                    </div>
                    {/* Right Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                        <SkillsSection />
                        <EducationSection />
                        <ProjectsSection />
                        <CertificationsSection />
                        <AchievementsSection />
                    </div>
                </div>
            </div>
        );
    };

    // 6. Header Left Layout Renderer
    const renderHeaderLeft = () => {
        return (
            <div style={{ display: 'flex', minHeight: '100%', gap: '2rem' }}>
                {/* Left Side Header Bar */}
                <div style={{ width: '32%', background: `${colors.primary}08`, padding: '2.5rem 1.5rem', borderRight: `1px solid ${colors.primary}15`, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        {renderProfilePhoto('100px', '50%', <FiUser />)}
                    </div>
                    <div>
                        <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '1.8rem', margin: '15px 0 5px 0', fontWeight: 900, lineHeight: 1.1 }}>
                            {safeData.personal.name}
                        </h1>
                        <p style={{ fontFamily: fonts.body, color: colors.secondary, fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                            {safeData.personal.title}
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem', color: colors.text }}>
                        <div><b>Email:</b> {safeData.personal.email}</div>
                        <div><b>Phone:</b> {safeData.personal.phone}</div>
                        <div><b>Location:</b> {safeData.personal.location}</div>
                        {safeData.personal.linkedin && <div><b>LinkedIn:</b> {safeData.personal.linkedin}</div>}
                        {safeData.personal.github && <div><b>GitHub:</b> {safeData.personal.github}</div>}
                    </div>
                    <SkillsSection />
                </div>
                {/* Right Side Content */}
                <div style={{ width: '68%', padding: '2.5rem 2rem 2.5rem 0', display: 'flex', flexDirection: 'column', gap: getSpacing() }}>
                    <ObjectiveSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <EducationSection />
                    <CertificationsSection />
                    <AchievementsSection />
                </div>
            </div>
        );
    };

    // 7. Academic Margin Date Layout Renderer
    const renderAcademic = () => {
        const gridRowStyle = {
            display: 'grid',
            gridTemplateColumns: '130px 1fr',
            gap: '1.5rem',
            marginBottom: '1.2rem'
        };

        return (
            <div style={{ padding: '2.5rem 3rem' }}>
                {/* Centered Academic Header */}
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '1.5rem', marginBottom: getSpacing() }}>
                    <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '2.4rem', margin: 0, fontWeight: 700 }}>
                        {safeData.personal.name}
                    </h1>
                    <p style={{ fontFamily: fonts.body, color: colors.secondary, fontSize: '1rem', fontStyle: 'italic', margin: '4px 0 12px 0' }}>
                        {safeData.personal.title}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', fontSize: '0.82rem', color: colors.text }}>
                        <span>{safeData.personal.email}</span>
                        <span>• {safeData.personal.phone}</span>
                        <span>• {safeData.personal.location}</span>
                        {safeData.personal.website && <span>• {safeData.personal.website}</span>}
                    </div>
                </div>

                <ObjectiveSection />

                {/* Academic Experience */}
                {safeData.experience.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Professional Appointments" />
                        <div style={{ marginTop: '1rem' }}>
                            {safeData.experience.map((exp, i) => (
                                <div key={i} style={gridRowStyle}>
                                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: colors.secondary }}>{exp.duration}</div>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>{exp.role}</h3>
                                        <div style={{ fontSize: '0.88rem', color: colors.text, fontWeight: 600, margin: '2px 0' }}>{exp.company}, {exp.location}</div>
                                        {renderBullets(exp.desc)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Academic Education */}
                {safeData.education.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Education" />
                        <div style={{ marginTop: '1rem' }}>
                            {safeData.education.map((edu, i) => (
                                <div key={i} style={gridRowStyle}>
                                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: colors.secondary }}>{edu.year}</div>
                                    <div>
                                        <h3 style={{ fontSize: '1rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>{edu.degree}</h3>
                                        <div style={{ fontSize: '0.88rem', color: colors.text, margin: '2px 0' }}>{edu.school}, {edu.location}</div>
                                        {edu.gpa && <div style={{ fontSize: '0.8rem', color: 'gray' }}>Performance Index: {edu.gpa}</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects as Publications */}
                {safeData.projects.length > 0 && (
                    <div style={{ marginBottom: getSpacing() }}>
                        <SectionHeader title="Research Publications" />
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {safeData.projects.map((proj, i) => (
                                <div key={i} style={gridRowStyle}>
                                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: colors.secondary }}>{proj.tech ? proj.tech.split(',')[0].trim() : 'Project'}</div>
                                    <div>
                                        <h3 style={{ fontSize: '0.95rem', color: '#0f172a', margin: 0, fontWeight: 700 }}>"{proj.title}"</h3>
                                        {renderBullets(proj.desc)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                    <SkillsSection />
                    <div>
                        <CertificationsSection />
                        <AchievementsSection />
                    </div>
                </div>
            </div>
        );
    };

    // 8. Top Accent Header Banner Layout Renderer
    const renderTopAccent = () => {
        return (
            <div style={{ position: 'relative', minHeight: '100%' }}>
                {/* Accent bar */}
                <div style={{ height: '12px', background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.accent} 100%)`, width: '100%' }} />
                <div style={{ padding: '2.5rem' }}>
                    <Header />
                    <ObjectiveSection />
                    <ExperienceSection />
                    <ProjectsSection />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <EducationSection />
                            <CertificationsSection />
                        </div>
                        <div>
                            <SkillsSection />
                            <AchievementsSection />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Main Layout Router mapping layouts to specific renderers
    const renderLayout = () => {
        if (layout === 'altacv') return renderAltaCV();
        if (layout === 'hipstercv') return renderHipsterCV();
        if (layout === 'curvecv') return renderCurveCV();
        if (layout === 'timeline') return renderTimeline();
        if (layout === 'doubleColumn') return renderDoubleColumn();
        if (layout === 'headerLeft') return renderHeaderLeft();
        if (layout === 'academic') return renderAcademic();
        if (layout === 'topAccent') return renderTopAccent();

        // Standard Two Column Left Sidebar Layout
        if (layout === 'leftSidebar') {
            return (
                <div style={{ display: 'flex', minHeight: '100%', gap: '2rem' }}>
                    <div style={{ width: '30%', background: `${colors.primary}08`, padding: '2rem', borderRight: `1px solid ${colors.primary}20` }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            {renderProfilePhoto('80px', '50%', <FiUser />)}
                        </div>
                        <Header />
                        <SkillsSection />
                        <EducationSection />
                        <CertificationsSection />
                    </div>
                    <div style={{ width: '70%', padding: '2rem 2rem 2rem 0' }}>
                        <ObjectiveSection />
                        <ExperienceSection />
                        <ProjectsSection />
                        <AchievementsSection />
                    </div>
                </div>
            );
        }

        // Standard Two Column Right Sidebar Layout
        if (layout === 'rightSidebar') {
            return (
                <div style={{ display: 'flex', minHeight: '100%', gap: '2rem' }}>
                    <div style={{ width: '70%', padding: '2rem 0 2rem 2rem' }}>
                        <Header />
                        <ObjectiveSection />
                        <ExperienceSection />
                        <ProjectsSection />
                    </div>
                    <div style={{ width: '30%', background: `${colors.secondary}10`, padding: '2rem', borderLeft: `1px solid ${colors.secondary}20` }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            {renderProfilePhoto('80px', '50%', <FiUser />)}
                        </div>
                        <SkillsSection />
                        <EducationSection />
                        <CertificationsSection />
                        <AchievementsSection />
                    </div>
                </div>
            );
        }

        // Default: standard layout
        return (
            <div style={{ padding: '2.5rem' }}>
                <Header />
                <ObjectiveSection />
                <ExperienceSection />
                <ProjectsSection />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                        <EducationSection />
                        <CertificationsSection />
                    </div>
                    <div>
                        <SkillsSection />
                        <AchievementsSection />
                    </div>
                </div>
            </div>
        );
    };

    // Sub-components for standard layout structure rendering
    const Header = () => {
        if (headerStyle === 'splitHeader') {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: `2px solid ${colors.primary}`, paddingBottom: '1rem', marginBottom: getSpacing() }}>
                    <div>
                        <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '2.4rem', margin: 0, fontWeight: 800 }}>{safeData.personal.name}</h1>
                        <p style={{ fontFamily: fonts.body, color: colors.secondary, fontSize: '1.05rem', margin: '4px 0 0' }}>{safeData.personal.location}</p>
                    </div>
                    <div style={{ textAlign: 'right', fontFamily: fonts.body, fontSize: '0.85rem', color: colors.text }}>
                        <div>{safeData.personal.email}</div>
                        <div>{safeData.personal.phone}</div>
                        <div>{safeData.personal.linkedin}</div>
                    </div>
                </div>
            );
        }

        return (
            <div style={{ textAlign: 'center', marginBottom: getSpacing(), borderBottom: `1px solid ${colors.secondary}40`, paddingBottom: '1.25rem' }}>
                <h1 style={{ fontFamily: fonts.header, color: colors.primary, fontSize: '2.6rem', margin: 0, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {safeData.personal.name}
                </h1>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontFamily: fonts.body, fontSize: '0.85rem', color: colors.secondary, marginTop: '0.6rem' }}>
                    {safeData.personal.email && <span>{safeData.personal.email}</span>}
                    {safeData.personal.phone && <span>• {safeData.personal.phone}</span>}
                    {safeData.personal.location && <span>• {safeData.personal.location}</span>}
                    {safeData.personal.linkedin && <span>• {safeData.personal.linkedin}</span>}
                </div>
            </div>
        );
    };

    const SectionHeader = ({ title }) => (
        <h2 style={{ 
            fontFamily: fonts.header, 
            color: colors.primary, 
            fontSize: '1.15rem', 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            borderBottom: `1px solid ${colors.accent}60`, 
            paddingBottom: '4px',
            marginBottom: '0.8rem',
            marginTop: 0
        }}>
            {title}
        </h2>
    );

    const ObjectiveSection = () => safeData.objective ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Professional Summary" />
            <p style={{ fontFamily: fonts.body, fontSize: '0.92rem', lineHeight: 1.5, color: colors.text, margin: 0 }}>
                {safeData.objective}
            </p>
        </div>
    ) : null;

    const ExperienceSection = () => safeData.experience.length > 0 ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Experience" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {safeData.experience.map((exp, i) => (
                    <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontFamily: fonts.header, color: colors.secondary, fontSize: '1.02rem', margin: 0, fontWeight: 700 }}>{exp.role}</h3>
                                <div style={{ fontFamily: fonts.body, color: colors.text, fontSize: '0.88rem', fontWeight: 600, marginTop: '2px' }}>{exp.company}</div>
                            </div>
                            <div style={{ textAlign: 'right', fontFamily: fonts.body, fontSize: '0.82rem', color: colors.secondary, fontWeight: 600 }}>
                                <div>{exp.duration}</div>
                                <div style={{ fontWeight: 400 }}>{exp.location}</div>
                            </div>
                        </div>
                        {renderBullets(exp.desc)}
                    </div>
                ))}
            </div>
        </div>
    ) : null;

    const EducationSection = () => safeData.education.length > 0 ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Education" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {safeData.education.map((edu, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                        <div>
                            <h3 style={{ fontFamily: fonts.header, color: colors.secondary, fontSize: '0.95rem', margin: 0, fontWeight: 700 }}>{edu.degree}</h3>
                            <div style={{ fontFamily: fonts.body, color: colors.text, fontSize: '0.85rem', marginTop: '2px' }}>{edu.school}</div>
                        </div>
                        <div style={{ textAlign: 'right', fontFamily: fonts.body, fontSize: '0.8rem', color: colors.secondary }}>
                            <div style={{ fontWeight: 600 }}>{edu.year}</div>
                            {edu.gpa && <div>GPA: {edu.gpa}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;

    const SkillsSection = () => safeData.skills ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Skills" />
            <div style={{ fontFamily: fonts.body, fontSize: '0.92rem', lineHeight: 1.5, color: colors.text }}>
                {safeData.skills}
            </div>
        </div>
    ) : null;

    const ProjectsSection = () => safeData.projects.length > 0 ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Projects" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {safeData.projects.map((proj, i) => (
                    <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <h3 style={{ fontFamily: fonts.header, color: colors.secondary, fontSize: '1rem', margin: 0, fontWeight: 700 }}>
                                {proj.title} {proj.link && <a href={proj.link} style={{ color: colors.accent, fontSize: '0.78rem', textDecoration: 'none', marginLeft: '6px' }}>[Link]</a>}
                            </h3>
                            <div style={{ fontFamily: fonts.body, fontSize: '0.78rem', color: colors.secondary, fontStyle: 'italic' }}>
                                {proj.tech}
                            </div>
                        </div>
                        {renderBullets(proj.desc)}
                    </div>
                ))}
            </div>
        </div>
    ) : null;

    const CertificationsSection = () => safeData.certifications.length > 0 ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Certifications" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {safeData.certifications.map((cert, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.body, fontSize: '0.88rem' }}>
                        <div><strong style={{ color: colors.secondary }}>{cert.name}</strong> — {cert.issuer}</div>
                        <div style={{ color: colors.secondary }}>{cert.year}</div>
                    </div>
                ))}
            </div>
        </div>
    ) : null;

    const AchievementsSection = () => safeData.achievements ? (
        <div style={{ marginBottom: getSpacing() }}>
            <SectionHeader title="Achievements" />
            {renderBullets(safeData.achievements)}
        </div>
    ) : null;

    return (
        <div style={{ 
            background: colors.bg, 
            width: '100%', 
            minHeight: '100%', 
            boxSizing: 'border-box',
            color: colors.text,
            fontFamily: fonts.body
        }}>
            {renderLayout()}
        </div>
    );
};

export default TemplateEngine;
