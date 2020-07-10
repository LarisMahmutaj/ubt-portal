import axios from 'axios';
var u = JSON.parse(localStorage.getItem('user'));
if (u) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;
}

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

export const GET_POST_COMMENTS = async (id) => {
  return await axios.get(`/api/ubtposts/${id}/comments`);
};

export const CREATE_UBTPOST_COMMENT = async (postId, comment, courseId) => {
  if (courseId) {
    return await axios.post(
      `/api/courses/${courseId}/posts/${postId}comments`,
      comment
    );
  } else {
    return await axios.post(`/api/ubtposts/${postId}/comments`, comment);
  }
};
