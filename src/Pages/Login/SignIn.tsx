import "../../SignIn.css";
import greenShadowLogo from '../../assets/greenshadow.webp';
import { useNavigate } from "react-router";

const SignIn = () => {
    const navigate = useNavigate();

    // @ts-ignore
    const signInBtnClick = (e) => {
        e.preventDefault(); // Prevent the default form submission
        navigate("/window"); // Navigate to the next page
    };

    return (
        <section id="loginForm">
            <div id="signInSection" className="flex flex-row absolute inset-0">
                <div>
                    <div className="mt-12 text-center place-items-center">
                        <img src={greenShadowLogo} alt="Logo" width="85px" />
                        <h3 className="font-medium">Green Shadow</h3>
                        <p>Please Log in to your Account!</p>
                    </div>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <form className="space-y-4 md:space-y-6" onSubmit={signInBtnClick}>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                id="submitBtn"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid place-items-center">
                    <div className="place-items-center">
                        <h3>Green shadow (PVT) Ltd.</h3>
                        <p>We are more than just a company</p>
                        <button
                            className="btn btn-block"
                            data-bs-toggle="modal"
                            data-bs-target="#forgotPasswordModal"
                        >
                            Forgot Password
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignIn;
