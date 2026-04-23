import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { parentAPI } from '../services/api'
import { subscribeToRealtime } from '../services/socket'
import { RefreshCw, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Summary() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { openLogoutModal } = useAuth()

  useEffect(() => {
    fetchSummary()
  }, [])

  useEffect(() => {
    const refreshSummary = () => {
      fetchSummary({ preserveLoadingState: true })
    }

    return subscribeToRealtime(
      ['attendance:updated', 'performance:updated', 'fees:updated'],
      refreshSummary,
    )
  }, [])

  const fetchSummary = async ({ preserveLoadingState = false } = {}) => {
    try {
      if (!preserveLoadingState) {
        setLoading(true)
      }
      const { data } = await parentAPI.getSummary()
      setData(data)
    } catch (err) {
      if (err.response?.status === 403) {
        navigate('/setup')
        return
      }
      setError('Failed to load summary')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header - Main Gradient */}
      <div className="bg-gradient-main text-white p-6 rounded-b-card shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs opacity-80 font-medium">Student Name</p>
            <h1 className="text-3xl font-bold mt-1">{data?.studentName}</h1>
            <p className="text-sm opacity-80 mt-2">Class {data?.classYear} • {data?.batchName}</p>
            <p className="text-xs opacity-70 mt-1">Last updated: {data?.lastUpdated}</p>
          </div>
          <button
            type="button"
            onClick={(event) => openLogoutModal(event.currentTarget)}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-xl transition"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 mt-4">
        {/* Fee Status Card */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500">
          <p className="text-xs font-medium text-slate-400 uppercase">Fee Status</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data?.feeStatus}</p>
          <p className="text-sm text-slate-600 mt-2">Monthly Fee • Last payment: {data?.lastPaymentDate}</p>
        </div>

        {/* Attendance Card - Soft Gradient */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-400 uppercase">Attendance</p>
          <div className="flex justify-between items-end mt-3">
            <div>
              <p className="text-3xl font-bold text-slate-900">{data?.attendancePercentage}%</p>
              <p className="text-sm text-slate-600 mt-1">Present: {data?.presentDays} days</p>
            </div>
            <div className="w-16 h-16 bg-gradient-soft rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{data?.attendancePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Performance Card - Accent Color */}
        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-teal-500">
          <p className="text-xs font-medium text-slate-400 uppercase">Performance Summary</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{data?.averageMarks}/100</p>
          <p className="text-sm text-slate-600 mt-2">Average across all tests</p>
        </div>

        {/* Teacher Remarks Card */}
        <div className="bg-slate-100 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-400 uppercase mb-2">Teacher Remark</p>
          <p className="text-slate-900 text-sm leading-relaxed">{data?.teacherRemark || 'No remarks yet'}</p>
        </div>

        {/* Refresh Button - Main Gradient CTA */}
        <button
          onClick={fetchSummary}
          className="w-full bg-gradient-main text-white font-semibold py-3 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2 shadow-sm mt-4"
        >
          <RefreshCw size={18} />
          Refresh Report
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
