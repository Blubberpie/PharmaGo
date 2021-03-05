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
      <button type="submit" value="submit" class="btn">Login</button>
      </form>
      <div>or Sign in with 3rd Party</div>
    <button id="google" @click="loginWithThirdParty" class="btn-pic">
      <img src="../assets/google-logo.png" alt width="100px" height="100px">
    </button>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "LoginPage",
  data: function() {
            return { email: "", password: "" };
        },
  methods: {
       login(e) {
            firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
                 user => {
                    this.$router.replace("home");
                 },
                 err => {
                    alert(err.message)
                 });
            e.preventDefault();
       },
       loginWithProvider(e) {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase
            .auth()
            .signInWithPopup(provider)
            .then(
                 user => {
                    this.$router.replace("home")
                 },
                 err => {
                    alert(err.message)
                 });
       }
  }
}
</script>