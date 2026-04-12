import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Search } from 'lucide-react'
import api from '../services/api'

export default function Setup() {
  const [childName, setChildName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [students, setStudents] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [step, setStep] = useState(1) // 1: search, 2: verify, 3: success
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('parentToken')
      const { data } = await api.get('/parent/search-students',
        {
          params: { name: childName },
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setStudents(data)
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.error || 'Student not found')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectStudent = async () => {
    if (!selectedStudent) return

    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('parentToken')

      // Verify phone if provided
      if (parentPhone && selectedStudent.parentContact !== parentPhone) {
        setError('Phone number does not match our records')
        setLoading(false)
        return
      }

      // Link student
      const { data } = await api.post('/parent/setup',
        { studentId: selectedStudent._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.parentAccess) {
        setStep(3)
        setTimeout(() => navigate('/summary'), 2000)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to link student')
    } finally {
      setLoading(false)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold text-slate-900">Setup Complete!</h1>
          <p className="text-slate-600 mt-2">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-blue-50 p-3 rounded-full">
            <Search className="text-primary" size={28} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Link Your Child</h1>
        <p className="text-slate-600 mb-6">
          {step === 1 ? 'Enter your child\'s name to get started' : 'Verify your details'}
        </p>

        {error && (
          <div className="bg-red-100 border border-red-600 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Child's Full Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Arun Kumar"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-main text-white font-bold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {students.length > 0 && (
              <>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">Select your child:</p>
                  {students.map(student => (
                    <button
                      key={student._id}
                      onClick={() => setSelectedStudent(student)}
                      className={`w-full p-3 rounded-xl border-2 text-left transition ${
                        selectedStudent?._id === student._id
                          ? 'border-primary bg-blue-50'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <p className="text-sm text-slate-600">Class: {student.class}</p>
                    </button>
                  ))}
                </div>

                {selectedStudent && (
                  <div className="bg-slate-100 p-4 rounded-xl">
                    <p className="text-xs font-semibold text-slate-700 mb-2">VERIFY DETAILS</p>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-900">
                        <span className="font-semibold">Parent Name:</span> {selectedStudent.parentName}
                      </p>
                      <div>
                        <label className="text-xs font-semibold text-slate-700">
                          Enter Parent Phone to Verify
                        </label>
                        <input
                          type="tel"
                          value={parentPhone}
                          onChange={(e) => setParentPhone(e.target.value)}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
                          placeholder={selectedStudent.parentContact}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          (We'll verify this matches our records)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSelectStudent}
                  disabled={!selectedStudent || loading}
                  className="w-full bg-gradient-main text-white font-bold py-2 rounded-xl hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Linking...' : 'Confirm & Link'}
                </button>

                <button
                  onClick={() => {
                    setStep(1)
                    setStudents([])
                    setSelectedStudent(null)
                    setChildName('')
                    setParentPhone('')
                  }}
                  className="w-full bg-slate-100 text-slate-900 font-bold py-2 rounded-xl hover:bg-slate-200 transition"
                >
                  Back
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}