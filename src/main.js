import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// Route components
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Summary from './components/Summary.vue'
import Sales from './components/Sales.vue'
import Goods from './components/Goods.vue'
import Finance from './components/Finance.vue'

const routes = [
	// { path: '*', redirect: '/summary'},
	{ path: '/login', component: Login },
	{
		path: '/', component: Dashboard, redirect: '/summary',
		children: [
			{ path: '/summary', component: Summary },
			{ path: 'sales', component: Sales },
			{ path: '/goods', component: Goods },
			{ path: '/finance', component: Finance },
		]
	},
	/*{ path: '/summary', component: Dashboard },
	{ path: '/sales', component: Sales },
	{ path: '/goods', component: Goods },
	{ path: '/finance', component: Finance },*/
]

const router = new VueRouter({
	// hashbang: false,
	linkActiveClass: 'active', // set as default value for active links
	// mode: 'history',
	routes
})


Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
