import React from 'react';
import ManageLogs from "../Pages/Log/LogPage.tsx";

const LogsComponent: React.FC = () => (
    <div>
        <h2>Log Management</h2>
        <button>Add Log</button>
        <ManageLogs/>
        <table>
            <thead>
            <tr>
                <th>Log Code</th>
                <th>Date</th>
                <th>Details</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{/* Dynamic Rows */}</tbody>
        </table>
    </div>
);

export default LogsComponent;
