const Batch = require('../models/Batch');

const list = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, schedule } = req.body;
    const batch = new Batch({ name, schedule, teacherId: req.user.id });
    await batch.save();
    res.status(201).json(batch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { list, create };
