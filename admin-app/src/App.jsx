import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Landing } from './pages/Landing'
import { Auth } from './pages/Auth'
import { Dashboard } from './pages/Dashboard'
import { Teachers } from './pages/Teachers'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  const { user } = useAuth()

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
        <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/teachers" element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      </Routes>
    </Router>
  )
}

export default App
