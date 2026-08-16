import React, { useState } from 'react';
import ResumeAtsIntelligence from '../components/aptitude/ResumeAtsIntelligence';
import TemplateGallery from '../components/resume-builder/TemplateGallery';
import ResumeBuilderPlatform from '../components/resume-builder/ResumeBuilderPlatform';

const ResumePage = () => {
    const [activeTab, setActiveTab] = useState('builder'); // 'builder' | 'ats'
    const [builderView, setBuilderView] = useState('gallery'); // 'gallery' | 'builder'
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const isEditing = activeTab === 'builder' && builderView === 'builder';

    return (
        <div className="resume-page-container" style={{
            minHeight: '100vh',
            background: 'var(--bg-color)',
            backgroundImage: `
                radial-gradient(at 0% 0%, var(--glow-primary, transparent) 0px, transparent 50%),
                radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%)
            `,
            padding: '0px 2rem 2rem 2rem',
            marginTop: isEditing ? '-1.5rem' : '-0.75rem'
        
        }}>
            <style>{`
                .resume-page-container {
                    animation: fadeIn 0.5s ease;
                }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                
                .resume-tab-btn {
                    padding: 12px 24px;
                    font-size: 0.95rem;
                    font-weight: 800;
                    border: 1px solid transparent;
                    border-radius: 14px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    background: transparent;
                    color: var(--text-muted);
                }
                .resume-tab-btn.active {
                    background: rgba(99, 102, 241, 0.1);
                    color: #6366f1;
                    border-color: rgba(99, 102, 241, 0.2);
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.05);
                }
                .resume-tab-btn:hover:not(.active) {
                    color: var(--text-main);
                    background: rgba(255, 255, 255, 0.02);
                }
            `}</style>

            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header Section (Hidden when inside active Builder Editor workspace) */}
                {!(activeTab === 'builder' && builderView === 'builder') && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', flexWrap: 'wrap', gap: 20 }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: '-1px' }}>
                                Resume & Career Hub
                            </h1>
                            <p style={{ color: 'var(--text-muted)', margin: '6px 0 0', fontSize: '1rem', fontWeight: 500 }}>
                                Build, optimize, and scan your resume against market expectations.
                            </p>
                        </div>

                        {/* Navigation Tabs */}
                        <div style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border)',
                            borderRadius: '18px',
                            padding: '6px',
                            display: 'flex',
                            gap: 4,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                        }}>
                            <button
                                className={`resume-tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
                                onClick={() => setActiveTab('builder')}
                            >
                                AI Resume Builder
                            </button>
                            <button
                                className={`resume-tab-btn ${activeTab === 'ats' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('ats');
                                    // Reset builder view when toggling away
                                    setBuilderView('gallery');
                                }}
                            >
                                Resume ATS Intelligence
                            </button>
                        </div>
                    </div>
                )}

                {/* Tab Content Rendering */}
                <div>
                    {activeTab === 'builder' ? (
                        builderView === 'gallery' ? (
                            <TemplateGallery onSelectTemplate={(tpl) => {
                                setSelectedTemplate(tpl);
                                setBuilderView('builder');
                            }} />
                        ) : (
                            <ResumeBuilderPlatform 
                                initialTemplate={selectedTemplate} 
                                onBack={() => setBuilderView('gallery')} 
                            />
                        )
                    ) : (
                        <ResumeAtsIntelligence />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumePage;
