import React from 'react';

type AlertProps = {
    type: 'success' | 'error' | 'warning'; // Type for the alert
    children: React.ReactNode; // Children of the alert, which would be the content
};

type AlertDescriptionProps = {
    children: React.ReactNode; // The description text
};

export const Alert: React.FC<AlertProps> = ({ type, children }) => {
    const bgColor = type === 'success'
        ? 'bg-green-100'
        : type === 'error'
            ? 'bg-red-100'
            : 'bg-yellow-100';

    const textColor = type === 'success'
        ? 'text-green-800'
        : type === 'error'
            ? 'text-red-800'
            : 'text-yellow-800';

    return (
        <div className={`p-4 ${bgColor} ${textColor} rounded-lg`}>
            {children}
        </div>
    );
};

// AlertDescription: A part of the alert where the message can be displayed
export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children }) => {
    return <p className="text-sm">{children}</p>;
};
