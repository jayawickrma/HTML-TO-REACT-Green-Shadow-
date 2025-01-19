class CropModel {

    cropCode: string;
    cropName: string;
    scientificName: string;
    cropCategory: string;
    cropSeason: string;
    cropImage: File | null;
    logList: string;
    fieldList: string;

    setCropId(id:string):void{
        this.cropCode = id;
    }

    constructor(cropCode: string, cropName: string, scientificName: string, cropCategory: string, cropSeason: string, cropImage: File | null, logList: string, fieldList: string) {
        this.cropCode = cropCode;
        this.cropName = cropName;
        this.scientificName = scientificName;
        this.cropCategory = cropCategory;
        this.cropSeason = cropSeason;
        this.cropImage = cropImage;
        this.logList = logList;
        this.fieldList = fieldList;
    }

    toPlainObject(){
        return {
            cropCode: this.cropCode,
            cropName: this.cropName,
            scientificName: this.scientificName,
            cropCategory: this.cropCategory,
            cropSeason: this.cropSeason,
            cropImage: this.cropImage ? this.cropImage.name : null, // Assuming you want the file name or null
            logList: this.logList,
            fieldList: this.fieldList,
        };
    }
}export default CropModel