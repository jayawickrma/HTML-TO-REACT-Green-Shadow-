import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

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

const VehicleManagement: React.FC = () => {
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
    const [isModalOpen, setModalOpen] = useState(false);

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
                <CustomButton
                    label="Delete"
                    className="btn btn-danger"
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
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
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    };

    return (
        <div id="vehiclesSection" className="content-section">
            <h2 className="text-center my-4">Vehicle Management</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Vehicle"
                    className="btn btn-success"
                    onClick={() => setModalOpen(true)}
                />
            </div> <br/><br/>
            <Table<Vehicle> columns={columns} dataSource={vehicles} rowKey="id" />
            <MainModal
                isType="Add Vehicle"
                buttonType="Save Vehicle"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
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
                </form>
            </MainModal>
        </div>
    );
};

export default VehicleManagement;
