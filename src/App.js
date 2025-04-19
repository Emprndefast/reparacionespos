import React, { useEffect, useState } from 'react';
import {
  Container, TextField, Button, List, ListItem,
  Typography, Card, CardContent, CardActions,
  IconButton, Snackbar, Box, CssBaseline,
  FormControlLabel, Switch
} from '@mui/material';
import { Delete, Print, Paid } from '@mui/icons-material';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const [reparaciones, setReparaciones] = useState([]);
  const [form, setForm] = useState({ cliente: '', modelo: '', problema: '', precio: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'reparaciones'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setReparaciones(data);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const guardarReparacion = async () => {
    if (!form.cliente || !form.modelo || !form.problema || !form.precio) {
      setSnackbarMessage('Completa todos los campos');
      setSnackbarOpen(true);
      return;
    }

    const nuevaReparacion = {
      ...form,
      precio: parseFloat(form.precio),
      fecha: Date.now(),
      pagado: false,
    };

    await addDoc(collection(db, 'reparaciones'), nuevaReparacion);
    setForm({ cliente: '', modelo: '', problema: '', precio: '' });
    setSnackbarMessage('Reparación guardada');
    setSnackbarOpen(true);
  };

  const eliminarReparacion = async (id) => {
    await deleteDoc(doc(db, 'reparaciones', id));
    setSnackbarMessage('Reparación eliminada');
    setSnackbarOpen(true);
  };

  const marcarComoPagado = async (id) => {
    await updateDoc(doc(db, 'reparaciones', id), { pagado: true });
    setSnackbarMessage('Marcado como pagado');
    setSnackbarOpen(true);
  };

  const imprimirFactura = (reparacion) => {
    const contenido = `
      Cliente: ${reparacion.cliente}
      Modelo: ${reparacion.modelo}
      Problema: ${reparacion.problema}
      Precio: $${reparacion.precio}
      Fecha: ${new Date(reparacion.fecha).toLocaleDateString()}
      Estado: ${reparacion.pagado ? 'Pagado' : 'Pendiente'}
    `;
    const ventana = window.open('', '', 'width=600,height=400');
    ventana.document.write(`<pre>${contenido}</pre>`);
    ventana.print();
    ventana.close();
  };

  const imprimirEtiqueta = (reparacion) => {
    const contenido = `
      *** ETIQUETA DE SERVICIO ***
      Cliente: ${reparacion.cliente}
      Modelo: ${reparacion.modelo}
      Problema: ${reparacion.problema}
    `;
    const ventana = window.open('', '', 'width=400,height=300');
    ventana.document.write(`<pre>${contenido}</pre>`);
    ventana.print();
    ventana.close();
  };

  const calcularGanancias = () => {
    const hoy = new Date();
    const dia = hoy.toLocaleDateString();
    const semanaActual = getSemana(hoy);
    const mesActual = hoy.getMonth();

    let gananciasDia = 0;
    let gananciasSemana = 0;
    let gananciasMes = 0;

    reparaciones.forEach((rep) => {
      const fecha = new Date(rep.fecha);
      if (rep.pagado) {
        if (fecha.toLocaleDateString() === dia) {
          gananciasDia += rep.precio;
        }
        if (getSemana(fecha) === semanaActual) {
          gananciasSemana += rep.precio;
        }
        if (fecha.getMonth() === mesActual) {
          gananciasMes += rep.precio;
        }
      }
    });

    return { gananciasDia, gananciasSemana, gananciasMes };
  };

  const getSemana = (fecha) => {
    const inicio = new Date(fecha.getFullYear(), 0, 1);
    const dias = Math.floor((fecha - inicio) / (24 * 60 * 60 * 1000));
    return Math.ceil((dias + inicio.getDay() + 1) / 7);
  };

  const { gananciasDia, gananciasSemana, gananciasMes } = calcularGanancias();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Sistema POS Reparaciones</Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
            label="Modo oscuro"
          />
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
          <TextField label="Cliente" name="cliente" value={form.cliente} onChange={handleChange} />
          <TextField label="Modelo" name="modelo" value={form.modelo} onChange={handleChange} />
          <TextField label="Problema" name="problema" value={form.problema} onChange={handleChange} />
          <TextField label="Precio" name="precio" value={form.precio} onChange={handleChange} type="number" />
          <Button variant="contained" onClick={guardarReparacion}>Guardar</Button>
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Ganancias</Typography>
          <Typography>Día: ${gananciasDia}</Typography>
          <Typography>Semana: ${gananciasSemana}</Typography>
          <Typography>Mes: ${gananciasMes}</Typography>
        </Box>

        <Box>
          {reparaciones.map((reparacion) => (
            <Card key={reparacion.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3, backgroundColor: 'background.paper', padding: 2 }}>
              <CardContent>
                <Typography variant="h6">{reparacion.cliente}</Typography>
                <Typography color="textSecondary">{reparacion.modelo} - {reparacion.problema}</Typography>
                <Typography variant="body2">Precio: ${reparacion.precio}</Typography>
                <Typography variant="body2">Fecha: {new Date(reparacion.fecha).toLocaleDateString()}</Typography>
                <Typography variant="body2" color={reparacion.pagado ? 'success.main' : 'warning.main'}>
                  {reparacion.pagado ? 'Pagado' : 'Pendiente de pago'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button startIcon={<Delete />} color="error" onClick={() => eliminarReparacion(reparacion.id)}>
                  Eliminar
                </Button>
                <Button startIcon={<Paid />} color="success" disabled={reparacion.pagado} onClick={() => marcarComoPagado(reparacion.id)}>
                  Marcar como pagado
                </Button>
                <Button startIcon={<Print />} onClick={() => imprimirFactura(reparacion)}>
                  Factura
                </Button>
                <Button onClick={() => imprimirEtiqueta(reparacion)}>
                  Etiqueta
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;