// src/pages/Clientes.js
import React, { useContext } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardHeader, Divider, IconButton, Chip } from '@mui/material';
import { ThemeContext } from './ThemeContext';
import { People, Phone, AssignmentInd } from '@mui/icons-material';

const Clientes = () => {
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
        Clientes
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
          Aquí podrás gestionar los datos de los clientes, ver su historial de reparaciones y realizar nuevas interacciones.
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          {/* Tarjeta de clientes registrados */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Clientes Registrados"
                subheader="Clientes activos en el sistema"
                action={<IconButton><People /></IconButton>}
                sx={{ bgcolor: darkMode ? '#444' : '#f0f0f0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  200
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes registrados hasta la fecha
                </Typography>
                <Chip label="Activo" color="primary" size="small" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de clientes con reparaciones */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Clientes con Reparaciones"
                subheader="Clientes con reparaciones pendientes"
                action={<IconButton><Phone /></IconButton>}
                sx={{ bgcolor: darkMode ? '#444' : '#f0f0f0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  75
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes con reparaciones activas
                </Typography>
                <Chip label="Pendiente" color="warning" size="small" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Tarjeta de clientes VIP */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: darkMode ? '#333' : '#fff', borderRadius: '10px' }}>
              <CardHeader
                title="Clientes VIP"
                subheader="Clientes frecuentes o especiales"
                action={<IconButton><AssignmentInd /></IconButton>}
                sx={{ bgcolor: darkMode ? '#444' : '#f0f0f0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
              />
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  15
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Clientes frecuentes con beneficios especiales
                </Typography>
                <Chip label="VIP" color="success" size="small" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Clientes;
