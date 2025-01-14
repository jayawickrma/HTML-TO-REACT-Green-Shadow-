import React, { useState } from "react";

export function LogPage() {
    const [logs, setLogs] = useState([]);
    const [modalData, setModalData] = useState({
        logCode: "",
        logDate: "",
        logDetails: "",
        logImage: null,
        logStaff: "",
        logCrop: "",
        logField: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setModalData((prev) => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setModalData((prev) => ({ ...prev, logImage: file }));
    };

    const handleAddLog = () => {
        setModalData({
            logCode: "",
            logDate: "",
            logDetails: "",
            logImage: null,
            logStaff: "",
            logCrop: "",
            logField: "",
        });
        setIsEdit(false);
    };

    const handleEditLog = (log) => {
        setModalData(log);
        setIsEdit(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            setLogs((prevLogs) =>
                prevLogs.map((log) =>
                    log.logCode === modalData.logCode ? modalData : log
                )
            );
        } else {
            setLogs((prevLogs) => [
                ...prevLogs,
                { ...modalData, logCode: Date.now().toString() },
            ]);
        }
        setModalData({
            logCode: "",
            logDate: "",
            logDetails: "",
            logImage: null,
            logStaff: "",
            logCrop: "",
            logField: "",
        });
    };

    const handleDeleteLog = (logCode) => {
        setLogs((prevLogs) => prevLogs.filter((log) => log.logCode !== logCode));
    };

    return (
        <div id="logsSection" className="content-section">
            <div className="section">
                <h2 className="text-center my-4">Log Management</h2>

                <div className="d-flex justify-content-center mb-4">
                    <button
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#logModal"
                        onClick={handleAddLog}
                    >
                        Add Log
                    </button>
                </div>

                <table className="table table-bordered">
                    <thead className="table-success">
                    <tr>
                        <th>Log Code</th>
                        <th>Date</th>
                        <th>Details</th>
                        <th>Image</th>
                        <th>Staff</th>
                        <th>Crop</th>
                        <th>Field</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log) => (
                        <tr key={log.logCode}>
                            <td>{log.logCode}</td>
                            <td>{log.logDate}</td>
                            <td>{log.logDetails}</td>
                            <td>
                                {log.logImage ? (
                                    <img
                                        src={URL.createObjectURL(log.logImage)}
                                        alt="Log"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td>{log.logStaff}</td>
                            <td>{log.logCrop}</td>
                            <td>{log.logField}</td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#logModal"
                                    onClick={() => handleEditLog(log)}
                                >
                                    Edit
                                </button>{" "}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteLog(log.logCode)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="logModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {isEdit ? "Edit Log" : "Add Log"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form id="logForm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="logDate" className="form-label">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="logDate"
                                        value={modalData.logDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logDetails" className="form-label">
                                        Details
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="logDetails"
                                        value={modalData.logDetails}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logImage" className="form-label">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="logImage"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logStaff" className="form-label">
                                        Staff
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logStaff"
                                        value={modalData.logStaff}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logCrop" className="form-label">
                                        Crop
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logCrop"
                                        value={modalData.logCrop}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="logField" className="form-label">
                                        Field
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="logField"
                                        value={modalData.logField}
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
        </div>
    );
}
