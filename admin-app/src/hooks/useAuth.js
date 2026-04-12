import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    const adminUser = localStorage.getItem('admin_user')
    if (token && adminUser) {
      setUser(JSON.parse(adminUser))
    }
    setLoading(false)
  }, [])

  const login = (token, adminUser) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(adminUser))
    setUser(adminUser)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setUser(null)
  }

  return { user, loading, login, logout }
}
