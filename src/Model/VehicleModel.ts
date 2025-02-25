class VehicleModel {
    vehicleCode: string;
    licensePlateNumber: string; // Corrected field name
    name: string;
    category: string;
    fuelType: string;
    remark: string;
    status: string;
    memberCode: number;

    constructor(
        vehicleCode: string,
        licensePlateNumber: string, // Corrected field name
        name: string,
        category: string,
        fuelType: string,
        remark: string,
        status: string,
        memberCode: number
    ) {
        this.vehicleCode = vehicleCode;
        this.licensePlateNumber = licensePlateNumber; // Corrected field name
        this.name = name;
        this.category = category;
        this.fuelType = fuelType;
        this.remark = remark;
        this.status = status;
        this.memberCode = memberCode;
    }
}

export default VehicleModel;