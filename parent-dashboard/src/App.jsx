import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ParentAccess from './pages/ParentAccess'
import ParentAuth from './pages/ParentAuth'
import Setup from './pages/Setup'
import Summary from './pages/Summary'
import FeeStatus from './pages/FeeStatus'
import Attendance from './pages/Attendance'
import Performance from './pages/Performance'
import StudentProfile from './pages/StudentProfile'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/access" element={<ParentAccess />} />
        <Route path="/auth" element={<ParentAuth />} />
        <Route path="/setup" element={<ProtectedRoute><Setup /></ProtectedRoute>} />
        <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>} />
        <Route path="/fees" element={<ProtectedRoute><FeeStatus /></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
        <Route path="/performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
