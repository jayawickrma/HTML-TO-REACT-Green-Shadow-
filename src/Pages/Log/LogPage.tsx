import React from 'react';
import LogsComponent from "../../Components/LogComponent.tsx";

const LogsPage: React.FC = () => (
    <div>
        <h2>Log Management</h2>
        <button>Add Log</button>
        <LogsComponent />
    </div>
);

export default LogsPage;
