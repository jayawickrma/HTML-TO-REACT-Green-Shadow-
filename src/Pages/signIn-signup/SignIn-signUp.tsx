import React, { useEffect, useState } from "react";
import { Input, Button, Checkbox, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/Store.ts";
import { login, register, UserRootState } from "../../slices/UserSlice.ts";
import { User } from "../../Model/User.ts";

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

    const onFinish = async (values: FieldType) => {
        const user = new User(values.email!, values.password!);

        try {
            if (isSignUp) {
                const result = await dispatch(register(user)).unwrap();
                if (result) {
                    message.success("Registration successful! Redirecting to login.");
                    setIsSignUp(false);
                }
            } else {
                const result = await dispatch(login(user)).unwrap();
                if (result) {
                    message.success("Login successful! Redirecting to dashboard.");
                }
            }
        } catch (error) {
            message.error("An error occurred during authentication. Please try again.");
            console.error(error);
        }
    };

    const handleInputChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                    {/* Debugging Tip: Add a border to see if this div is rendering */}
                    <div className="text-center space-y-2 border border-red-500">
                        <div
                            className="inline-block p-4 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mb-4 shadow-md">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {isSignUp ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-gray-500">
                            {isSignUp
                                ? "Start your journey with us today"
                                : "Please enter your details to sign in"}
                        </p>
                    </div>

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
                                {required: true, message: "Please input your email!"},
                                {type: "email", message: "Please enter a valid email!"}
                            ]}
                        >
                            <Input
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange("email")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{required: true, message: "Please input your password!"}]}
                        >
                            <Input.Password
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange("password")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            />
                        </Form.Item>

                        {!isSignUp && (
                            <div className="flex items-center justify-between">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-gray-600">Remember me</Checkbox>
                                </Form.Item>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {isSignUp ? "Create Account" : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="text-center">
                        {isSignUp ? (
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <span
                                    className="cursor-pointer text-indigo-600 hover:text-indigo-500 transition-colors"
                                    onClick={() => setIsSignUp(false)}
                                >
              Sign In
            </span>
                            </p>
                        ) : (
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <span
                                    className="cursor-pointer text-indigo-600 hover:text-indigo-500 transition-colors"
                                    onClick={() => setIsSignUp(true)}
                                >
              Sign Up
            </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;