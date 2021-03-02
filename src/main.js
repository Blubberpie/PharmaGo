import '@/plugins/firebase';
// import firebase from 'firebase/app';
// import 'firebase/auth';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify,
}).$mount('#app');

// Persist user
// new Promise((resolve) => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       Vue.$store.dispatch('auth/setAuthenticatedUser', user);
//     } else {
//       Vue.$store.dispatch('auth/setAuthenticatedUser', user);
//       Vue.$router.push({ name: 'login' }).catch(() => {});
//     }
//     if (!isInitialized) {
//       resolve();
//     }
//   });
// }).then(() => {
//   isInitialized = true;
//   new Vue({
//     render: (h) => h(App),
//     router,
//     store,
//     vuetify,
//   }).$mount('#app');
// });
