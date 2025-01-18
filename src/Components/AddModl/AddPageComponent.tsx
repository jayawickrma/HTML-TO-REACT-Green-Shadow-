// MainModal.tsx
import React, { useState } from "react";
import { Button, ConfigProvider, Modal } from "antd";

interface ModalProps {
    isType: string;
    buttonType: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}

const MainModal: React.FC<ModalProps> = ({
                                             isType,
                                             buttonType,
                                             isOpen,
                                             onClose,
                                             onSubmit,
                                             children,
                                         }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            onSubmit();
            onClose();
        }, 700);
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgElevated: "#1F2937",
                    colorText: "#ffffff",
                    colorPrimary: "#4caf50",
                },
            }}
        >
            <Modal
                width={800}
                title={isType}
                open={isOpen}
                onCancel={onClose}
                confirmLoading={confirmLoading}
                footer={[
                    <Button
                        key="cancel"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                        className="bg-green-500 hover:bg-green-600 text-white"
                    >
                        {buttonType}
                    </Button>,
                ]}
                style={{
                    background: "#1F2937",
                    color: "#ffffff",
                    borderRadius: "12px",
                }}
            >
                {children}
            </Modal>
        </ConfigProvider>
    );
};

export default MainModal;
