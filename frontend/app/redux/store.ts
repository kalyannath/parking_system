import { configureStore } from "@reduxjs/toolkit";
import ProgressBarReducer from "./features/progressBar-slice";
import ParkingLotReducer from "./features/parkingLot-slice";

export const store = configureStore({
  reducer: {
    ProgressBarReducer,
    ParkingLotReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
