import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

interface Log {
    id: number;
    logCode: string;
    date: string;
    details: string;
    image: string;
    staff: string;
    crop: string;
    field: string;
}

const Logs: React.FC = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [formData, setFormData] = useState<Omit<Log, "id">>({
        logCode: "",
        date: "",
        details: "",
        image: "",
        staff: "",
        crop: "",
        field: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [imagePopup, setImagePopup] = useState<string | null>(null);

    const columns: TableColumnsType<Log> = [
        { title: "Log Code", dataIndex: "logCode", key: "logCode" },
        { title: "Date", dataIndex: "date", key: "date" },
        { title: "Details", dataIndex: "details", key: "details" },
        {
            title: "Image",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <img
                    src={image}
                    alt="Log Image"
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    onClick={() => setImagePopup(image)}
                />
            ),
        },
        { title: "Staff", dataIndex: "staff", key: "staff" },
        { title: "Crop", dataIndex: "crop", key: "crop" },
        { title: "Field", dataIndex: "field", key: "field" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Log) => (
                <CustomButton
                    label="Delete"
                    className="btn btn-danger"
                    onClick={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const newLog: Log = { id: logs.length + 1, ...formData };
        setLogs([...logs, newLog]);
        setFormData({
            logCode: "",
            date: "",
            details: "",
            image: "",
            staff: "",
            crop: "",
            field: "",
        });
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setLogs(logs.filter((log) => log.id !== id));
    };

    return (
        <div id="logsSection" className="content-section">
            <h2 className="text-center my-4">Manage Logs</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Log"
                    className="btn btn-success"
                    onClick={() => setModalOpen(true)}
                />
            </div>
            <Table<Log> columns={columns} dataSource={logs} />
            <MainModal
                isType="Add Log"
                buttonType="Save Log"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[
                        { label: "Log Code", id: "logCode" },
                        { label: "Date", id: "date" },
                        { label: "Details", id: "details" },
                        { label: "Staff", id: "staff" },
                        { label: "Crop", id: "crop" },
                        { label: "Field", id: "field" },
                    ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type="text"
                                id={id}
                                value={(formData as any)[id]}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            id="image"
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
