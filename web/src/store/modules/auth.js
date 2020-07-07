import axios from 'axios';
import { REGISTER, LOGIN } from '../../api/auth.api';

const state = {
  user: null,
  loggedIn: false,
  error: '',
};

const getters = {
  loggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
  error: (state) => state.error,
};

const actions = {
  /*eslint-disable*/
  async register({ commit }, newUser) {
    await REGISTER(newUser);
  },

  async login({ commit }, credentials) {
    const response = await LOGIN(credentials);
    commit('SET_USER_DATA', response.data);
  },

  async logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_USER_DATA');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      resolve();
    });
  },

  async setError({ commit }, error) {
    commit('SET_ERROR', error);
  },
};

const mutations = {
  SET_USER_DATA: (state, user) => {
    state.user = user;
    state.loggedIn = true;
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.access_token}`;
  },
  CLEAR_USER_DATA: (state) => {
    state.user = null;
    state.loggedIn = false;
  },
  SET_ERROR: (state, error) => {
    state.error = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
