const mongoose = require('mongoose');
const User = require('../src/models/User');
const Teacher = require('../src/models/Teacher');
const Batch = require('../src/models/Batch');
const Student = require('../src/models/Student');
const Attendance = require('../src/models/Attendance');
const Fee = require('../src/models/Fee');
const Performance = require('../src/models/Performance');
const ParentAccess = require('../src/models/ParentAccess');

require('dotenv').config();

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const STUDENTS_PER_CLASS = 5;
const BATCHES_PER_CLASS = 2;

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tutor-app');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Teacher.deleteMany({}),
      Batch.deleteMany({}),
      Student.deleteMany({}),
      Attendance.deleteMany({}),
      Fee.deleteMany({}),
      Performance.deleteMany({}),
      ParentAccess.deleteMany({})
    ]);

    const createdStudents = [];
    const createdTeachers = [];

    // Create Teachers
    console.log('👨‍🏫 Creating teachers...');
    for (let i = 1; i <= CLASSES.length; i++) {
      const user = new User({
        email: `teacher${i}@school.com`,
        passwordHash: 'password123',
        role: 'tutor'
      });
      await user.save();

      const teacher = new Teacher({
        userId: user._id,
        name: `Teacher ${i}`,
        phone: `98765432${String(i).padStart(2, '0')}`
      });
      await teacher.save();
      createdTeachers.push(teacher);
      console.log(`  ✅ Created: Teacher ${i}`);
    }

    // Create Batches and Students
    console.log('📚 Creating batches and students...');
    for (let classIdx = 0; classIdx < CLASSES.length; classIdx++) {
      const className = CLASSES[classIdx];
      const teacher = createdTeachers[classIdx];

      // Create multiple batches per class
      for (let batchNum = 1; batchNum <= BATCHES_PER_CLASS; batchNum++) {
        const batch = new Batch({
          name: `${className} - Batch ${batchNum}`,
          description: `${className} - Batch ${batchNum} (${STUDENTS_PER_CLASS} students)`,
          teacherId: teacher._id,
          startDate: new Date(2024, 0, 1),
          endDate: new Date(2024, 11, 31)
        });
        await batch.save();

        // Create students for this batch
        for (let studentNum = 1; studentNum <= STUDENTS_PER_CLASS; studentNum++) {
          const studentId = classIdx * BATCHES_PER_CLASS * STUDENTS_PER_CLASS + (batchNum - 1) * STUDENTS_PER_CLASS + studentNum;

          const student = new Student({
            name: `Student ${studentId}`,
            class: className,
            parentName: `Parent ${studentId}`,
            parentContact: `9876543${String(studentId).padStart(3, '0')}`,
            batchId: batch._id,
            teacherId: teacher._id
          });
          await student.save();
          createdStudents.push(student);

          // Create parent user and link
          const parentUser = new User({
            email: `parent${studentId}@school.com`,
            passwordHash: 'password123',
            role: 'parent'
          });
          await parentUser.save();

          const parentAccess = new ParentAccess({
            userId: parentUser._id,
            studentId: student._id
          });
          await parentAccess.save();

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

          // Create fee records
          const fees = ['Tuition', 'Transport', 'Activities'];
          for (const feeType of fees) {
            const fee = new Fee({
              studentId: student._id,
              amount: feeType === 'Tuition' ? 5000 : feeType === 'Transport' ? 1000 : 500,
              feeType,
              dueDate: new Date(2024, 4, 15),
              paidDate: Math.random() > 0.3 ? new Date(2024, 4, 10) : null,
              status: Math.random() > 0.3 ? 'paid' : 'pending'
            });
            await fee.save();
          }

          // Create performance records (4 subjects, 5 exams)
          const subjects = ['Mathematics', 'English', 'Science', 'Social Studies'];
          for (let exam = 1; exam <= 5; exam++) {
            for (const subject of subjects) {
              const performance = new Performance({
                studentId: student._id,
                subject,
                examName: `Exam ${exam}`,
                marks: Math.floor(Math.random() * 40 + 60),
                totalMarks: 100,
                date: new Date(2024, exam, 15)
              });
              await performance.save();
            }
          }
        }
        console.log(`  ✅ Created: ${className} - Batch ${batchNum} (${STUDENTS_PER_CLASS} students)`);
      }
    }

    console.log('\n📊 Database Seeding Complete!');
    console.log(`✅ Created ${CLASSES.length} teachers`);
    console.log(`✅ Created ${CLASSES.length * BATCHES_PER_CLASS} batches`);
    console.log(`✅ Created ${createdStudents.length} students`);
    console.log(`✅ Each student has:`);
    console.log(`   - 20 attendance records`);
    console.log(`   - 3 fee records`);
    console.log(`   - 20 performance records (4 subjects × 5 exams)`);
    console.log(`✅ Each student linked to a parent user`);

    console.log('\n🧪 Test Login Credentials:');
    console.log('Parent (Student 1): parent1@school.com / password123');
    console.log('Teacher 1: teacher1@school.com / password123');

    await mongoose.connection.close();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();