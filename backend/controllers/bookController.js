const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new book
exports.addBook = async (req, res) => {
    try {
        await Book.addBook(req.body);
        res.json({ success: true, message: 'Book added successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update book information
exports.updateBook = async (req, res) => {
    try {
        await Book.updateBook(req.body);
        res.json({ success: true, message: 'Book updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        await Book.deleteBook(req.body);
        res.json({ success: true, message: 'Book deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Issue a book
exports.issueBook = async (req, res) => {
    try {
        await Book.issueBook(req.body);
        res.json({ success: true, message: 'Book issued successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Return a book
exports.returnBook = async (req, res) => {
    try {
        await Book.returnBook(req.body);
        res.json({ success: true, message: 'Book returned successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};