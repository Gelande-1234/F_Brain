import React, { useEffect, useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,
  Checkbox, IconButton, TextField, Button, Box, Drawer, List,
  ListItem, ListItemText, ListItemIcon, Divider
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useTodosApi } from './api/todos';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';

const drawerWidth = 240;

function Dashboard() {
  const { logout, accessToken } = useContext(AuthContext);

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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <Typography variant="h6">Menu</Typography>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Déconnexion" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap component="div">
              📝 Tableau de bord ToDo
            </Typography>
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
              Se déconnecter
            </Button>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Container maxWidth={false} sx={{ px: 4 }}>
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} mb={3}>
            <TextField
              label="Nouvelle tâche"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              fullWidth
              sx={{ mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}
            />
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
              Ajouter
            </Button>
          </Box>

          <Paper elevation={3}>
            <TableContainer>
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
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
