<template>
  <div>
    <Toolbar />
    <h1>hi</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import Toolbar from '@/components/Toolbar.vue';

export default {
  name: 'Home',
  components: {
    Toolbar,
  },
};
</script>
