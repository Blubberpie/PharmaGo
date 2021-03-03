<template>
  <div id="map"></div>
</template>

<script>
import { Loader } from 'google-maps';

export default {
  name: 'MapTest',
  data() {
    return {
      google: null,
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const options = {};
      const loader = new Loader('AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos', options);

      this.google = await loader.load();
      const bangkok = { lat: 13.7563, lng: 100.5018 };
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: bangkok,
        zoom: 13,
      });
    },
  },
};
</script>

<style>
#map {
  width: 70vw;
  height: 70vh
}
</style>
