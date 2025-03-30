const Librarian = require('../models/Librarian');

// Change librarian password (specific method if needed)
exports.changeLibrarianPassword = async (req, res) => {
    try {
        const { LibrarianID, Email, OldPassword, NewPassword } = req.body;
        
        // Create a modified object with the correct structure for the model
        const passwordData = {
            Name: Email, // Using email as the name identifier
            OldPassword,
            NewPassword,
            UserType: 'Librarian'
        };
        
        await Librarian.changePassword(passwordData);
        res.json({ success: true, message: 'Password updated successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};