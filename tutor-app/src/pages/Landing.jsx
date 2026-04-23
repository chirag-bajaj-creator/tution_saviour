import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LineChart,
  MessageCircle,
  Quote,
  Sparkles,
  Users,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const featureCards = [
  {
    icon: Users,
    title: 'Student records',
    copy: 'Profiles, batches, parent contacts, subjects, and class notes stay connected for every learner.',
  },
  {
    icon: CalendarCheck,
    title: 'Attendance capture',
    copy: 'Mark presence after class and see absence patterns before they become parent escalations.',
  },
  {
    icon: CreditCard,
    title: 'Fee follow-up',
    copy: 'Track paid, due, and overdue fees with the exact student context needed for reminders.',
  },
  {
    icon: LineChart,
    title: 'Progress reports',
    copy: 'Turn attendance, marks, and tutor remarks into clear parent-facing performance updates.',
  },
]

const dashboardRows = [
  ['Aarav Mehta', 'Grade 10 Math', 'Present', 'Paid'],
  ['Isha Rao', 'Science Foundation', 'Absent', 'Pending'],
  ['Kabir Singh', 'Exam Sprint', 'Present', 'Due'],
]

const workflow = [
  ['Capture', 'Attendance, fees, class notes'],
  ['Monitor', 'Weak topics, dues, absences'],
  ['Report', 'Parent updates and progress'],
]

export const Landing = () => {
  const { openLoginModal } = useAuth()

  const handleLogin = (event) => {
    openLoginModal(event.currentTarget)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#04172f] text-white">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(37,99,235,0.48),transparent_32%),radial-gradient(circle_at_78%_14%,rgba(34,211,238,0.36),transparent_30%),radial-gradient(circle_at_54%_86%,rgba(20,184,166,0.3),transparent_36%),linear-gradient(135deg,#04172f_0%,#0b2f63_48%,#075f65_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:74px_74px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,23,47,0.08)_0%,rgba(4,23,47,0.34)_100%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-3 shadow-2xl shadow-sky-950/30 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-400/25">
                <GraduationCap size={22} />
              </div>
              <span className="text-sm font-semibold text-white sm:text-base">TutorOps</span>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/25 transition hover:bg-cyan-200"
            >
              Tutor Login
            </button>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm font-medium text-cyan-50 shadow-lg shadow-sky-950/20 backdrop-blur-xl">
                <Sparkles size={16} />
                Sapphire, cyan, and teal workspace for daily tutoring
              </div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Manage students, attendance, fees, and progress from one tutor dashboard.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                TutorOps gives independent tutors and coaching teams a polished operating layer for daily classes,
                follow-ups, and parent-ready reports.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-200"
                >
                  Open tutor dashboard <ArrowRight size={18} />
                </button>
                <a
                  href="#workflow"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-950/20 backdrop-blur-xl transition hover:bg-white/15"
                >
                  See workflow
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {[
                  ['148', 'active students'],
                  ['92%', 'attendance today'],
                  ['12', 'reports ready'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-lg shadow-sky-950/15 backdrop-blur-xl">
                    <p className="text-3xl font-bold text-white">{value}</p>
                    <p className="mt-1 text-sm font-medium text-cyan-100">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -left-6 top-10 hidden rounded-3xl border border-white/20 bg-white/15 p-4 shadow-xl shadow-cyan-950/30 backdrop-blur-2xl lg:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-300/20 p-2 text-emerald-100">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Reports ready</p>
                    <p className="text-xs text-cyan-100">12 parent updates</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-14 hidden rounded-3xl border border-white/20 bg-white/15 p-4 shadow-xl shadow-cyan-950/30 backdrop-blur-2xl lg:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-cyan-300/20 p-2 text-cyan-100">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Follow-up queue</p>
                    <p className="text-xs text-cyan-100">7 fee reminders</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/25 bg-white/15 p-4 shadow-2xl shadow-sky-950/45 backdrop-blur-2xl">
                <div className="overflow-hidden rounded-[1.55rem] border border-white/15 bg-slate-950 text-white shadow-2xl">
                  <div className="bg-[radial-gradient(circle_at_18%_0%,rgba(56,189,248,0.24),transparent_34%),linear-gradient(135deg,#0f172a_0%,#0b2d4d_58%,#115e59_100%)] p-5">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-cyan-100">Today operations</p>
                        <h2 className="text-xl font-bold">Class control board</h2>
                      </div>
                      <div className="rounded-full bg-cyan-300 px-3 py-1 text-sm font-bold text-slate-950">Live</div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ['Students', '148', '+12'],
                        ['Attendance', '92%', '6 absent'],
                        ['Fees', '18', 'pending'],
                      ].map(([label, value, note]) => (
                        <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                          <p className="text-sm text-slate-300">{label}</p>
                          <p className="mt-2 text-3xl font-bold">{value}</p>
                          <p className="mt-2 text-xs font-medium text-cyan-100">{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                        <p className="font-semibold">Student updates</p>
                        <Users size={18} className="text-cyan-200" />
                      </div>
                      <div className="divide-y divide-white/10">
                        {dashboardRows.map(([name, batch, attendance, fee]) => (
                          <div key={name} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3">
                            <div>
                              <p className="font-semibold">{name}</p>
                              <p className="mt-1 text-sm text-slate-300">{batch}</p>
                            </div>
                            <div className="text-right text-sm">
                              <p className={attendance === 'Absent' ? 'font-semibold text-rose-200' : 'font-semibold text-emerald-200'}>
                                {attendance}
                              </p>
                              <p className="mt-1 text-slate-300">{fee}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">Performance</p>
                          <BarChart3 size={18} className="text-cyan-200" />
                        </div>
                        <div className="mt-5 grid h-32 grid-cols-7 items-end gap-2">
                          {[42, 58, 51, 72, 66, 84, 91].map((height, index) => (
                            <div
                              key={index}
                              className="rounded-t-xl bg-gradient-to-t from-blue-600 via-sky-500 to-cyan-300"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="rounded-2xl border border-cyan-200/20 bg-cyan-300/10 p-4 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                          <FileText size={18} className="text-cyan-200" />
                          <p className="font-semibold">Parent report</p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          Attendance, fee status, and marks are ready to share for 12 students.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_12%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(180deg,#062044_0%,#073a56_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Tutor operations</p>
            <h2 className="mt-4 text-4xl font-bold">A focused workspace for everything after class.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-sky-950/15 backdrop-blur-xl">
                <Icon className="text-cyan-200" size={26} />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="relative bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.22),transparent_30%),radial-gradient(circle_at_82%_72%,rgba(20,184,166,0.18),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Daily flow</p>
            <h2 className="mt-4 text-4xl font-bold">Capture, monitor, report.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              The page is built around the real tutor rhythm: class records first, operational follow-up next, parent
              communication last.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {workflow.map(([title, copy], index) => (
              <div key={title} className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                  <ClipboardCheck size={22} />
                </div>
                <p className="mt-8 text-sm text-cyan-100">Step {index + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_24%,rgba(34,211,238,0.22),transparent_30%),radial-gradient(circle_at_22%_82%,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,#04172f_0%,#0b355f_100%)]" />
        <div className="relative mx-auto mb-8 max-w-7xl rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl shadow-sky-950/25 backdrop-blur-2xl">
          <Quote className="text-cyan-200" size={30} />
          <p className="mt-5 max-w-4xl text-2xl font-semibold leading-10 text-white">
            We stopped maintaining three trackers. Attendance, fees, and parent updates now move through the same
            dashboard after every class.
          </p>
          <p className="mt-4 text-cyan-100">Independent coaching teacher, 120+ active students</p>
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl shadow-sky-950/25 backdrop-blur-2xl md:flex-row md:items-center">
          <div>
            <p className="font-medium text-cyan-100">Ready for cleaner tutoring operations?</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Open the tutor dashboard and start with today's classes.</h2>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:bg-cyan-200"
          >
            Login to TutorOps <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  )
}
