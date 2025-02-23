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

const Equipment: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const equipmentList = useSelector(
        (state: RootState) => state.equipment.equipment
    );

    const [formData, setFormData] = useState({
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "Available",
        availableCount: "",
        fieldList: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(getAllEquipment());
    }, [dispatch]);

    const columns: TableColumnsType<EquipmentModel> = [
        { title: "Equipment Code", dataIndex: "equipmentCode", key: "equipmentCode" },
        { title: "Equipment Name", dataIndex: "name", key: "equipmentName" },
        { title: "Equipment Type", dataIndex: "type", key: "equipmentType" },
        { title: "Status", dataIndex: "status", key: "equipmentStatus" },
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
        const newEquipment = new FormData();
        newEquipment.append("equipmentName", formData.equipmentName);
        newEquipment.append("equipmentType", formData.equipmentType);
        newEquipment.append("equipmentStatus", formData.equipmentStatus);
        newEquipment.append("availableCount", formData.availableCount);
        if (selectedFile) newEquipment.append("image", selectedFile);

        dispatch(saveEquipment(newEquipment)).then(() => {
            dispatch(getAllEquipment());
            resetForm();
        });
    };

    const handleEdit = (record: EquipmentModel) => {
        setIsEditing(true);
        setEditId(record.equipmentCode);
        setFormData({
            equipmentName: record.equipmentName,
            equipmentType: record.equipmentType,
            equipmentStatus: record.equipmentStatus,
            availableCount: record.availableCount,
            fieldList: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        if (!editId) return;

        const updatedEquipment = new FormData();
        updatedEquipment.append("code", editId);
        updatedEquipment.append("equipmentName", formData.equipmentName);
        updatedEquipment.append("equipmentType", formData.equipmentType);
        updatedEquipment.append("equipmentStatus", formData.equipmentStatus);
        updatedEquipment.append("availableCount", formData.availableCount);
        if (selectedFile) updatedEquipment.append("image", selectedFile);

        dispatch(updateEquipment(updatedEquipment)).then(() => {
            dispatch(getAllEquipment());
            resetForm();
        });
    };

    const handleDelete = (equipmentCode: string) => {
        dispatch(deleteEquipment(equipmentCode)).then(() => {
            dispatch(getAllEquipment());
        });
    };

    const resetForm = () => {
        setFormData({
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "Available",
            availableCount: "",
            fieldList: "",
        });
        setSelectedFile(null);
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
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
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Equipment Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.equipmentName}
                                onChange={(e) =>
                                    setFormData({ ...formData, equipmentName: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Equipment Type</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formData.equipmentType}
                                onChange={(e) =>
                                    setFormData({ ...formData, equipmentType: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Available Count</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.availableCount}
                                onChange={(e) =>
                                    setFormData({ ...formData, availableCount: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Equipment Status</label>
                            <select
                                className="form-control"
                                value={formData.equipmentStatus}
                                onChange={(e) =>
                                    setFormData({ ...formData, equipmentStatus: e.target.value })
                                }
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>
                </MainModal>
            </div>
        </div>
    );
};

export default Equipment;
