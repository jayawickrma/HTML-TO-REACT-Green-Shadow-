import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store.ts"; // Update path to your store
import { addStaff, updateStaff, deleteStaff } from "../../slices/StaffSlice.ts"; // Update path to staffSlice
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

interface StaffFormData {
    memberCode?: string;
    firstName: string;
    lastName: string;
    joinedDate: string;
    dateOfBirth: string;
    gender: string;
    designation: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    contactNumber: string;
    email: string;
    role: string;
    vehicleList: string;
    fieldList: string;
}

const StaffManagement: React.FC = () => {
    const staffList = useSelector((state: RootState) => state.staffs);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<StaffFormData>({
        firstName: "",
        lastName: "",
        joinedDate: "",
        dateOfBirth: "",
        gender: "",
        designation: "",
        addressLine1: "",
        addressLine2: "",
        addressLine3: "",
        addressLine4: "",
        addressLine5: "",
        contactNumber: "",
        email: "",
        role: "",
        vehicleList: "",
        fieldList: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentStaffId, setCurrentStaffId] = useState<string | null>(null); // Track the staff being edited

    const columns: TableColumnsType<StaffFormData> = [
        { title: "Member Code", dataIndex: "memberCode", key: "memberCode" },
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
        { title: "Joined Date", dataIndex: "joinedDate", key: "joinedDate" },
        { title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Designation", dataIndex: "designation", key: "designation" },
        { title: "Contact No", dataIndex: "contactNumber", key: "contactNumber" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger"
                        onClick={() => handleDelete(record.memberCode!)}
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (currentStaffId) {
            // Update existing staff
            dispatch(updateStaff({ staff_id: currentStaffId, ...formData }));
        } else {
            // Add new staff
            const newStaff = { ...formData, memberCode: `STAFF-${Date.now()}` }; // Generate unique memberCode
            dispatch(addStaff(newStaff));
        }

        // Reset form and modal state
        setFormData({
            firstName: "",
            lastName: "",
            joinedDate: "",
            dateOfBirth: "",
            gender: "",
            designation: "",
            addressLine1: "",
            addressLine2: "",
            addressLine3: "",
            addressLine4: "",
            addressLine5: "",
            contactNumber: "",
            email: "",
            role: "",
            vehicleList: "",
            fieldList: "",
        });
        setCurrentStaffId(null);
        setModalOpen(false);
    };

    const handleEdit = (staff: StaffFormData) => {
        setFormData(staff); // Prefill form with staff data
        setCurrentStaffId(staff.memberCode || null); // Set the staff being edited
        setModalOpen(true);
    };

    const handleDelete = (memberCode: string) => {
        dispatch(deleteStaff({ staff_id: memberCode }));
    };

    return (
        <div id="staffSection" className="content-section">
            <h2 className="text-center my-4">Staff Management</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Staff"
                    className="btn btn-success"
                    onClick={() => {
                        setFormData({
                            firstName: "",
                            lastName: "",
                            joinedDate: "",
                            dateOfBirth: "",
                            gender: "",
                            designation: "",
                            addressLine1: "",
                            addressLine2: "",
                            addressLine3: "",
                            addressLine4: "",
                            addressLine5: "",
                            contactNumber: "",
                            email: "",
                            role: "",
                            vehicleList: "",
                            fieldList: "",
                        });
                        setCurrentStaffId(null); // Clear edit state
                        setModalOpen(true);
                    }}
                />
            </div>
            <Table<StaffFormData>
                columns={columns}
                dataSource={staffList}
                rowKey="memberCode"
            />
            <MainModal
                isType={currentStaffId ? "Edit Staff" : "Add Staff"}
                buttonType={currentStaffId ? "Update Staff" : "Save Staff"}
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
                        { label: "Address Line 1", id: "addressLine1" },
                        { label: "Address Line 2", id: "addressLine2" },
                        { label: "Address Line 3", id: "addressLine3" },
                        { label: "Address Line 4", id: "addressLine4" },
                        { label: "Address Line 5", id: "addressLine5" },
                        { label: "Contact Number", id: "contactNumber" },
                        { label: "Email", id: "email" },
                        { label: "Role", id: "role" },
                        { label: "Vehicle List", id: "vehicleList" },
                        { label: "Field List", id: "fieldList" },
                    ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type={id.includes("Date") ? "date" : "text"}
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
