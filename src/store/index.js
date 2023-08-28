import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  actions: {
  },
  mutations: {
    setIsLoggedIn(state, v) {
      state.isLoggedIn = v
    }
  }
})