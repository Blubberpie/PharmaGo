<template>
  <div>
    <v-row>
      <v-spacer/>
      <v-col
        cols="12"
        sm="10"
        md="7"
      >
        <h1 class="large-title">Login</h1>
        <v-text-field outlined
          v-model="email"
          placeholder="Enter your email address here"
          autofocus
        />
        <v-text-field outlined
          v-model="password"
          type="password"
          placeholder="Enter your password here"
          @keyup.enter="doLogin"
        />
        <p class="error-text" if="errorMessage">{{ errorMessage }}</p>
        <v-row class="pl-4 pr-4">
          <v-btn color="secondary" @click="goRegister">Create a New Account</v-btn>
          <v-spacer/>
          <v-btn color="secondary" @click="doLogin">Confirm</v-btn>
        </v-row>
      </v-col>
      <v-spacer/>
    </v-row>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const database = firebase.database();

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (this.$route.path !== '/') this.$router.push({ name: 'home' });
      }
    });
  },
  methods: {
    async doLogin() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          const { user } = userCredential;
          this.$store.dispatch('auth/setAuthenticatedUser', user);
          this.userCredRef = database.ref(`/user/${user.uid}/credentials/`);
          this.userCredRef.once('value', (credSnap) => {
            this.$store.dispatch('auth/setAuthenticatedUserRole', credSnap.val().role);
          });
          // this.$router.push({ name: 'home' }); // This is handled at created()
        },
        (err) => {
          this.errorMessage = err.message;
        });
    },
    goRegister() {
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style>
  .large-title {
    color: #6C9FAA;
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .error-text {
    color: #E80047;
  }
</style>
