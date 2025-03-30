const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

// Student routes
router.get('/:studentID', studentController.getStudentById);
router.get('/fine/:StudentID', studentController.calculateFine);

module.exports = router;