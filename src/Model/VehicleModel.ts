class VehicleModel{
    vehicleCode: string;
    licencePlateNumber: string;
    vehicleName: string;
    category: string;
    fuelType: string;
    remark: string;
    status: string;
    memberCode: string;

    constructor(vehicleCode: string, licencePlateNumber: string, vehicleName: string, category: string, fuelType: string, remark: string, status: string, memberCode: string){
        this.vehicleCode = vehicleCode;
        this.licencePlateNumber = licencePlateNumber;
        this.vehicleName = vehicleName;
        this.category = category;
        this.fuelType = fuelType;
        this.remark = remark;
        this.status = status;
        this.memberCode = memberCode;
    }
}
export default VehicleModel