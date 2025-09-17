import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminView from '@/views/AdminView.vue'
import DashboardComponent from '@/components/DashboardComponent.vue'

import AboutUsView from '@/views/AboutUsView.vue'
import MailConfirmView from '@/views/mailConfirmView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const routes= [
  {
    path: '/',
      name: 'Acceuil',
      component: MainLayout,
      user:'',
    },
     {
      path: '/lessons/:user/:id',
      name: 'lessons',
      component: () => import('@/views/ProductLessonsViews.vue')
    },
    {
     path:'/product/:user/:id',
      name:'product',
      component: () => import('@/views/ProductDetailView.vue')
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
      path: '/authentification',
      name: 'authentification',
      component: AuthLayout
    },
    {
      path: '/ConfirmMail/:user',
      name: 'confirmMail',
      component: MailConfirmView
    },
    // {
    //   path: '/',
    //   name: '',
    //   // component: () => import('../views/AboutView.vue'),
    // },
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
