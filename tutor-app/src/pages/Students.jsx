import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { StudentDrawer } from '../components/StudentDrawer'
import tutorApi from '../services/api'
import { Plus } from 'lucide-react'

export const Students = () => {
  const [students, setStudents] = useState([])
  const [batches, setBatches] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, batchesRes] = await Promise.all([
          tutorApi.getStudents(),
          tutorApi.getBatches(),
        ])
        setStudents(studentsRes.data)
        setBatches(batchesRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleAddStudent = async (formData) => {
    try {
      const res = await tutorApi.addStudent(formData)
      setStudents([...students, res.data])
      setIsDrawerOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primaryText">Students</h1>
              <p className="text-secondaryText">Manage all your students</p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              <Plus size={20} />
              <span>Add Student</span>
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-sectionBg rounded-lg focus:outline-none focus:border-primary bg-cardBg text-primaryText"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">Loading...</div>
          ) : (
            <div className="bg-cardBg rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-sectionBg bg-sectionBg">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Class</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Batch</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Parent</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .filter((student) =>
                      student.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((student) => (
                      <tr key={student._id} className="border-b border-sectionBg hover:bg-sectionBg">
                        <td className="px-6 py-4 font-medium text-primaryText">{student.name}</td>
                        <td className="px-6 py-4 text-secondaryText">{student.class}</td>
                        <td className="px-6 py-4 text-secondaryText">{student.batchId?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-secondaryText">{student.parentName}</td>
                        <td className="px-6 py-4 text-secondaryText">{student.parentContact}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <StudentDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleAddStudent}
        batches={batches}
      />
    </div>
  )
}
