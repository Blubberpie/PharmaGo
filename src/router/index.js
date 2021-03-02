import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// const Login = () => import('@/components/Login.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   meta: {
  //     requiredAuthentication: false,
  //   },
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// const beforeRouteEnter = async (to, from, next) => {
//   if (to.meta.requiredAuthentication) {
//     if (Vue.$store.getters['auth/authenticated']) {
//       next();
//     } else {
//       next({ name: 'login' });
//     }
//   } else {
//     next();
//   }
// };

// router.beforeEach(beforeRouteEnter);

// Vue.$router = router;

export default router;
