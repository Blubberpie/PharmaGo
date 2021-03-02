<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="15" sm="10" md="5">
            <v-card class="mx-auto" elevation="5" color="primary" max-width="400">
                <h1 align="center">Login</h1>
                <div class="text-center mt-4">
                    <v-btn @click="googleLogin" class="mx-2" fab color="black" outlined>
                    <v-icon>mdi-google</v-icon>
                    </v-btn>
                </div>
                <v-form>
                    <v-text-field
                    label="Email"
                    v-model="email"
                    prepend-icon="mdi-email"
                    type="text"
                    color="teal accent-3"
                    />
                    <v-text-field
                        v-model="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        color="teal accent-3"
                        />
                    <v-btn @click="loginWithFirebase" :loading="loading"
                     color="secondary" dark>SIGN IN</v-btn>
                </v-form>
            </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    googleLogin() {
      this.$store.dispatch('googleSignInAction');
    },
    loginWithFirebase() {
      this.loading = true;
      console.log(this.email);
      console.log(this.password);
      const user = {
        email: this.email,
        password: this.password,
      };
      console.log(user);
      this.$store.dispatch('signIn', { email: this.email, password: this.password });
      console.log('success');
      this.loading = false;
    },
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmedPassword ? 'Password do not match' : true;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/');
      }
    },
  },
};
</script>
