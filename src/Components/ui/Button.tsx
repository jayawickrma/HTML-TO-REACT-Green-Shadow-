// Button.tsx
import React from 'react';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 ${className}`}
        >
            {children}
        </button>
    );
};
