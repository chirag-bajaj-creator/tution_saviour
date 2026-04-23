import { useAuth } from '../hooks/useAuth'
import { User } from 'lucide-react'

export const Navbar = () => {
  const { user, openLogoutModal } = useAuth()

  return (
    <div className="bg-white border-b border-sectionBg px-8 py-4 flex items-center justify-between">
      <div />
      <button
        type="button"
        onClick={(event) => openLogoutModal(event.currentTarget)}
        className="flex items-center space-x-3 rounded-xl px-3 py-2 transition hover:bg-sectionBg"
      >
        <div className="w-10 h-10 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
          <User size={20} className="text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-primaryText">{user?.email}</p>
          <p className="text-xs text-secondaryText">Tutor</p>
        </div>
      </button>
    </div>
  )
}
