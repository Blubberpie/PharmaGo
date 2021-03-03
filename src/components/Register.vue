<template>
     <v-app class='background'>
      <v-container class='mt-15 '>
        <v-layout row align-center justify-center class='mt-15 '>
          <v-flex xs12 md6 sm6 class=''>
            <v-text-field class='ml-5 mr-5' outlined v-model='username'
              label="Username">
            </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='email' outlined :rules="emailRules"
              label="Email">
            </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='password' outlined
              label="Password"
              type="password">
            </v-text-field>
            <v-select class='ml-5 mr-5'
            :items="types"
            label="Type"
            v-model="role"
            outlined
            ></v-select>
            <v-btn depressed block primary @click="Register"
            class='teal lighten-3 white--text'>Register
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const database = firebase.database();

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: '',
      emailRules: [
        (v) => /[a-zA-z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}/.test(v) || 'Invalid email',
      ],
      types: ['Customer', 'Pharmacy', 'Driver'],
    };
  },
  methods: {
    async Register() {
      try {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (cred) => {
            database.ref(`/user/${cred.user.uid}`).push({
              username: this.username,
              role: this.role,
            });
          },
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
