import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const useTodosApi = () => {
  const { accessToken, logout } = useContext(AuthContext);

  if (!accessToken) {
    throw new Error('Access token requis pour utiliser l’API');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };

  const API_URL = 'http://localhost:8000/api/todos/';

  const getTodos = async () => {
    const res = await fetch(API_URL, { headers });
    if (res.status === 401) {
      logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erreur API: ${res.status} - ${text}`);
    }
    return await res.json();
  };

  const createTodo = async (todo) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(todo),
    });
    if (res.status === 401) {
      logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erreur API: ${res.status} - ${text}`);
    }
    return await res.json();
  };

  const toggleComplete = async (id, completed) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ completed: !completed }),
    });
    if (res.status === 401) {
      logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erreur API: ${res.status} - ${text}`);
    }
    return await res.json();
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
      headers,
    });
    if (res.status === 401) {
      logout();
      throw new Error('Session expirée, veuillez vous reconnecter');
    }
    if (!res.ok && res.status !== 204) {
      const text = await res.text();
      throw new Error(`Erreur API: ${res.status} - ${text}`);
    }
  };

  return { getTodos, createTodo, toggleComplete, deleteTodo };
};
