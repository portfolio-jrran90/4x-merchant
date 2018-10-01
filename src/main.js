import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

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
	{ path: '/login', component: Login },
	{
		path: '/', component: Dashboard, name: 'dashboard', redirect: '/home',
		children: [
			{ path: '/home', component: Home, name: 'home' },
			// Orders
			{
				path: '/orders', component: Orders, name: 'orders', redirect: '/orders/',
				children: [
					{ path: '/', component: OrdersAll, name: 'orders-all' },
					{ path: 'draft', component: OrdersDraft, name: 'orders-draft' },
					{ path: 'abandoned-checkouts', component: OrdersAbandonedCheckouts, name: 'orders-abandoned-checkouts' },
				]
			},
			// Products
			{
				path: '/products', component: Products, name: 'products', redirect: '/products/',
				children: [
					{ path: '/', component: ProductsAll, name: 'products-all' },
					{ path: ':productId', component: ProductShow, name: 'product-show' },
					{ path: 'transfers', component: ProductsTransfers, name: 'products-transfers' },
					{ path: 'inventory', component: ProductsInventory, name: 'products-inventory' },
					{ path: 'collections', component: ProductsCollections, name: 'products-collections' },
				]
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

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
