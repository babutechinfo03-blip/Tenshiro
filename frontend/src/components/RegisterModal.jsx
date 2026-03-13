import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGoogle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await register(formData);
            onClose(); // Close modal on success
            navigate('/login'); // Or to /domains if registration auto-logs in
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setIsLoading(false);
        }
    };

    const welcomeText = t('auth.registerTitle') !== 'auth.registerTitle' ? t('auth.registerTitle') : 'Create Account';
    const usernamePrompt = t('auth.username') !== 'auth.username' ? t('auth.username') : 'Username';
    const emailPrompt = t('auth.email') !== 'auth.email' ? t('auth.email') : 'Email Address';
    const passPrompt = t('auth.password') !== 'auth.password' ? t('auth.password') : 'Password';
    const submitText = t('auth.submit') !== 'auth.submit' ? t('auth.submit') : 'Sign Up';
    const loginText = t('auth.login') !== 'auth.login' ? t('auth.login') : 'Login';
    const hasAccountText = 'Already have an account?';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(15, 23, 42, 0.6)',
                            backdropFilter: 'blur(8px)',
                            zIndex: 999
                        }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        style={{
                            position: 'fixed',
                            top: '1.5rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '90%',
                            maxWidth: '420px',
                            maxHeight: 'calc(100vh - 3rem)',
                            overflowY: 'auto',
                            background: 'var(--bg-glass)',
                            border: '1px solid var(--border)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-muted)',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                transition: 'color 0.2s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
                            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                        >
                            <FaTimes />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                {welcomeText}
                            </h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Join the community of future leaders</p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.2rem' }}>{usernamePrompt}</label>
                                <div style={{ position: 'relative' }}>
                                    <FaUser style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem 1rem 0.9rem 2.8rem',
                                            borderRadius: '12px',
                                            border: '1.5px solid var(--border)',
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.2rem' }}>{emailPrompt}</label>
                                <div style={{ position: 'relative' }}>
                                    <FaEnvelope style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="name@example.com"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem 1rem 0.9rem 2.8rem',
                                            borderRadius: '12px',
                                            border: '1.5px solid var(--border)',
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '0.2rem' }}>{passPrompt}</label>
                                <div style={{ position: 'relative' }}>
                                    <FaLock style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.9rem 1rem 0.9rem 2.8rem',
                                            borderRadius: '12px',
                                            border: '1.5px solid var(--border)',
                                            background: 'var(--bg-card)',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{ color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '10px' }}>
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                                    color: 'white',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '1.05rem',
                                    fontWeight: 700,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 10px 20px -5px var(--primary-glow)',
                                    transition: 'all 0.3s',
                                    marginTop: '0.5rem',
                                    opacity: isLoading ? 0.7 : 1
                                }}
                                onMouseOver={(e) => { if (!isLoading) e.currentTarget.style.transform = 'translateY(-2px)' }}
                                onMouseOut={(e) => { if (!isLoading) e.currentTarget.style.transform = 'translateY(0)' }}
                            >
                                {isLoading ? 'Creating account...' : submitText}
                            </button>
                        </form>

                        <div style={{ position: 'relative', textAlign: 'center', margin: '0.5rem 0' }}>
                            <div style={{ position: 'absolute', left: 0, top: '50%', width: '100%', height: '1px', background: 'var(--border)' }}></div>
                            <span style={{ position: 'relative', background: 'var(--bg-glass)', padding: '0 1rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>OR</span>
                        </div>

                        <button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1.5px solid var(--border)',
                                background: 'transparent',
                                color: 'var(--text-main)',
                                fontSize: '1rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <FaGoogle /> Continue with Google
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            {hasAccountText} <span onClick={onLoginClick} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, cursor: 'pointer' }}>{loginText}</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RegisterModal;
