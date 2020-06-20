import axios from 'axios';

const state = {
  courses: [],
  currentCourse: null,
  coursePosts: [],
};

const getters = {
  allCourses: (state) => state.courses,
  currentCourse: (state) => state.currentCourse,
  coursePosts: (state) => state.coursePosts,
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
  async fetchCoursePosts({ commit }, data) {
    const response = await axios.post(
      `http://localhost:3000/courses/${data.courseId}/ubtposts`,
      { token: data.token }
    );

    commit('SET_COURSE_POSTS', response.data);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
