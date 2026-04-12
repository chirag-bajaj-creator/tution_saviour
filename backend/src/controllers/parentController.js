const ParentAccess = require('../models/ParentAccess');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const Performance = require('../models/Performance');

const getSummary = async (req, res) => {
  try {
    const parentAccess = await ParentAccess.findOne({ userId: req.user.id });
    if (!parentAccess) return res.status(403).json({ error: 'No student linked. Please setup your account first.' });

    const student = await Student.findById(parentAccess.studentId);
    const attendance = await Attendance.find({ studentId: parentAccess.studentId });
    const fees = await Fee.find({ studentId: parentAccess.studentId });
    const performance = await Performance.find({ studentId: parentAccess.studentId });

    res.json({ student, attendance, fees, performance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const linkStudent = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID required' });
    }

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if parent already has access
    const existing = await ParentAccess.findOne({ userId: req.user.id, studentId });
    if (existing) {
      return res.status(400).json({ error: 'Already linked to this student' });
    }

    // Create parent access
    const parentAccess = new ParentAccess({ userId: req.user.id, studentId });
    await parentAccess.save();

    res.status(201).json({ message: 'Student linked successfully', parentAccess });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchStudents = async (req, res) => {
  try {
    const { name, parentContact } = req.query;

    if (!name) {
      return res.status(400).json({ error: 'Student name required' });
    }

    // Search students by name (case-insensitive)
    const students = await Student.find({
      name: { $regex: name, $options: 'i' }
    }).select('_id name class parentName parentContact');

    if (students.length === 0) {
      return res.status(404).json({ error: 'No students found with that name' });
    }

    // If parentContact provided, filter matches
    if (parentContact) {
      const filtered = students.filter(s => s.parentContact === parentContact);
      if (filtered.length === 0) {
        return res.status(403).json({ error: 'Parent contact does not match records' });
      }
      return res.json(filtered);
    }

    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSummary, linkStudent, searchStudents };
