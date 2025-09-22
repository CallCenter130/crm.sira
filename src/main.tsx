// ARCHIVO: src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Ahora debe apuntar a App.tsx

// --- ¡AQUÍ ESTÁ EL CAMBIO! ---
import { HashRouter } from 'react-router-dom'; // Importamos HashRouter
// ----------------------------

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Añadimos React Query
import theme from './theme'; // Asumiendo que tienes un theme.ts

const queryClient = new QueryClient(); // Creamos una instancia de QueryClient

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* --- ¡AQUÍ USAMOS HASHROUTER! --- */}
    <HashRouter>
      <QueryClientProvider client={queryClient}> {/* Envolvemos con el provider de React Query */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </HashRouter>
    {/* ------------------------------- */}
  </React.StrictMode>
);