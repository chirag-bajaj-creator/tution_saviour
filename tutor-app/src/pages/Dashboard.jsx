import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { StatCard } from '../components/StatCard'
import { Users, DollarSign, Calendar, BarChart3, TrendingUp, Award } from 'lucide-react'
import tutorApi from '../services/api'

export const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await tutorApi.getDashboardStats()
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-pageBg">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-auto p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-secondaryText">Loading dashboard...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const totalStudents = stats?.totalStudents || 0
  const todayAttendance = Math.min(stats?.todayAttendance || 0, totalStudents)
  const attendancePercent = totalStudents > 0 ? Math.round((todayAttendance / totalStudents) * 100) : 0
  const absentToday = Math.max(totalStudents - todayAttendance, 0)

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primaryText">Dashboard</h1>
            <p className="text-secondaryText mt-2">Welcome back! Here's your system overview</p>
          </div>

          {/* Top Stats */}
          {stats && (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <StatCard
                  title="Total Students"
                  value={stats.totalStudents || 0}
                  icon={Users}
                  color="primary"
                  trend="+12%"
                />
                <StatCard
                  title="Total Batches"
                  value={stats.totalBatches || 0}
                  icon={BarChart3}
                  color="accent"
                />
                <StatCard
                  title="Today's Attendance"
                  value={todayAttendance}
                  icon={Calendar}
                  color="success"
                  trend={`${attendancePercent}%`}
                />
                <StatCard
                  title="Pending Fees"
                  value={`₹${stats.pendingFees || 0}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  icon={DollarSign}
                  color="warning"
                />
                <StatCard
                  title="Avg Performance"
                  value={`${stats.recentPerformance || 0}%`}
                  icon={Award}
                  color="secondary"
                  trend="↑"
                />
              </div>

              {/* Analytics Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Attendance Overview */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
                  <h2 className="text-lg font-bold text-primaryText mb-6 flex items-center gap-2">
                    <Calendar className="text-amber-500" size={24} />
                    Attendance Overview
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-secondaryText">Present Today</span>
                        <span className="font-semibold text-primaryText">{todayAttendance}/{totalStudents}</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                          style={{width: `${attendancePercent}%`}}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-xs text-secondaryText mb-1">Average Attendance</p>
                        <p className="text-2xl font-bold text-green-600">78%</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-xs text-secondaryText mb-1">Absent Today</p>
                        <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fee Status */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                  <h2 className="text-lg font-bold text-primaryText mb-6 flex items-center gap-2">
                    <DollarSign className="text-green-500" size={24} />
                    Fee Collection
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-secondaryText">Collection Rate</span>
                        <span className="font-semibold text-primaryText">65%</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
                          style={{width: '65%'}}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-xs text-secondaryText mb-1">Collected</p>
                        <p className="text-2xl font-bold text-blue-600">₹2.8L</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <p className="text-xs text-secondaryText mb-1">Pending</p>
                        <p className="text-2xl font-bold text-orange-600">₹1.5L</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance & Insights */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Performance Distribution */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                  <h2 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-2">
                    <BarChart3 className="text-blue-500" size={24} />
                    Performance
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Excellent (80-100%)</span>
                        <span className="font-semibold">45</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-green-500 h-full rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Good (60-80%)</span>
                        <span className="font-semibold">65</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '43%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Needs Improvement (&lt;60%)</span>
                        <span className="font-semibold">40</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-orange-500 h-full rounded-full" style={{width: '27%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Insights */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border-l-4 border-indigo-500">
                  <h2 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-2">
                    <TrendingUp className="text-indigo-500" size={24} />
                    Quick Insights
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📈</span>
                      <div>
                        <p className="font-semibold text-primaryText">Attendance Trend</p>
                        <p className="text-secondaryText">Up 12% this week</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">💰</span>
                      <div>
                        <p className="font-semibold text-primaryText">Fee Collection</p>
                        <p className="text-secondaryText">₹1.5L pending</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">⚠️</span>
                      <div>
                        <p className="font-semibold text-primaryText">Action Needed</p>
                        <p className="text-secondaryText">5 students low attendance</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Batch Distribution */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                  <h2 className="text-lg font-bold text-primaryText mb-4 flex items-center gap-2">
                    <Award className="text-purple-500" size={24} />
                    Batch Distribution
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Batch A (Morning)</span>
                        <span className="font-semibold">50</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-purple-500 h-full rounded-full" style={{width: '33%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Batch B (Afternoon)</span>
                        <span className="font-semibold">50</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-pink-500 h-full rounded-full" style={{width: '33%'}}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-secondaryText">Batch C (Evening)</span>
                        <span className="font-semibold">50</span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-yellow-500 h-full rounded-full" style={{width: '33%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-cardBg rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-primaryText mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">Attendance Marked</p>
                        <p className="text-sm text-secondaryText">120 students marked present</p>
                      </div>
                    </div>
                    <span className="text-sm text-secondaryText">Today 10:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">Fee Payment Received</p>
                        <p className="text-sm text-secondaryText">₹50,000 collected from fees</p>
                      </div>
                    </div>
                    <span className="text-sm text-secondaryText">Today 2:15 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">Performance Added</p>
                        <p className="text-sm text-secondaryText">Test results entered for 45 students</p>
                      </div>
                    </div>
                    <span className="text-sm text-secondaryText">Yesterday 4:45 PM</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
