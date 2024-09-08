import { Button } from "@nextui-org/react";
import HTTP from "../utils/http";
import toast from "react-hot-toast";
import ToastMessage from "../components/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { vehicleIsUnParked } from "../redux/features/parkingLot-slice";
import { ParkingSlotType } from "../models/parkingModel";
import { LuLogOut } from "react-icons/lu";

const SlotDetails = (
    { onClose, slotData }:
        { onClose: () => void, slotData: ParkingSlotType }
) => {

    const dispatch = useDispatch<AppDispatch>();
    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);

    const handleCheckout = async () => {
        await HTTP.Post(`http://localhost:5000/parking/${parkingLotState.vehicleType}/unpark`, {slotNumber: slotData.slotNumber})
        .then(async (resp) => {
            console.log("success resp:::::::::", resp);
            dispatch(vehicleIsUnParked(resp.data.data));
            onClose(); // to close dialog window
            toast.custom((t) => (<ToastMessage toastType="success" message={resp.data.message} t={t} />));
        })
        .catch((error) => {
            console.log("error:::::::::", error);
            toast.custom((t) => (<ToastMessage toastType="error" message={error.response.data.message || error.message} t={t} />));
        })
    }

    return (
        <div className="overflow-y-auto flex flex-col" >
            <div className="flex-1 overflow-auto p-6 grid sm:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="whitespace-nowrap text-xs opacity-50">Slot Number</label>
                        <p className="whitespace-nowrap text-xs md:text-sm">{slotData.slotNumber}</p>
                    </div>
                    <div>
                        <label className="whitespace-nowrap text-xs opacity-50">Occupied by</label>
                        <p className="whitespace-nowrap text-xs md:text-sm">{slotData.isOccupied ? slotData.vehicleNumber : "None"}</p>
                    </div>
                    {slotData.isOccupied && <div>
                        <label className="whitespace-nowrap text-xs opacity-50">Check-in Time</label>
                        <p className="whitespace-nowrap text-xs md:text-sm">{new Date(slotData.entryTime).toLocaleString()}</p>
                    </div>}
                    {slotData.isOccupied && <div>
                        <label className="whitespace-nowrap text-xs opacity-50">Check-out time</label>
                        <p className="whitespace-nowrap text-xs md:text-sm">{new Date().toLocaleString()}</p>
                    </div>}
                    {slotData.isOccupied && <div>
                        <label className="whitespace-nowrap text-xs opacity-50">Bill</label>
                        <p className="whitespace-nowrap text-xs md:text-sm">{((new Date().getTime() - new Date(slotData.entryTime).getTime()) / 360000).toFixed(2)} /-</p>
                    </div>}
                </div>
            </div>
            <div className="p-6 flex justify-between items-center">
                <Button variant="flat" onPress={onClose} size="sm">
                    Close
                </Button>
                {slotData.isOccupied && <Button
                    className="min-w-fit"
                    size="sm"
                    startContent={<LuLogOut className="min-w-fit" />}
                    onPress={handleCheckout}>
                    <span>Pay & Check out</span>
                </Button>}
            </div>
        </div>
    )
}

export default SlotDetails;

