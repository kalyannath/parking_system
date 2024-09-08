
export type ParkingSlotType = {
    slotNumber: number,
    isOccupied: boolean,
    vehicleNumber: string,
    _id?: string;
    entryTime: Date;
};

export const ParkingModel: ParkingSlotType = {
    slotNumber: 0,
    isOccupied: false,
    vehicleNumber: "",
    entryTime: new Date(),
}