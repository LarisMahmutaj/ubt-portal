import {
  GET_UBTPOSTS,
  CREATE_UBTPOST,
  DELETE_UBTPOST,
  UPDATE_UBTPOST,
} from '../../api/ubtposts.api';

const state = {
  ubtposts: [],
};

const getters = {
  allUbtposts: (state) => state.ubtposts,
};

const actions = {
  async fetchUbtposts({ commit }) {
    const response = await GET_UBTPOSTS();
    commit('SET_UBTPOSTS', response.data);
  },

  async createUbtpost({ commit }, ubtpost) {
    const response = await CREATE_UBTPOST(ubtpost);
    commit('ADD_POST', response.data);
  },

  async deleteUbtpost({ commit }, id) {
    const response = await DELETE_UBTPOST(id);
    commit('DELETE_UBTPOST', response.data);
  },

  async editUbtpost({ commit }, ubtpost) {
    await UPDATE_UBTPOST(ubtpost.postId, ubtpost);
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
