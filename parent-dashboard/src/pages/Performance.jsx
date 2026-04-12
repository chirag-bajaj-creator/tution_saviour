import { useState, useEffect } from 'react'
import BottomNav from '../components/BottomNav'
import { parentAPI } from '../services/api'
import { BarChart3 } from 'lucide-react'

export default function Performance() {
  const [performance, setPerformance] = useState([])
  const [average, setAverage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const { data } = await parentAPI.getPerformance()
        setPerformance(data.tests)
        setAverage(data.average)
      } catch (err) {
        console.error('Failed to fetch performance')
      } finally {
        setLoading(false)
      }
    }
    fetchPerformance()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-main text-white p-6 rounded-b-card shadow-sm">
        <div className="flex items-center gap-3">
          <BarChart3 size={28} />
          <div>
            <h1 className="text-3xl font-bold">Performance</h1>
            <p className="text-xs opacity-80 mt-1">Test scores and progress</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 mt-4">
        <div className="bg-gradient-soft text-white rounded-xl p-6 text-center shadow-sm">
          <p className="text-xs font-medium opacity-90 uppercase">Average Score</p>
          <p className="text-4xl font-bold mt-2">{average.toFixed(1)}</p>
          <p className="text-xs opacity-80 mt-2">Out of 100</p>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 mb-3">Recent Tests</h3>
          <div className="space-y-2">
            {performance.map((test, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-bold text-slate-900">{test.testName}</p>
                  <p className="text-xs text-slate-400 mt-1">{test.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">{test.marks}/{test.totalMarks}</p>
                  <p className="text-xs text-slate-600">{((test.marks / test.totalMarks) * 100).toFixed(0)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
