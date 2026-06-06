import httpClient from '../api/httpClient'

export const userService = {
  async getAll(page = 0, size = 10) {
    const response = await httpClient.get('/users', {
      params: { page, size },
    })
    return response.data
  },

  async getById(id) {
    const response = await httpClient.get(`/users/${id}`)
    return response.data
  },

  async create(userData) {
    const response = await httpClient.post('/users', userData)
    return response.data
  },

  async delete(id) {
    const response = await httpClient.delete(`/users/${id}`)
    return response.data
  },
}
