import React from 'react';
import './Invoice.css';

const Invoice = ({ data }) => {
  const fecha = new Date(data.fecha.seconds * 1000).toLocaleString();

  return (
    <div className="invoice">
      <h2>Factura de Reparación</h2>
      <p><strong>Cliente:</strong> {data.cliente}</p>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Dispositivo:</strong> {data.modelo}</p>
      <p><strong>Problema:</strong> {data.problema}</p>
      <p><strong>Precio:</strong> ${data.precio}</p>
      <hr />
      <h3>Total: ${data.precio}</h3>
    </div>
  );
};

export default Invoice;
