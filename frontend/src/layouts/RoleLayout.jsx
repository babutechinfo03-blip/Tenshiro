import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';


const RoleLayout = () => {
    return (
        <div className="app-container">
            <Navbar />

            {/* Role Content - No Padding */}
            <div style={{
                width: '100%',
                padding: 0,
                marginTop: 0
            }}>
                <Outlet />
            </div>
        </div>
    );
};

export default RoleLayout;
