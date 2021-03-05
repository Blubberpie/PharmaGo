export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuthenticatedUser(context, user) {
      context.commit('setUser', user);
    },
    signOutAction({ commit }) {
      firebase.auth().signOut()
        .then((response) => {
          console.log(response);
          commit('setUser', null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
    user(state) {
      return state.user;
    },
  },
};
