import React from 'react';
import StaffComponent from "../../Components/StaffComponent.tsx";

const StaffPage: React.FC = () => (
    <div>
        <h2>Staff Management</h2>
        <button>Add Staff</button>
        <StaffComponent />
    </div>
);

export default StaffPage;
