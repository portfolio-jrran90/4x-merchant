import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faHome,
	faChartPie,
	faShoppingCart,
	faUsers,
	faShoppingBag,
	faPhone,
	faExchangeAlt,
	faBullhorn,
	faSearch
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome,faChartPie,faShoppingCart,faUsers,faShoppingBag,faPhone,faExchangeAlt,faBullhorn,faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
// Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Route components
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Home from './components/Home.vue'
// Orders
import Orders from './components/orders/__Main.vue'
import OrdersAll from './components/orders/Index.vue'
import OrdersDraft from './components/orders/Draft.vue'
import OrdersAbandonedCheckouts from './components/orders/OrdersAbandonedCheckouts.vue'
// Products
import Products from './components/products/__Main.vue'
import ProductsAll from './components/products/Index.vue'
import ProductShow from './components/products/Show.vue'
import ProductsTransfers from './components/products/Transfers.vue'
import ProductsInventory from './components/products/Inventory.vue'
import ProductsCollections from './components/products/Collections.vue'
// Transactions
import Transactions from './components/transactions/Index.vue'
// Promos
import Promotions from './components/promotions/Index.vue'
// Analytics
import Analytics from './components/analytics/__Main.vue'
import AnalyticsDashboards from './components/analytics/Dashboards.vue'
import AnalyticsReports from './components/analytics/Reports.vue'
import AnalyticsLiveViews from './components/analytics/LiveViews.vue'
// Customers
import Customers from './components/customers/__Main.vue'
import CustomersAll from './components/customers/Index.vue'
import CustomerShow from './components/customers/Show.vue'
import CustomerAdd from './components/customers/Add.vue'

const routes = [
	{ path: '*', redirect: '/login'},
	{ path: '/login', component: Login, meta: { auth: false } },
	{
		path: '/', component: Dashboard, name: 'dashboard', redirect: '/home',
		meta: { auth: true },
		children: [
			{ path: '/home', component: Home, name: 'home' },
			// Orders
			{
				path: '/orders', component: Orders, name: 'orders', redirect: '/orders/',
				children: [
					{ path: '/', component: OrdersAll, name: 'orders-all' },
					/*{ path: 'draft', component: OrdersDraft, name: 'orders-draft' },
					{ path: 'abandoned-checkouts', component: OrdersAbandonedCheckouts, name: 'orders-abandoned-checkouts' },*/
				]
			},
			// Products
			{
				path: '/products', component: Products, name: 'products', redirect: '/products/',
				children: [
					{ path: '/', component: ProductsAll, name: 'products-all' },
					/*{ path: ':productId', component: ProductShow, name: 'product-show' },
					{ path: 'transfers', component: ProductsTransfers, name: 'products-transfers' },
					{ path: 'inventory', component: ProductsInventory, name: 'products-inventory' },
					{ path: 'collections', component: ProductsCollections, name: 'products-collections' },*/
				]
			},
			// Transactions
			{
				path: '/transactions', component: Transactions, name: 'transactions', /*redirect: '/transactions/',*/
				/*children: [
					{ path: '/', component: ProductsAll, name: 'products-all' },
					{ path: ':productId', component: ProductShow, name: 'product-show' },
					{ path: 'transfers', component: ProductsTransfers, name: 'products-transfers' },
					{ path: 'inventory', component: ProductsInventory, name: 'products-inventory' },
					{ path: 'collections', component: ProductsCollections, name: 'products-collections' },
				]*/
			},
			// Promos
			{
				path: '/promotions', component: Promotions, name: 'promotions'
			},
			// Analytics
			{
				path: '/analytics', component: Analytics, name: 'analytics', redirect: '/analytics/',
				children: [
					{ path: '/', component: AnalyticsDashboards, name: 'analytics-dashboards' },
					{ path: 'reports', component: AnalyticsReports, name: 'analytics-reports' },
					{ path: '/', component: AnalyticsLiveViews, name: 'analytics-live-views' },
				]
			},
			// Customers
			{
				path: '/customers', component: Customers, name: 'customers', redirect: '/customers/',
				children: [
					{ path: '/', component: CustomersAll, name: 'customers-all' },
					{ path: ':customerId', component: CustomerShow, name: 'customer-show' },
					{ path: 'add', component: CustomerAdd, name: 'customer-add' },
				]
			}
		]
	},
]

const router = new VueRouter({
	linkActiveClass: 'active', // set as default value for active links
	mode: 'history',
	routes
})

// this really solves issue.. lol
Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
	auth: {
	    request(req, token) {
	        this.options.http._setHeaders.call(this, req, { Authorization: `Bearer ${token}` });
	    },
	    response(res) {
			var token = res.data.jwt
			if (token) {
				token = token.split(/Bearer\:?\s?/i);
				return token[token.length > 1 ? 1 : 0].trim()
			}
	    },
	},
	// auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
	http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
	loginData: {url: `${process.env.VUE_APP_API_URL}/auth`, method: 'POST', redirect: '/login'},
	authRedirect: { path: `${process.env.VUE_APP_API_URL}/auth` },
	tokenDefaultName: 'auth_token',
	refreshData: { enabled: false },
	fetchData: { enabled: false }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
