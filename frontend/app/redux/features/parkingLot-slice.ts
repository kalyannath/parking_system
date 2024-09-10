import { ParkingSlotType } from "@/app/models/parkingModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ParkingLotState = {
  lot: ParkingSlotType[],
  filter: string,
  slotsCount: number,
  vehicleType: string,
  itemsPerFetch: number,
  currentPage: number,
};

const initialState: ParkingLotState = {
  lot: [],
  filter: "all",
  slotsCount: 0,
  vehicleType: "car",
  itemsPerFetch: 20,
  currentPage: 1,
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
      state.currentPage = 1; // resetting current page to 1 when filter ("all" | "available" | "occupied") is changed
    },
    vehicleTypeChanged: (state, action: PayloadAction<string>) => {
      state.vehicleType = action.payload;
      state.currentPage = 1; // resetting current page to 1 when vehcile type ("car" | "twoWheeler") is changed
    },
    currenPageChanged: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    itemsPerFetchChanged: (state, action: PayloadAction<number>) => {
      state.itemsPerFetch = action.payload;
      state.currentPage = 1; // resetting current page to 1 when items per page (20 | 40 | 100) is changed
    },
    slotsCountChanged: (state, action: PayloadAction<number>) => {
      state.slotsCount = action.payload;
    },
  }, 
});

export const { parkingLotInitialized, vehicleIsParked, vehicleIsUnParked, filterChanged, vehicleTypeChanged, currenPageChanged, itemsPerFetchChanged, slotsCountChanged } = ParkingLotStateToggle.actions;
export default ParkingLotStateToggle.reducer;

