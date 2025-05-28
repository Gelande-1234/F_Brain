import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Nom d’utilisateur ou mot de passe incorrect');
      }

      const data = await response.json();

      // Utilise la méthode login de ton contexte
      login(data.access, data.refresh);

      // Redirection après login réussi
      window.location.href = '/'; // ou tableau de bord
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2>Connexion</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <div>
        <label>Nom d’utilisateur</label><br />
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <label>Mot de passe</label><br />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={loading} style={{ marginTop: '15px' }}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>
  );
}

export default Login;
