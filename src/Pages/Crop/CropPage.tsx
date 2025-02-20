import React, { useState } from "react";
import { Table, TableColumnsType } from "antd";
import MainModal from "../../Components/Add/AddComponent";
import CustomButton from "../../Components/Button/CustomButonComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateCrop, deleteCrop, saveCrop } from "../../slices/CropSlice";
import CropModel from "../../Model/CropModel";
import { RootState, AppDispatch } from "../../store/Store";

// Define the CropModel interface if not already defined in CropModel.ts
interface CropModel {
    cropCode: string;
    cropName: string;
    scientificName: string;
    cropCategory: string;
    cropSeason: string;
    cropImage: string | null;
    userId: string;
    fieldList: string;
}

interface FormData {
    cropName: string;
    category: string;
    season: string;
    scientificName: string;
    image: File | null;
    imagePreview: string | null;
    field: string;
}

const Crops: React.FC = () => {
    const crops = useSelector((state: RootState) => state.crops);
    const dispatch = useDispatch<AppDispatch>();

    const [formData, setFormData] = useState<FormData>({
        cropName: "",
        category: "",
        season: "",
        scientificName: "",
        image: null,
        imagePreview: null,
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
            render: (image: string | null, record: CropModel) => (
                image ? (
                    <img
                        src={image}
                        alt={record.cropName}
                        className="w-12 h-12 object-cover cursor-pointer"
                        onClick={() => setImagePopup(image)}
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
            render: (_: unknown, record: CropModel) => (
                <div className="flex gap-2">
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
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                if (e.target?.result) {
                    setFormData((prev) => ({
                        ...prev,
                        image: file,
                        imagePreview: e.target.result as string,
                    }));
                }
            };
            fileReader.readAsDataURL(file);
        }
    };

    const createCropModel = (
        id: string,
        data: FormData
    ): CropModel => ({
        cropCode: id,
        cropName: data.cropName,
        scientificName: data.scientificName,
        cropCategory: data.category,
        cropSeason: data.season,
        cropImage: data.imagePreview,
        userId: "",
        fieldList: data.field
    });

    const handleAdd = async () => {
        const newCrop = createCropModel("", formData);
        try {
            await dispatch(saveCrop(newCrop)).unwrap();
            resetForm();
        } catch (error) {
            console.error('Failed to save crop:', error);
        }
    };

    const handleEdit = (record: CropModel) => {
        setIsEditing(true);
        setEditId(record.cropCode);
        setFormData({
            cropName: record.cropName,
            category: record.cropCategory,
            season: record.cropSeason,
            scientificName: record.scientificName,
            image: null,
            imagePreview: record.cropImage,
            field: record.fieldList,
        });
        setIsModalOpen(true);
    };

    const handleUpdate = async () => {
        if (!editId) return;
        const updatedCrop = createCropModel(editId, formData);
        try {
            await dispatch(updateCrop(updatedCrop)).unwrap();
            resetForm();
        } catch (error) {
            console.error('Failed to update crop:', error);
        }
    };

    const handleDelete = async (cropCode: string) => {
        try {
            await dispatch(deleteCrop(cropCode)).unwrap();
        } catch (error) {
            console.error('Failed to delete crop:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            cropName: "",
            category: "",
            season: "",
            scientificName: "",
            image: null,
            imagePreview: null,
            field: "",
        });
        setIsModalOpen(false);
        setIsEditing(false);
        setEditId(null);
    };

   
    return (
        <div className="p-6">
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">Manage Crops</h2>

                <div className="flex justify-center">
                    <CustomButton
                        label="Add Crop"
                        type="button"
                        className="btn-success"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                <Table<CropModel>
                    columns={columns}
                    dataSource={crops}
                    rowKey="cropCode"
                />

                <MainModal
                    isType={isEditing ? "Edit Crop" : "Add Crop"}
                    buttonType={isEditing ? "Update" : "Save"}
                    isOpen={isModalOpen}
                    onClose={resetForm}
                    onSubmit={isEditing ? handleUpdate : handleAdd}
                >
                    <form id="cropForm" className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="cropName" className="block">Crop Name</label>
                            <input
                                type="text"
                                id="cropName"
                                className="w-full p-2 border rounded"
                                value={formData.cropName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="block">Category</label>
                            <input
                                type="text"
                                id="category"
                                className="w-full p-2 border rounded"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="season" className="block">Season</label>
                            <input
                                type="text"
                                id="season"
                                className="w-full p-2 border rounded"
                                value={formData.season}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="scientificName" className="block">Scientific Name</label>
                            <input
                                type="text"
                                id="scientificName"
                                className="w-full p-2 border rounded"
                                value={formData.scientificName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="image" className="block">Image</label>
                            <input
                                type="file"
                                id="image"
                                className="w-full p-2 border rounded"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="field" className="block">Field</label>
                            <input
                                type="text"
                                id="field"
                                className="w-full p-2 border rounded"
                                value={formData.field}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </form>
                </MainModal>

                {imagePopup && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <button
                            className="absolute top-4 right-4 text-white text-4xl"
                            onClick={() => setImagePopup(null)}
                        >
                            ×
                        </button>
                        <img
                            src={imagePopup}
                            alt="Popup"
                            className="max-w-2xl max-h-2xl"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Crops;