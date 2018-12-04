<template>
  <div class="row">
    <div class="col-md-9">
      <div class="pt-5">
        <h2 class="mb-4">
          Selamat datang di EmpatKali Merchant Dashboard,
          <strong>Ilbisonte</strong>
        </h2>

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col">
                <h4 class="mb-3">Masukkan product promo merchant anda</h4>
                <router-link :to="{ name: 'promotions' }" class="btn btn-secondary">
                  <font-awesome-icon icon="plus"/> Tambah promo
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// handphone, harga, item deskripsi
export default {
  data() {
    return {
      verifyDataInput: {}
    };
  },
  methods: {
    verifyCustomer() {
      let vm = this;
      axios
        .post(
          "https://merchant.empatkali.co.id/utama.php?duit=2000000",
          vm.verifyDataInput
        )
        .then(res => {
          console.log("res", res.data);
        });
      // console.log('verify customer data', vm.verifyDataInput)
    }
  }
};
</script>
