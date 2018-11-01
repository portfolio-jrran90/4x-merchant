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
      <embed src="https://merchant.empatkali.co.id/utama.php" style="width: 100%; height: 350px">
      <!-- <form>
        <div class="form-group">
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <font-awesome-icon icon="phone" />
              </div>
            </div>
            <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Handphone">
          </div>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Submit</button>
      </form> -->
    </div>
  </div>
</template>
