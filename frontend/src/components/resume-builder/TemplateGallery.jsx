import React, { useState, useEffect } from 'react';
import { ALL_TEMPLATES } from './TemplateDatabase';
import TemplateCard from './TemplateCard';
import TemplatePreviewModal from './TemplatePreviewModal';
import { FiSearch, FiSliders, FiPlus, FiUpload, FiCheck, FiX, FiInfo } from 'react-icons/fi';
import axios from 'axios';

const CATEGORIES = ["All", "Technology", "Freshers", "Corporate", "Academic", "Startup", "Minimal", "Executive", "International"];

const TemplateGallery = ({ onSelectTemplate }) => {
    const [customTemplates, setCustomTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    // Filtering States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [experienceFilter, setExperienceFilter] = useState('All');
    const [minAts, setMinAts] = useState(80);
    const [showFilters, setShowFilters] = useState(false);

    // Pagination State
    const [visibleCount, setVisibleCount] = useState(9);

    // Admin Modal State
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        category: 'Technology',
        recommendedFor: '',
        industry: '',
        experienceLevel: 'Mid Level',
        atsFriendly: 90,
        thumbnailUrl: '',
        layout: 'standard',
        headerStyle: 'splitHeader',
        sectionSpacing: 'compact',
        colors: {
            primary: '#1e3a8a',
            secondary: '#3b82f6',
            text: '#1f2937',
            accent: '#0ea5e9',
            bg: '#ffffff'
        },
        fonts: {
            header: "'Outfit', sans-serif",
            body: "'Inter', sans-serif"
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Fetch Custom templates from backend on mount
    useEffect(() => {
        const fetchCustomTemplates = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const res = await axios.get('/api/resume/templates', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data) {
                    setCustomTemplates(res.data);
                }
            } catch (err) {
                console.error("Failed to load custom templates from backend:", err);
            }
        };
        fetchCustomTemplates();
    }, []);

    // Merge built-in and custom templates
    // Put custom uploaded templates and featured ones at the top of the gallery!
    const allTemplates = [...customTemplates, ...ALL_TEMPLATES];

    // Filter Logic
    const filteredTemplates = allTemplates.filter(tpl => {
        const matchesSearch = tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tpl.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tpl.industry.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;

        const matchesExperience = experienceFilter === 'All' || tpl.experienceLevel === experienceFilter;

        const matchesAts = tpl.atsFriendly >= minAts;

        return matchesSearch && matchesCategory && matchesExperience && matchesAts;
    });

    // Handle thumbnail image file reading (converts to base64 data URL)
    const handleThumbnailChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setNewTemplate(prev => ({ ...prev, thumbnailUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    // Color input change helper
    const handleColorChange = (key, value) => {
        setNewTemplate(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                [key]: value
            }
        }));
    };

    // Font select change helper
    const handleFontChange = (key, value) => {
        setNewTemplate(prev => ({
            ...prev,
            fonts: {
                ...prev.fonts,
                [key]: value
            }
        }));
    };

    // Submit new template
    const handleAdminSubmit = async (e) => {
        e.preventDefault();
        if (!newTemplate.name || !newTemplate.recommendedFor) {
            alert("Template Name and Recommended Role are required!");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('/api/resume/templates', {
                name: newTemplate.name,
                category: newTemplate.category,
                atsFriendly: newTemplate.atsFriendly,
                recommendedFor: newTemplate.recommendedFor,
                industry: newTemplate.industry,
                experienceLevel: newTemplate.experienceLevel,
                thumbnailUrl: newTemplate.thumbnailUrl,
                config: {
                    fonts: newTemplate.fonts,
                    colors: newTemplate.colors,
                    layout: newTemplate.layout,
                    headerStyle: newTemplate.headerStyle,
                    sectionSpacing: newTemplate.sectionSpacing
                }
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data) {
                setCustomTemplates(prev => [res.data, ...prev]);
                setSubmitSuccess(true);
                setTimeout(() => {
                    setSubmitSuccess(false);
                    setIsAdminModalOpen(false);
                    // Reset form
                    setNewTemplate({
                        name: '',
                        category: 'Technology',
                        recommendedFor: '',
                        industry: '',
                        experienceLevel: 'Mid Level',
                        atsFriendly: 90,
                        thumbnailUrl: '',
                        layout: 'standard',
                        headerStyle: 'splitHeader',
                        sectionSpacing: 'compact',
                        colors: { primary: '#1e3a8a', secondary: '#3b82f6', text: '#1f2937', accent: '#0ea5e9', bg: '#ffffff' },
                        fonts: { header: "'Outfit', sans-serif", body: "'Inter', sans-serif" }
                    });
                }, 1500);
            }
        } catch (err) {
            console.error("Failed to save custom template:", err);
            alert("Failed to save template. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', padding: '0.25rem 0 4rem' }}>



            {/* Marketplace Filter Dashboard Panel */}
            <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
            }}>
                {/* Search & Sliders Toggle Row */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <FiSearch style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by template name, role recommendation, or industry keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 42px',
                                borderRadius: '12px',
                                border: '1px solid var(--border)',
                                background: 'var(--bg-main)',
                                color: 'var(--text-main)',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        style={{
                            padding: '12px 18px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: showFilters ? 'rgba(99,102,241,0.08)' : 'var(--bg-main)',
                            color: showFilters ? '#6366f1' : 'var(--text-main)',
                            fontWeight: 800,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <FiSliders /> Filters {showFilters ? 'Open' : ''}
                    </button>
                </div>

                {/* Advanced Sliders / Filters Panel */}
                {showFilters && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem',
                        padding: '10px 5px',
                        borderTop: '1px solid var(--border)',
                        animation: 'slideDown 0.2s ease-out'
                    }}>
                        <style>{`
                            @keyframes slideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
                        `}</style>
                        {/* ATS slider */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>MINIMUM ATS COMPATIBILITY</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="range"
                                    min="80"
                                    max="98"
                                    value={minAts}
                                    onChange={(e) => setMinAts(parseInt(e.target.value))}
                                    style={{ flex: 1, accentColor: '#6366f1' }}
                                />
                                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>{minAts}%+</span>
                            </div>
                        </div>

                        {/* Experience level dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>EXPERIENCE PROFILE</span>
                            <select
                                value={experienceFilter}
                                onChange={(e) => setExperienceFilter(e.target.value)}
                                style={{
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--border)',
                                    background: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    fontSize: '0.82rem',
                                    fontWeight: 700
                                }}
                            >
                                <option value="All">All Profiles</option>
                                <option value="Entry Level">Entry Level / Graduates</option>
                                <option value="Mid Level">Mid Career (2-5 Yrs)</option>
                                <option value="Senior Level">Senior Specialists</option>
                                <option value="Senior Executive">Executive Leadership</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Horizontal Category Tab Pills */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '5px',
                    scrollbarWidth: 'none'
                }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '100px',
                                background: selectedCategory === cat ? '#6366f1' : 'var(--bg-main)',
                                color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)',
                                fontWeight: 800,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap',
                                boxShadow: selectedCategory === cat ? '0 4px 10px rgba(99, 102, 241, 0.15)' : 'none',
                                border: '1px solid ' + (selectedCategory === cat ? '#6366f1' : 'var(--border)')
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Exactly 3 templates per row responsive grid */}
            {filteredTemplates.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2.5rem',
                    width: '100%'
                }}>
                    {/* Media Queries check: on mobile or small viewports fallback to 1 or 2 columns */}
                    <style>{`
                        @media (max-width: 1024px) {
                            div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
                                grid-template-columns: repeat(2, 1fr) !important;
                            }
                        }
                        @media (max-width: 640px) {
                            div[style*="gridTemplateColumns: repeat(3, 1fr)"] {
                                grid-template-columns: 1fr !important;
                            }
                        }
                    `}</style>
                    {filteredTemplates.slice(0, visibleCount).map(template => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onClick={() => setSelectedTemplate(template)}
                        />
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    borderRadius: '20px',
                    border: '2px dashed var(--border)',
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    fontWeight: 700
                }}>
                    No templates matching the selected filters found. Try relaxing your search terms or filters.
                </div>
            )}

            {/* Pagination / Load More Button */}
            {filteredTemplates.length > visibleCount && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button
                        onClick={() => setVisibleCount(prev => prev + 9)}
                        style={{
                            padding: '12px 28px',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-main)',
                            fontWeight: 850,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                            transition: 'all 0.2s'
                        }}
                    >
                        Load More Templates
                    </button>
                </div>
            )}

            {/* Template Detailed Preview Modal */}
            {selectedTemplate && (
                <TemplatePreviewModal
                    template={selectedTemplate}
                    onClose={() => setSelectedTemplate(null)}
                    onUse={(tpl) => {
                        setSelectedTemplate(null);
                        onSelectTemplate(tpl);
                    }}
                />
            )}

            {/* Admin Import Template Modal */}
            {isAdminModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                    boxSizing: 'border-box'
                }}>
                    <div style={{
                        background: 'var(--bg-main)',
                        border: '1px solid var(--border)',
                        borderRadius: '24px',
                        width: '100%',
                        maxWidth: '700px',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                        animation: 'zoomIn 0.25s ease-out'
                    }}>
                        <style>{`
                            @keyframes zoomIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                        `}</style>
                        {/* Modal Header */}
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-main)' }}>Import Custom Overleaf Template</h3>
                                <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Publish screenshots & configuration assets to the marketplace gallery.</p>
                            </div>
                            <button
                                onClick={() => setIsAdminModalOpen(false)}
                                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-main)' }}
                            >
                                <FiX size={22} />
                            </button>
                        </div>

                        {/* Modal Body / Scrollable Form */}
                        <form onSubmit={handleAdminSubmit} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxSizing: 'border-box' }}>
                            {/* Template metadata name/category */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Template Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. MAltaCV Template"
                                        value={newTemplate.name}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, boxSizing: 'border-box' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Category</label>
                                    <select
                                        value={newTemplate.category}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, category: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, boxSizing: 'border-box' }}
                                    >
                                        {CATEGORIES.slice(1).map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Job info recommendedFor / industry */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Recommended Roles</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Software Engineers, Data Scientists"
                                        value={newTemplate.recommendedFor}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, recommendedFor: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, boxSizing: 'border-box' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Target Industry</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Software & Technology"
                                        value={newTemplate.industry}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, industry: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            {/* Experience profile / ATS Friendly */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Experience Level</label>
                                    <select
                                        value={newTemplate.experienceLevel}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, experienceLevel: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, boxSizing: 'border-box' }}
                                    >
                                        <option value="Entry Level">Entry Level</option>
                                        <option value="Mid Level">Mid Level</option>
                                        <option value="Senior Level">Senior Level</option>
                                        <option value="Senior Executive">Senior Executive</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>ATS Match Score (%)</label>
                                    <input
                                        type="number"
                                        min="50"
                                        max="100"
                                        value={newTemplate.atsFriendly}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, atsFriendly: parseInt(e.target.value) }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 600, boxSizing: 'border-box' }}
                                    />
                                </div>
                            </div>

                            {/* Layout selection */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Base Layout Structure</label>
                                    <select
                                        value={newTemplate.layout}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, layout: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, boxSizing: 'border-box' }}
                                    >
                                        <option value="standard">Standard Single Column</option>
                                        <option value="leftSidebar">Left Sidebar Split</option>
                                        <option value="rightSidebar">Right Sidebar Split</option>
                                        <option value="timeline">Timeline Layout</option>
                                        <option value="doubleColumn">Split Page 50/50 Layout</option>
                                        <option value="headerLeft">Header Left Layout</option>
                                        <option value="academic">Academic Dates-Left Layout</option>
                                        <option value="topAccent">Top Accent Band Layout</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Section Spacing</label>
                                    <select
                                        value={newTemplate.sectionSpacing}
                                        onChange={e => setNewTemplate(prev => ({ ...prev, sectionSpacing: e.target.value }))}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 700, boxSizing: 'border-box' }}
                                    >
                                        <option value="compact">Compact / Dense</option>
                                        <option value="spacious">Spacious / Breathable</option>
                                    </select>
                                </div>
                            </div>

                            {/* Color Palettes Picker */}
                            <div style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '12px', background: 'rgba(255,255,255,0.01)' }}>
                                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Palette Configuration</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>PRIMARY</span>
                                        <input type="color" value={newTemplate.colors.primary} onChange={e => handleColorChange('primary', e.target.value)} style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>SECONDARY</span>
                                        <input type="color" value={newTemplate.colors.secondary} onChange={e => handleColorChange('secondary', e.target.value)} style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>ACCENT</span>
                                        <input type="color" value={newTemplate.colors.accent} onChange={e => handleColorChange('accent', e.target.value)} style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>TEXT</span>
                                        <input type="color" value={newTemplate.colors.text} onChange={e => handleColorChange('text', e.target.value)} style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <span style={{ fontSize: '0.62rem', fontWeight: 700, display: 'block', color: 'var(--text-muted)', marginBottom: '4px' }}>BG SHEET</span>
                                        <input type="color" value={newTemplate.colors.bg} onChange={e => handleColorChange('bg', e.target.value)} style={{ width: '30px', height: '30px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Font Selections */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Header Font Family</label>
                                    <select
                                        value={newTemplate.fonts.header}
                                        onChange={e => handleFontChange('header', e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 750, boxSizing: 'border-box' }}
                                    >
                                        <option value="'Outfit', sans-serif">Outfit (Modern)</option>
                                        <option value="'Roboto', sans-serif">Roboto (Tech)</option>
                                        <option value="'Playfair Display', serif">Playfair Display (Elegant)</option>
                                        <option value="'Merriweather', serif">Merriweather (Classic)</option>
                                        <option value="Georgia, serif">Georgia (Editorial)</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Body Font Family</label>
                                    <select
                                        value={newTemplate.fonts.body}
                                        onChange={e => handleFontChange('body', e.target.value)}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-main)', fontSize: '0.85rem', fontWeight: 750, boxSizing: 'border-box' }}
                                    >
                                        <option value="'Inter', sans-serif">Inter (Highly Readable)</option>
                                        <option value="'Roboto', sans-serif">Roboto (Symmetric)</option>
                                        <option value="Georgia, serif">Georgia (Serif Editorial)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Thumbnail Screenshot Upload */}
                            <div>
                                <label style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '6px', textTransform: 'uppercase' }}>Upload Overleaf Thumbnail Screenshot</label>
                                <div style={{
                                    border: '2px dashed var(--border)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    background: 'var(--bg-secondary)',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    />
                                    {newTemplate.thumbnailUrl ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                            <img src={newTemplate.thumbnailUrl} alt="Preview" style={{ maxHeight: '100px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 750 }}>✓ Screenshot Loaded successfully</span>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                                            <FiUpload size={28} />
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Click or Drag screenshot image to upload</span>
                                            <span style={{ fontSize: '0.68rem' }}>Supports PNG, JPG (saved as Base64)</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Action Button Row */}
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsAdminModalOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--border)',
                                        background: 'transparent',
                                        color: 'var(--text-main)',
                                        fontWeight: 800,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || submitSuccess}
                                    style={{
                                        flex: 2,
                                        padding: '12px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: submitSuccess ? '#10b981' : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                                        color: '#fff',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px'
                                    }}
                                >
                                    {submitSuccess ? <FiCheck /> : null}
                                    {isSubmitting ? "Uploading Template..." : submitSuccess ? "Imported successfully!" : "Publish to Gallery"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateGallery;
