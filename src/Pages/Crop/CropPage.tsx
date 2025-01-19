import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store"; // Adjust import based on your project structure
import { addCrop, updateCrop, deleteCrop } from "../../slices/CropSlice"; // Adjust import based on your slice
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import CropModel from "../../Model/CropModel.ts"; // Import your CropModel

interface Crop {
    cropCode: number;
    cropName: string;
    cropCategory: string;
    cropSeason: string;
    scientificName: string;
    cropImage: string | null; // Image name or null
    logList: any[];
    fieldList: any[];
}

const Crops: React.FC = () => {
    const crops = useSelector((state: RootState) => state.crops);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Omit<Crop, "cropCode">>({
        cropName: "",
        cropCategory: "",
        cropSeason: "",
        scientificName: "",
        cropImage: null,
        logList: [],
        fieldList: [],
    });
    const [imagePopup, setImagePopup] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const columns: TableColumnsType<Crop> = [
        {
            title: "Crop Code",
            dataIndex: "cropCode",
            key: "cropCode",
        },
        {
            title: "Crop Name",
            dataIndex: "cropName",
            key: "cropName",
        },
        {
            title: "Category",
            dataIndex: "cropCategory",
            key: "cropCategory",
        },
        {
            title: "Season",
            dataIndex: "cropSeason",
            key: "cropSeason",
        },
        {
            title: "Scientific Name",
            dataIndex: "scientificName",
            key: "scientificName",
        },
        {
            title: "Image",
            dataIndex: "cropImage",
            key: "cropImage",
            render: (image: string, record: Crop) => (
                <img
                    src={image}
                    alt={record.cropName}
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                    onClick={() => setImagePopup(image)}
                />
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Crop) => (
                <div style={{ display: "flex", gap: "8px" }}>
                    <CustomButton
                        label="Edit"
                        type="button"
                        className="btn-warning"
                        onClick={() => handleEdit(record)}
                    />
                    <CustomButton
                        label="Delete"
                        type="button"
                        className="btn-danger"
                        onClick={() => handleDelete(record.cropCode)}
                    />
                </div>
            ),
        },
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setFormData((prev) => ({
                    ...prev,
                    cropImage: fileReader.result as string,
                }));
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleAdd = () => {
        const newCrop = new CropModel(
            crops.length + 1, // Or use another method to generate unique cropCode
            formData.cropName,
            formData.scientificName,
            formData.cropCategory,
            formData.cropSeason,
            formData.cropImage ? { name: formData.cropImage } : null, // Assuming file is being uploaded
            [], // logList (you can add logic for this)
            []  // fieldList (you can add logic for this)
        );
        dispatch(addCrop(newCrop.toPlainObject())); // Dispatch the plain object version
        resetForm();
    };

    const handleEdit = (record: Crop) => {
        setIsEditing(true);
        setEditId(record.cropCode);
        setFormData({
            cropName: record.cropName,
            cropCategory: record.cropCategory,
            cropSeason: record.cropSeason,
            scientificName: record.scientificName,
            cropImage: record.cropImage,
            logList: record.logList,
            fieldList: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        if (editId) {
            const updatedCrop = new CropModel(
                editId,
                formData.cropName,
                formData.scientificName,
                formData.cropCategory,
                formData.cropSeason,
                formData.cropImage ? { name: formData.cropImage } : null, // Assuming file is being uploaded
                formData.logList,
                formData.fieldList
            );
            dispatch(updateCrop(updatedCrop.toPlainObject()));
        }
        resetForm();
    };

    const handleDelete = (cropCode: number) => {
        dispatch(deleteCrop({ cropCode }));
    };

    const resetForm = () => {
        setFormData({
            cropName: "",
            cropCategory: "",
            cropSeason: "",
            scientificName: "",
            cropImage: null,
            logList: [],
            fieldList: [],
        });
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div id="cropsSection" className="content-section">
            <div className="section">
                <h2 className="text-center my-4">Manage Crops</h2>

                {/* Add Crop Button */}
                <div className="d-flex justify-content-center mb-4">
                    <CustomButton
                        label="Add Crop"
                        type="button"
                        className="btn-success"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {/* Crop Table */}
                <Table<Crop> columns={columns} dataSource={crops} rowKey="cropCode" />

                {/* Modal for Adding/Editing Crop */}
                <MainModal
                    isType={isEditing ? "Edit Crop" : "Add Crop"}
                    buttonType={isEditing ? "Update" : "Save"}
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    onSubmit={isEditing ? handleUpdate : handleAdd}
                >
                    <form id="cropForm">
                        <div className="mb-3">
                            <label htmlFor="cropName" className="form-label">
                                Crop Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="cropName"
                                value={formData.cropName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Add other form fields similarly... */}
                    </form>
                </MainModal>

                {/* Image Popup */}
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
        </div>
    );
};

export default Crops;
