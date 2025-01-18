import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface Log {
    id: number;
    logCode: string;
    date: string;
    details: string;
    image: string;
    staff: string;
    crop: string;
    field: string;
}

const ManageLogs: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingLog, setEditingLog] = useState<Log | null>(null);

    const columns = [
        {
            title: "Log Code",
            dataIndex: "logCode",
            key: "logCode",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Details",
            dataIndex: "details",
            key: "details",
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (text: string) => (
                <img src={text} alt="Log Image" style={{ width: 50, height: 50 }} />
            ),
        },
        {
            title: "Staff",
            dataIndex: "staff",
            key: "staff",
        },
        {
            title: "Crop",
            dataIndex: "crop",
            key: "crop",
        },
        {
            title: "Field",
            dataIndex: "field",
            key: "field",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Log) => (
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

    const handleEdit = (record: Log) => {
        setEditingLog(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setLogs(logs.filter((log) => log.id !== id));
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingLog) {
                    setLogs(
                        logs.map((log) =>
                            log.id === editingLog.id ? { ...log, ...values } : log
                        )
                    );
                } else {
                    setLogs([
                        ...logs,
                        { id: logs.length + 1, ...values },
                    ]);
                }
                setIsModalOpen(false);
                form.resetFields();
                setEditingLog(null);
            })
            .catch((info) => {
                console.log("Validate Failed:", info);
            });
    };

    return (
        <div>
            <h2 className="text-center my-4">Log Management</h2>
            <Button
                type="primary"
                onClick={() => {
                    setIsModalOpen(true);
                    form.resetFields();
                    setEditingLog(null);
                }}
                className="mb-4"
            >
                Add Log
            </Button>
            <Table columns={columns} dataSource={logs} rowKey="id" />

            <Modal
                title={editingLog ? "Edit Log" : "Add Log"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Log Code"
                        name="logCode"
                        rules={[{ required: true, message: "Please enter the log code" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: "Please select a date" }]}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Details"
                        name="details"
                        rules={[{ required: true, message: "Please enter the details" }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Image" name="image">
                        <Upload listType="picture" beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Staff"
                        name="staff"
                        rules={[{ required: true, message: "Please enter the staff name" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Crop"
                        name="crop"
                        rules={[{ required: true, message: "Please enter the crop" }]}
                    >
                        <Input />
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

export default ManageLogs;
