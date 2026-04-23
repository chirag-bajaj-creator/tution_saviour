import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link as LinkIcon } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function ParentAccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const sharedToken = searchParams.get('token')
  const { login } = useAuth()

  const handleAccessReport = () => {
    if (sharedToken) {
      login(sharedToken)
      navigate('/summary')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center px-6">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-md text-center">
        <div className="bg-blue-50 p-4 rounded-full inline-block mb-6">
          <LinkIcon className="text-primary" size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Shared Report Access</h1>
        <p className="text-slate-600 mb-6">Access your child's report via shared link</p>

        {sharedToken ? (
          <>
            <p className="text-slate-600 mb-6">Click below to view the report</p>
            <button
              onClick={handleAccessReport}
              className="w-full bg-gradient-main text-white font-bold py-3 rounded-xl hover:opacity-90 transition mb-4 shadow-sm"
            >
              Open Report
            </button>
          </>
        ) : (
          <>
            <p className="text-slate-600 mb-6">Visit the link shared by your child's teacher to access the report.</p>
            <div className="bg-slate-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-600">Example: yoursite.com/access?token=abc123</p>
            </div>
          </>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-slate-100 text-slate-900 font-bold py-2 rounded-xl hover:bg-slate-200 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
