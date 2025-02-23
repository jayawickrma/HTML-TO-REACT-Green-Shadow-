import React, { useEffect, useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx";
import CustomButton from "../../Components/Button/CustomButonComponent.tsx";
import { useDispatch, useSelector } from "react-redux";
import { saveCrop, updateCrop, deleteCrop, CropRootState, getAllCrops } from "../../slices/CropSlice";
import { CropModel } from "../../Model/CropModel.ts";
import { AppDispatch } from "../../store/Store.ts";
import Swal from "sweetalert2";
import "../../css/cropPage.css"

const Crops: React.FC = () => {
    const crops = useSelector((state: CropRootState) => state.crop.crops) || [];
    const dispatch = useDispatch<AppDispatch>();
    const [cropName, setCropName] = useState("");
    const [scientificName, setScientificName] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [logList, setLogList] = useState<string>("");
    const [fieldList, setFieldList] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [imagePopup, setImagePopup] = useState<string | null>(null); // For image popup

    useEffect(() => {
        dispatch(getAllCrops());
    }, [dispatch]);

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
                        src={`data:image/png;base64,${image}`}
                        alt={record.cropName}
                        style={{ width: "50px", height: "50px", cursor: "pointer" }}
                        onClick={() => setImagePopup(`data:image/png;base64,${image}`)} // Set image for popup
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
                logs?.length > 0 ? logs.map(log => log.logCode).join(", ") : "N/A",
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

    const handleAdd = async () => {
        if (!cropName || !scientificName || !category || !season || !logList || !fieldList) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Please fill all required fields.",
            });
            return;
        }

        const newCropData = new FormData();
        newCropData.append("cropName", cropName);
        newCropData.append("scientificName", scientificName);
        newCropData.append("category", category);
        newCropData.append("season", season);
        newCropData.append("logList", logList.split(",").map(Number).join(",")); // Convert to array of numbers
        newCropData.append("fieldList", fieldList.split(",").map(Number).join(",")); // Convert to array of numbers
        if (selectedFile) {
            newCropData.append("cropImage", selectedFile);
        }

        // Debugging: Log FormData
        for (let [key, value] of newCropData.entries()) {
            console.log(key, value);
        }

        dispatch(saveCrop(newCropData))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Crop saved successfully!",
                });
                resetForm();
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to save crop. Please try again.",
                });
                console.error("Failed to save crop:", error);
            });
    };

    const handleEdit = (record: CropModel) => {
        setIsEditing(true);
        setEditId(record.cropCode);
        setCropName(record.cropName);
        setScientificName(record.scientificName);
        setCategory(record.category);
        setSeason(record.season);
        setLogList(record.logList.join(",")); // Convert array to comma-separated string
        setFieldList(record.fieldList.join(",")); // Convert array to comma-separated string
        setSelectedFile(null); // Reset file input for editing
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedCropData = new FormData();
        updatedCropData.append("code", editId || "");
        updatedCropData.append("name", cropName);
        updatedCropData.append("scientificName", scientificName);
        updatedCropData.append("category", category);
        updatedCropData.append("season", season);
        updatedCropData.append("logList", logList.split(",").map(Number).join(",")); // Convert to array of numbers
        updatedCropData.append("fieldList", fieldList.split(",").map(Number).join(",")); // Convert to array of numbers
        if (selectedFile) {
            updatedCropData.append("image", selectedFile);
        }

        dispatch(updateCrop(updatedCropData))
            .unwrap()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Crop updated successfully!",
                });
                resetForm();
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to update crop. Please try again.",
                });
                console.error("Failed to update crop:", error);
            });
    };

    const handleDelete = (cropCode: string) => {
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
                console.log("Deleting crop with code:", cropCode); // Debugging
                dispatch(deleteCrop(cropCode))
                    .unwrap()
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Crop has been deleted.",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to delete crop. Please check the console for details.",
                        });
                        console.error("Failed to delete crop:", error);
                    });
            }
        });
    };

    const resetForm = () => {
        setCropName("");
        setScientificName("");
        setCategory("");
        setSeason("");
        setLogList("");
        setFieldList("");
        setSelectedFile(null);
        setImagePreview(null);
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
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
                    <form id="cropForm" className="crop-form">
                        <div className="mb-3">
                            <label htmlFor="cropName" className="form-label">
                                Crop Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="cropName"
                                value={cropName}
                                onChange={(e) => setCropName(e.target.value)}
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
                                value={scientificName}
                                onChange={(e) => setScientificName(e.target.value)}
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
                                value={category}
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
                                value={season}
                                onChange={(e) => setSeason(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="logList" className="form-label">
                                Log List (comma-separated numbers)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="logList"
                                value={logList}
                                onChange={(e) => setLogList(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fieldList" className="form-label">
                                Field List (comma-separated numbers)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fieldList"
                                value={fieldList}
                                onChange={(e) => setFieldList(e.target.value)}
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
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 1000,
                        }}
                        onClick={() => setImagePopup(null)}
                    >
                        <img
                            src={imagePopup}
                            alt="Crop"
                            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Crops;