const mongoose = require('mongoose');
const Teacher = require('../src/models/Teacher');
const Batch = require('../src/models/Batch');
const Student = require('../src/models/Student');
const Attendance = require('../src/models/Attendance');
const Fee = require('../src/models/Fee');
const Performance = require('../src/models/Performance');

require('dotenv').config();

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const STUDENTS_PER_CLASS = 10;
const BATCHES_PER_CLASS = 2;

const FIRST_NAMES = ['Arun', 'Priya', 'Raj', 'Sneha', 'Vikram', 'Isha', 'Rohit', 'Anjali', 'Arjun', 'Divya'];
const LAST_NAMES = ['Kumar', 'Singh', 'Patel', 'Sharma', 'Gupta', 'Verma', 'Reddy', 'Iyer', 'Nair', 'Desai'];

async function seedStudents() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tutor-app');
    console.log('✅ Connected to MongoDB');

    // Clear only student-related data
    console.log('🗑️ Clearing student data...');
    await Promise.all([
      Student.deleteMany({}),
      Attendance.deleteMany({}),
      Fee.deleteMany({}),
      Performance.deleteMany({})
    ]);

    const createdStudents = [];
    let studentCounter = 1;

    // Get or create Teachers and Batches (no user accounts)
    console.log('📚 Setting up batches...');
    const batches = [];

    for (let classIdx = 0; classIdx < CLASSES.length; classIdx++) {
      const className = CLASSES[classIdx];

      // Create simple teacher record (no User account)
      let teacher = await Teacher.findOne({ name: `Teacher ${classIdx + 1}` });
      if (!teacher) {
        teacher = new Teacher({
          userId: new mongoose.Types.ObjectId(), // Dummy ID
          name: `Teacher ${classIdx + 1}`,
          phone: `98765432${String(classIdx + 1).padStart(2, '0')}`
        });
        await teacher.save();
      }

      // Create batches for this class
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

    // Create Students with fake data
    console.log('\n👨‍🎓 Creating fake students...');

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
          class: batch.name.split(' - ')[0], // Extract class name
          parentName: parentName,
          parentContact: `${9800000000 + studentCounter}`, // 10-digit phone
          batchId: batch._id,
          teacherId: batch.teacherId
        });
        await student.save();
        createdStudents.push(student);

        // Create attendance records (20 days)
        for (let day = 1; day <= 20; day++) {
          const attendance = new Attendance({
            studentId: student._id,
            date: new Date(2024, 3, day),
            status: Math.random() > 0.1 ? 'present' : 'absent',
            remarks: 'Regular attendance'
          });
          await attendance.save();
        }

        // Create fee records (for 3 months)
        const amounts = [5000, 1000, 500]; // Tuition, Transport, Activities

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

        // Create performance records (8 tests with realistic marks)
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
            marks: Math.min(test.marks, 100), // Ensure marks don't exceed 100
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
    console.log(`   - ${createdStudents.length * 9} fee records (3 amounts × 3 months)`);
    console.log(`   - ${createdStudents.length * 8} performance records (8 tests per student)`);

    console.log('\n🧪 Next Steps:');
    console.log('1. Run backend & frontend servers');
    console.log('2. Create Teacher account via tutor dashboard');
    console.log('3. Create Parent account via parent dashboard');
    console.log('4. Parent links to student in setup page');
    console.log('5. View student data in dashboard ✅');

    await mongoose.connection.close();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedStudents();