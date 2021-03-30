import Vue from 'vue';
import VueRouter from 'vue-router';

const Login = () => import('@/components/Login.vue');
const Register = () => import('@/components/Register.vue');
// const About = () => import('../views/About.vue');
const ChatPage = () => import('../views/ChatPage.vue');
const CustomerMap = () => import('@/components/CustomerMap.vue');
const Home = () => import('../views/Home.vue');
const PrescriptionPage = () => import('../views/PrescriptionPage.vue');
const DeliveryStatusPage = () => import('@/views/DeliveryStatuses.vue');
const Driver = () => import('@/components/Driver.vue');
const PharmacyRegistration = () => import('@/views/PharmacyRegistration.vue');
const PendingPrescriptions = () => import('@/views/PendingPrescriptions.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/customer/map',
    name: 'customer-map',
    component: CustomerMap,
    meta: {
      requiredAuthentication: true,
      userRole: 'Customer',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiredAuthentication: false,
      redirectWhenLoggedIn: true,
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
      requiredAuthentication: true, // CHANGE LATER
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
    path: '/customer/status',
    name: 'status',
    component: DeliveryStatusPage,
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
      redirectWhenLoggedIn: true,
    },
  },
  {
    path: '/driver', // Rename?
    name: 'driver',
    component: Driver,
    meta: {
      requiredAuthentication: false, // CHANGE LATER
    },
  },
  {
    path: '/pharmacy/register-pharmacy',
    name: 'pharmacy-registration',
    component: PharmacyRegistration,
    meta: {
      requiredAuthentication: true,
      userRole: 'Pharmacy',
    },
  },
  {
    path: '/customer/pending-prescriptions',
    name: 'pending-prescriptions',
    component: PendingPrescriptions,
    meta: {
      requiredAuthentication: true,
      userRole: 'Customer',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

const beforeRouteEnter = async (to, from, next) => {
  if (to.meta.requiredAuthentication) {
    // Redirect user if not logged in
    if (Vue.$store.getters['auth/authenticated']) {
      next();
    } else {
      next({ name: 'login' });
    }
  } else next();

  if (to.meta.userRole) {
    // Redirect user if user role does not match
    if (to.meta.userRole !== Vue.$store.getters['auth/getUserRole']) {
      // TODO: FIX async BUG
      next({ name: 'home' });
    } else next();
  } else next();

  if (to.meta.redirectWhenLoggedIn) {
    // Redirect user if logged in but tried to access login/register
    if (Vue.$store.getters['auth/authenticated']) {
      next({ name: 'home' });
    } else next();
  } else next();
};

router.beforeEach(beforeRouteEnter);

Vue.$router = router;

export default router;
