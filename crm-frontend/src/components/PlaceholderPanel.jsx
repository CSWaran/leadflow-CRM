import { Paper, Stack, Typography } from '@mui/material'

const PlaceholderPanel = ({ icon, title, description }) => (
  <Paper
    variant="outlined"
    sx={{
      borderRadius: 2,
      p: { xs: 3, md: 4 },
    }}
  >
    <Stack spacing={2} alignItems="flex-start">
      {icon}
      <Stack spacing={0.75}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
      </Stack>
    </Stack>
  </Paper>
)

export default PlaceholderPanel
