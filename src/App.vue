<template>
  <v-app>
    <v-main>
      <MapTest/>
    </v-main>
  </v-app>
</template>

<script>
import MapTest from './components/MapTest.vue';

export default {
  name: 'App',

  components: {
    MapTest,
  },

  data: () => ({
    //
  }),
};
</script>
