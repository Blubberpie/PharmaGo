<template>
  <v-container>
    <h1>Approve or Reject Your Pending Prescriptions</h1>
    <p>
      This is the list of prescriptions sent to you
      by the pharmacies you've chatted with.<br/>
      You can choose to approve or reject their offer.
    </p>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="(item, i) in pendingPrescriptions"
        :key="i"
      >
        <v-expansion-panel-header>
          Received from:
          <h3 class="ma-3">{{ item.pharmacyName }}</h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            class="table"
            :headers="headers"
            :items="item.medication"
            hide-default-footer
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title style="font-weight: bold">Proposed Medication</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="approveDialog = true">
                  Approve
                </v-btn>
                <v-btn class="ml-3" color="error" @click="rejectDialog = true">
                  Reject
                </v-btn>
              </v-toolbar>
            </template>
          </v-data-table>
          <v-dialog v-model="approveDialog" width="375">
            <v-card>
              <v-card-title>Approve Prescription</v-card-title>
              <v-card-text>
                Upon clicking CONFIRM, a Delivery Job will be
                created and will be visible to all potential deliverers.
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="success" @click="approvePrescription(item.pharmacyId)">
                  Yes, Approve
                </v-btn>
                <v-btn color="gray" @click="approveDialog = false">
                  cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="rejectDialog" width="375">
            <v-card>
              <v-card-title>Reject Prescription</v-card-title>
              <v-card-text>
                Upon clicking CONFIRM, this proposal will be cancelled,
                and your pharmacy will have to send you a new one.
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="error" @click="rejectPrescription">
                  Yes, Reject
                </v-btn>
                <v-btn color="gray" @click="rejectDialog = false">
                  cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
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

const database = firebase.database();

export default {
  name: 'PendingPrescriptions',
  data() {
    return {
      approveDialog: false,
      rejectDialog: false,
      popUpAlert: false,
      popUpColor: '',
      popUpText: '',
      headers: [
        { text: 'Drug Name', value: 'name' },
        { text: 'Strength', value: 'strength' },
        { text: 'Frequency', value: 'frequency' },
        { text: 'Quantity', value: 'quantity' },
      ],
      pendingPrescriptions: [
        {
          prescriptionId: '2987329874',
          pharmacyName: 'Good Pharmacy',
          pharmacyId: '-MVk2EVqYH8dEPnTD5-U',
          medication: [
            {
              name: 'Neutapine',
              strength: '40mg',
              frequency: '1 daily before sleep',
              quantity: '60',
            },
            {
              name: 'Neutapsdafdsfine',
              strength: '40mg',
              frequency: '1 daily sdfsdfbefore sleep',
              quantity: '60',
            },
            {
              name: 'Neutapinsdfe',
              strength: '40mg',
              frequency: '1 dailsdfy before sleep',
              quantity: '60',
            },
            {
              name: 'Neuffftapine',
              strength: '40mg',
              frequency: '1 fdaily before sleep',
              quantity: '60',
            },
          ],
        },
        {
          prescriptionId: '874339874',
          pharmacyName: 'KarmaPharma',
          pharmacyId: '-MVk2skXtgZxNuiNuCYf',
          medication: [
            {
              name: 'sadfdsaf',
              strength: '40mg',
              frequency: '1 daily before sleep',
              quantity: '60',
            },
            {
              name: 'jhh',
              strength: '40mg',
              frequency: '1 daily sdfsdfbefore sleep',
              quantity: '60',
            },
            {
              name: 'gryyt',
              strength: '40mg',
              frequency: '1 dailsdfy before sleep',
              quantity: '60',
            },
            {
              name: 'dsfa',
              strength: '40mg',
              frequency: '1 fdaily before sleep',
              quantity: '60',
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async approvePrescription(pharmacyId) {
      this.approveDialog = false;
      const pharmacyRef = database.ref(`/registered-pharmacies/${pharmacyId}`);
      const deliveryJobsRef = database.ref('/deliveryJobs');

      let pharmacyLocation = null;
      const customerLocation = { lat: 13.7563, lng: 100.5018 }; // temporary

      await pharmacyRef.once('value', (pharmacySnap) => {
        console.log(pharmacySnap);
        pharmacyLocation = pharmacySnap.val().location;
      });
      if (pharmacyLocation) {
        const newDeliveryJob = {
          pharmacyId,
          customerId: this.user.uid,
          fromLocation: pharmacyLocation,
          toLocation: customerLocation,
          status: 1, // 1 = unassigned
        };
        deliveryJobsRef.push(newDeliveryJob)
          .then(() => {
            this.showPopUpAlert('success');
          })
          .catch((error) => {
            this.showPopUpAlert('fail', `Error: ${error}`);
          });
      } else {
        console.log('Couldn\'t retrieve data from server.');
      }
    },
    rejectPrescription() {
      this.rejectDialog = false;
      // TODO: IMPLEMENT
    },
    showPopUpAlert(status, errorText = '') {
      switch (status) {
        case 'success':
          this.popUpText = 'Prescription approved!';
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
