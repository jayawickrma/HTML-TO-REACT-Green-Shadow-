import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import { useEffect } from 'react';

export function LogOutComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        const logOutButton = document.getElementById('navLogOut');
cre
        if (logOutButton) {
            logOutButton.addEventListener('click', function (event) {
                event.preventDefault(); // Prevent the default link behavior

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
                                navigate('/sign-in'); // Assuming '/sign-in' is the route for Sign-In page
                            },
                        });
                    }
                });
            });
        }

        // Cleanup event listener on unmount
        return () => {
            if (logOutButton) {
                logOutButton.removeEventListener('click', () => {});
            }
        };
    }, [navigate]);

    return null; // This component does not render any JSX
}
