import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useThemeContext } from './ThemeContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import {
  Delete,
  Print,
  Paid,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';

function App() {
  // Estado para los formularios
  const [cliente, setCliente] = useState('');
  const [modelo, setModelo] = useState('');
  const [problema, setProblema] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [pagado, setPagado] = useState(false);

  // Estado para gestionar las reparaciones
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [ganancias, setGanancias] = useState({ dia: 0, semana: 0, mes: 0 });

  const { toggleTheme, mode } = useThemeContext();

  // Cargar las reparaciones desde Firebase
  useEffect(() => {
    const q = query(collection(db, 'reparaciones'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha instanceof Timestamp
          ? doc.data().fecha.toDate()
          : new Date(doc.data().fecha),
      }));
      setReparaciones(datos);
    });
    return () => unsubscribe();
  }, []);

  // Calcular las ganancias al cargar las reparaciones
  useEffect(() => {
    calcularGanancias();
  }, [reparaciones]);

  // Función para calcular ganancias diarias, semanales y mensuales
  const calcularGanancias = () => {
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    let dia = 0, semana = 0, mes = 0;

    reparaciones.forEach((rep) => {
      const fecha = rep.fecha instanceof Date ? rep.fecha : new Date(rep.fecha);
      const precio = parseFloat(rep.precio) || 0;

      if (fecha.toDateString() === hoy.toDateString()) dia += precio;
      if (fecha >= inicioSemana) semana += precio;
      if (fecha >= inicioMes) mes += precio;
    });

    setGanancias({ dia, semana, mes });
  };

  // Función para guardar una reparación en Firebase
  const guardarReparacion = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'reparaciones'), {
        cliente,
        modelo,
        problema,
        precio: parseFloat(precio),
        fecha: new Date(fecha),
        pagado,
      });
      setSnackbarMessage('Reparación guardada');
      setCliente(''); setModelo(''); setProblema(''); setPrecio(''); setFecha(''); setPagado(false);
    } catch (error) {
      setSnackbarMessage('Error guardando reparación');
      console.error(error);
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  // Función para eliminar una reparación de Firebase
  const eliminarReparacion = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'reparaciones', id));
      setSnackbarMessage('Reparación eliminada');
    } catch (error) {
      setSnackbarMessage('Error eliminando reparación');
      console.error(error);
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  // Función para marcar una reparación como pagada
  const marcarComoPagado = async (id) => {
    try {
      await updateDoc(doc(db, 'reparaciones', id), { pagado: true });
      setSnackbarMessage('Reparación marcada como pagada');
    } catch (error) {
      setSnackbarMessage('Error marcando como pagado');
      console.error(error);
    }
    setSnackbarOpen(true);
  };

  // Función para imprimir la factura de una reparación
  const imprimirFactura = (reparacion) => {
    const ventana = window.open('', '_blank');
    ventana.document.write('<html><head><title>Factura</title></head><body>');
    ventana.document.write(`
      <h2>Factura de Reparación</h2>
      <p><strong>Cliente:</strong> ${reparacion.cliente}</p>
      <p><strong>Modelo:</strong> ${reparacion.modelo}</p>
      <p><strong>Problema:</strong> ${reparacion.problema}</p>
      <p><strong>Precio:</strong> $${reparacion.precio}</p>
      <p><strong>Fecha:</strong> ${new Date(reparacion.fecha).toLocaleDateString()}</p>
    `);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
  };

  // Función para imprimir la etiqueta de una reparación
  const imprimirEtiqueta = (reparacion) => {
    const ventana = window.open('', '_blank');
    ventana.document.write('<html><head><title>Etiqueta</title></head><body>');
    ventana.document.write(`
      <div style="border:1px dashed #000; padding:10px; width:250px; font-family:Arial;">
        <p><strong>${reparacion.cliente}</strong></p>
        <p>${reparacion.modelo}</p>
        <p>${reparacion.problema}</p>
        <p>📅 ${new Date(reparacion.fecha).toLocaleDateString()}</p>
      </div>
    `);
    ventana.document.write('</body></html>');
    ventana.document.close();
    ventana.print();
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Typography variant="h5">Reparaciones NT</Typography>
        <IconButton onClick={toggleTheme}>
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      <Container maxWidth="md">
        {/* Muestra de ganancias horizontales */}
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Card sx={{ padding: 2, flex: 1, mx: 1 }}>
            <Typography variant="body1" color="textSecondary">Hoy:</Typography>
            <Typography variant="h6" color="success.main">${ganancias.dia.toFixed(2)}</Typography>
          </Card>

          <Card sx={{ padding: 2, flex: 1, mx: 1 }}>
            <Typography variant="body1" color="textSecondary">Semana:</Typography>
            <Typography variant="h6" color="info.main">${ganancias.semana.toFixed(2)}</Typography>
          </Card>

          <Card sx={{ padding: 2, flex: 1, mx: 1 }}>
            <Typography variant="body1" color="textSecondary">Mes:</Typography>
            <Typography variant="h6" color="primary">${ganancias.mes.toFixed(2)}</Typography>
          </Card>
        </Box>

        {/* Título y formulario de registro de reparaciones */}
        <Typography variant="h4" align="center" gutterBottom>
          Registro de Reparaciones
        </Typography>

        {/* Formulario para registrar una nueva reparación */}
        <form onSubmit={(e) => { e.preventDefault(); guardarReparacion(); }} 
          style={{ 
            backgroundColor: mode === 'dark' ? '#333' : '#f9f9f9', 
            padding: '16px', 
            borderRadius: '8px' 
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Cliente" fullWidth value={cliente} onChange={(e) => setCliente(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Modelo" fullWidth value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Problema" fullWidth value={problema} onChange={(e) => setProblema(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Precio" type="number" fullWidth value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ padding: 2 }}>
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Guardar Reparación'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Lista de reparaciones */}
        <Box mt={2}>
          {reparaciones.map((reparacion) => (
          <Card key={reparacion.id} sx={{
            mb: 2, 
            borderRadius: 2, 
            boxShadow: 3, 
            backgroundColor: 'background.paper',
            '&:hover': {
              boxShadow: 6,
            },
          }}>
            <CardContent>
              <Typography variant="h6">{reparacion.cliente}</Typography>
              <Typography variant="body2">{reparacion.modelo}</Typography>
              <Typography variant="body2">{reparacion.problema}</Typography>
              <Typography variant="body1">${reparacion.precio}</Typography>
              <Typography variant="body2">{new Date(reparacion.fecha).toLocaleDateString()}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => marcarComoPagado(reparacion.id)} disabled={reparacion.pagado}><Paid /> Pagado</Button>
                <Button size="small" color="secondary" onClick={() => eliminarReparacion(reparacion.id)}><Delete /> Eliminar</Button>
                <Button size="small" onClick={() => imprimirFactura(reparacion)}><Print /> Factura</Button>
                <Button size="small" onClick={() => imprimirEtiqueta(reparacion)}><Print /> Etiqueta</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={9000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        sx={{
          backgroundColor: 'green',
          borderRadius: 5,
          '& .MuiSnackbarContent-root': {
            fontWeight: 'bold',
          },
        }}
      />
    </Box>
  );
}

export default App;