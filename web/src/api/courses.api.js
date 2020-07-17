import axios from 'axios';

var u = JSON.parse(localStorage.getItem('user'));
if (u) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;
}

export const GET_COURSES = async () => {
  return await axios.get('/api/courses');
};

export const GET_JOINED_COURSES = async () => {
  return await axios.get('/api/courses/joined');
};

export const GET_USER_COURSES = async () => {
  return await axios.get('/api/courses/my');
};

export const GET_COURSE = async (id) => {
  return await axios.get(`/api/courses/${id}`);
};

export const CREATE_COURSE = async (course) => {
  return await axios.post('/api/courses', course);
};

export const GET_COURSE_POSTS = async (id) => {
  return await axios.get(`/api/courses/${id}/posts`);
};

export const CREATE_COURSE_POST = async (courseId, post) => {
  return await axios.post(`/api/courses/${courseId}/posts`, post);
};

export const UPDATE_COURSE_POST = async (courseId, postId, post) => {
  return await axios.patch(`/api/courses/${courseId}/posts/${postId}`, post);
};

export const DELETE_COURSE_POST = async (courseId, postId) => {
  return await axios.delete(`/api/courses/${courseId}/posts/${postId}`);
};

export const SEND_INVITE = async (courseId, email) => {
  return await axios.post(`/api/courses/${courseId}/invitations`, {
    userEmail: email,
  });
};

export const GET_USER_INVITES = async () => {
  return await axios.get('/api/invitations');
};

export const UPDATE_INVITATION = async (courseId, accepted) => {
  return await axios.patch(`/api/invitations/${courseId}`, accepted);
};

export const SEARCH_USERS = async (courseId, text) => {
  return await axios.post(`api/courses/${courseId}/search-users`, {
    text: text,
  });
};
