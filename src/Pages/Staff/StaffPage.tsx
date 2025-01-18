import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

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
    const [isModalOpen, setModalOpen] = useState(false);

    const columns: TableColumnsType<Staff> = [
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
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Staff) => (
                <CustomButton
                    label="Delete"
                    className="btn btn-danger"
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        const newStaff: Staff = { id: staffList.length + 1, ...formData };
        setStaffList([...staffList, newStaff]);
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
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setStaffList(staffList.filter((staff) => staff.id !== id));
    };

    return (
        <div id="staffSection" className="content-section">
            <h2 className="text-center my-4">Staff Management</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Staff"
                    className="btn btn-success"
                    onClick={() => setModalOpen(true)}
                />
            </div> <br/> <br/>
            <Table<Staff> columns={columns} dataSource={staffList} rowKey="id" />
            <MainModal
                isType="Add Staff"
                buttonType="Save Staff"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[
                        { label: "First Name", id: "firstName" },
                        { label: "Last Name", id: "lastName" },
                        { label: "Joined Date", id: "joinedDate" },
                        { label: "Date of Birth", id: "dateOfBirth" },
                        { label: "Gender", id: "gender" },
                        { label: "Designation", id: "designation" },
                        { label: "Address", id: "address" },
                        { label: "Contact No", id: "contactNo" },
                        { label: "Email", id: "email" },
                        { label: "Role", id: "role" },
                        { label: "Vehicle", id: "vehicle" },
                        { label: "Field", id: "field" },
                        { label: "Log", id: "log" },
                    ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type={id === "joinedDate" || id === "dateOfBirth" ? "date" : "text"}
                                id={id}
                                value={(formData as any)[id]}
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

export default StaffManagement;