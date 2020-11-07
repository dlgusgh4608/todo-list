import axios from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getTodos = async () => {
  return await axios.get(`${API_ENDPOINT}/v1/todos`);
};

export const createTodo = async (content) => {
  return await axios.post(`${API_ENDPOINT}/v1/todos`, { content });
};

export const deleteTodo = async (id) => {
  return await axios.delete(`${API_ENDPOINT}/v1/todos/${id}`);
};

export const toggleTodo = async (id) => {
  return await axios.put(`${API_ENDPOINT}/v1/toggleTodo/${id}`);
};

export const updateTodo = async (id, content) => {
  return await axios.put(`${API_ENDPOINT}/v1/todos/${id}/${content}`);
};
