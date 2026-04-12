import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-main flex flex-col justify-between">
      {/* Header */}
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold">Student Reports</h1>
      </div>

      {/* Hero Section - Warm trust image concept */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-white text-center">
        <div className="mb-8">
          <div className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-6">
            <div className="text-6xl">👨‍👩‍👧</div>
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4 leading-tight">Know Your Child's Progress</h2>
        <p className="text-lg opacity-90 mb-8 max-w-md leading-relaxed">
          View attendance, fees, and performance in one clear place. Instant clarity, complete peace of mind.
        </p>
      </div>

      {/* CTA Buttons - Primary + Secondary */}
      <div className="pb-8 px-6 space-y-3">
        <button
          onClick={() => navigate('/auth')}
          className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-sm"
        >
          Login <ArrowRight size={20} />
        </button>
        <button
          onClick={() => navigate('/access')}
          className="w-full bg-white bg-opacity-20 text-white font-bold py-3 rounded-xl hover:bg-opacity-30 transition border border-white border-opacity-30"
        >
          Access Shared Report
        </button>
      </div>
    </div>
  )
}
