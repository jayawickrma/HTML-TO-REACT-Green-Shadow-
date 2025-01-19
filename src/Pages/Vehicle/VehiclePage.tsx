import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store.ts"; // Update to the correct path for your Redux store
import { addVehicle, updateVehicle, deleteVehicle } from "../../slices/VehicleSlice.ts"; // Update path to your slice
import VehicleModel from "../../Model/VehicleModel";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

const VehicleManagement: React.FC = () => {
    const vehicles = useSelector((state: RootState) => state.vehicles);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Partial<VehicleModel>>({
        vehicleCode: "",
        licencePlateNumber: "",
        vehicleName: "",
        category: "",
        fuelType: "",
        remark: "",
        status: "",
        memberCode: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentVehicleCode, setCurrentVehicleCode] = useState<string | null>(null);

    const columns: TableColumnsType<VehicleModel> = [
        { title: "Vehicle Code", dataIndex: "vehicleCode", key: "vehicleCode" },
        { title: "License Plate", dataIndex: "licencePlateNumber", key: "licencePlateNumber" },
        { title: "Name", dataIndex: "vehicleName", key: "vehicleName" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Fuel Type", dataIndex: "fuelType", key: "fuelType" },
        { title: "Remark", dataIndex: "remark", key: "remark" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Staff ID", dataIndex: "memberCode", key: "memberCode" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: VehicleModel) => (
                <div>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger"
                        onClick={() => handleDelete(record.vehicleCode)}
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (currentVehicleCode) {
            // Update existing vehicle
            dispatch(updateVehicle({ vehicle_id: currentVehicleCode, ...formData }));
        } else {
            // Add new vehicle
            const newVehicle = new VehicleModel(
                `VEH-${Date.now()}`,
                formData.licencePlateNumber!,
                formData.vehicleName!,
                formData.category!,
                formData.fuelType!,
                formData.remark!,
                formData.status!,
                formData.memberCode!
            );
            dispatch(addVehicle(newVehicle));
        }

        // Reset form and modal state
        setFormData({
            vehicleCode: "",
            licencePlateNumber: "",
            vehicleName: "",
            category: "",
            fuelType: "",
            remark: "",
            status: "",
            memberCode: "",
        });
        setCurrentVehicleCode(null);
        setModalOpen(false);
    };

    const handleEdit = (vehicle: VehicleModel) => {
        setFormData(vehicle); // Prefill form with vehicle data
        setCurrentVehicleCode(vehicle.vehicleCode); // Set the vehicle being edited
        setModalOpen(true);
    };

    const handleDelete = (vehicleCode: string) => {
        dispatch(deleteVehicle({ vehicle_id: vehicleCode }));
    };

    return (
        <div id="vehiclesSection" className="content-section">
            <h2 className="text-center my-4">Vehicle Management</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Vehicle"
                    className="btn btn-success"
                    onClick={() => {
                        setFormData({
                            vehicleCode: "",
                            licencePlateNumber: "",
                            vehicleName: "",
                            category: "",
                            fuelType: "",
                            remark: "",
                            status: "",
                            memberCode: "",
                        });
                        setCurrentVehicleCode(null);
                        setModalOpen(true);
                    }}
                />
            </div>
            <Table<VehicleModel>
                columns={columns}
                dataSource={vehicles}
                rowKey="vehicleCode"
            />
            <MainModal
                isType={currentVehicleCode ? "Edit Vehicle" : "Add Vehicle"}
                buttonType={currentVehicleCode ? "Update Vehicle" : "Save Vehicle"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[
                        { label: "License Plate", id: "licencePlateNumber" },
                        { label: "Name", id: "vehicleName" },
                        { label: "Category", id: "category" },
                        { label: "Fuel Type", id: "fuelType" },
                        { label: "Remark", id: "remark" },
                        { label: "Status", id: "status" },
                        { label: "Staff ID", id: "memberCode" },
                    ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type="text"
                                id={id}
                                value={(formData as any)[id] || ""}
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
