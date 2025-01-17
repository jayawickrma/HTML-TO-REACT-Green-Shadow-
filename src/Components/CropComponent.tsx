import React from 'react';
import {Crop} from "lucide-react";

const CropsComponent: React.FC = () => (
    <div>
        <h2>Manage Crops</h2>
        <button>Add Crop</button>
        <Crop/>
        <table>
            <thead>
            <tr>
                <th>CROP Code</th>
                <th>Crop Name</th>
                <th>Category</th>
                <th>Season</th>
                <th>Scientific Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>{/* Dynamic Rows */}</tbody>
        </table>
    </div>
);

export default CropsComponent;
