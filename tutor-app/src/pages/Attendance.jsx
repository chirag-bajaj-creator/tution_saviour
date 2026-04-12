import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { AttendanceRow } from '../components/AttendanceRow'
import tutorApi from '../services/api'
import socket from '../services/socket'

export const Attendance = () => {
  const [students, setStudents] = useState([])
  const [batches, setBatches] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedBatch, setSelectedBatch] = useState('')
  const [attendance, setAttendance] = useState({})
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const [studentsRes, batchesRes] = await Promise.all([
        tutorApi.getStudents(),
        tutorApi.getBatches(),
      ])
      setStudents(studentsRes.data)
      setBatches(batchesRes.data)

      if (batchesRes.data.length > 0) {
        setSelectedBatch(batchesRes.data[0]._id)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Listen for real-time attendance updates
  useEffect(() => {
    const handleAttendanceUpdate = () => {
      console.log('🔄 Refreshing attendance data...')
      fetchData()
    }

    socket.on('attendance:updated', handleAttendanceUpdate)

    return () => {
      socket.off('attendance:updated', handleAttendanceUpdate)
    }
  }, [])

  const filteredStudents = selectedBatch
    ? students.filter(s => {
        const batchId = typeof s.batchId === 'object' ? s.batchId._id : s.batchId;
        return batchId.toString() === selectedBatch;
      })
    : students

  const handleMarkAttendance = (studentId, isAbsent) => {
    if (isAbsent) {
      setAttendance({
        ...attendance,
        [studentId]: 'absent',
      })
    } else {
      const newAttendance = { ...attendance }
      delete newAttendance[studentId]
      setAttendance(newAttendance)
    }
  }

  const handleSave = async () => {
    try {
      // Mark absent students
      for (const [studentId, status] of Object.entries(attendance)) {
        await tutorApi.markAttendance({
          studentId,
          date: selectedDate,
          status: 'absent',
        })
      }

      // Mark present students (those not in attendance object)
      for (const student of filteredStudents) {
        if (!attendance[student._id]) {
          await tutorApi.markAttendance({
            studentId: student._id,
            date: selectedDate,
            status: 'present',
          })
        }
      }

      setAttendance({})
      alert('Attendance saved successfully')
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primaryText">Attendance</h1>
            <p className="text-secondaryText">Mark attendance for your students</p>
          </div>

          <div className="bg-cardBg rounded-lg shadow-sm p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primaryText mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primaryText mb-2">Batch</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full border border-sectionBg rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                >
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">Loading...</div>
          ) : (
            <>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-sm font-medium text-primaryText">
                  Absent: {Object.keys(attendance).length} / {filteredStudents.length}
                </span>
                <span className="text-xs text-secondaryText">(All are present by default, click to mark absent)</span>
              </div>

              <div className="bg-cardBg rounded-lg shadow-sm">
                {filteredStudents.length === 0 ? (
                  <div className="p-6 text-center text-secondaryText">No students in this batch</div>
                ) : (
                  filteredStudents.map((student) => (
                    <div key={student._id} className="flex items-center justify-between px-6 py-4 border-b border-sectionBg hover:bg-sectionBg">
                      <div className="flex-1">
                        <p className="font-medium text-primaryText">{student.name}</p>
                        <p className="text-sm text-secondaryText">{student.class}</p>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <span className={attendance[student._id] ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>
                          {attendance[student._id] ? 'Absent' : 'Present'}
                        </span>
                        <input
                          type="checkbox"
                          checked={!!attendance[student._id]}
                          onChange={(e) => handleMarkAttendance(student._id, e.target.checked)}
                          className="w-5 h-5 cursor-pointer"
                        />
                      </label>
                    </div>
                  ))
                )}
              </div>
              <button
                onClick={handleSave}
                className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
              >
                Save Attendance
              </button>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
