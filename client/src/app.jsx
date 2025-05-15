import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/test/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error('Erreur API:', error);
        setMessage('Erreur lors de la récupération des données');
      });
  }, []);

  return (
    <div>
      <h1>Hello Vite + React!</h1>
      <p>Message du backend: {message}</p>
    </div>
  );
}

export default App;

