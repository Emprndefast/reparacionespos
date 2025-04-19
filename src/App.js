import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import NavigationDrawer from './components/NavigationDrawer';
import Dashboard from './pages/Dashboard';
import Reparaciones from './pages/Reparaciones';
import Inventario from './pages/Inventario';
import Clientes from './pages/Clientes';
import Configuracion from './pages/Configuracion';

// Definimos un tema común para toda la aplicación
const theme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiar entre 'light' y 'dark' según el modo de tu app
    primary: {
      main: '#1976d2', // Azul para la barra de navegación y elementos clave
    },
    secondary: {
      main: '#f50057', // Rojo para acciones secundarias
    },
    background: {
      default: '#f5f5f5', // Fondo claro para toda la app
      paper: '#ffffff', // Fondo de los papeles
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Estilo de fuente
    h4: {
      fontWeight: 600, // Negrita para títulos
    },
    h5: {
      fontWeight: 500, // Peso para subtítulos
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Esto asegura que el fondo y los colores se ajusten correctamente */}
      <Router>
        <NavigationDrawer>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reparaciones" element={<Reparaciones />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/configuracion" element={<Configuracion />} />
          </Routes>
        </NavigationDrawer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
