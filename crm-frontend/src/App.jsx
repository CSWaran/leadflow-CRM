import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AppRoutes from './routes/AppRoutes'

const theme = createTheme({
  palette: {
    background: {
      default: '#f7f8fa',
    },
    primary: {
      main: '#1f6feb',
    },
    success: {
      main: '#17803d',
    },
    warning: {
      main: '#a16207',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
})

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRoutes />
  </ThemeProvider>
)

export default App
