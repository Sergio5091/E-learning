import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:user',
      name: 'Acceuil',
      component: MainLayout,
      id:'',
    },
    {
      path: '/cours',
      name: 'Cours',
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/a-propos',
      name: 'About',
      // component: () => import('@/'),
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
    },
    // {
    //   path: '/',
    //   name: '',
    //   // component: () => import('../views/AboutView.vue'),
    // },
    {
      path: '/',
      name: 'authentification',
      component: () => import('../layouts/AuthLayout.vue'),
    },
    {
      path: '/ConfirmMail/:user',
      name: 'confirmMail',
      component: () => import('../views/mailConfirmView.vue'),
    },
  ],
})

export default router
