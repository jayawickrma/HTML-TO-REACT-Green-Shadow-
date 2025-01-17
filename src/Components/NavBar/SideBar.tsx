import React from 'react';
import dashboard from '../../assets/dashboard.png';
import cropImage from '../../assets/icons8-crops-64.png';
import fieldImage from '../../assets/field.png';
import logImage from '../../assets/logs.png';
import settingImage from '../../assets/settings.png';
import staffImage from '../../assets/staff.png';
import vehicleImage from '../../assets/icons8-vehicles-64.png';
import equipmentImage from '../../assets/icons8-equipment-100.png';

type SidebarProps = {
    onNavigate: (page: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
    const menuItems = [
        { name: 'Dashboard', page: 'dashboard', icon: dashboard },
        { name: 'Crops', page: 'crops', icon: cropImage },
        { name: 'Fields', page: 'fields', icon: fieldImage },
        { name: 'Logs', page: 'logs', icon: logImage },
        { name: 'Equipment', page: 'equipment', icon: equipmentImage },
        { name: 'Staff', page: 'staff', icon: staffImage },
        { name: 'Vehicle', page: 'vehicle', icon: vehicleImage },
        { name: 'Settings', page: 'settings', icon: settingImage },
    ];

    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li
                        key={item.page}
                        className="sidebar-item"
                        onClick={() => onNavigate(item.page)}
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
