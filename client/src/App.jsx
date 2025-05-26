import { useState } from 'react';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access'));

  return (
    <div>
      <h1>ToDo App</h1>
      {isLoggedIn ? <TodoList /> : <Login onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
