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
} = require('../controllers/carController');
const { 
    initializeParkingValidator, 
    parkVehicleValidator, 
    unparkVehicleValidator,
    getSlotInfoValidator
} = require('../validators/parkingValidator');
const { validateRequest } = require('../middleWares/errorHandler');

const carRouter = express.Router();

// Initialize parking slots
carRouter.post('/initialize',  initializeParkingValidator, validateRequest, initialize);

// Reset parking slots
carRouter.post('/reset', reset);

// Park a vehicle
carRouter.post('/park', parkVehicleValidator, validateRequest, park);

// Unpark a vehicle
carRouter.post('/unpark', unparkVehicleValidator, validateRequest, unpark);

// Get all slots
carRouter.get('/all-slots', getAllSlots);

// Check available slots
carRouter.get('/available-slots', getAvailableSlots);

// Check occupied slots
carRouter.get('/occupied-slots', getOccupiedSlots);

// Get vehicle information by slot number
carRouter.get('/slot/:slotNumber', getSlotInfoValidator, validateRequest, getSlotInfo);

module.exports = carRouter;
