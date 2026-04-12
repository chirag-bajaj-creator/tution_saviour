# Project Template: Tutor Management System
# 3 Websites: Tutor App | Admin Dashboard | Parent Dashboard

---

## Design

### Brand & Colors
| Token | Value | Use |
|-------|-------|-----|
| Primary | `#4F46E5` | Buttons, active nav, highlights |
| Secondary | `#60A5FA` | Hover states, accents |
| Accent | `#14B8A6` | Performance cards, success banners |
| Page Background | `#F8FAFC` | All page backgrounds |
| Card Background | `#FFFFFF` | All cards and tables |
| Section Background | `#F1F5F9` | Alternate sections |
| Primary Text | `#0F172A` | Headings, bold labels |
| Secondary Text | `#475569` | Body text, descriptions |
| Muted Text | `#94A3B8` | Placeholders, hints |
| Success / Paid | `#10B981` | Paid badge, positive states |
| Warning / Partial | `#F59E0B` | Partial payment, caution |
| Danger / Unpaid | `#EF4444` | Unpaid badge, errors |

### Gradients
| Name | Value | Use |
|------|-------|-----|
| Main Gradient | `linear-gradient(135deg, #4F46E5, #60A5FA)` | Dashboard banner, login hero, CTA buttons |
| Soft Gradient | `linear-gradient(135deg, #3B82F6, #14B8A6)` | Summary banners, performance cards |
| Light Gradient | `linear-gradient(135deg, #FFFFFF, #EFF6FF)` | Parent report page, light section headers |

### Typography
- **Font:** Inter (primary) / Poppins (alternative for friendlier feel)
- Page Title → Bold
- Section Title → Semi-bold
- Card Numbers → Bold, large
- Labels → Medium
- Table Text → Regular

### Components
**Cards**
- Background: `#FFFFFF`, Border-radius: `16px–20px`, Padding: `20px–24px`
- Soft shadow, large number + small label below

**Buttons**
- Primary: Indigo fill, white text, rounded
- Secondary: White bg, gray border, dark text
- Gradient CTA: Main gradient — use only for Add Student, Generate Report

**Badges (Status Pills)**
- Rounded pill, light tinted background, colored text
- Paid = green | Unpaid = red | Partial = orange

**Tables**
- White background, rounded container, light row hover, minimal borders, colored badges in status column

**Icons:** Lucide / Heroicons / Tabler — line style only, no cartoon icons

**Layout:** Left sidebar + top navbar + main content area

### Per-Site UX Goals
| Site | Feel | Priority |
|------|------|----------|
| Tutor App | Productive + Professional | Daily tasks in 1–2 clicks (attendance, fees, marks) |
| Parent Dashboard | Clear + Trustworthy | Instantly see fee, attendance, performance, remark |
| Admin Dashboard | Simple + Controlled | Overview only, minimal interaction |

### Hero Section Style (Per Site)
| Site | Hero Type | What to Show |
|------|-----------|--------------|
| Teacher Website | **Real frustration image** | Teacher buried in paper registers, manual fee notebooks, lost records — painful, relatable problem |
| Parent Website | **Warm trust image** | Parent + child looking at a clean report together — relief, clarity, confidence |
| Admin Website | **No image — gradient only** | Main gradient banner (`#4F46E5 → #60A5FA`) with headline text and stats only |

### Dashboard Layouts

**Tutor Dashboard**
- Top: Gradient welcome banner with greeting
- Middle: 4 metric cards (Total Students / Pending Fees / Today's Attendance / Recent Performance)
- Bottom Left: Recent student activity table
- Bottom Right: Quick actions panel (Add Student, Mark Attendance, Record Fee, Add Marks, Generate Report)

**Admin Dashboard**
- Top: 4 overview cards (Total Teachers / Total Students / Reports Generated / Platform Activity)
- Middle: Teacher management table
- Bottom: Recent activity

**Parent Summary Page**
- Top Header: App branding + Student name + Class/Batch + Last updated
- Cards: Fee Status / Attendance Summary / Performance Summary / Teacher Remark

### Design Rules
**Do:** 16–20px rounded corners, soft shadows, consistent spacing, clean hierarchy, limited gradients, large readable cards, subtle hover states

**Avoid:** Too many colors, dark heavy UI, too many gradients, tiny text, sharp corners, ERP-style clutter, childish visuals

---

## User Flow

### Website 1 — Teacher App

#### Landing Page
- Hero image: teacher frustrated with paper registers and manual notebooks
- Shows: Hero section, product intro, core benefits (Fees, Attendance, Performance, Reports)
- Buttons: `Get Started` → Auth Page (Sign Up) | `Login` → Auth Page (Login) | `Learn More` → scrolls to features

#### Auth Page
- Shows: Email/Phone field, Password field, toggle between Sign Up and Login
- Buttons: `Sign Up` → creates account → Dashboard | `Login` → authenticates → Dashboard | `Forgot Password` → recovery flow

#### Dashboard Page
- Shows: 4 summary cards (Total Students / Pending Fees / Today's Attendance / Recent Performance), recent activity table, quick actions panel
- Buttons: `+ Add Student` → Add Student modal | `Mark Attendance` → Attendance Page | `Record Fee` → Fees Page | `Add Test Marks` → Performance Page | `Generate Parent Report` → Parent Report Page
- Sidebar: Dashboard | Students | Fees | Attendance | Performance | Parent Reports

#### Students Page
- Shows: Student list table, search bar, filter by batch/class, student detail drawer
- Buttons: `+ Add Student` → form modal | `View` → student detail drawer | `Edit` → edit form | `Generate Report` → parent report for that student | `Save` | `Cancel`

#### Fees Page
- Shows: Fee summary cards, fee table with paid/unpaid/partial badges, payment history modal
- Buttons: `Mark Paid` → full payment | `Mark Partial` → partial payment modal | `View History` → history modal | `Save Payment` | `Cancel` | `Filter Month`

#### Attendance Page
- Shows: Date picker, batch selector, student attendance list, monthly summary
- Buttons: `Select Date` → loads attendance | `Select Batch` → loads students | `Mark All Present` | `Present / Absent Toggle` per student | `Save Attendance` | `Edit Attendance`

#### Performance Page
- Shows: Performance table, student/batch filter, add test record modal
- Buttons: `+ Add Test Record` → modal | `Save Test Record` | `Edit Record` | `Delete Record` | `Filter by Student / Batch`

#### Parent Report Page
- Shows: Student selector, report preview with 4 cards (Fee Summary / Attendance Summary / Performance Summary / Teacher Remarks)
- Buttons: `Select Student` → loads report | `Preview Report` | `Copy Text` → copies summary | `Share Link` → generates shareable link | `Download PDF` (future) | `Back`

#### Logout
- Buttons: `Profile Menu` → dropdown | `Logout` → ends session → Landing Page

---

### Website 2 — Parent Dashboard

#### Landing / Intro Page
- Hero image: parent and child looking at a clean digital report — relief and trust
- Shows: Intro, trust message, what the report includes (fee, attendance, performance)
- Buttons: `View Report` → Parent Access Page | `Login` → Parent Auth Page | `Back to Home`

#### Parent Access Page
- Access via: Shared report link OR parent login
- Buttons: `Open Report` → Summary Page | `Login` → authenticates → Summary Page | `Back`

#### Parent Summary Page (Read-Only)
- Shows: Student Name, Class/Batch, Tutor Name, Last Updated

| Section | What Parent Sees | Buttons |
|---------|-----------------|---------|
| Fee Status | Monthly Fee, Paid/Pending/Partial, Last Payment Date | Read-only / `Refresh` |
| Attendance | Present Days, Absent Days, Attendance % | Read-only / `View Details` |
| Performance | Recent Test Marks, Progress Summary, Teacher Notes | Read-only / `View More` |
| Teacher Remarks | Teacher recommendation / feedback note | Read-only |

- Exit: `Refresh Report` | `Logout` (if auth enabled)

---

### Website 3 — Admin Dashboard

#### Landing Page
- No hero image — Main gradient only (`#4F46E5 → #60A5FA`) with headline and platform stats
- Shows: Admin portal branding, secure access message
- Buttons: `Admin Login` → Admin Auth Page | `Back to Home`

#### Admin Auth Page
- Shows: Email/Password login form
- Buttons: `Login` → Admin Dashboard | `Forgot Password` | `Back`

#### Admin Dashboard
- Shows: 4 summary cards (Total Teachers / Total Students / Reports Generated / Platform Activity), recent activity, teacher summary list
- Sidebar: Dashboard | Teachers | Reports | Settings
- Buttons: `View All Teachers` → Teachers Page | `View Reports` → Reports Page

#### Teachers Page
- Shows: Teachers table (Name / Status / Student Count / Join Date), search and filter
- Buttons: `View` → teacher details | `Approve` → activates account | `Disable` → suspends account | `Search` | `Filter` | `Save Changes`

#### Reports / Activity Page
- Shows: Platform activity metrics, report generation logs, active teacher usage
- Buttons: `Filter Date Range` | `View Details` → specific activity | `Export Data` (optional)

#### Settings Page
- Shows: Platform config options, access controls, system preferences
- Buttons: `Save Settings` | `Reset` | `Back`

#### Logout
- Buttons: `Profile Menu` | `Logout` → Admin Landing Page

---

## Frontend

### Website 1 — Tutor App (Build Now)
- [ ] Setup Next.js project with Tailwind CSS
- [ ] **Dashboard page** — total students count, today's attendance count, pending fees count, recent activity
- [ ] **Students page** — list all students, add/edit student form (name, class, parent name, parent contact, batch)
- [ ] **Attendance page** — select batch + date, mark each student Present/Absent, save for the day
- [ ] **Fees page** — monthly fee status per student (Paid/Unpaid), button to mark as paid
- [ ] **Performance page** — add test name + marks per student, view marks history
- [ ] **Parent Report page** — select student, view combined summary of fees + attendance + marks
- [ ] Sidebar navigation between all 6 pages
- [ ] Connect all pages to Backend APIs

### Website 2 — Admin Dashboard (Build Now)
- [ ] **Admin Dashboard page** — total teachers on platform, total students across all teachers, overall platform activity
- [ ] **Teacher Management page** — list all teacher accounts, view teacher details, activate/deactivate teacher
- [ ] **Student Count Overview page** — total students added by each teacher (read-only view)
- [ ] **Fee Overview page** — platform-level fee activity (how many paid, how many pending across all)
- [ ] **Reports Overview page** — system-level summaries and platform usage stats
- [ ] Admin login page (separate from tutor login)
- [ ] Simple sidebar navigation between all 5 admin pages

### Website 3 — Parent Dashboard (Build Now — Read Only)
- [ ] **Student Profile page** — view child details shared by the tutor (name, class, batch)
- [ ] **Fee Status page** — see monthly fee paid or pending (read-only)
- [ ] **Attendance page** — see child's attendance records by month (read-only)
- [ ] **Performance page** — see test marks and progress updates (read-only)
- [ ] **Parent Summary Report page** — full summary shared by the teacher (read-only)
- [ ] Parent login page (unique link or code shared by tutor)
- [ ] Simple bottom navigation (mobile-first, parents use phones)

### Build Later (Future — All 3 Sites)
- [ ] Export parent report as PDF
- [ ] WhatsApp share button for parent summary
- [ ] Dark mode
- [ ] Progressive Web App (mobile installable)
- [ ] Offline attendance marking with sync (Tutor App)
- [ ] Admin analytics charts (graphs for fee trends, attendance trends)

---

## Backend

### Build Now (Minimal — Single Shared Backend for all 3 websites)
- [ ] Setup Node.js + Express server
- [ ] **Auth API** — POST login (tutor / admin / parent — role-based JWT)
- [ ] **Students API** — GET all, POST add, PUT update, DELETE (tutor only)
- [ ] **Batches API** — GET all, POST add batch (tutor only)
- [ ] **Attendance API** — POST mark attendance, GET by date or student
- [ ] **Fees API** — GET fee status per student/month, PUT mark as paid (tutor only)
- [ ] **Performance API** — POST add marks, GET marks by student
- [ ] **Reports API** — GET parent summary (fees + attendance % + average marks per student)
- [ ] **Tutor Dashboard API** — GET stats (total students, unpaid fees, today's attendance)
- [ ] **Admin API** — GET all teachers, GET platform stats (total teachers, total students, fee overview)
- [ ] **Parent API** — GET child profile, attendance, fees, performance (read-only, scoped to their child only)
- [ ] Role middleware — tutor routes, admin routes, parent routes all protected separately
- [ ] Basic error handling

### Build Later (Future)
- [ ] Bulk attendance marking
- [ ] Fee reminder notifications
- [ ] SMS/WhatsApp alerts for parents
- [ ] Student photo upload
- [ ] Admin ability to suspend a teacher account
- [ ] Platform-level analytics aggregation

---

## Database

### Build Now (Minimal)
- [ ] Use PostgreSQL via Supabase
- [ ] **users** table — id, email, password_hash, role (tutor / admin / parent), created_at
- [ ] **teachers** table — id, user_id, name, phone, created_at
- [ ] **students** table — id, name, class, parent_name, parent_contact, batch_id, teacher_id, created_at
- [ ] **batches** table — id, name, schedule, teacher_id, created_at
- [ ] **attendance** table — id, student_id, date, status (present/absent)
- [ ] **fees** table — id, student_id, month, year, amount, is_paid, paid_date
- [ ] **performance** table — id, student_id, test_name, marks, total_marks, date
- [ ] **parent_access** table — id, user_id (parent), student_id (links parent to their child)
- [ ] Foreign keys on all student-related tables → students.id
- [ ] Index on: student_id, teacher_id, date, month+year

### Build Later (Future)
- [ ] Archive records older than 1 year
- [ ] Automated daily backups
- [ ] Separate read replica for admin reporting queries

---

## Security

### Implement Now (Minimal)
- [ ] Email + password login with bcrypt hashing (all 3 portals)
- [ ] JWT token with role embedded (tutor / admin / parent)
- [ ] Role middleware — each route checks role before allowing access
- [ ] Parent routes return only their own child's data (scoped by parent_access table)
- [ ] Admin routes return platform data but cannot modify tutor data
- [ ] Input validation on all forms
- [ ] Parameterized queries via ORM (no SQL injection)
- [ ] Secrets in environment variables only (DB URL, JWT secret)
- [ ] HTTPS enabled (automatic on Vercel + Supabase)
- [ ] CORS configured per frontend domain

### Add Later (Future)
- [ ] 2FA for admin login
- [ ] Rate limiting on all login endpoints
- [ ] Audit log (admin actions, tutor actions logged)
- [ ] Parent access via unique invite link (no password needed)
- [ ] CSRF protection on forms
- [ ] XSS sanitization
- [ ] Session expiry and JWT refresh tokens
- [ ] IP-based suspicious login detection for admin

---

## Testing

### Test Now (Minimal — Manual)
**Tutor App**
- [ ] Add student → appears in list
- [ ] Mark attendance → saves correctly
- [ ] Mark fee as paid → status changes
- [ ] Add test marks → appears in performance history
- [ ] Open parent report → shows correct combined data
- [ ] Tutor login works, wrong password is rejected

**Admin Dashboard**
- [ ] Admin login works, tutor login does not access admin routes
- [ ] Teacher list shows all registered teachers
- [ ] Platform stats (total teachers, students) show correct numbers

**Parent Dashboard**
- [ ] Parent login shows only their child's data
- [ ] Parent cannot edit anything (all fields read-only)
- [ ] Attendance, fees, marks all match what tutor entered

### Add Later (Future)
- [ ] Unit tests for attendance % calculation and fee aggregation
- [ ] Integration tests for all API routes
- [ ] E2E: tutor adds data → parent sees it instantly
- [ ] Role boundary tests (parent cannot hit tutor routes)
- [ ] Load test with 500+ students across 50+ teachers

---

## Deploy

### Deploy Now (3 Frontends + 1 Backend + 1 Database)
- [ ] **Tutor App** → deploy to Vercel (repo: tutor-app)
- [ ] **Admin Dashboard** → deploy to Vercel (repo: admin-dashboard)
- [ ] **Parent Dashboard** → deploy to Vercel (repo: parent-dashboard)
- [ ] **Backend** → deploy to Railway or Render (single server, shared by all 3)
- [ ] **Database** → Supabase PostgreSQL (single DB, all tables)
- [ ] Set env vars on backend: DATABASE_URL, JWT_SECRET, CORS_ORIGINS (all 3 frontend URLs)
- [ ] Run DB migrations on Supabase
- [ ] Test all 3 login flows in production
- [ ] Test tutor data appears correctly on parent dashboard

### Monitor Later (Future)
- [ ] Error tracking with Sentry (all 3 frontends + backend)
- [ ] Uptime monitoring
- [ ] Email alert if backend goes down
- [ ] Custom domains for all 3 sites

---

## Live Status

| Site | URL | Status |
|------|-----|--------|
| Tutor App | [url] | Not Started |
| Admin Dashboard | [url] | Not Started |
| Parent Dashboard | [url] | Not Started |
| Backend API | [url] | Not Started |
| Database | Supabase | Not Started |

- **Deployed Date:**
- **Target Deployment Time:** ~10 minutes

---

## 10-Minute Deployment Checklist
- [ ] All 3 frontend repos pushed to GitHub and connected to Vercel
- [ ] Backend deployed on Railway/Render with env vars set
- [ ] Supabase DB created and migrations run
- [ ] All 3 frontends can reach the shared backend
- [ ] Tutor login, Admin login, Parent login all work in production
- [ ] Tutor adds student → visible in admin + parent dashboard

## Notes
(Add project-specific notes, blockers, or decisions here)