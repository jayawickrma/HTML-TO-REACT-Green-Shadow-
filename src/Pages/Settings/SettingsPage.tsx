import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css"; // Import SweetAlert2 styles

const Logout: React.FC = () => {
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to log out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#28a745", // Green for confirm
            cancelButtonColor: "#dc3545", // Red for cancel
            confirmButtonText: "Yes, log out!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logging out...",
                    text: "Please wait while we log you out.",
                    icon: "info",
                    showConfirmButton: false,
                    timer: 2000, // Wait for 2 seconds
                }).then(() => {
                    // Clear session or local storage
                    sessionStorage.clear();
                    localStorage.clear();

                    // Redirect to the Sign-In page
                    window.location.href = "/signin"; // Update with your Sign-In page path
                });
            }
        });
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Logout</h1>
            <p>Click the button below to log out of your account.</p>
            <button
                onClick={handleLogout}
                style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
