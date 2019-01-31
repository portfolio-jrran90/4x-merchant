<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <div class="card">
            <h5 class="card-header text-center">
              <img src="http://empatkali.co.id/img/logo.svg" alt="empatkali">
              <br>Login
            </h5>
            <div class="card-body">
              <form @submit.prevent="login()">
                <div class="form-group row">
                  <div class="col">
                    <input
                      type="text"
                      class="form-control"
                      id="inputEmail"
                      placeholder="Email"
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
  mounted() {
    console.log("redirect", this.$auth.redirect());
  },
  data() {
    return {
      context: "login context",
      data: {
        body: {
          identity: "zarastore",
          password: "P@ssw0rdP@ssw0rd"
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
      let redirect = vm.$auth.redirect();

      vm.$auth
        .login({
          data: vm.data.body, // Axios
          rememberMe: true,
          redirect: "/home",
          fetchUser: false,
          headers: {
            'Authorization': 'Basic ZW1wYXRrYWxpOnZIPHRWQEBFN3cuWDNjWlM=',
            'Content-Type': 'application/json'
          }
        })
        .then(
          res => {
            console.log(res);
            // alert('logging in..')
            // should add some effects for logging in
          },
          err => {
            alert("Invalid Email/Password!");
          }
        );
    }
  }
};
</script>
