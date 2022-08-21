import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import All from '../views/All.vue'
import Kanto from '../views/Kanto.vue'
import Johto from '../views/Johto.vue'
import Hoenn from '../views/Hoenn.vue'
import Test from '../views/Test.vue'
import PokemonDetailView from '../views/PokemonDetailView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'all',
    component: All
  },
  {
    path: '/kanto',
    name: 'kanto',
    component: Kanto
  },
  {
    path: '/johto',
    name: 'johto',
    component: Johto
  },
  {
    path: '/hoenn',
    name: 'hoenn',
    component: Hoenn
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/pokemon/:name/:id',
    name: 'pokemon',
    component: PokemonDetailView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
