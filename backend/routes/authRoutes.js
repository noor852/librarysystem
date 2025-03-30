const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Login routes
router.post('/student/login', authController.studentLogin);
router.post('/librarian/login', authController.librarianLogin);

// Change password route
router.put('/change-password', authController.changePassword);

module.exports = router;