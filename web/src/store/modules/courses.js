import {
  GET_COURSES,
  GET_COURSE,
  GET_COURSE_POSTS,
  CREATE_COURSE_POST,
  UPDATE_COURSE_POST,
  DELETE_COURSE_POST,
} from '../../api/courses.api';

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
    const response = await GET_COURSES();
    commit('SET_COURSES', response.data);
  },
  async setCurrentCourse({ commit }, courseId) {
    const response = await GET_COURSE(courseId);
    commit('SET_CURRENT_COURSE', response.data);
  },
  async fetchCoursePosts({ commit }, courseId) {
    const response = await GET_COURSE_POSTS(courseId);
    commit('SET_COURSE_POSTS', response.data);
  },

  async createCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const newPost = data.newPost;
    const response = await CREATE_COURSE_POST(courseId, newPost);
    commit('ADD_POST', response.data);
  },
  async editCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const coursePost = data.coursePost;
    const response = UPDATE_COURSE_POST(
      courseId,
      coursePost.postId,
      coursePost
    );
    commit('EDIT_POST', response.data);
  },
  async deleteCoursePost({ commit }, data) {
    const courseId = data.courseId;
    const postId = data.postId;
    const response = await DELETE_COURSE_POST(courseId, postId);

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
