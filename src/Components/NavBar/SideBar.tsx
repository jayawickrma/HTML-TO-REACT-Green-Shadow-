import React from 'react';
import { useNavigate } from 'react-router-dom';
import dashboard from '../../assets/dashboard.png';
import cropImage from '../../assets/icons8-crops-64.png';
import fieldImage from '../../assets/field.png';
import logImage from '../../assets/logs.png';
import settingImage from '../../assets/settings.png';
import staffImage from '../../assets/staff.png';
import vehicleImage from '../../assets/icons8-vehicles-64.png';
import equipmentImage from '../../assets/icons8-equipment-100.png';

const Sidebar: React.FC = () => {
    const navigate = useNavigate(); // Use React Router navigation

    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: dashboard },
        { name: 'Crops', path: '/crop-manage', icon: cropImage },
        { name: 'Fields', path: '/field-manage', icon: fieldImage },
        { name: 'Logs', path: '/log-manage', icon: logImage },
        { name: 'Equipment', path: '/equipment-manage', icon: equipmentImage },
        { name: 'Staff', path: '/staff-manage', icon: staffImage },
        { name: 'Vehicle', path: '/vehicle-manage', icon: vehicleImage },
        { name: 'Settings', path: '/settings', icon: settingImage },
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li
                        key={item.path}
                        className="sidebar-item"
                        onClick={() => navigate(item.path)}
                    >
                        <img src={item.icon} alt={item.name} className="sidebar-icon" />
                        <span className="sidebar-text">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
