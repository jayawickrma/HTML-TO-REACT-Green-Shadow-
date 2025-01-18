import React from "react";

interface CustomButtonProps {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, type = "button", onClick, className }) => {
    return (
        <button type={type} className={`btn ${className}`} onClick={onClick}
            style={{backgroundColor:"blue"}}
        >
            {label}
        </button>
    );
};

export default CustomButton;
