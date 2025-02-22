import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveVehicle, updateVehicle, deleteVehicle, getAllVehicles } from "../../slices/VehicleSlice";
import VehicleModel from "../../Model/VehicleModel";
import { RootState } from "../../store";  // Adjust according to your project structure

const VehicleManagement: React.FC = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles.vehicleList);

    const [formData, setFormData] = useState<Partial<VehicleModel>>({
        vehicleCode: "",
        licencePlateNumber: "",
        vehicleName: "",
        category: "",
        fuelType: "",
        remark: "",
        status: "",
        memberCode: "",
    });
    const [currentVehicleCode, setCurrentVehicleCode] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllVehicles()); // Fetch all vehicles when the component mounts
    }, [dispatch]);

    const columns = [
        { title: "Vehicle Code", dataIndex: "vehicleCode", key: "vehicleCode" },
        { title: "License Plate", dataIndex: "licencePlateNumber", key: "licencePlateNumber" },
        { title: "Name", dataIndex: "vehicleName", key: "vehicleName" },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Fuel Type", dataIndex: "fuelType", key: "fuelType" },
        { title: "Remark", dataIndex: "remark", key: "remark" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Staff ID", dataIndex: "memberCode", key: "memberCode" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: VehicleModel) => (
                <div>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record.vehicleCode)}>Delete</Button>
                </div>
            ),
        },
    ];

    const handleEdit = (vehicle: VehicleModel) => {
        setFormData(vehicle);
        setCurrentVehicleCode(vehicle.vehicleCode);
        setIsModalVisible(true);
    };

    const handleDelete = (vehicleCode: string) => {
        dispatch(deleteVehicle(vehicleCode));
    };

    const handleSubmit = () => {
        const newVehicle = new VehicleModel(
            formData.vehicleCode || `VEH-${Date.now()}`,
            formData.licencePlateNumber || "",
            formData.vehicleName || "",
            formData.category || "",
            formData.fuelType || "",
            formData.remark || "",
            formData.status || "",
            formData.memberCode || ""
        );

        if (currentVehicleCode) {
            // Update existing vehicle
            dispatch(updateVehicle(newVehicle));
        } else {
            // Add new vehicle
            dispatch(saveVehicle(newVehicle));
        }

        // Reset form after submission
        setFormData({
            vehicleCode: "",
            licencePlateNumber: "",
            vehicleName: "",
            category: "",
            fuelType: "",
            remark: "",
            status: "",
            memberCode: "",
        });
        setCurrentVehicleCode(null);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setFormData({
            vehicleCode: "",
            licencePlateNumber: "",
            vehicleName: "",
            category: "",
            fuelType: "",
            remark: "",
            status: "",
            memberCode: "",
        });
        setCurrentVehicleCode(null);
    };

    return (
        <div>
            <h2>Vehicle Management</h2>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
                Add Vehicle
            </Button>
            <Table columns={columns} dataSource={vehicles} rowKey="vehicleCode" />

            {/* Modal for adding/editing vehicles */}
            <Modal
                title={currentVehicleCode ? "Edit Vehicle" : "Add Vehicle"}
                open={isModalVisible}  // Using 'open' instead of 'visible' for the latest Ant Design version
                onOk={handleSubmit}
                onCancel={handleCancel}
                okText="Submit"
                cancelText="Cancel"
            >
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Vehicle Code" name="vehicleCode">
                        <Input
                            value={formData.vehicleCode}
                            onChange={(e) => setFormData({ ...formData, vehicleCode: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="License Plate Number" name="licencePlateNumber">
                        <Input
                            value={formData.licencePlateNumber}
                            onChange={(e) => setFormData({ ...formData, licencePlateNumber: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Vehicle Name" name="vehicleName">
                        <Input
                            value={formData.vehicleName}
                            onChange={(e) => setFormData({ ...formData, vehicleName: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Input
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Fuel Type" name="fuelType">
                        <Input
                            value={formData.fuelType}
                            onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Remark" name="remark">
                        <Input
                            value={formData.remark}
                            onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Input
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        />
                    </Form.Item>
                    <Form.Item label="Staff ID" name="memberCode">
                        <Input
                            value={formData.memberCode}
                            onChange={(e) => setFormData({ ...formData, memberCode: e.target.value })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default VehicleManagement;
