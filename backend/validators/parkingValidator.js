const { body, param } = require('express-validator');

// Validation for initializing parking slots
exports.initializeParkingValidator = [
    body('totalSlots')
        .notEmpty().withMessage('Total slots are required')
        .isInt({ min: 1 }).withMessage('Number of slots must be at least 1.')
];

// Validation for parking a vehicle
exports.parkVehicleValidator = [
    body('vehicleNumber')
        .notEmpty().withMessage('Vehicle number is required.')
        .isLength({ min: 1, max: 20 }).withMessage('Vehicle number must be between 1 and 20 characters.')
];

// Validation for un-parking a vehicle
exports.unparkVehicleValidator = [
    body('slotNumber')
        .notEmpty().withMessage('Slot number is required')
        .isInt({ min: 1 }).withMessage('Slot number must be a positive integer.')
];

// Validation for getting slot information by slot number
exports.getSlotInfoValidator = [
    param('slotNumber')
        .notEmpty().withMessage('Slot number is required')
        .isInt({ min: 1 }).withMessage('Slot number must be a positive integer.')
];
