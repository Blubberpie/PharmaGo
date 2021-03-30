<template>
  <div>
    <v-stepper v-model="current" color="green">
      <v-stepper-header>
        <v-stepper-step
          v-for="(step,n) in steps"
          :key="n"
          :complete="stepComplete(n+1)"
          :step="n+1"
          :color="stepStatus(n+1)">
          {{ step.name }}
        </v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>
<script>
export default {
  name: 'Status',
  components: {},
  props: {
    current: {
      type: Number,
    },
  },
  data() {
    return {
      // current: 1,
      steps: [
        { name: 'Finding Driver' },
        { name: 'Delivering' },
        { name: 'Delivered' },
      ],
    };
  },
  methods: {
    stepComplete(step) {
      return this.current > step;
    },
    stepStatus(step) {
      return this.current > step ? 'green' : 'blue';
    },
  },
};
</script>
