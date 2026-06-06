import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import MainLayout from '../layouts/MainLayout'
import Customers from '../pages/Customers'
import Dashboard from '../pages/Dashboard'
import Leads from '../pages/Leads'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Users from '../pages/Users'
import { ROLES } from '../utils/constants'

const authenticatedRoles = [ROLES.admin, ROLES.manager, ROLES.salesExecutive]

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute allowedRoles={authenticatedRoles} />}>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<ProtectedRoute allowedRoles={[ROLES.admin]} />}>
          <Route path="/users" element={<Users />} />
        </Route>

        <Route path="/customers" element={<Customers />} />
        <Route path="/leads" element={<Leads />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  </Routes>
)

export default AppRoutes
