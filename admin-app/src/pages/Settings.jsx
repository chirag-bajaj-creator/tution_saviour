import { useState } from 'react'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { Save, Shield, Bell, Eye } from 'lucide-react'

export const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactor: false,
    emailAlerts: true,
    darkMode: false,
  })

  const [saved, setSaved] = useState(false)

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    setSaved(false)
  }

  const handleSave = () => {
    // In a real app, this would send to backend
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="flex h-screen bg-pageBg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primaryText">Settings</h1>
            <p className="text-secondaryText mt-2">Manage your admin preferences</p>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-medium">✓ Settings saved successfully</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Security Settings */}
            <div className="bg-cardBg rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield size={24} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-primaryText">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                  <div>
                    <p className="font-medium text-primaryText">Two-Factor Authentication</p>
                    <p className="text-sm text-secondaryText">Add an extra layer of security</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.twoFactor}
                    onChange={() => handleToggle('twoFactor')}
                    className="w-5 h-5 rounded border-sectionBg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primaryText">Change Password</p>
                    <p className="text-sm text-secondaryText">Update your admin password</p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-cardBg rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell size={24} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-primaryText">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-sectionBg">
                  <div>
                    <p className="font-medium text-primaryText">Push Notifications</p>
                    <p className="text-sm text-secondaryText">Platform alerts and updates</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                    className="w-5 h-5 rounded border-sectionBg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primaryText">Email Alerts</p>
                    <p className="text-sm text-secondaryText">Critical system notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={() => handleToggle('emailAlerts')}
                    className="w-5 h-5 rounded border-sectionBg"
                  />
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-cardBg rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Eye size={24} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-primaryText">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primaryText">Dark Mode</p>
                    <p className="text-sm text-secondaryText">Coming soon</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                    disabled
                    className="w-5 h-5 rounded border-sectionBg disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-cardBg rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold text-primaryText mb-6">Account</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-sectionBg">
                  <p className="text-sm text-secondaryText mb-2">Email</p>
                  <p className="font-medium text-primaryText">admin@tutorapp.com</p>
                </div>
                <div className="pb-4 border-b border-sectionBg">
                  <p className="text-sm text-secondaryText mb-2">Role</p>
                  <p className="font-medium text-primaryText">Administrator</p>
                </div>
                <div>
                  <p className="text-sm text-secondaryText mb-2">Account Created</p>
                  <p className="font-medium text-primaryText">March 15, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition"
            >
              <Save size={20} />
              Save Settings
            </button>
            <button className="px-6 py-3 bg-sectionBg text-primaryText rounded-lg hover:bg-opacity-80 font-semibold transition">
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
