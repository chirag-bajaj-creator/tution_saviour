const Fee = require('../models/Fee');

const list = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate({
        path: 'studentId',
        select: 'name class parentName',
      })
      .lean();
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { studentId, month, year, amount, paymentMode } = req.body;
    const fee = new Fee({
      studentId,
      month,
      year,
      amount,
      paymentMode: paymentMode || 'Pending',
      isPaid: paymentMode !== 'Pending',
      paidDate: paymentMode !== 'Pending' ? new Date() : null,
    });
    await fee.save();
    await fee.populate({
      path: 'studentId',
      select: 'name class parentName',
    });

    const io = req.app.get('io');
    io.emit('fees:updated', fee);

    res.status(201).json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid, paidDate, paymentMode } = req.body;
    const fee = await Fee.findByIdAndUpdate(
      id,
      { isPaid, paidDate: isPaid ? new Date() : null, paymentMode },
      { new: true }
    ).populate({
      path: 'studentId',
      select: 'name class parentName',
    });

    const io = req.app.get('io');
    io.emit('fees:updated', fee);

    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { list, create, update };
