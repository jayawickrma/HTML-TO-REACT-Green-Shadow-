import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent.tsx"; // Adjust the import path as needed
import CustomButton from "../../Components/Button/CustomButonComponent.tsx"; // Adjust the import path as needed

interface Crop {
    id: number;
    cropName: string;
    category: string;
    season: string;
    scientificName: string;
    image: string;
    field: string;
}

const Crops: React.FC = () => {
    const [crops, setCrops] = useState<Crop[]>([]);
    const [formData, setFormData] = useState<Omit<Crop, "id">>({
        cropName: "",
        category: "",
        season: "",
        scientificName: "",
        image: "",
        field: "",
    });
    const [imagePopup, setImagePopup] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const columns: TableColumnsType<Crop> = [
        {
            title: "CROP Code",
            dataIndex: "id",
            key: "id",
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
            dataIndex: "image",
            key: "image",
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
            title: "Field",
            dataIndex: "field",
            key: "field",
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
                        onClick={() => handleDelete(record.id)}
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
                    image: fileReader.result as string,
                }));
            };
            fileReader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleAdd = () => {
        const newCrop: Crop = {
            id: crops.length + 1,
            ...formData,
        };
        setCrops([...crops, newCrop]);
        resetForm();
    };

    const handleEdit = (record: Crop) => {
        setIsEditing(true);
        setEditId(record.id);
        setFormData({
            cropName: record.cropName,
            category: record.category,
            season: record.season,
            scientificName: record.scientificName,
            image: record.image,
            field: record.field,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        setCrops((prevCrops) =>
            prevCrops.map((crop) =>
                crop.id === editId ? { id: editId, ...formData } : crop
            )
        );
        resetForm();
    };

    const handleDelete = (id: number) => {
        setCrops(crops.filter((crop) => crop.id !== id));
    };

    const resetForm = () => {
        setFormData({
            cropName: "",
            category: "",
            season: "",
            scientificName: "",
            image: "",
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
                <Table<Crop> columns={columns} dataSource={crops} rowKey="id" />

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