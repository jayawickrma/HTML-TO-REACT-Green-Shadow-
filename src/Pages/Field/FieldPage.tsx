import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { saveField, updateField, deleteField, FieldRootState, getAllFields } from "../../slices/FieldSlice";
import FieldModel from "../../Model/FieldModel";

const ManageFields: React.FC = () => {
    const fields = useSelector((state: FieldRootState) => state.field.fields);  // Accessing fields from the Redux store
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Omit<FieldModel, "fieldCode">>({
        fieldName: "",
        fieldLocation: "",
        fieldExtentSize: "",
        fieldImage1: null,
        fieldImage2: null,
        equipmentList: "",
        cropList: "",
        logList: "",
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<FieldModel | null>(null);
    const [imagePopup, setImagePopup] = useState<string | null>(null);

    const columns = [
        { title: "Field Code", dataIndex: "fieldCode", key: "fieldCode" },
        { title: "Field Name", dataIndex: "fieldName", key: "fieldName" },
        { title: "Location", dataIndex: "fieldLocation", key: "fieldLocation" },
        { title: "Size (Acres)", dataIndex: "fieldExtentSize", key: "fieldExtentSize" },
        {
            title: "Image 1",
            dataIndex: "fieldImage1",
            key: "fieldImage1",
            render: (image: File | null) =>
                image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Field Image 1"
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(URL.createObjectURL(image))}
                    />
                ) : null,
        },
        {
            title: "Image 2",
            dataIndex: "fieldImage2",
            key: "fieldImage2",
            render: (image: File | null) =>
                image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Field Image 2"
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(URL.createObjectURL(image))}
                    />
                ) : null,
        },
        { title: "Equipment List", dataIndex: "equipmentList", key: "equipmentList" },
        { title: "Crop List", dataIndex: "cropList", key: "cropList" },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: FieldModel) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(record.fieldCode)}
                    />
                </div>
            ),
        },
    ];

    useEffect(() => {
        dispatch(getAllFields());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "fieldImage1" | "fieldImage2") => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({
                ...prev,
                [field]: e.target.files[0],  // Store the file object
            }));
        }
    };

    const handleSubmit = () => {
        const newField = {
            ...formData,
            fieldCode: editingField ? editingField.fieldCode : `FLD${fields.length + 1}`,
        };

        const formDataToSubmit = new FormData();
        formDataToSubmit.append("fieldCode", newField.fieldCode);
        formDataToSubmit.append("fieldName", newField.fieldName);
        formDataToSubmit.append("fieldLocation", newField.fieldLocation);
        formDataToSubmit.append("fieldExtentSize", newField.fieldExtentSize);
        formDataToSubmit.append("equipmentList", newField.equipmentList);
        formDataToSubmit.append("cropList", newField.cropList);
        formDataToSubmit.append("logList", newField.logList);

        if (newField.fieldImage1) {
            formDataToSubmit.append("fieldImage1", newField.fieldImage1);
        }
        if (newField.fieldImage2) {
            formDataToSubmit.append("fieldImage2", newField.fieldImage2);
        }

        if (editingField) {
            dispatch(updateField(formDataToSubmit));  // Update field
        } else {
            dispatch(saveField(formDataToSubmit));  // Save new field
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            fieldName: "",
            fieldLocation: "",
            fieldExtentSize: "",
            fieldImage1: null,
            fieldImage2: null,
            equipmentList: "",
            cropList: "",
            logList: "",
        });
        setModalOpen(false);
        setEditingField(null);
    };

    const handleEdit = (record: FieldModel) => {
        setEditingField(record);
        setFormData(record);
        setModalOpen(true);
    };

    const handleDelete = (fieldCode: string) => {
        dispatch(deleteField(fieldCode));  // Delete field by fieldCode
    };

    return (
        <div id="manageFieldsSection" className="content-section">
            <h2 className="text-center my-4">Manage Fields</h2>
            <div className="d-flex justify-content-center mb-4">
                <CustomButton
                    label="Add New Field"
                    className="btn btn-success"
                    onClick={() => {
                        resetForm();
                        setModalOpen(true);
                    }}
                />
            </div>
            <Table columns={columns} dataSource={fields || []} rowKey="fieldCode" />
            <MainModal
                isType={editingField ? "Edit Field" : "Add Field"}
                buttonType={editingField ? "Save Changes" : "Add Field"}
                isOpen={isModalOpen}
                onClose={resetForm}
                onSubmit={handleSubmit}
            >
                <form>
                    {[{ label: "Field Name", id: "fieldName" },
                        { label: "Location", id: "fieldLocation" },
                        { label: "Extent Size (Acres)", id: "fieldExtentSize" },
                        { label: "Equipment List", id: "equipmentList" },
                        { label: "Crop List", id: "cropList" },
                        { label: "Log List", id: "logList" }].map(({ label, id }) => (
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
                    {["fieldImage1", "fieldImage2"].map((id) => (
                        <div className="mb-3" key={id}>
                            <label htmlFor={id} className="form-label">
                                {id === "fieldImage1" ? "Image 1" : "Image 2"}
                            </label>
                            <input
                                type="file"
                                id={id}
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, id as "fieldImage1" | "fieldImage2")}
                            />
                        </div>
                    ))}
                </form>
            </MainModal>
            {imagePopup && (
                <div
                    id="imagePopup"
                    style={{
                        display: "flex",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.8)",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                    }}
                >
                    <span
                        className="close"
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            fontSize: "30px",
                            color: "white",
                            cursor: "pointer",
                        }}
                        onClick={() => setImagePopup(null)}
                    >
                        ×
                    </span>
                    <img
                        id="popupImage"
                        src={imagePopup}
                        alt="Popup Image"
                        style={{ maxWidth: "50%", maxHeight: "50%" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ManageFields;
