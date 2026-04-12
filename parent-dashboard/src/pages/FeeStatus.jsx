import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import { parentAPI } from '../services/api'
import { DollarSign } from 'lucide-react'

export default function FeeStatus() {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const { data } = await parentAPI.getFeeStatus()
        setFees(data.fees)
      } catch (err) {
        console.error('Failed to fetch fees')
      } finally {
        setLoading(false)
      }
    }
    fetchFees()
  }, [])

  const getStatusBadge = (status) => {
    const badges = {
      paid: 'bg-green-100 text-green-700',
      unpaid: 'bg-red-100 text-red-700',
      partial: 'bg-orange-100 text-orange-700',
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header - Main Gradient */}
      <div className="bg-gradient-main text-white p-6 rounded-b-card shadow-sm">
        <div className="flex items-center gap-3">
          <DollarSign size={28} />
          <div>
            <h1 className="text-3xl font-bold">Fee Status</h1>
            <p className="text-xs opacity-80 mt-1">Monthly fee breakdown</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 mt-4">
        {fees.map((fee, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-bold text-slate-900">{fee.month} {fee.year}</p>
              <p className="text-sm text-slate-600 mt-1">₹{fee.amount}</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              fee.status === 'paid' ? 'bg-emerald-100 text-emerald-600' :
              fee.status === 'unpaid' ? 'bg-red-100 text-red-600' :
              'bg-amber-100 text-amber-600'
            }`}>
              {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
