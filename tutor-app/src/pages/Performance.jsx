import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import tutorApi from '../services/api'
import socket from '../services/socket'
import { Plus } from 'lucide-react'

export const Performance = () => {
  const [performance, setPerformance] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    studentId: '',
    testName: '',
    marks: '',
    totalMarks: '',
    date: new Date().toISOString().split('T')[0],
  })

  const fetchData = async () => {
    try {
      const [perfRes, studentsRes] = await Promise.all([
        tutorApi.getPerformance({}),
        tutorApi.getStudents(),
      ])
      setPerformance(perfRes.data)
      setStudents(studentsRes.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Listen for real-time performance updates
  useEffect(() => {
    const handlePerformanceUpdate = () => {
      console.log('🔄 Refreshing performance data...')
      fetchData()
    }

    socket.on('performance:updated', handlePerformanceUpdate)

    return () => {
      socket.off('performance:updated', handlePerformanceUpdate)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await tutorApi.addPerformance({
        ...formData,
        marks: parseInt(formData.marks),
        totalMarks: parseInt(formData.totalMarks),
      })
      setPerformance([...performance, res.data])
      setFormData({ studentId: '', testName: '', marks: '', totalMarks: '', date: new Date().toISOString().split('T')[0] })
      setShowForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primaryText">Performance</h1>
              <p className="text-secondaryText">Track student test marks and performance</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              <Plus size={20} />
              <span>Add Test Record</span>
            </button>
          </div>

          {showForm && (
            <div className="bg-cardBg rounded-lg shadow-sm p-6 mb-6">
              <form onSubmit={handleSubmit} className="grid md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Student</label>
                  <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Test Name</label>
                  <input
                    type="text"
                    name="testName"
                    value={formData.testName}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Marks</label>
                  <input
                    type="number"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Total</label>
                  <input
                    type="number"
                    name="totalMarks"
                    value={formData.totalMarks}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">Loading...</div>
          ) : (
            <div className="bg-cardBg rounded-lg shadow-sm overflow-hidden">
              {performance.length === 0 ? (
                <div className="p-6 text-center text-secondaryText">No performance records yet</div>
              ) : (
                <table className="w-full">
                  <thead className="border-b border-sectionBg bg-sectionBg">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Test</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Marks</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performance.map((p) => (
                      <tr key={p._id} className="border-b border-sectionBg hover:bg-sectionBg">
                        <td className="px-6 py-4 font-medium text-primaryText">
                          {p.studentId?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 text-secondaryText">{p.testName}</td>
                        <td className="px-6 py-4 text-primaryText font-medium">
                          {p.marks}/{p.totalMarks}
                        </td>
                        <td className="px-6 py-4 text-primaryText font-medium">
                          {Math.round((p.marks / p.totalMarks) * 100)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}