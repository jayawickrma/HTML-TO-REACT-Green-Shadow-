import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveVehicle, updateVehicle, deleteVehicle, getAllVehicles } from "../../slices/VehicleSlice";
import VehicleModel from "../../Model/VehicleModel";
import { RootState } from "../../store/Store";
import Swal from "sweetalert2";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

const VehicleManagement: React.FC = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

    const [formData, setFormData] = useState<Partial<VehicleModel>>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllVehicles());
    }, [dispatch]);

    const columns = [
        { title: "Vehicle Code", dataIndex: "vehicleCode" },
        { title: "License Plate", dataIndex: "licensePlateNumber" },
        { title: "Name", dataIndex: "name" },
        { title: "Category", dataIndex: "category" },
        { title: "Fuel Type", dataIndex: "fuelType" },
        { title: "Remark", dataIndex: "remark" },
        { title: "Status", dataIndex: "status" },
        { title: "Staff ID", dataIndex: "memberCode" },
        {
            title: "Actions",
            render: (_, record) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(record.vehicleCode)}
                    />
                </div>
            ),
        },
    ];

    const handleEdit = (vehicle: VehicleModel) => {
        setFormData(vehicle);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setFormData({});
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        if (
            !formData.licensePlateNumber ||
            !formData.name ||
            !formData.category ||
            !formData.fuelType ||
            !formData.remark ||
            !formData.status ||
            !formData.memberCode
        ) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill out all fields.",
            });
            return;
        }

        if (isEdit) {
            dispatch(updateVehicle(formData as VehicleModel))
                .unwrap()
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Vehicle updated successfully!",
                    });
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error || "Failed to update vehicle",
                    });
                });
        } else {
            dispatch(saveVehicle(formData as VehicleModel))
                .unwrap()
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Vehicle added successfully!",
                    });
                    setIsModalOpen(false);
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: error || "Failed to add vehicle",
                    });
                });
        }
    };

    const handleDelete = (vehicleCode: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteVehicle(vehicleCode))
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Vehicle deleted successfully.",
                        });
                        dispatch(getAllVehicles());
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: error || "Failed to delete vehicle",
                        });
                    });
            }
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div>
            <h2>Vehicle Management</h2>
            <Button type="primary" onClick={handleAdd}>Add Vehicle</Button>
            <Table columns={columns} dataSource={vehicles} rowKey="vehicleCode" />

            <MainModal
                isType={isEdit ? "Edit Vehicle" : "Add Vehicle"}
                buttonType={isEdit ? "Update Vehicle" : "Save Vehicle"}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[
                        { label: "License Plate", id: "licensePlateNumber" },
                        { label: "Vehicle Name", id: "name" },
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