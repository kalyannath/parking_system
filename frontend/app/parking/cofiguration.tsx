"use client"

import { Button, Divider, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import Dialog from "../components/dialog";
import InitializeParkingForm from "./initializeParkingForm";
import { FaSquare, FaSquareParking } from "react-icons/fa6";
import { ChangeEvent, useState } from "react";
import { SlotsFilters } from "../utils/slotsFIlters";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { filterChanged, itemsPerFetchChanged, parkingLotInitialized, slotsCountChanged } from "../redux/features/parkingLot-slice";
import HTTP from "../utils/http";
import toast from "react-hot-toast";
import ToastMessage from "../components/toastMessage";
import ParkVehicleForm from "./parkVehicleForm";
import PaginationComponent from "./pagination";

const Configuration = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);
    const [action, setAction] = useState("initialize")

    const dispatch = useDispatch<AppDispatch>();

    const handleResetClick = async () => {
        await HTTP.Post(`http://localhost:5000/parking/${parkingLotState.vehicleType}/reset`)
            .then(async (resp) => {
                console.log("success resp:::::::::", resp);
                dispatch(parkingLotInitialized([]));
                dispatch(slotsCountChanged(0));
                toast.custom((t) => (<ToastMessage toastType="success" message={resp.data.message} t={t} />));
            })
            .catch((error) => {
                console.log("error:::::::::", error);
                toast.custom((t) => (<ToastMessage toastType="error" message={error.message} t={t} />));
            })
    }

    const handleInitialize = () => {
        setAction("initialize");
        onOpen();
    }

    const handlePark = () => {
        setAction("park");
        onOpen();
    }

    const handleFilterChange = (filter: string) => {
        dispatch(filterChanged(filter));
    }

    return (
        <div className="w-full space-y-4">
            <div className="w-full flex justify-center flex-wrap gap-4 items-end">
                <span className="text-sm">Slots count: {parkingLotState.slotsCount}</span>
                <Button size="sm" onPress={handleInitialize} variant="flat">Initialize Slots</Button>
                <Button size="sm" variant="flat" onPress={handleResetClick}>Reset to 0</Button>
                <Button size="sm" variant="flat" onPress={handlePark}>Park a Vehicle</Button>
                <Divider orientation="vertical" className="h-8" />
                <Select
                    label="Filter"
                    labelPlacement="outside"
                    className="max-w-40"
                    classNames={{ value: "text-xs" }}
                    size="sm"
                    selectedKeys={[parkingLotState.filter]}
                    startContent=" "
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleFilterChange(e.target.value)}
                >
                    {SlotsFilters.map((v, i) => (
                        <SelectItem key={v.key}>
                            {v.label}
                        </SelectItem>
                    ))}
                </Select>
                <PaginationComponent />
            </div>
            <div className="w-fill flex justify-center flex-wrap gap-4 items-center text-sm text-tertiaryForeground">
                <div className="flex items-center gap-2"><FaSquare className="h-6 w-6 text-primary-green" /> Available</div>
                <div className="flex items-center gap-2"><FaSquare className="h-6 w-6 text-primary-red" /> Occupied</div>
            </div>
            <Dialog
                isSubmitting={false}
                isOpen={isOpen}
                onClose={onClose}
                headerTitle={
                    <div className="flex gap-4 items-center">
                        <FaSquareParking className="w-6 h-6" />
                        <p className="text-sm font-normal">
                            {action === "initialize" ? "Initialize Parking"
                                : action === "park" ? "Park a vehicle"
                                    : "Un-park a vehicle" // unpark    
                            }
                        </p>
                    </div>
                }
                modalBody={action === "initialize" ?
                    <InitializeParkingForm
                        onClose={onClose}
                    />
                    : action === "park" ?
                        <ParkVehicleForm
                            onClose={onClose}
                        />
                        : "Un-park a vehicle" // unpark    
                }
            />
        </div>
    )
}

export default Configuration;