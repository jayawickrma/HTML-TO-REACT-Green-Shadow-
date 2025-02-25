class fieldModel{
    fieldCode:string;
    name:string;
    location:string;
    extentSize:string;
    fieldImage:File|null;
    equipmentList:string;
    cropList:string;
    logList:string;


    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldExtentSize: string, fieldImage: File | null, equipmentList: string, cropList: string, logList: string) {
        this.fieldCode = fieldCode;
        this.name = fieldName;
        this.location = fieldLocation;
        this.extentSize = fieldExtentSize;
        this.fieldImage = fieldImage;
        this.equipmentList = equipmentList;
        this.cropList = cropList;
        this.logList = logList;
    }
}
export default fieldModel