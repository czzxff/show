import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home.vue'
import List from '@/views/list.vue'
import Detail from '@/views/detail.vue'
import Register from '@/views/register.vue'
import Scroll from '@/components/scroll/scroll.vue'
import City from '@/components/home/city.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/scroll',
      name: 'scroll',
      component: Scroll
    },
    {
      path: '/city',
      name: 'city',
      component: City
    }
  ]
})
