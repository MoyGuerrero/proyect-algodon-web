import LoginLayout from '@/module/auth/layout/LoginLayout.vue'
import { mainRoutes } from '@/module/main/routes'
import NotFound from '@/module/no-found/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginLayout,
    },

    mainRoutes,
    {
      path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
