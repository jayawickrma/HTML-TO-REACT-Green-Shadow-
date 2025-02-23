import React, { useEffect, useState } from "react";
import { Table } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { saveField, updateField, deleteField, FieldRootState, getAllFields } from "../../slices/FieldSlice";
import FieldModel from "../../Model/FieldModel";

// ManageFields Component
const ManageFields: React.FC = () => {
    const fields = useSelector((state: FieldRootState) => state.field.fields); // Access fields state
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Omit<FieldModel, "fieldCode">>({
        fieldName: "",
        fieldLocation: "",
        fieldExtentSize: "",
        fieldImage: "", // Now we store base64 string
        equipmentList: "",
        cropList: "",
        logList: "",
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<FieldModel | null>(null);
    const [imagePopup, setImagePopup] = useState<string | null>(null);

    // Table columns definition
    const columns = [
        { title: "Field Code", dataIndex: "fieldCode", key: "fieldCode" },
        { title: "Field Name", dataIndex: "name", key: "fieldName" },
        { title: "Location", dataIndex: "location", key: "fieldLocation" },
        { title: "Size (Acres)", dataIndex: "extentSize", key: "fieldExtentSize" },
        {
            title: "Field Image",
            dataIndex: "fieldImage",
            key: "fieldImage",
            render: (image: string | null) =>
                image ? (
                    <img
                        src={image}  // Base64 string used here directly
                        alt="Field Image"
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(image)}  // Trigger the popup to show the image in larger size
                    />
                ) : (
                    <span>No image</span>
                ),
        },
        { title: "Equipment List", dataIndex: "EquipmentFieldDetails", key: "equipmentList",
            render: (equipment: { equipmentCode: number }[]) =>
                equipment?.length > 0 ? equipment.map(equipment => equipment.equipmentCode).join(", ") : "N/A",
        },
        { title: "Crop List", dataIndex: "CropFieldDetails", key: "cropList",
            render: (crops: { cropCode: number }[]) =>
                crops?.length > 0 ? crops.map(crop => crop.cropCode).join(", ") : "N/A",
        },
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
        dispatch(getAllFields()); // Fetch all fields from Redux store
    }, [dispatch]);

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // Handle file change for image input and convert to base64 string
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setFormData((prev) => ({
                    ...prev,
                    fieldImage: base64String, // Store base64 string for image
                }));
            };
            reader.readAsDataURL(e.target.files[0]); // Convert file to base64
        }
    };

    // Handle form submission (either add or update field)
    const handleSubmit = () => {
        const newField = {
            ...formData,
            fieldCode: editingField ? editingField.fieldCode : `FLD${fields.length + 1}`,
        };

        if (editingField) {
            dispatch(updateField(newField));  // Update the field
        } else {
            dispatch(saveField(newField));  // Add the new field
        }
        resetForm(); // Reset the form after submission
    };

    // Reset form to its initial state
    const resetForm = () => {
        setFormData({
            fieldName: "",
            fieldLocation: "",
            fieldExtentSize: "",
            fieldImage: "", // Reset to empty string
            equipmentList: "",
            cropList: "",
            logList: "",
        });
        setModalOpen(false);
        setEditingField(null);
    };

    // Handle Edit action
    const handleEdit = (record: FieldModel) => {
        setEditingField(record);
        setFormData(record);
        setModalOpen(true);
    };

    // Handle Delete action
    const handleDelete = (fieldCode: string) => {
        dispatch(deleteField(fieldCode)); // Delete the field by its fieldCode
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
            <Table columns={columns} dataSource={fields} rowKey="fieldCode" />
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
                    <div className="mb-3">
                        <label htmlFor="fieldImage" className="form-label">
                            Field Image (Upload Image)
                        </label>
                        <input
                            type="file"
                            id="fieldImage"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
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
