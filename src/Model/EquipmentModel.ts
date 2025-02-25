export class EquipmentModel {
    equipmentCode: string;
    name: string;
    type: string;
    status: string;
    availableCount: string; // Keep as string for form handling
    fieldList: number[];

    constructor(
        code: string,
        name: string,
        type: string,
        status: string,
        availableCount: string,
        fields: number[]
    ) {
        this.equipmentCode = code;
        this.name = name;
        this.type = type;
        this.status = status;
        this.availableCount = availableCount;
        this.fieldList = fields;
    }
}