export default {
  state: {
    user: null,
    username: '',
    userRole: '',
    uid: '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setUserName(state, username) {
      state.username = username;
    },
    setUid(state, uid) {
      state.uid = uid;
    },
  },
  actions: {
    setAuthenticatedUser(context, user) {
      context.commit('setUser', user);
    },
    setAuthenticatedUserRole(context, role) {
      context.commit('setUserRole', role);
    },
    setAuthenticatedUserName(context, username) {
      context.commit('setUserName', username);
    },
    setUid(context, uid) {
      context.commit('setUid', uid);
    },
  },
  getters: {
    authenticated(state) {
      return state.user != null;
    },
    getUserRole(state) {
      return state.userRole;
    },
  },
};
