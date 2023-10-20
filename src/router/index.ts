import { createRouter, createWebHistory } from 'vue-router'

let paginaActiva = 'inicio'; // Define la variable fuera del router

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('../pages/HomePage/HomePage.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name) {
    // Si la ruta tiene un nombre, actualiza la variable paginaActiva
    paginaActiva = to.name; // Actualiza la variable directamente
  }
  next()
})

export default router;