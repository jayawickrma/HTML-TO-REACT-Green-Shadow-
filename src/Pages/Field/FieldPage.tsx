import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";

interface Field {
    id: number;
    fieldName: string;
    location: string;
    size: number;
    image1: string;
    image2: string;
    staff: string;
    crops: string;
}

const Fields: React.FC = () => {
    const [fields, setFields] = useState<Field[]>([]);
    const [formData, setFormData] = useState<Omit<Field, "id">>({
        fieldName: "",
        location: "",
        size: 0,
        image1: "",
        image2: "",
        staff: "",
        crops: "",
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [imagePopup, setImagePopup] = useState<string | null>(null);

    const columns: TableColumnsType<Field> = [
        { title: "Field Code", dataIndex: "id", key: "id" },
        { title: "Field Name", dataIndex: "fieldName", key: "fieldName" },
        { title: "Location", dataIndex: "location", key: "location" },
        { title: "Size (Acres)", dataIndex: "size", key: "size" },
        {
            title: "Image 1",
            dataIndex: "image1",
            key: "image1",
            render: (image: string) => (
                <img
                    src={image}
                    alt="Field Image 1"
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    onClick={() => setImagePopup(image)}
                />
            ),
        },
        {
            title: "Image 2",
            dataIndex: "image2",
            key: "image2",
            render: (image: string) => (
                <img
                    src={image}
                    alt="Field Image 2"
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    onClick={() => setImagePopup(image)}
                />
            ),
        },
        { title: "Staff", dataIndex: "staff", key: "staff" },
        { title: "Crops", dataIndex: "crops", key: "crops" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Field) => (
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
        setFormData((prev) => ({
            ...prev,
            [id]: id === "size" ? Number(value) : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "image1" | "image2") => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    [field]: reader.result as string,
                }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const newField: Field = { id: fields.length + 1, ...formData };
        setFields([...fields, newField]);
        setFormData({
            fieldName: "",
            location: "",
            size: 0,
            image1: "",
            image2: "",
            staff: "",
            crops: "",
        });
        setModalOpen(false);
    };

    const handleDelete = (id: number) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    return (
        <div id="fieldsSection" className="content-section">
            <h2 className="text-center my-4">Manage Fields</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add Field"
                    className="btn btn-success"
                    onClick={() => setModalOpen(true)}
                />
            </div>  <br/><br/>
            <Table<Field> columns={columns} dataSource={fields} />
            <MainModal
                isType="Add Field"
                buttonType="Save Field"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            >
                <form>
                    {[
                        { label: "Field Name", id: "fieldName" },
                        { label: "Location", id: "location" },
                        { label: "Size (Acres)", id: "size" },
                        { label: "Staff", id: "staff" },
                        { label: "Crops", id: "crops" },
                    ].map(({ label, id }) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {label}
                            </label>
                            <input
                                type={id === "size" ? "number" : "text"}
                                id={id}
                                value={(formData as any)[id]}
                                className="form-control"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}
                    {["image1", "image2"].map((id) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {id === "image1" ? "Image 1" : "Image 2"}
                            </label>
                            <input
                                type="file"
                                id={id}
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, id as "image1" | "image2")}
                            />
                        </div>
                    ))}
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

export default Fields;
