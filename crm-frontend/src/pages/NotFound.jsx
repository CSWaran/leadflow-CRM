import { Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => (
  <Stack spacing={2} alignItems="flex-start">
    <Typography variant="h4" fontWeight={800}>
      Page not found
    </Typography>
    <Typography color="text.secondary">
      The page you requested does not exist in this CRM workspace.
    </Typography>
    <Button component={RouterLink} to="/dashboard" variant="contained">
      Go to dashboard
    </Button>
  </Stack>
)

export default NotFound
