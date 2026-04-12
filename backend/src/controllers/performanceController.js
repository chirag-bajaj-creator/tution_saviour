const Performance = require('../models/Performance');
const Student = require('../models/Student');

const create = async (req, res) => {
  try {
    const { studentId, testName, marks, totalMarks, date } = req.body;
    const performance = new Performance({ studentId, testName, marks, totalMarks, date });
    await performance.save();

    // Broadcast to all connected clients
    const io = req.app.get('io');
    io.emit('performance:updated', performance);

    res.status(201).json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const get = async (req, res) => {
  try {
    const { studentId } = req.query;

    let query = {};

    if (studentId) {
      // If specific student requested, return their performance
      query = { studentId };
    } else {
      // Return ALL performance records (for testing with 200 students)
      // In production, filter by teacherId like above
    }

    const performance = await Performance.find(query)
      .populate('studentId', 'name class')
      .sort({ date: -1 });

    res.json(performance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, get };
