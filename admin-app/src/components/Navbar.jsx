import { useAuth } from '../hooks/useAuth'
import { LogOut, Bell, User } from 'lucide-react'

export const Navbar = () => {
  const { user, openLogoutModal } = useAuth()

  return (
    <nav className="bg-white border-b border-sectionBg px-8 py-4 flex items-center justify-between">
      {/* Left Side - Page Title */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-primaryText">Admin Dashboard</h2>
      </div>

      {/* Right Side - User Actions */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 text-secondaryText hover:text-primaryText transition">
          <Bell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-6 border-l border-sectionBg">
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-primaryText">{user?.name || 'Admin'}</p>
            <p className="text-xs text-secondaryText">{user?.email || 'admin@tutorapp.com'}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={(event) => openLogoutModal(event.currentTarget)}
          className="ml-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Logout"
        >
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  )
}
