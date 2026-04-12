# PHASE 2: Backend Developer (Tutor System)

## Task (10 mins)
Build Express API with auth, middleware, and all CRUD routes.

## Do This NOW
1. Create Express app with CORS, JWT middleware, error handling
2. Implement verifyJWT + checkRole middleware
3. Create auth routes: POST /auth/login, POST /auth/signup
4. Create all CRUD routes: /students, /batches, /attendance, /fees, /performance
5. Create admin routes: GET /admin/teachers, PUT /admin/teachers/:id/status
6. Create parent routes: GET /parent/summary with scopeToChild middleware
7. Connect all routes to controllers
8. Add bcrypt password hashing in auth controller
9. Integrate Cloudinary uploader for student photos
10. Integrate SendGrid for welcome emails

## Output
- `/backend/src/app.js` (Express app with all middleware)
- `/backend/src/routes/` (auth, students, batches, attendance, fees, performance, admin, parent)
- `/backend/src/middleware/` (verifyJWT, checkRole, scopeToChild)
- `/backend/src/controllers/` (auth, students, etc.)
- `/backend/src/services/` (cloudinary.js, sendgrid.js)
- `/backend/.env.example`
