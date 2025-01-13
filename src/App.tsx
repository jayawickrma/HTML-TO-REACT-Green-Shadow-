// App.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { SideBar } from "./Components/NavBar/SideBar.tsx";
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from "react-router";
import * as React from "react";

// Import the page components
import { DashBoard } from './Pages/DashBoard.tsx';
import { FieldPage } from './pages/Field/FieldPage.tsx';
import { CropPage } from './pages/Crop/CropPage.tsx';
import { LogPage } from './pages/Log/LogPage.tsx';
import { StaffPage } from './pages/Staff/StaffPage.tsx';
import { VehiclePage } from './pages/Vehicle/VehiclePage.tsx';
import { EquipmentPage } from './pages/Equipment/EquipmentPage.tsx';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="d-flex">
                {/* Sidebar */}
                <div className="col-auto">
                    <SideBar />
                </div>

                {/* Main content area */}
                <div className="col">
                    <Routes>
                        <Route path="/dashboard" element={<DashBoard />} />
                        <Route path="/fieldManagement" element={<FieldPage />} />
                        <Route path="/cropManagement" element={<CropPage />} />
                        <Route path="/logManagement" element={<LogPage />} />
                        <Route path="/staffManagement" element={<StaffPage />} />
                        <Route path="/vehicleManagement" element={<VehiclePage />} />
                        <Route path="/equipmentManagement" element={<EquipmentPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
