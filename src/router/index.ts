import { createRouter, createWebHistory } from 'vue-router'

let paginaActiva = 'inicio' // Define la variable fuera del router

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: () => import('../pages/HomePage/InicioFL.vue')
    },
    {
      path: '/flashcards',
      name: 'flashcards',
      component: () => import('../pages/HomePage/components/FlashCards.vue')
    },
    {
      path: '/flashcards/:id',
      name: 'flashcards-detail',
      component: () => import('../pages/FlashcardsDetail/FlashcardsDetailPage.vue')
    },
    {
      path: '/inicio',
      name: 'inicio',
      component: () => import('../pages/HomePage/InicioFL.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginPage/LoginPage.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/RegisterPage/RegisterPage.vue')
    },
    {
      path: '/creacionfc',
      name: 'creacionfc',
      component: () => import('../pages/CreateSetPage/CreateSetPage.vue')
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: () => import('../pages/QuizzesPage/QuizzesPage.vue')
    },
    {
      path:'/quizzes/:id',
      name:'quiz-detail',
      component: () => import('../pages/QuizzesPage/PreguntaQuiz.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name && typeof to.name === 'string') {
    // Si la ruta tiene un nombre y es una cadena de texto, actualiza la variable paginaActiva
    paginaActiva = to.name // Actualiza la variable directamente
  }
  next()
})

export default router
