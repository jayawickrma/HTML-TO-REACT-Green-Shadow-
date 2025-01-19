import React, {useState} from "react";
import LogsPage from "./Pages/Log/LogPage.tsx";
import EquipmentPage from "./Pages/Equipment/EquipmentPage.tsx";
import StaffPage from "./Pages/Staff/StaffPage.tsx";

import Header from "./Components/NavBar/Header.tsx";
import Sidebar from "./Components/NavBar/SideBar.tsx";
import {DashBoard} from "./Pages/DashBoard.tsx";
import Crops from "./Pages/Crop/CropPage.tsx";
import Fields from "./Pages/Field/FieldPage.tsx";
import VehiclePage from "./Pages/Vehicle/VehiclePage.tsx";
import {LogOut} from "lucide-react";



const App: React.FC = () => {
    const [activePage, setActivePage] = useState<string>('dashboard');

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashBoard />;
            case 'crops':
                return <Crops />;
            case 'fields':
                return <Fields />;
            case 'logs':
                return <LogsPage />;
            case 'equipment':
                return <EquipmentPage />;
            case 'staff':
                return <StaffPage />;
            case 'vehicle':
                return <VehiclePage />;
            case 'settings':
                return <LogOut/>
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
