import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import { fetchLogs, createLog, updateLog, deleteLog } from "../../slices/LogSlice";
import { Table, TableColumnsType, Spin, message } from "antd";
import logModel from "../../Model/LogModel";
import MainModal from "../../Components/Add/AddComponent";
import CustomButton from "../../Components/Button/CustomButonComponent";

const LogPage: React.FC = () => {
    const dispatch = useDispatch();
    const { logs, loading, error } = useSelector((state: RootState) => state.logs);

    const [formData, setFormData] = useState<logModel | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingLogCode, setEditingLogCode] = useState<string | null>(null);

    // ✅ Load logs on page load
    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    // 🔹 Table Columns
    const columns: TableColumnsType<logModel> = [
        { title: "Log Code", dataIndex: "logCode", key: "logCode" },
        { title: "Date", dataIndex: "date", key: "logDate" },
        { title: "Details", dataIndex: "logDetails", key: "logDetails" },
        { title: "Staff", dataIndex: "staffList", key: "staffList" },
        { title: "Crop", dataIndex: "cropList", key: "cropList" },
        { title: "Field", dataIndex: "fieldList", key: "fieldList" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: logModel) => (
                <div>
                    <CustomButton label="Edit" className="btn btn-primary me-2" onClick={() => handleEdit(record)} />
                    <CustomButton label="Delete" className="btn btn-danger" onClick={() => handleDelete(record.logCode)} />
                </div>
            ),
        },
    ];

    // 🔹 Handle Input Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
    };

    // 🔹 Handle Submit (Add or Edit Log)
    const handleSubmit = () => {
        if (!formData) return;

        if (editingLogCode) {
            dispatch(updateLog({ logCode: editingLogCode, updatedData: formData }))
                .then(() => message.success("Log updated successfully"))
                .catch(() => message.error("Failed to update log"));
        } else {
            dispatch(createLog(formData))
                .then(() => message.success("Log added successfully"))
                .catch(() => message.error("Failed to add log"));
        }

        setFormData(null);
        setEditingLogCode(null);
        setModalOpen(false);
    };

    // 🔹 Handle Edit
    const handleEdit = (log: logModel) => {
        setFormData(log);
        setEditingLogCode(log.logCode);
        setModalOpen(true);
    };

    // 🔹 Handle Delete
    const handleDelete = (logCode: string) => {
        dispatch(deleteLog(logCode))
            .then(() => message.success("Log deleted successfully"))
            .catch(() => message.error("Failed to delete log"));
    };

    return (
        <div id="logsSection" className="content-section">
            <h2 className="text-center my-4">Manage Logs</h2>

            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Log"
                    className="btn btn-success"
                    onClick={() => {
                        setFormData(new logModel("", "", "", null, "", "", ""));
                        setEditingLogCode(null);
                        setModalOpen(true);
                    }}
                />
            </div>

            {loading ? <Spin size="large" className="d-block mx-auto" /> : <Table<logModel> columns={columns} dataSource={logs} rowKey="logCode" />}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* 🔹 Modal for Adding & Editing Logs */}
            <MainModal
                isType={editingLogCode ? "Edit Log" : "Add Log"}
                buttonType={editingLogCode ? "Update Log" : "Save Log"}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {["logCode", "logDate", "logDetails", "staffList", "cropList", "fieldList"].map((id) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">{id.replace(/([A-Z])/g, " $1")}</label>
                            <input type="text" id={id} className="form-control" value={(formData as any)?.[id] || ""} onChange={handleInputChange} required />
                        </div>
                    ))}
                </form>
            </MainModal>
        </div>
    );
};

export default LogPage;
