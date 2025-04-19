// src/pages/Configuracion.js
import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { Settings, Security, Update } from '@mui/icons-material';

const Configuracion = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: darkMode ? '#121212' : '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        Configuración
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
          borderRadius: '10px',
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Configura opciones avanzadas del sistema, seguridad, actualizaciones y otras preferencias.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          {/* Tarjeta de seguridad */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Seguridad"
                subheader="Ajustes de seguridad del sistema"
                action={<IconButton><Security fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  Activo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sistema de autenticación de dos factores habilitado
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de actualizaciones */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Actualizaciones"
                subheader="Última actualización del sistema"
                action={<IconButton><Update fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  1.2.0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Actualización reciente realizada en el sistema
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de configuración general */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Configuración General"
                subheader="Ajustes generales del sistema"
                action={<IconButton><Settings fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  Completo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Todos los ajustes del sistema están completos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Configuracion;
