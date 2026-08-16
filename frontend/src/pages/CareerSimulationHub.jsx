import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBuilding, FaLandmark, FaRocket, FaGraduationCap, FaCogs, FaPlay, FaShieldAlt } from 'react-icons/fa';
import './CareerSimulation.css';

const CareerSimulationHub = () => {
    const navigate = useNavigate();

    const modules = [
        {
            id: 'corporate',
            title: 'Corporate Interview',
            icon: <FaBuilding color="#3b82f6" />,
            desc: 'Simulate HR, Technical, and Managerial rounds for roles like Software Engineer, Data Analyst, and Product Manager.',
            tags: ['HR', 'Technical', 'Managerial']
        },
        {
            id: 'government',
            title: 'Government Panel',
            icon: <FaLandmark color="#10b981" />,
            desc: 'Formal panel interviews for UPSC, TNPSC, SSC, and Banking. Includes cross-questioning and current affairs.',
            tags: ['UPSC', 'Banking', 'Formal']
        },
        {
            id: 'startup',
            title: 'Startup & Pitch',
            icon: <FaRocket color="#f59e0b" />,
            desc: 'Defend your business plan to AI investors. Focuses on revenue models, market size, and scalability.',
            tags: ['Investor', 'Validation', 'Pitch']
        },
        {
            id: 'higher_studies',
            title: 'Higher Studies',
            icon: <FaGraduationCap color="#8b5cf6" />,
            desc: 'MBA admission panels, scholarship interviews, and university admission boards.',
            tags: ['MBA', 'Scholarship', 'Admission']
        },
        {
            id: 'engineering',
            title: 'Core Engineering',
            icon: <FaCogs color="#ef4444" />,
            desc: 'Deep technical vivas for Mechanical, Electrical, and Civil engineering roles.',
            tags: ['Viva', 'Technical', 'Core']
        }
    ];

    const startSimulation = (moduleId, title) => {
        // Navigate to the fullscreen simulation room with the selected module
        navigate('/simulation-room', { state: { moduleId, moduleTitle: title } });
    };

    return (
        <div className="career-sim-hub-container">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="career-sim-header"
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <FaShieldAlt size={32} color="#10b981" />
                    <h1 style={{ margin: 0 }}>Proctored Assessment Center</h1>
                </div>
                <p>Immerse yourself in AI-driven, highly realistic interview environments. All sessions are strictly proctored with face detection, audio monitoring, and environment lockdown to guarantee integrity.</p>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="sim-modules-grid"
            >
                {modules.map((mod, i) => (
                    <motion.div 
                        key={mod.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="sim-module-card"
                        onClick={() => startSimulation(mod.id, mod.title)}
                    >
                        <div className="sim-module-top">
                            <div className="sim-module-icon-wrapper">
                                {mod.icon}
                            </div>
                            <span className="proctored-badge">
                                <FaShieldAlt /> Proctored
                            </span>
                        </div>
                        <h3>{mod.title}</h3>
                        <p>{mod.desc}</p>
                        <div className="sim-module-tags">
                            {mod.tags.map(tag => (
                                <span key={tag} className="sim-tag">{tag}</span>
                            ))}
                        </div>
                        <button className="sim-start-btn">
                            <FaPlay size={12} /> Enter Assessment
                        </button>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default CareerSimulationHub;
