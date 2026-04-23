const Performance = require('../models/Performance');

const create = async (req, res) => {
  try {
    const { studentId, testName, marks, totalMarks, date } = req.body;
    const performance = new Performance({ studentId, testName, marks, totalMarks, date });
    await performance.save();
    await performance.populate('studentId', 'name class');

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
      query = { studentId };
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
