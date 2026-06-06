import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { authService } from '../services/authService'
import {
  clearAuthSession,
  getStoredToken,
  getStoredUser,
  storeAuthSession,
} from '../utils/storage'
import { AuthContext } from './authContext'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken())
  const [currentUser, setCurrentUser] = useState(() => getStoredUser())

  const logout = useCallback(() => {
    clearAuthSession()
    setToken(null)
    setCurrentUser(null)
  }, [])

  const login = useCallback(async ({ email, password }) => {
    const result = await authService.login({ email, password })
    const accessToken = result?.data?.accessToken
    const user = result?.data?.user

    if (!result?.success || !accessToken || !user) {
      throw new Error('Login failed. The server returned an invalid response.')
    }

    storeAuthSession({ token: accessToken, user })
    setToken(accessToken)
    setCurrentUser(user)

    return user
  }, [])

  useEffect(() => {
    window.addEventListener('auth:unauthorized', logout)
    return () => window.removeEventListener('auth:unauthorized', logout)
  }, [logout])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(token),
      login,
      logout,
      token,
    }),
    [currentUser, login, logout, token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
