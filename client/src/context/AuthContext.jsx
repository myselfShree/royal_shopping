import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // attempt to refresh session via backend (refresh token cookie)
    const init = async () => {
      try {
        const res = await api.post('/auth/refresh')
        if (res?.data?.user && res?.data?.accessToken) {
          localStorage.setItem('royal_token', res.data.accessToken)
          localStorage.setItem('royal_user', JSON.stringify(res.data.user))
          setUser(res.data.user)
        }
      } catch (err) {
        // no session
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const login = async (credentials) => {
    const res = await api.post('/auth/login', credentials)
    if (res?.data?.accessToken && res?.data?.user) {
      localStorage.setItem('royal_token', res.data.accessToken)
      localStorage.setItem('royal_user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      return { token: res.data.accessToken, user: res.data.user }
    }
    throw new Error('Invalid login response')
  }

  const register = async (payload) => {
    const res = await api.post('/auth/register', payload)
    if (res?.data?.accessToken && res?.data?.user) {
      localStorage.setItem('royal_token', res.data.accessToken)
      localStorage.setItem('royal_user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      return { token: res.data.accessToken, user: res.data.user }
    }
    throw new Error('Invalid register response')
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      // ignore
    }
    localStorage.removeItem('royal_token')
    localStorage.removeItem('royal_user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
