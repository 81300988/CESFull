import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Hello from '@/components/Hello'
import SearchPage from '@/components/SearchPage'
import PriceListpage from '@/components/PriceListpage'
import ExtraChange from '@/components/ExtraChange'
import Places from '@/components/Places'
import Routes from '@/components/Routes'
import Configuration from '@/components/Configuration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Hello
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchPage
    },
    {
      path: '/pricelist',
      name: 'Pricelist',
      component: PriceListpage
    },
    {
      path: '/extrachange',
      name: 'extrachange',
      component: ExtraChange
    },
    {
      path: '/places',
      name: 'places',
      component: Places
    },
    {
      path: '/routes',
      name: 'routes',
      component: Routes
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: Configuration
    }
  ]
})
