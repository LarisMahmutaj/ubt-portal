import axios from 'axios';

const state = {
  ubtposts: [],
};

const getters = {
  allUbtposts: (state) => state.ubtposts,
};

const actions = {
  async fetchUbtposts({ commit }) {
    var u = JSON.parse(localStorage.getItem('user'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${u.access_token}`;

    const response = await axios.get('http://localhost:3000/ubtposts');
    commit('SET_UBTPOSTS', response.data);
  },

  async createUbtpost({ commit }, ubtpost) {
    const response = await axios.post(
      'http://localhost:3000/ubtposts',
      ubtpost
    );
    commit('ADD_POST', response.data);
  },

  async deleteUbtpost({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/ubtposts/${id}`);
    commit('DELETE_UBTPOST', response.data);
  },

  async editUbtpost({ commit }, ubtpost) {
    await axios.put(
      `http://localhost:3000/ubtposts/${ubtpost.postId}`,
      ubtpost
    );
    commit('EDIT_UBTPOST', ubtpost);
  },
};

const mutations = {
  SET_UBTPOSTS: (state, ubtposts) => {
    state.ubtposts = ubtposts;
  },

  ADD_POST: (state, ubtpost) => {
    state.ubtposts.push(ubtpost);
  },

  DELETE_UBTPOST: (state, ubtpost) => {
    var id = ubtpost.postId;
    state.ubtposts.filter((post) => post.postId === id);
  },

  EDIT_UBTPOST: (state, ubtpost) => {
    let elementIndex = state.ubtposts.findIndex(
      (element) => element.postId == ubtpost.postId
    );
    let newArray = { ...state.ubtposts };

    newArray[elementIndex] = ubtpost;

    state.ubtposts = { ...newArray };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
