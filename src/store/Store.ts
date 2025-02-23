// src/store/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import VehicleSlice from "../slices/VehicleSlice";
import EquipmentSlice from "../slices/EquipmentSlice";
import StaffSlice from "../slices/StaffSlice";
import CropSlice from "../slices/CropSlice";
import LogSlice from "../slices/LogSlice";
import FieldSlice from "../slices/FieldSlice";
import TokenSlice from "../slices/TokenSlice";
import UserSlice from "../slices/UserSlice";

// Create Redux Store
export const store = configureStore({
    reducer: {
        user: UserSlice,
        vehicle: VehicleSlice,
        equipment: EquipmentSlice,
        staffs: StaffSlice,
        crop: CropSlice,
        logs: LogSlice,
        field: FieldSlice,
        token: TokenSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability warnings
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
