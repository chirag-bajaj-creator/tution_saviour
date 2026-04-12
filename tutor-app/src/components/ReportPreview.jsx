import { Copy, Share2, Mail, Download, Award, TrendingUp, DollarSign, Calendar } from 'lucide-react'

export const ReportPreview = ({ data }) => {
  if (!data) return (
    <div className="text-center py-12">
      <p className="text-secondaryText text-lg">👈 Select a student to view their report</p>
    </div>
  )

  const attendancePercent = data.attendance?.percentage || 0
  const paidFees = data.fees?.paid || 0
  const totalFees = data.fees?.total || 0
  const pendingFees = data.fees?.pending || 0
  const avgMarks = data.performance?.average || 0

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="space-y-6">
      {/* Certificate Container */}
      <div className="bg-gradient-to-br from-white via-amber-50 to-orange-50 border-4 border-amber-600 rounded-2xl shadow-2xl p-12 print:p-0 print:border-0">
        {/* Header with Decorative Elements */}
        <div className="text-center mb-10 border-b-4 border-amber-300 pb-8 relative">
          <div className="absolute top-0 left-0 right-0 flex justify-around opacity-10 text-5xl">
            <span>🌟</span>
            <span>📚</span>
            <span>🏆</span>
            <span>📚</span>
            <span>🌟</span>
          </div>
          <div className="text-amber-600 text-6xl font-bold mb-3">🎓</div>
          <h1 className="text-4xl font-black text-amber-900 mb-2">TutorHub</h1>
          <p className="text-amber-700 text-xl font-semibold">Student Performance Certificate</p>
        </div>

        {/* Student Info Section */}
        <div className="text-center mb-10 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-8">
          <p className="text-amber-800 text-sm font-semibold mb-3">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
          <h2 className="text-5xl font-black text-amber-900 mb-6 border-b-4 border-amber-400 pb-4">
            {data.student?.name || 'Student Name'}
          </h2>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-amber-700 font-semibold mb-1">Class</p>
              <p className="text-2xl font-bold text-primaryText">{data.student?.class || 'N/A'}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-amber-700 font-semibold mb-1">Batch</p>
              <p className="text-lg font-bold text-primaryText">{data.student?.batchId?.name || 'N/A'}</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <p className="text-amber-700 font-semibold mb-1">Parent</p>
              <p className="text-sm font-bold text-primaryText">{data.student?.parentName || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Main Metrics with Colors */}
        <div className="grid grid-cols-4 gap-4 mb-10">
          {/* Attendance */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-l-4 border-green-500 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-3">
              <Calendar className="text-green-600" size={28} />
              <span className="text-3xl font-black text-green-600">{attendancePercent}%</span>
            </div>
            <p className="text-green-700 font-semibold text-sm">Attendance Rate</p>
            <p className="text-green-600 text-xs mt-2">{data.attendance?.present}/{data.attendance?.total} Classes Present</p>
          </div>

          {/* Performance */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="text-blue-600" size={28} />
              <span className="text-3xl font-black text-blue-600">{avgMarks}%</span>
            </div>
            <p className="text-blue-700 font-semibold text-sm">Avg Performance</p>
            <p className="text-blue-600 text-xs mt-2">
              {avgMarks >= 80 ? '🌟 Excellent' : avgMarks >= 60 ? '✅ Good' : '📈 Improving'}
            </p>
          </div>

          {/* Total Fees */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-3">
              <DollarSign className="text-purple-600" size={28} />
              <span className="text-2xl font-black text-purple-600">₹{totalFees}</span>
            </div>
            <p className="text-purple-700 font-semibold text-sm">Total Fees</p>
            <p className="text-purple-600 text-xs mt-2">For All Months</p>
          </div>

          {/* Pending Fees */}
          <div className="bg-gradient-to-br from-orange-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 shadow">
            <div className="flex items-center justify-between mb-3">
              <Award className="text-red-600" size={28} />
              <span className="text-2xl font-black text-red-600">₹{pendingFees}</span>
            </div>
            <p className="text-red-700 font-semibold text-sm">Pending Fees</p>
            <p className="text-red-600 text-xs mt-2">{paidFees} of {totalFees} Paid</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6 mb-10">
          {/* Attendance Card */}
          <div className="bg-white border-l-4 border-green-500 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Calendar className="text-green-600" size={20} />
              </div>
              Attendance Details
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-700 text-sm font-semibold mb-1">Total Classes</p>
                <p className="text-4xl font-black text-green-600">{data.attendance?.total || 0}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-700 text-sm font-semibold mb-1">Present</p>
                <p className="text-4xl font-black text-green-600">{data.attendance?.present || 0}</p>
              </div>
            </div>
            <div className="mt-4 bg-sectionBg rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all"
                style={{width: `${attendancePercent}%`}}
              ></div>
            </div>
          </div>

          {/* Financial Card */}
          <div className="bg-white border-l-4 border-orange-500 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="text-orange-600" size={20} />
              </div>
              Financial Status
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-blue-700 text-xs font-semibold mb-2">Total Due</p>
                <p className="text-3xl font-black text-blue-600">₹{totalFees}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                <p className="text-green-700 text-xs font-semibold mb-2">Paid ✓</p>
                <p className="text-3xl font-black text-green-600">₹{paidFees}</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                <p className="text-red-700 text-xs font-semibold mb-2">Pending</p>
                <p className="text-3xl font-black text-red-600">₹{pendingFees}</p>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-primaryText">Payment Progress</span>
                <span className="text-sm font-bold text-primaryText">{Math.round((paidFees / totalFees) * 100)}%</span>
              </div>
              <div className="w-full bg-sectionBg rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-full rounded-full transition-all"
                  style={{width: `${Math.round((paidFees / totalFees) * 100)}%`}}
                ></div>
              </div>
            </div>
          </div>

          {/* Performance Card */}
          <div className="bg-white border-l-4 border-blue-500 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              Performance Summary
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-5xl font-black text-blue-600">{avgMarks}%</span>
                <span className="text-lg text-secondaryText">Average Score</span>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-secondaryText mb-2">Performance Level</p>
                  <div className="text-2xl font-bold">
                    {avgMarks >= 80 ? (
                      <span className="text-green-600">🌟 Excellent</span>
                    ) : avgMarks >= 60 ? (
                      <span className="text-blue-600">✅ Good</span>
                    ) : (
                      <span className="text-orange-600">📈 Improving</span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-secondaryText mb-2">Feedback</p>
                  <p className="text-sm font-semibold text-primaryText">
                    {avgMarks >= 80
                      ? 'Congratulations! Keep up the excellent work!'
                      : avgMarks >= 60
                      ? 'Good progress! Continue your efforts.'
                      : 'Focus and dedication will help improve performance.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t-2 border-amber-300 pt-6">
          <p className="text-amber-800 font-semibold mb-2">Generated by TutorHub Management System</p>
          <p className="text-amber-700 text-sm">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p className="text-amber-600 text-xs mt-2">This is an official academic record of the student's performance</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 font-semibold shadow transition"
        >
          <Download size={20} />
          <span>Print / Download as PDF</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 font-semibold transition">
          <Copy size={20} />
          <span>Copy Report</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 font-semibold transition">
          <Share2 size={20} />
          <span>Share Report</span>
        </button>
        <button className="flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 font-semibold transition">
          <Mail size={20} />
          <span>Email Report</span>
        </button>
      </div>
    </div>
  )
}
