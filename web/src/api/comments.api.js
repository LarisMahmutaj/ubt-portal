import axios from 'axios';
var u = JSON.parse(localStorage.getItem('user'));
if (u) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;
}

export const GET_POST_COMMENTS = async (postId, courseId) => {
  if (courseId) {
    return await axios.get(`/api/courses/${courseId}/posts/${postId}/comments`);
  } else {
    return await axios.get(`/api/ubtposts/${postId}/comments`);
  }
};

export const GET_POST_COMMENT_COUNT = async (postId, courseId) => {
  if (courseId) {
    return await axios.get(
      `/api/courses/${courseId}/posts/${postId}/comments/count`
    );
  }
  return await axios.get(`/api/ubtposts/${postId}/comments/count`);
};

export const CREATE_POST_COMMENT = async (postId, comment, courseId) => {
  if (courseId) {
    return await axios.post(
      `/api/courses/${courseId}/posts/${postId}/comments`,
      comment
    );
  } else {
    return await axios.post(`/api/ubtposts/${postId}/comments`, comment);
  }
};

export const DELETE_UBTPOST_COMMENT = async (commentId, courseId) => {
  if (courseId) {
    return await axios.delete(`/api/courses/${courseId}/comments/${commentId}`);
  } else {
    return await axios.delete(`/api/ubtposts/comments/${commentId}`);
  }
};
