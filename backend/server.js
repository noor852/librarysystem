
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sql, poolPromise } = require('./db'); // Database connection

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Add all methods your frontend might use
    allowedHeaders: ["Content-Type", "Authorization"], // Include headers used by the frontend
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on "${PORT}"`));

// ✅ 1. Student Login
app.post('/student/login', async (req, res) => {
    try {
        console.log("Incoming Request:", req.body); // Debugging log
        const { Email, Password } = req.body;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .execute('StudentLogin');

        if (result.recordset.length > 0) {
            res.json({ success: true, userId: result.recordset[0].UserID });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error("Error during Student Login:", err); // Debugging log
        res.status(500).json({ error: "Internal server error!" });
    }
});

// ✅ 2. Librarian Login
app.post('/librarian/login', async (req, res) => {
    try {
        console.log("Incoming Request:", req.body); // Debugging log
        const { Email, Password } = req.body;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, Password)
            .execute('LibrarianLogin');

        if (result.recordset.length > 0) {
            res.json({ success: true, userId: result.recordset[0].UserID });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error("Error during Librarian Login:", err); // Debugging log
        res.status(500).json({ error: "Internal server error!" });
    }
});
// ✅ 3. Display All Books
app.get('/books', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().execute('DisplayBooks');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 4. Add a New Book (Librarian)
app.post('/books/add', async (req, res) => {
    try {
        const { Title, ISBN, PublishedYear, Quantity, Price } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('Title', sql.VarChar, Title)
            .input('ISBN', sql.VarChar, ISBN)
            .input('PublishedYear', sql.Int, PublishedYear)
            .input('Quantity', sql.Int, Quantity)
            .input('Price', sql.Int, Price)
            .execute('AddBook');

        res.json({ success: true, message: 'Book added successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 5. Update Book Information (Librarian)
app.put('/books/update', async (req, res) => {
    try {
        const { BookID, Title, ISBN, PublishedYear, Quantity, Price } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('BookID', sql.Int, BookID)
            .input('Title', sql.VarChar, Title || null)
            .input('ISBN', sql.VarChar, ISBN || null)
            .input('PublishedYear', sql.Int, PublishedYear || null)
            .input('Quantity', sql.Int, Quantity || null)
            .input('Price', sql.Int, Price || null)
            .execute('UpdateBookInfo');

        res.json({ success: true, message: 'Book updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 6. Delete a Book (Librarian)
app.delete('/books/delete', async (req, res) => {
    try {
        const { BookID, ISBN } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('BookID', sql.Int, BookID || null)
            .input('ISBN', sql.VarChar, ISBN || null)
            .execute('DeleteBook');

        res.json({ success: true, message: 'Book deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 7. Search for a Student (Librarian)
app.get('/students/:studentID', async (req, res) => {
    try {
        const { studentID } = req.params;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('StudentID', sql.Int, studentID)
            .execute('SearchStudent');

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: 'Student not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 8. Change Librarian Password
app.put('/librarian/change-password', async (req, res) => {
    try {
        const { LibrarianID, Email, OldPassword, NewPassword } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('LibrarianID', sql.Int, LibrarianID)
            .input('Email', sql.VarChar, Email)
            .input('OldPassword', sql.VarChar, OldPassword)
            .input('NewPassword', sql.VarChar, NewPassword)
            .execute('ChangeLibrarianPassword');

        res.json({ success: true, message: 'Password updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 9. Issue Book (Student Borrows a Book)
app.post('/books/issue', async (req, res) => {
    try {
        const { StudentID, BookID, IssueDate } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('StudentID', sql.Int, StudentID)
            .input('BookID', sql.Int, BookID)
            .input('IssueDate', sql.Date, IssueDate)
            .execute('IssueBook');

        res.json({ success: true, message: 'Book issued successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 10. Return Book (Student Returns a Book)
app.post('/books/return', async (req, res) => {
    try {
        const { StudentID, BookID, ReturnDate } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('StudentID', sql.Int, StudentID)
            .input('BookID', sql.Int, BookID)
            .input('ReturnDate', sql.Date, ReturnDate)
            .execute('ReturnBook');

        res.json({ success: true, message: 'Book returned successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 11. Calculate Fine (If Book is Returned Late)
app.get('/student/fine/:StudentID', async (req, res) => {
    try {
        const { StudentID } = req.params;
        const pool = await poolPromise;

        const result = await pool.request()
            .input('StudentID', sql.Int, StudentID)
            .execute('CalculateFine');

        res.json({ fineAmount: result.recordset[0].FineAmount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ 8. Change Password (Student/Librarian)

app.put('/change-password', async (req, res) => {
    try {
        const { Name, OldPassword, NewPassword, UserType } = req.body; // Extract data from request body
        console.log("Request Data:", req.body); // Log request data to check what you're receiving
        const pool = await poolPromise; // Database connection

        // Call the stored procedure ChangePassword
        const result = await pool.request()
            .input('Name', sql.VarChar, Name)
            .input('OldPassword', sql.VarChar, OldPassword)
            .input('NewPassword', sql.VarChar, NewPassword)
            .input('UserType', sql.VarChar, UserType)
            .execute('ChangingPasswords'); // Call the stored procedure
            console.log("Stored Procedure Result:", result); // Log result from the stored procedure
        // If there are any messages printed from the stored procedure (like error messages), they will be in result
        res.json({ success: true, message: 'Password updated successfully!' });
    } catch (err) {
        console.error("Error during password change:", err);
        res.status(500).json({ error: "Internal server error!" });
    }
});