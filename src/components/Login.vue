<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <div class="card">
            <h5 class="card-header text-center">
              <img src="https://empatkali.co.id/assets/img/logo-final.png" alt="empatkali logo" style="width: 50px" class="mb-2">
              <br>Merchant Login
            </h5>
            <div class="card-body">
              <form @submit.prevent="login()">
                <div class="form-group row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail"
                      placeholder="Email/Username"
                      v-model="data.body.identity"
                    >
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col">
                    <input
                      type="password"
                      class="form-control"
                      id="inputPassword"
                      placeholder="Password"
                      v-model="data.body.password"
                    >
                  </div>
                </div>
                <div class="form-group row mb-0">
                  <div class="col">
                    <button type="submit" class="btn btn-block btn-secondary">Sign in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="mt-1">
            <a href="#" @click.prevent="openModal('forgot-password')">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>

    <b-modal v-model="modal.showForgot" title="Forgot Password" ok-title="Update"
      @ok.prevent="forgotPassword">
      <div class="form-group mb-0">
        <input type="email" class="form-control" v-model="modal.forgot.email">
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      requestedHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      },
      context: "login context",
      data: {
        body: {
          identity: "",
          password: ""
        },
        rememberMe: false,
        fetchUser: true
      },
      error: null,
      modal: {
        showForgot: false,
        forgot: {
          email: ''
        }
      }
    };
  },
  methods: {
    login() {
      let vm = this;
      vm.$auth
        .login({
          data: vm.data.body, // Axios
          rememberMe: true,
          redirect: "/home",
          fetchUser: false,
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'Content-Type': 'application/json'
          }
        })
        .then(
          res => {},
          err => {
            alert("Invalid Email/Password!");
          }
        );
    },

    /**
     * Open modal
     * 
     * @param  String type
     */
    openModal(type) {
      let vm = this
      if (type === 'forgot-password') {
        vm.modal.showForgot = true
      }
    },

    /**
     * Forgot password
     */
    forgotPassword() {
      let vm = this
      axios
        .post('/api/merchants/resetpassword', { email: vm.modal.forgot.email }, vm.requestedHeaders)
        .then(res => {
          alert(res.data.message)
          vm.modal.showForgot = false
        })
    }
  }
};
</script>
