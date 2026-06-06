import httpClient from '../api/httpClient'

export const customerService = {
  async getAll(page = 0, size = 10) {
    const response = await httpClient.get('/customers', {
      params: { page, size },
    })
    return response.data
  },

  async getById(id) {
    const response = await httpClient.get(`/customers/${id}`)
    return response.data
  },

  async create(customerData) {
    const response = await httpClient.post('/customers', customerData)
    return response.data
  },

  async update(id, customerData) {
    const response = await httpClient.put(`/customers/${id}`, customerData)
    return response.data
  },

  async delete(id) {
    const response = await httpClient.delete(`/customers/${id}`)
    return response.data
  },
}
