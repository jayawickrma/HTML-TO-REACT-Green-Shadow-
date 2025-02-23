import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { RootState } from "../../store/Store.ts";
import { getAllStaffs, saveStaff, updateStaff, deleteStaff } from "../../slices/StaffSlice.ts";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

const StaffManagement: React.FC = () => {
    const dispatch = useDispatch();
    const staffList = useSelector((state: RootState) => state.staffs.staffs);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (staffList.length === 0) {
            dispatch(getAllStaffs());
        }
    }, [dispatch, staffList.length]);


    const columns = [
        { title: "Member Code", dataIndex: "memberCode", key: "memberCode" },
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
        { title: "Joined Date", dataIndex: "joinedDate", key: "joinedDate" },
        { title: "Date of Birth", dataIndex: "dateOfBirth", key: "dateOfBirth" },
        { title: "Gender", dataIndex: "gender", key: "gender" },
        { title: "Designation", dataIndex: "designation", key: "designation" },
        { title: "Address Line 1", dataIndex: "addressLine1", key: "addressLine1" },
        { title: "Address Line 2", dataIndex: "addressLine2", key: "addressLine2" },
        { title: "Address Line 3", dataIndex: "addressLine3", key: "addressLine3" },
        { title: "Address Line 4", dataIndex: "addressLine4", key: "addressLine4" },
        { title: "Address Line 5", dataIndex: "addressLine5", key: "addressLine5" },
        { title: "Contact No", dataIndex: "contactNumber", key: "contactNumber" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Role", dataIndex: "role", key: "role" },
        { title: "Vehicle List", dataIndex: "vehicleList", key: "vehicleList" },
        { title: "Field List", dataIndex: "fieldList", key: "fieldList" },
        {
            title: "Actions",
            key: "actions",
            fixed: "right",
            render: (_, record) => (
                <div>
                    <CustomButton label="Edit" className="btn btn-primary" onClick={() => handleEdit(record)} />
                    <CustomButton label="Delete" className="btn btn-danger" onClick={() => handleDelete(record.memberCode)} />
                </div>
            ),
        },
    ];


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        if (isEditing) {
            dispatch(updateStaff(formData));
        } else {
            dispatch(saveStaff(formData));
        }
        setModalOpen(false);
    };

    const handleEdit = (staff: any) => {
        setFormData(staff);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleDelete = (memberCode: string) => {
        dispatch(deleteStaff(memberCode));
    };

    return (
        <div id="staffSection" className="content-section">
            <h2 className="text-center my-4">Staff Management</h2>
            <CustomButton label="Add Staff" className="btn btn-success" onClick={() => { setFormData({}); setIsEditing(false); setModalOpen(true); }} />
            <Table columns={columns} dataSource={staffList} rowKey="memberCode" />
            <MainModal isType={isEditing ? "Edit Staff" : "Add Staff"} isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
                <form>
                    {["firstName", "lastName", "designation", "contactNumber", "email"].map((field) => (
                        <div className="mb-3" key={field}>
                            <label htmlFor={field} className="form-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                            <input type="text" id={field} value={formData[field] || ""} className="form-control" onChange={handleInputChange} required />
                        </div>
                    ))}
                </form>
            </MainModal>
        </div>
    );
};

export default StaffManagement;