import '@/plugins/firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Vue from 'vue';
import VueGeolocation from 'vue-browser-geolocation';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(VueGeolocation);

let isInitialized = false;
const database = firebase.database();

// Persist user
new Promise((resolve) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      Vue.$store.dispatch('auth/setAuthenticatedUser', user);
      const userCredRef = database.ref(`/user/${user.uid}/credentials/`);
      userCredRef.once('value', (credSnap) => {
        Vue.$store.dispatch('auth/setAuthenticatedUserRole', credSnap.val().role);
      });
    } else {
      Vue.$router.push({ name: 'home' }).catch(() => {});
    }
    if (!isInitialized) {
      resolve();
    }
  });
}).then(() => {
  isInitialized = true;
  new Vue({
    render: (h) => h(App),
    router,
    store,
    vuetify,
  }).$mount('#app');
});
