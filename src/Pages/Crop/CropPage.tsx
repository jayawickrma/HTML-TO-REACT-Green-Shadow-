export function CropPage(){
    return(
        <>
            <div id="cropsSection" className="content-section">
                <div className="section">
                    <h2 className="text-center my-4">Manage Crops</h2>

                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#cropModal"
                                id="cropSaveBtn">Add Crop
                        </button>
                    </div>

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

                        </tbody>
                    </table>


                    <div className="modal fade" id="cropModal" aria-labelledby="cropModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="cropModalLabel">Add Crop</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="cropForm">
                                        <div className="mb-3">
                                            <label htmlFor="cropName" className="form-label">Crop Name</label>
                                            <input type="text" className="form-control" id="cropName" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="category" className="form-label">Category</label>
                                            <input type="text" className="form-control" id="category" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="Season" className="form-label">Season</label>
                                            <input type="text" className="form-control" id="Season" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="ScientificName" className="form-label">Scientific
                                                Name</label>
                                            <input type="text" className="form-control" id="ScientificName" required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="CropImage" className="form-label">Image</label>
                                            <input type="file" className="form-control" id="CropImage" accept="image/*"
                                                   required/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="field" className="form-label">Field</label>
                                            <input type="text" className="form-control" id="field" required/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Save Crop</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}