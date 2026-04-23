import {
  ArrowRight,
  CalendarCheck,
  CreditCard,
  FileText,
  LineChart,
  Lock,
  MessageCircle,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const visibilityCards = [
  { icon: CalendarCheck, title: 'Attendance clarity', copy: 'Know which classes were attended, missed, or need follow-up.' },
  { icon: CreditCard, title: 'Fee status', copy: 'Check paid and pending fee updates without waiting for manual messages.' },
  { icon: LineChart, title: 'Performance signals', copy: 'See recent marks, subject progress, and teacher remarks in one place.' },
  { icon: MessageCircle, title: 'Tutor notes', copy: 'Read short updates that explain what changed and what needs attention.' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { openLoginModal } = useAuth()

  const handleLogin = (event) => {
    openLoginModal(event.currentTarget)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(56,189,248,0.24),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(251,113,133,0.18),transparent_28%),linear-gradient(135deg,#effbff_0%,#dff7f4_54%,#fff5f2_100%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between rounded-full border border-white/70 bg-white/45 px-4 py-3 shadow-sm backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white">
                <ShieldCheck size={21} />
              </div>
              <span className="text-sm font-semibold text-slate-900 sm:text-base">ParentView</span>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-slate-950 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Parent Login
            </button>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-4 py-2 text-sm font-medium text-sky-900 shadow-sm backdrop-blur-xl">
                <Lock size={16} />
                Secure shared progress access
              </div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-slate-950 sm:text-6xl lg:text-7xl">
                Understand your child's learning progress without confusion.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                ParentView turns attendance, fees, marks, and tutor updates into a simple report parents can read quickly
                and trust before the next class.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600"
                >
                  Login to view report <ArrowRight size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/access')}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/55 px-6 py-3 font-semibold text-slate-950 shadow-sm backdrop-blur-xl transition hover:bg-white/80"
                >
                  Shared report access
                </button>
              </div>
              <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                {['Attendance', 'Fees', 'Performance'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/70 bg-white/45 px-4 py-3 text-sm font-medium text-slate-700 backdrop-blur-xl">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">
              <div className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-2xl shadow-sky-200/50 backdrop-blur-2xl">
                <div className="rounded-[1.55rem] bg-slate-950 p-4 text-white">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-sky-100">Aarav's report</p>
                      <h2 className="text-xl font-semibold">This week snapshot</h2>
                    </div>
                    <Smartphone className="text-coral-100" size={24} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ['Attendance', '5/6', '1 missed'],
                      ['Fees', 'Paid', 'April clear'],
                      ['Math', '82%', '+8 points'],
                    ].map(([label, value, note]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <p className="text-sm text-slate-300">{label}</p>
                        <p className="mt-2 text-2xl font-bold">{value}</p>
                        <p className="mt-2 text-xs text-sky-100">{note}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <FileText size={18} className="text-sky-200" />
                      <p className="font-semibold">Tutor update</p>
                    </div>
                    <p className="text-sm leading-6 text-slate-200">
                      Strong improvement in algebra practice. Next focus: word problems and class participation.
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {['Homework submitted on time', 'Science revision pending', 'Next test scheduled Friday'].map((item) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm">
                        <span>{item}</span>
                        <span className="h-2 w-2 rounded-full bg-sky-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {visibilityCards.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
                <Icon className="text-sky-600" size={25} />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Recent progress</p>
            <h2 className="mt-4 text-4xl font-bold">A report that reads like a clear timeline.</h2>
          </div>
          <div className="space-y-4">
            {[
              ['Monday', 'Attendance marked and homework checked.'],
              ['Wednesday', 'Math score updated with tutor remarks.'],
              ['Friday', 'Fee status and next-week focus shared.'],
            ].map(([day, copy]) => (
              <div key={day} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <p className="text-sm text-sky-200">{day}</p>
                <p className="mt-2 text-lg">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/70 bg-white/55 p-8 shadow-sm backdrop-blur-2xl md:flex-row md:items-center">
          <div>
            <p className="text-sky-800">Have a shared link from your tutor?</p>
            <h2 className="mt-2 text-3xl font-bold">Open your child's report in a focused parent view.</h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/access')}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Open shared access <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  )
}
