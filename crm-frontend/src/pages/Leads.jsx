import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
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
import { leadService } from '../services/leadService'
import { useAuth } from '../context/useAuth'
import { ROLES } from '../utils/constants'

const LEAD_STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']
const LEAD_SOURCES = ['WEBSITE', 'REFERRAL', 'SOCIAL_MEDIA', 'EMAIL_CAMPAIGN', 'PHONE_CALL', 'TRADE_SHOW', 'PARTNER', 'OTHER']

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  description: '',
  status: 'NEW',
  source: 'WEBSITE',
  assignedToId: null,
}

const STATUS_COLORS = {
  NEW: 'default',
  CONTACTED: 'info',
  QUALIFIED: 'primary',
  PROPOSAL: 'warning',
  NEGOTIATION: 'secondary',
  WON: 'success',
  LOST: 'error',
}

const Leads = () => {
  const { currentUser } = useAuth()
  const canMutate = currentUser?.role === ROLES.admin || currentUser?.role === ROLES.salesExecutive
  const canDelete = currentUser?.role === ROLES.admin
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingLead, setEditingLead] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const response = await leadService.getAll(0, 100)
      setLeads(response.data?.content ?? [])
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await leadService.getAll(0, 100)
        setLeads(response.data?.content ?? [])
      } catch (error) {
        toast.error(error.response?.data?.message ?? 'Failed to load leads')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleOpenDialog = (lead = null) => {
    setFormError('')
    if (lead) {
      setEditingLead(lead)
      setFormData({
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        description: lead.description || '',
        status: lead.status || 'NEW',
        source: lead.source || 'WEBSITE',
        assignedToId: lead.assignedToId || null,
      })
    } else {
      setEditingLead(null)
      setFormData(emptyForm)
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingLead(null)
    setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)
    try {
      const payload = {
        ...formData,
        assignedToId: formData.assignedToId || null,
      }
      if (editingLead) {
        await leadService.update(editingLead.id, payload)
        toast.success('Lead updated')
      } else {
        await leadService.create(payload)
        toast.success('Lead created')
      }
      handleCloseDialog()
      fetchLeads()
    } catch (error) {
      const msg = error.response?.data?.message ?? 'Failed to save lead'
      setFormError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return
    try {
      await leadService.delete(id)
      toast.success('Lead deleted')
      fetchLeads()
    } catch (error) {
      toast.error(error.response?.data?.message ?? 'Failed to delete lead')
    }
  }

  const showActions = canMutate || canDelete

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
        title="Leads"
        subtitle="Review open opportunities and sales follow-up priorities."
      />

      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              Lead Pipeline
            </Typography>
            {canMutate && (
              <Button variant="contained" onClick={() => handleOpenDialog()}>
                Add Lead
              </Button>
            )}
          </Stack>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Source</TableCell>
                  {showActions && <TableCell align="right">Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={showActions ? 6 : 5} align="center">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.company || '—'}</TableCell>
                      <TableCell>
                        <Chip
                          label={lead.status}
                          color={STATUS_COLORS[lead.status] || 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{lead.source || '—'}</TableCell>
                      {showActions && (
                        <TableCell align="right">
                          {canMutate && (
                            <IconButton size="small" onClick={() => handleOpenDialog(lead)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          )}
                          {canDelete && (
                            <IconButton size="small" color="error" onClick={() => handleDelete(lead.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )}
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
        <DialogTitle>{editingLead ? 'Edit Lead' : 'Add Lead'}</DialogTitle>
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
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 500 }}
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {LEAD_STATUSES.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  value={formData.source}
                  label="Source"
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                >
                  {LEAD_SOURCES.map((source) => (
                    <MenuItem key={source} value={source}>{source}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? 'Saving...' : editingLead ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

export default Leads
