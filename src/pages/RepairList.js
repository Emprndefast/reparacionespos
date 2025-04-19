import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
  Switch,
  Tooltip,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  Print as PrintIcon,
  Paid as PaidIcon
} from '@mui/icons-material';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import Invoice from './Invoice';
import DeviceLabel from './DeviceLabel';

export default function RepairList() {
  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'repairs'), snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRepairs(data);
    });
    return () => unsub();
  }, []);

  const togglePaid = async (id, paid) => {
    await updateDoc(doc(db, 'repairs', id), { paid: !paid });
  };

  const deleteRepair = async (id) => {
    await deleteDoc(doc(db, 'repairs', id));
  };

  return (
    <Grid container spacing={2}>
      {repairs.map((repair) => (
        <Grid item xs={12} md={6} lg={4} key={repair.id}>
          <Card sx={{ borderLeft: repair.paid ? '5px solid green' : '5px solid red' }}>
            <CardContent>
              <Typography variant="h6">
                {repair.cliente} - {repair.modelo}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Problema: {repair.problema}
              </Typography>
              <Typography variant="body2">
                <span style={{ color: repair.paid ? 'green' : 'red', fontWeight: 'bold' }}>
                  ${repair.precio}
                </span>
              </Typography>

              {repair.servicios && (
                <div style={{ marginTop: 8 }}>
                  {repair.servicios.map((servicio, i) => (
                    <Chip key={i} label={servicio} color="primary" size="small" style={{ marginRight: 4, marginTop: 4 }} />
                  ))}
                </div>
              )}

              <Typography variant="caption" display="block" gutterBottom>
                Fecha: {new Date(repair.fecha.seconds * 1000).toLocaleDateString()}
              </Typography>

              <Tooltip title={repair.paid ? 'Marcar como no pagado' : 'Marcar como pagado'}>
                <Switch
                  checked={repair.paid}
                  onChange={() => togglePaid(repair.id, repair.paid)}
                  color="success"
                />
              </Tooltip>

              <IconButton onClick={() => window.print()}>
                <PrintIcon />
              </IconButton>

              <IconButton onClick={() => Invoice(repair)}>
                <ReceiptIcon />
              </IconButton>

              <IconButton onClick={() => DeviceLabel(repair)}>
                <PaidIcon />
              </IconButton>

              <IconButton onClick={() => deleteRepair(repair.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
