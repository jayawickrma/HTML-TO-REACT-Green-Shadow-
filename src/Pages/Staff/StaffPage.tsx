import React, { useState } from "react";

const StaffPage = () => {
    const [staffList, setStaffList] = useState([]); // Holds staff data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        joinedDate: "",
        dateOfBirth: "",
        gender: "",
        designation: "",
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        address5: "",
        contactNo: "",
        email: "",
        role: "",
        vehicle: "",
        field: "",
        log: "",
    });
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStaffList((prevList) => [...prevList, { ...formData, id: Date.now() }]);
        setFormData({
            firstName: "",
            lastName: "",
            joinedDate: "",
            dateOfBirth: "",
            gender: "",
            designation: "",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            address5: "",
            contactNo: "",
            email: "",
            role: "",
            vehicle: "",
            field: "",
            log: "",
        });
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setStaffList((prevList) => prevList.filter((staff) => staff.id !== id));
    };

    return (
        <div id="staffSection" className="content-section">
            <div className="d-flex justify-content-between mb-4">
                <h2>Staff Management</h2>
                <button className="btn btn-success" onClick={() => setShowModal(true)}>
                    Add Staff
                </button>
            </div>

            <div id="staffTableContainer">
                <table className="table table-bordered" id="staffTable">
                    <thead className="table-success">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Joined Date</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Designation</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staffList.map((staff) => (
                        <tr key={staff.id}>
                            <td>{staff.firstName}</td>
                            <td>{staff.lastName}</td>
                            <td>{staff.joinedDate}</td>
                            <td>{staff.dateOfBirth}</td>
                            <td>{staff.gender}</td>
                            <td>{staff.designation}</td>
                            <td>{staff.contactNo}</td>
                            <td>{staff.email}</td>
                            <td>{staff.role}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(staff.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal show d-block" id="staffModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Staff</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form id="staffForm" onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label htmlFor="firstName" className="form-label">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="lastName" className="form-label">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        {/* Add remaining fields similarly */}
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">
                                        Save Staff
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffPage;
