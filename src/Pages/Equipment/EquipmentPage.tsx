import React, { useState } from "react";
import { Table } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

interface Equipment {
    id: number;
    name: string;
    type: string;
    status: string;
    availableCount: number;
    field: string;
}

const ManageEquipment: React.FC = () => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const [formData, setFormData] = useState<Omit<Equipment, "id">>({
        name: "",
        type: "",
        status: "Available",
        availableCount: 0,
        field: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

    const columns = [
        { title: "Equipment ID", dataIndex: "id", key: "id" },
        { title: "Equipment Name", dataIndex: "name", key: "name" },
        { title: "Type", dataIndex: "type", key: "type" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Available Count", dataIndex: "availableCount", key: "availableCount" },
        { title: "Field", dataIndex: "field", key: "field" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Equipment) => (
                <div>
                    <CustomButton
                        label="Edit"
                        onClick={() => handleEdit(record)}
                        className="btn btn-primary btn-sm"
                    />
                    <CustomButton
                        label="Delete"
                        onClick={() => handleDelete(record.id)}
                        className="btn btn-danger btn-sm"
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: id === "availableCount" ? Number(value) : value,
        }));
    };

    const handleEdit = (record: Equipment) => {
        setEditingEquipment(record);
        setFormData(record);
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setEquipmentList(equipmentList.filter((equipment) => equipment.id !== id));
    };

    const handleSubmit = () => {
        if (editingEquipment) {
            setEquipmentList(
                equipmentList.map((equipment) =>
                    equipment.id === editingEquipment.id ? { ...equipment, ...formData } : equipment
                )
            );
        } else {
            setEquipmentList([
                ...equipmentList,
                { id: equipmentList.length + 1, ...formData },
            ]);
        }
        setModalOpen(false);
        setFormData({
            name: "",
            type: "",
            status: "Available",
            availableCount: 0,
            field: "",
        });
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
                        setModalOpen(true);
                        setFormData({
                            name: "",
                            type: "",
                            status: "Available",
                            availableCount: 0,
                            field: "",
                        });
                        setEditingEquipment(null);
                    }}
                />
            </div>
            <Table columns={columns} dataSource={equipmentList} rowKey="id" />
            <MainModal
                isType={editingEquipment ? "Edit Equipment" : "Add Equipment"}
                buttonType={editingEquipment ? "Save Changes" : "Add Equipment"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[{ label: "Equipment Name", id: "name", type: "text" },
                        { label: "Equipment Type", id: "type", type: "text" },
                        { label: "Available Count", id: "availableCount", type: "number" },
                        { label: "Field", id: "field", type: "text" }].map(({ label, id, type }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type={type}
                                id={id}
                                value={(formData as any)[id]}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">
                            Status
                        </label>
                        <select
                            id="status"
                            value={formData.status}
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
