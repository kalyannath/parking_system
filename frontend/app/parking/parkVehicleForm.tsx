import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import HTTP from "../utils/http";
import toast from "react-hot-toast";
import ToastMessage from "../components/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { vehicleIsParked } from "../redux/features/parkingLot-slice";

const ParkVehicleForm = (
    { onClose }:
        { onClose: () => void }
) => {

    const dispatch = useDispatch<AppDispatch>();
    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);

    const [formData, setFormData] = useState({
        vehicleNumber: "",
    })

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
        await HTTP.Post(`http://localhost:5000/parking/${parkingLotState.vehicleType}/park`, formData)
        .then(async (resp) => {
            console.log("success resp:::::::::", resp);
            dispatch(vehicleIsParked(resp.data.data));
            onClose(); // to close dialog window
            toast.custom((t) => (<ToastMessage toastType="success" message={resp.data.message} t={t} />));
        })
        .catch((error) => {
            console.log("error:::::::::", error);
            const errorResonse = error.response.data;
            toast.custom((t) => (<ToastMessage toastType="error" message={errorResonse.message || errorResonse?.errors[0]?.msg || error.message} t={t} />));
        })
    }
    return (
        <form className="overflow-y-auto flex flex-col" onSubmit={handleSubmit}>
            <div className="flex-1 overflow-auto p-6 grid sm:grid-cols-2 gap-4">
                <Input
                    label="Vehicle Number"
                    labelPlacement="outside"
                    startContent=" "
                    size="sm"
                    isRequired
                    value={formData.vehicleNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, vehicleNumber: e.target.value})}
                />
            </div>
            <div className="p-6 flex justify-between items-center">
                <Button variant="flat" onPress={onClose} size="sm">
                    Cancel
                </Button>
                <Button color="primary" size="sm" type="submit">
                    Park
                </Button>
            </div>
        </form>
    )
}

export default ParkVehicleForm;

