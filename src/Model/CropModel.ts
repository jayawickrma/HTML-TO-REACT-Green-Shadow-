export class CropModel{

    cropCode:string;
    cropName:string;
    scientificName:string;
    cropCategory:string;
    cropSeason:string;
    cropImage:File|null;
    logList:string[];
    fieldList:string[];


    constructor(cropCode: string, cropName: string, scientificName: string, cropCategory: string, cropSeason: string, cropImage: File | null, logList: string[], fieldList: string[]) {
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.scientificName = scientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
        this.cropImage = cropImage;
        this.logList = logList;
        this.fieldList = fieldList;
    }
}
