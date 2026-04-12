const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Fee = require('../models/Fee');
const Performance = require('../models/Performance');

const getStats = async (req, res) => {
  try {
    // Total Students
    const totalStudents = await Student.countDocuments();

    // Today's Attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayAttendance = await Attendance.countDocuments({
      date: { $gte: today },
      status: 'present',
    });

    // Pending Fees (unpaid)
    const pendingFeesRecords = await Fee.find({ isPaid: false });
    const pendingFees = pendingFeesRecords.reduce((sum, f) => sum + f.amount, 0);

    // Recent Performance (average of latest tests)
    const recentPerformance = await Performance.aggregate([
      { $group: { _id: null, avgMarks: { $avg: '$marks' } } },
    ]);
    const avgPerformance = recentPerformance.length > 0
      ? Math.round(recentPerformance[0].avgMarks)
      : 0;

    // Total Batches
    const Batch = require('../models/Batch');
    const totalBatches = await Batch.countDocuments();

    res.json({
      totalStudents,
      todayAttendance,
      pendingFees,
      recentPerformance: avgPerformance,
      totalBatches,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStats };
