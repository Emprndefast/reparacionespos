// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Azul como color principal
    },
    secondary: {
      main: '#9c27b0',  // Morado como color secundario
    },
    background: {
      default: '#f5f5f5',  // Fondo claro para el modo claro
      paper: '#ffffff',  // Fondo de tarjetas
    },
    text: {
      primary: '#000000', // Texto principal oscuro
      secondary: '#757575',  // Texto secundario
    },
    mode: 'light',  // Establece el modo predeterminado como claro (puedes cambiar esto dinámicamente)
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,  // Bordes redondeados para las tarjetas
        },
      },
    },
  },
});

export default theme;
