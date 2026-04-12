# PHASE 4: Admin Dashboard Developer (React + Vite)

## Task (10 mins)
Build Admin Dashboard (read-only platform stats and teacher management).

## Do This NOW
1. Scaffold React + Vite project with Tailwind CSS
2. Create components: StatCard (reuse from Tutor App), TeacherTable, StatusToggle
3. Create pages: Landing, Auth (admin-only), Dashboard, Teachers, Reports, Settings
4. Create service file: `/src/services/adminApi.js` for admin endpoints
5. Create context/hook: useAdminAuth for JWT management
6. Add React Router v6 navigation
7. Left sidebar layout (same as Tutor App)
8. Color scheme: same as Tutor App
9. Teacher approval/disable functionality
10. Read-only views (no student CRUD)

## Output
- `/admin-dashboard/` (Vite project)
- `/admin-dashboard/src/components/` (admin-specific components)
- `/admin-dashboard/src/pages/` (6 pages: landing, auth, dashboard, teachers, reports, settings)
- `/admin-dashboard/src/services/adminApi.js`
- `/admin-dashboard/.env.example`
