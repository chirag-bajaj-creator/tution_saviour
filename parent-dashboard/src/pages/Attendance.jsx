import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import { parentAPI } from '../services/api'
import { Calendar } from 'lucide-react'

export default function Attendance() {
  const [attendance, setAttendance] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await parentAPI.getAttendance()
        setAttendance(data)
      } catch (err) {
        console.error('Failed to fetch attendance')
      } finally {
        setLoading(false)
      }
    }
    fetchAttendance()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-main text-white p-6 rounded-b-card shadow-sm">
        <div className="flex items-center gap-3">
          <Calendar size={28} />
          <div>
            <h1 className="text-3xl font-bold">Attendance</h1>
            <p className="text-xs opacity-80 mt-1">Monthly breakdown</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-100 rounded-xl p-4">
            <p className="text-xs font-medium text-emerald-600 uppercase">Present Days</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{attendance?.presentDays}</p>
          </div>
          <div className="bg-red-100 rounded-xl p-4">
            <p className="text-xs font-medium text-red-600 uppercase">Absent Days</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{attendance?.absentDays}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase mb-3">Attendance Percentage</p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div className="bg-gradient-soft h-3 rounded-full transition-all" style={{width: `${attendance?.percentage}%`}}></div>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900 min-w-fit">{attendance?.percentage}%</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm font-bold text-slate-900 mb-3">Monthly Attendance</p>
          <div className="space-y-2">
            {attendance?.monthlyBreakdown?.map((month, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-600">{month.month}</span>
                <span className="font-bold text-slate-900">{month.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
