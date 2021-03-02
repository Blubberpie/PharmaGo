<template>
  <div>
    <v-toolbar
      flat
    >
      <v-toolbar-title >PharmaGo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class= "ma-5" text @onclick="home">Home</v-btn>
      <v-menu
      open-on-hover
      bottom
      offset-y
      v-for="(tool, index) in tools"
      :key="index"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class= "ma-5"
          text
          v-bind="attrs"
          v-on="on"
        >{{ tool.title }}
        <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>
      <v-btn class= "ma-5" color="secondary" @click='toLogin' v-if="!userLogedIn">
          <v-icon>
              mdi-login
          </v-icon>
          Login</v-btn>
     <v-btn color="secondary" @click='toRegister' v-if="!userLogedIn">
          <v-icon>
              mdi-account
          </v-icon>
          Register</v-btn>
          <v-btn class="hidden-xs-only" v-if="userLogedIn"
          text @click='logoutFromFirebase'
          >
          <span>Account</span>
          <v-icon right>mdi-account</v-icon>
        </v-btn>
        <v-btn class="hidden-xs-only" v-if="userLogedIn"
          text @click='logoutFromFirebase'
          >
          <span>Sign Out</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    tools: [
      { title: 'About' },
      { title: 'Service' },
      { title: 'Contact' },
    ],
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
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
    logoutFromFirebase() {
      this.$store.dispatch('signOutAction');
      this.$router.push('/');
    },
    toLogin() {
      this.$router.push('/Login');
    },
    toRegister() {
      this.$router.push('/Register');
    },
    home() {
      this.$router.push('/');
    },
  },
  computed: {
    userLogedIn() {
      return this.$store.getters.user;
    },
  },
};
</script>
