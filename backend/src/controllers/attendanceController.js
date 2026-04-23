const Attendance = require('../models/Attendance');

const mark = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(attendanceDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const attendance = await Attendance.findOneAndUpdate(
      {
        studentId,
        date: { $gte: attendanceDate, $lt: nextDay },
      },
      {
        studentId,
        date: attendanceDate,
        status,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    // Broadcast to all connected clients
    const io = req.app.get('io');
    io.emit('attendance:updated', attendance);

    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const get = async (req, res) => {
  try {
    const { studentId, date } = req.query;
    const query = {};
    if (studentId) query.studentId = studentId;
    if (date) {
      const attendanceDate = new Date(date);
      attendanceDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(attendanceDate);
      nextDay.setDate(nextDay.getDate() + 1);
      query.date = { $gte: attendanceDate, $lt: nextDay };
    }

    const attendance = await Attendance.find(query);
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mark, get };
