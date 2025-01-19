class fieldModel{
    fieldCode:string;
    fieldName:string;
    fieldLocation:string;
    fieldExtentSize:string;
    fieldImage1:File|null;
    fieldImage2:File|null;
    equipmentList:string;
    cropList:string;
    logList:string;


    constructor(fieldCode: string, fieldName: string, fieldLocation: string, fieldExtentSize: string, fieldImage1: File | null, fieldImage2: File | null, equipmentList: string, cropList: string, logList: string) {
        this.fieldCode = fieldCode;
        this.fieldName = fieldName;
        this.fieldLocation = fieldLocation;
        this.fieldExtentSize = fieldExtentSize;
        this.fieldImage1 = fieldImage1;
        this.fieldImage2 = fieldImage2;
        this.equipmentList = equipmentList;
        this.cropList = cropList;
        this.logList = logList;
    }
}
export default fieldModel