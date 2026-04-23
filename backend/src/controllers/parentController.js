const ParentAccess = require('../models/ParentAccess');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const Performance = require('../models/Performance');
const Batch = require('../models/Batch');
const Teacher = require('../models/Teacher');

const getLinkedStudent = async (userId) => {
  const parentAccess = await ParentAccess.findOne({ userId });
  if (!parentAccess) {
    return { parentAccess: null, student: null };
  }

  const student = await Student.findById(parentAccess.studentId);
  return { parentAccess, student };
};

const getSummary = async (req, res) => {
  try {
    const { parentAccess, student } = await getLinkedStudent(req.user.id);
    if (!parentAccess || !student) return res.status(403).json({ error: 'No student linked. Please setup your account first.' });

    const attendance = await Attendance.find({ studentId: parentAccess.studentId });
    const fees = await Fee.find({ studentId: parentAccess.studentId });
    const performance = await Performance.find({ studentId: parentAccess.studentId });
    const batch = student.batchId ? await Batch.findById(student.batchId) : null;
    const presentDays = attendance.filter((record) => record.status === 'present').length;
    const totalDays = attendance.length;
    const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
    const latestFee = [...fees].sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.month - a.month;
    })[0];
    const paidFees = fees.filter((fee) => fee.isPaid);
    const averageMarks =
      performance.length > 0
        ? Math.round(
            performance.reduce(
              (sum, test) => sum + (test.totalMarks ? (test.marks / test.totalMarks) * 100 : 0),
              0,
            ) / performance.length,
          )
        : 0;

    res.json({
      studentName: student.name,
      classYear: student.class,
      batchName: batch?.name || 'N/A',
      lastUpdated: new Date().toLocaleString('en-US'),
      feeStatus: latestFee ? (latestFee.isPaid ? 'Paid' : 'Unpaid') : 'No fee records',
      lastPaymentDate:
        paidFees.length > 0
          ? new Date(paidFees[paidFees.length - 1].paidDate || paidFees[paidFees.length - 1].updatedAt).toLocaleDateString('en-US')
          : 'N/A',
      attendancePercentage,
      presentDays,
      averageMarks,
      teacherRemark: averageMarks >= 80 ? 'Excellent progress. Keep it up.' : averageMarks >= 60 ? 'Good progress with room to improve.' : 'Needs focused practice.',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChild = async (req, res) => {
  try {
    const { parentAccess, student } = await getLinkedStudent(req.user.id);
    if (!parentAccess || !student) {
      return res.status(403).json({ error: 'No student linked. Please setup your account first.' });
    }

    const batch = student.batchId ? await Batch.findById(student.batchId) : null;
    let teacher = null;

    if (student.teacherId) {
      teacher = await Teacher.findOne({
        $or: [{ _id: student.teacherId }, { userId: student.teacherId }],
      });
    }

    res.json({
      id: student._id,
      name: student.name,
      email: null,
      classYear: student.class,
      batchName: batch?.name || 'N/A',
      rollNumber: String(student._id).slice(-6).toUpperCase(),
      phone: student.parentContact,
      teacherName: teacher?.name || 'N/A',
      teacherEmail: null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFees = async (req, res) => {
  try {
    const { parentAccess, student } = await getLinkedStudent(req.user.id);
    if (!parentAccess || !student) {
      return res.status(403).json({ error: 'No student linked. Please setup your account first.' });
    }

    const fees = await Fee.find({ studentId: parentAccess.studentId }).sort({ year: -1, month: -1 });
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    res.json({
      fees: fees.map((fee) => ({
        month: monthNames[Math.max(0, fee.month - 1)] || String(fee.month),
        year: fee.year,
        amount: fee.amount,
        status: fee.isPaid ? 'paid' : 'unpaid',
      })),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAttendance = async (req, res) => {
  try {
    const { parentAccess, student } = await getLinkedStudent(req.user.id);
    if (!parentAccess || !student) {
      return res.status(403).json({ error: 'No student linked. Please setup your account first.' });
    }

    const records = await Attendance.find({ studentId: parentAccess.studentId }).sort({ date: -1 });
    const presentDays = records.filter((record) => record.status === 'present').length;
    const absentDays = records.filter((record) => record.status === 'absent').length;
    const totalDays = records.length;
    const percentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;

    const monthMap = new Map();
    records.forEach((record) => {
      const date = new Date(record.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const label = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      const current = monthMap.get(key) || { month: label, present: 0, total: 0 };
      current.total += 1;
      if (record.status === 'present') current.present += 1;
      monthMap.set(key, current);
    });

    const monthlyBreakdown = Array.from(monthMap.values()).map((month) => ({
      month: month.month,
      percentage: month.total > 0 ? Math.round((month.present / month.total) * 100) : 0,
    }));

    res.json({ presentDays, absentDays, percentage, monthlyBreakdown });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPerformance = async (req, res) => {
  try {
    const { parentAccess, student } = await getLinkedStudent(req.user.id);
    if (!parentAccess || !student) {
      return res.status(403).json({ error: 'No student linked. Please setup your account first.' });
    }

    const tests = await Performance.find({ studentId: parentAccess.studentId }).sort({ date: -1 });
    const average =
      tests.length > 0
        ? tests.reduce((sum, test) => sum + (test.totalMarks ? (test.marks / test.totalMarks) * 100 : 0), 0) / tests.length
        : 0;

    res.json({
      average,
      tests: tests.map((test) => ({
        testName: test.testName,
        marks: test.marks,
        totalMarks: test.totalMarks,
        date: new Date(test.date).toLocaleDateString('en-US'),
      })),
    });
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

module.exports = { getSummary, getChild, getFees, getAttendance, getPerformance, linkStudent, searchStudents };
