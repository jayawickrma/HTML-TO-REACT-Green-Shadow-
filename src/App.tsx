import 'bootstrap/dist/css/bootstrap.min.css';
import {SideBar} from "./Components/NavBar/SideBar.tsx";
import { Routes, Route } from 'react-router-dom';
import {BrowserRouter} from "react-router";
import * as React from "react";



const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div className="d-flex">
                    <div className="col-auto">
                        <SideBar/>
                    </div>
                    <div>
                        <Routes>
                            <Route path="/" element={<h1>Home</h1>}/>
                            <Route path="/dashboard" element={<h1>DashBoard</h1>}/>
                            <Route path="/fieldManagement" element={<h1>Field Management</h1>}/>
                            <Route path="/cropManagement" element={<h1>Crop Management</h1>}/>
                            <Route path="/logManagement" element={<h1>Log Management</h1>}/>
                            <Route path="/staffManagement" element={<h1>Staff Management</h1>}/>
                            <Route path="/vehicleManagement" element={<h1>Vehicle Management</h1>}/>
                            <Route path="/equipmentManagement" element={<h1>Equipment Management</h1>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App
