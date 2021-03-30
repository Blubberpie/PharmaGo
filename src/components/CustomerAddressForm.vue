<template>
  <v-card elevation="0" outlined>
    <v-card-title>Where should the deliverer drop off your order?</v-card-title>
    <v-card-text>
      <v-form
        ref="customerAddressForm"
        v-model="formIsValid"
      >
        <v-text-field
          v-model="addressLine"
          label="Address Line"
          :rules="formRules"
          required
          outlined
        />
        <v-text-field
          v-model="city"
          label="City"
          :rules="formRules"
          required
          outlined
        />
        <v-text-field
          v-model="stateOrProvince"
          label="State/Province"
          :rules="formRules"
          required
          outlined
        />
        <v-text-field
          v-model="postalCode"
          label="Postal Code"
          :rules="formRules"
          required
          outlined
        />
        <v-text-field
          v-model="country"
          label="Country"
          :rules="formRules"
          required
          outlined
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        color="secondary"
        @click="commitForm()"
        :disabled="!formIsValid"
      >
        Continue
      </v-btn>

      <v-btn color="gray" @click="cancelForm()">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'CustomerAddressForm',
  data() {
    return {
      formIsValid: true,
      addressLine: '',
      city: '',
      stateOrProvince: '',
      postalCode: '',
      country: '',
      formRules: [
        (v) => !!v || 'Cannot be empty',
      ],
    };
  },
  methods: {
    commitForm() {
      const formattedAddress = `${this.addressLine}, ${this.postalCode}, ${this.city}, ${this.stateOrProvince}, ${this.country}`;
      this.$emit('commitForm', formattedAddress);
    },
    cancelForm() {
      this.$emit('cancelForm');
    },
  },
};
</script>
