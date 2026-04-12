const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    testName: {
      type: String,
      required: true,
      trim: true,
    },
    marks: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

performanceSchema.index({ studentId: 1, date: 1 });

module.exports = mongoose.model('Performance', performanceSchema);
