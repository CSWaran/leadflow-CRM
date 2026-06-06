import httpClient from '../api/httpClient'

export const leadService = {
  async getAll(page = 0, size = 10) {
    const response = await httpClient.get('/leads', {
      params: { page, size },
    })
    return response.data
  },

  async getById(id) {
    const response = await httpClient.get(`/leads/${id}`)
    return response.data
  },

  async create(leadData) {
    const response = await httpClient.post('/leads', leadData)
    return response.data
  },

  async update(id, leadData) {
    const response = await httpClient.put(`/leads/${id}`, leadData)
    return response.data
  },

  async delete(id) {
    const response = await httpClient.delete(`/leads/${id}`)
    return response.data
  },

  async searchByName(name, page = 0, size = 10) {
    const response = await httpClient.get('/leads/search/name', {
      params: { name, page, size },
    })
    return response.data
  },

  async searchByEmail(email, page = 0, size = 10) {
    const response = await httpClient.get('/leads/search/email', {
      params: { email, page, size },
    })
    return response.data
  },

  async searchByCompany(company, page = 0, size = 10) {
    const response = await httpClient.get('/leads/search/company', {
      params: { company, page, size },
    })
    return response.data
  },

  async assignToUser(leadId, userId) {
    const response = await httpClient.put(`/leads/${leadId}/assign/${userId}`)
    return response.data
  },
}
