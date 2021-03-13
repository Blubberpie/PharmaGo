<template>
    <v-app class=''>
        <v-container class=''>
            <v-layout row align-center justify-center class='mt-8'>
                <v-flex class='' height=''>
                   {{ location.coords.latitude }}, {{ location.coords.longitude}}
                   {{getAddress(location.coords.latitude, location.coords.longitude)}}
                    <v-card rippled class='flexcard white mx-auto' elevation="3"
           rounded="lg">
                    <v-card flat style="overflow:hidden;" class='teal lighten-5' rounded="lg">
                        <v-row class='mx-0 my-0'
                        justify="center" align="center" style="overflow:hidden;">
                        <v-col cols='3'>
                          <!-- {{inRange}} -->
                          <!-- <h3 class='ml-3 grey--text text--darke
                          n-3'>Job Search Platform</h3> -->
                            <v-img class='ml-5'
                            max-height="150"
                            max-width="150"
                            src="https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png"
                            ></v-img>
                        </v-col>
                                 <!-- <v-flex class='ma-10 red'> -->
                                     <v-col class=' '>
                                       <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip label>less than 5 km</v-chip>

        <v-chip label>5 ~ 10 km</v-chip>

        <v-chip label>10 ~ 25 km</v-chip>

        <v-chip label>25 ~ 50 km</v-chip>

        <v-chip label>50 ~ 100 km</v-chip>

        <v-chip label>more than 100 km</v-chip>
      </v-chip-group>
    </v-card-text>
                                     <!-- <v-card class='' flat rounded="lg" max-width="600"
                                     max-height="80"
                                     >
                                        <v-flex class='ma-10'  justify-center>
                                 <v-row >
                                     <v-col cols='8' class=''>
                                 <v-text-field flat solo prepend-inner-icon="mdi-account-search"
                                 label="Job title" class='mx-auto mt-1'
                                  ></v-text-field></v-col>
                                  <v-divider  class="mb-6"
  vertical
></v-divider>
                                <v-col cols='3' class=' mb-6'>
                                  <v-btn large depressed class='white--text ml-8
                                   teal lighten-2'>Find Job</v-btn>
                                  </v-col>
                                 </v-row>
                                        </v-flex>
                                     </v-card> -->
                                 <!-- </v-flex> -->
                            <!-- <h2 class='text-center'>hi</h2>
                            <p>hi</p>
                            <p>hi</p> -->
                             </v-col>
                        </v-row>
                    </v-card>
                        <v-row class='mx-0 my-0 grey lighten-5' style="overflow:hidden;">
                            <v-col cols='2'>
                              <v-flex class='ml-5'>
                            <!-- <h3 class='grey--text text--darken-2'>Distance</h3> -->
                            <!-- <h3 class='grey--text text--darken-2'>Distance</h3> -->
                            <!-- <h3 class='grey--text text--darken-2'>Distance</h3> -->
                              </v-flex>
                            </v-col>
                            <v-col cols='9'>
                              <v-row>
                              <v-layout align-end justify-end>
                              <v-btn small depressed color=' grey lighten-5'
                               @click="sortBy()">
                                <v-icon left small>mdi-car</v-icon>
                                <span>By distance</span>
                              </v-btn>
                              </v-layout>
                              </v-row>
                              <!-- <p  class='grey--text text--darken-2 text-right'>Sort by </p> -->
                              <v-row class=''>
                                <v-col cols='4' v-for="(pharmacy)
                                 in inRange" :key="pharmacy.description">
                              <v-card flat height="300px"
                               class='mt-3'>
                                <!-- <v-divider ></v-divider> -->
                                <!-- <v-row align="center" justify="center"> -->
                                  <!-- <v-col cols='3' class='' align-self=""> -->
                                    <!-- <v-layout align-center justify-center> -->
                                      <v-row class=''>
                                        <v-col>
                                    <v-img class='ml-6 mt-3' v-if="pharmacy.logo"
                            max-height="60"
                            max-width="60"
                            :src="task.logo"
                            ></v-img>
                            <v-img class='ml-6 mt-3' v-else
                            max-height="50"
                            max-width="50"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9Gc
                            T04s_fztbv3ncwe0O_x5tbAmgLZCsPKorMzw&usqp=CAU"
                            ></v-img></v-col>
                            <v-col><p
                             class='text-right '>
                             {{pharmacy.temp_relative_distance}} km</p></v-col>
                                      </v-row>
                                      <!-- <v-card-text class='mt-2'> -->
                                    <!-- </v-layout> -->
                                  <!-- </v-col> -->
                                  <!-- <v-col cols='5' class=''> -->
                                    <v-row class='ml-3 mb-2  font-weight-medium'>
                                    <subtitle-2 class='grey--text text--darken-2'>
                                      {{pharmacy.name}}</subtitle-2>
                                    </v-row>
                                    <!-- <br> -->
                                    <!-- <v-row class='red'> -->
                                    <body-2 class='grey--text text--darken-2 mx-3'>
                                      {{pharmacy.description}}</body-2>
                                      <!-- </v-card-text> -->
                                    <!-- </v-row> -->
                                  <!-- </v-col> -->
                                  <!-- <v-col cols='2'> -->
                                    <!-- <h4 class='grey--text text--darken-2'>Estimated time -->
                                    <!-- </h4> -->
                                    <!-- <p class='grey--text text--darken-2'>{{task.time}}</p> -->
                                    <v-row class='ml-1' style="position: absolute; bottom: 0;">
                                      <v-col>
                                        <v-card-actions>
                                    <v-btn depressed small color=#0561ff class=' white--text'
                                   >Apply Now</v-btn>
                                        </v-card-actions>
                                      </v-col>
                                    <!-- <v-spacer></v-spacer> -->
                                    <v-col>
                                      <v-card-actions>
                                    <v-btn  small class='grey--text text--darken-2 grey
                                    lighten-2'
                                     depressed>Messages</v-btn>
                                      </v-card-actions>
                                    </v-col>
                                    </v-row>
                                  <!-- </v-col> -->
                                  <!-- <v-col cols='2'> -->
                                    <!-- <div id="chips-container">
                                    <v-chip :class="task.status" class="
                                     white--text caption my-2`">{{task.status}}</v-chip>
                                    </div> -->
                                    <!-- <h4 class='grey--text text--darken-2'>Status</h4> -->
                                    <!-- <p class='grey--text text--darken-2'>
                                      {{task.status}}</p> -->
                                  <!-- </v-col> -->
                                  <!-- <v-divider></v-divider> -->
                                <!-- </v-row> -->
                                <!-- <v-divider></v-divider> -->
                              </v-card>
                                </v-col>
                              </v-row>
                              <!-- <v-divider></v-divider> -->
                            <!-- <p>hi</p>
                            <p>hi</p> -->
                            </v-col>
                        </v-row>
                    </v-card>
                    <!-- {{this.distances}} -->
                    <!-- {{distances}} -->
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

const database = firebase.database();
export default {
  data() {
    return {
      // Bankok location
      location: null,
      distanceRules: [5, 10, 25, 50, 100],
      // dlat: 13.862810,
      // dlng: 100.514511,
      selection: 2,
      error: null,
      // distanceDriver: {},
      orderedPharmacies: {},
      orderedPharmacyRef: null,
      // distanceDriverRef: null,
      tasks: [
        {
          logo: 'https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png',
          name: 'A Pharmacy',
          description: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
          // time: '30 mins',
        },
        {
          // logo: 'https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png',
          name: 'B Pharmacy',
          description: 'Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522',
          // time: '15 mins',
        },
      ],
    };
  },
  created() {
    this.orderedPharmacyRef = database.ref('registered-pharmacies'); // change this
    this.getLocation();
  },
  mounted() {
    this.orderedPharmacyRef.on('value', (snapshot) => {
      if (snapshot !== undefined) {
        this.orderedPharmacies = snapshot.val();
      }
    });
    this.orderedPharmacyRef.transaction((snapshot) => {
      Object.entries(snapshot).forEach((key) => {
        this.orderedPharmacyRef.child(key[0]).update({
          temp_relative_distance: this.CalculateDistance(key[1].location.lat, key[1].location.lng),
        });
      });
    });
  },
  computed: {
    sortByDistance() {
      return Object.fromEntries(Object.entries(this.orderedPharmacies)
        .sort((a, b) => (a[1].temp_relative_distance < b[1].temp_relative_distance ? -1 : 1)));
    },
    inRange() {
      // const before = this.distanceRules[this.selection - 1];
      // const after = this.distanceRules[this.selection];
      return Object.fromEntries(Object.entries(this.orderedPharmacies)
        .filter(this.constraint));
      // a[1].temp_relative_distance > 10
      //  && a[1].temp_relative_distance < 12)));
    },
  },
  methods: {
    getLocation() {
      if (!('geolocation' in navigator)) {
        this.error = 'Geolocation is not available';
        return;
      }
      navigator.geolocation.getCurrentPosition((pos) => {
      // this.gettingLocation = false;
        this.location = pos;
      }, (err) => {
      // this.gettingLocation = false;
        this.error = err.message;
      });
    },
    getAddress(lat, long) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}
      &key=AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos`).then((response) => {
        if (response.data.error_message) {
          console.log(response.data.error_message);
        } else {
          console.log(response.data.results[0].formatted_address);
        }
      }).catch((err) => {
        console.log(err.message);
      });
    },
    CalculateDistance(lat, lng) {
      const R = 6371;
      const lat1 = lat * (Math.PI / 180);
      const lat2 = this.location.coords.latitude * (Math.PI / 180);
      const deltalat = (lat - this.location.coords.latitude) * (Math.PI / 180);
      const deltalng = (lng - this.location.coords.longitude) * (Math.PI / 180);

      const a = Math.sin(deltalat / 2) * Math.sin(deltalat / 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(deltalng / 2) * Math.sin(deltalng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const d = R * c;
      return d.toFixed(1);
    },
    sortBy() {
      this.orderedPharmacies = this.sortByDistance;
    },
    constraint(d) {
      if (this.selection === 0) {
        return (d[1].temp_relative_distance >= 0
      && d[1].temp_relative_distance <= this.distanceRules[this.selection]);
      } if (this.selection === 5) {
        return (d[1].temp_relative_distance >= this.distanceRules[this.selection]);
      }
      return (d[1].temp_relative_distance >= this.distanceRules[this.selection - 1]
          && d[1].temp_relative_distance <= this.distanceRules[this.selection]);
    },
  },
};
</script>

<style>
.task.available {
  border-left: 4px solid rgb(24, 214, 24);
}
.task.taken {
  border-left: 4px solid red;
}
#chips-container .v-chip.available {
  background: rgb(108, 219, 108);
}
#chips-container .v-chip.taken {
  background: rgba(192, 12, 12, 0.753);
}
</style>
