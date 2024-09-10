"use client"

import { useDispatch, useSelector } from "react-redux";
import NoItemSelected from "../components/noItemSelected";
import { AppDispatch, RootState } from "../redux/store";
import HTTP from "../utils/http";
import { parkingLotInitialized, slotsCountChanged } from "../redux/features/parkingLot-slice";
import { useEffect, useState } from "react";
import Slot from "./slot";
import { ParkingModel, ParkingSlotType } from "../models/parkingModel";
import Dialog from "../components/dialog";
import { useDisclosure } from "@nextui-org/react";
import { FaSquareParking } from "react-icons/fa6";
import SlotDetails from "./slotDetails";

const ParkingLot = () => {

    const parkingLotState = useSelector((state: RootState) => state.ParkingLotReducer);
    const dispatch = useDispatch<AppDispatch>();
    const [selectedSlot, setSelectedSlot] = useState<ParkingSlotType>(ParkingModel);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const getAllParkingSlots = async (filter: string, vehicleType: string, page: number, itemsPerFetch: number) => {
        try {
            const resp = await HTTP.Get(`http://localhost:5000/parking/${vehicleType}/${filter === "all" ? "all-slots" : filter === "available" ? "available-slots" : "occupied-slots"}?page=${page}&limit=${itemsPerFetch}`);
            console.log("get list response::::::::::::::::", resp);
            const responseData = resp.data;
            dispatch(parkingLotInitialized(responseData.data));
        } catch (error) {
            console.log("error in getCompaniesListAPICall::::::::", error);
        }
    }

    const getAllParkingSlotsCount = async (filter: string, vehicleType: string) => {
        try {
            const resp = await HTTP.Get(`http://localhost:5000/parking/${vehicleType}/slot-count?filter=${filter}`);
            console.log("get count response::::::::::::::::", resp);
            const responseData = resp.data;
            dispatch(slotsCountChanged(responseData.count));
        } catch (error) {
            console.log("error in getCompaniesListAPICall::::::::", error);
        }
    }

    useEffect(() => {
        getAllParkingSlots(parkingLotState.filter, parkingLotState.vehicleType, parkingLotState.currentPage, parkingLotState.itemsPerFetch);
    }, [parkingLotState.filter, parkingLotState.vehicleType, parkingLotState.currentPage, parkingLotState.itemsPerFetch])

    useEffect(() => {
        getAllParkingSlotsCount(parkingLotState.filter, parkingLotState.vehicleType);
    }, [parkingLotState.filter, parkingLotState.vehicleType])

    if (parkingLotState.lot.length === 0) return (
        <div className="w-full h-full overflow-y-auto" >
            <NoItemSelected />
        </div>
    )

    const handleSlotSelection = async (slotData: ParkingSlotType) => {
        try {
            const resp = await HTTP.Get(`http://localhost:5000/parking/${parkingLotState.vehicleType}/slot/${slotData.slotNumber}`);
            console.log("get list response::::::::::::::::", resp);
            const responseData = resp.data;
            setSelectedSlot(responseData.data);
            onOpen();
        } catch (error) {
            console.log("error in getCompaniesListAPICall::::::::", error);
        }
    }

    return (
        <div className="w-full max-h-full overflow-y-auto grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 sm:px-8" >
            {parkingLotState.lot.map((slot, i) => (
                <Slot key={slot._id} slotData={slot} handleSlotSelection={handleSlotSelection} />
            ))}
            <Dialog
                isSubmitting={false}
                isOpen={isOpen}
                onClose={onClose}
                headerTitle={
                    <div className="flex gap-4 items-center">
                        <FaSquareParking className="w-6 h-6" />
                        <p className="text-sm font-normal">
                            Slot details
                        </p>
                    </div>
                }
                modalBody={
                    <SlotDetails onClose={onClose} slotData={selectedSlot} />
                }
            />
        </div>
    )
}

export default ParkingLot;