import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { ReportPreview } from '../components/ReportPreview'
import tutorApi from '../services/api'

export const ParentReport = () => {
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [reportData, setReportData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await tutorApi.getStudents()
        setStudents(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const handleSelectStudent = async (studentId) => {
    setSelectedStudent(studentId)
    try {
      const res = await tutorApi.getReport(studentId)
      setReportData(res.data)
    } catch (err) {
      console.error(err)
      setReportData(null)
    }
  }

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primaryText">Parent Report</h1>
            <p className="text-secondaryText">Generate and share student reports with parents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="bg-cardBg rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-primaryText mb-4">Select Student</h2>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="space-y-2">
                    {students.map((student) => (
                      <button
                        key={student._id}
                        onClick={() => handleSelectStudent(student._id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                          selectedStudent === student._id
                            ? 'bg-primary text-white'
                            : 'bg-sectionBg text-primaryText hover:bg-gray-300'
                        }`}
                      >
                        {student.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-cardBg rounded-lg shadow-sm p-6">
                <ReportPreview data={reportData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
