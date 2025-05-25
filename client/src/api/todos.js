import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const fetchTodos = () => API.get('todos/');
export const createTodo = (data) => API.post('todos/', data);
