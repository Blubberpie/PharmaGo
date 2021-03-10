import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');
// const About = () => import('../views/About.vue');
const ChatPage = () => import('../views/ChatPage.vue');
const CustomerMap = () => import('@/components/CustomerMap.vue');
const Home = () => import('../views/Home.vue');
const PrescriptionPage = () => import('../views/PrescriptionPage.vue');

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
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiredAuthentication: false,
    },
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage,
    meta: {
      requiredAuthentication: false, // CHANGE LATER
    },
  },
  {
    path: '/prescription',
    name: 'prescription',
    component: PrescriptionPage,
    meta: {
      requiredAuthentication: false, // CHANGE LATER
    },
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
