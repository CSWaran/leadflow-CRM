export const API_BASE_URL = 'http://localhost:8080/api/v1'

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
