const { sql, poolPromise } = require('../config/db');

class Book {
    // Display all books
    static async getAllBooks() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().execute('DisplayBooks');
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    // Add a new book
    static async addBook(bookData) {
        try {
            const { Title, ISBN, PublishedYear, Quantity, Price } = bookData;
            const pool = await poolPromise;

            await pool.request()
                .input('Title', sql.VarChar, Title)
                .input('ISBN', sql.VarChar, ISBN)
                .input('PublishedYear', sql.Int, PublishedYear)
                .input('Quantity', sql.Int, Quantity)
                .input('Price', sql.Int, Price)
                .execute('AddBook');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    // Update book information
    static async updateBook(bookData) {
        try {
            const { BookID, Title, ISBN, PublishedYear, Quantity, Price } = bookData;
            const pool = await poolPromise;

            await pool.request()
                .input('BookID', sql.Int, BookID)
                .input('Title', sql.VarChar, Title || null)
                .input('ISBN', sql.VarChar, ISBN || null)
                .input('PublishedYear', sql.Int, PublishedYear || null)
                .input('Quantity', sql.Int, Quantity || null)
                .input('Price', sql.Int, Price || null)
                .execute('UpdateBookInfo');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    // Delete a book
    static async deleteBook(bookData) {
        try {
            const { BookID, ISBN } = bookData;
            const pool = await poolPromise;

            await pool.request()
                .input('BookID', sql.Int, BookID || null)
                .input('ISBN', sql.VarChar, ISBN || null)
                .execute('DeleteBook');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    // Issue a book
    static async issueBook(issueData) {
        try {
            const { StudentID, BookID, IssueDate } = issueData;
            const pool = await poolPromise;

            await pool.request()
                .input('StudentID', sql.Int, StudentID)
                .input('BookID', sql.Int, BookID)
                .input('IssueDate', sql.Date, IssueDate)
                .execute('IssueBook');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    // Return a book
    static async returnBook(returnData) {
        try {
            const { StudentID, BookID, ReturnDate } = returnData;
            const pool = await poolPromise;

            await pool.request()
                .input('StudentID', sql.Int, StudentID)
                .input('BookID', sql.Int, BookID)
                .input('ReturnDate', sql.Date, ReturnDate)
                .execute('ReturnBook');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Book;