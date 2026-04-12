import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import adminApi from '../services/api'
import { Lock, Mail } from 'lucide-react'

export const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await adminApi.login(email, password)

      // Check if user is admin
      if (res.data.user.role !== 'admin') {
        setError('Access denied. Admin credentials required.')
        setLoading(false)
        return
      }

      login(res.data.token, res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
            <Lock className="text-indigo-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-primaryText mb-2">Admin Login</h1>
          <p className="text-secondaryText">Secure access to admin dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-primaryText mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-secondaryText" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tutorapp.com"
                className="w-full pl-10 pr-4 py-3 border border-sectionBg rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-primaryText mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-secondaryText" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-sectionBg rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">❌ {error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Admin Login'}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-600">Email: admin@tutorapp.com</p>
          <p className="text-xs text-blue-600">Password: admin123</p>
        </div>
      </div>
    </div>
  )
}
