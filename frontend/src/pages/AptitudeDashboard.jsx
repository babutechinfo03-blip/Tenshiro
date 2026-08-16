import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { CATEGORIES, TRACKS, PIPELINE_STEPS } from '../components/aptitude/questionBank';
import {
    getKPIs, getRadar,
    HeroSection, SH,
    CompanyMode, ResourceEngine, GamificationPanel
} from '../components/aptitude/AptUtils';
import { TestEngine } from '../components/aptitude/AptTestEngine';
import PracticeEngine, { updatePracticeProgress } from '../components/aptitude/PracticeEngine';
import MockEngine, { updateMockProgress } from '../components/aptitude/MockEngine';
import AptEntryFlow from '../components/aptitude/AptEntryFlow';


import AptLearnMode from '../components/aptitude/AptLearnMode';
import AptAnalytics from '../components/aptitude/AptAnalytics';
import { CareerNavigator } from '../components/aptitude/CareerNavigator';

import { ProctoringProvider } from '../context/ProctoringContext';
import ProctoredExamWrapper from '../components/aptitude/ProctoredExamWrapper';

import { useLanguage } from '../context/LanguageContext';

const AptitudeDashboard = () => {
    const { t } = useLanguage();
    const [perf, setPerf] = useState({ attempts: [], bookmarks: [], streak: 0, readiness: 0, resourceStatus: {} });
    const [goal, setGoal] = useState(localStorage.getItem('apt_goal'));
    const [view, setView] = useState('main'); // 'main' | 'test' | 'result'
    const [activeTab, setActiveTab] = useState('overview');
    const [testConfig, setTestConfig] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = useCallback(async () => {
        try {
            const res = await axios.get('/api/aptitude/stats');
            setPerf({
                attempts: res.data.history || [],
                bookmarks: res.data.progress?.bookmarked_topics || [],
                streak: res.data.progress?.streak || 0,
                readiness: res.data.progress?.readiness_score || 0,
                resourceStatus: res.data.progress?.resource_status || {}
            });
        } catch (err) {
            console.error('Failed to fetch stats', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    const handleGoalSelect = (goalId, activityId) => {
        setGoal(goalId);
        localStorage.setItem('apt_goal', goalId);
        setActiveTab(activityId || 'overview');
    };

    const startTest = (config) => {
        setTestConfig({ ...config, color: CATEGORIES.find(c => c.key === config.category)?.color || '#6366f1' });
        setView('test');
    };

    // Launch full mock automatically is removed in favor of MockEngine
    /*
    useEffect(() => {
        if (activeTab === 'mock' && view === 'main') {
            startTest({ type: 'mock', category: null, count: 60, catLabel: 'Full Mock Test — 60 Questions', difficulty: null, color: '#6366f1' });
        }
    }, [activeTab]);
    */


    const handleTestFinish = (res) => {
        if (res) {
            setResult(res);
            setView('result');

            // Track progress if it was a practice session
            if (testConfig?.id && (testConfig?.category && testConfig?.topic)) {
                updatePracticeProgress(testConfig, res);
            }

            // Track Mock Progress
            if (testConfig?.type === 'mock') {
                updateMockProgress(testConfig, res);
            }

            fetchStats(); // Refresh stats after test
        } else {
            setView('main');
        }
    };


    const handleBookmark = (title) => {
        setPerf(prev => {
            const bookmarks = prev.bookmarks.includes(title)
                ? prev.bookmarks.filter(b => b !== title)
                : [...prev.bookmarks, title];
            return { ...prev, bookmarks };
        });
    };

    const handleStatusUpdate = (title, status) => {
        setPerf(prev => ({
            ...prev,
            resourceStatus: { ...prev.resourceStatus, [title]: status }
        }));
    };

    const kpis = getKPIs(perf);
    const radarData = getRadar(perf);
    const readiness = perf.readiness || 0;

    if (loading && view === 'main') return (
        <div className="apt-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="spinner" style={{ border: '4px solid #6366f120', borderTop: '4px solid #6366f1', borderRadius: '50%', width: 50, height: 50, animation: 'spin 1s linear infinite' }}></div>
        </div>
    );

    if (!goal) {
        return (
            <div className="apt-container">
                <style>{`
                    .apt-container { min-height: 100vh; background: var(--bg-primary); color: var(--text-main); font-family: 'Outfit', sans-serif; }
                    @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
                <AptEntryFlow onSelectGoal={handleGoalSelect} />
            </div>
        );
    }

    return (
        <ProctoringProvider>
            <div className="apt-container">
                <style>{`
                    .apt-container { 
                        min-height: 100vh; 
                    background: var(--bg-primary);
                    color: var(--text-main); 
                    font-family: 'Outfit', sans-serif; 
                    padding-bottom: 5rem; 
                }
                .apt-navbar { 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    padding: 1.5rem 2rem; 
                    background: var(--bg-glass, var(--bg-primary)); 
                    border-bottom: 1px solid var(--border); 
                    position: sticky; 
                    top: 0; 
                    z-index: 100; 
                    backdrop-filter: blur(12px); 
                }
                .apt-content { max-width: 1300px; margin: 0 auto; padding: 2rem; }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>

            {view === 'main' && (
                <>
                    <nav className="apt-navbar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ background: '#1e293b', width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 900, color: '#fff' }}>A</div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: -0.5 }}>{t('aptitude.osTitle').split(' ')[0]} <span style={{ color: '#3b82f6' }}>{t('aptitude.osTitle').split(' ')[1]}</span></h1>
                        </div>

                        <div style={{ display: 'flex', gap: '2rem' }}>
                            {PIPELINE_STEPS.map(step => (
                                <button key={step.id} onClick={() => setActiveTab(step.id)}
                                    style={{ border: 'none', background: 'transparent', color: activeTab === step.id ? '#3b82f6' : 'var(--text-muted)', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                                    <span style={{ fontSize: '1.1rem' }}>{step.icon}</span> {t(`aptitude.steps.${step.id}`)}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('aptitude.readinessScore')}</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#1A3263' }}>{readiness}%</div>
                            </div>
                            <button onClick={() => { localStorage.removeItem('apt_goal'); setGoal(null); }} style={{ padding: '0.5rem 1rem', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer' }}>{t('aptitude.switchTrack')}</button>
                        </div>
                    </nav>

                    <main className="apt-content">
                        {activeTab === 'overview' && (
                            <div style={{ animation: 'fadeInUp 0.6s ease' }}>
                                <HeroSection kpis={kpis} perf={perf} />
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem', marginTop: '2.5rem' }}>
                                    <div>
                                        <SH c="🎓" t={t('aptitude.adaptiveMastery')} s={t('aptitude.adaptiveSubtitle')} />
                                        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 24, padding: '2rem' }}>
                                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{t('aptitude.adaptiveWelcome', { defaultValue: 'Welcome to your personalized cockpit. Based on your current progress, we recommend focusing on your weak areas today.' })}</p>
                                            <button onClick={() => setActiveTab('learn')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', borderRadius: 12, border: 'none', background: '#1e293b', color: '#fff', fontWeight: 800, cursor: 'pointer' }}>{t('aptitude.resumeLearning')}</button>
                                        </div>
                                    </div>
                                    <GamificationPanel perf={perf} radar={radarData} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'learn' && <AptLearnMode onStartPractice={(c, t) => startTest({ category: c, topic: t, count: 10, difficulty: 'Medium', catLabel: t })} />}

                        {activeTab === 'practice' && (
                            <PracticeEngine onStartTest={startTest} />
                        )}


                        {activeTab === 'mock' && (
                            <MockEngine onStartTest={startTest} />
                        )}

                        {activeTab === 'pattern' && <CompanyMode onStart={startTest} />}
                        {activeTab === 'resources' && <ResourceEngine perf={perf} onBookmark={handleBookmark} onStatusUpdate={handleStatusUpdate} />}


                        {activeTab === 'analytics' && (
                            <AptAnalytics history={perf.attempts} radarData={radarData} />
                        )}
                    </main>

                    <CareerNavigator perf={perf} radar={radarData} activeTab={activeTab} />
                </>
            )}

            {view === 'test' && (
                <ProctoredExamWrapper config={testConfig} onCancel={() => setView('main')}>
                    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto', animation: 'fadeInUp 0.4s ease' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>{testConfig?.catLabel || 'Practice Session'}</h2>
                        </div>
                        <TestEngine config={testConfig} onFinish={handleTestFinish} />
                    </div>
                </ProctoredExamWrapper>
            )}

            {view === 'result' && (
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
                    <AptAnalytics result={result} onRetry={() => setView('test')} onBack={() => { setView('main'); setActiveTab('overview'); }} />
                </div>
            )}
        </div>
        </ProctoringProvider>
    );
};

export default AptitudeDashboard;
