import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#D4F2F2',
        secondary: '#6C9FAA',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
});