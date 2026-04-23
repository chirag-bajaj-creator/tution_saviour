import { useNavigate, useLocation } from 'react-router-dom'
import { BarChart3, Users, FileText, Settings as SettingsIcon } from 'lucide-react'

export const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/teachers', label: 'Teachers', icon: Users },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ]

  return (
    <aside className="app-sidebar w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-indigo-700">
        <div className="flex items-center gap-2">
          <BarChart3 size={32} className="text-indigo-300" />
          <div>
            <h1 className="text-xl font-bold">TutorHub</h1>
            <p className="text-xs text-indigo-300">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-700">
        <p className="text-xs text-indigo-300">v1.0.0</p>
      </div>
    </aside>
  )
}
