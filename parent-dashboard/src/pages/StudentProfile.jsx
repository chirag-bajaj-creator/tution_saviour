import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import { parentAPI } from '../services/api'
import { User } from 'lucide-react'

export default function StudentProfile() {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await parentAPI.getChild()
        setStudent(data)
      } catch (err) {
        console.error('Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-main text-white p-6 rounded-b-card shadow-sm">
        <div className="flex items-center gap-3">
          <User size={28} />
          <h1 className="text-3xl font-bold">Student Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-4 mt-4">
        <div className="bg-gradient-light rounded-xl p-6 text-center shadow-sm">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{student?.name}</h2>
          <p className="text-sm text-slate-600 mt-1">{student?.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase">Class</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student?.classYear}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase">Batch</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student?.batchName}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase">Roll No</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{student?.rollNumber}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-400 uppercase">Phone</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{student?.phone || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border-t-4 border-[#4F46E5]">
          <p className="text-xs font-medium text-slate-400 uppercase mb-2">Teacher</p>
          <p className="text-lg font-bold text-primary">{student?.teacherName}</p>
          <p className="text-sm text-slate-600 mt-1">{student?.teacherEmail}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
