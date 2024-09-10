// routes/parking.js
const express = require('express');
const {
    initialize,
    reset,
    park,
    unpark,
    getAllSlots,
    getAvailableSlots,
    getSlotInfo,
    getOccupiedSlots,
    getSlotCount
} = require('../controllers/twoWheelerController');
const { 
    initializeParkingValidator, 
    parkVehicleValidator, 
    unparkVehicleValidator,
    getSlotInfoValidator
} = require('../validators/parkingValidator');
const { validateRequest } = require('../middleWares/errorHandler');

const twoWheelerRouter = express.Router();

// initi parking slots
twoWheelerRouter.post('/initialize',  initializeParkingValidator, validateRequest, initialize);

// reset parking slots
twoWheelerRouter.post('/reset', reset);

// park vehicle
twoWheelerRouter.post('/park', parkVehicleValidator, validateRequest, park);

// unpark a vehicle
twoWheelerRouter.post('/unpark', unparkVehicleValidator, validateRequest, unpark);

// get all slots
twoWheelerRouter.get('/all-slots', getAllSlots);

// get available slots
twoWheelerRouter.get('/available-slots', getAvailableSlots);

// get occupied slots
twoWheelerRouter.get('/occupied-slots', getOccupiedSlots);

// get vehicle information using slot number
twoWheelerRouter.get('/slot/:slotNumber', getSlotInfoValidator, validateRequest, getSlotInfo);

// get slot count bsed on a query filter "all" | "available" | "occupied"
twoWheelerRouter.get('/slot-count', getSlotCount);

module.exports = twoWheelerRouter;
