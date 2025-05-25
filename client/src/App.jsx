import { useEffect, useState } from 'react';
import { fetchTodos } from './api/todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos().then(res => setTodos(res.data));
  }, []);

  return (
    <div>
      <h1>ToDo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} - {todo.completed ? '✅' : '❌'}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
