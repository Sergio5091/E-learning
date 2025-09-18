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
    path: '/:user',
      name: 'home',
      component: MainLayout,
      id:'',
    },
     {
      path: '/lessons/:id',
      name: 'lessons',
      component: () => import('@/views/ProductLessonsViews.vue')
    },
     {
      path: '/lessons/:id/:user',
      name: 'lesson',
      component: () => import('@/views/ProductLessonsViews.vue')
    },
    {
     path:'/product/:id',
      name:'product',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
     path:'/product/:id/:user',
      name:'products',
      component: () => import('@/views/ProductDetailView.vue')
    },
    {
      path: '/a-propos',
      name: 'About',
      component: AboutUsView,
    },
    {
      path: '/a-propos/:user',
      name: 'Abouts',
      component: AboutUsView,
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layouts/AuthLayout.vue'),
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
  
  router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || "null")
  const isAuthenticated = token === 'true' && user !== null
  // Si l'utilisateur est déjà connecté, inutile d'aller sur la page Auth
  if (to.name === 'auth' && isAuthenticated) {
    next(false) // redirige par exemple vers la page d'accueil
  } 
  else {
    next()
  }
})



export default router
