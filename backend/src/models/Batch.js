const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
  },
  { timestamps: true }
);

batchSchema.index({ teacherId: 1 });

module.exports = mongoose.model('Batch', batchSchema);
