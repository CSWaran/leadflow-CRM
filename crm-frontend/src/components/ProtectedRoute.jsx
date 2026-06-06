import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material'
import { useAuth } from '../context/useAuth'

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation()
  const { currentUser, isAuthenticated, token } = useAuth()

  if (token && !currentUser) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '100vh',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (allowedRoles?.length && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
