<template>
  <div>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-4">
          <div class="card">
            <h5 class="card-header text-center">
              <img src="https://empatkali.co.id/img/logo.svg" alt="empatkali"><br>
              Login
            </h5>
            <div class="card-body">

              <form @click.prevent="login">
                <div class="form-group row">
                  <div class="col">
                    <input type="email" class="form-control" placeholder="Email">
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col">
                    <input type="password" class="form-control" placeholder="Password">
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
    return {}
  },
  methods: {
    login() {
      this.$router.push('/')
    }
  }
}
</script>
