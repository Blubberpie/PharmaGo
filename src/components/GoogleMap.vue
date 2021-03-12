<template>
  <div id="map"/>
</template>

<script>
import { Loader } from 'google-maps';

export default {
  name: 'GoogleMap',
  props: {
    places: {
      type: Object,
    },
  },
  data() {
    return {
      google: null,
      map: null,
      markers: [],
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    async initMap() {
      const options = {};
      const loader = new Loader('AIzaSyC8oXnYPjm2GihFIjDsFt9iwDfCflvcRos', options);

      const mapStyles = [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ];

      this.google = await loader.load();
      const bangkok = { lat: 13.7563, lng: 100.5018 };
      this.map = new this.google.maps.Map(document.getElementById('map'), {
        center: bangkok,
        zoom: 14,
        styles: mapStyles,
      });

      this.createMarkers();
    },
    createMarkers() {
      Object.entries(this.places).forEach((entry) => {
        const [key, place] = entry;
        const newMarker = new this.google.maps.Marker({
          position: place.location,
          map: this.map,
        });
        newMarker.addListener('click', () => {
          this.handleMarkerClick(key, place, newMarker);
        });
        this.markers.push(
          {
            id: key,
            name: place.name,
            description: place.description,
            marker: newMarker,
          },
        );
      });
    },
    handleMarkerClick(key, place, marker) {
      this.map.setZoom(18);
      this.map.panTo(marker.getPosition());
      this.$emit('handleMarkerClick', key, place);
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
