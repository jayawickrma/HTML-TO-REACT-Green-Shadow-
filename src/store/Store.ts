import {configureStore} from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice.ts";
import EquipmentSlice from "../slices/EquipmentSlice.ts";
import StaffSlice from "../slices/StaffSlice.ts";
import CropSlice from "../slices/CropSlice.ts";
import LogSlice from "../slices/LogSlice.ts";
import FieldSlice from "../slices/FieldSlice.ts";
import TokenSlice from "../slices/TokenSlice.ts";

export const store = configureStore({
    reducer:{
        vehicles : VehicleSlice,
        equipment : EquipmentSlice,
        staffs : StaffSlice,
        crop : CropSlice,
        logs : LogSlice,
        fields : FieldSlice,
        token: TokenSlice
    }
})

export type AppDispatch = typeof store.dispatch;