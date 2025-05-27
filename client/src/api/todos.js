const API_URL = 'http://localhost:8000/api/todos/';
const REFRESH_URL = 'http://localhost:8000/api/token/refresh/';

async function refreshToken() {
  const refresh = localStorage.getItem('refresh');
  console.log('[refreshToken] Refresh token:', refresh);
  if (!refresh) throw new Error('Refresh token manquant');

  const response = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });
  console.log('[refreshToken] Statut réponse:', response.status);
  
  if (!response.ok) {
    throw new Error('Échec du rafraîchissement du token');
  }

  const data = await response.json();
  localStorage.setItem('token', data.access);
  return data.access;
}

async function authFetch(url, options = {}, retry = true) {
  let token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  console.log('[authFetch] Statut réponse:', response.status);

  if (response.status === 401 && retry) {
    console.log('[authFetch] 401 reçu, tentative de rafraîchissement du token...');
    try {
      token = await refreshToken();
      console.log('[authFetch] Token rafraîchi:', token);
      return authFetch(
        url,
        {
          ...options,
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        },
        false
      );
    } catch (error) {
      console.log('[authFetch] Échec rafraîchissement:', error);
      // Rafraîchissement du token échoué, on déconnecte l'utilisateur
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      window.location.href = '/login'; // adapte le chemin si besoin
      throw new Error('Session expirée, veuillez vous reconnecter.');
    }
  }

  return response;
}

export async function getTodos() {
  const response = await authFetch(API_URL);
  if (!response.ok) throw new Error('Échec de récupération des tâches');
  return await response.json();
}

export async function toggleComplete(id, completed) {
  const response = await authFetch(`${API_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !completed }),
  });
  if (!response.ok) throw new Error('Erreur lors du changement de statut');
  return await response.json();
}

export async function createTodo(title) {
  const response = await authFetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error('Erreur lors de la création de la tâche');
  return await response.json();
}

export async function deleteTodo(id) {
  const response = await authFetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression de la tâche');
}
