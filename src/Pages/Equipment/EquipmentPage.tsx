import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { RootState } from "../../store/Store.ts"; // Adjust the path to your store file
import { addEquipment, updateEquipment, deleteEquipment } from "../../slices/EquipmentSlice";
import EquipmentModel from "../../Model/EquipmentModel";

const ManageEquipment: React.FC = () => {
    const equipmentList = useSelector((state: RootState) => state.equipments); // Access equipment state
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Partial<EquipmentModel>>({
        equipmentCode: "",
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "Available",
        availableCount: "",
        fieldList: "",
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<EquipmentModel | null>(null);

    const columns = [
        { title: "Equipment Code", dataIndex: "equipmentCode", key: "equipmentCode" },
        { title: "Equipment Name", dataIndex: "equipmentName", key: "equipmentName" },
        { title: "Type", dataIndex: "equipmentType", key: "equipmentType" },
        { title: "Status", dataIndex: "equipmentStatus", key: "equipmentStatus" },
        { title: "Available Count", dataIndex: "availableCount", key: "availableCount" },
        { title: "Field List", dataIndex: "fieldList", key: "fieldList" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: EquipmentModel) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(record.equipmentCode)}
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleEdit = (record: EquipmentModel) => {
        setEditingEquipment(record);
        setFormData(record);
        setModalOpen(true);
    };

    const handleDelete = (equipmentCode: string) => {
        dispatch(deleteEquipment({ equipment_id: equipmentCode }));
    };

    const handleSubmit = () => {
        if (editingEquipment) {
            dispatch(updateEquipment({ ...formData, equipment_id: editingEquipment.equipmentCode }));
        } else {
            const newEquipment = new EquipmentModel(
                `EQ${equipmentList.length + 1}`,
                formData.equipmentName || "",
                formData.equipmentType || "",
                formData.equipmentStatus || "Available",
                formData.availableCount || "",
                formData.fieldList || ""
            );
            dispatch(addEquipment(newEquipment));
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            equipmentCode: "",
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "Available",
            availableCount: "",
            fieldList: "",
        });
        setModalOpen(false);
        setEditingEquipment(null);
    };

    return (
        <div id="manageEquipmentSection" className="content-section">
            <h2 className="text-center my-4">Manage Equipment</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add New Equipment"
                    className="btn btn-success"
                    onClick={() => {
                        resetForm();
                        setModalOpen(true);
                    }}
                />
            </div>
            <Table columns={columns} dataSource={equipmentList} rowKey="equipmentCode" />
            <MainModal
                isType={editingEquipment ? "Edit Equipment" : "Add Equipment"}
                buttonType={editingEquipment ? "Save Changes" : "Add Equipment"}
                isOpen={isModalOpen}
                onClose={resetForm}
                onSubmit={handleSubmit}
            >
                <form>
                    {[{ label: "Equipment Name", id: "equipmentName", type: "text" },
                        { label: "Equipment Type", id: "equipmentType", type: "text" },
                        { label: "Available Count", id: "availableCount", type: "text" },
                        { label: "Field List", id: "fieldList", type: "text" }].map(({ label, id, type }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type={type}
                                id={id}
                                value={(formData as any)[id] || ""}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="equipmentStatus" className="form-label">
                            Status
                        </label>
                        <select
                            id="equipmentStatus"
                            value={formData.equipmentStatus || ""}
                            className="form-control"
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>
                </form>
            </MainModal>
        </div>
    );
};

export default ManageEquipment;
