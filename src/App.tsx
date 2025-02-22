import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserRootState } from "./slices/UserSlice.ts";
import Header from "./Components/NavBar/Header.tsx";
import Sidebar from "./Components/NavBar/SideBar.tsx";
import { DashBoard } from "./Pages/DashBoard.tsx";
import Crops from "./Pages/Crop/CropPage.tsx";
import Fields from "./Pages/Field/FieldPage.tsx";
import LogsPage from "./Pages/Log/LogPage.tsx";
import EquipmentPage from "./Pages/Equipment/EquipmentPage.tsx";
import StaffPage from "./Pages/Staff/StaffPage.tsx";
import VehiclePage from "./Pages/Vehicle/VehiclePage.tsx";
import SignInSignUp from "./Pages/signIn-signup/SignIn-signUp.tsx";

const App: React.FC = () => {
    const isAuthenticated = useSelector((state: UserRootState) => state.user.isAuthenticated);

    return (
        <Router>
            {isAuthenticated ? (
                <div style={{ display: 'flex', height: '100vh' }}>
                    <Sidebar /> {/* No need for onNavigate prop anymore */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Header />
                        <main style={{ padding: '20px', overflowY: 'auto' }}>
                            <Routes>
                                <Route path="/" element={<Navigate to="/dashboard" />} />
                                <Route path="/dashboard" element={<DashBoard />} />
                                <Route path="/crop-manage" element={<Crops />} />
                                <Route path="/field-manage" element={<Fields />} />
                                <Route path="/log-manage" element={<LogsPage />} />
                                <Route path="/staff-manage" element={<StaffPage />} />
                                <Route path="/vehicle-manage" element={<VehiclePage />} />
                                <Route path="/equipment-manage" element={<EquipmentPage />} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </main>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<SignInSignUp />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            )}
        </Router>
    );
};

export default App;
