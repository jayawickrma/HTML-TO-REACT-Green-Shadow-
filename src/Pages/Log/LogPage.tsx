import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, TableColumnsType } from "antd";
import { RootState } from "../../store/Store.ts"; // Adjust the import based on your Redux store setup
import { addLog, updateLog, deleteLog } from "../../slices/LogSlice.ts";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import logModel from "../../Model/LogModel";

const Logs: React.FC = () => {
    const logs = useSelector((state: RootState) => state.logs); // Fetch logs from Redux store
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<logModel | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [imagePopup, setImagePopup] = useState<string | null>(null);
    const [editingLogCode, setEditingLogCode] = useState<string | null>(null); // Track the log being edited

    const columns: TableColumnsType<logModel> = [
        { title: "Log Code", dataIndex: "logCode", key: "logCode" },
        { title: "Date", dataIndex: "logDate", key: "logDate" },
        { title: "Details", dataIndex: "logDetails", key: "logDetails" },
        {
            title: "Image",
            dataIndex: "observedImage",
            key: "observedImage",
            render: (image: File | null) =>
                image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Log Image"
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(URL.createObjectURL(image))}
                    />
                ) : null,
        },
        { title: "Staff", dataIndex: "staffList", key: "staffList" },
        { title: "Crop", dataIndex: "cropList", key: "cropList" },
        { title: "Field", dataIndex: "fieldList", key: "fieldList" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: logModel) => (
                <div>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger"
                        onClick={() => handleDelete(record.logCode)}
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => {
            if (prev) {
                return { ...prev, [id]: value };
            }
            return null;
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => {
                if (prev) {
                    return { ...prev, observedImage: file };
                }
                return null;
            });
        }
    };

    const handleSubmit = () => {
        if (!formData) return;

        if (editingLogCode) {
            dispatch(updateLog({ log_id: editingLogCode, ...formData }));
        } else {
            dispatch(addLog(formData));
        }

        setFormData(null);
        setEditingLogCode(null);
        setModalOpen(false);
    };

    const handleEdit = (log: logModel) => {
        setFormData(log);
        setEditingLogCode(log.logCode);
        setModalOpen(true);
    };

    const handleDelete = (logCode: string) => {
        dispatch(deleteLog({ log_id: logCode }));
    };

    return (
        <div id="logsSection" className="content-section">
            <h2 className="text-center my-4">Manage Logs</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Log"
                    className="btn btn-success"
                    onClick={() => {
                        setFormData(
                            new logModel("", "", "", null, "", "", "")
                        );
                        setEditingLogCode(null);
                        setModalOpen(true);
                    }}
                />
            </div>
            <Table<logModel> columns={columns} dataSource={logs} rowKey="logCode" />
            <MainModal
                isType={editingLogCode ? "Edit Log" : "Add Log"}
                buttonType={editingLogCode ? "Update Log" : "Save Log"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[{ label: "Log Code", id: "logCode" }, { label: "Date", id: "logDate" }, { label: "Details", id: "logDetails" }, { label: "Staff", id: "staffList" }, { label: "Crop", id: "cropList" }, { label: "Field", id: "fieldList" }].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type="text"
                                id={id}
                                value={(formData as any)?.[id] || ""}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="observedImage" className="form-label">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="observedImage"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>
            </MainModal>
            {imagePopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0, 0, 0, 0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <img src={imagePopup} alt="Popup" style={{ maxHeight: "80%", maxWidth: "80%" }} />
                    <CustomButton
                        label="Close"
                        className="btn btn-light"
                        onClick={() => setImagePopup(null)}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Logs;
