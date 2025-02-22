import React, { useEffect, useState } from "react";
import { Input, Button, Checkbox, Form, Card, message } from "antd"; // Added message for displaying error/success
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/Store.ts";
import { login, register, UserRootState } from "../../slices/UserSlice.ts";
import { User } from "../../Model/User.ts";
import "../../SignIn.css";

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const SignInSignUp: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const isAuthenticated = useSelector((state: UserRootState) => state.user.isAuthenticated);

    // Form state management
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    // Handle form submission
    const onFinish = async (values: FieldType) => {
        const user = new User(values.email!, values.password!);

        try {
            if (isSignUp) {
                // Dispatch the register action
                const result = await dispatch(register(user)).unwrap();
                if (result) {
                    message.success("Registration successful! Redirecting to login.");
                    setIsSignUp(false);  // Switch to login after successful registration
                }
            } else {
                // Dispatch the login action
                const result = await dispatch(login(user)).unwrap();
                if (result) {
                    message.success("Login successful! Redirecting to dashboard.");
                }
            }
        } catch (error) {
            // Handle error in login or registration
            message.error("An error occurred during authentication. Please try again.");
            console.error(error); // Log the error for debugging purposes
        }
    };

    // Handle input changes
    const handleInputChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
            <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                <div className="space-y-6">
                    {/* Form Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-gray-500">
                            {isSignUp
                                ? "Start your journey with us today"
                                : "Please enter your details to sign in"}
                        </p>
                    </div>

                    {/* Auth Form */}
                    <Form
                        form={form}
                        name="authForm"
                        onFinish={onFinish}
                        layout="vertical"
                        className="space-y-4"
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Please enter a valid email!" }
                            ]}
                        >
                            <Input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange("password")}
                            />
                        </Form.Item>

                        {/* Rest of the component remains the same */}
                        {!isSignUp && (
                            <div className="flex items-center justify-between">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                                </Form.Item>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-green-600 hover:text-green-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {isSignUp ? "Create Account" : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* Switch between sign up and sign in */}
                    <div className="text-center">
                        {isSignUp ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="text-green-600 cursor-pointer"
                                    onClick={() => setIsSignUp(false)}
                                >
                                    Sign In
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="text-green-600 cursor-pointer"
                                    onClick={() => setIsSignUp(true)}
                                >
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SignInSignUp;
