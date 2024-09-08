const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
    slotNumber: { type: Number, required: true, unique: true },
    isOccupied: { type: Boolean, default: false },
    vehicleNumber: { type: String, default: null },
    entryTime: { type: Date, default: null }
});

const CarSlot = mongoose.model('CarSlot', parkingSlotSchema);
const TwoWheelerSlot = mongoose.model('TwoWheelerSlot', parkingSlotSchema);
const BicycleSlot = mongoose.model('BicycleSlot', parkingSlotSchema);

module.exports = {
    CarSlot, TwoWheelerSlot, BicycleSlot
};
