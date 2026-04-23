const mongoose = require('mongoose');
const Student = require('../src/models/Student');
const Batch = require('../src/models/Batch');
const Teacher = require('../src/models/Teacher');
const User = require('../src/models/User');
const Attendance = require('../src/models/Attendance');
const Fee = require('../src/models/Fee');
const Performance = require('../src/models/Performance');
const ParentAccess = require('../src/models/ParentAccess');

require('dotenv').config();

async function unseedStudents() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tutor-app');
    console.log('Connected to MongoDB');

    console.log('Removing parent access links...');
    const parentAccessResult = await ParentAccess.deleteMany({});

    console.log('Removing performance records...');
    const performanceResult = await Performance.deleteMany({});

    console.log('Removing attendance records...');
    const attendanceResult = await Attendance.deleteMany({});

    console.log('Removing fee records...');
    const feeResult = await Fee.deleteMany({});

    console.log('Removing students...');
    const studentResult = await Student.deleteMany({});

    console.log('Removing batches...');
    const batchResult = await Batch.deleteMany({});

    console.log('Removing teachers...');
    const teacherResult = await Teacher.deleteMany({});

    console.log('Removing users...');
    const userResult = await User.deleteMany({});

    console.log('\nUnseed complete');
    console.log(`Parent access removed: ${parentAccessResult.deletedCount}`);
    console.log(`Performance removed: ${performanceResult.deletedCount}`);
    console.log(`Attendance removed: ${attendanceResult.deletedCount}`);
    console.log(`Fees removed: ${feeResult.deletedCount}`);
    console.log(`Students removed: ${studentResult.deletedCount}`);
    console.log(`Batches removed: ${batchResult.deletedCount}`);
    console.log(`Teachers removed: ${teacherResult.deletedCount}`);
    console.log(`Users removed: ${userResult.deletedCount}`);

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Unseed failed:', error);
    process.exit(1);
  }
}

unseedStudents();
