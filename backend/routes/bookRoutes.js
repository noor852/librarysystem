const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

// Book routes
router.get('/', bookController.getAllBooks);
router.post('/add', bookController.addBook);
router.put('/update', bookController.updateBook);
router.delete('/delete', bookController.deleteBook);
router.post('/issue', bookController.issueBook);
router.post('/return', bookController.returnBook);

module.exports = router;