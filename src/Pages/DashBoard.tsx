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

                {/*<div className="card m-1 cards col-md-8" style="border-radius: 8px;*/}
                {/*    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); top: 17px;left: 18px;">*/}
                {/*    <div className="card-body">*/}
                {/*        <h5 className="card-title text-center">Monthly Crops of seasons</h5>*/}
                {/*        <canvas id="myChart"></canvas>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="date-time-container">
                    <p id="date"></p>
                    <p id="time"></p>
                </div>
                <div id="piechart">
                    <img id="imagepie" src="Asserts/piechart.jpg" alt="image"/>
                </div>
            </div>
        </>
    )
}