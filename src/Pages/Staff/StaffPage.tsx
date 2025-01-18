import React, { useState } from "react";
import { Table, Button, Modal, Input, Form, Select } from "antd";

interface Staff {
    id: number;
    firstName: string;
    lastName: string;
    joinedDate: string;
    dateOfBirth: string;
    gender: string;
    designation: string;
    address: string;
    contactNo: string;
    email: string;
    role: string;
    vehicle: string;
    field: string;
    log: string;
}

const StaffManagement: React.FC = () => {
    const [staffList, setStaffList] = useState<Staff[]>([]);
    const [formData, setFormData] = useState<Omit<Staff, "id">>({
        firstName: "",
        lastName: "",
        joinedDate: "",
        dateOfBirth: "",
        gender: "",
        designation: "",
        address: "",
        contactNo: "",
        email: "",
        role: "",
        vehicle: "",
        field: "",
        log: "",
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const columns = [
        { title: "Member Code", dataIndex: "id", key: "id" },
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
        { title: "Joined Date", dataIndex: "joinedDate", key: "joinedDate" },
        { title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Designation", dataIndex: "designation", key: "designation" },
        { title: "Contact No", dataIndex: "contactNo", key: "contactNo" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
        { title: "Vehicle", dataIndex: "vehicle", key: "vehicle" },
        { title: "Field", dataIndex: "field", key: "field" },
        { title: "Actions", key: "actions", render: (_: any, record: Staff) => (
                <Button onClick={() => handleDelete(record.id)} type="danger">Delete</Button>
            )}
    ];

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleGenderChange = (value: string) => {
        setFormData((prev) => ({ ...prev, gender: value }));
    };

    const handleSubmit = () => {
        if (editingId !== null) {
            setStaffList(staffList.map(staff => staff.id === editingId ? { ...staff, ...formData } : staff));
        } else {
            const newStaff = { id: staffList.length + 1, ...formData };
            setStaffList([...staffList, newStaff]);
        }
        setIsModalVisible(false);
        setFormData({
            firstName: "",
            lastName: "",
            joinedDate: "",
            dateOfBirth: "",
            gender: "",
            designation: "",
            address: "",
            contactNo: "",
            email: "",
            role: "",
            vehicle: "",
            field: "",
            log: "",
        });
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        setStaffList(staffList.filter(staff => staff.id !== id));
    };

    const openModal = (id?: number) => {
        if (id) {
            const staff = staffList.find(staff => staff.id === id);
            setFormData(staff ? staff : { ...formData });
            setEditingId(id);
        }
        setIsModalVisible(true);
    };

    return (
        <div id="staffSection" className="content-section">
            <h2 className="text-center my-4">Staff Management</h2>
            <div className="d-flex justify-content-between mb-4">
                <Button type="primary" onClick={() => openModal()}>Add Staff</Button>
            </div>
            <Table columns={columns} dataSource={staffList} rowKey="id" />
            <Modal
                title={editingId !== null ? "Edit Staff" : "Add Staff"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleSubmit}
                okText={editingId !== null ? "Save Changes" : "Save Staff"}
            >
                <Form layout="vertical">
                    <Form.Item label="First Name">
                        <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Last Name">
                        <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Joined Date">
                        <Input
                            type="date"
                            id="joinedDate"
                            value={formData.joinedDate}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Date of Birth">
                        <Input
                            type="date"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Gender">
                        <Select
                            id="gender"
                            value={formData.gender}
                            onChange={handleGenderChange}
                        >
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Designation">
                        <Input
                            id="designation"
                            value={formData.designation}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Address">
                        <Input.TextArea
                            id="address"
                            value={formData.address}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Contact No">
                        <Input
                            id="contactNo"
                            value={formData.contactNo}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Email">
                        <Input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Role">
                        <Input
                            id="role"
                            value={formData.role}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Vehicle">
                        <Input
                            id="vehicle"
                            value={formData.vehicle}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Field">
                        <Input
                            id="field"
                            value={formData.field}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Log">
                        <Input
                            id="log"
                            value={formData.log}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StaffManagement;
