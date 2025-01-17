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
                </div>

                {/* Stats and Buttons Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stats Section */}
                    <div className="flex flex-col space-y-4">
                        {/* Users Card */}
                        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                            <h5 className="text-lg font-medium text-gray-700">Users</h5>
                            <p className="text-4xl font-extrabold text-green-600">120</p>
                        </div>
                        {/* Members Card */}
                        <div className="bg-white shadow-md rounded-lg p-6 text-center">
                            <h5 className="text-lg font-medium text-gray-700">Members</h5>
                            <p className="text-4xl font-extrabold text-green-600">50</p>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h5 className="text-xl font-semibold text-gray-800 text-center mb-4">
                            Monthly Crops of Seasons
                        </h5>
                        <canvas id="myChart" className="w-full h-64"></canvas>
                    </div>

                    {/* Date and Pie Chart Section */}
                    <div className="flex flex-col items-center space-y-6">
                        {/* Date Section */}
                        <div className="bg-green-200 shadow-md rounded-lg p-6 w-full text-center">
                            <p className="text-lg font-medium text-gray-800">Friday</p>
                            <p className="text-4xl font-extrabold text-gray-800">14:31:00</p>
                        </div>
                        {/* Pie Chart */}
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <img
                                src={piechart}
                                alt="Pie Chart"
                                className="w-48 h-48 object-cover mx-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons Section */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                        Add Crop
                    </button>
                    <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                        Add Field
                    </button>
                    <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                        Add Staff
                    </button>
                    <button className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700">
                        Add User
                    </button>
                </div>
            </div>
        </>
    );
}
