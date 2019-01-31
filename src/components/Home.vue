<template>
  <div class="row">
    <div class="col-md-9">
      <div class="pt-5">
        <h2 class="mb-4">
          Selamat datang di EmpatKali Merchant Dashboard
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
export default {}
</script>
