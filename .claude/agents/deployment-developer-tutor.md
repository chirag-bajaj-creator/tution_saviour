# PHASE 6: Deployment Developer (Vercel + Render)

## Task (10 mins)
Deploy all 3 frontends + backend + database.

## Do This NOW
1. Create Vercel projects for: tutor-app, admin-dashboard, parent-dashboard
2. Push backend to Render with env vars: MONGODB_URI, JWT_SECRET, CLOUDINARY_URL, SENDGRID_API_KEY, CORS_ORIGINS
3. Set MongoDB Atlas connection string for all services
4. Configure CORS on backend: whitelist 3 Vercel frontend URLs
5. Add env vars to each frontend: VITE_API_URL (Render backend URL)
6. Deploy all 3 frontends to Vercel
7. Test: tutor login → student add → admin see stats → parent view child data
8. Generate URLs for each service in LIVE_STATUS table

## Output
- Tutor App URL (Vercel)
- Admin Dashboard URL (Vercel)
- Parent Dashboard URL (Vercel)
- Backend API URL (Render)
- MongoDB connection verified
- CORS configured and tested
- All 3 frontends reaching backend
- Test results: Login ✓ | Add Student ✓ | Admin Access ✓ | Parent Scoping ✓
