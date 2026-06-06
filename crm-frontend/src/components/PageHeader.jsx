import { Box, Typography } from '@mui/material'

const PageHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h4" fontWeight={700}>
      {title}
    </Typography>
    {subtitle ? (
      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
        {subtitle}
      </Typography>
    ) : null}
  </Box>
)

export default PageHeader
