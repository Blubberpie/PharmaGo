<template>
  <div>
    <v-toolbar
      flat
    >
      <v-toolbar-tital >PharmaGo</v-toolbar-tital>
      <v-spacer></v-spacer>
      <v-btn class= "ma-5" color="secondary" @click='toLogin'>
          <v-icon>
              mdi-login
          </v-icon>
          Login</v-btn>
     <v-btn color="secondary">
          <v-icon>
              mdi-account
          </v-icon>
          Register</v-btn>
        <!-- <v-btn class="hidden-xs-only" v-if="userLogedIn"
          text @click='logoutFromFirebase'
          >
          <span>Sign Out</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn> -->
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  //   computed: {
  //     userLogedIn() {
  //       return this.$store.getters.user;
  //     },
  //   },
  methods: {
    // logoutFromFirebase() {
    //   this.$store.dispatch('signOutAction');
    //   this.$router.push('/');
    // },
    toLogin() {
      this.$router.push('/Login');
    },
  },
};
</script>
