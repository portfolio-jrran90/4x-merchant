<template>
  <div class="row">
    <div class="col-md-10">
      <div class="pt-5">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h2 class="mb-0">Selamat datang di Empatkali Merchant Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      auth: {}
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => this.auth = res.data)
  }
}
</script>
