<template>
  <div>

    <div class="pt-3">
      
      <h2 class="border-bottom pb-3 mb-4">Summary</h2>

      <div class="row totalContainer">
        <div class="col-3">
          <div class="card bg-light">
            <div class="card-body"s>
              <h5 class="mb-0 c-total-1">Total</h5>
              <p class="mb-0 text-center totalCount">0</p>
              <p class="mb-0 text-right">Transactions</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light">
            <div class="card-body">
              <h5 class="mb-0">Total</h5>
              <p class="mb-0 text-center totalCount">$0</p>
              <p class="mb-0 text-right">&nbsp;</p>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="card bg-light">
            <div class="card-body">
              <h5 class="mb-0">Total</h5>
              <p class="mb-0 text-center totalCount">0</p>
              <p class="mb-0 text-right totalType">Reject</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .totalContainer h5 {
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
  }
</style>
