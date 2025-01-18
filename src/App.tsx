import React, {useState} from "react";
import LogsPage from "./Pages/Log/LogPage.tsx";
import EquipmentPage from "./Pages/Equipment/EquipmentPage.tsx";
import StaffPage from "./Pages/Staff/StaffPage.tsx";

import Header from "./Components/NavBar/Header.tsx";
import Sidebar from "./Components/NavBar/SideBar.tsx";
import {DashBoard} from "./Pages/DashBoard.tsx";
import CropComponent from "./Components/CropComponent.tsx";
import FieldComponent from "./Components/FieldComponent.tsx";


const App: React.FC = () => {
    const [activePage, setActivePage] = useState<string>('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashBoard />;
            case 'crops':
                return <CropComponent />;
            case 'fields':
                return <FieldComponent />;
            case 'logs':
                return <LogsPage />;
            case 'equipment':
                return <EquipmentPage />;
            case 'staff':
                return <StaffPage />;
            default:
                return <DashBoard />;
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar onNavigate={setActivePage} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Header />
                <main style={{ padding: '20px', overflowY: 'auto' }}>{renderContent()}</main>
            </div>
        </div>
    );
};

export default App;
