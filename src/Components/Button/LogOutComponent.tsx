import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const LogOutComponent: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Show SweetAlert confirmation for logout
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to log out of your account.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28a745', // Green color for confirmation
            cancelButtonColor: '#dc3545', // Red color for cancellation
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // Show a 'Logging out' message with animation
                Swal.fire({
                    title: 'Logging out...',
                    text: 'Please wait while we log you out.',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2000, // Display for 2 seconds
                    willClose: () => {
                        // Clear session or local storage
                        sessionStorage.clear(); // Clears session storage
                        localStorage.clear();   // Clears local storage

                        // Redirect to the Sign-In page
                        navigate('/sign-in'); // Assuming '/sign-in' is the route for the Sign-In page
                    },
                });
            }
        });
    };

    return (
        <button
            id="navLogOut"
            onClick={handleLogout}
            style={{
                background: 'red',
                color: 'white',
                borderRadius: '4px',
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                border: 'none',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            }}
        >
            Log Out
        </button>
    );
};
