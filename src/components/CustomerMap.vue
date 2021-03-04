<template>
  <div>
    <v-container>
      <!-- <v-btn color="secondary" @click="drawer = true">
        open drawer
      </v-btn> -->
      <GoogleMap
        @handleMarkerClick="showPharmacyInfo"
      />
      <v-navigation-drawer v-model="drawer" :width="400" absolute bottom temporary right>
        <v-sheet>
          <h1 align="center" style="margin: 25px">{{ currentPharmacyName }}</h1>
          <p align="center" style="margin: 25px">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
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
import GoogleMap from './GoogleMap.vue';

export default {
  name: 'Home',
  components: {
    GoogleMap,
  },
  data() {
    return {
      currentPharmacyId: -1,
      currentPharmacyName: '',
      drawer: false,
    };
  },
  methods: {
    showPharmacyInfo(pharmacy) {
      this.currentPharmacyId = pharmacy.id;
      this.currentPharmacyName = pharmacy.name;
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
