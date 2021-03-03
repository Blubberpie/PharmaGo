<template>
  <div class="home">
    <!-- Provides the application the proper gutter -->
    <v-container>
      <v-btn color="secondary" @click="drawer = true">
        open drawer
      </v-btn>
      <v-navigation-drawer v-model="drawer" :width="400" absolute bottom temporary right>
        <v-sheet>
          <h1 align="center" style="margin: 25px">Header</h1>
          <p align="center" style="margin: 25px">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </p>
          <v-row justify="center">
            <v-btn color="secondary">
              Chat
            </v-btn>
            <v-btn color="primary">
              Info
            </v-btn>
          </v-row>
        </v-sheet>
      </v-navigation-drawer>
      <v-row align="center" justify="center" style="font-size: 40px;">
        WELLCOME {{ name }} !!!</v-row
      >
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      pharmacices: [
        {
          name: 'Place',
          location: 'Location 1',
        },
        // {
        //   name: 'Holder',
        //   location: 'Location 2',
        // },
        // {
        //   name: 'Pharmacy',
        //   location: 'Location 3',
        // },
        // {
        //   name: 'Name',
        //   location: 'Location 4',
        // },
        // {
        //   name: 'Even',
        //   location: 'Location 5',
        // },
        // {
        //   name: 'More',
        //   location: 'Location 6',
        // },
        // {
        //   name: 'Names',
        //   location: 'Location 7',
        // },
      ],
      name: 'Place holder user',
      drawer: false,
    };
  },
};
</script>

<style scoped>
.card {
  padding: 10px;
  flex: 1;
  /* border-radius: 20px; */
}
</style>
