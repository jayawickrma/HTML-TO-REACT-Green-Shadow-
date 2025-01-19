import React, { useState } from "react";

const SignUpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: "MANAGER",
    });

    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { email, password, confirmPassword, role } = formData;

        if (password !== confirmPassword) {
            setResponseMessage("Passwords do not match.");
            return;
        }

        // Simulate an API request or handle form submission
        setResponseMessage(`User ${email} registered successfully with role: ${role}.`);

        // Reset the form after successful submission
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            role: "MANAGER",
        });

        // Clear the message after 3 seconds
        setTimeout(() => setResponseMessage(null), 3000);
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleInputChange}
                    >
                        <option value="MANAGER">MANAGER</option>
                        <option value="ADMINISTRATIVE">ADMINISTRATIVE</option>
                        <option value="SCIENTIST">SCIENTIST</option>
                    </select>
                </div>
                <a href="#">Forgot Password?</a>
                <button type="submit" className="btn">
                    Sign Up
                </button>
                <p>
                    Already have an account? <a href="../Login/SignIn.tsx">Sign In</a>
                </p>
            </form>
            {responseMessage && (
                <div id="responseMessage" style={{ marginTop: "1rem", color: "green" }}>
                    {responseMessage}
                </div>
            )}
        </div>
    );
};

export default SignUpForm;
