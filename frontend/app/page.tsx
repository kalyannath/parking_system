"use client"

import { Tab, Tabs } from "@nextui-org/react";
import Configuration from "./parking/cofiguration"
import ParkingLot from "./parking/parkingLot";
import { Key } from "react";
import { VehicleTypes } from "./utils/vehicleTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { vehicleTypeChanged } from "./redux/features/parkingLot-slice";

export default function Home() {
  const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="w-full h-full space-y-4 overflow-y-auto px-4">
      <Tabs
        selectedKey={parkingLotState.vehicleType}
        onSelectionChange={(key: Key) => dispatch(vehicleTypeChanged(key as string))}
        size="sm"
        classNames={{
          base: "w-full justify-center"
        }}
      >
        {VehicleTypes.map((vt, index) => (
          <Tab key={vt.key} title={vt.label} />
        ))}
      </Tabs>
      <Configuration />
      <ParkingLot />
    </div>
  );
}
