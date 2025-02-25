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
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "Available",
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
        { title: "Equipment Name", dataIndex: "equipmentName", key: "equipmentName" },
        { title: "Equipment Type", dataIndex: "equipmentType", key: "equipmentType" },
        { title: "Status", dataIndex: "equipmentStatus", key: "equipmentStatus" },
        { title: "Available Count", dataIndex: "availableCount", key: "availableCount" },
        {
            title: "Field List",
            dataIndex: "fieldList",
            key: "fieldList",
            render: (fields: string[]) => (fields?.length > 0 ? fields.join(", ") : "N/A"),
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
        dispatch(saveEquipment(formData))
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

        dispatch(updateEquipment(formData))
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
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "Available",
            availableCount: "",
            fieldList: [],
        });
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleFieldListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fields = e.target.value.split(",").map((field) => field.trim());
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
                                value={formData.equipmentName}
                                onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Equipment Type</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.equipmentType}
                                onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
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
                                value={formData.equipmentStatus}
                                onChange={(e) => setFormData({ ...formData, equipmentStatus: e.target.value })}
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