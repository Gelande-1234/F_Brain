const API_URL = 'http://localhost:8000/api/todos/';

export async function getTodos(token) {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function toggleComplete(id, completed, token) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ completed: !completed }),
  });
  return await response.json();
}
