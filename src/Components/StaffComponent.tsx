import React from 'react';
import StaffManagement from "../Pages/Staff/StaffPage.tsx";

const StaffComponent: React.FC = () => (
    <div>
        <h2>Staff Management</h2>
        <button>Add Staff</button>
        <StaffManagement/>
        <table>
            <thead>
            <tr>
                <th>Staff Code</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{/* Dynamic Rows */}</tbody>
        </table>
    </div>
);

export default StaffComponent;
