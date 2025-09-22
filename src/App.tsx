// ARCHIVO: src/App.tsx (PARA PRUEBA DE CONEXIÓN)

import { useState } from 'react';
import './App.css'; // Vite incluye estilos básicos que podemos usar

function App() {
  // Estado para manejar el mensaje de respuesta y el tipo (éxito/error)
  const [response, setResponse] = useState({ message: 'Esperando respuesta del servidor...', type: 'info' });
  // Estado para manejar el estado de carga
  const [isLoading, setIsLoading] = useState(false);

  // Obtenemos la URL de la API de GAS desde las variables de entorno inyectadas por Vite.
  // El flujo de GitHub Actions se encargará de crear esta variable.
  const GAS_API_URL = import.meta.env.VITE_GAS_API_URL;

  const handlePing = async () => {
    setIsLoading(true);
    setResponse({ message: 'Enviando solicitud al servidor de GAS...', type: 'info' });

    if (!GAS_API_URL) {
      setResponse({ message: 'Error: La URL de la API no está configurada. Revise los secretos de GitHub y el workflow de deploy.', type: 'error' });
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(GAS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'ping' }),
        redirect: 'follow'
      });

      const result = await res.json();

      if (result.status === 'success') {
        setResponse({ message: `✅ Éxito: ${result.data.message}`, type: 'success' });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setResponse({ message: `❌ Error: ${errorMessage}`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Prueba de Conexión CRM SIRA</h1>
        <p>Frontend (React en GitHub) ↔ Backend (GAS)</p>
        <button onClick={handlePing} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Ping al Servidor GAS'}
        </button>
        <div className={`response-box ${response.type}`}>
          {response.message}
        </div>
        <p style={{ fontSize: '0.8em', color: '#aaa', marginTop: '2em' }}>
          <strong>URL del Backend:</strong> {GAS_API_URL ? `${GAS_API_URL.substring(0, 50)}...` : 'No configurada'}
        </p>
      </header>
    </div>
  );
}

export default App;