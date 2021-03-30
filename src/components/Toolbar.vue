<template>
  <nav>
    <v-app-bar flat app>
      <v-toolbar-title>PharmaGo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="ma-5" text to="/">Home</v-btn>
      <v-menu
        transition="slide-y-transition"
        open-on-hover
        bottom
        offset-y
        v-for="(tool, index) in tools"
        :key="index"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-5" text v-bind="attrs" v-on="on"
            >{{ tool.title }}
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list v-if="tool.title === 'Service'">
          <v-list-item v-if="userRole === 'Customer'" link to="/customer/map">
            <v-list-item-title>Pick a Pharmacy</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userRole === 'Customer'" link to="/customer/pending-prescriptions">
            <v-list-item-title>Manage Pending Prescriptions</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userRole === 'Pharmacy'" link to="/pharmacy/register-pharmacy">
            <v-list-item-title>Register a Pharmacy</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userRole === 'Customer' || userRole === 'Pharmacy'" link to="/chat">
            <v-list-item-title>Manage Ongoing Chats</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item v-for="(item, index) in items" :key="index" link>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="ma-5" color="secondary" to="/login" v-if="!loggedIn">
        <span>Login</span>
        <v-icon>
          mdi-login
        </v-icon>
      </v-btn>
      <v-btn color="secondary" to="/register" v-if="!loggedIn">
        <span>Register</span>
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
      <v-btn class="hidden-xs-only" v-if="loggedIn" text>
        <span>Account</span>
        <v-icon right>mdi-account</v-icon>
      </v-btn>
      <v-btn class="hidden-xs-only" v-if="loggedIn" text @click="logoutFromFirebase">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data: () => ({
    loggedIn: false,
    userCredRef: null,
    tools: [{ title: 'About' }, { title: 'Service' }, { title: 'Contact' }],
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
  computed: {
    ...mapState({
      userRole: (state) => state.auth.userRole,
    }),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.loggedIn = user;
    });
  },
  methods: {
    async logoutFromFirebase() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go(); // Refresh the page
        });
    },
  },
};
</script>
