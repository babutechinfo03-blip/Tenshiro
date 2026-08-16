import { ALL_TEMPLATES } from './data';

export const RESUME_SECTORS = [
    { id: 'it', label: 'IT / Software', icon: '💻', color: '#6366f1', description: 'Amazon, Google, TCS, Startups, and FAANG formats' },
    { id: 'core', label: 'Core Engineering', icon: '⚙️', color: '#06b6d4', description: 'Mechanical, Civil, EEE, ECE, and Manufacturing' },
    { id: 'govt', label: 'Government', icon: '🏛️', color: '#ef4444', description: 'UPSC, SSC, Banking PO, and State Govt formats' },
    { id: 'banking', label: 'Banking & Finance', icon: '🏦', color: '#1A3263', description: 'IB, Risk, FinTech, and CA specialized formats' },
    { id: 'mgmt', label: 'MBA / Management', icon: '👔', color: '#a855f7', description: 'Product Mgmt, Consulting, and Strategy formats' }
];

export const RESUME_TEMPLATES = ALL_TEMPLATES;

export const RESUME_SECTIONS = [
    { id: 'personal', label: 'Personal Information', icon: '👤', required: true },
    { id: 'objective', label: 'Career Summary', icon: '🎯', aiSupport: true },
    { id: 'experience', label: 'Work Experience', icon: '💼', multi: true, aiSupport: true },
    { id: 'projects', label: 'Key Projects', icon: '🚀', multi: true, aiSupport: true },
    { id: 'skills', label: 'Skills & Tech', icon: '🛠️', multi: true },
    { id: 'education', label: 'Education', icon: '🎓', multi: true, required: true },
    { id: 'certifications', label: 'Certifications', icon: '📜', multi: true },
    { id: 'achievements', label: 'Achievements', icon: '🏆', multi: true },
    { id: 'extra', label: 'Extra Curricular', icon: '🌟', multi: true }
];

export const COMPANY_RESUME_KEYWORDS = {
    // IT / FAANG
    Amazon: ['Customer Obsession', 'Leadership Principles', 'Ownership', 'Bias for Action', 'Scalability', 'Distributed Systems', 'Cloud Computing', 'Innovation', 'Deep Dive'],
    Google: ['Impact', 'Algorithmic Complexity', 'Data Structures', 'Scale', 'Collaboration', 'Open Source', 'System Design', 'Performance Optimization'],
    Microsoft: ['Cloud Native', 'Azure', 'Accessibility', 'Growth Mindset', 'Collaboration', 'Impact', 'Customer Focus', 'Enterprise Software'],
    Meta: ['Move Fast', 'Impact', 'Connectivity', 'Social Graph', 'Open Source', 'Scalability', 'Product Thinking'],
    Netflix: ['Freedom and Responsibility', 'Performance', 'Scalability', 'Entertainment Tech', 'Microservices'],

    // Service MNC
    TCS: ['Agile', 'SDLC', 'Quality', 'Client Satisfaction', 'Teamwork', 'Operational Excellence', 'Digital Transformation'],
    Infosys: ['Digital Transformation', 'Operational Excellence', 'Learning', 'Efficiency', 'Sustainability', 'Global Delivery'],
    Wipro: ['Modernization', 'Cloud Transformation', 'DevOps', 'Cyber Security', 'Digital Operations'],
    Cognizant: ['Full Stack', 'Cloud First', 'Modernization', 'Domain Expertise', 'Customer Experience'],
    Accenture: ['Strategy', 'Automation', 'Cloud First', 'Industry 4.0', 'Transformation', 'Value Creation'],

    // Product / Startup
    Zoho: ['Product Design', 'SaaS', 'Privacy', 'Innovation', 'UI/UX', 'Cloud Suite', 'Scalable Architecture'],
    Freshworks: ['Customer Choice', 'SaaS', 'User Engagement', 'Delight', 'Scale', 'Product Innovation'],
    Startup: ['Fast-paced', 'Ownership', 'MVP', 'Growth', 'Scale', 'Versatility', 'Problem Solving'],

    // Core Engineering
    'L&T': ['EPC', 'Safety Management', 'Project Completion', 'Engineering Design', 'Optimization', 'Infrastructure'],
    'Tata Steel': ['Manufacturing', 'Efficiency', 'Safety', 'Operations', 'Production Planning', 'Metallurgy'],
    Bosch: ['Automotive Systems', 'Innovation', 'Quality Systems', 'Embedded Systems', 'IoT'],
    Engineering: ['Problem Solving', 'Design Optimization', 'Troubleshooting', 'Prototyping', 'Testing'],
    Construction: ['Site Management', 'Safety Compliance', 'Structural Integrity', 'Project Timeline'],

    // Govt
    UPSC: ['Administration', 'Policy Analysis', 'Public Service', 'Integrity', 'Leadership', 'Decision Making'],
    SSC: ['Quantitative Aptitude', 'Reasoning', 'General Awareness', 'Administrative Support'],
    Judicial: ['Legal Research', 'Documentation', 'Case Management', 'Civil Law', 'Criminal Law'],
    Defense: ['Discipline', 'Tactical Operations', 'Fitness', 'Strategic Thinking', 'National Security'],

    // Banking & Finance
    'Goldman Sachs': ['Excellence', 'Client Service', 'Integrity', 'Teamwork', 'Financial Modeling', 'Market Analysis'],
    'JP Morgan': ['Risk Management', 'Compliance', 'Investment Strategy', 'Asset Management', 'Banking Operations'],
    'Morgan Stanley': ['Strategy', 'Equity Research', 'Capital Markets', 'Wealth Management'],
    HDFC: ['Retail Banking', 'Customer Acquisition', 'Credit Appraisal', 'Compliance', 'Risk Assessment'],
    Big4: ['Audit', 'Taxation', 'Advisory', 'Compliance', 'Due Diligence', 'Financial Reporting'],

    // Management
    McKinsey: ['Problem Solving', 'Strategic Transformation', 'Value Creation', 'Analytical Thinking', 'Stakeholder Management'],
    'Unilever': ['Brand Building', 'FMCG', 'Consumer Insight', 'Market Share', 'Sustainability'],
    'Salesforce': ['Customer Success', 'CRM', 'B2B Sales', 'Cloud Ecosystem', 'Business Value']
};

export const FONT_OPTIONS = [
    { label: 'Inter (Modern)', value: "'Inter', sans-serif" },
    { label: 'Outfit (Sleek)', value: "'Outfit', sans-serif" },
    { label: 'Roboto (Standard)', value: "'Roboto', sans-serif" },
    { label: 'Times New Roman (Formal)', value: "'Times New Roman', serif" },
    { label: 'Georgia (Academic)', value: "Georgia, serif" }
];
