import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useAuth } from '../context/useAuth'

const Login = () => {
  const [email, setEmail] = useState('admin@crm.local')
  const [password, setPassword] = useState('ChangeMe123!')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const redirectTo = location.state?.from?.pathname ?? '/dashboard'

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email, password })
      navigate(redirectTo, { replace: true })
    } catch (caughtError) {
      setError(
        caughtError.response?.data?.message ??
          caughtError.message ??
          'Unable to sign in. Check your credentials and try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: 'grey.50',
        display: 'flex',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: 4 }}>
          <Stack spacing={3}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Box
                sx={{
                  alignItems: 'center',
                  bgcolor: 'primary.main',
                  borderRadius: '50%',
                  color: 'primary.contrastText',
                  display: 'flex',
                  height: 48,
                  justifyContent: 'center',
                  width: 48,
                }}
              >
                <LockOutlinedIcon />
              </Box>
              <Typography variant="h4" fontWeight={800}>
                Sign in
              </Typography>
              <Typography color="text.secondary">
                Access your CRM workspace
              </Typography>
            </Stack>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  autoComplete="email"
                  autoFocus
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
                <TextField
                  autoComplete="current-password"
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
                <Button
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login
