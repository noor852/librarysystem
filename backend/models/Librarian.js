const { sql, poolPromise } = require('../config/db');

class Librarian {
    // Librarian login
    static async login(credentials) {
        try {
            const { Email, Password } = credentials;
            const pool = await poolPromise;

            const result = await pool.request()
                .input('Email', sql.VarChar, Email)
                .input('Password', sql.VarChar, Password)
                .execute('LibrarianLogin');

            if (result.recordset.length > 0) {
                return { success: true, userId: result.recordset[0].UserID };
            } else {
                return { success: false };
            }
        } catch (error) {
            throw error;
        }
    }

    // Change librarian password
    static async changePassword(passwordData) {
        try {
            const { Name, OldPassword, NewPassword } = passwordData;
            const pool = await poolPromise;

            await pool.request()
                .input('Name', sql.VarChar, Name)
                .input('OldPassword', sql.VarChar, OldPassword)
                .input('NewPassword', sql.VarChar, NewPassword)
                .input('UserType', sql.VarChar, 'Librarian')
                .execute('ChangingPasswords');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Librarian;