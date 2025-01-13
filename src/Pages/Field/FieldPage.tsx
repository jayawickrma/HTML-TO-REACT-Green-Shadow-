import React, { useState } from 'react';

export function FieldPage() {
    // State to manage modal visibility and form data
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fields, setFields] = useState<any[]>([]);  // Array of fields to populate the table
    const [formData, setFormData] = useState({
        fieldId: '',
        fieldName: '',
        location: '',
        extentSize: '',
        fieldImage1: null,
        fieldImage2: null,
        staffList: '',
        cropsList: ''
    });

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    // Handle file input changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;
        if (files && files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                [id]: files[0]
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newField = { ...formData };
        setFields([...fields, newField]);  // Add the new field to the table data
        setIsModalOpen(false);  // Close the modal
        setFormData({
            fieldId: '',
            fieldName: '',
            location: '',
            extentSize: '',
            fieldImage1: null,
            fieldImage2: null,
            staffList: '',
            cropsList: ''
        });  // Reset form data
    };

    // Open the modal to add or edit a field
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div id="fieldsSection" className="content-section">
                <h2 className="text-center my-4">Manage Fields</h2>

                {/* Add Field Button */}
                <div className="d-flex justify-content-center mb-4">
                    <button
                        id="addFieldBtn"
                        className="btn btn-success"
                        onClick={openModal} // Open modal
                    >
                        Add Field
                    </button>
                </div>

                {/* Field Table */}
                <table className="table table-bordered" id="fieldTable">
                    <thead className="table-success">
                    <tr>
                        <th>Field Code</th>
                        <th>Field Name</th>
                        <th>Location</th>
                        <th>Size (Acres)</th>
                        <th>Image 1</th>
                        <th>Image 2</th>
                        <th>Staff</th>
                        <th>Crops</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fields.map((field, index) => (
                        <tr key={index}>
                            <td>{field.fieldId}</td>
                            <td>{field.fieldName}</td>
                            <td>{field.location}</td>
                            <td>{field.extentSize}</td>
                            <td>{field.fieldImage1 ? 'Image Available' : 'No Image'}</td>
                            <td>{field.fieldImage2 ? 'Image Available' : 'No Image'}</td>
                            <td>{field.staffList}</td>
                            <td>{field.cropsList}</td>
                            <td>
                                <button className="btn btn-info">Edit</button>
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Add/Edit Modal */}
                {isModalOpen && (
                    <div className="modal fade show" id="fieldModal" style={{ display: 'block' }} tabIndex={-1} aria-labelledby="fieldModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="fieldModalLabel">Add/Edit Field</h5>
                                    <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="fieldForm" onSubmit={handleSubmit}>
                                        <input type="hidden" id="fieldId" value={formData.fieldId} />
                                        <div className="mb-3">
                                            <label htmlFor="fieldName" className="form-label">Field Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fieldName"
                                                value={formData.fieldName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="location" className="form-label">Location</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="extentSize" className="form-label">Size (Acres)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="extentSize"
                                                value={formData.extentSize}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="fieldImage1" className="form-label">Image 1</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="fieldImage1"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="fieldImage2" className="form-label">Image 2</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="fieldImage2"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="staffList" className="form-label">Staff</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="staffList"
                                                value={formData.staffList}
                                                onChange={handleInputChange}
                                                placeholder="Comma-separated staff IDs"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cropsList" className="form-label">Crops</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cropsList"
                                                value={formData.cropsList}
                                                onChange={handleInputChange}
                                                placeholder="Comma-separated crop IDs"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
