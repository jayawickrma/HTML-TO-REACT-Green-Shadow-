import React, { useEffect, useState } from "react";
import { Input, Button, Checkbox, Form, Card, message } from "antd";
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <div className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold">
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
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Please enter a valid email!" }
                            ]}
                        >
                            <Input
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
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange("password")}
                            />
                        </Form.Item>

                        {!isSignUp && (
                            <div className="flex items-center justify-between">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="#" className="text-sm font-medium">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="w-full"
                            >
                                {isSignUp ? "Create Account" : "Sign In"}
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="text-center">
                        {isSignUp ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="cursor-pointer text-blue-500"
                                    onClick={() => setIsSignUp(false)}
                                >
                                    Sign In
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="cursor-pointer text-blue-500"
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