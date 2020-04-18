import Home from './views/Home.vue';
import Register from './views/Register.vue';
export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
];
