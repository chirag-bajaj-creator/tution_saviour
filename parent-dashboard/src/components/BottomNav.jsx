import { useLocation, Link } from 'react-router-dom'
import { Home, FileText, DollarSign, Calendar, BarChart3, User } from 'lucide-react'

export default function BottomNav() {
  const location = useLocation()
  
  const navItems = [
    { path: '/summary', icon: Home, label: 'Home' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/fees', icon: DollarSign, label: 'Fees' },
    { path: '/attendance', icon: Calendar, label: 'Attendance' },
    { path: '/performance', icon: BarChart3, label: 'Performance' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#FFFFFF] border-t border-[#E2E8F0] px-4 py-2 shadow-soft">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-3 rounded-card transition-colors ${
              location.pathname === item.path
                ? 'text-[#4F46E5] bg-[#EFF6FF]'
                : 'text-[#94A3B8] hover:text-[#4F46E5]'
            }`}
          >
            <item.icon size={24} />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
