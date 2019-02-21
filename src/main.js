import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import VeeValidate from 'vee-validate';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue';

import 'vue2-daterange-picker/dist/lib/vue-daterange-picker.min.css'

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faChartPie,
  faShoppingCart,
  faUsers,
  faUser,
  faShoppingBag,
  faPhone,
  faExchangeAlt,
  faBullhorn,
  faSearch,
  faCoins,
  faStore,
  faPlus,
  faUserPlus,
  faCog,
  faCreditCard,
  faHammer,
  faEnvelope,
  faCalendarCheck
  // faTools
  // faCashRegister
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faHome,
  faChartPie,
  faShoppingCart,
  faUsers,
  faUser,
  faShoppingBag,
  faPhone,
  faExchangeAlt,
  faBullhorn,
  faSearch,
  faCoins,
  faStore,
  faPlus,
  faUserPlus,
  faCog,
  faCreditCard,
  faHammer,
  faEnvelope,
  faCalendarCheck
  // faTools
  // faCashRegister
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(VeeValidate);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBRRJRioAVgvCyzU7ETrnomHNd9RxKkok8',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});
Vue.use(VueSweetalert2)

// Filters
import './filters/index'

// Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Route components
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
// Orders
import Orders from './components/orders/__Main.vue';
import OrdersAll from './components/orders/Index.vue';
import OrdersDraft from './components/orders/Draft.vue';
import OrdersAbandonedCheckouts from './components/orders/OrdersAbandonedCheckouts.vue';
// Products
import Products from './components/products/__Main.vue';
import ProductsAll from './components/products/Index.vue';
import ProductShow from './components/products/Show.vue';
import ProductsTransfers from './components/products/Transfers.vue';
import ProductsInventory from './components/products/Inventory.vue';
import ProductsCollections from './components/products/Collections.vue';
// Transactions
import Transactions from './components/transactions/Index.vue';
// Promos
import Promotions from './components/promotions/Index.vue';
// Analytics
import Analytics from './components/analytics/__Main.vue';
import AnalyticsDashboards from './components/analytics/Dashboards.vue';
import AnalyticsReports from './components/analytics/Reports.vue';
import AnalyticsLiveViews from './components/analytics/LiveViews.vue';
// Customers
import Customers from './components/customers/__Main.vue';
import CustomersAll from './components/customers/Index.vue';
import CustomerShow from './components/customers/Show.vue';
import CustomerAdd from './components/customers/Add.vue';

// Mobile {test}
import Mobile from './components/mobile/Mobile.vue';
import Sco from './components/mobile/Sco.vue';
import Brodo from './components/mobile/Bro.do.vue';
import Buccheri from './components/mobile/Buccheri.vue';
import Eiger from './components/mobile/EigerAdventure.vue';
import EsGotado from './components/mobile/EsGotado.vue';
import Gutenic from './components/mobile/GuTenic.vue';
import KickDenim from './components/mobile/KickDenim.vue';
import matoaIndo from './components/mobile/matoaIndo.vue';
import shopPromo1 from './components/mobile/shopPromo1.vue';
import shopPromo2 from './components/mobile/shopPromo2.vue';
import Tomkins from './components/mobile/Tomkins.vue';

// Store
// import Store from './components/stores/Index.vue';

// Add User Store Merchant
import AddStore from './components/addStore/Index.vue';

// Settings
import AccountSetting from './components/settings/__Main.vue'
import AccountSettingIndex from './components/settings/Index.vue'
import AccountSettingUser from './components/settings/User.vue'
import AccountSettingAccount from './components/settings/Account.vue'
import AccountSettingBankAccount from './components/settings/BankAccount.vue'
import Store from './components/stores/Index.vue' // re-organize
import AccountSettingMidtrans from './components/settings/Midtrans.vue'

// Activate Merchant
import ActivateMerchant from './components/ActivateMerchant.vue'

// Sales Reports
import SalesReport from './components/sales-reports/Index.vue'

// Inbox
import InboxIndex from './components/inbox/Index.vue'

const routes = [
  { path: '*', redirect: '/login' },
  { path: '/login', component: Login, meta: { auth: false } },
  //  start For Mobile Promotion Link fake Purchases
  {
    path: '/mobile',
    component: Mobile,
    name: 'mobile',
  },
  {
    path: '/mobile/sco',
    component: Sco,
    name: 'sco',
  },
  {
    path: '/mobile/brodo',
    component: Brodo,
    name: 'brodo',
  },
  {
    path: '/mobile/buccheri',
    component: Buccheri,
    name: 'buccheri',
  },
  {
    path: '/mobile/eiger',
    component: Eiger,
    name: 'eiger',
  },
  {
    path: '/mobile/esgotado',
    component: EsGotado,
    name: 'esgotado',
  },
  {
    path: '/mobile/gutenic',
    component: Gutenic,
    name: 'gutenic',
  },
  {
    path: '/mobile/kickdenim',
    component: KickDenim,
    name: 'kickdenim',
  },
  {
    path: '/mobile/matoaindo',
    component: matoaIndo,
    name: 'matoaindo',
  },
  {
    path: '/mobile/shoppromo1',
    component: shopPromo1,
    name: 'shoppromo1',
  },
  {
    path: '/mobile/shoppromo2',
    component: shopPromo2,
    name: 'shoppromo2',
  },
  {
    path: '/mobile/tomkins',
    component: Tomkins,
    name: 'tomkins',
  },
  // End For Mobile Promotion Link fake Purchases

  // Activate merchant
  {
    path: '/activation',
    component: ActivateMerchant
  },
  {
    path: '/',
    component: Dashboard,
    name: 'dashboard',
    redirect: '/home',
    meta: { auth: true },
    children: [
      { path: '/home', component: Home, name: 'home' },
      // Orders
      {
        path: '/orders',
        component: Orders,
        name: 'orders',
        redirect: '/orders/',
        children: [
          { path: '/', component: OrdersAll, name: 'orders-all' },
          /*{ path: 'draft', component: OrdersDraft, name: 'orders-draft' },
					{ path: 'abandoned-checkouts', component: OrdersAbandonedCheckouts, name: 'orders-abandoned-checkouts' },*/
        ],
      },
      // Products
      {
        path: '/products',
        component: Products,
        name: 'products',
        redirect: '/products/',
        children: [
          { path: '/', component: ProductsAll, name: 'products-all' },
          /*{ path: ':productId', component: ProductShow, name: 'product-show' },
					{ path: 'transfers', component: ProductsTransfers, name: 'products-transfers' },
					{ path: 'inventory', component: ProductsInventory, name: 'products-inventory' },
					{ path: 'collections', component: ProductsCollections, name: 'products-collections' },*/
        ],
      },
      // Transactions
      {
        path: '/transactions',
        component: Transactions,
        name: 'transactions' /*redirect: '/transactions/',*/,
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
        path: '/promotions',
        component: Promotions,
        name: 'promotions',
      },
      // Analytics
      {
        path: '/analytics',
        component: Analytics,
        name: 'analytics',
        redirect: '/analytics/',
        children: [
          {
            path: '/',
            component: AnalyticsDashboards,
            name: 'analytics-dashboards',
          },
          {
            path: 'reports',
            component: AnalyticsReports,
            name: 'analytics-reports',
          },
          {
            path: '/',
            component: AnalyticsLiveViews,
            name: 'analytics-live-views',
          },
        ],
      },
      // Customers
      {
        path: '/customers',
        component: Customers,
        name: 'customers',
        redirect: '/customers/',
        children: [
          { path: '/', component: CustomersAll, name: 'customers-all' },
          {
            path: ':customerId',
            component: CustomerShow,
            name: 'customer-show',
          },
          { path: 'add', component: CustomerAdd, name: 'customer-add' },
        ],
      },

      // Store
      {
        path: '/stores',
        component: Store,
        name: 'stores',
      },
      // Add User Store
      // Note: Subject for deletion
      {
        path: '/addStore',
        component: AddStore,
        name: 'addStore',
      },
      
      // Store Settings
      {
        path: '/settings',
        component: AccountSetting,
        name: 'settings',
        redirect: '/settings/user',
        children: [
          // { path: '/', component: AccountSettingIndex, name: 'as-index' },
          // { path: 'midtrans-api', component: AccountSettingMidtrans, name: 'as-midtrans' },
          { path: 'user', component: AccountSettingUser, name: 'user-setting' },
          { path: 'account', component: AccountSettingAccount, name: 'account-setting' },
          { path: 'bank-account', component: AccountSettingBankAccount, name: 'bank-account-setting' },
          { path: 'add-user-store', component: Store, name: 'add-user-store-setting' },
        ]
      },

      // Sales Reports
      {
        path: '/sales-reports',
        component: SalesReport,
        name: 'sales-reports',
      },

      // Inbox
      {
        path: '/inbox',
        component: InboxIndex,
        name: 'inbox',
      },

    ],
  },
];

const router = new VueRouter({
  linkActiveClass: 'active', // set as default value for active links
  mode: 'history',
  routes,
});

Vue.router = router;

Vue.use(require('@websanova/vue-auth'), {
  auth: {
    request(req, token) {
      this.options.http._setHeaders.call(this, req, {
        Authorization: `Bearer ${token}`,
      });
    },
    response(res) {
      var token = res.data.token
      if (token) {
        token = token.split(/Bearer\:?\s?/i);
        return token[token.length > 1 ? 1 : 0].trim();
      }
    },
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: `${process.env.VUE_APP_API_URL}/api/merchants/login`,
    method: 'POST',
    redirect: '/login',
  },
  authRedirect: { path: `${process.env.VUE_APP_API_URL}/api/merchants/login` },
  tokenDefaultName: 'auth_token',
  refreshData: { enabled: false },
  fetchData: { enabled: false }
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
