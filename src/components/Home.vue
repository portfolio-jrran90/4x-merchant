<template>

  <div class="row">
    <div class="col-md-7">
      <div class="pt-5">
        <h2 class="mb-4">
          Selamat datang di EmpatKali Merchant Dashboard, <strong>Ilbisonte</strong>
        </h2>

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h4 class="mb-3">Masukkan product promo merchant anda</h4>
                <router-link :to="{ name: 'promotions' }" class="btn btn-primary">Add promo</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 pt-5">
      <!-- <embed src="https://merchant.empatkali.co.id/utama.php" style="width: 100%; height: 350px"> -->
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="verifyCustomer">
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <font-awesome-icon icon="phone" />
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="Handphone" v-model="verifyDataInput.handphone">
              </div>
            </div>
            <div class="form-group">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <font-awesome-icon icon="coins" />
                  </div>
                </div>
                <input type="text" class="form-control" placeholder="0,00" v-model="verifyDataInput.harga">
              </div>
            </div>
            <div class="form-group">
              <textarea rows="5" class="form-control" placeholder="Item deskripsi" v-model="verifyDataInput.itemdeskripsi"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// handphone, harga, item deskripsi
export default {
  data() {
    return {
      verifyDataInput: {}
    }
  },
  methods: {
    verifyCustomer() {
      let vm = this
      axios.post('https://merchant.empatkali.co.id/utama.php?duit=2000000', vm.verifyDataInput).then(res => {
        console.log('res', res.data)
      })
      // console.log('verify customer data', vm.verifyDataInput)
    }
  }
}
</script>
