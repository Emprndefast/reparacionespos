import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';
import { TextField, Button, Container, Typography, Grid, Card, CardContent, CardActions, Box, Snackbar, CircularProgress } from '@mui/material';
import { Delete, Print, Paid } from '@mui/icons-material';

function App() {
  const [cliente, setCliente] = useState('');
  const [modelo, setModelo] = useState('');
  const [problema, setProblema] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');
  const [pagado, setPagado] = useState(false);
  const [reparaciones, setReparaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reparaciones"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        fecha: doc.data().fecha.toDate?.() || new Date(doc.data().fecha),
      }));
      setReparaciones(datos);
    });
    return () => unsubscribe();
  }, []);

  const guardarReparacion = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "reparaciones"), {
        cliente,
        modelo,
        problema,
        precio,
        fecha: new Date(fecha),
        pagado,
      });
      setSnackbarMessage("Reparación guardada");
      setCliente(""); setModelo(""); setProblema(""); setPrecio(""); setFecha(""); setPagado(false);
    } catch (error) {
      setSnackbarMessage("Error guardando reparación");
      console.error(error);
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  const eliminarReparacion = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "reparaciones", id));
      setSnackbarMessage("Reparación eliminada");
    } catch (error) {
      setSnackbarMessage("Error eliminando reparación");
      console.error(error);
    }
    setSnackbarOpen(true);
    setLoading(false);
  };

  const marcarComoPagado = async (id) => {
    try {
      await updateDoc(doc(db, 'reparaciones', id), { pagado: true });
      setSnackbarMessage("Reparación marcada como pagada");
    } catch (error) {
      setSnackbarMessage("Error marcando como pagado");
      console.error(error);
    }
    setSnackbarOpen(true);
  };

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
    <div className="App">
      <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>Registro de Reparaciones</Typography>

        <form onSubmit={e => { e.preventDefault(); guardarReparacion(); }}>
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Cliente" fullWidth value={cliente} onChange={e => setCliente(e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Modelo" fullWidth value={modelo} onChange={e => setModelo(e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Problema" fullWidth value={problema} onChange={e => setProblema(e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Precio" type="number" fullWidth value={precio} onChange={e => setPrecio(e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Fecha" type="date" fullWidth InputLabelProps={{ shrink: true }} value={fecha} onChange={e => setFecha(e.target.value)} /></Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Guardar Reparación'}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box mt={5}>
          <Typography variant="h6" gutterBottom>Historial</Typography>
          {reparaciones.length > 0 ? (
            <Grid container spacing={2}>
              {reparaciones.map(rep => (
                <Grid item xs={12} sm={6} key={rep.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{rep.modelo}</Typography>
                      <Typography variant="body1">Cliente: {rep.cliente}</Typography>
                      <Typography variant="body2">Problema: {rep.problema}</Typography>
                      <Typography variant="body2">Fecha: {new Date(rep.fecha).toLocaleDateString()}</Typography>
                      <Typography variant="h6" color="primary">💲{rep.precio}</Typography>
                      <Typography variant="body2" color={rep.pagado ? 'green' : 'red'}>
                        {rep.pagado ? '✅ Pagado' : '❌ No Pagado'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {!rep.pagado && (
                        <Button size="small" color="success" onClick={() => marcarComoPagado(rep.id)} startIcon={<Paid />}>
                          Marcar como pagado
                        </Button>
                      )}
                      <Button size="small" color="secondary" onClick={() => imprimirFactura(rep)} startIcon={<Print />}>
                        Factura
                      </Button>
                      <Button size="small" color="primary" onClick={() => imprimirEtiqueta(rep)} startIcon={<Print />}>
                        Etiqueta
                      </Button>
                      <Button size="small" color="error" onClick={() => eliminarReparacion(rep.id)} startIcon={<Delete />}>
                        Eliminar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography align="center" color="textSecondary">No hay reparaciones registradas.</Typography>
          )}
        </Box>

        <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
      </Container>
    </div>
  );
}

export default App;
