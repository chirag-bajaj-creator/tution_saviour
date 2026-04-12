const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Performance = require('../models/Performance');
const Fee = require('../models/Fee');

const getStudentReport = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate('batchId');
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const attendance = await Attendance.find({ studentId });
    const performance = await Performance.find({ studentId });
    const fees = await Fee.find({ studentId });

    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;

    const avgPerformance = performance.length > 0
      ? (performance.reduce((sum, p) => sum + p.score, 0) / performance.length).toFixed(2)
      : 0;

    const totalFees = fees.reduce((sum, f) => sum + f.amount, 0);
    const paidFees = fees
      .filter(f => f.isPaid)
      .reduce((sum, f) => sum + f.amount, 0);

    res.json({
      student,
      attendance: {
        total: totalClasses,
        present: presentClasses,
        percentage: attendancePercentage.toFixed(2),
      },
      performance: {
        records: performance,
        average: avgPerformance,
      },
      fees: {
        total: totalFees,
        paid: paidFees,
        pending: totalFees - paidFees,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStudentReport };
