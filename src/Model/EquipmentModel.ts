export class EquipmentModel{
    equipmentCode: string;
    equipmentName: string;
    equipmentType: string;
    equipmentStatus: string;
    availableCount:string;
    fieldList:string;

    constructor(code: string, name: string, type: string, status: string, count: string, fields: string){
        this.equipmentCode = code;
        this.equipmentName = name;
        this.equipmentType = type;
        this.equipmentStatus = status;
        this.availableCount = count;
        this.fieldList = fields;
    }
}