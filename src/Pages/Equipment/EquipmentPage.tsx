import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

    const columns = [
        {
            title: "Equipment ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Equipment Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Available Count",
            dataIndex: "availableCount",
            key: "availableCount",
        },
        {
            title: "Field",
            dataIndex: "field",
            key: "field",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Equipment) => (
                <div>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const handleEdit = (record: Equipment) => {
        setEditingEquipment(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setEquipmentList(equipmentList.filter((equipment) => equipment.id !== id));
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingEquipment) {
                    setEquipmentList(
                        equipmentList.map((equipment) =>
                            equipment.id === editingEquipment.id ? { ...equipment, ...values } : equipment
                        )
                    );
                } else {
                    setEquipmentList([
                        ...equipmentList,
                        { id: equipmentList.length + 1, ...values },
                    ]);
                }
                setIsModalOpen(false);
                form.resetFields();
                setEditingEquipment(null);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <div>
            <h2 className="text-center my-4">Equipment Management</h2>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalOpen(true);
                    form.resetFields();
                    setEditingEquipment(null);
                }}
                className="mb-4"
            >
                Add New Equipment
            </Button>
            <Table columns={columns} dataSource={equipmentList} rowKey="id" />

            <Modal
                title={editingEquipment ? "Edit Equipment" : "Add Equipment"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Equipment Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter the equipment name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Equipment Type"
                        name="type"
                        rules={[{ required: true, message: "Please enter the equipment type" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: "Please select the status" }]}
                    >
                        <Select>
                            <Select.Option value="Available">Available</Select.Option>
                            <Select.Option value="Unavailable">Unavailable</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Available Count"
                        name="availableCount"
                        rules={[{ required: true, message: "Please enter the available count" }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Field"
                        name="field"
                        rules={[{ required: true, message: "Please enter the field" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageEquipment;
