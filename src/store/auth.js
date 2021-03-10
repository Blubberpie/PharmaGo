export default {
  state: {
    user: null,
    userRole: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
  },
  actions: {
    setAuthenticatedUser(context, user) {
      context.commit('setUser', user);
    },
    setAuthenticatedUserRole(context, role) {
      context.commit('setUserRole', role);
    },
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
  },
};
