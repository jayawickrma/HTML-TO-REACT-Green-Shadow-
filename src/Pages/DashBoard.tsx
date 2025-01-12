export function DashBoard(){
    return(
        <>
            <div id="dashboardContent" className="content-section">

                <div className="mt-4 mb-3">
                    <h2 className="text-success text-center">Welcome to Green Shadow Farm Dashboard</h2>
                    <br/>
                </div>


                <div className="row text-center">

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Users</h5>
                                <p className="display-4" id="liveUserCount">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Members</h5>
                                <p className="display-4" id="memberCount">0</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6 mb-2">
                                <button className="btn btn-success w-100" id="addCropBtn">Add Crop</button>
                            </div>
                            <div className="col-md-6 mb-2">
                                <button className="btn btn-success w-100" id="addFieldBtn">Add Field</button>
                            </div>
                            <div className="col-md-6 mb-2">
                                <button className="btn btn-success w-100" id="addStaffBtn">Add Staff</button>
                            </div>
                            <div className="col-md-6 mb-2">
                                <button className="btn btn-success w-100" id="addUserBtn">Add User</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>

                <div className="bg-white rounded-lg shadow-md p-4 m-4 max-w-4xl mx-auto relative"
                     style={{top: '17px', left: '18px'}}>
                    <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Monthly Crops of Seasons</h5>
                    </div>
                    <canvas id="myChart" className="w-full h-64"></canvas>
                </div>


                <div className="date-time-container">
                    <p id="date"></p>
                    <p id="time"></p>
                </div>
                <div id="piechart">
                    <img id="imagepie" src="../assets/piechart.jpg" alt="image"/>
                </div>
            </div>
        </>
    )
}