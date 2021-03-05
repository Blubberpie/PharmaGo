<template>
  <v-app>
    <Toolbar />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Toolbar,
  },
};
</script>
