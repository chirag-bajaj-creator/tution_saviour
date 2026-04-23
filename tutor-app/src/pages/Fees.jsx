import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { StatusBadge } from '../components/StatusBadge'
import tutorApi from '../services/api'
import { Plus } from 'lucide-react'

export const Fees = () => {
  const [fees, setFees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedFeeId, setSelectedFeeId] = useState(null)
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    studentId: '',
    month: '',
    year: new Date().getFullYear(),
    amount: '',
    paymentMode: 'Pending',
  })
  const [students, setStudents] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feesRes, studentsRes] = await Promise.all([
          tutorApi.getFees(),
          tutorApi.getStudents(),
        ])

        // Create student map for quick lookup
        const studentMap = {};
        studentsRes.data.forEach(student => {
          studentMap[student._id] = student;
        });

        // Enhance fees with student data
        const enhancedFees = feesRes.data.map(fee => {
          if (fee.studentId && typeof fee.studentId === 'object' && fee.studentId.name) {
            return fee;
          }

          const studentIdStr =
            fee.studentId && typeof fee.studentId === 'object'
              ? fee.studentId._id?.toString?.() || ''
              : fee.studentId?.toString?.() || String(fee.studentId);

          const student = studentMap[studentIdStr];

          return {
            ...fee,
            studentId: student || { _id: studentIdStr, name: 'Unknown' }
          };
        });
        setFees(enhancedFees)
        setStudents(studentsRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleMarkPaid = (id) => {
    setSelectedFeeId(id)
    setSelectedPaymentMode('')
    setIsPaymentModalOpen(true)
  }

  const handleConfirmPayment = async () => {
    if (!selectedPaymentMode) {
      alert('Please select a payment mode')
      return
    }
    try {
      const res = await tutorApi.updateFee(selectedFeeId, { isPaid: true, paymentMode: selectedPaymentMode })
      setFees(fees.map(f => f._id === selectedFeeId ? res.data : f))
      setIsPaymentModalOpen(false)
      setSelectedFeeId(null)
      setSelectedPaymentMode('')
    } catch (err) {
      console.error(err)
      alert('Error marking fee as paid')
    }
  }

  const handleAddFee = async (e) => {
    e.preventDefault()
    try {
      const res = await tutorApi.addFee(formData)
      setFees([...fees, res.data])
      setIsDrawerOpen(false)
      setFormData({ studentId: '', month: '', year: new Date().getFullYear(), amount: '', paymentMode: 'Pending' })
    } catch (err) {
      console.error(err)
      alert('Error adding fee')
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getStatusKey = (isPaid) => isPaid ? 'paid' : 'unpaid'

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primaryText">Fees</h1>
              <p className="text-secondaryText">Manage student fees and payments</p>
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
            >
              <Plus size={20} />
              <span>Add Fee</span>
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍 Search student by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-sectionBg rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-cardBg text-primaryText placeholder-secondaryText"
            />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">Loading...</div>
          ) : (
            <div className="bg-cardBg rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-sectionBg bg-sectionBg">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Student</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Month/Year</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Payment Mode</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primaryText">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fees
                    .filter((fee) =>
                      fee.studentId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((fee) => (
                    <tr key={fee._id} className="border-b border-sectionBg hover:bg-sectionBg">
                      <td className="px-6 py-4 font-medium text-primaryText">
                        {fee.studentId?.name ? fee.studentId.name : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-secondaryText">
                        {fee.month}/{fee.year}
                      </td>
                      <td className="px-6 py-4 font-medium text-primaryText">₹{fee.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 rounded-full bg-sectionBg text-primaryText">
                          {fee.paymentMode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={getStatusKey(fee.isPaid)} />
                      </td>
                      <td className="px-6 py-4">
                        {!fee.isPaid && (
                          <button
                            onClick={() => handleMarkPaid(fee._id)}
                            className="text-primary hover:text-secondary font-semibold"
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-cardBg w-full md:w-96 p-6 rounded-t-lg shadow-lg">
            <h2 className="text-xl font-bold text-primaryText mb-6">Add Fee</h2>
            <form onSubmit={handleAddFee} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primaryText mb-1">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-cardBg text-primaryText"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Month</label>
                  <input
                    type="number"
                    name="month"
                    min="1"
                    max="12"
                    value={formData.month}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-cardBg text-primaryText"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primaryText mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-cardBg text-primaryText"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primaryText mb-1">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-cardBg text-primaryText"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primaryText mb-1">Payment Mode</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="w-full border border-sectionBg rounded-lg px-3 py-2 focus:outline-none focus:border-primary bg-cardBg text-primaryText"
                >
                  <option value="Pending">Pending</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90"
                >
                  Add Fee
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 border border-sectionBg text-primaryText py-2 rounded-lg font-semibold hover:bg-sectionBg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-cardBg rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-primaryText mb-6">Select Payment Mode</h2>
            <p className="text-secondaryText mb-6">How was the payment received?</p>

            <div className="space-y-3 mb-6">
              {['Cash', 'Cheque', 'Online'].map((mode) => (
                <label
                  key={mode}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{
                    borderColor: selectedPaymentMode === mode ? '#3b82f6' : '#e5e7eb',
                    backgroundColor: selectedPaymentMode === mode ? '#f0f9ff' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMode"
                    value={mode}
                    checked={selectedPaymentMode === mode}
                    onChange={(e) => setSelectedPaymentMode(e.target.value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="ml-3 font-medium text-primaryText">{mode}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Confirm Payment
              </button>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="flex-1 border border-sectionBg text-primaryText py-2 rounded-lg font-semibold hover:bg-sectionBg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
