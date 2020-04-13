import axios from "axios";

const state = {
  ubtposts: []
};

const getters = {
  allUbtposts: state => state.ubtposts.reverse()
};

const actions = {
  async fetchUbtposts({ commit }) {
    const response = await axios.get("http://localhost:3000/ubtposts");

    commit("SET_UBTPOSTS", response.data);
  },

  async createUbtpost({ commit }, ubtpost) {
    const response = await axios.post(
      "http://localhost:3000/ubtposts",
      ubtpost
    );

    commit("ADD_POST", response.data);
  },

  async deleteUbtpost({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/ubtposts/${id}`);

    commit("DELETE_UBTPOST", response.data);
  }
};

const mutations = {
  SET_UBTPOSTS: (state, ubtposts) => {
    state.ubtposts = ubtposts;
  },
  ADD_POST: (state, ubtpost) => {
    state.ubtposts.push(ubtpost);
  },
  DELETE_UBTPOST: (state, ubtpost) => {
    var id = ubtpost._id;
    state.ubtposts.filter(post => post._id === id);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
