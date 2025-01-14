import React, { useState } from "react";

export function EquipmentPage() {
    // State for modal visibility and form data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [equipmentList, setEquipmentList] = useState([]);
    const [formData, setFormData] = useState({
        equipmentID: "",
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "",
        availableCount: "",
        field: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Open modal for adding new equipment
    const openModal = () => {
        setFormData({
            equipmentID: "",
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "",
            availableCount: "",
            field: "",
        });
        setIsEdit(false);
        setIsModalOpen(true);
    };

    // Open modal for editing equipment
    const editEquipment = (equipment) => {
        setFormData(equipment);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            setEquipmentList((prevList) =>
                prevList.map((item) =>
                    item.equipmentID === formData.equipmentID ? formData : item
                )
            );
        } else {
            setEquipmentList((prevList) => [
                ...prevList,
                { ...formData, equipmentID: Date.now().toString() },
            ]);
        }
        closeModal();
    };

    // Handle equipment deletion
    const deleteEquipment = (id) => {
        setEquipmentList(equipmentList.filter((item) => item.equipmentID !== id));
    };

    return (
        <div id="equipmentSection" className="content-section">
            <h2 className="text-center my-4">Manage Equipment</h2>

            {/* Add Equipment Button */}
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-success" onClick={openModal}>
                    Add Equipment
                </button>
            </div>

            {/* Equipment Table */}
            <table className="table table-bordered">
                <thead className="table-success">
                <tr>
                    <th>Equipment ID</th>
                    <th>Equipment Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Available Count</th>
                    <th>Field</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {equipmentList.map((equipment) => (
                    <tr key={equipment.equipmentID}>
                        <td>{equipment.equipmentID}</td>
                        <td>{equipment.equipmentName}</td>
                        <td>{equipment.equipmentType}</td>
                        <td>{equipment.equipmentStatus}</td>
                        <td>{equipment.availableCount}</td>
                        <td>{equipment.field}</td>
                        <td>
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => editEquipment(equipment)}
                            >
                                Edit
                            </button>{" "}
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteEquipment(equipment.equipmentID)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="modal fade show" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEdit ? "Edit Equipment" : "Add Equipment"}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="equipmentName" className="form-label">
                                            Equipment Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="equipmentName"
                                            value={formData.equipmentName}
                                            onChange={handleInputChange}
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
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="equipmentStatus" className="form-label">
                                            Status
                                        </label>
                                        <select
                                            className="form-select"
                                            id="equipmentStatus"
                                            value={formData.equipmentStatus}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>
                                        </select>
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
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="field" className="form-label">
                                            Field
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="field"
                                            value={formData.field}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
