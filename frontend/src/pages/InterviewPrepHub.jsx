import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RoundDashboard from '../components/interview/RoundDashboard';
import {
    FaLaptopCode, FaCogs, FaGavel, FaUniversity, FaUserTie, FaBuilding,
    FaHeartbeat, FaGraduationCap, FaPalette, FaRocket, FaCheckCircle,
    FaChevronRight, FaRedo, FaArrowRight
} from 'react-icons/fa';
import './InterviewPrepHub.css';

const sectors = [
    { id: 'IT', icon: <FaLaptopCode />, color: '#6366f1' },
    { id: 'Core', icon: <FaCogs />, color: '#8b5cf6' },
    { id: 'Govt', icon: <FaGavel />, color: '#f59e0b' },
    { id: 'Banking', icon: <FaUniversity />, color: '#1A3263' },
    { id: 'Consulting', icon: <FaUserTie />, color: '#ec4899' },
    { id: 'Product', icon: <FaBuilding />, color: '#06b6d4' },
    { id: 'Healthcare', icon: <FaHeartbeat />, color: '#ef4444' },
    { id: 'EdTech', icon: <FaGraduationCap />, color: '#f97316' },
    { id: 'Design', icon: <FaPalette />, color: '#8b5cf6' }
];

const sectorOptions = {
    IT: {
        roles: [
            'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
            'Data Analyst', 'Data Scientist', 'DevOps Engineer',
            'Cloud Engineer', 'AI / ML Engineer', 'Cybersecurity Analyst',
            'QA / Test Engineer', 'Mobile App Developer', 'Software Engineer',
            'System Design Engineer', 'UI/UX Designer', 'Site Reliability Engineer',
            'Blockchain Developer', 'AR/VR Developer', 'Embedded Systems Engineer',
            'Database Administrator', 'IT Support Engineer', 'Solutions Architect',
            'Technical Support Engineer'
        ],
        companies: [
            'Amazon', 'Microsoft', 'Google', 'Meta', 'Apple', 'Nvidia', 'Qualcomm', 'Oracle', 'IBM', 'Adobe', 'Salesforce', // Tech Giants
            'TCS', 'Infosys', 'Wipro', 'HCL', 'Tech Mahindra', 'LTIMindtree', 'Cognizant', 'DXC Technology', 'Hexaware', 'Mphasis', 'Mindtree', 'UST Global', // Service/MNC
            'Zoho', 'Freshworks', 'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'Razorpay', 'PhonePe', 'Meesho', 'Atlassian', 'ServiceNow', 'SAP Labs' // Product/SaaS
        ]
    },
    Core: {
        roles: [
            'Mechanical Engineer', 'Civil Engineer', 'Electrical Engineer',
            'Electronics Engineer', 'Production Engineer', 'Quality Engineer',
            'Design Engineer', 'Maintenance Engineer', 'Structural Engineer',
            'Thermal Engineer', 'HVAC Engineer', 'Automobile Engineer',
            'Robotics Engineer', 'Power Plant Engineer', 'Tool Design Engineer'
        ],
        companies: [
            'L&T', 'Larsen & Toubro Heavy', 'Bosch', 'Siemens', 'ABB', 'Schneider Electric', 'Honeywell', // Engineering
            'Tata Steel', 'JSW Steel', 'Mahindra', 'Hyundai Engineering', 'Renault Nissan', 'TVS Motors', 'Ashok Leyland', // Auto/Steel
            'BHEL', 'ISRO', 'DRDO', 'GAIL', 'IOCL', 'ONGC', 'NTPC', 'Saint Gobain' // PSU/Core
        ]
    },
    Govt: {
        roles: [
            'SSC CGL', 'SSC CHSL', 'UPSC Civil Services', 'TNPSC', 'State PSC',
            'Railway RRB', 'Bank PO', 'SBI Clerk', 'RBI Grade B', 'NABARD',
            'LIC AAO', 'Defence Exams', 'Police Sub Inspector', 'Income Tax Inspector',
            'Excise Officer', 'Assistant Section Officer', 'Assistant Audit Officer',
            'Intelligence Bureau Officer', 'Forest Officer', 'Village Administrative Officer',
            'Sub Registrar', 'Customs Officer'
        ],
        companies: [] // Role-based only
    },
    Banking: {
        roles: [
            'Bank PO', 'Clerk', 'RBI Grade B', 'Investment Analyst',
            'Financial Analyst', 'Risk Analyst', 'Credit Officer', 'Relationship Manager',
            'Treasury Analyst', 'Compliance Officer', 'Audit Executive',
            'Loan Processing Officer', 'Equity Research Analyst', 'Mutual Fund Advisor',
            'Chartered Accountant Track', 'Insurance Development Officer'
        ],
        companies: [
            'SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'HSBC', 'Citi Bank', 'Yes Bank', 'IndusInd Bank', // Banks
            'RBI', 'NABARD', 'SEBI', 'Goldman Sachs', 'Morgan Stanley', 'JP Morgan', // Institutions
            'LIC', 'SBI Life', 'ICICI Prudential' // Insurance
        ]
    },
    Consulting: {
        roles: [
            'Business Analyst', 'Strategy Consultant', 'Operations Consultant',
            'Product Manager', 'Associate Consultant', 'Management Trainee',
            'Market Research Analyst', 'Supply Chain Analyst', 'Program Manager',
            'Business Operations Analyst', 'Corporate Strategy Associate'
        ],
        companies: [
            'McKinsey', 'BCG', 'Bain', 'Bain Capability Network', 'Deloitte', 'Deloitte USI',
            'EY', 'EY GDS', 'PwC', 'PwC SDC', 'KPMG', 'Accenture Consulting',
            'ZS Associates', 'Tata Strategic', 'Infosys Consulting'
        ]
    },
    Product: {
        roles: [
            'SDE 1', 'SDE 2', 'Product Engineer', 'System Design Engineer',
            'Platform Engineer', 'AI Engineer', 'Founding Engineer',
            'Growth Engineer', 'Product Analyst', 'Startup Operations Associate'
        ],
        companies: [
            'Amazon', 'Microsoft', 'Google', 'Meta', 'Apple', 'Netflix', 'Uber', 'Atlassian', 'Adobe', 'Salesforce', // Giants
            'CRED', 'Groww', 'Zerodha', 'Ola', 'Byju’s', 'Unacademy', 'Chargebee', 'Postman' // Startups
        ]
    },
    Healthcare: {
        roles: [
            'Biomedical Engineer', 'Clinical Data Analyst',
            'Medical Coding Specialist', 'Regulatory Affairs Executive'
        ],
        companies: [
            'Apollo Hospitals', 'Dr. Reddy’s', 'Biocon', 'Cipla', 'Pfizer India'
        ]
    },
    EdTech: {
        roles: [
            'Academic Content Developer', 'Curriculum Designer',
            'EdTech Product Manager', 'Instructional Designer'
        ],
        companies: [
            'Byju’s', 'Unacademy', 'PhysicsWallah', 'Vedantu'
        ]
    },
    Design: {
        roles: [
            'Graphic Designer', 'Motion Designer',
            'Video Editor', 'Creative Strategist', 'Brand Designer'
        ],
        companies: [
            'Dentsu', 'Ogilvy', 'TCS Design Studio', 'Zoho Design', 'Canva India'
        ]
    }
};

const InterviewPrepHub = () => {
    const { t } = useLanguage();
    const [selectedSector, setSelectedSector] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [view, setView] = useState('hub'); // 'hub', 'dashboard'

    const roleRef = useRef(null);
    const companyRef = useRef(null);

    const handleSectorSelect = (sectorId) => {
        setSelectedSector(sectorId);
        setSelectedRole(null);
        setSelectedCompany(null);
        setTimeout(() => roleRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    const handleRoleSelect = (roleName) => {
        setSelectedRole(roleName);
        setSelectedCompany(null);

        // Skip company for Govt sector
        if (selectedSector === 'Govt') {
            setSelectedCompany('Government Board'); // Generic internal label
        } else {
            setTimeout(() => companyRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
    };

    const handleCompanySelect = (companyName) => {
        setSelectedCompany(companyName);
    };

    const handleEnterDashboard = () => {
        if (selectedSector && selectedRole && selectedCompany) {
            setView('dashboard');
        }
    };

    const handleReset = () => {
        setSelectedSector(null);
        setSelectedRole(null);
        setSelectedCompany(null);
        setView('hub');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="prep-hub-page">
            <header className="prep-header">
                <h1>{t('interview.hubTitle')}</h1>
                <p className="subtitle">{t('interview.hubSubtitle')}</p>

                {(selectedSector || view === 'dashboard') && (
                    <div className="prep-breadcrumbs animate-in">
                        <span className="crumb" onClick={handleReset}>{t('sidebar.interviewPrep')}</span>
                        {selectedSector && (
                            <>
                                <FaChevronRight className="crumb-sep" />
                                <span className="crumb" onClick={() => { setSelectedRole(null); setSelectedCompany(null); setView('hub'); }}>
                                    {t(`interview.sectors.${selectedSector}`)}
                                </span>
                            </>
                        )}
                        {selectedRole && (
                            <>
                                <FaChevronRight className="crumb-sep" />
                                <span className="crumb" onClick={() => { setSelectedCompany(null); setView('hub'); }}>{selectedRole}</span>
                            </>
                        )}
                        {selectedCompany && selectedSector !== 'Govt' && (
                            <>
                                <FaChevronRight className="crumb-sep" />
                                <span className="crumb active">{selectedCompany}</span>
                            </>
                        )}
                    </div>
                )}
            </header>

            <main className="prep-container">
                {view === 'hub' ? (
                    <div className="hub-selection-flow">
                        {/* SECTION 1: SECTOR */}
                        <section className="selection-section animate-in">
                            <h3>{t('interview.selectSector')}</h3>
                            <div className="sector-grid">
                                {sectors.map(s => (
                                    <div
                                        key={s.id}
                                        className={`sector-card ${selectedSector === s.id ? 'active' : ''}`}
                                        onClick={() => handleSectorSelect(s.id)}
                                        style={{ '--accent-color': s.color }}
                                    >
                                        <div className="sector-icon">{s.icon}</div>
                                        <span>{t(`interview.sectors.${s.id}`)}</span>
                                        {selectedSector === s.id && <FaCheckCircle className="selection-badge" />}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION 2: ROLE */}
                        {selectedSector && (
                            <section className="selection-section animate-slide-up" ref={roleRef}>
                                <div className="section-divider"></div>
                                <h3>{t('interview.selectRole')}</h3>
                                <div className="option-list">
                                    {sectorOptions[selectedSector].roles.map(r => (
                                        <div
                                            key={r}
                                            className={`option-card ${selectedRole === r ? 'active' : ''}`}
                                            onClick={() => handleRoleSelect(r)}
                                        >
                                            <span className="option-text">{r}</span>
                                            {selectedRole === r && <FaCheckCircle className="selection-badge-small" />}
                                        </div>
                                    ))}
                                </div>

                                {selectedSector === 'Govt' && selectedRole && (
                                    <div className="submit-container animate-fade-in">
                                        <button
                                            className="btn-primary start-prep-btn"
                                            onClick={handleEnterDashboard}
                                        >
                                            {t('interview.enterHub')} <FaArrowRight />
                                        </button>
                                        <button className="btn-outline reset-btn" onClick={handleReset}>
                                            <FaRedo /> {t('interview.changeSelection')}
                                        </button>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* SECTION 3: COMPANY */}
                        {selectedRole && selectedSector !== 'Govt' && (
                            <section className="selection-section animate-slide-up" ref={companyRef}>
                                <div className="section-divider"></div>
                                <h3>{t('interview.selectCompany')}</h3>
                                <div className="option-list companies">
                                    {sectorOptions[selectedSector].companies.map(c => (
                                        <div
                                            key={c}
                                            className={`option-card company ${selectedCompany === c ? 'active' : ''}`}
                                            onClick={() => handleCompanySelect(c)}
                                        >
                                            <span className="option-text">{c}</span>
                                            {selectedCompany === c && <FaCheckCircle className="selection-badge-small" />}
                                        </div>
                                    ))}
                                </div>

                                <div className="submit-container animate-fade-in">
                                    <button
                                        className="btn-primary start-prep-btn"
                                        onClick={handleEnterDashboard}
                                        disabled={!selectedCompany}
                                    >
                                        {t('interview.enterHub')} <FaArrowRight />
                                    </button>
                                    <button className="btn-outline reset-btn" onClick={handleReset}>
                                        <FaRedo /> {t('interview.changeSelection')}
                                    </button>
                                </div>
                            </section>
                        )}
                    </div>
                ) : (
                    <RoundDashboard
                        selection={{ sector: selectedSector, role: selectedRole, company: selectedCompany }}
                        onBack={handleReset}
                    />
                )}
            </main>
        </div>
    );
};

export default InterviewPrepHub;
