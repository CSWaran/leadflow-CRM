import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'
import { useAuth } from '../context/useAuth'
import { userService } from '../services/userService'

const emptyForm = { email: '', fullName: '', password: '', role: 'SALES_EXECUTIVE' }

const Users = () => {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getAll(0, 100)
      setUsers(response.data?.content ?? [])
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await userService.getAll(0, 100)
        setUsers(response.data?.content ?? [])
      } catch (error) {
        toast.error(error.response?.data?.message ?? 'Failed to load users')
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  const handleOpenDialog = () => {
    setFormData(emptyForm)
    setFormError('')
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      await userService.create(formData)
      toast.success('User created')
      handleCloseDialog()
      fetchUsers()
    } catch (error) {
      const msg = error.response?.data?.message ?? 'Failed to create user'
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await userService.delete(id)
      toast.success('User deleted')
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to delete user')
    }
  }

  if (loading) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', minHeight: '50vh', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage CRM users, roles, and account access."
      />

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              User List
            </Typography>
            <Button variant="contained" onClick={handleOpenDialog}>
              Add User
            </Button>
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.enabled ? 'Active' : 'Inactive'}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(user.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <TextField
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                fullWidth
                required
                inputProps={{ maxLength: 120 }}
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                required
                inputProps={{ minLength: 8, maxLength: 72 }}
                helperText="Minimum 8 characters"
              />
              <TextField
                select
                label="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                fullWidth
              >
                <MenuItem value="ADMIN">ADMIN</MenuItem>
                <MenuItem value="MANAGER">MANAGER</MenuItem>
                <MenuItem value="SALES_EXECUTIVE">SALES_EXECUTIVE</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default Users
