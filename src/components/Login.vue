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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: "login context",
      data: {
        body: {
          identity: "",
          password: ""
        },
        rememberMe: false,
        fetchUser: true
      },
      error: null
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
    }
  }
};
</script>
