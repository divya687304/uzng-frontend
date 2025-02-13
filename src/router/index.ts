/// <reference types="vite/client" />

import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    //   meta: {
    //     title: 'Home Page - Example App',
    //     metaTags: [
    //       {
    //         name: 'description',
    //         content: 'The home page of our example app.'
    //       },
    //       {
    //         property: 'og:description',
    //         content: 'The home page of our example app.'
    //       }
    //     ]
    //   }
    // }
  ]
})

export default router
