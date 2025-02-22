import React, { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { saveEquipment, updateEquipment, deleteEquipment, EquipmentRootState, getAllEquipment } from "../../slices/EquipmentSlice";
import { EquipmentModel } from "../../Model/EquipmentModel.ts";
import { AppDispatch } from "../../store/Store.ts";

const Equipment: React.FC = () => {
    const equipmentList = useSelector((state: EquipmentRootState) => state.equipment.equipments) || [];
    const dispatch = useDispatch<AppDispatch>();
    const [equipmentName, setEquipmentName] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [equipmentStatus, setEquipmentStatus] = useState("Available");
    const [availableCount, setAvailableCount] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFields, setFields] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "Available",
        availableCount: "",
        image: null as File | null,
        fieldList: "",
    });
    const [imagePopup, setImagePopup] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const columns: TableColumnsType<EquipmentModel> = [
        {
            title: "Equipment Code",
            dataIndex: "equipmentCode",
            key: "equipmentCode",
        },
        {
            title: "Equipment Name",
            dataIndex: "equipmentName",
            key: "equipmentName",
        },
        {
            title: "Equipment Type",
            dataIndex: "equipmentType",
            key: "equipmentType",
        },
        {
            title: "Status",
            dataIndex: "equipmentStatus",
            key: "equipmentStatus",
        },
        {
            title: "Available Count",
            dataIndex: "availableCount",
            key: "availableCount",
        },
        {
            title: "Field List",
            dataIndex: "fieldList",
            key: "fieldList",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: EquipmentModel) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        type="button"
                        className="btn-warning"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        type="button"
                        className="btn-danger"
                        onClick={() => handleDelete(record.equipmentCode)}
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getAllEquipment());
    }, [dispatch]);

    const handleAdd = () => {
        const newEquipment = new FormData();
        newEquipment.append("name", equipmentName);
        newEquipment.append("equipmentType", equipmentType);
        newEquipment.append("status", equipmentStatus);
        newEquipment.append("availableCount", availableCount);
        if (selectedFile) {
            newEquipment.append("image", selectedFile);
        }
        newEquipment.append("assignFields", JSON.stringify(selectedFields));
        dispatch(saveEquipment(newEquipment));
        resetForm();
    };

    const handleEdit = (record: EquipmentModel) => {
        setIsEditing(true);
        setEditId(record.equipmentCode);
        setFormData({
            equipmentName: record.equipmentName,
            equipmentType: record.equipmentType,
            equipmentStatus: record.equipmentStatus,
            availableCount: record.availableCount,
            image: record.image,
            fieldList: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedEquipment = new FormData();
        updatedEquipment.append("name", equipmentName);
        updatedEquipment.append("equipmentType", equipmentType);
        updatedEquipment.append("status", equipmentStatus);
        updatedEquipment.append("availableCount", availableCount);
        if (selectedFile) {
            updatedEquipment.append("image", selectedFile);
        }
        updatedEquipment.append("assignFields", JSON.stringify(selectedFields));
        dispatch(updateEquipment(updatedEquipment));
        resetForm();
    };

    const handleDelete = (equipmentCode: string) => {
        dispatch(deleteEquipment(equipmentCode));
    };

    const resetForm = () => {
        setEquipmentName("");
        setEquipmentType("");
        setEquipmentStatus("Available");
        setAvailableCount("");
        setSelectedFile(null);
        setFields([]);
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    return (
        <div id="equipmentSection" className="content-section">
            <div className="section">
                <h2 className="text-center my-4">Manage Equipment</h2>

                {/* Add Equipment Button */}
                <div className="d-flex justify-content-center mb-4">
                    <CustomButton
                        label="Add Equipment"
                        type="button"
                        className="btn-success"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {/* Equipment Table */}
                <Table<EquipmentModel> columns={columns} dataSource={equipmentList} rowKey="equipmentCode" />

                {/* Modal for Adding/Editing Equipment */}
                <MainModal
                    isType={isEditing ? "Edit Equipment" : "Add Equipment"}
                    buttonType={isEditing ? "Update" : "Save"}
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    onSubmit={isEditing ? handleUpdate : handleAdd}
                >
                    <form id="equipmentForm">
                        <div className="mb-3">
                            <label htmlFor="equipmentName" className="form-label">
                                Equipment Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="equipmentName"
                                value={formData.equipmentName}
                                onChange={(e) => setEquipmentName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="equipmentType" className="form-label">
                                Equipment Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="equipmentType"
                                value={formData.equipmentType}
                                onChange={(e) => setEquipmentType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="availableCount" className="form-label">
                                Available Count
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="availableCount"
                                value={formData.availableCount}
                                onChange={(e) => setAvailableCount(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="equipmentStatus" className="form-label">
                                Equipment Status
                            </label>
                            <select
                                id="equipmentStatus"
                                value={formData.equipmentStatus}
                                className="form-control"
                                onChange={(e) => setEquipmentStatus(e.target.value)}
                                required
                            >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </form>
                </MainModal>

                {/* Image Popup */}
                {imagePopup && (
                    <div
                        id="imagePopup"
                        style={{
                            display: "flex",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            width: "100%",
                            height: "100%",
                            background: "rgba(0, 0, 0, 0.8)",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 999,
                        }}
                    >
                        <span
                            className="close"
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "20px",
                                fontSize: "30px",
                                color: "white",
                                cursor: "pointer",
                            }}
                            onClick={() => setImagePopup(null)}
                        >
                            ×
                        </span>
                        <img
                            id="popupImage"
                            src={imagePopup}
                            alt="Popup Image"
                            style={{ maxWidth: "50%", maxHeight: "50%" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Equipment;
