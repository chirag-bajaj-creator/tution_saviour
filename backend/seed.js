require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('./src/models/Student');
const Batch = require('./src/models/Batch');
const Teacher = require('./src/models/Teacher');
const User = require('./src/models/User');
const Fee = require('./src/models/Fee');
const Attendance = require('./src/models/Attendance');
const Performance = require('./src/models/Performance');
const ParentAccess = require('./src/models/ParentAccess');

const firstNames = [
  'Aarav', 'Vivaan', 'Arjun', 'Reyansh', 'Aditya', 'Ishaan', 'Diya', 'Ananya', 'Isha', 'Priya',
  'Rohan', 'Rahul', 'Kunal', 'Nikhil', 'Sanjay', 'Ravi', 'Vikram', 'Sameer', 'Naveen', 'Amit',
  'Pooja', 'Shreya', 'Neha', 'Anjali', 'Deepika', 'Sakshi', 'Veda', 'Nisha', 'Sonya', 'Meera',
];

const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Jain', 'Verma', 'Yadav', 'Nair', 'Iyer'];

const classes = ['Class 8', 'Class 9', 'Class 10'];

const generatePhone = () => {
  return '98' + Math.floor(Math.random() * 10000000000).toString().padStart(8, '0');
};

const generateUniqueName = (index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const serial = String(index + 1).padStart(3, '0');
  return `${firstName} ${lastName} ${serial}`;
};

const generateStudent = (batchId, userId, index) => ({
  name: generateUniqueName(index),
  class: classes[index % classes.length],
  parentName: `Parent ${String(index + 1).padStart(3, '0')}`,
  parentContact: generatePhone(),
  batchId,
  teacherId: userId,
});

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Student.deleteMany({});
    await Batch.deleteMany({});
    await Teacher.deleteMany({});
    await ParentAccess.deleteMany({});
    await User.deleteMany({});

    // Create users first (teachers need to reference users)
    console.log('👤 Creating users...');
    const userConfigs = [
      { email: 'admin@tutorapp.com', passwordHash: 'admin123', role: 'admin', name: 'Admin' },
      { email: 'rajesh.kumar@tutor.com', passwordHash: 'password123', role: 'tutor' },
      { email: 'priya.sharma@tutor.com', passwordHash: 'password123', role: 'tutor' },
      { email: 'vikram.singh@tutor.com', passwordHash: 'password123', role: 'tutor' },
    ];

    const users = [];
    for (const config of userConfigs) {
      const user = new User(config);
      await user.save(); // This triggers the pre-save hook to hash the password
      users.push(user);
      console.log(`  ✅ Created ${config.role} user: ${config.email}`);
    }
    console.log(`✅ Created ${users.length} users (1 admin + 3 tutors)`);

    // Create teachers (we need 3 for 3 batches)
    console.log('👨‍🏫 Creating teachers...');
    const teachers = await Teacher.insertMany([
      { userId: users[0]._id, name: 'Mr. Rajesh Kumar', phone: generatePhone(), status: 'active' },
      { userId: users[1]._id, name: 'Ms. Priya Sharma', phone: generatePhone(), status: 'active' },
      { userId: users[2]._id, name: 'Mr. Vikram Singh', phone: generatePhone(), status: 'active' },
    ]);
    console.log(`✅ Created ${teachers.length} teachers`);

    // Create batches (3 batches of 50 students each)
    console.log('📚 Creating batches...');
    const batches = await Batch.insertMany([
      { name: 'Batch A (Morning)', schedule: 'Monday - Friday, 8:00 AM - 10:00 AM', teacherId: teachers[0]._id },
      { name: 'Batch B (Afternoon)', schedule: 'Monday - Friday, 2:00 PM - 4:00 PM', teacherId: teachers[1]._id },
      { name: 'Batch C (Evening)', schedule: 'Monday - Friday, 5:00 PM - 7:00 PM', teacherId: teachers[2]._id },
    ]);
    console.log(`✅ Created ${batches.length} batches`);

    // Create 150 students (50 per batch)
    console.log('👨‍🎓 Creating 150 students (50 per batch)...');
    const students = [];
    const parentUsers = [];

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      console.log(`  Batch ${batchIndex + 1}: Creating 50 students...`);
      const batchStudents = [];

      for (let i = 0; i < 50; i++) {
        const studentIndex = batchIndex * 50 + i;
        batchStudents.push(
          generateStudent(batches[batchIndex]._id, users[batchIndex + 1]._id, studentIndex)
        );
      }

      const createdStudents = await Student.insertMany(batchStudents);
      students.push(...createdStudents);
      console.log(`  ✅ Batch ${batchIndex + 1} complete: ${createdStudents.length} students added`);
    }

    console.log('ðŸ‘ª Creating parent users and linking student access...');
    const parentAccessRecords = [];
    for (let i = 0; i < students.length; i++) {
      const parentNumber = String(i + 1).padStart(3, '0');
      const parentUser = new User({
        email: `parent${parentNumber}@tutorapp.com`,
        passwordHash: 'password123',
        role: 'parent',
      });
      await parentUser.save();
      parentUsers.push(parentUser);

      parentAccessRecords.push({
        userId: parentUser._id,
        studentId: students[i]._id,
      });
    }

    await ParentAccess.insertMany(parentAccessRecords);
    console.log(`âœ… Created ${parentUsers.length} parent users and ${parentAccessRecords.length} access links`);

    // Create fees for all students
    console.log('💰 Creating fees for all students...');
    console.log(`📊 Total students created: ${students.length}`);
    console.log(`📊 First student ID: ${students[0]?._id}`);
    const fees = [];
    const paymentModes = ['Cash', 'Cheque', 'Online', 'Pending'];
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    for (const student of students) {
      console.log(`  Adding fees for student ${student._id} (${student.name})`);
      for (let month = 1; month <= 3; month++) {
        const isPaid = Math.random() > 0.5;
        fees.push({
          studentId: student._id,
          month,
          year: currentYear,
          amount: 5000,
          isPaid,
          paidDate: isPaid ? new Date() : null,
          paymentMode: isPaid ? paymentModes[Math.floor(Math.random() * 3)] : 'Pending',
        });
      }
    }

    await Fee.insertMany(fees);
    console.log(`✅ Created ${fees.length} fee records`);

    // Create attendance records for all students
    console.log('📋 Creating attendance records...');
    const attendance = [];
    for (const student of students) {
      for (let i = 0; i < 15; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        attendance.push({
          studentId: student._id,
          date,
          status: Math.random() > 0.2 ? 'present' : 'absent',
        });
      }
    }
    await Attendance.insertMany(attendance);
    console.log(`✅ Created ${attendance.length} attendance records`);

    // Create performance records for all students
    console.log('📊 Creating performance records...');
    const performance = [];
    const testNames = ['Unit Test 1', 'Unit Test 2', 'Mid Term', 'Final Exam'];
    for (const student of students) {
      testNames.forEach((testName) => {
        performance.push({
          studentId: student._id,
          testName,
          marks: Math.floor(Math.random() * 80) + 20,
          totalMarks: 100,
          date: new Date(),
        });
      });
    }
    await Performance.insertMany(performance);
    console.log(`✅ Created ${performance.length} performance records`);

    console.log('\n✅ Seeding complete!');
    console.log(`📊 Summary:`);
    console.log(`   - Teachers: ${teachers.length}`);
    console.log(`   - Batches: ${batches.length}`);
    console.log(`   - Students: ${students.length}`);
    console.log(`   - Parent Users: ${parentUsers.length}`);
    console.log(`   - Parent Access Links: ${parentAccessRecords.length}`);
    console.log(`   - Fees: ${fees.length}`);
    console.log(`   - Attendance Records: ${attendance.length}`);
    console.log(`   - Performance Records: ${performance.length}`);
    console.log(`   - Students per batch: 50`);
    console.log(`   - Example parent login: parent001@tutorapp.com / password123`);

    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
