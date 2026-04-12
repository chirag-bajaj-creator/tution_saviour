import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Users, BookOpen, FileText, Activity } from 'lucide-react'
import adminApi from '../services/api'

export const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminApi.getDashboardStats()
        setStats(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primaryText">Admin Dashboard</h1>
            <p className="text-secondaryText mt-2">Platform overview and management</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Top Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                {/* Total Teachers */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondaryText text-sm mb-1">Total Teachers</p>
                      <p className="text-4xl font-bold text-primaryText">{stats?.totalTeachers || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Total Students */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondaryText text-sm mb-1">Total Students</p>
                      <p className="text-4xl font-bold text-primaryText">{stats?.totalStudents || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <BookOpen className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Reports Generated */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondaryText text-sm mb-1">Reports Generated</p>
                      <p className="text-4xl font-bold text-primaryText">{stats?.reportsGenerated || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                      <FileText className="text-white" size={24} />
                    </div>
                  </div>
                </div>

                {/* Platform Activity */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-secondaryText text-sm mb-1">Active Today</p>
                      <p className="text-4xl font-bold text-primaryText">{stats?.platformActivity || 0}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                      <Activity className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overview Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Teacher Summary */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-primaryText mb-6">Teacher Status Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-sectionBg">
                      <span className="text-secondaryText">Active Teachers</span>
                      <span className="font-bold text-green-600">{Math.round((stats?.totalTeachers || 0) * 0.9)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-sectionBg">
                      <span className="text-secondaryText">Inactive Teachers</span>
                      <span className="font-bold text-orange-600">{Math.round((stats?.totalTeachers || 0) * 0.1)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-secondaryText">New This Month</span>
                      <span className="font-bold text-blue-600">3</span>
                    </div>
                  </div>
                </div>

                {/* Student Distribution */}
                <div className="bg-cardBg rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold text-primaryText mb-6">Student Distribution</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-secondaryText">Avg per Teacher</span>
                        <span className="font-bold text-primaryText">
                          {stats?.totalTeachers ? Math.round((stats.totalStudents || 0) / stats.totalTeachers) : 0}
                        </span>
                      </div>
                      <div className="w-full bg-sectionBg rounded-full h-2">
                        <div className="bg-blue-500 h-full rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm pt-4">
                      <span className="text-secondaryText">Min: 20 | Max: 80</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-cardBg rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-primaryText mb-6">Recent Platform Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">New Teacher Registered</p>
                        <p className="text-sm text-secondaryText">Mr. Vikram Singh joined the platform</p>
                      </div>
                    </div>
                    <span className="text-sm text-secondaryText">Today 10:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">150 Students Added</p>
                        <p className="text-sm text-secondaryText">Across 3 active teachers</p>
                      </div>
                    </div>
                    <span className="text-sm text-secondaryText">Today 9:15 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <div>
                        <p className="font-semibold text-primaryText">Reports Generated</p>
                        <p className="text-sm text-secondaryText">45 parent reports shared</p>
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
