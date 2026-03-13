import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiArrowLeft, FiCheckCircle, FiInfo, FiLayers } from 'react-icons/fi';
import { RESUME_SECTORS, RESUME_TEMPLATES } from './resumeTemplates';
import ResumeBuilder from './ResumeBuilder';

const ResumeEngine = () => {
    const { t } = useLanguage();
    const [view, setView] = useState('sectors'); // 'sectors' | 'templates' | 'builder'
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const handleSectorClick = (sector) => {
        setSelectedSector(sector);
        setView('templates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setView('builder');
    };

    const filteredTemplates = useMemo(() => {
        if (!selectedSector) return [];
        const templates = RESUME_TEMPLATES[selectedSector.id] || [];
        return templates.filter(template => {
            const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                template.company.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'All' || template.category === activeFilter;
            return matchesSearch && matchesFilter;
        });
    }, [selectedSector, searchQuery, activeFilter]);

    const categories = useMemo(() => {
        if (!selectedSector) return ['All'];
        const templates = RESUME_TEMPLATES[selectedSector.id] || [];
        const cats = new Set(templates.map(template => template.category).filter(Boolean));
        return ['All', ...Array.from(cats)];
    }, [selectedSector]);

    if (view === 'builder') {
        return <ResumeBuilder template={selectedTemplate} sector={selectedSector} onBack={() => setView('templates')} />;
    }

    return (
        <div style={{ padding: '0 0 4rem' }}>
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '3.5rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ padding: '8px 16px', borderRadius: 100, background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                        {t('resume.badge')}
                    </div>
                </div>
                <h2 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: -2, lineHeight: 1 }}>
                    {t('resume.title')}
                </h2>
                <p style={{ color: 'var(--text-muted)', margin: '15px 0 0', fontSize: '1.2rem', fontWeight: 500, maxWidth: 600 }}>
                    {t('resume.subtitle')}
                </p>
            </motion.div>

            <AnimatePresence mode="wait">
                {view === 'sectors' && (
                    <motion.div
                        key="sectors"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
                    >
                        {RESUME_SECTORS.map((s, idx) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleSectorClick(s)}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 32,
                                    padding: '2.5rem',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                }}
                                whileHover={{ y: -10, borderColor: s.color, boxShadow: `0 20px 60px ${s.color}20` }}
                            >
                                <div style={{ width: 70, height: 70, borderRadius: 20, background: `${s.color}15`, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '1.5rem', boxShadow: `0 10px 20px ${s.color}10` }}>
                                    {s.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.8rem', color: 'var(--text-main)' }}>{s.label}</h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1 }}>{s.description}</p>

                                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '0.85rem', color: s.color }}>
                                    {t('resume.exploreTemplates')} <FiArrowLeft style={{ transform: 'rotate(180deg)' }} />
                                </div>

                                <div style={{ position: 'absolute', bottom: -30, right: -20, fontSize: '8rem', opacity: 0.03, color: s.color }}>
                                    {s.icon}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {view === 'templates' && (
                    <motion.div
                        key="templates"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Navigation and Search */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', gap: 20, flexWrap: 'wrap' }}>
                            <button
                                onClick={() => setView('sectors')}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-main)',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    padding: '12px 20px',
                                    borderRadius: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    transition: 'all 0.2s'
                                }}
                            >
                                <FiArrowLeft /> {t('resume.back')}
                            </button>

                            <div style={{ display: 'flex', gap: 15, flex: 1, maxWidth: 600 }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <FiSearch style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder={t('resume.searchTemplates', { sector: selectedSector.label })}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '14px 14px 14px 45px',
                                            borderRadius: 16,
                                            border: '1px solid var(--border)',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-main)',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', alignItems: 'start' }}>
                            {/* Filters Sidebar */}
                            <div style={{ position: 'sticky', top: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.5rem', color: 'var(--text-main)', fontWeight: 800 }}>
                                    <FiFilter /> {t('resume.filters')}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            style={{
                                                textAlign: 'left',
                                                padding: '10px 15px',
                                                borderRadius: 10,
                                                border: 'none',
                                                background: activeFilter === cat ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                                color: activeFilter === cat ? '#6366f1' : 'var(--text-muted)',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div style={{ marginTop: '3rem', padding: '1.5rem', borderRadius: 20, background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', fontWeight: 800 }}>{t('resume.aiOptimizer')}</h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.5 }}>{t('resume.aiOptimizerDesc')}</p>
                                </div>
                            </div>

                            {/* Templates Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2.5rem' }}>
                                {filteredTemplates.map((template, idx) => (
                                    <motion.div
                                        key={template.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => handleTemplateClick(template)}
                                        style={{
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--border)',
                                            borderRadius: 24,
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                        whileHover={{ y: -8, borderColor: '#6366f1', boxShadow: '0 15px 45px rgba(0,0,0,0.12)' }}
                                    >
                                        <div style={{ height: 320, background: '#1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                            <div style={{ fontSize: '5rem' }}>{template.thumbnail}</div>
                                            <div style={{ position: 'absolute', top: 15, right: 15, padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, border: '1px solid rgba(255,255,255,0.2)' }}>
                                                {t('resume.atsScore', { score: template.atsScore })}
                                            </div>
                                            <div style={{ position: 'absolute', bottom: 15, left: 15, display: 'flex', gap: 5 }}>
                                                {template.category && <span style={{ padding: '4px 8px', borderRadius: 6, background: '#6366f1', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>{template.category}</span>}
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
                                                <FiLayers /> {t('resume.format', { company: template.company })}
                                            </div>
                                            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 12 }}>{template.name}</div>

                                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                                <FiCheckCircle style={{ color: '#1A3263' }} /> {t('resume.fullyEditable')}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                {filteredTemplates.length === 0 && (
                                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '6rem 2rem', background: 'var(--bg-secondary)', borderRadius: 32, border: '1px dashed var(--border)' }}>
                                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{t('resume.noTemplates')}</h3>
                                        <p style={{ color: 'var(--text-muted)', maxWidth: 400, margin: '10px auto' }}>{t('resume.noTemplatesDesc')}</p>
                                        <button onClick={() => { setSearchQuery(''); setActiveFilter('All'); }} style={{ marginTop: '1.5rem', padding: '10px 20px', borderRadius: 12, border: 'none', background: '#6366f1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>{t('resume.clearFilters')}</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeEngine;
