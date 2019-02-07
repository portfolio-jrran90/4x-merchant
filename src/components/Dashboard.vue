<template>
  <div>

    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link :to="{ name: 'dashboard' }" class="navbar-brand col-sm-3 col-md-2 mr-0">
        Empatkali Merchant
      </router-link>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a href="#" class="nav-link" @click.prevent="logout()">
            <span data-feather="log-out"></span> Sign out
          </a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link">
                  <font-awesome-icon icon="home" /> Home
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link :to="{ name: 'orders' }" class="nav-link">
                  <font-awesome-icon icon="shopping-cart" /> Orders
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'products' }" class="nav-link">
                  <font-awesome-icon icon="shopping-bag" /> Products
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link :to="{ name: 'transactions' }" class="nav-link">
                  <font-awesome-icon icon="exchange-alt" /> Transaksi
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'promotions' }" class="nav-link">
                  <font-awesome-icon icon="bullhorn" /> Promosi
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'customers' }" class="nav-link">
                  <font-awesome-icon icon="users" /> Pelanggan
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'stores' }" class="nav-link">
                  <font-awesome-icon icon="store" /> Store
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'addStore' }" class="nav-link">
                  <font-awesome-icon icon="plus" /> Add User
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'account-setting' }" class="nav-link">
                  <font-awesome-icon icon="cog" /> Settings
                </router-link>
              </li>

              <!-- <li class="nav-item">
                <router-link :to="{ name: 'analytics' }" class="nav-link">
                  <font-awesome-icon icon="chart-pie" /> Analytics
                </router-link>
                <ul class="list-unstyled submenu" style="margin-left: 40px" v-if="$router.currentRoute.name=='analytics-dashboards' || $router.currentRoute.name=='analytics-reports' || $router.currentRoute.name=='analytics-live-views'">
                  <router-link :to="{ name: 'analytics-dashboards' }" tag="li">
                    <a href="">Dashboards</a>
                  </router-link>
                  <router-link :to="{ name: 'analytics-reports' }" tag="li">
                    <a href="">Reports</a>
                  </router-link>
                  <router-link :to="{ name: 'analytics-live-views' }" tag="li">
                    <a href="">Live Views</a>
                  </router-link>
                </ul>
              </li> -->
              <!-- <li class="nav-item">
                <router-link :to="{ name: 'discounts' }" class="nav-link">
                  <span data-feather="dollar-sign"></span>
                  Discounts
                </router-link>
              </li> -->
            </ul>
          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    methods: {
      logout() {
        this.$auth.logout({
          // makeRequest: true,
          success() {
            // console.log(res.data)
            console.log('success');
          },
          error() {
            console.log('error');
          },
          redirect: '/login'
        });
      }
    }
  }
</script>

<style scoped>
  body {
    font-size: .875rem;
  }

  .feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
  }

  /*
   * Sidebar
   */

  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100; /* Behind the navbar */
    padding: 48px 0 0; /* Height of navbar */
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
  }

  .sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  @supports ((position: -webkit-sticky) or (position: sticky)) {
    .sidebar-sticky {
      position: -webkit-sticky;
      position: sticky;
    }
  }

  .sidebar .nav-link {
    font-weight: 500;
    color: #333;
  }

  .sidebar .nav-link .feather {
    margin-right: 4px;
    color: #999;
  }

  .sidebar .nav-link.active {
    color: #007bff;
  }

  .sidebar .nav-link:hover .feather,
  .sidebar .nav-link.active .feather {
    color: inherit;
  }

  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }

  /*Submenus*/
  .sidebar .submenu {
    margin-bottom: 5px;
  }
  .sidebar .submenu a {
    font-size: 14px;
    color: #333;
  }/*
  .sidebar .submenu .active {
    color: #007bff;
  }*/

  /*
   * Content
   */

  [role="main"] {
    padding-top: 48px; /* Space for fixed navbar */
  }

  /*
   * Navbar
   */
  .navbar-brand {
    padding-top: .75rem;
    padding-bottom: .75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  }

  .navbar .form-control {
    padding: .75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, .1);
    border-color: rgba(255, 255, 255, .1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
  }
</style>
