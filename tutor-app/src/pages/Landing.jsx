import { Link } from 'react-router-dom'
import { BookOpen, BarChart3, Users, TrendingUp } from 'lucide-react'

export const Landing = () => {
  return (
    <div className="min-h-screen bg-pageBg">
      <nav className="bg-white border-b border-sectionBg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">TutorHub</h1>
          <Link to="/auth" className="text-primary hover:text-secondary font-medium">
            Login
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="gradient-main rounded-2xl p-12 text-white text-center mb-20" style={{background: 'linear-gradient(135deg, #4F46E5, #60A5FA)'}}>
          <h1 className="text-5xl font-bold mb-4">Tutor Management Made Simple</h1>
          <p className="text-lg mb-8 opacity-90">Manage students, attendance, fees, and performance all in one place</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Get Started
            </Link>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-cardBg p-8 rounded-lg shadow-sm">
            <BookOpen className="text-primary mb-4" size={32} />
            <h3 className="text-lg font-semibold text-primaryText mb-2">Student Management</h3>
            <p className="text-secondaryText">Add and manage all your students in one place</p>
          </div>
          <div className="bg-cardBg p-8 rounded-lg shadow-sm">
            <BarChart3 className="text-accent mb-4" size={32} />
            <h3 className="text-lg font-semibold text-primaryText mb-2">Track Performance</h3>
            <p className="text-secondaryText">Monitor test marks and student progress</p>
          </div>
          <div className="bg-cardBg p-8 rounded-lg shadow-sm">
            <Users className="text-success mb-4" size={32} />
            <h3 className="text-lg font-semibold text-primaryText mb-2">Manage Attendance</h3>
            <p className="text-secondaryText">Record daily attendance effortlessly</p>
          </div>
          <div className="bg-cardBg p-8 rounded-lg shadow-sm">
            <TrendingUp className="text-warning mb-4" size={32} />
            <h3 className="text-lg font-semibold text-primaryText mb-2">Track Fees</h3>
            <p className="text-secondaryText">Keep records of payments and dues</p>
          </div>
        </div>
      </main>
    </div>
  )
}
