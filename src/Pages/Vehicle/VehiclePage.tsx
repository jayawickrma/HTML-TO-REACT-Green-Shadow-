import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { saveVehicle, updateVehicle, deleteVehicle, getAllVehicles } from "../../slices/VehicleSlice";
import VehicleModel from "../../Model/VehicleModel";
import { RootState } from "../../store/Store.ts";

const VehicleManagement: React.FC = () => {
    const dispatch = useDispatch();
    const vehicles = useSelector((state: RootState) => state.vehicle.vehicles);

    const [formData, setFormData] = useState<Partial<VehicleModel>>({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllVehicles());
    }, [dispatch]);

    const columns = [
        { title: "Vehicle Code", dataIndex: "vehicleCode" },
        { title: "License Plate", dataIndex: "licencePlateNumber" },
        { title: "Name", dataIndex: "vehicleName" },
        { title: "Category", dataIndex: "category" },
        { title: "Fuel Type", dataIndex: "fuelType" },
        { title: "Status", dataIndex: "status" },
        { title: "Staff ID", dataIndex: "memberCode" },
        {
            title: "Actions",
            render: (_, record: VehicleModel) => (
                <>
                    <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
                    <Button danger onClick={() => dispatch(deleteVehicle(record.vehicleCode))}>Delete</Button>
                </>
            ),
        },
    ];

    const handleEdit = (vehicle: VehicleModel) => {
        setFormData(vehicle);
        setIsEdit(true);
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setFormData({ vehicleCode: `VEH-${Date.now()}` });
        setIsEdit(false);
        setIsModalVisible(true);
    };

    const handleSubmit = () => {
        if (isEdit) {
            dispatch(updateVehicle(formData as VehicleModel));
        } else {
            dispatch(saveVehicle(formData as VehicleModel));
        }
        setIsModalVisible(false);
    };

    return (
        <div>
            <h2>Vehicle Management</h2>
            <Button type="primary" onClick={handleAdd}>Add Vehicle</Button>
            <Table columns={columns} dataSource={vehicles} rowKey="vehicleCode" />

            <Modal title={isEdit ? "Edit Vehicle" : "Add Vehicle"} open={isModalVisible} onOk={handleSubmit} onCancel={() => setIsModalVisible(false)}>
                <Input placeholder="Vehicle Code" value={formData.vehicleCode} disabled />
                <Input placeholder="License Plate" onChange={(e) => setFormData({ ...formData, licencePlateNumber: e.target.value })} />
            </Modal>
        </div>
    );
};

export default VehicleManagement;
