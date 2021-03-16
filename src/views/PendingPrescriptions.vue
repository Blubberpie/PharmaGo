<template>
  <v-container>
    <h1>Approve or Reject Your Pending Prescriptions</h1>
    <p v-if="pendingPrescriptions.length === 0">
      This is the list of prescriptions sent to you
      by the pharmacies you've chatted with.<br/>
      You can choose to approve or reject their offer.
    </p>
    <p v-else>
      You have no pending prescriptions! The pharmacies you have
      contacted will send you a prescription.
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
            class="mt-0"
            :headers="headers"
            :items="item.medication"
            hide-default-footer
          >
            <template v-slot:top>
              <p><b class="ml-4 mr-3">Prescriber's Name:</b>{{ item.prescriberName }}</p>
              <p><b class="ml-4 mr-3">Prescriber's Email:</b>{{ item.prescriberEmail }}</p>
              <p><b class="ml-4 mr-3">Prescriber's Phone:</b>{{ item.prescriberPhone }}</p>
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
          <v-dialog v-model="approveDialog" width="700">
            <v-stepper v-model="stepperState">
              <v-stepper-header>
                <v-divider/>
                <v-stepper-step
                  :complete="stepperState > 1"
                  step="1"
                  color="secondary"
                >
                  Pick a Location
                </v-stepper-step>

                <v-divider/>

                <v-stepper-step
                  :complete="stepperState > 2"
                  step="2"
                  color="secondary"
                >
                  Confirmation
                </v-stepper-step>
                <v-divider/>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <CustomerAddressForm
                    @commitForm="commitForm"
                    @cancelForm="cancelForm"
                  />
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card>
                    <v-card-text>
                      <h3>
                        Upon clicking APPROVE, a Delivery Job will be
                        created and will be visible to all potential deliverers.
                      </h3>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="gray" @click="stepperState = 1">
                        go back
                      </v-btn>
                      <v-spacer/>
                      <v-btn
                        color="success"
                        @click="approvePrescription(item.pharmacyId, i)"
                      >
                        Yes, Approve
                      </v-btn>
                      <v-btn color="gray" @click="cancelForm">
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
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
                  Cancel
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
import axios from 'axios';
import CustomerAddressForm from '@/components/CustomerAddressForm.vue';

const database = firebase.database();
const STATUS_PENDING = 1;
const STATUS_APPROVED = 2;

export default {
  name: 'PendingPrescriptions',
  components: {
    CustomerAddressForm,
  },
  data() {
    return {
      approveDialog: false,
      rejectDialog: false,
      popUpAlert: false,
      popUpColor: '',
      popUpText: '',
      stepperState: 1,
      customerAddress: '',
      customerLocation: null,
      customerPrescriptionsRef: null,
      headers: [
        { text: 'Drug Name', value: 'name' },
        { text: 'Strength', value: 'strength' },
        { text: 'Frequency', value: 'frequency' },
        { text: 'Quantity', value: 'quantity' },
      ],
      pendingPrescriptions: {},
      // pendingPrescriptions: [
      //   {
      //     prescriptionId: '2987329874',
      //     pharmacyName: 'Good Pharmacy',
      //     pharmacyId: '-MVk2EVqYH8dEPnTD5-U',
      //     medication: [
      //       {
      //         name: 'Neutapine',
      //         strength: '40mg',
      //         frequency: '1 daily before sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'Neutapsdafdsfine',
      //         strength: '40mg',
      //         frequency: '1 daily sdfsdfbefore sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'Neutapinsdfe',
      //         strength: '40mg',
      //         frequency: '1 dailsdfy before sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'Neuffftapine',
      //         strength: '40mg',
      //         frequency: '1 fdaily before sleep',
      //         quantity: '60',
      //       },
      //     ],
      //   },
      //   {
      //     prescriptionId: '874339874',
      //     pharmacyName: 'KarmaPharma',
      //     pharmacyId: '-MVk2skXtgZxNuiNuCYf',
      //     medication: [
      //       {
      //         name: 'sadfdsaf',
      //         strength: '40mg',
      //         frequency: '1 daily before sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'jhh',
      //         strength: '40mg',
      //         frequency: '1 daily sdfsdfbefore sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'gryyt',
      //         strength: '40mg',
      //         frequency: '1 dailsdfy before sleep',
      //         quantity: '60',
      //       },
      //       {
      //         name: 'dsfa',
      //         strength: '40mg',
      //         frequency: '1 fdaily before sleep',
      //         quantity: '60',
      //       },
      //     ],
      //   },
      // ],
    };
  },
  mounted() {
    this.customerPrescriptionsRef = database.ref(`/prescriptions/${this.user.uid}`);
    this.customerPrescriptionsRef.orderByChild('status').equalTo(STATUS_PENDING)
      .on('value', (prescriptionsSnap) => {
        const ps = {};
        prescriptionsSnap.forEach((prescription) => {
          ps[prescription.key] = prescription.val();
        });
        this.pendingPrescriptions = ps;
      });
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async approvePrescription(pharmacyId, prescriptionId) {
      this.approveDialog = false;
      const pharmacyRef = database.ref(`/registered-pharmacies/${pharmacyId}`);
      const deliveryJobsRef = database.ref('/deliveryJobs');

      let done = false;

      await pharmacyRef.once('value', (pharmacySnap) => {
        const pharmacyLocation = pharmacySnap.val().location;
        const pharmacyAddress = pharmacySnap.val().address;

        if (pharmacyLocation && pharmacyAddress && this.customerLocation) {
          const newDeliveryJob = {
            pharmacyId,
            customerId: this.user.uid,
            fromLocation: pharmacyLocation,
            fromAddress: pharmacyAddress,
            toLocation: this.customerLocation,
            toAddress: this.customerAddress,
            status: 1, // 1 = unassigned
          };
          deliveryJobsRef.push(newDeliveryJob)
            .then(() => {
              this.customerPrescriptionsRef.child(prescriptionId).set({
                status: STATUS_APPROVED,
              });
              this.showPopUpAlert('success');
              done = true;
            })
            .catch((error) => {
              this.showPopUpAlert('fail', `Error: ${error}`);
            });
        } else {
          this.showPopUpAlert('fail', 'Error: Couldn\'t communicate with the server');
          console.log(pharmacyLocation);
          console.log(pharmacyAddress);
          console.log(this.customerLocation);
        }
      });
      if (!done) this.showPopUpAlert('fail', 'Couldn\'t communicate with the server!');
    },
    rejectPrescription() {
      this.rejectDialog = false;
      // TODO: IMPLEMENT
    },
    async commitForm(formattedAddress) {
      this.customerAddress = formattedAddress;
      await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.customerAddress}&key=AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos`,
      ).then((response) => {
        const { location } = response.data.results[0].geometry;
        this.customerLocation = location;
        this.stepperState = 2;
      }).catch(() => {
        this.showPopUpAlert('fail', 'Error! Problem communicating with server');
      });
    },
    cancelForm() {
      this.stepperState = 1;
      this.approveDialog = false;
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
