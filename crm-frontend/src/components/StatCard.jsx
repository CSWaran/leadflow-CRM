import { Card, CardContent, Stack, Typography } from '@mui/material'

const StatCard = ({ icon, label, value, helper }) => (
  <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
        </Stack>
        {icon}
      </Stack>
      {helper ? (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {helper}
        </Typography>
      ) : null}
    </CardContent>
  </Card>
)

export default StatCard
