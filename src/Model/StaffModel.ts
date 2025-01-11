export class Staff{
    memberCode: string;
    firstName:string;
    lastName:string;
    joinedDate:string;
    dateOfBirth:string;
    gender:string;
    designation:string;
    addressLine1:string;
    addressLine2:string;
    addressLine3:string;
    addressLine4:string;
    addressLine5:string;
    contactNumber:string;
    email:string;
    role:string;
    vehicleList:string;
    fieldList:string;

    constructor(memberCode: string, firstName: string, lastName: string, joinedDate: string, dateOfBirth: string, gender: string, designation: string, addressLine1: string, addressLine2: string, addressLine3: string, addressLine4: string, addressLine5: string, contactNumber: string, email: string, role: string, vehicleList: string, fieldList: string){
        this.memberCode = memberCode;
        this.firstName = firstName;
        this.lastName = lastName;
        this.joinedDate = joinedDate;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.designation = designation;
        this.addressLine1 = addressLine1;
        this.addressLine2 = addressLine2;
        this.addressLine3 = addressLine3;
        this.addressLine4 = addressLine4;
        this.addressLine5 = addressLine5;
        this.contactNumber = contactNumber;
        this.email = email;
        this.role = role;
        this.vehicleList = vehicleList;
        this.fieldList = fieldList;
    }
}