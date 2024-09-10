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
} = require('../controllers/carController');
const { 
    initializeParkingValidator, 
    parkVehicleValidator, 
    unparkVehicleValidator,
    getSlotInfoValidator
} = require('../validators/parkingValidator');
const { validateRequest } = require('../middleWares/errorHandler');

const carRouter = express.Router();

// initi parking slots
carRouter.post('/initialize',  initializeParkingValidator, validateRequest, initialize);

// reset parking slots
carRouter.post('/reset', reset);

// park vehicle
carRouter.post('/park', parkVehicleValidator, validateRequest, park);

// unpark a vehicle
carRouter.post('/unpark', unparkVehicleValidator, validateRequest, unpark);

// get all slots
carRouter.get('/all-slots', getAllSlots);

// get available slots
carRouter.get('/available-slots', getAvailableSlots);

// get occupied slots
carRouter.get('/occupied-slots', getOccupiedSlots);

// get vehicle information using slot number
carRouter.get('/slot/:slotNumber', getSlotInfoValidator, validateRequest, getSlotInfo);

// get slot count bsed on a query filter "all" | "available" | "occupied"
carRouter.get('/slot-count', getSlotCount);

module.exports = carRouter;
