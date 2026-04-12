const mongoose = require('mongoose');

const parentAccessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  },
  { timestamps: true }
);

parentAccessSchema.index({ userId: 1, studentId: 1 });
parentAccessSchema.index({ studentId: 1 });

module.exports = mongoose.model('ParentAccess', parentAccessSchema);
