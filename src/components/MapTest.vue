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
      marker: null,
      marker2: null,
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

      this.marker = new this.google.maps.Marker({
        position: bangkok,
        map: this.map,
      });

      this.marker2 = new this.google.maps.Marker({
        position: { lat: 13.7466, lng: 100.5393 },
        map: this.map,
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
