<template>
  <div>
    <v-list v-for="(job, key) in deliveryJobs" :key="key">
      <v-card>
        <v-card-title>
          Delivery ID: {{ key }}
        </v-card-title>
        <v-card-content class="flex">
          <Status
            :current="job.status"
          />
        </v-card-content>
      </v-card>
    </v-list>
  </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import { mapState } from 'vuex';
import Status from '@/components/DeliveryStatus.vue';

const database = firebase.database();
export default {
  name: 'DeliveryStatuses',
  components: {
    Status,
  },
  data() {
    return {
      deliveryJobRef: null,
      deliveryJobs: {},
    };
  },
  created() {
    this.deliveryJobRef = database.ref('deliveryJobs');
    this.loadData();
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async loadData() {
      await this.deliveryJobRef.once('value', (jobsSnap) => {
        const jobs = {};
        jobsSnap.forEach((job) => {
          if (job.val().customerId === this.user.uid) {
            jobs[job.key] = job.val();
          }
        });
        this.deliveryJobs = jobs;
      });
    },
  },
};
</script>
