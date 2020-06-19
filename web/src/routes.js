import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import EmailConfirmed from './views/EmailConfirmed.vue';

export const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/register', name: 'register', component: Register },
  { path: '/', name: 'login', component: Login },
  {
    path: '/email-confirmed',
    name: 'emailConfirmed',
    component: EmailConfirmed,
  },
];
