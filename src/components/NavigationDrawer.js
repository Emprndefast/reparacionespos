import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const NavigationDrawer = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/reparaciones">
            <ListItemText primary="Reparaciones" />
          </ListItem>
          <ListItem button component={Link} to="/inventario">
            <ListItemText primary="Inventario" />
          </ListItem>
          <ListItem button component={Link} to="/clientes">
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem button component={Link} to="/configuracion">
            <ListItemText primary="Configuración" />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};

export default NavigationDrawer;
