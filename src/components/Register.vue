<template>
     <v-app class='background'>
        <v-container class='mt-15 '>
        <v-layout row align-center justify-center class='mt-15 '>
        <v-flex xs12 md6 sm6 class=''>
                <!-- <v-form > -->
                <v-text-field class='ml-5 mr-5' outlined v-model='Username'
                  label="Username">
                </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='Email' outlined :rules="emailRules"
              label="Email">
            </v-text-field>
            <v-text-field class='ml-5 mr-5' v-model='Password' outlined
              label="Password"
             type="password">
            </v-text-field>
            <v-select class='ml-5 mr-5'
            :items="types"
            label="Type"
            v-model="Role"
            outlined
            ></v-select>
                <!-- <v-card-actions class='justify-center'> -->
                <v-btn depressed block primary @click="Register"
                class='teal lighten-3 white--text'>Register
                </v-btn>
                <!-- </v-card-actions> -->
                <!-- </v-form> -->
            <!-- </v-card> -->
        </v-flex>

        </v-layout>
        </v-container>
    </v-app>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      Username: '',
      Email: '',
      Password: '',
      Role: '',
      emailRules: [
        (v) => /[a-zA-z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}/.test(v) || 'Invalid email',
      ],
      types: ['Customer', 'Pharmacy', 'Driver'],
    };
  },
  methods: {
    async Register() {
      try {
        console.log(this.Email);
        console.log(this.Password);
        firebase.auth().createUserWithEmailAndPassword(this.Email, this.Password).then(
          (cred) => { console.log(cred); },
        );
        console.log('success');
        // this.$router.replace({ name: 'Login' });
      } catch (e) {
        console.log('failed');
        console.log(e);
      }
    },
  },
};
</script>
