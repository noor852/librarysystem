const Student = require('../models/Student');

// Get student by ID
exports.getStudentById = async (req, res) => {
    try {
        const { studentID } = req.params;
        const student = await Student.findById(studentID);
        
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'Student not found!' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Calculate fine for a student
exports.calculateFine = async (req, res) => {
    try {
        const { StudentID } = req.params;
        const fineResult = await Student.calculateFine(StudentID);
        res.json(fineResult);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};