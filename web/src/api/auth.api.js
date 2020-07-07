import axios from 'axios';

export const REGISTER = async (user) => {
  return await axios.post('/api/users', user);
};

export const LOGIN = async (credentials) => {
  return await axios.post('/api/auth/login', credentials);
};
