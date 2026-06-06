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
import EditIcon from '@mui/icons-material/Edit'
import { toast } from 'react-toastify'
import PageHeader from '../components/PageHeader'
import { customerService } from '../services/customerService'
import { useAuth } from '../context/useAuth'
import { ROLES } from '../utils/constants'

const emptyForm = { name: '', email: '', phone: '', company: '' }

const Customers = () => {
  const { currentUser } = useAuth()
  const canMutate = currentUser?.role === ROLES.admin || currentUser?.role === ROLES.manager
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const response = await customerService.getAll(0, 100)
      setCustomers(response.data?.content ?? [])
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to load customers')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await customerService.getAll(0, 100)
        setCustomers(response.data?.content ?? [])
      } catch (error) {
        toast.error(error.response?.data?.message ?? 'Failed to load customers')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleOpenDialog = (customer = null) => {
    setFormError('')
    if (customer) {
      setEditingCustomer(customer)
      setFormData({
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || '',
        company: customer.company || '',
      })
    } else {
      setEditingCustomer(null)
      setFormData(emptyForm)
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingCustomer(null)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      if (editingCustomer) {
        await customerService.update(editingCustomer.id, formData)
        toast.success('Customer updated')
      } else {
        await customerService.create(formData)
        toast.success('Customer created')
      }
      handleCloseDialog()
      fetchCustomers()
    } catch (error) {
      const msg = error.response?.data?.message ?? 'Failed to save customer'
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return
    try {
      await customerService.delete(id)
      toast.success('Customer deleted')
      fetchCustomers()
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to delete customer')
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
        title="Customers"
        subtitle="Track customer accounts, contacts, and relationship activity."
      />

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              Customer List
            </Typography>
            {canMutate && (
              <Button variant="contained" onClick={() => handleOpenDialog()}>
                Add Customer
              </Button>
            )}
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  {canMutate && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={canMutate ? 5 : 4} align="center">
                      No customers found
                    </TableCell>
                  </TableRow>
                ) : (
                  customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.company || '—'}</TableCell>
                      {canMutate && (
                        <TableCell align="right">
                          <IconButton size="small" onClick={() => handleOpenDialog(customer)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(customer.id)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
                inputProps={{ maxLength: 150 }}
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
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                fullWidth
                required
                inputProps={{ maxLength: 30 }}
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                fullWidth
                inputProps={{ maxLength: 150 }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Saving...' : editingCustomer ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default Customers
