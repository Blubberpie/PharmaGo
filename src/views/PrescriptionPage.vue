<template>
  <div>
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-card class="card">
              <v-card-title> Customer Infomation</v-card-title>
              <v-row>
                <v-col>
                  <v-text-field v-model="customerName" label="Customer Full Name"> </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="customerPhone"
                    label="Customer Phone Number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field v-model="address" label="Address"></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card class="card">
              <v-card-title> Prescriber's Infomation</v-card-title>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="prescriberName"
                    label="Prescriber Full Name"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="prescriberPhone"
                    label="Prescriber Phone Number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="prescriberSignature"
                    label="Prescriber Signature"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="date" label="Date"></v-text-field>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="dialog">
          <v-card class="card">
            <v-card-title>Adding</v-card-title>
            <v-row>
              <v-col>
                <v-text-field v-model="editItem.name" label="Drug name"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="editItem.strength" label="Strength"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="editItem.frequency" label="Frequency"></v-text-field>
              </v-col>
              <v-col>
                <v-text-field v-model="editItem.quantity" label="Quantity"></v-text-field>
              </v-col>
            </v-row>
            <v-btn color="primary" @click="add">
              add
            </v-btn>
            <v-btn color="error" @click="reset">
              cancel
            </v-btn>
          </v-card>
        </v-dialog>
        <v-card>
          <v-data-table class="table" :headers="headers" :items="medication" hide-default-footer>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Medication</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = true">
                  add
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-row class="checkbox">
            <v-col>
              <v-checkbox v-model="checkbox1" :label="`Checkbox 1`"></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="checkbox2" :label="`Checkbox 2`"></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="checkbox3" :label="`Checkbox 3`"></v-checkbox>
            </v-col>
            <v-col>
              <v-checkbox v-model="checkbox4" :label="`Checkbox 4`"></v-checkbox>
            </v-col>
          </v-row>
        </v-card>
        <!-- <v-card></v-card> -->
        <v-btn class="button" color="primary">Submit</v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionPage',
  components: {
    // Chat,
  },
  data() {
    return {
      dialog: false,
      customerName: '',
      customerPhone: '',
      address: '',
      prescriberSignature: '',
      date: null,
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      headers: [
        { text: 'Drug Name', value: 'name' },
        { text: 'Strength', value: 'strength' },
        { text: 'Frequency', value: 'frequency' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Action', value: 'action' },
      ],
      medication: [
        {
          name: 'Neutapine',
          strength: '40mg',
          frequency: '1 daily before sleep',
          quantity: '60',
        },
      ],
      editItem: {
        name: '',
        strength: '',
        frequency: '',
        quantity: '',
      },
    };
  },
  methods: {
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
