const Student = require('../models/Student');
const Librarian = require('../models/Librarian');

// Student login
exports.studentLogin = async (req, res) => {
    try {
        console.log("Incoming Student Login Request:", req.body);
        const result = await Student.login(req.body);
        
        if (result.success) {
            res.json({ success: true, userId: result.userId });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error("Error during Student Login:", err);
        res.status(500).json({ error: "Internal server error!" });
    }
};

// Librarian login
exports.librarianLogin = async (req, res) => {
    try {
        console.log("Incoming Librarian Login Request:", req.body);
        const result = await Librarian.login(req.body);
        
        if (result.success) {
            res.json({ success: true, userId: result.userId });
        } else {
            res.status(401).json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        console.error("Error during Librarian Login:", err);
        res.status(500).json({ error: "Internal server error!" });
    }
};

// Change password for both student and librarian
exports.changePassword = async (req, res) => {
    try {
        const { Name, OldPassword, NewPassword, UserType } = req.body;
     //   console.log("Request Data:", req.body);
     console.log("Request Data:", req.body);
     console.log("Received UserType:", `"${UserType}"`); // Debugging UserType value
        let result;
        if (UserType === 'Student') {
            result = await Student.changePassword(req.body);
        } else if (UserType === 'Librarian') {
            result = await Librarian.changePassword(req.body);
        } else {
            return res.status(400).json({ error: "Invalid user type!" });
        }
        
        res.json({ success: true, message: 'Password updated successfully!' });
    } catch (err) {
        console.error("Error during password change:", err);
        res.status(500).json({ error: "Internal server error!" });
    }
};