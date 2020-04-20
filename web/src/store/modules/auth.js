import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  loggedIn: (state) => state.user,
};

const actions = {
  async login({ commit }, credentials) {
    const response = await axios
      .post('http://localhost:3000/auth/login', credentials)
      .then(commit('SET_USER_DATA', response.data))
      .catch((error) => console.log(error.message));
  },
};

const mutations = {
  SET_USER_DATA: (state, user) => {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.access_token}`;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
