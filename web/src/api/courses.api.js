import axios from 'axios';

var u = JSON.parse(localStorage.getItem('user'));
axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;

export const GET_COURSES = async () => {
  return await axios.get('/api/courses');
};

export const GET_COURSE = async (id) => {
  return await axios.get(`/api/courses/${id}`);
};

export const GET_COURSE_POSTS = async (id) => {
  return await axios.get(`/api/courses/${id}/posts`);
};

export const CREATE_COURSE_POST = async (courseId, post) => {
  return await axios.post(`/api/courses/${courseId}`, post);
};

export const UPDATE_COURSE_POST = async (courseId, postId, post) => {
  return await axios.patch(`/api/courses/${courseId}/posts/${postId}`, post);
};

export const DELETE_COURSE_POST = async (courseId, postId) => {
  return await axios.delete(`/api/courses/${courseId}/posts/${postId}`);
};
