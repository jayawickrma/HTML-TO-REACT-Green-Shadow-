import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';



export function SideBar(){
    return(
        <>
            <div className=" sidebar d-flex flex-column justify-content-between text-white p-2 vh-100 vw-45 bg-dark">
                <div>
                    <a className="d-flex align-items-center p-5">

                        <span className="fs-4">Green Shadow</span>
                    </a>
                    <hr className="text-secondary mt-2"/>
                    <ul className="nav nav-pills flex-column p-0 m-0">
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/dashboard" className="nav-link text-white fs-5 ">DashBoard</Link>
                            </i>
                        </li>
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/crop-management"  className="nav-link text-white fs-5">Crop Management </Link>
                            </i>

                        </li>
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/field-management" className="nav-link text-white fs-5">Field Management</Link>
                            </i>

                        </li>
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/log-management" className="nav-link text-white fs-5">Log Management</Link>
                            </i>
                            <span className="fs-5"></span>
                        </li>
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/equipment-management" className="nav-link text-white fs-5">Equipment Management</Link>
                            </i>
                            <span className="fs-5"></span>
                        </li>
                        <li className="nav-item p-0 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/staff-management" className="nav-link text-white fs-5">Staff Management</Link>
                            </i>
                            <span className="fs-5"></span>
                        </li>
                        <li className="nav-item p-1 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/vehicle-management" className="nav-link text-white fs-5">Vehicle Management</Link>
                            </i>
                            <span className="fs-5"></span>
                        </li>

                        <li className="nav-item p-1 bg-gradient text-center">
                            <i className=" me-2 fs-5">
                                <Link to="/settings" className="nav-link text-white fs-5">Settings </Link>
                            </i>
                            <span className="fs-5"></span>
                        </li>
                    </ul>
                </div>
            </div>



            {/*/!* main page in the dashboard*!/*/}
            {/*    <div>*/}


            {/*    <div id="dashboardContent" className="content-section">*/}


            {/*        <div className="mt-4 mb-3">*/}
            {/*            <h2 className="text-green-500 text-center">Welcome to Green Shadow Farm Dashboard</h2>*/}
            {/*            <br/>*/}
            {/*        </div>*/}


            {/*        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">*/}

            {/*            <div className="card bg-white shadow-lg rounded-lg">*/}
            {/*                <div className="card-body p-6">*/}
            {/*                    <h5 className="card-title text-lg font-semibold">Users</h5>*/}
            {/*                    <p className="text-4xl font-bold" id="liveUserCount">0</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}


            {/*            <div className="card bg-white shadow-lg rounded-lg">*/}
            {/*                <div className="card-body p-6">*/}
            {/*                    <h5 className="card-title text-lg font-semibold">Members</h5>*/}
            {/*                    <p className="text-4xl font-bold" id="memberCount">0</p>*/}
            {/*                </div>*/}
            {/*            </div>*/}


            {/*            <div className="col-span-1 md:col-span-2">*/}
            {/*                <div className="grid grid-cols-2 gap-2">*/}
            {/*                    <div className="mb-2">*/}
            {/*                        <button*/}
            {/*                            className="btn btn-success w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"*/}
            {/*                            id="addCropBtn">Add Crop*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-2">*/}
            {/*                        <button*/}
            {/*                            className="btn btn-success w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"*/}
            {/*                            id="addFieldBtn">Add Field*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-2">*/}
            {/*                        <button*/}
            {/*                            className="btn btn-success w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"*/}
            {/*                            id="addStaffBtn">Add Staff*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                    <div className="mb-2">*/}
            {/*                        <button*/}
            {/*                            className="btn btn-success w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"*/}
            {/*                            id="addUserBtn">Add User*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*        <div className="bg-white rounded-lg shadow-md p-6 m-4 max-w-4xl mx-auto relative"*/}
            {/*             style={{top: '17px', left: '18px'}}>*/}
            {/*            <div className="text-center mb-4">*/}
            {/*                <h5 className="font-semibold text-gray-700">Monthly Crops of Seasons</h5>*/}
            {/*            </div>*/}
            {/*            <canvas id="myChart" className="w-full h-64"></canvas>*/}
            {/*        </div>*/}


            {/*        <div*/}
            {/*            className="date-time-container absolute right-4 top-[43%] w-[300px] h-[160px] p-5 bg-[#9EDF9C] text-center rounded-xl shadow-lg">*/}
            {/*            <p id="date" className="text-xl text-gray-800 mb-2">Date</p>*/}
            {/*            <p id="time" className="text-2xl text-gray-800 font-bold">Time</p>*/}
            {/*        </div>*/}


            {/*        <div id="piechart" className="absolute right-4 top-[65%] w-[300px] h-[230px]">*/}
            {/*            <img id="imagepie" className="w-[300px] h-[250px] rounded-3xl shadow-lg" src={piechart}*/}
            {/*                 alt="image"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    </div>*/}
            </>
            )
            }