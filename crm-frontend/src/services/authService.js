import httpClient from '../api/httpClient'

export const authService = {
  async login(credentials) {
    const response = await httpClient.post('/auth/login', credentials)
    return response.data
  },

  async register(userData) {
    const response = await httpClient.post('/auth/register', userData)
    return response.data
  },
}
