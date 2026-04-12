import { useState, useEffect } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { BarChart3, Filter } from 'lucide-react'

export const Reports = () => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primaryText">Reports & Activity</h1>
            <p className="text-secondaryText mt-2">Platform metrics and system logs</p>
          </div>

          {/* Filter Options */}
          <div className="mb-6 flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-cardBg border border-sectionBg rounded-lg">
              <Filter size={20} className="text-secondaryText" />
              <input type="date" className="bg-transparent text-primaryText" />
            </div>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 font-semibold">
              Generate Report
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <p className="text-secondaryText text-sm mb-2">Total Reports Generated</p>
              <p className="text-4xl font-bold text-primaryText">245</p>
              <p className="text-xs text-secondaryText mt-2">↑ 12% from last month</p>
            </div>
            <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <p className="text-secondaryText text-sm mb-2">Active Sessions</p>
              <p className="text-4xl font-bold text-primaryText">8</p>
              <p className="text-xs text-secondaryText mt-2">Teachers online now</p>
            </div>
            <div className="bg-cardBg rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
              <p className="text-secondaryText text-sm mb-2">Avg Response Time</p>
              <p className="text-4xl font-bold text-primaryText">245ms</p>
              <p className="text-xs text-secondaryText mt-2">Excellent performance</p>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-cardBg rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-primaryText mb-6 flex items-center gap-2">
              <BarChart3 size={24} />
              Recent System Activity
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-semibold text-primaryText">Dashboard Access</p>
                    <p className="text-sm text-secondaryText">5 teachers accessed dashboard</p>
                  </div>
                </div>
                <span className="text-sm text-secondaryText">Today 10:30 AM</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-semibold text-primaryText">Data Backup</p>
                    <p className="text-sm text-secondaryText">Automated backup completed successfully</p>
                  </div>
                </div>
                <span className="text-sm text-secondaryText">Today 2:00 AM</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <div>
                    <p className="font-semibold text-primaryText">System Update</p>
                    <p className="text-sm text-secondaryText">Platform updated to v2.1.0</p>
                  </div>
                </div>
                <span className="text-sm text-secondaryText">Yesterday 11:45 PM</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div>
                    <p className="font-semibold text-primaryText">Report Generation</p>
                    <p className="text-sm text-secondaryText">45 parent reports exported</p>
                  </div>
                </div>
                <span className="text-sm text-secondaryText">Yesterday 4:20 PM</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div>
                    <p className="font-semibold text-primaryText">Error Logged</p>
                    <p className="text-sm text-secondaryText">Database connection timeout (resolved)</p>
                  </div>
                </div>
                <span className="text-sm text-secondaryText">2 days ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
