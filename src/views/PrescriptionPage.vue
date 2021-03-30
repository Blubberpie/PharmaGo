<template>
  <div>
    <v-form ref="prescriptionForm" v-model="formIsValid">
      <v-container>
        <v-row>
          <v-col>
            <v-card class="card">
              <v-card-title>Prescriber Details</v-card-title>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="prescriberName"
                    label="Full Name"
                    :rules="formRules"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="prescriberEmail"
                    :rules="emailRules"
                    label="Email"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    v-model="prescriberPhone"
                    :rules="formRules"
                    label="Phone Number"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog" max-width="500">
          <v-card class="card">
            <v-card-title>Add a Drug</v-card-title>
            <v-card-text>
              <v-form ref="addDrugForm" v-model="addDrugFormIsValid">
                <v-text-field v-model="editItem.name" label="Drug name" :rules="formRules" />
                <v-text-field
                  v-model="editItem.strength"
                  label="Strength"
                  type="number"
                  suffix="mg"
                  :rules="formRules"
                />
                <v-text-field
                  v-model="editItem.frequency"
                  label="Frequency"
                  placeholder="1 dose daily, before sleep"
                  :rules="formRules"
                />
                <v-text-field
                  v-model="editItem.quantity"
                  label="Quantity"
                  type="number"
                  :rules="formRules"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="secondary" @click="add" :disabled="!addDrugFormIsValid">
                add
              </v-btn>
              <v-btn color="error" @click="reset">
                cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card>
          <v-data-table class="table" :headers="headers" :items="medication" hide-default-footer>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Medication for the Customer</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="secondary" @click="dialog = true">
                  add a drug
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-icon icon color="error" @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
        <v-btn
          class="button"
          color="secondary"
          :disabled="!formIsValid || medication.length === 0"
          @click="sendToCustomer"
        >
          Send to Customer
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';

const database = firebase.database();

export default {
  name: 'PrescriptionPage',
  components: {},
  data() {
    return {
      dialog: false,
      prescriptionsRef: null,
      prescriberName: '',
      prescriberPhone: '',
      prescriberEmail: '',
      pharmacyName: 'Good Pharmacy', // CHANGE!!!
      pharmacyId: '-MVk2EVqYH8dEPnTD5-U', // CHANGE LATER!!!
      customerId: 'eSfIbpVKbPZVGVVaYeGdZ3ZicsV2', // CHANGE
      formRules: [(v) => !!v || 'Cannot be empty'],
      emailRules: [(v) => /[a-zA-z0-9._]+@[a-zA-Z]+\.[a-zA-z]{2,4}/.test(v) || 'Invalid email'],
      formIsValid: true,
      addDrugFormIsValid: true,
      headers: [
        { text: 'Drug Name', value: 'name' },
        { text: 'Strength', value: 'strength' },
        { text: 'Frequency', value: 'frequency' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Action', value: 'action' },
      ],
      medication: [],
      editItem: {
        name: '',
        strength: '',
        frequency: '',
        quantity: '',
      },
    };
  },
  created() {
    this.prescriptionsRef = database.ref(`/prescriptions/${this.customerId}`);
  },
  mounted() {
    this.pharmacyName = this.$route.params.pharmacyName; // CHANGE!!!
    this.pharmacyId = this.$route.params.pharmacyId; // CHANGE LATER!!!
    this.customerId = this.$route.params.customerId;
  },
  methods: {
    sendToCustomer() {
      const newPrescription = {
        pharmacyName: this.pharmacyName,
        pharmacyId: this.pharmacyId,
        medication: this.medication,
        patientId: this.customerId,
        prescriberName: this.prescriberName,
        prescriberPhone: this.prescriberPhone,
        prescriberEmail: this.prescriberEmail,
        status: 1, // 1 = pending, 2 = approved, 3 = rejected
      };
      const message = {
        text: 'Prescription has been send to you! Please check your Pending Prescription!',
        from: this.pharmacyName,
        timestamp: Date.now(),
      };
      firebase
        .database()
        .ref(`messages/chatRooms/${this.$route.params.roomId}/messages`)
        .push(message);
      this.text = '';
      this.prescriptionsRef
        .push(newPrescription)
        .then(() => {
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reset() {
      this.dialog = false;
      this.editItem = {
        name: '',
        strength: '',
        frequency: '',
        quantity: '',
      };
    },
    add() {
      this.medication.push(this.editItem);
      this.reset();
    },
    deleteItem(item) {
      const index = this.medication.indexOf(item);
      if (index > -1) {
        this.medication.splice(index, 1);
      }
    },
  },
};
</script>

<style>
.card {
  padding: 30px;
}
.table {
  padding: 30px;
  margin-top: 30px;
}
.button {
  padding: 30px;
  margin-top: 30px;
}
.checkbox {
  margin-left: 30px;
}
</style>
