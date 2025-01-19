class logModel{
    logCode:string;
    logDate:string;
    logDetails:string;
    observedImage:File|null;
    staffList:string;
    cropList:string;
    fieldList:string;

    constructor(logCode:string, logDate:string, logDetails:string, observedImage:File|null, staffList:string, cropList:string, fieldList:string){
        this.logCode = logCode;
        this.logDate = logDate;
        this.logDetails = logDetails;
        this.observedImage = observedImage;
        this.staffList = staffList;
        this.cropList = cropList;
        this.fieldList = fieldList;
    }
}
export default logModel