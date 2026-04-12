const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10,}$/,
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

teacherSchema.index({ userId: 1 });

module.exports = mongoose.model('Teacher', teacherSchema);
