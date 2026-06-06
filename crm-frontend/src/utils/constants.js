const _apiUrl = import.meta.env.VITE_API_URL
if (!_apiUrl) {
  console.error('[config] VITE_API_URL is not set — falling back to localhost. Login will fail in production.')
}
export const API_BASE_URL = _apiUrl ?? 'http://localhost:8080/api/v1'
console.log('[config] VITE_API_URL =', import.meta.env.VITE_API_URL)
console.log('[config] API_BASE_URL =', API_BASE_URL)

export const STORAGE_KEYS = {
  token: 'crm_access_token',
  user: 'crm_current_user',
}

export const ROLES = {
  admin: 'ADMIN',
  manager: 'MANAGER',
  salesExecutive: 'SALES_EXECUTIVE',
}

export const NAVIGATION_BY_ROLE = {
  [ROLES.admin]: ['dashboard', 'users', 'customers', 'leads'],
  [ROLES.manager]: ['dashboard', 'customers', 'leads'],
  [ROLES.salesExecutive]: ['dashboard', 'customers', 'leads'],
}
