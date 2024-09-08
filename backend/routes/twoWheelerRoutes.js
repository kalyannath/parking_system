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
    getOccupiedSlots
} = require('../controllers/twoWheelerController');
const { 
    initializeParkingValidator, 
    parkVehicleValidator, 
    unparkVehicleValidator,
    getSlotInfoValidator
} = require('../validators/parkingValidator');
const { validateRequest } = require('../middleWares/errorHandler');

const twoWheelerRouter = express.Router();

// Initialize parking slots
twoWheelerRouter.post('/initialize',  initializeParkingValidator, validateRequest, initialize);

// Reset parking slots
twoWheelerRouter.post('/reset', reset);

// Park a vehicle
twoWheelerRouter.post('/park', parkVehicleValidator, validateRequest, park);

// Unpark a vehicle
twoWheelerRouter.post('/unpark', unparkVehicleValidator, validateRequest, unpark);

// Get all slots
twoWheelerRouter.get('/all-slots', getAllSlots);

// Check available slots
twoWheelerRouter.get('/available-slots', getAvailableSlots);

// Check occupied slots
twoWheelerRouter.get('/occupied-slots', getOccupiedSlots);

// Get vehicle information by slot number
twoWheelerRouter.get('/slot/:slotNumber', getSlotInfoValidator, validateRequest, getSlotInfo);

module.exports = twoWheelerRouter;
