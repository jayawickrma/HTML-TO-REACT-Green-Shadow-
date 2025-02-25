import React, { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
    saveEquipment,
    updateEquipment,
    deleteEquipment,
    getAllEquipment,
} from "../../slices/EquipmentSlice";
import { EquipmentModel } from "../../Model/EquipmentModel.ts";
import { AppDispatch, RootState } from "../../store/Store.ts";
import Swal from "sweetalert2";
import "../../css/equipmentPage.css"; // Import the CSS file

const Equipment: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const equipmentList = useSelector((state: RootState) => state.equipment.equipment);

    const [formData, setFormData] = useState<EquipmentModel>({
        equipmentCode: "", // Will be auto-generated or handled by the backend
        name: "",
        type: "",
        status: "Available",
        availableCount: "",
        fieldList: [],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getAllEquipment());
    }, [dispatch]);

    const columns: TableColumnsType<EquipmentModel> = [
        { title: "Equipment Code", dataIndex: "equipmentCode", key: "equipmentCode" },
        { title: "Equipment Name", dataIndex: "name", key: "name" },
        { title: "Equipment Type", dataIndex: "type", key: "type" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Available Count", dataIndex: "availableCount", key: "availableCount" },
        {
            title: "Field List",
            dataIndex: "EquipmentFieldDetails",
            key: "fieldList",
            render: (fields: { fieldCode: number }[]) =>
                fields?.length > 0 ? fields.map(field => field.fieldCode).join(", ") : "N/A",

        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: EquipmentModel) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        className="btn-warning"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn-danger"
                        onClick={() => handleDelete(record.equipmentCode)}
                    />
                </div>
            ),
        },
    ];

    const handleAdd = () => {
        const payload = {
            ...formData,
            availableCount: parseInt(formData.availableCount), // Convert to number for backend
        };
        dispatch(saveEquipment(payload))
            .then(() => {
                Swal.fire("Success!", "Equipment added successfully.", "success");
                dispatch(getAllEquipment());
                resetForm();
            })
            .catch(() => {
                Swal.fire("Error!", "Failed to add equipment.", "error");
            });
    };

    const handleEdit = (record: EquipmentModel) => {
        setIsEditing(true);
        setEditId(record.equipmentCode);
        setFormData(record);
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        if (!editId) return;

        const payload = {
            ...formData,
            availableCount: parseInt(formData.availableCount), // Convert to number for backend
        };
        dispatch(updateEquipment(payload))
            .then(() => {
                Swal.fire("Success!", "Equipment updated successfully.", "success");
                dispatch(getAllEquipment());
                resetForm();
            })
            .catch(() => {
                Swal.fire("Error!", "Failed to update equipment.", "error");
            });
    };

    const handleDelete = (equipmentCode: string) => {
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
                dispatch(deleteEquipment(equipmentCode))
                    .then(() => {
                        Swal.fire("Deleted!", "Equipment has been deleted.", "success");
                        dispatch(getAllEquipment());
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete equipment.", "error");
                    });
            }
        });
    };

    const resetForm = () => {
        setFormData({
            equipmentCode: "",
            name: "",
            type: "",
            status: "Available",
            availableCount: "",
            fieldList: [],
        });
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleFieldListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fields = e.target.value.split(",").map((field) => parseInt(field.trim()));
        setFormData({ ...formData, fieldList: fields });
    };

    return (
        <div className="content-section">
            <div className="section">
                <h2 className="text-center my-4">Manage Equipment</h2>

                <div className="d-flex justify-content-center mb-4">
                    <CustomButton
                        label="Add Equipment"
                        className="btn-success"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <Table<EquipmentModel> columns={columns} dataSource={equipmentList} rowKey="equipmentCode" />

                <MainModal
                    isType={isEditing ? "Edit Equipment" : "Add Equipment"}
                    buttonType={isEditing ? "Update" : "Save"}
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    onSubmit={isEditing ? handleUpdate : handleAdd}
                >
                    <form className="equipment-form">
                        <div className="mb-3">
                            <label className="form-label">Equipment Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Equipment Type</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Available Count</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.availableCount}
                                onChange={(e) => setFormData({ ...formData, availableCount: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Equipment Status</label>
                            <select
                                className="form-control"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Field List (Comma-separated)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.fieldList.join(", ")}
                                onChange={handleFieldListChange}
                                required
                            />
                        </div>
                    </form>
                </MainModal>
            </div>
        </div>
    );
};

export default Equipment;