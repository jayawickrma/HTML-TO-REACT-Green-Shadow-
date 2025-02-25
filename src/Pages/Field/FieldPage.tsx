import React, { useEffect, useState } from "react";
import { Table } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { saveField, updateField, deleteField, FieldRootState, getAllFields } from "../../slices/FieldSlice";
import FieldModel from "../../Model/FieldModel";
import Swal from "sweetalert2";
import "../../css/equipmentPage.css"; // Import the CSS file

const ManageFields: React.FC = () => {
    const fields = useSelector((state: FieldRootState) => state.field.fields);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Omit<FieldModel, "fieldCode">>({
        name: "",
        location: "",
        extentSize: "",
        fieldImage: null,
        equipmentList: "",
        cropList: "",
        logList: "",
    });

    const [isModalOpen, setModalOpen] = useState(false);
    const [editingField, setEditingField] = useState<FieldModel | null>(null);
    const [imagePopup, setImagePopup] = useState<string | null>(null);

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
                        src={image} // Base64 string used here directly
                        alt="Field Image"
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(`data:image/png;base64,${image}`)} // Trigger the popup to show the image in larger size
                    />
                ) : (
                    <span>No image</span>
                ),
        },
        {
            title: "Equipment List",
            dataIndex: "EquipmentFieldDetails",
            key: "equipmentList",
            render: (equipment: { equipmentCode: number }[]) =>
                equipment?.length > 0 ? equipment.map((equipment) => equipment.equipmentCode).join(", ") : "N/A",
        },
        {
            title: "Crop List",
            dataIndex: "CropFieldDetails",
            key: "cropList",
            render: (crops: { cropCode: number }[]) =>
                crops?.length > 0 ? crops.map((crop) => crop.cropCode).join(", ") : "N/A",
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
        dispatch(getAllFields());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                fieldImage: file,
            }));
        }
    };

    const handleSubmit = () => {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("location", formData.location);
        formDataObj.append("extentSize", formData.extentSize);
        formDataObj.append("equipmentList", formData.equipmentList);
        formDataObj.append("cropList", formData.cropList);
        formDataObj.append("logList", formData.logList);

        if (formData.fieldImage) {
            formDataObj.append("fieldImage", formData.fieldImage);
        }

        if (editingField) {
            formDataObj.append("fieldCode", editingField.fieldCode);
            dispatch(updateField(formDataObj))
                .then(() => {
                    Swal.fire("Success!", "Field updated successfully.", "success");
                    dispatch(getAllFields());
                    resetForm();
                })
                .catch(() => {
                    Swal.fire("Error!", "Failed to update field.", "error");
                });
        } else {
            formDataObj.append("fieldCode", `FLD${fields.length + 1}`);
            dispatch(saveField(formDataObj))
                .then(() => {
                    Swal.fire("Success!", "Field added successfully.", "success");
                    dispatch(getAllFields());
                    resetForm();
                })
                .catch(() => {
                    Swal.fire("Error!", "Failed to add field.", "error");
                });
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            location: "",
            extentSize: "",
            fieldImage: null,
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
                dispatch(deleteField(fieldCode))
                    .then(() => {
                        Swal.fire("Deleted!", "Field has been deleted.", "success");
                        dispatch(getAllFields());
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to delete field.", "error");
                    });
            }
        });
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
                    {[
                        { label: "Field Name", id: "name" },
                        { label: "Location", id: "location" },
                        { label: "Extent Size (Acres)", id: "extentSize" },
                        { label: "Equipment List", id: "equipmentList" },
                        { label: "Crop List", id: "cropList" },
                        { label: "Log List", id: "logList" },
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