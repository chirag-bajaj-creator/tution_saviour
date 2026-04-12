const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Date,
      default: null,
    },
    paymentMode: {
      type: String,
      enum: ['Cash', 'Cheque', 'Online', 'Pending'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

feeSchema.index({ studentId: 1, month: 1, year: 1 });

module.exports = mongoose.model('Fee', feeSchema);
