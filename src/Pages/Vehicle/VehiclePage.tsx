import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";

interface Vehicle {
    id: number;
    licensePlate: string;
    vehicleName: string;
    category: string;
    fuelType: string;
    remark: string;
    status: string;
    staffId: string;
}

const Vehicles: React.FC = () => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState<Omit<Vehicle, "id">>({
        licensePlate: "",
        vehicleName: "",
        category: "",
        fuelType: "",
        remark: "",
        status: "",
        staffId: "",
    });

    const columns: TableColumnsType<Vehicle> = [
        { title: "Vehicle Code", dataIndex: "id", key: "id" },
        { title: "License Plate", dataIndex: "licensePlate", key: "licensePlate" },
        { title: "Name", dataIndex: "vehicleName", key: "vehicleName" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Fuel Type", dataIndex: "fuelType", key: "fuelType" },
        { title: "Remark", dataIndex: "remark", key: "remark" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Staff", dataIndex: "staffId", key: "staffId" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Vehicle) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(record.id)}
                >
                    Delete
                </button>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newVehicle: Vehicle = { id: vehicles.length + 1, ...formData };
        setVehicles([...vehicles, newVehicle]);
        setFormData({
            licensePlate: "",
            vehicleName: "",
            category: "",
            fuelType: "",
            remark: "",
            status: "",
            staffId: "",
        });
        (document.getElementById("vehicleModalClose") as HTMLButtonElement)?.click();
    };

    const handleDelete = (id: number) => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    };

    return (
        <div id="vehiclesSection" className="content-section">
            <h2 className="text-center my-4">Vehicle Management</h2>
            <div className="d-flex justify-content-center mb-4">
                <button
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#vehicleModal"
                >
                    Add Vehicle
                </button>
            </div>
            <Table<Vehicle> columns={columns} dataSource={vehicles} />
            <div
                className="modal fade"
                id="vehicleModal"
                tabIndex={-1}
                aria-labelledby="vehicleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="vehicleModalLabel">
                                Add Vehicle
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                id="vehicleModalClose"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {[
                                    { label: "License Plate", id: "licensePlate" },
                                    { label: "Name", id: "vehicleName" },
                                    { label: "Category", id: "category" },
                                    { label: "Fuel Type", id: "fuelType" },
                                    { label: "Remark", id: "remark" },
                                    { label: "Status", id: "status" },
                                    { label: "Staff", id: "staffId" },
                                ].map(({ label, id }) => (
                                    <div className="mb-3" key={id}>
                                        <label htmlFor={id} className="form-label">
                                            {label}
                                        </label>
                                        <input
                                            type="text"
                                            id={id}
                                            value={(formData as any)[id]}
                                            className="form-control"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                ))}
                                <button type="submit" className="btn btn-primary">
                                    Save Vehicle
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
