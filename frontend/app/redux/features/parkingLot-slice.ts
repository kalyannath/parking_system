import { ParkingSlotType } from "@/app/models/parkingModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ParkingLotState = {
  lot: ParkingSlotType[],
  filter: string,
  vehicleType: string,
};

const initialState: ParkingLotState = {
  lot: [],
  filter: "all",
  vehicleType: "car",
};

export const ParkingLotStateToggle = createSlice({
  name: "ParkingLotState",
  initialState,
  reducers: {
    parkingLotInitialized: (state, action: PayloadAction<ParkingSlotType[]>) => {
      state.lot = [...action.payload]
    },
    vehicleIsParked: (state, action: PayloadAction<ParkingSlotType>) => { // slot number
      state.lot = [...state.lot.map((item, index) => {
        if (item.slotNumber === action.payload.slotNumber) return {...item, isOccupied: true};
        return item;
      })]
    },
    vehicleIsUnParked: (state, action: PayloadAction<ParkingSlotType>) => {
      state.lot = [...state.lot.map((item, index) => {
        if (item.slotNumber === action.payload.slotNumber) return {...item, isOccupied: false};
        return item;
      })]
    },
    filterChanged: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    vehicleTypeChanged: (state, action: PayloadAction<string>) => {
      state.vehicleType = action.payload;
    }
  }, 
});

export const { parkingLotInitialized, vehicleIsParked, vehicleIsUnParked, filterChanged, vehicleTypeChanged } = ParkingLotStateToggle.actions;
export default ParkingLotStateToggle.reducer;

