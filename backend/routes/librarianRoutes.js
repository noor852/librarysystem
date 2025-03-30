const express = require('express');
const librarianController = require('../controllers/librarianController');
const router = express.Router();

// Librarian routes
router.put('/change-password', librarianController.changeLibrarianPassword);

module.exports = router;