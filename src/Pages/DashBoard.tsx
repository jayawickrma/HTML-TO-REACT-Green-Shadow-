import piechart from "../assets/piechart.jpg";

export function DashBoard() {
    return (
        <>
            <div id="dashboardContent" className="p-6 bg-gray-50 min-h-screen">
                {/* Welcome Section */}
                <div className="mt-6 mb-4 text-center">
                    <h2 className="text-3xl font-bold text-green-600">
                        Welcome to Green Shadow Farm Dashboard
                    </h2>
                    <br />
                </div>

                {/* Stats and Buttons Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    {/* Users Card */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h5 className="text-lg font-medium text-gray-700">Users</h5>
                        <p className="text-4xl font-extrabold text-gray-800" id="liveUserCount">
                            0
                        </p>
                    </div>

                    {/* Members Card */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h5 className="text-lg font-medium text-gray-700">Members</h5>
                        <p className="text-4xl font-extrabold text-gray-800" id="memberCount">
                            0
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                            id="addCropBtn"
                        >
                            Add Crop
                        </button>
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                            id="addFieldBtn"
                        >
                            Add Field
                        </button>
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                            id="addStaffBtn"
                        >
                            Add Staff
                        </button>
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                            id="addUserBtn"
                        >
                            Add User
                        </button>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
                    <div className="text-center mb-4">
                        <h5 className="text-xl font-semibold text-gray-800">
                            Monthly Crops of Seasons
                        </h5>
                    </div>
                    <canvas id="myChart" className="w-full h-64"></canvas>
                </div>

                {/* Date and Time Section */}
                <div className="mt-6 text-center text-gray-600">
                    <p id="date" className="text-lg font-medium"></p>
                    <p id="time" className="text-lg font-medium"></p>
                </div>

                {/* Pie Chart Section */}
                <div className="mt-8 flex justify-center">
                    <img
                        src={piechart}
                        alt="Pie Chart"
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>
        </>
    );
}
