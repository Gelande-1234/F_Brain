import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const fetchTodos = () => API.get('todos/');
export const createTodo = (data) => API.post('todos/', data);
export const updateTodo = (id, data) => API.put(`todos/${id}/`, data);
export const deleteTodo = (id) => API.delete(`todos/${id}/`);