<template>
  <div>
    <v-row>
      <v-spacer/>
      <v-col
        cols="15"
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
          autofocus
        />
        <p class="error-text" if="errorMessage">{{ errorMessage }}</p>
        <v-row class="pl-4 pr-4">
          <v-btn color="secondary" @click="goRegister">Create a New Account</v-btn>
          <v-spacer/>
          <v-btn color="primary" @click="doLogin">Confirm</v-btn>
        </v-row>
      </v-col>
      <v-spacer/>
    </v-row>
  </div>
</template>

<script>
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
  },
  methods: {
    doLogin() {
    },
    goRegister() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style>
  .large-title {
    color: #00a2e1;
    text-align: center;
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  .error-text {
    color: #E80047;
  }
</style>