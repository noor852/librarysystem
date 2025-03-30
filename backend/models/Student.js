const { sql, poolPromise } = require('../config/db');

class Student {
    // Student login
    static async login(credentials) {
        try {
            const { Email, Password } = credentials;
            const pool = await poolPromise;

            const result = await pool.request()
                .input('Email', sql.VarChar, Email)
                .input('Password', sql.VarChar, Password)
                .execute('StudentLogin');

            if (result.recordset.length > 0) {
                return { success: true, userId: result.recordset[0].UserID };
            } else {
                return { success: false };
            }
        } catch (error) {
            throw error;
        }
    }

    // Find student by ID
    static async findById(studentID) {
        try {
            const pool = await poolPromise;

            const result = await pool.request()
                .input('StudentID', sql.Int, studentID)
                .execute('SearchStudent');

            if (result.recordset.length > 0) {
                return result.recordset[0];
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    // Calculate fine for a student
    static async calculateFine(studentID) {
        try {
            const pool = await poolPromise;

            const result = await pool.request()
                .input('StudentID', sql.Int, studentID)
                .execute('CalculateFine');

            return { fineAmount: result.recordset[0].FineAmount };
        } catch (error) {
            throw error;
        }
    }

    // Change student password
    static async changePassword(passwordData) {
        try {
            const { Name, OldPassword, NewPassword } = passwordData;
            const pool = await poolPromise;

            await pool.request()
                .input('Name', sql.VarChar, Name)
                .input('OldPassword', sql.VarChar, OldPassword)
                .input('NewPassword', sql.VarChar, NewPassword)
                .input('UserType', sql.VarChar, 'Student')
                .execute('ChangingPasswords');

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Student;