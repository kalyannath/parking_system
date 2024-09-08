import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import HTTP from "../utils/http";
import toast from "react-hot-toast";
import ToastMessage from "../components/toastMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { parkingLotInitialized } from "../redux/features/parkingLot-slice";

const InitializeParkingForm = (
    { onClose }:
        { onClose: () => void }
) => {

    const dispatch = useDispatch<AppDispatch>();
    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);

    const [formData, setFormData] = useState({
        totalSlots: 10,
        vehicleType: "car",
    })

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.target);
        await HTTP.Post(`http://localhost:5000/parking/${parkingLotState.vehicleType}/initialize`, { totalSlots: formData.totalSlots })
        .then(async (resp) => {
            console.log("success resp:::::::::", resp);
            dispatch(parkingLotInitialized(resp.data.data))
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
                    label="Number of slots"
                    labelPlacement="outside"
                    startContent=" "
                    size="sm"
                    type="number"
                    isRequired
                    min={1}
                    value={String(formData.totalSlots)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, totalSlots: Number(e.target.value)})}
                />
                {/* <Select
                    label="Select vehicle type"
                    labelPlacement="outside"
                    size="sm"
                    selectedKeys={[formData.vehicleType]}
                    startContent=" "
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({...formData, vehicleType: e.target.value})}
                >
                    {VehicleTypes.map((v, i) => (
                        <SelectItem key={v.key}>
                            {v.label}
                        </SelectItem>
                    ))}
                </Select> */}
            </div>
            <div className="p-6 flex justify-between items-center">
                <Button variant="flat" onPress={onClose} size="sm">
                    Cancel
                </Button>
                <Button color="primary" size="sm" type="submit">
                    Initialize
                </Button>
            </div>
        </form>
    )
}

export default InitializeParkingForm;