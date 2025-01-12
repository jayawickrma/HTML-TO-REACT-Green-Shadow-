import { Link } from "react-router";

export function Navbar() {
    return (
        <>
            <div className="list-group list-group-flush text-center space-y-4 bg-gray-100 py-6 shadow-lg rounded-lg">
                <Link
                    to="/"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Dashboard
                </Link>
                <Link
                    to="/crop-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Crop Management
                </Link>
                <Link
                    to="/field-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Field Management
                </Link>
                <Link
                    to="/log-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Log Management
                </Link>
                <Link
                    to="/equipment-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Equipment Management
                </Link>
                <Link
                    to="/staff-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Staff Management
                </Link>
                <Link
                    to="/vehicle-management"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Vehicle Management
                </Link>
                <Link
                    to="/settings"
                    className="text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                >
                    Settings
                </Link>
            </div>
        </>
    );
}
