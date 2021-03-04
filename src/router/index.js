import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');
const About = () => import('../views/About.vue');
const CustomerMap = () => import('@/components/CustomerMap.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/map',
    name: 'map',
    component: CustomerMap,
    meta: {
      requiredAuthentication: false, // CHANGE LATER
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiredAuthentication: false,
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    component: About,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiredAuthentication: false,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
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

Vue.$router = router;

export default router;
