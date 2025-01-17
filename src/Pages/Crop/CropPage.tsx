import React, { useState } from "react";

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

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newCrop: Crop = {
            id: crops.length + 1,
            ...formData,
        };
        setCrops([...crops, newCrop]);
        setFormData({
            cropName: "",
            category: "",
            season: "",
            scientificName: "",
            image: "",
            field: "",
        });
        (document.getElementById("cropModalClose") as HTMLButtonElement)?.click();
    };

    const handleDelete = (id: number) => {
        setCrops(crops.filter((crop) => crop.id !== id));
    };

    return (
        <div id="cropsSection" className="content-section">
            <div className="section">
                <h2 className="text-center my-4">Manage Crops</h2>

                {/* Crop Save Button */}
                <div className="d-flex justify-content-center mb-4">
                    <button
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#cropModal"
                        id="cropSaveBtn"
                    >
                        Add Crop
                    </button>
                </div>

                {/* Crop Table */}
                <table className="table table-bordered" id="cropTable">
                    <thead className="table-success">
                    <tr>
                        <th>CROP Code</th>
                        <th>Crop Name</th>
                        <th>Category</th>
                        <th>Season</th>
                        <th>Scientific Name</th>
                        <th>Image</th>
                        <th>Field</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crops.map((crop) => (
                        <tr key={crop.id}>
                            <td>{crop.id}</td>
                            <td>{crop.cropName}</td>
                            <td>{crop.category}</td>
                            <td>{crop.season}</td>
                            <td>{crop.scientificName}</td>
                            <td>
                                <img
                                    src={crop.image}
                                    alt={crop.cropName}
                                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                                    onClick={() => setImagePopup(crop.image)}
                                />
                            </td>
                            <td>{crop.field}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(crop.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Modal for Adding Crop */}
                <div
                    className="modal fade"
                    id="cropModal"
                    tabIndex={-1}
                    aria-labelledby="cropModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cropModalLabel">
                                    Add Crop
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    id="cropModalClose"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form id="cropForm" onSubmit={handleSubmit}>
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
                                            required
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
                                    <button type="submit" className="btn btn-primary">
                                        Save Crop
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

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
