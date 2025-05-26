import { useEffect, useState } from 'react';
import api from '../services/api';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    api.get('todos/').then(res => setTodos(res.data));
  }, []);

  return (
    <div>
      <h2>Mes Tâches</h2>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}
