import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const NoItemSelected = () => {
    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <div className="grid grid-cols-3 gap-4">
                <div className="w-20 h-20 bg-tertiaryBackground/10 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/20 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/30 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/20 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/30 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/20 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/30 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/20 rounded"></div>
                <div className="w-20 h-20 bg-tertiaryBackground/10 rounded"></div>
            </div>
            <p className="text-xs">
                {parkingLotState.filter === "all" ? "Initialize parking to see slots here."
                    : parkingLotState.filter === "available" ? "No available parking slots."
                        : "No occupied parking slots."}
            </p>
        </div>
    )
}

export default NoItemSelected;