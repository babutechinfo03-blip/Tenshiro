import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'var(--bg-primary)',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--border)',
                borderTop: '3px solid var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

