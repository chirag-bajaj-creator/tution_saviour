const Student = require('../models/Student');

const list = async (req, res) => {
  try {
    const students = await Student.find().populate('batchId');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, class: cls, parentName, parentContact, batchId } = req.body;
    const student = new Student({
      name,
      class: cls,
      parentName,
      parentContact,
      batchId,
      teacherId: req.user.id,
      photoUrl: req.file?.path || null,
    });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { list, create, update, remove };
