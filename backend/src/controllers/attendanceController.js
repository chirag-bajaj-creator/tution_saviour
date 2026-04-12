const Attendance = require('../models/Attendance');

const mark = async (req, res) => {
  try {
    const { studentId, date, status } = req.body;
    const attendance = new Attendance({ studentId, date, status });
    await attendance.save();

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
    if (date) query.date = new Date(date);

    const attendance = await Attendance.find(query);
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mark, get };
