export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('parentToken')
  
  if (!token) {
    window.location.href = '/auth'
    return null
  }

  return children
}
