import { useMemo, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import { useAuth } from '../context/useAuth'
import { NAVIGATION_BY_ROLE } from '../utils/constants'

const drawerWidth = 264

const navigationItems = {
  dashboard: {
    icon: <DashboardIcon />,
    label: 'Dashboard',
    path: '/dashboard',
  },
  users: {
    icon: <GroupIcon />,
    label: 'Users',
    path: '/users',
  },
  customers: {
    icon: <PeopleAltIcon />,
    label: 'Customers',
    path: '/customers',
  },
  leads: {
    icon: <HandshakeIcon />,
    label: 'Leads',
    path: '/leads',
  },
}

const MainLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const visibleNavigation = useMemo(() => {
    const keys = NAVIGATION_BY_ROLE[currentUser?.role] ?? ['dashboard']
    return keys.map((key) => navigationItems[key])
  }, [currentUser?.role])

  const handleNavigate = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 3 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={800}>
            CRM
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Sales Operations
          </Typography>
        </Stack>
      </Toolbar>
      <Divider />
      <List sx={{ flex: 1, px: 1.5, py: 2 }}>
        {visibleNavigation.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => handleNavigate(item.path)}
            sx={{
              borderRadius: 1.5,
              mb: 0.5,
              minHeight: 44,
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 36, height: 36 }}>
            {currentUser?.fullName?.charAt(0) ?? 'U'}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" fontWeight={700} noWrap>
              {currentUser?.fullName}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {currentUser?.role}
            </Typography>
          </Box>
          <Tooltip title="Logout">
            <IconButton aria-label="Logout" onClick={handleLogout} size="small">
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'grey.50' }}>
      <AppBar
        elevation={0}
        color="inherit"
        position="fixed"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="Open navigation"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
            CRM Dashboard
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {currentUser?.fullName?.charAt(0) ?? 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={700} noWrap>
                {currentUser?.fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {currentUser?.email}
              </Typography>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
