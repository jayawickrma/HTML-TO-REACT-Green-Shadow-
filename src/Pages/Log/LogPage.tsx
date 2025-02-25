import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/Store";
import { fetchLogs, createLog, updateLog, deleteLog } from "../../slices/LogSlice";
import { Table, TableColumnsType } from "antd";
import logModel from "../../Model/LogModel";
import MainModal from "../../Components/Add/AddComponent";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import Swal from "sweetalert2"; // Import SweetAlert2

const LogPage: React.FC = () => {
    const dispatch = useDispatch();
    const { logs, loading, error } = useSelector((state: RootState) => state.logs);

    const [formData, setFormData] = useState<logModel | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingLogCode, setEditingLogCode] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchLogs());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
            });
        }
    }, [error]);

    const columns: TableColumnsType<logModel> = [
        { title: "Log Code", dataIndex: "logCode", key: "logCode" },
        { title: "Date", dataIndex: "date", key: "logDate" },
        { title: "Details", dataIndex: "logDetails", key: "logDetails" },
        {
            title: "Observed Image",
            dataIndex: "observedImage",
            key: "observedImage",
            render: (image: string | null) =>
                image ? (
                    <img
                        src={image}
                        alt="Observed Image"
                        style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                        onClick={() => window.open(image, "_blank")}
                    />
                ) : (
                    "No Image"
                ),
        },
        { title: "Staff", dataIndex: "LogStaffDetails", key: "staffList",
            render: (staffs: { staffId: number }[]) =>
                staffs?.length > 0 ? staffs.map(staff => staff.staffId).join(", ") : "N/A",
        },
        { title: "Crop", dataIndex: "LogCropDetails", key: "cropList",
            render: (crops: { cropCode: number }[]) =>
                crops?.length > 0 ? crops.map(crop => crop.cropCode).join(", ") : "N/A",
        },
        { title: "Field", dataIndex: "LogFieldsDetails", key: "fieldList",
            render: (fields: { fieldCode: number }[]) =>
                fields?.length > 0 ? fields.map(field => field.fieldCode).join(", ") : "N/A",
        },
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [id]: value } : null));
    };

    const handleSubmit = () => {
        if (!formData) return;

        const action = editingLogCode ? updateLog({ logCode: editingLogCode, updatedData: formData }) : createLog(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: `Log ${editingLogCode ? "Updated" : "Added"}`,
                    text: `Log ${editingLogCode ? "updated" : "added"} successfully!`,
                });
                setFormData(null);
                setEditingLogCode(null);
                setModalOpen(false);
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: err || `Failed to ${editingLogCode ? "update" : "add"} log`,
                });
            });
    };

    const handleEdit = (log: logModel) => {
        setFormData(log);
        setEditingLogCode(log.logCode);
        setModalOpen(true);
    };

    const handleDelete = (logCode: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteLog(logCode))
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Log deleted successfully.",
                        });
                        dispatch(fetchLogs())
                    })
                    .catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: err || "Failed to delete log",
                        });
                    });
            }
        });
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

            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table<logModel> columns={columns} dataSource={logs} rowKey="logCode" />
            )}

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
                            <input
                                type="text"
                                id={id}
                                className="form-control"
                                value={(formData as any)?.[id] || ""}
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

export default LogPage;