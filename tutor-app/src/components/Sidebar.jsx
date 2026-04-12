import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, DollarSign, BarChart3, FileText, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export const Sidebar = () => {
  const location = useLocation()
  const { logout } = useAuth()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/students', label: 'Students', icon: Users },
    { path: '/attendance', label: 'Attendance', icon: Calendar },
    { path: '/fees', label: 'Fees', icon: DollarSign },
    { path: '/performance', label: 'Performance', icon: BarChart3 },
    { path: '/parent-report', label: 'Parent Report', icon: FileText },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-white border-r border-sectionBg h-screen flex flex-col">
      <div className="p-6 border-b border-sectionBg">
        <h1 className="text-xl font-bold text-primary">TutorHub</h1>
      </div>

      <nav className="flex-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-secondaryText hover:bg-sectionBg'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sectionBg">
        <button
          onClick={() => {
            logout()
            window.location.href = '/'
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 text-danger hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}
