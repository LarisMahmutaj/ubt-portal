import axios from "axios"

const state = {
  user: null,
  loggedIn: false,
}

const getters = {
  loggedIn: (state) => state.loggedIn,
  user: (state) => state.user,
}

const actions = {
  /*eslint-disable*/
  async register({ commit }, newUser) {
    await axios.post("http://localhost:3000/users", newUser)
  },

  async login({ commit }, credentials) {
    await axios
      .post("http://localhost:3000/auth/login", credentials)
      .then((response) => commit("SET_USER_DATA", response.data))
      .catch((error) => console.log(error.message))
  },

  async logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("CLEAR_USER_DATA")
      localStorage.removeItem("user")
      delete axios.defaults.headers.common["Authorization"]
      resolve()
    })
  },
}

const mutations = {
  SET_USER_DATA: (state, user) => {
    state.user = user
    state.loggedIn = true
    localStorage.setItem("user", JSON.stringify(user))
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${user.access_token}`
  },
  CLEAR_USER_DATA: (state) => {
    state.user = null
    state.loggedIn = false
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
