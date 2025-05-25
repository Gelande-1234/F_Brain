import { useEffect, useState } from 'react';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from './api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await fetchTodos();
    setTodos(res.data);
  };

  const handleAdd = async () => {
    if (title.trim() === '') return;
    await createTodo({ title, completed: false });
    setTitle('');
    loadTodos();
  };

  const handleToggle = async (todo) => {
    await updateTodo(todo.id, { ...todo, completed: !todo.completed });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>✅ ToDo List</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle tâche..."
      />
      <button onClick={handleAdd}>Ajouter</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => handleToggle(todo)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: 10 }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
