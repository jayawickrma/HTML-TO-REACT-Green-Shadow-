
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";


export function CropPage() {
    const [formData, setFormData] = useState({
        cropName: "",
        category: "",
        season: "",
        scientificName: "",
        image: null,
        field: "",
    });

    const crops = useSelector((state) => state.crops); // Redux state for crops
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        setFormData({
            ...formData,
            [id]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCrop({ ...formData, id: Date.now() })); // Dispatch action to add crop
        setFormData({
            cropName: "",
            category: "",
            season: "",
            scientificName: "",
            image: null,
            field: "",
        });
        document.getElementById("cropModal").classList.remove("show");
    };

    const handleDelete = (id) => {
        dispatch(deleteCrop(id)); // Dispatch action to delete crop
    };

    return (
        <div id="cropsSection" className="p-6 bg-gray-50 min-h-screen">
            <div className="section">
                <h2 className="text-center text-3xl font-bold my-6">Manage Crops</h2>

                {/* Add Crop Button */}
                <div className="flex justify-center mb-6">
                    <button
                        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                        data-bs-toggle="modal"
                        data-bs-target="#cropModal"
                    >
                        Add Crop
                    </button>
                </div>

                {/* Crop Table */}
                <table className="table-auto w-full border border-gray-300 bg-white shadow-md rounded-lg">
                    <thead className="bg-green-100">
                    <tr>
                        <th className="p-2 border">CROP Code</th>
                        <th className="p-2 border">Crop Name</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Season</th>
                        <th className="p-2 border">Scientific Name</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Field</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {crops.map((crop) => (
                        <tr key={crop.id}>
                            <td className="p-2 border">{crop.id}</td>
                            <td className="p-2 border">{crop.cropName}</td>
                            <td className="p-2 border">{crop.category}</td>
                            <td className="p-2 border">{crop.season}</td>
                            <td className="p-2 border">{crop.scientificName}</td>
                            <td className="p-2 border">
                                {crop.image ? (
                                    <img
                                        src={URL.createObjectURL(crop.image)}
                                        alt="Crop"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    "No Image"
                                )}
                            </td>
                            <td className="p-2 border">{crop.field}</td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => handleDelete(crop.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Modal */}
                <div
                    className="modal fade"
                    id="cropModal"
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
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form id="cropForm" onSubmit={handleSubmit}>
                                    {[
                                        { id: "cropName", label: "Crop Name", type: "text" },
                                        { id: "category", label: "Category", type: "text" },
                                        { id: "season", label: "Season", type: "text" },
                                        { id: "scientificName", label: "Scientific Name", type: "text" },
                                        { id: "field", label: "Field", type: "text" },
                                    ].map((input) => (
                                        <div className="mb-4" key={input.id}>
                                            <label
                                                htmlFor={input.id}
                                                className="block text-gray-700 font-medium"
                                            >
                                                {input.label}
                                            </label>
                                            <input
                                                type={input.type}
                                                id={input.id}
                                                value={formData[input.id]}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg p-2"
                                                required
                                            />
                                        </div>
                                    ))}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="image"
                                            className="block text-gray-700 font-medium"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            onChange={handleChange}
                                            accept="image/*"
                                            className="w-full border border-gray-300 rounded-lg p-2"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                                    >
                                        Save Crop
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
