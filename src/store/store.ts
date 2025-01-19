import {configureStore} from "@reduxjs/toolkit";
import CropSlice from "../reducer/CropSlice.ts";
import FieldSlice from "../reducer/FieldSlice.ts";
import LogSlice from "../reducer/LogSlice.ts";
import StaffSlice from "../reducer/StaffSlice.ts";
import VehicleSlice from "../reducer/VehicleSlice.ts";
import EquipmentSlice from "../reducer/EquipmentSlice.ts";

export const store = configureStore({
    reducer:{
        crop:CropSlice,
        field:FieldSlice,
        log:LogSlice,
        staff:StaffSlice,
        vehicle:VehicleSlice,
        equipment:EquipmentSlice,
    }
})