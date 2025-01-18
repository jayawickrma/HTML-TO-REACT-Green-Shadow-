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
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgElevated: "",
                        colorText: "#ffffff",
                        colorPrimary: "",
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
                            className={`text-white ${
                                buttonType === "Yes, I'm Sure"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                            }`}
                        >
                            {buttonType}
                        </Button>,
                    ]}
                    style={{
                        background: "#1F2937",
                        color: "#000000",
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    {children}
                </Modal>
            </ConfigProvider>
        </>
    );
};

export default MainModal;
