const { CarSlot } = require('../models/ParkingSlot');
const { ListSelectionFields } = require('../utils/config');

// Initialize parking slots
exports.initialize = async (req, res) => {
    const { totalSlots } = req.body;
    try {
        await CarSlot.deleteMany();  // Clear existing slots
        const slots = [];
        for (let i = 1; i <= totalSlots; i++) {
            slots.push({ slotNumber: i });
        }
        const result = await CarSlot.insertMany(slots);
        res.status(201).send({ message: `${totalSlots} slots created.`, data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error initializing slots', error });
    }
};

// Reset parking slots
exports.reset = async (req, res) => {
    try {
        await CarSlot.deleteMany();  // Clear existing slots
        res.status(201).send({ message: `Slots reset successfully.` });
    } catch (error) {
        res.status(500).send({ message: 'Error resetting slots', error });
    }
};

// Park a vehicle
exports.park = async (req, res) => {
    const { vehicleNumber } = req.body;
    try {
        // Find the first available slot
        const availableSlot = await CarSlot.findOne({ isOccupied: false });
        if (!availableSlot) {
            return res.status(400).send({ message: 'Parking lot is full.' });
        }

        // Check if the vehicle is already parked
        const existingVehicle = await CarSlot.findOne({ vehicleNumber });
        if (existingVehicle) {
            return res.status(400).send({ message: 'Vehicle with this registration number is already parked.' });
        }

        // Park the vehicle
        availableSlot.isOccupied = true;
        availableSlot.vehicleNumber = vehicleNumber;
        availableSlot.entryTime = new Date();  // Store the current timestamp
        const result = await availableSlot.save();

        res.status(200).send({ message: `Vehicle parked at slot ${availableSlot.slotNumber}.`, data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error parking vehicle', error });
    }
};


// Unpark a vehicle
exports.unpark = async (req, res) => {
    const { slotNumber } = req.body;
    try {
        const slot = await CarSlot.findOne({ slotNumber });
        if (!slot) {
            return res.status(400).send({ message: 'Invalid slot number.' });
        }
        if (!slot.isOccupied) {
            return res.status(400).send({ message: 'Slot is already empty.' });
        }
        slot.isOccupied = false;
        slot.vehicleNumber = null;
        slot.entryTime = null;
        const result = await slot.save();
        res.status(200).send({ message: `Vehicle removed from slot ${slotNumber}.`, data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error unparking vehicle', error });
    }
};

// Get all slots
exports.getAllSlots = async (req, res) => {
    try {
        const allSlots = await CarSlot.find().select(ListSelectionFields);
        res.status(200).send({ data: allSlots });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving slots', error });
    }
};

// Check available slots
exports.getAvailableSlots = async (req, res) => {
    try {
        const availableSlots = await CarSlot.find({ isOccupied: false }).select(ListSelectionFields);
        res.status(200).send({ data: availableSlots });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving available slots', error });
    }
};

// Check occupied slots
exports.getOccupiedSlots = async (req, res) => {
    try {
        const occupiedSlots = await CarSlot.find({ isOccupied: true }).select(ListSelectionFields);
        res.status(200).send({ data: occupiedSlots });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving occupied slots', error });
    }
};

// Get vehicle information by slot number
exports.getSlotInfo = async (req, res) => {
    const { slotNumber } = req.params;
    try {
        const slot = await CarSlot.findOne({ slotNumber });
        if (!slot) {
            return res.status(400).send({ message: 'Invalid slot number.' });
        }
        res.status(200).send({ data: slot });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving vehicle information', error });
    }
};
