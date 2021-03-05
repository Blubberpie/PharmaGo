/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

import Auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    user: null,
    status: null,
    error: null,

  },
  mutations: {

    setUser(state, payload) {
      state.user = payload;
    },

    removeUser(state) {
      state.user = null;
    },

    setStatus(state, payload) {
      state.status = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    signUpAction({ commit }, payload) {
      commit('setStatus', 'loading');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success');
          // response will have user
          // user will have uid will be updated to the state
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    },

    signInAction({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    },
    googleSignInAction() {
      const provide = new firebase.auth.GoogleAuthProvider().addScope('email');
      firebase
        .auth()
        .signInWithPopup(provide)
        .then((result) => {
          // create user in db
          const obj = {
            google_id: result.additionalUserInfo.profile.id,
            fullname: result.additionalUserInfo.profile.name,
            email: result.additionalUserInfo.profile.email,
            profile_image: result.additionalUserInfo.profile.picture,
            user_type_id: 1,
          };
          console.log(obj);
        })
        .catch((err) => {
          alert(err.message);
        });
    },

    signOutAction({ commit }) {
      firebase.auth().signOut()
        .then((response) => {
          console.log(response);
          commit('setUser', null);
          commit('setStatus', 'success');
          commit('setError', null);
        })
        .catch((error) => {
          commit('setStatus', 'failure');
          commit('setError', error.message);
        });
    },
    signUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (response) => {
            const newUser = {
              id: response.user.uid,
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            console.log(error);
          },
        );
    },
    signIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (response) => {
            const newUser = {
              id: response.user.uid,
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            console.log(error);
          },
        );
    },
  },

  getters: {

    status(state) {
      return state.status;
    },

    user(state) {
      return state.user;
    },

    error(state) {
      return state.error;
    },
  },
});

Vue.$store = store;
export default store;
