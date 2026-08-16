import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    FaBriefcase, FaMapMarkerAlt, FaMoneyBillWave, FaExternalLinkAlt,
    FaBookmark, FaCheck, FaTimes, FaClock, FaUserTie, FaFilter,
    FaLayerGroup, FaBolt, FaMagic, FaChartLine, FaUserGraduate
} from 'react-icons/fa';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const OpportunityCard = ({ job, index, onTrack, onUntrack, isTracked, t }) => (
    <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ y: -6 }}
        className="opportunity-card-elite"
    >
        <div className="card-header-elite">
            <span className={`type-badge-premium ${job.type}`}>
                {job.type}
            </span>
            {isTracked && <div className="tracked-label" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.7rem' }}>{t('jobs.tracked')}</div>}
        </div>

        <div className="card-title-elite">
            <h3>{job.title}</h3>
            <span className="company-name">{job.company}</span>
        </div>

        <div className="metadata-strip-elite">
            <div className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{job.location}</span>
            </div>
            <div className="meta-item">
                <FaMoneyBillWave className="meta-icon" />
                <span>{job.salary_range}</span>
            </div>
        </div>

        <div className="action-footer-elite">
            <a href={job.portal_link} target="_blank" rel="noopener noreferrer" className="btn-elite-outline">
                <FaExternalLinkAlt /> {t('jobs.applyNow')}
            </a>
            {isTracked ? (
                <button
                    onClick={() => onUntrack(job.id)}
                    className="btn-elite-outline"
                    style={{ borderColor: 'var(--primary)', color: 'var(--primary)', cursor: 'pointer' }}
                    title="Click to Unsave"
                >
                    <FaCheck /> {t('jobs.saved')}
                </button>
            ) : (
                <button onClick={() => onTrack(job.id)} className="btn-elite-primary">
                    <FaBookmark /> {t('jobs.save')}
                </button>
            )}
        </div>
    </Motion.div>
);

const ApplicationEliteCard = ({ application, index, onUpdateStage, stages, getStageColor, t }) => (
    <Motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="opportunity-card-elite"
        style={{ borderTop: `4px solid ${getStageColor(application.stage)}` }}
    >
        <div className="card-header-elite">
            <span className={`type-badge-premium ${application.type}`}>
                {application.type}
            </span>
        </div>

        <div className="card-title-elite">
            <h3>{application.title}</h3>
            <span className="company-name">{application.company}</span>
        </div>

        <div className="metadata-strip-elite">
            <div className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{application.location}</span>
            </div>
            <div className="meta-item">
                <FaMoneyBillWave className="meta-icon" />
                <span>{application.salary_range}</span>
            </div>
        </div>

        <div className="pipeline-stage-control" style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-low)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
                {t('jobs.pipelineStage')}
            </label>
            <div className="elite-action-row" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className="elite-select-wrapper" style={{ flex: 1, position: 'relative' }}>
                    <select
                        value={application.stage}
                        onChange={(e) => onUpdateStage(application.id, e.target.value)}
                        style={{
                            width: '100%', padding: '12px', borderRadius: '14px',
                            background: 'rgba(0,0,0,0.03)', border: `1.5px solid ${getStageColor(application.stage)}`,
                            color: getStageColor(application.stage), fontWeight: 700,
                            cursor: 'pointer', outline: 'none'
                        }}
                    >
                        {stages.filter(s => s.value !== 'all').map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </div>
                <a href={application.portal_link} target="_blank" rel="noopener noreferrer" className="btn-elite-outline" style={{ flex: 1, padding: '12px' }}>
                    <FaExternalLinkAlt /> {t('jobs.applyNow')}
                </a>
            </div>
        </div>
    </Motion.div>
);

const JobsInternships = () => {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const typeFilter = searchParams.get('type'); // 'internship' or 'job'

    const [allJobs, setAllJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStage, setSelectedStage] = useState('all');
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [jobsRes, appsRes, domainsRes] = await Promise.all([
                axios.get('/api/jobs'),
                axios.get('/api/applications'),
                axios.get('/api/domains')
            ]);

            const rolesRes = await Promise.all(domainsRes.data.map(domain =>
                axios.get(`/api/domains/${domain.id}/roles`)
            ));

            setAllJobs(jobsRes.data);
            setApplications(appsRes.data);
            const allRoles = rolesRes.flatMap(res => res.data);
            setRoles(allRoles);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const trackApplication = async (jobId, stage = 'saved') => {
        try {
            await axios.post('/api/applications', { job_id: jobId, stage });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const untrackApplication = async (jobId) => {
        try {
            const app = applications.find(a => a.job_id === jobId);
            if (app) {
                await axios.delete(`/api/applications/${app.id}`);
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateStage = async (appId, newStage) => {
        try {
            await axios.put(`/api/applications/${appId}`, { stage: newStage });
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const filteredJobs = allJobs.filter(job =>
        (selectedRole === 'all' || job.role_id === parseInt(selectedRole))
    );

    const filteredApplications = applications.filter(app =>
        (selectedStage === 'all' || app.stage === selectedStage)
    );

    const stages = [
        { value: 'all', label: t('jobs.stages.discovery'), icon: <FaMagic />, color: 'var(--primary)' },
        { value: 'saved', label: t('jobs.stages.saved'), icon: <FaBookmark />, color: '#1A3263' }
    ];

    const getStageColor = (stage) => {
        const stageObj = stages.find(s => s.value === stage);
        return stageObj?.color || 'var(--text-muted)';
    };

    if (loading) return (
        <div className="discovery-loader">
            <Motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="loader-spinner"
            />
            <p style={{ marginTop: '1rem', fontWeight: 600 }}>{t('domains.loading')}</p>
        </div>
    );

    return (
        <div className="jobs-discovery-page">
            <div className="discovery-bg-elements">
                <div className="discovery-blob blob-1" />
                <div className="discovery-blob blob-2" />
            </div>

            {/* HERO HEADER SECTION (Elite Minimal) */}
            <header className="discovery-header-minimal">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hero-inner-minimal"
                >
                    <div className="hero-badge">
                        {typeFilter === 'internship' ? <FaUserGraduate /> : <FaBriefcase />}
                        <span>{typeFilter === 'internship' ? 'Internships Lab' : typeFilter === 'job' ? 'Full-Time Jobs' : t('jobs.badge')}</span>
                    </div>
                    <h1 dangerouslySetInnerHTML={{
                        __html:
                            typeFilter === 'internship' ? 'Discover Your Next <span class="text-gradient">Elite Internship</span>' :
                                typeFilter === 'job' ? 'Launch Your <span class="text-gradient">Full-Time Career</span>' :
                                    t('jobs.title')
                    }}></h1>
                    <p>
                        {typeFilter === 'internship' ? 'Find high-impact internships to build your professional foundation and skills.' :
                            typeFilter === 'job' ? 'Connect with global opportunities that match your expertise and ambitions.' :
                                t('jobs.subtitle')}
                    </p>
                </Motion.div>
            </header>

            {/* PIPELINE NAVIGATION & FILTERS */}
            <div className="pipeline-control-system">
                <div className="pipeline-status-tabs">
                    {stages.map(stage => (
                        <button
                            key={stage.value}
                            onClick={() => setSelectedStage(stage.value)}
                            className={`pipeline-tab ${selectedStage === stage.value ? 'active' : ''}`}
                            style={{ '--accent-color': stage.color }}
                        >
                            <span className="tab-icon">{stage.icon}</span>
                            <span className="tab-label">{stage.label}</span>
                            {stage.value !== 'all' && (
                                <span className="tab-count">{applications.filter(a => a.stage === stage.value).length}</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="filter-dropdown-elite">
                    <FaFilter className="filter-icon" />
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="all">{t('jobs.allRoles')}</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.title}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <AnimatePresence mode="wait">
                <Motion.div
                    key={selectedStage}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {selectedStage === 'all' ? (
                        <div className="opportunities-discovery">
                            <h2 className="section-title-elite">{t('jobs.available')}</h2>
                            <div className="discovery-dual-grid" style={{
                                gridTemplateColumns: (!typeFilter || typeFilter === 'all') ? '1fr 1fr' : '1fr',
                                maxWidth: (!typeFilter || typeFilter === 'all') ? '1200px' : '1400px'
                            }}>
                                {/* INTERNSHIPS COLUMN */}
                                {(!typeFilter || typeFilter === 'internship' || typeFilter === 'all') && (
                                    <div className="discovery-column">
                                        <h3 className="column-header">
                                            <FaBolt className="header-icon internship" />
                                            {t('jobs.internships')}
                                            <span className="count-pill">{filteredJobs.filter(job => job.type === 'internship').length}</span>
                                        </h3>
                                        <div className="opportunities-stack">
                                            {filteredJobs.filter(job => job.type === 'internship').map((job, idx) => (
                                                <OpportunityCard
                                                    key={job.id}
                                                    job={job}
                                                    index={idx}
                                                    onTrack={trackApplication}
                                                    onUntrack={untrackApplication}
                                                    isTracked={applications.some(a => a.job_id === job.id)}
                                                    t={t}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* JOBS COLUMN */}
                                {(!typeFilter || typeFilter === 'job' || typeFilter === 'all') && (
                                    <div className="discovery-column">
                                        <h3 className="column-header">
                                            <FaBriefcase className="header-icon job" />
                                            {t('jobs.fullTime')}
                                            <span className="count-pill">{filteredJobs.filter(job => job.type === 'job').length}</span>
                                        </h3>
                                        <div className="opportunities-stack">
                                            {filteredJobs.filter(job => job.type === 'job').map((job, idx) => (
                                                <OpportunityCard
                                                    key={job.id}
                                                    job={job}
                                                    index={idx}
                                                    onTrack={trackApplication}
                                                    onUntrack={untrackApplication}
                                                    isTracked={applications.some(a => a.job_id === job.id)}
                                                    t={t}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="pipeline-view">
                            <h2 className="section-title-elite">
                                {t('jobs.pipeline', { stage: stages.find(s => s.value === selectedStage)?.label })}
                            </h2>
                            <div className="pipeline-grid">
                                {filteredApplications.map((app, idx) => (
                                    <ApplicationEliteCard
                                        key={app.id}
                                        index={idx}
                                        application={app}
                                        onUpdateStage={updateStage}
                                        stages={stages}
                                        getStageColor={getStageColor}
                                        t={t}
                                    />
                                ))}
                            </div>
                            {filteredApplications.length === 0 && (
                                <div className="empty-pipeline-state">
                                    <FaBriefcase className="empty-icon" />
                                    <p dangerouslySetInnerHTML={{ __html: t('jobs.noApps', { stage: selectedStage }) }}></p>
                                </div>
                            )}
                        </div>
                    )}
                </Motion.div>
            </AnimatePresence>

            <style>{`
                .jobs-discovery-page {
                    position: relative;
                    padding: 15px 0 40px;
                    min-height: 100vh;
                    z-index: 1;
                }

                .discovery-bg-elements { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
                .discovery-blob { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.08; }
                .blob-1 { width: 600px; height: 600px; background: var(--primary); top: -200px; right: -200px; }
                .blob-2 { width: 400px; height: 400px; background: var(--accent); bottom: -100px; left: -100px; }

                /* HERO SECTION */
                .discovery-header-minimal {
                    margin-bottom: 15px;
                    padding: 0 0 5px;
                }
                .hero-inner-minimal { max-width: 1200px; padding: 0 40px; }
                .hero-badge {
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 4px 10px; background: rgba(99, 102, 241, 0.1);
                    border-radius: 100px; color: var(--primary); font-size: 0.75rem;
                    font-weight: 700; margin-bottom: 8px; margin-top: -10px;
                }
                .discovery-header-minimal h1 { font-size: 2.6rem; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 6px; }
                .discovery-header-minimal p { 
                    font-size: 1.05rem; color: var(--text-muted); line-height: 1.4;
                    border-left: 2px solid var(--primary); padding-left: 15px;
                    background: linear-gradient(90deg, rgba(99, 102, 241, 0.05), transparent);
                    display: inline-block;
                }

                /* PIPELINE CONTROL SYSTEM */
                .pipeline-control-system {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 30px; max-width: 1200px; margin-left: auto; margin-right: auto; padding: 0 20px;
                    gap: 15px; flex-wrap: wrap;
                }
                .pipeline-status-tabs {
                    display: flex; gap: 8px; overflow-x: auto; padding: 6px;
                    background: var(--bg-glass); border: 1px solid var(--border);
                    border-radius: 18px; backdrop-filter: blur(20px);
                    scrollbar-width: none;
                }
                .pipeline-status-tabs::-webkit-scrollbar { display: none; }
                
                .pipeline-tab {
                    display: flex; align-items: center; gap: 8px; padding: 8px 16px;
                    background: transparent; border: 1px solid transparent; border-radius: 12px;
                    color: var(--text-muted); cursor: pointer; transition: all 0.3s;
                    white-space: nowrap; font-weight: 600; font-size: 0.85rem;
                }
                .pipeline-tab.active {
                    background: rgba(0,0,0,0.03); border-color: var(--border);
                    color: var(--accent-color);
                }
                .tab-count {
                    background: var(--accent-color); color: white; padding: 1px 8px;
                    border-radius: 100px; font-size: 0.75rem; font-weight: 800;
                }

                .filter-dropdown-elite {
                    position: relative; display: flex; align-items: center; gap: 10px;
                    padding: 10px 18px; background: var(--bg-glass); border: 1px solid var(--border);
                    border-radius: 16px; min-width: 230px;
                }
                .filter-dropdown-elite select {
                    background: transparent; border: none; color: var(--text-main);
                    font-size: 0.95rem; font-weight: 700; cursor: pointer; outline: none; width: 100%;
                }
                .filter-icon { color: var(--primary); }

                /* DUAL GRID LAYOUT */
                .discovery-dual-grid {
                    display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
                    max-width: 1200px; margin: 0 auto; padding: 0 20px;
                }
                
                /* When filtered to a single type, use a fixed 4-column grid */
                .discovery-dual-grid:not([style*="1fr 1fr"]) .opportunities-stack {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                }

                @media (max-width: 1400px) {
                    .discovery-dual-grid:not([style*="1fr 1fr"]) .opportunities-stack {
                         grid-template-columns: repeat(3, 1fr);
                    }
                }
                @media (max-width: 1100px) {
                    .discovery-dual-grid:not([style*="1fr 1fr"]) .opportunities-stack {
                         grid-template-columns: repeat(2, 1fr);
                    }
                }
                @media (max-width: 768px) {
                    .discovery-dual-grid:not([style*="1fr 1fr"]) .opportunities-stack {
                         grid-template-columns: 1fr;
                    }
                }

                .discovery-column { display: flex; flex-direction: column; gap: 20px; }
                .column-header {
                    font-size: 1.25rem; font-weight: 800; display: flex; align-items: center; gap: 10px;
                    margin-bottom: 8px; color: var(--text-main); letter-spacing: -0.02em;
                }
                .header-icon.internship { color: var(--accent); }
                .header-icon.job { color: var(--primary); }
                .count-pill {
                    font-size: 0.8rem; padding: 4px 12px; background: rgba(0,0,0,0.05);
                    border-radius: 100px; color: var(--text-muted); font-weight: 700;
                }

                .section-title-elite {
                    font-size: 1.7rem; font-weight: 800; margin-bottom: 25px;
                    max-width: 1200px; margin-left: auto; margin-right: auto; padding: 0 20px;
                }

                /* PIPELINE VIEW */
                .pipeline-grid {
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                    gap: 24px; max-width: 1200px; margin: 0 auto; padding: 0 20px;
                }
                .empty-pipeline-state {
                    text-align: center; padding: 60px 0; color: var(--text-low);
                }
                .empty-icon { font-size: 3rem; margin-bottom: 15px; opacity: 0.2; }

                /* ELITE CARD STYLES */
                .opportunity-card-elite {
                    position: relative; background: var(--bg-glass); backdrop-filter: blur(40px);
                    border: 1px solid var(--border); border-radius: 22px; padding: 22px;
                    display: flex; flex-direction: column; gap: 14px; overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .opportunity-card-elite:hover {
                    y: -6; box-shadow: 0 30px 60px -15px rgba(0,0,0,0.1);
                    border-color: var(--primary);
                }
                .card-header-elite { display: flex; justify-content: space-between; align-items: flex-start; }
                .type-badge-premium {
                    padding: 5px 14px; border-radius: 100px; font-size: 0.7rem; font-weight: 800;
                    text-transform: uppercase; letter-spacing: 0.05em;
                }
                .type-badge-premium.internship { background: rgba(139, 92, 246, 0.1); color: var(--accent); }
                .type-badge-premium.job { background: rgba(99, 102, 241, 0.1); color: var(--primary); }

                .card-title-elite h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 4px; letter-spacing: -0.02em; }
                .card-title-elite .company-name { color: var(--primary); font-weight: 700; font-size: 1rem; }

                .metadata-strip-elite { display: flex; gap: 16px; flex-wrap: wrap; }
                .meta-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: var(--text-muted); font-weight: 500; }
                .meta-icon { opacity: 0.6; color: var(--primary); }

                .action-footer-elite { display: flex; gap: 12px; margin-top: 10px; }
                .btn-elite-outline {
                    flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px;
                    padding: 12px; border-radius: 14px; border: 1.5px solid var(--border);
                    color: var(--text-main); font-weight: 700; font-size: 0.85rem;
                    text-decoration: none; transition: all 0.3s;
                }
                .btn-elite-outline:hover { background: rgba(0,0,0,0.02); border-color: var(--text-main); }
                
                .btn-elite-primary {
                    flex: 1; display: flex; align-items: center; justify-content: center; gap: 10px;
                    padding: 12px; border-radius: 14px; border: none;
                    background: linear-gradient(135deg, var(--primary), var(--accent));
                    color: white; font-weight: 700; font-size: 0.85rem;
                    cursor: pointer; transition: all 0.3s;
                }
                .btn-elite-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 20px -5px var(--primary-glow); }

                /* LOADER */
                .discovery-loader { min-height: 400px; display: flex; align-items: center; justify-content: center; }
                .loader-spinner { width: 50px; height: 50px; border: 4px solid var(--border); border-top-color: var(--primary); border-radius: 50%; }

                .text-gradient {
                    background: linear-gradient(to right, var(--primary), var(--accent));
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }

                @media (max-width: 992px) {
                    .discovery-dual-grid { grid-template-columns: 1fr; }
                    .pipeline-control-system { flex-direction: column; align-items: stretch; }
                    .pipeline-status-tabs { order: 2; }
                    .filter-dropdown-elite { order: 1; margin-bottom: 20px; }
                    .discovery-header-minimal h1 { font-size: 2.2rem; }
                }
            `}</style>
        </div>
    );
};

export default JobsInternships;
