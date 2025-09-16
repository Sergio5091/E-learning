import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminView from '@/views/AdminView.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'

import AboutUsView from '@/views/AboutUsView.vue'

const routes= [
  {
    path: '/',
      name: 'Acceuil',
      component: MainLayout,
    },
    {
      path: '/cours',
      name: 'Cours',
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/a-propos',
      name: 'About',
      component: AboutUsView,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
    },
    {
      path: '/profil',
      name: 'profil',
      component: DashboardComponent,
    },
  ]
  
  const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass : "lien-actif", //spécifie la classe CSS a appliquer aux liens actifs dans la barre de navigation.Lorsqu’un lien est actif, il recevra cette classe CSS.
  })
  


export default router
