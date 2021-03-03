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
      markers: [],
      fakePharmacies: [
        {
          id: 0,
          name: 'Pharmacy A',
          position: { lat: 13.76187570301321, lng: 100.52704439146251 },
        },
        {
          id: 1,
          name: 'Pharmacy B',
          position: { lat: 13.7466, lng: 100.5393 },
        },
        {
          id: 2,
          name: 'Pharmacy C',
          position: { lat: 13.757932503826476, lng: 100.51911803172393 },
        },
        {
          id: 3,
          name: 'Pharmacy D',
          position: { lat: 13.759915404360612, lng: 100.48575094210922 },
        },
        {
          id: 4,
          name: 'Pharmacy E',
          position: { lat: 13.746925600924257, lng: 100.50941622721052 },
        },
      ],
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
      this.fakePharmacies.forEach((pharm) => {
        const newMarker = new this.google.maps.Marker({
          position: pharm.position,
          map: this.map,
        });
        newMarker.addListener('click', () => {
          this.map.setZoom(18);
          this.map.setCenter(newMarker.getPosition());
          // TODO More click events here
        });
        this.markers.push(
          {
            id: pharm.id,
            name: pharm.name,
            marker: newMarker,
          },
        );
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
