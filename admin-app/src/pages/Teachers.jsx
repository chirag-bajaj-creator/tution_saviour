import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import adminApi from '../services/api'

export const Teachers = () => {
  const [teachers, setTeachers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const res = await adminApi.getTeachers()
      setTeachers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (teacherId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'active' ? 'disabled' : 'active'
      await adminApi.updateTeacher(teacherId, { status: newStatus })
      setTeachers(teachers.map(t => t._id === teacherId ? {...t, status: newStatus} : t))
    } catch (err) {
      console.error(err)
      alert('Error updating teacher status')
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primaryText">Teachers Management</h1>
            <p className="text-secondaryText mt-2">View and manage all registered tutors</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-secondaryText" size={20} />
              <input
                type="text"
                placeholder="Search teacher by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-sectionBg rounded-lg focus:outline-none focus:border-primary bg-cardBg text-primaryText"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">Loading...</div>
          ) : (
            <div className="bg-cardBg rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-sectionBg bg-sectionBg">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Students</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Join Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher._id} className="border-b border-sectionBg hover:bg-sectionBg">
                      <td className="px-6 py-4 font-medium text-primaryText">{teacher.name}</td>
                      <td className="px-6 py-4 text-secondaryText">{teacher.phone}</td>
                      <td className="px-6 py-4 text-secondaryText">{teacher.studentCount || 50}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 w-fit ${
                          teacher.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {teacher.status === 'active' ? (
                            <CheckCircle size={16} />
                          ) : (
                            <XCircle size={16} />
                          )}
                          {teacher.status === 'active' ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-secondaryText">
                        {new Date(teacher.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleStatusToggle(teacher._id, teacher.status)}
                          className={`px-4 py-2 rounded font-semibold text-sm ${
                            teacher.status === 'active'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {teacher.status === 'active' ? 'Disable' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredTeachers.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-secondaryText">No teachers found</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
