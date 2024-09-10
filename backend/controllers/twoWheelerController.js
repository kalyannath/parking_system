const { TwoWheelerSlot } = require('../models/ParkingSlot');
const { ListSelectionFields } = require('../utils/config');

// Initialize parking slots
exports.initialize = async (req, res) => {
    const { totalSlots } = req.body;
    try {
        await TwoWheelerSlot.deleteMany();  // Clear existing slots
        const slots = [];
        for (let i = 1; i <= totalSlots; i++) {
            slots.push({ slotNumber: i });
        }
        await TwoWheelerSlot.insertMany(slots);
        res.status(201).send({ message: `${totalSlots} slots created.` });
    } catch (error) {
        res.status(500).send({ message: 'Error initializing slots', error });
    }
};

// Reset parking slots
exports.reset = async (req, res) => {
    try {
        await TwoWheelerSlot.deleteMany();  // Clear existing slots
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
        const availableSlot = await TwoWheelerSlot.findOne({ isOccupied: false });
        if (!availableSlot) {
            return res.status(400).send({ message: 'Parking lot is full.' });
        }

        // Check if the vehicle is already parked
        const existingVehicle = await TwoWheelerSlot.findOne({ vehicleNumber });
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
        const slot = await TwoWheelerSlot.findOne({ slotNumber });
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

exports.getAllSlots = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    try {
        const allSlots = await TwoWheelerSlot.find()
            .select(ListSelectionFields)
            .skip((page - 1) * limit)  // Skip the previous pages
            .limit(parseInt(limit));   // Limit the number of documents

        const totalSlots = await TwoWheelerSlot.countDocuments();  // Total number of slots

        res.status(200).send({
            data: allSlots,
            pagination: {
                total: totalSlots,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalSlots / limit)
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving slots', error });
    }
};

exports.getAvailableSlots = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    try {
        const availableSlots = await TwoWheelerSlot.find({ isOccupied: false })
            .select(ListSelectionFields)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalAvailableSlots = await TwoWheelerSlot.countDocuments({ isOccupied: false });

        res.status(200).send({
            data: availableSlots,
            pagination: {
                total: totalAvailableSlots,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalAvailableSlots / limit)
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving available slots', error });
    }
};

exports.getOccupiedSlots = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    try {
        const occupiedSlots = await TwoWheelerSlot.find({ isOccupied: true })
            .select(ListSelectionFields)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalOccupiedSlots = await TwoWheelerSlot.countDocuments({ isOccupied: true });

        res.status(200).send({
            data: occupiedSlots,
            pagination: {
                total: totalOccupiedSlots,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalOccupiedSlots / limit)
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving occupied slots', error });
    }
};

// Get vehicle information by slot number
exports.getSlotInfo = async (req, res) => {
    const { slotNumber } = req.params;
    try {
        const slot = await TwoWheelerSlot.findOne({ slotNumber });
        if (!slot) {
            return res.status(400).send({ message: 'Invalid slot number.' });
        }
        res.status(200).send({ data: slot });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving vehicle information', error });
    }
};

// get vehicle count based on filter
exports.getSlotCount = async (req, res) => {
    const { filter = 'all' } = req.query;
    
    try {
        let count;
        if (filter === 'all') {
            count = await TwoWheelerSlot.countDocuments();
        } else if (filter === 'available') {
            count = await TwoWheelerSlot.countDocuments({ isOccupied: false });
        } else if (filter === 'occupied') {
            count = await TwoWheelerSlot.countDocuments({ isOccupied: true });
        } else {
            return res.status(400).send({ message: 'Invald filter value' });
        }

        res.status(200).send({ filter, count });
    } catch (error) {
        res.status(500).send({ message: 'Error retreiving slot count', error });
    }
};
