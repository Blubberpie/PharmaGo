<template>
    <v-app class=''>
        <v-container class=''>
          <!-- {{location.coords.latitude}} -->
          <!-- {{deliveryJob}} -->
          {{computeDistance()}}
            <v-layout row align-center justify-center class='mt-8'>
                <v-flex class='' height=''>
                    <v-card rippled class='flexcard white mx-auto' elevation="3"
           rounded="lg">
                    <v-card flat style="overflow:hidden;" class='teal lighten-5' rounded="lg">
                        <v-row class='mx-0 my-0'
                        justify="center" align="center" style="overflow:hidden;">
                        <v-col cols='3'>
                            <v-img class='ml-5'
                            max-height="150"
                            max-width="150"
                            src="https://i.pinimg.com/originals/8b/94/0c/8b940c908705e3fb2644ffc12418eefb.png"
                            ></v-img>
                        </v-col>
                                     <v-col class=' '>
                             </v-col>
                        </v-row>
                    </v-card>
                        <v-row class='mx-0 my-0 grey lighten-5' style="overflow:hidden;">
                            <v-col cols='2'>
                              <v-flex class='ml-5'>
                                 <v-card-text>
                                   <p class='grey--text text--darken-1'>Choose distance</p>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip small> &lt; 5 km</v-chip>

        <v-chip small>5 - 10 km</v-chip>

        <v-chip small>10 - 25 km</v-chip>

        <v-chip small>25 - 50 km</v-chip>

        <v-chip small>50 - 100 km</v-chip>

        <v-chip  small> > 100 km</v-chip>
      </v-chip-group>
    </v-card-text>
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
                              <v-row class=''>
                                <v-col cols='4' v-for="(pharmacy, index)
                                 in inRange" :key="(pharmacy.address,index)">
                              <v-card flat height="315px"
                               class='mt-3'>
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
                             {{pharmacy.distance}} km</p></v-col>
                                      </v-row>
                                    <v-row class='ml-3 mb-2  font-weight-medium'>
                                    <div class='text-subtitle-1 grey--text text--darken-2'>
                                      {{getName(pharmacy.pharmacyId)}}
                                      </div>
                                    </v-row>
                                    <div class='text-body-1 grey--text text--darken-2 mx-3'>
                                      {{getDescription(pharmacy.pharmacyId)}}2
                                      </div>
                                    <v-row class='ml-1' style="position: absolute; bottom: 0;">
                                      <v-col class=''>
                                        <v-card-actions>
                                    <v-btn depressed small color=#0561ff class=' white--text'
                                     @click="updateStatus(index)"
                                   >Apply Now</v-btn>
                                        </v-card-actions>
                                      </v-col>
                                    <v-col class=' pt-5 '>
                                    <v-dialog max-width="600px">
                <template v-slot:activator="{ on }">
                <v-btn  v-on="on" small depressed class='grey--text text--darken-2 grey
                                    lighten-2'>
                                    <v-icon color='red' left>
        mdi-map-marker
      </v-icon>Location
                  </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class='grey--text text--darken-2'>
                      Pharmacy's Address
                    </v-card-title>
                    <v-card-text>
                      {{pharmacy.fromAddress}}
                    </v-card-text>
                    <v-card-title class='grey--text text--darken-2'>
                      Customer's Address
                    </v-card-title>
                    <v-card-text>
                      {{pharmacy.toAddress}}
                    </v-card-text>
                  </v-card>
              </v-dialog>
                                    </v-col>
                                    </v-row>
                              </v-card>
                                </v-col>
                              </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>
<script>
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
// import { defineComponent } from '@vue/composition-api'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import axios from 'axios';

const database = firebase.database();
export default {
  data() {
    return {
      location: null,
      address: null,
      distanceRules: [0, 5, 10, 25, 50, 100],
      selection: 2,
      error: null,
      deliveryJob: {},
      deliveryJobRef: null,
      pharmacy: {},
      pharmacyRef: null,
    };
  },
  created() {
    this.deliveryJobRef = database.ref('deliveryJobs');
    this.pharmacyRef = database.ref('registered-pharmacies');
  },
  async mounted() {
    // this.getLocation();
    await this.deliveryJobRef.on('value', (snapshot) => {
      this.getLocation();
      if (snapshot !== undefined) {
        this.deliveryJob = snapshot.val();
        this.computeDistance();
      }
    });
    this.pharmacyRef.on('value', (snapshot) => {
      if (snapshot !== undefined) {
        this.pharmacy = snapshot.val();
      }
    });
  },
  computed: {
    sortByDistance() {
      return Object.fromEntries(Object.entries(this.deliveryJob)
        .sort((a, b) => (a[1].distance < b[1].distance ? -1 : 1)));
    },
    inRange() {
      return Object.fromEntries(Object.entries(this.deliveryJob)
        .filter(this.constraint));
    },
  },
  methods: {
    updateStatus(index) {
      this.deliveryJobRef.transaction((snapshot) => {
        Object.entries(snapshot).forEach((key) => {
          if (key[0] === index) {
            this.deliveryJobRef.child(key[0]).update({
              status: 2,
            });
          }
        });
      });
    },
    getDescription(p) {
      let data = null;
      Object.entries(this.pharmacy).forEach((key) => {
        if (key[0] === p) {
          data = key[1].description;
        }
      });
      return data;
    },
    getName(p) {
      let data = null;
      Object.entries(this.pharmacy).forEach((key) => {
        if (key[0] === p) {
          data = key[1].name;
        }
      });
      return data;
    },
    computeDistance() {
      // console.log(this.location.coords.latitude);
      // console.log(this.location.coords.longitude);
      Object.entries(this.deliveryJob).forEach((key) => {
        const storedDistance = this.CalculateDistance(key[1].fromLocation.lat,
          key[1].fromLocation.lng);
        console.log(storedDistance);
        key[1].distance = storedDistance;
      });
    },
    getLocation() {
      if (!('geolocation' in navigator)) {
        this.error = 'Geolocation is not available';
        return;
      }
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos;
      }, (err) => {
        this.error = err.message;
      });
    },
    async getAddress(lat, long) {
      await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}
      &key=AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos`).then((response) => {
        if (response.data.error_message) {
          console.log(response.data.error_message);
        } else {
          this.address = response.data.results[0].formatted_address;
          console.log(this.address);
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
      this.deliveryJob = this.sortByDistance;
    },
    constraint(d) {
      // const selection = this.selection - 1;
      console.log(this.selection);
      console.log(this.distanceRules[this.selection]);
      console.log(this.distanceRules[this.selection - 1]);
      console.log(d[1].distance);
      if (d[1].status !== 1) {
        return false;
      }
      if (this.selection === 0) {
        return (d[1].distance >= 0
      && d[1].distance <= this.distanceRules[this.selection]);
      } if (this.selection === 5) {
        return (d[1].distance >= this.distanceRules[this.selection]);
      }
      return (d[1].distance >= this.distanceRules[this.selection]
          && d[1].distance <= this.distanceRules[this.selection + 1]);
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


