<template>
  <div id="login" class="main-box">
    <form @submit="loginWithEmail">
      <h1>Login</h1>
      <div class="title">
        <h3>Email</h3>
        <input v-model="email" type="text" class="input" placeholder="Email">
      </div>
      <div class="title">
        <h3>Password</h3>
        <input v-model="password" type="password" class="input" placeholder="Password">
      </div>
      <p if="errorMessage">{{ errorMessage }}</p>
      <button type="submit" value="submit" class="btn">Login</button>
      </form>
      <div>or Sign in with 3rd Party</div>
    <button id="google" @click="loginWithProvider" class="btn-pic">
      <img src="../assets/google-logo.png" alt width="100px" height="100px">
    </button>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    loginWithEmail(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (userCredential) => {
            const { user } = userCredential;
            this.$store.dispatch('auth/setAuthenticatedUser', user);
            this.$router.push('home');
          },
          (err) => {
            this.errorMessage = err.message;
          },
        );
      e.preventDefault();
    },
    loginWithProvider() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          (userCredential) => {
            const { user } = userCredential;
            this.$store.dispatch('auth/setAuthenticatedUser', user);
            this.$router.push('home');
          },
          (err) => {
            this.errorMessage = err.message;
          },
        );
    },
  },
};
</script>
