import React from 'react';
import EquipmentComponent from "../../Components/EquipmentComponent.tsx";

const EquipmentPage: React.FC = () => (
    <div>
        <h2>Manage Equipment</h2>
        <button>Add Equipment</button>
        <EquipmentComponent />
    </div>
);

export default EquipmentPage;
