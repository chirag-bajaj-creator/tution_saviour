# PHASE 1: Database Developer (Tutor System)

## Task (10 mins)
Set up MongoDB Atlas cluster and define Mongoose schemas for the Tutor Management System.

## Do This NOW
1. Define Mongoose schemas: users, teachers, students, batches, attendance, fees, performance, parentAccess
2. Add indexes: attendance(studentId, date), fees(studentId, month, year), students(teacherId)
3. Create `/backend/src/models/` folder with schema files
4. Export all models ready for backend use
5. Provide connection string format for .env

## Output
- 8 Mongoose schema files in `/backend/src/models/`
- Index definitions for each schema
- Sample .env config for MONGODB_URI
