import { useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

export const useToast = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<ToastType | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Show toast with a given message and type
    const showToast = (msg: string, toastType: ToastType) => {
        setMessage(msg);
        setType(toastType);
        setIsVisible(true);
    };

    // Clear toast manually
    const clearToast = () => {
        setMessage(null);
        setType(null);
        setIsVisible(false);
    };

    // Auto clear toast after a set duration
    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                clearToast();
            }, 5000); // 5 seconds

            return () => clearTimeout(timeout);
        }
    }, [isVisible]);

    return {
        message,
        type,
        isVisible,
        showToast,
        clearToast,
    };
};
