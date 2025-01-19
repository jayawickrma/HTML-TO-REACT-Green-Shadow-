import {configureStore} from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice.ts";
import EquipmentSlice from "../slices/EquipmentSlice.ts";
import StaffSlice from "../slices/StaffSlice.ts";
import CropSlice from "../slices/CropSlice.ts";
import LogSlice from "../slices/LogSlice.ts";
import FieldSlice from "../slices/FieldSlice.ts";

export const store = configureStore({
    reducer:{
        vehicles : VehicleSlice,
        equipments : EquipmentSlice,
        staffs : StaffSlice,
        crops : CropSlice,
        logs : LogSlice,
        fields : FieldSlice
    }
})