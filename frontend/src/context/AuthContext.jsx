import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure Axios
    axios.defaults.headers.common['Content-Type'] = 'application/json';

    useEffect(() => {
        console.log('🔐 Auth: Initializing...');
        const token = localStorage.getItem('token');

        // Safety timeout to ensure app renders even if fetch hangs
        const safetyTimeout = setTimeout(() => {
            if (loading) {
                console.warn('⚠️ Auth: Safety timeout triggered. Rendering app.');
                setLoading(false);
            }
        }, 3000);

        if (token) {
            console.log('🔐 Auth: Token found, fetching user...');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            console.log('🔐 Auth: No token found.');
            setLoading(false);
        }

        return () => clearTimeout(safetyTimeout);
    }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth/user');
            console.log('✅ Auth: User profile loaded:', res.data.username);
            setUser(res.data);
        } catch (err) {
            console.error('❌ Auth: Fetch user failed:', err.response?.data || err.message);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        } finally {
            setLoading(false);
            console.log('🔐 Auth: Initialization complete.');
        }
    };

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        const { token, user } = res.data;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        return user;
    };

    const register = async (userData) => {
        await axios.post('/api/auth/register', userData);
    };

    const loginWithToken = (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, loginWithToken }}>
            {children}
        </AuthContext.Provider>
    );
};
