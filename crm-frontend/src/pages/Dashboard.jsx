import { useEffect, useState } from 'react'
import { Box, Card, CardContent, Grid, Stack, Typography, CircularProgress } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import HandshakeIcon from '@mui/icons-material/Handshake'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { useAuth } from '../context/useAuth'
import { userService } from '../services/userService'
import { customerService } from '../services/customerService'
import { leadService } from '../services/leadService'
import { ROLES } from '../utils/constants'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === ROLES.admin
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const requests = [
          customerService.getAll(0, 1),
          leadService.getAll(0, 1),
        ]
        if (isAdmin) requests.unshift(userService.getAll(0, 1))

        const results = await Promise.all(requests)

        if (isAdmin) {
          const [usersRes, customersRes, leadsRes] = results
          setStats({
            users: usersRes.data?.totalElements ?? 0,
            customers: customersRes.data?.totalElements ?? 0,
            leads: leadsRes.data?.totalElements ?? 0,
          })
        } else {
          const [customersRes, leadsRes] = results
          setStats({
            users: null,
            customers: customersRes.data?.totalElements ?? 0,
            leads: leadsRes.data?.totalElements ?? 0,
          })
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        setStats({ users: 0, customers: 0, leads: 0 })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [isAdmin])

  if (loading) {
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          minHeight: '50vh',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const statItems = [
    isAdmin && {
      helper: 'Active users with CRM access',
      icon: <GroupIcon color="primary" fontSize="large" />,
      label: 'Users',
      value: String(stats?.users ?? 0),
    },
    {
      helper: 'Managed customer accounts',
      icon: <PeopleAltIcon color="success" fontSize="large" />,
      label: 'Customers',
      value: String(stats?.customers ?? 0),
    },
    {
      helper: 'Open sales opportunities',
      icon: <HandshakeIcon color="warning" fontSize="large" />,
      label: 'Leads',
      value: String(stats?.leads ?? 0),
    },
    {
      helper: 'Pipeline movement this month',
      icon: <TrendingUpIcon color="info" fontSize="large" />,
      label: 'Conversion',
      value: '—',
    },
  ].filter(Boolean)

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor CRM activity and sales pipeline health."
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={800} gutterBottom>
                Welcome, {currentUser?.fullName}
              </Typography>
              <Typography color="text.secondary">
                You are signed in as {currentUser?.role}. Use the navigation to
                manage the modules available to your role.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                Current User
              </Typography>
              <Typography variant="h6" fontWeight={800}>
                {currentUser?.fullName}
              </Typography>
              <Typography color="text.secondary">{currentUser?.email}</Typography>
              <Typography color="text.secondary">{currentUser?.role}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {statItems.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.label}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default Dashboard
