const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentContact: {
      type: String,
      required: true,
      match: /^[0-9]{10,}$/,
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    photoUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

studentSchema.index({ teacherId: 1 });
studentSchema.index({ batchId: 1 });

module.exports = mongoose.model('Student', studentSchema);
