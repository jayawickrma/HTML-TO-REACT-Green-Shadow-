import React from 'react';
import FieldComponent from "../../Components/FieldComponent.tsx";

const FieldsPage: React.FC = () => (
    <div>
        <h2>Manage Fields</h2>
        <button>Add Field</button>
        <FieldComponent />
    </div>
);

export default FieldsPage;
