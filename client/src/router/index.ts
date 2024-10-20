import Disk from '@/pages/Disk.vue'
import Registration from '@/pages/Registration.vue'
import Login from '@/pages/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'Disk', component: Disk},
    {path: '/registration', name: 'Registration', component: Registration},
    {path: '/login', name: 'Login', component: Login}
  ]
})

export default router
