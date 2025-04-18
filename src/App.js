import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';
import HistorialReparaciones from './components/HistorialReparaciones';
import ReparacionesLista from './components/ReparacionesLista'; // debajo de los otros imports

function App() {
  const [cliente, setCliente] = useState('');
  const [modelo, setModelo] = useState('');
  const [problema, setProblema] = useState('');
  const [precio, setPrecio] = useState('');
  const [reparaciones, setReparaciones] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "reparaciones"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReparaciones(datos);
    });

    return () => unsubscribe();
  }, []);

  const guardarReparacion = async () => {
    try {
      await addDoc(collection(db, "reparaciones"), {
        cliente,
        modelo,
        problema,
        precio,
        fecha: new Date(),
  pagado: false // nuevo campo
      });
      alert("Reparación guardada");
      setCliente(""); setModelo(""); setProblema(""); setPrecio("");
    } catch (error) {
      console.error("Error guardando reparación:", error);
    }
  };

  return (
    <div className="App">
      <h1>Registro de Reparaciones</h1>
      <form onSubmit={e => { e.preventDefault(); guardarReparacion(); }}>
        <input type="text" placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
        <input type="text" placeholder="Modelo" value={modelo} onChange={e => setModelo(e.target.value)} />
        <input type="text" placeholder="Problema" value={problema} onChange={e => setProblema(e.target.value)} />
        <input type="number" placeholder="Precio" value={precio} onChange={e => setPrecio(e.target.value)} />
        <button type="submit">Guardar Reparación</button>
      </form>
      <HistorialReparaciones />
      <ReparacionesLista />

      <h2>Reparaciones Guardadas</h2>
      <ul>
        {reparaciones.map(rep => (
          <li key={rep.id}>
            📱 <strong>{rep.modelo}</strong> de <strong>{rep.cliente}</strong> - {rep.problema} - 💲{rep.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
