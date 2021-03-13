<template>
  <div>
    <v-container>
      <GoogleMap
        :places="pharmacies"
        @handleMarkerClick="showPharmacyInfo"
      />
      <v-navigation-drawer v-model="drawer" :width="400" absolute bottom temporary right>
        <v-sheet>
          <h1 align="center" style="margin: 25px">{{ currentPharmacyName }}</h1>
          <p align="center" style="margin: 25px">{{ currentPharmacyDescription }}</p>
          <v-row justify="center">
            <v-btn color="secondary">
              Chat
            </v-btn>
          </v-row>
        </v-sheet>
      </v-navigation-drawer>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import GoogleMap from './GoogleMap.vue';

const database = firebase.database();

export default {
  name: 'CustomerMap',
  components: {
    GoogleMap,
  },
  data() {
    return {
      pharmacies: {},
      currentPharmacyId: '',
      currentPharmacyName: '',
      currentPharmacyDescription: '',
      drawer: false,
    };
  },
  created() {
    this.setPharmacies();
  },
  methods: {
    setPharmacies() {
      const pharmaciesRef = database.ref('/registered-pharmacies');
      pharmaciesRef.on('value', (pharmaciesSnap) => {
        const pharms = {};
        pharmaciesSnap.forEach((pharmacy) => {
          pharms[pharmacy.key] = pharmacy.val();
        });
        this.pharmacies = pharms;
      });
    },
    showPharmacyInfo(key, pharmacy) {
      this.currentPharmacyId = key;
      this.currentPharmacyName = pharmacy.name;
      this.currentPharmacyDescription = pharmacy.description;
      this.drawer = true;
    },
  },
};
</script>

<style scoped>
.card {
  padding: 10px;
  flex: 1;
  /* border-radius: 20px; */
}
</style>
