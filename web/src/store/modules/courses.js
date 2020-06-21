import axios from 'axios';

const state = {
  courses: [],
  currentCourse: null,
  coursePosts: [],
};

const getters = {
  allCourses: (state) => state.courses,
  currentCourse: (state) => state.currentCourse,
  allCoursePosts: (state) => state.coursePosts,
};

const actions = {
  async fetchCourses({ commit }) {
    var u = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;

    const response = await axios.get('http://localhost:3000/courses');
    commit('SET_COURSES', response.data);
  },
  async setCurrentCourse({ commit }, courseId) {
    const response = await axios.get(
      `http://localhost:3000/courses/${courseId}`
    );

    commit('SET_CURRENT_COURSE', response.data);
  },
  async fetchCoursePosts({ commit }, courseId) {
    var u = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;
    const response = await axios.get(
      `http://localhost:3000/courses/${courseId}/posts`
    );
    commit('SET_COURSE_POSTS', response.data);
  },

  async createCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const newPost = data.newPost;
    const response = await axios.post(
      `http://localhost:3000/courses/${courseId}/posts`,
      newPost
    );

    commit('ADD_POST', response.data);
  },
  async editCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const coursePost = data.coursePost;
    const response = await axios.patch(
      `http://localhost:3000/courses/${courseId}/posts/${coursePost.postId}`,
      coursePost
    );

    commit('EDIT_POST', response.data);
  },
  async deleteCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const postId = data.postId;
    const response = await axios.delete(
      `http://localhost:3000/courses/${courseId}/posts/${postId}`
    );

    commit('DELETE_POST', response.data);
  },
};

const mutations = {
  SET_COURSES: (state, courses) => {
    state.courses = courses;
  },
  SET_CURRENT_COURSE: (state, course) => {
    state.currentCourse = course;
  },

  SET_COURSE_POSTS: (state, posts) => {
    state.coursePosts = posts;
  },
  ADD_POST: (state, post) => {
    state.coursePosts.push(post);
  },
  EDIT_POST: (state, post) => {
    let elementIndex = state.coursePosts.findIndex(
      (element) => element.postId == post.postId
    );

    let newArray = { ...state.coursePosts };
    newArray[elementIndex] = post;

    state.coursePosts = newArray;
  },
  DELETE_POST: (state, post) => {
    var id = post.postId;
    state.coursePosts.filter((p) => p.postId === id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
