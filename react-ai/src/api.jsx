import axios from 'axios';

const apiURL = 'http://todo-list-app-backend:80/todos';

export const fetchTodos = async () => {
  const response = await axios.get(apiURL);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(`${apiURL}/`, todo);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${apiURL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${apiURL}/${id}`);
  return response.data;
};
