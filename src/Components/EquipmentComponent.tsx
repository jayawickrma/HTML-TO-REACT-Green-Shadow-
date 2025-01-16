import React from 'react';

const EquipmentComponent: React.FC = () => (
    <div>
        <h2>Manage Equipment</h2>
        <button>Add Equipment</button>
        <table>
            <thead>
            <tr>
                <th>Equipment ID</th>
                <th>Equipment Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Available Count</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{/* Dynamic Rows */}</tbody>
        </table>
    </div>
);

export default EquipmentComponent;
