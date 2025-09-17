import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
//     {
// <<<<<<< HEAD
//       path: '/:id',
//       name: 'home',
//       component: HomeView,
//       id:'',
//       meta:{ requireAuth: true},
// // =======
// //       path: '/',
// //       name: 'Acceuil',
// //       component: MainLayout,
// // >>>>>>> d279e39372d0e81ef030bd00a05c2a5f95d33b94
//     },
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
      path: '/ConfirmMail',
      name: 'confirmMail',
      component: () => import('../views/mailConfirmView.vue'),
    },
  ],
})

export default router
