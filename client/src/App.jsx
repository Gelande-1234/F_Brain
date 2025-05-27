import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, IconButton, TextField, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

import { getTodos, toggleComplete, createTodo, deleteTodo } from './api/todos';

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fonction pour gérer la déconnexion automatique en cas de session expirée
  const handleAuthError = () => {
    alert("Votre session a expiré. Veuillez vous reconnecter.");
    localStorage.clear();
    window.location.href = '/login';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (err) {
        console.error('Erreur de récupération des tâches:', err);
        // Ici on détecte la session expirée selon le message d'erreur (à adapter si besoin)
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
      console.error('Erreur lors de la mise à jour:', err);
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
      console.error('Erreur lors de l\'ajout:', err);
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
      console.error('Erreur lors de la suppression:', err);
      if (err.message.toLowerCase().includes('session expirée')) {
        handleAuthError();
      } else {
        alert('Erreur : ' + err.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">📝 Tableau de bord ToDo</Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
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
                    <TableCell
                      sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                      {todo.title}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => handleDelete(todo.id)}
                      >
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
