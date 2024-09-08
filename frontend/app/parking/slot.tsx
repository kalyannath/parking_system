import { Button, Card } from "@nextui-org/react";
import { ParkingSlotType } from "../models/parkingModel";
import { LuLogOut } from "react-icons/lu";

const Slot = (
    { slotData, handleSlotSelection }:
        { slotData: ParkingSlotType, handleSlotSelection: (arg0: ParkingSlotType) => void }
) => {
    return (
        <Card
            className={`min-h-32 max-h-fit p-2 text-sm shadow-2xl ${slotData.isOccupied ? "bg-primary-red" : "bg-primary-green"} hover:bg-opacity-80 text-white/70`}
            isPressable
            onPress={() => handleSlotSelection(slotData)}
        >
            <div className="w-full h-full text-left space-y-2 text-sm">
                <div className="text-right">
                    Slot # {slotData.slotNumber}
                </div>
            </div>
        </Card>
    )
}

export default Slot;