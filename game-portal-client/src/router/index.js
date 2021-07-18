import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HangmanGamePage from '../modules/Hangman/pages/HangmanGamePage'
import TicTacToeGamePage from '../modules/TicTacToe/pages/TicTacToeGamePage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/HangmanGame',
    name: "HangmanGame",
    component: HangmanGamePage
  },
  {path:'/tictactoe',
  name:'TicTacToeGame',
  component: TicTacToeGamePage}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
