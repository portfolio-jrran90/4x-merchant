<template>

  <div class="row">
    <div class="col-md-8">
      <div class="pt-5">
        <h2 class="mb-4">
          Selamat datang di EmpatKali Merchant Dashboard, <strong>Merchant Name</strong>
        </h2>

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <h4>Add your first product</h4>
                <p class="mb-4">You can add physical items, digital downloads, services, or anything else you dream up.</p>
                <router-link :to="{ name: 'products' }" class="btn btn-primary">Add product</router-link>
              </div>
              <div class="col-md-4 text-center">
                <img src="https://cdn.shopify.com/s/assets/admin/home/onboarding/home-onboard-prod-complete-a6f218ca2009b9a3d21ab21d90aa7573f8de9785a4af49cd248cf3b1846d8f8a.svg" alt="" style="width: 150px">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 pr-0">
      <ul class="list-group">
        <li class="list-group-item">
          <h6>TOTAL SALES</h6>
          <p class="mb-0">There were no sales during this time.</p>
        </li>
        <li class="list-group-item">
          <a href="">View Dashboard</a>
        </li>
        <li class="list-group-item">
          <h6>TOTAL SALES BREAKDOWN</h6>
          <p class="mb-0">There were no sales during this time.</p>
        </li>
        <li class="list-group-item">
          <h6>TOP PRODUCTS</h6>
          <p class="mb-0">There were no products sold during this time.</p>
        </li>
        <li class="list-group-item list-group-item-light">
          <h6 style="color: #000">ACTIVITY</h6>
          <ul class="list-unstyled">
            <li>
              <p>
                You created a new product: productname
                <span>September 28, 2018 at 3:19 PM GMT+8</span>
              </p>
            </li>
            <li>
              <p>
                jhon rey ranario added payment provider: Pay Pal Express Checkout
                <span>September 28, 2018 at 3:17 PM GMT+8</span>
              </p>
            </li>
            <li>
              <a href="">View all recent activity</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  /*.totalContainer h5 {
    font-size: 1.8em;
  }
  .totalContainer .totalCount {
    line-height: normal;
    font-weight: bold;
    font-size: 3.5em;
  }
  .totalContainer .totalType {
    line-height: normal;
    font-size: 1.2em;
  }*/
</style>
