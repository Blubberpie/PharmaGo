<template>
  <v-container fluid class="ma-3">
    <v-row>
      <v-col
        md=8
        sm=6
      >
        <div id="map"></div>
      </v-col>
      <v-col
        class="pr-10"
        md=4
        sm=6
      >
        <v-form
          ref="registerPharmacyForm"
          v-model="formIsValid"
        >
          <h1 class="pb-4">Register Your Pharmacy</h1>
          <v-text-field
            v-model="pharmacyName"
            label="Pharmacy Name"
            :rules="formRules"
            required
            outlined
          />
          <v-textarea
            v-model="pharmacyDescription"
            label="About your pharmacy..."
            :rules="formRules"
            outlined
            height="30vh"
          />
          <v-row>
            <p class="ml-3 mr-3">
              <v-icon color="red lighten-1" size="2rem">mdi-map-marker</v-icon>
              Click on the map to set the location of your pharmacy.
            </p>
            <p class="ml-3 mr-3">Alternatively, you can type it in below:</p>
            <v-col cols=6>
              <v-text-field
                v-model="currentLoc.lat"
                label="Latitude"
                type="number"
                @input="changeCoordinates"
                :rules="formRules"
                solo-inverted
              />
            </v-col>
            <v-col cols=6>
              <v-text-field
                v-model="currentLoc.lng"
                label="Longitude"
                type="number"
                @input="changeCoordinates"
                :rules="formRules"
                solo-inverted
              />
            </v-col>
          </v-row>
          <v-btn
            @click="submitForm"
            color=secondary
            :disabled="!formIsValid"
          >
            Register Pharmacy
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <!-- Pop up alert -->
    <v-snackbar
      v-model="popUpAlert"
      timeout="4000"
      :color="popUpColor"
      text
      top
    >
      {{ popUpText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          :color="popUpColor"
          icon
          v-bind="attrs"
          @click="popUpAlert = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import { mapState } from 'vuex';
import { Loader } from 'google-maps';

const database = firebase.database();
const BANGKOK_LATLNG = { lat: 13.7563, lng: 100.5018 };

export default {
  name: 'PharmacyRegistration',
  data() {
    return {
      formIsValid: true,
      google: null,
      map: null,
      marker: null,
      currentLoc: {
        lat: null,
        lng: null,
      },
      pharmacyName: '',
      pharmacyDescription: '',
      formRules: [
        (v) => !!v || 'Cannot be empty',
      ],
      popUpAlert: false,
      popUpColor: 'success',
      popUpText: '',
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const options = {};
      const loader = new Loader('AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos', options);

      const mapStyles = [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ];

      this.google = await loader.load();
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: BANGKOK_LATLNG,
        zoom: 14,
        styles: mapStyles,
      });

      this.google.maps.event.addListener(this.map, 'click', (event) => {
        this.currentLoc.lat = event.latLng.lat();
        this.currentLoc.lng = event.latLng.lng();

        this.updateMarker(event.latLng);
      });
    },
    updateMarker(latLng) {
      if (!this.marker) {
        this.marker = new this.google.maps.Marker({
          map: this.map,
        });
      }

      this.marker.setPosition(latLng);
      this.map.panTo(this.marker.getPosition());
    },
    changeCoordinates() {
      this.updateMarker(
        new this.google.maps.LatLng(this.currentLoc.lat, this.currentLoc.lng),
      );
    },
    submitForm() {
      if (this.user) { // Just in case
        const pharmaciesRef = database.ref('/registered-pharmacies');
        const newPharmacy = {
          owner: this.user.uid,
          name: this.pharmacyName,
          description: this.pharmacyDescription,
          location: this.currentLoc,
        };
        pharmaciesRef.push(newPharmacy)
          .then(() => {
            this.clearForm();
            this.showPopUpAlert('success');
          })
          .catch((error) => {
            this.showPopUpAlert('fail', `Error! Code: ${error.code}`);
          });
      } else {
        this.$router.push({ name: 'login' });
      }
    },
    clearForm() {
      this.$refs.registerPharmacyForm.reset();
      this.marker = null;
      this.map.setCenter(BANGKOK_LATLNG);
      this.map.setZoom(14);
    },
    showPopUpAlert(status, errorText = '') {
      switch (status) {
        case 'success':
          this.popUpText = 'Pharmacy successfully registered!';
          this.popUpColor = 'success';
          break;
        case 'fail':
          this.popUpText = errorText;
          this.popUpColor = 'error';
          break;
        default:
          this.popUpText = '';
          this.popUpColor = '';
      }
      this.popUpAlert = true;
    },
  },
};
</script>

<style>
#map {
  width: 100% !important;
  height: 100% !important;
  min-height: 70vh;
}
</style>
