import { useEffect, useState } from 'react';
import { getTodos, toggleComplete } from './api/todos';
import Login from './Login';

function App() {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;

    async function fetchTodos() {
      try {
        const data = await getTodos(token);
        setTodos(data);
      } catch (error) {
        console.error("Erreur en récupérant les todos", error);
        // Si token invalide, on peut le supprimer
        localStorage.removeItem('token');
        setToken(null);
      }
    }
    fetchTodos();
  }, [token]);

  async function handleToggle(todo) {
    try {
      const updated = await toggleComplete(todo.id, todo.completed, token);
      setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
    } catch (error) {
      console.error("Erreur en mettant à jour le todo", error);
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
    setTodos([]);
  }

  if (!token) {
    return <Login onLogin={setToken} />;
  }

  if (!todos.length) return <div>Chargement des tâches...</div>;

  return (
    <div className="container">
      <h1>📝 Mes Tâches</h1>
      <button onClick={handleLogout} style={{ marginBottom: '10px' }}>
        Se déconnecter
      </button>
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between">
            <span>{todo.title}</span>
            <button
              className={`btn btn-sm ${todo.completed ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => handleToggle(todo)}
            >
              {todo.completed ? '✔' : '⏳'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
