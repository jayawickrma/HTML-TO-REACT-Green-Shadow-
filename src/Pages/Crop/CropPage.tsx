import React from 'react';
import CropComponent from "../../Components/CropComponent.tsx";


const CropsPage: React.FC = () => (
    <div>
        <h2>Manage Crops</h2>
        <button>Add Crop</button>
        <CropComponent/>
    </div>
);

export default CropsPage;
