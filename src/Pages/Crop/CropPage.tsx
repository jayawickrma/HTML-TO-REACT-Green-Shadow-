import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { addCrop, updateCrop, deleteCrop } from "../../slices/CropSlice";
import CropModel from "../../Model/CropModel.ts";
// Import the correct RootState type from your store
import { RootState } from "../../store/Store.ts"; // Adjust the path to your store file

const Crops: React.FC = () => {
    const crops = useSelector((state: RootState) => state.crops);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        cropName: "",
        category: "",
        season: "",
        scientificName: "",
        image: null as File | null,
        field: "",
    });
    const [imagePopup, setImagePopup] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const columns: TableColumnsType<CropModel> = [
        {
            title: "CROP Code",
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
            render: (image: File | null, record: CropModel) => (
                image ? (
                    <img
                        src={URL.createObjectURL(image)}
                        alt={record.cropName}
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(URL.createObjectURL(image))}
                    />
                ) : null
            ),
        },
        {
            title: "Field",
            dataIndex: "fieldList",
            key: "fieldList",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: CropModel) => (
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
            setFormData((prev) => {
                return {
                    ...prev,
                    image: event.target.files[0],
                };
            });
        }
    };

    const handleAdd = () => {
        const newCrop = new CropModel(
            `${crops.length + 1}`, // Assuming `cropCode` is a string (e.g., generated from a number)
            formData.cropName,
            formData.scientificName,
            formData.category,
            formData.season,
            formData.image,
            "",
            formData.field
        );
        dispatch(addCrop(newCrop));
        resetForm();
    };

    const handleEdit = (record: CropModel) => {
        setIsEditing(true);
        setEditId(record.cropCode);
        setFormData({
            cropName: record.cropName,
            category: record.cropCategory,
            season: record.cropSeason,
            scientificName: record.scientificName,
            image: record.cropImage,
            field: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedCrop = new CropModel(
            editId!,
            formData.cropName,
            formData.scientificName,
            formData.category,
            formData.season,
            formData.image,
            "",
            formData.field
        );
        dispatch(updateCrop(updatedCrop));
        resetForm();
    };

    const handleDelete = (cropCode: string) => {
        dispatch(deleteCrop({ crop_id: cropCode }));
    };

    const resetForm = () => {
        setFormData({
            cropName: "",
            category: "",
            season: "",
            scientificName: "",
            image: null,
            field: "",
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
                <Table<CropModel> columns={columns} dataSource={crops} rowKey="cropCode" />

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
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="season" className="form-label">
                                Season
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="season"
                                value={formData.season}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="scientificName" className="form-label">
                                Scientific Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="scientificName"
                                value={formData.scientificName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="field" className="form-label">
                                Field
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="field"
                                value={formData.field}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
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
