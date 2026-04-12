const mongoose = require('mongoose');
const User = require('../src/models/User');
const Teacher = require('../src/models/Teacher');
const Batch = require('../src/models/Batch');
const Student = require('../src/models/Student');
const Attendance = require('../src/models/Attendance');
const Fee = require('../src/models/Fee');
const Performance = require('../src/models/Performance');

require('dotenv').config();

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];
const STUDENTS_PER_CLASS = 15;
const BATCHES_PER_CLASS = 2;

const FIRST_NAMES = ['Arun', 'Priya', 'Raj', 'Sneha', 'Vikram', 'Isha', 'Rohit', 'Anjali', 'Arjun', 'Divya', 'Harsh', 'Kavya', 'Nikhil', 'Pooja', 'Sanjay'];
const LAST_NAMES = ['Kumar', 'Singh', 'Patel', 'Sharma', 'Gupta', 'Verma', 'Reddy', 'Iyer', 'Nair', 'Desai'];

async function seedWithTeacher() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tutor-app');
    console.log('✅ Connected to MongoDB');

    // Find teacher by email
    console.log('\n🔍 Finding your teacher account...');
    const user = await User.findOne({ email: 'chiragbajaj2203@gmail.com' });
    if (!user) {
      console.error('❌ Teacher account not found! Please sign up first.');
      await mongoose.connection.close();
      process.exit(1);
    }

    const teacher = await Teacher.findOne({ userId: user._id });
    if (!teacher) {
      console.error('❌ Teacher profile not found! Something went wrong.');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Found teacher:', teacher.name);
    console.log('✅ Teacher ID:', teacher._id.toString());

    // Clear only student data (not teacher/user)
    console.log('\n🗑️ Clearing student data...');
    await Promise.all([
      Student.deleteMany({}),
      Batch.deleteMany({}),
      Attendance.deleteMany({}),
      Fee.deleteMany({}),
      Performance.deleteMany({})
    ]);

    const createdStudents = [];
    let studentCounter = 1;

    // Create batches for your teacher
    console.log('\n📚 Creating batches...');
    const batches = [];

    for (let classIdx = 0; classIdx < CLASSES.length; classIdx++) {
      const className = CLASSES[classIdx];

      for (let batchNum = 1; batchNum <= BATCHES_PER_CLASS; batchNum++) {
        const batch = new Batch({
          name: `${className} - Batch ${batchNum}`,
          schedule: `Mon, Wed, Fri - ${3 + batchNum}:00 PM`,
          teacherId: teacher._id
        });
        await batch.save();
        batches.push(batch);
      }

      console.log(`  ✅ Created: ${className} (${BATCHES_PER_CLASS} batches)`);
    }

    // Create Students
    console.log('\n👨‍🎓 Creating students with fake data...');

    for (const batch of batches) {
      for (let i = 0; i < STUDENTS_PER_CLASS; i++) {
        const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
        const fullName = `${firstName} ${lastName}`;

        const parentFirstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const parentLastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
        const parentName = `${parentFirstName} ${parentLastName}`;

        const student = new Student({
          name: fullName,
          class: batch.name.split(' - ')[0],
          parentName: parentName,
          parentContact: `${9800000000 + studentCounter}`,
          batchId: batch._id,
          teacherId: teacher._id
        });
        await student.save();
        createdStudents.push(student);

        // Attendance (20 days)
        for (let day = 1; day <= 20; day++) {
          const attendance = new Attendance({
            studentId: student._id,
            date: new Date(2024, 3, day),
            status: Math.random() > 0.1 ? 'present' : 'absent',
            remarks: 'Regular attendance'
          });
          await attendance.save();
        }

        // Fees (3 months)
        const amounts = [5000, 1000, 500];
        for (let month = 1; month <= 3; month++) {
          for (const amount of amounts) {
            const isPaid = Math.random() > 0.2;
            const fee = new Fee({
              studentId: student._id,
              month: month,
              year: 2024,
              amount: amount,
              isPaid: isPaid,
              paidDate: isPaid ? new Date(2024, month - 1, 10) : null,
              paymentMode: isPaid ? 'Online' : 'Pending'
            });
            await fee.save();
          }
        }

        // Performance (8 tests)
        const tests = [
          { name: 'Unit Test 1', month: 0, marks: Math.floor(Math.random() * 30 + 65) },
          { name: 'Unit Test 2', month: 1, marks: Math.floor(Math.random() * 30 + 68) },
          { name: 'Class Test 1', month: 2, marks: Math.floor(Math.random() * 25 + 70) },
          { name: 'Mid Term Exam', month: 3, marks: Math.floor(Math.random() * 25 + 72) },
          { name: 'Unit Test 3', month: 4, marks: Math.floor(Math.random() * 30 + 68) },
          { name: 'Class Test 2', month: 5, marks: Math.floor(Math.random() * 25 + 70) },
          { name: 'Revision Test', month: 6, marks: Math.floor(Math.random() * 20 + 75) },
          { name: 'Final Exam', month: 7, marks: Math.floor(Math.random() * 20 + 75) }
        ];

        for (const test of tests) {
          const performance = new Performance({
            studentId: student._id,
            testName: test.name,
            marks: Math.min(test.marks, 100),
            totalMarks: 100,
            date: new Date(2024, test.month, 15)
          });
          await performance.save();
        }

        studentCounter++;
      }
    }

    console.log(`✅ Created: ${createdStudents.length} students`);

    console.log('\n📊 Database Seeding Complete!');
    console.log('✅ Created:');
    console.log(`   - ${CLASSES.length} classes`);
    console.log(`   - ${CLASSES.length * BATCHES_PER_CLASS} batches`);
    console.log(`   - ${createdStudents.length} students`);
    console.log(`   - ${createdStudents.length * 20} attendance records`);
    console.log(`   - ${createdStudents.length * 9} fee records`);
    console.log(`   - ${createdStudents.length * 8} performance records`);
    console.log('\n✅ All linked to YOUR teacher account!');
    console.log('\n🧪 Next Steps:');
    console.log('1. Restart backend server');
    console.log('2. Login with: chiragbajaj2203@gmail.com');
    console.log('3. Go to Performance → See all student marks ✅');
    console.log('4. Create parent account & link to student ✅');

    await mongoose.connection.close();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedWithTeacher();