<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link
        :to="{ name: 'dashboard' }"
        class="navbar-brand col-sm-3 col-md-2 mr-0"
      >
        <img :src="'../assets/img/EmpatKali_Logo_White.png'" alt="" style="width: 121px">
      </router-link>

      <span class="w-100 pl-4 font-weight-bold" style="color: #fff">
        Welcome {{ authDetail.name }}
      </span>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a href="#" class="nav-link btn-signout" @click.prevent="logout()">
            Sign out
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
                  <img :src="'../assets/img/home.png'" alt=""> <span>Home</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'transactions' }" class="nav-link">
                  <img :src="'../assets/img/report.png'" alt=""> <span>Sales Report</span>
                </router-link>
              </li>
              <!-- <li class="nav-item">
                <router-link :to="{ name: 'inbox' }" class="nav-link">
                  <font-awesome-icon icon="envelope"/> Inbox
                </router-link>
              </li> -->
              <li class="nav-item">
                <router-link :to="{ name: 'stores' }" class="nav-link">
                  <img :src="'../assets/img/stores.png'" alt=""> <span>Stores</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'account-settings' }" class="nav-link">
                  <img :src="'../assets/img/setting.png'" alt=""> <span>Account Settings</span>
                </router-link>
              </li>
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
import axios from 'axios'

export default {
  data() {
    return {
      requestHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      },
      authDetail: {}
    }
  },
  created() {
    this.getAuthDetail()
  },
  methods: {
    getAuthDetail() {
      let vm = this
      axios
        .get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, vm.requestHeaders)
        .then(res => vm.authDetail = res.data)
    },
    logout() {
      this.$auth.logout({
        redirect: "/login"
      });
    }
  }
};
</script>

<style scoped>
body {
  font-size: 0.875rem;
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
  /* box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1); */
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
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
  padding: 14px 16px;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link img{
  width: 24px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.sidebar .nav-link span{
  display: inline-block;
  vertical-align: middle;
  font-weight: 700;
  color: #353D46;
  line-height: 1;
}

.sidebar .nav-link.active span {
  color: #393C8E;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*Submenus*/
.sidebar .submenu {
  margin-bottom: 5px;
}
.sidebar .submenu a {
  font-size: 14px;
  color: #333;
}
.sidebar .submenu .active {
  color: #007bff;
}

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
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background: #020D18;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15); */
  height: 54px;
}

.navbar-nav{
  background-color: #353D46 !important;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

.btn-signout{
  background: #393C8E;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #FFFFFF !important;
  opacity: 1;
  padding: 8px 18px;
}

</style>
