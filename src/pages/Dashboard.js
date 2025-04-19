// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { AccessTime, Settings, People, Storage } from '@mui/icons-material';

const Dashboard = () => {
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
        Dashboard
      </Typography>

      {/* Información general */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
          borderRadius: '10px',
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Bienvenido al panel principal. Aquí podrás visualizar estadísticas generales y resúmenes diarios.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          {/* Tarjeta de usuarios */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Usuarios"
                subheader="Usuarios registrados"
                action={<IconButton><People fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  120
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total de usuarios en el sistema
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de reparaciones */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Reparaciones"
                subheader="Reparaciones recientes"
                action={<IconButton><AccessTime fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  45
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reparaciones completadas en la última semana
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de almacenamiento */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Almacenamiento"
                subheader="Espacio utilizado"
                action={<IconButton><Storage fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  80 GB
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Espacio ocupado de un total de 500 GB
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de configuración */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Configuración"
                subheader="Opciones del sistema"
                action={<IconButton><Settings fontSize="large" sx={{ color: darkMode ? '#fff' : '#000' }} /></IconButton>}
                sx={{
                  bgcolor: darkMode ? '#444' : '#f0f0f0',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  2
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Opciones de sistema pendientes de configuración
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Dashboard;
