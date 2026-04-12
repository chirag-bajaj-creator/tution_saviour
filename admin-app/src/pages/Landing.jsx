import { useNavigate } from 'react-router-dom'
import { BarChart3, Users, TrendingUp } from 'lucide-react'

export const Landing = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-500 to-teal-500">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 text-white">
        <h1 className="text-2xl font-bold">TutorHub Admin</h1>
        <button
          onClick={() => navigate('/auth')}
          className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100"
        >
          Admin Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center text-white">
        <div className="mb-8">
          <BarChart3 size={80} className="mx-auto mb-4 opacity-90" />
        </div>
        <h2 className="text-5xl font-bold mb-6">Admin Control Center</h2>
        <p className="text-xl max-w-2xl mb-8 opacity-90">
          Manage teachers, monitor platform activity, and track system performance across all tutors and students.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-left">
            <Users className="mb-3" size={32} />
            <h3 className="text-lg font-bold mb-2">Teacher Management</h3>
            <p className="text-sm opacity-80">View and manage all registered tutors on the platform</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-left">
            <TrendingUp className="mb-3" size={32} />
            <h3 className="text-lg font-bold mb-2">Analytics</h3>
            <p className="text-sm opacity-80">Track platform metrics and usage statistics</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 text-left">
            <BarChart3 className="mb-3" size={32} />
            <h3 className="text-lg font-bold mb-2">Reports</h3>
            <p className="text-sm opacity-80">Generate and monitor system reports and logs</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/auth')}
          className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-lg hover:bg-gray-100 shadow-lg"
        >
          Go to Admin Login
        </button>
      </div>
    </div>
  )
}
