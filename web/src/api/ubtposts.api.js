import axios from 'axios';

var u = JSON.parse(localStorage.getItem('user'));
axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;

export const GET_UBTPOSTS = async () => {
  return await axios.get('/api/ubtposts');
};

export const CREATE_UBTPOST = async (post) => {
  return await axios.post('/api/ubtposts', post);
};

export const DELETE_UBTPOST = async (id) => {
  return await axios.delete(`/api/ubtposts/${id}`);
};

export const UPDATE_UBTPOST = async (id, post) => {
  await axios.put(`/api/ubtposts/${id}`, post);
};
