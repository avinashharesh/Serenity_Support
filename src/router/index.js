import { createRouter, createWebHistory } from 'vue-router';
import Registration from '@/views/Registration.vue';

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Registration
  }
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
