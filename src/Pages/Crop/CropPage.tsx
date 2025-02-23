import React, { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { saveCrop, updateCrop, deleteCrop, CropRootState, getAllCrops } from "../../slices/CropSlice";
import { CropModel } from "../../Model/CropModel.ts";
import { AppDispatch } from "../../store/Store.ts";

const Crops: React.FC = () => {
    const crops = useSelector((state: CropRootState) => state.crop.crops) || [];
    const dispatch = useDispatch<AppDispatch>();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFields, setFields] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        cropName: "",
        category: "",
        season: "",
        scientificName: "",
        cropImage: null as File | null,
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
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Season",
            dataIndex: "season",
            key: "season",
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
            render: (image: string | null, record: CropModel) => (
                image ? (
                    <img
                        src={`data:image/png;base64,${image}`} // Base64 image format
                        alt={record.cropName}
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(`data:image/png;base64,${image}`)}
                    />
                ) : null
            ),
        },
        {
            title: "Field",
            dataIndex: "CropFieldDetails",
            key: "fieldList",
            render: (fields: { fieldCode: number }[]) =>
                fields?.length > 0 ? fields.map(field => field.fieldCode).join(", ") : "N/A",

        },
        {
            title: "Log",
            dataIndex: "LogCropDetails",
            key: "logList",
            render: (logs: { logCode: number }[]) =>
                logs?.length > 0 ? logs.map(field => field.logCode).join(", ") : "N/A",

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


    useEffect(() => {
        dispatch(getAllCrops());
    }, [dispatch]);

    const handleAdd = () => {
        const newCrops = new FormData();
        newCrops.append("code", "");
        newCrops.append("name", cropName);
        newCrops.append("scientificName", scientificName);
        newCrops.append("category", category);
        newCrops.append("season", season);
        if (selectedFile) {
            newCrops.append("image", selectedFile);
        }
        newCrops.append("assignFields", JSON.stringify(selectedFields));
        dispatch(saveCrop(newCrops));
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
            cropImage: record.cropImage,
            field: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedCrop = new FormData();
        updatedCrop.append("code", "");
        updatedCrop.append("name", cropName);
        updatedCrop.append("scientificName", scientificName);
        updatedCrop.append("category", category);
        updatedCrop.append("season", season);
        if (selectedFile) {
            updatedCrop.append("image", selectedFile);
        }
        updatedCrop.append("assignFields", JSON.stringify(selectedFields));
        dispatch(updateCrop(updatedCrop));
        resetForm();
    };

    const handleDelete = (cropCode: string) => {
        dispatch(deleteCrop(cropCode));
    };

    const resetForm = () => {
        setCropName("");
        setScientificName("");
        setCategory("");
        setSeason("");
        setSelectedFile(null);
        setFields([]);
        setIsModalOpen(false);
        setIsEditing(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
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
                                onChange={(e) => setCropName(e.target.value)}
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
                                onChange={(e) => setCategory(e.target.value)}
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
                                onChange={(e) => setSeason(e.target.value)}
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
                                onChange={(e) => setScientificName(e.target.value)}
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
                                onChange={handleFileChange}
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
