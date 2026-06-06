import { STORAGE_KEYS } from './constants'

export const getStoredToken = () => localStorage.getItem(STORAGE_KEYS.token)

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(STORAGE_KEYS.user)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    localStorage.removeItem(STORAGE_KEYS.user)
    return null
  }
}

export const storeAuthSession = ({ token, user }) => {
  localStorage.setItem(STORAGE_KEYS.token, token)
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))
}

export const clearAuthSession = () => {
  localStorage.removeItem(STORAGE_KEYS.token)
  localStorage.removeItem(STORAGE_KEYS.user)
}
