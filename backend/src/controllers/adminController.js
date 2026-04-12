const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('userId', 'email');
    const withStudentCounts = await Promise.all(
      teachers.map(async (t) => {
        const count = await Student.countDocuments({ teacherId: t._id });
        return { ...t.toObject(), studentCount: count };
      })
    );
    res.json(withStudentCounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTeacherStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const teacher = await Teacher.findByIdAndUpdate(id, { status }, { new: true });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalTeachers = await Teacher.countDocuments();
    const totalStudents = await Student.countDocuments();
    const reportsGenerated = 0;
    const platformActivity = 0;
    res.json({ totalTeachers, totalStudents, reportsGenerated, platformActivity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTeachers, updateTeacherStatus, getStats };
