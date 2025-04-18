// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CustomThemeProvider } from './ThemeContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // para PWA

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);

// Esto hace tu app PWA
serviceWorkerRegistration.register();
