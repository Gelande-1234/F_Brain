import React, { useEffect, useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, IconButton, TextField, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { useTodosApi } from './api/todos';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { logout, accessToken } = useContext(AuthContext);

  // Protection du composant
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  const { getTodos, toggleComplete, createTodo, deleteTodo } = useTodosApi();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAuthError = () => {
    alert("Votre session a expiré. Veuillez vous reconnecter.");
    logout();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        if (err.message.toLowerCase().includes('session expirée')) {
          handleAuthError();
        } else {
          alert('Erreur : ' + err.message);
        }
      }
    }
    fetchData();
  }, []);

  const handleToggle = async (todo) => {
    try {
      const updated = await toggleComplete(todo.id, todo.completed);
      setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
    } catch (err) {
      if (err.message.toLowerCase().includes('session expirée')) {
        handleAuthError();
      } else {
        alert('Erreur : ' + err.message);
      }
    }
  };

  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    try {
      const added = await createTodo(newTodo);
      setTodos([...todos, added]);
      setNewTodo('');
    } catch (err) {
      if (err.message.toLowerCase().includes('session expirée')) {
        handleAuthError();
      } else {
        alert('Erreur : ' + err.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      if (err.message.toLowerCase().includes('session expirée')) {
        handleAuthError();
      } else {
        alert('Erreur : ' + err.message);
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">📝 Tableau de bord ToDo</Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
            Se déconnecter
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <TextField
          label="Nouvelle tâche"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          sx={{ marginRight: 2, width: '60%' }}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Ajouter
        </Button>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Terminé</TableCell>
                <TableCell>Titre</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.length > 0 ? (
                todos.map((todo) => (
                  <TableRow key={todo.id} hover>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleToggle(todo)}
                      />
                    </TableCell>
                    <TableCell sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.title}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="delete" color="error" onClick={() => handleDelete(todo.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Aucune tâche disponible
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}

export default Dashboard;
