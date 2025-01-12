import { Link } from "react-router";

export function Navbar() {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg">
                <div className="py-6 text-center bg-green-500 text-white font-bold text-xl rounded-t-lg">
                    Green Shadow
                </div>
                <div className="list-group list-group-flush text-left space-y-4 py-6 px-4">
                    <Link
                        to="/"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/crop-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Crop Management
                    </Link>
                    <Link
                        to="/field-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Field Management
                    </Link>
                    <Link
                        to="/log-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Log Management
                    </Link>
                    <Link
                        to="/equipment-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Equipment Management
                    </Link>
                    <Link
                        to="/staff-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Staff Management
                    </Link>
                    <Link
                        to="/vehicle-management"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Vehicle Management
                    </Link>
                    <Link
                        to="/settings"
                        className="block text-gray-700 font-semibold hover:text-green-500 transition duration-200"
                    >
                        Settings
                    </Link>
                </div>
            </div>
        </>
    );
}
