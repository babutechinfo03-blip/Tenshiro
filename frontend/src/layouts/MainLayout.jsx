import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            <div className="main-content" style={{ marginTop: 0 }}>
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="page-content" style={{ marginLeft: 'var(--sidebar-collapsed-width)' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
