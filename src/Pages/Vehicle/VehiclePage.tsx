import React, { useState } from "react";

interface Vehicle {
    id: number;
    licensePlate: string;
    name: string;
    category: string;
    fuelType: string;
    remark: string;
    status: string;
    staff: string;
}

const VehiclePage: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState<Vehicle>({
        id: 0,
        licensePlate: "",
        name: "",
        category: "",
        fuelType: "",
        remark: "",
        status: "",
        staff: "",
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.licensePlate && formData.name) {
            setVehicles((prevVehicles) => [
                ...prevVehicles,
                { ...formData, id: Date.now() },
            ]);
            setFormData({
                id: 0,
                licensePlate: "",
                name: "",
                category: "",
                fuelType: "",
                remark: "",
                status: "",
                staff: "",
            });
            setShowModal(false);
        }
    };

    const handleDelete = (id: number) => {
        setVehicles((prevVehicles) => prevVehicles.filter((v) => v.id !== id));
    };

    return (
        <div id="vehiclesSection" className="content-section">
            <h2 className="text-center my-4">Vehicle Management</h2>

            {/* Add Vehicle Button */}
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Add Vehicle
                </button>
            </div>

            {/* Vehicle Table */}
            <table className="table table-bordered" id="vehicleTable">
                <thead className="table-success">
                <tr>
                    <th>Vehicle Code</th>
                    <th>License Plate</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Fuel Type</th>
                    <th>Remark</th>
                    <th>Status</th>
                    <th>Staff</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.licensePlate}</td>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.category}</td>
                        <td>{vehicle.fuelType}</td>
                        <td>{vehicle.remark}</td>
                        <td>{vehicle.status}</td>
                        <td>{vehicle.staff}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(vehicle.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Popup Modal */}
            {showModal && (
                <div className="modal show d-block" id="vehicleModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Vehicle</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form id="vehicleForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="licensePlate" className="form-label">
                                            License Plate
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="licensePlate"
                                            value={formData.licensePlate}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fuelType" className="form-label">
                                            Fuel Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fuelType"
                                            value={formData.fuelType}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="remark" className="form-label">
                                            Remark
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="remark"
                                            value={formData.remark}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">
                                            Status
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="staff" className="form-label">
                                            Staff
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="staff"
                                            value={formData.staff}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Vehicle
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehiclePage;
