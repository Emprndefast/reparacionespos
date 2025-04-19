import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { PieChart, Pie } from 'recharts';
import { jsPDF } from 'jspdf';
import { auth } from '../firebase'; // Asegúrate de tener configurado Firebase

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = [
        { id: '1', name: 'Producto A', price: 100, quantity: 5, category: 'Electrónica', minStock: 3 },
        { id: '2', name: 'Producto B', price: 200, quantity: 8, category: 'Electrónica', minStock: 5 },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSortChange = (e) => {
    const sortCriteria = e.target.value;
    const sorted = [...products].sort((a, b) => {
      if (sortCriteria === 'price') {
        return a.price - b.price;
      } else if (sortCriteria === 'quantity') {
        return a.quantity - b.quantity;
      }
      return 0;
    });
    setSortedProducts(sorted);
    setFilteredProducts(sorted);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Reporte de Inventario', 10, 10);
    filteredProducts.forEach((product, index) => {
      doc.text(`${product.name} - ${product.quantity} unidades`, 10, 20 + index * 10);
    });
    doc.save('inventario.pdf');
  };

  const LowStockAlert = ({ products }) => {
    const lowStockProducts = products.filter(product => product.quantity < product.minStock);
    return lowStockProducts.length > 0 ? (
      <div>
        <h3>Productos con stock bajo:</h3>
        {lowStockProducts.map((product) => (
          <p key={product.id}>{product.name} - {product.quantity} unidades restantes</p>
        ))}
      </div>
    ) : null;
  };

  const Dashboard = () => {
    const data = products.map(product => ({
      name: product.name,
      value: product.quantity
    }));
    return (
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" />
      </PieChart>
    );
  };

  const InventoryPagination = ({ currentPage, setCurrentPage, totalProducts }) => {
    const productsPerPage = 10;

    return (
      <div>
        <button onClick={handlePreviousPage}>Anterior</button>
        <button onClick={handleNextPage}>Siguiente</button>
      </div>
    );
  };

  const handleEditProduct = (id) => {
    console.log('Editar producto con ID:', id);
  };

  const handleSale = (id, quantity) => {
    console.log('Vender producto con ID:', id, 'Cantidad:', quantity);
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h2>Inventario</h2>

      <TextField
        label="Buscar Producto"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
      />

      <div>
        <Button onClick={generatePDF}>Generar Reporte</Button>
      </div>

      <div>
        <select onChange={handleSortChange}>
          <option value="price">Precio</option>
          <option value="quantity">Cantidad</option>
        </select>
      </div>

      <LowStockAlert products={filteredProducts} />

      <Dashboard />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditProduct(product.id)}>Editar</Button>
                <Button onClick={() => handleSale(product.id, 1)}>Vender</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InventoryPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filteredProducts.length}
      />
    </div>
  );
};

export default Inventory;
