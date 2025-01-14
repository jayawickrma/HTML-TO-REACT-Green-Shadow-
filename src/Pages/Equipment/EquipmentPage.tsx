import {useState} from "react";


export function EquipmentPage() {
    const [equipmentList, setEquipmentList] = useState([]);
    const [modalData, setModalData] = useState({
        equipmentName: "",
        equipmentType: "",
        equipmentStatus: "",
        availableCount: "",
        field: "",
        equipmentID: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setModalData({ ...modalData, [id]: value });
    };

    const handleAddEquipment = () => {
        setModalData({
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "",
            availableCount: "",
            field: "",
            equipmentID: "",
        });
        setIsEdit(false);
    };

    const handleEditEquipment = (equipment) => {
        setModalData(equipment);
        setIsEdit(true);
    };

    const handleDeleteEquipment = (id) => {
        setEquipmentList(equipmentList.filter((item) => item.equipmentID !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            setEquipmentList((prevList) =>
                prevList.map((item) =>
                    item.equipmentID === modalData.equipmentID ? modalData : item
                )
            );
        } else {
            setEquipmentList((prevList) => [
                ...prevList,
                { ...modalData, equipmentID: Date.now().toString() },
            ]);
        }
        setModalData({
            equipmentName: "",
            equipmentType: "",
            equipmentStatus: "",
            availableCount: "",
            field: "",
            equipmentID: "",
        });
    };

    return (
        <div id="equipmentSection" className="content-section">
            {/* Modal */}
            <div
                className="modal fade"
                id="equipmentModal"
                tabIndex="-1"
                aria-labelledby="equipmentModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="equipmentModalLabel">
                                {isEdit ? "Edit Equipment" : "Add Equipment"}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form id="equipmentForm" onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="equipmentName" className="form-label">
                                            Equipment Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="equipmentName"
                                            value={modalData.equipmentName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="equipmentType" className="form-label">
                                            Equipment Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="equipmentType"
                                            value={modalData.equipmentType}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="equipmentStatus" className="form-label">
                                            Status
                                        </label>
                                        <select
                                            className="form-select"
                                            id="equipmentStatus"
                                            value={modalData.equipmentStatus}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="availableCount" className="form-label">
                                            Available Count
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="availableCount"
                                            value={modalData.availableCount}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="field" className="form-label">
                                            Field
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="field"
                                            value={modalData.field}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3"
                                    data-bs-dismiss="modal"
                                >
                                    Save Equipment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Button to trigger modal */}
            <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#equipmentModal"
                onClick={handleAddEquipment}
            >
                Add New Equipment
            </button>

            {/* Equipment Table */}
            <div className="container mt-5">
                <h3>Equipment List</h3>
                <table className="table" id="equipmentTable">
                    <thead>
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
                                    className="btn btn-primary btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#equipmentModal"
                                    onClick={() => handleEditEquipment(equipment)}
                                >
                                    Edit
                                </button>{" "}
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteEquipment(equipment.equipmentID)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
