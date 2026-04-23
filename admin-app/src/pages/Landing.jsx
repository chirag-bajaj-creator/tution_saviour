import {
  Activity,
  ArrowRight,
  BarChart3,
  ClipboardList,
  Gauge,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const capabilities = [
  { icon: Users, title: 'Teacher management', copy: 'Review tutor records, roles, classes, and operating ownership from one admin layer.' },
  { icon: BarChart3, title: 'Reporting control', copy: 'Track attendance, fee movement, and performance reports across the tutoring business.' },
  { icon: Settings, title: 'System settings', copy: 'Keep platform rules, access, and operational defaults controlled by administrators.' },
]

export const Landing = () => {
  const { openLoginModal } = useAuth()

  const handleLogin = (event) => {
    openLoginModal(event.currentTarget)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#060b14] text-white">
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(99,102,241,0.26),transparent_32%),radial-gradient(circle_at_84%_18%,rgba(16,185,129,0.18),transparent_30%),linear-gradient(135deg,#060b14_0%,#0b1530_46%,#123039_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 text-slate-950">
                <LayoutDashboard size={21} />
              </div>
              <span className="text-sm font-semibold tracking-wide sm:text-base">AdminControl</span>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-100"
            >
              Admin Login
            </button>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/25 bg-emerald-200/10 px-4 py-2 text-sm text-emerald-100 backdrop-blur-xl">
                <ShieldCheck size={16} />
                Platform oversight for owners and operators
              </div>
              <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-7xl">
                See the whole tutoring business clearly and act from one control layer.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                AdminControl brings teacher metrics, reports, fee visibility, and system governance into a sharp operating
                dashboard built for decisions, not noise.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200"
                >
                  Open admin control <ArrowRight size={18} />
                </button>
                <a
                  href="#monitoring"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  Review oversight
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {['Teachers', 'Reports', 'Settings'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-slate-100 backdrop-blur-xl">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
                <div className="rounded-[1.5rem] border border-white/15 bg-slate-950/65 p-4">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-emerald-100">Control center</p>
                      <h2 className="text-xl font-semibold">Business overview</h2>
                    </div>
                    <Gauge className="text-emerald-200" size={25} />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-4">
                    {[
                      ['Tutors', '32'],
                      ['Students', '1.8k'],
                      ['Reports', '426'],
                      ['Collection', '94%'],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                        <p className="text-sm text-slate-300">{label}</p>
                        <p className="mt-2 text-2xl font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="font-semibold">Teacher performance</p>
                        <Activity size={18} className="text-emerald-200" />
                      </div>
                      <div className="grid h-44 grid-cols-8 items-end gap-2">
                        {[52, 68, 61, 80, 73, 88, 77, 92].map((height, index) => (
                          <div key={index} className="rounded-t-xl bg-gradient-to-t from-indigo-500 to-emerald-300" style={{ height: `${height}%` }} />
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-emerald-300/10 p-4">
                      <p className="font-semibold">Operations queue</p>
                      <div className="mt-4 space-y-3 text-sm text-slate-200">
                        <p>6 teachers need report approval</p>
                        <p>14 fee exceptions need review</p>
                        <p>3 settings changes pending</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 text-slate-950 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">Admin capabilities</p>
            <h2 className="mt-4 text-4xl font-bold">Govern the business without losing operational detail.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <Icon className="text-indigo-700" size={26} />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="monitoring" className="bg-slate-950 px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200">Monitoring</p>
            <h2 className="mt-4 text-4xl font-bold">A management view for reports, teachers, and exceptions.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Report health', 'Confirm which tutors are publishing parent reports on time.'],
              ['Fee exceptions', 'Track overdue payments and unresolved status changes.'],
              ['Teacher metrics', 'Compare activity, attendance quality, and class ownership.'],
              ['System controls', 'Manage settings with a clean view of what changed.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
                <ClipboardList className="text-emerald-200" size={24} />
                <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#060b14] px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-2xl md:flex-row md:items-center">
          <div>
            <p className="text-emerald-100">Ready to operate from the control layer?</p>
            <h2 className="mt-2 text-3xl font-bold">Open admin access and review the platform state.</h2>
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200"
          >
            Admin login <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  )
}
