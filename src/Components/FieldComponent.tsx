import React from 'react';

const FieldsComponent: React.FC = () => (
    <div>
        <h2>Manage Fields</h2>
        <button>Add Field</button>
        <table>
            <thead>
            <tr>
                <th>Field Code</th>
                <th>Field Name</th>
                <th>Location</th>
                <th>Size</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{/* Dynamic Rows */}</tbody>
        </table>
    </div>
);

export default FieldsComponent;
