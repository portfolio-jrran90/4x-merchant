<template>
  <div>
    <div class="row">
    	<div class="col">
				<div class="card">
				  <div class="card-body text-center">
				  	<div class="mb-3">
				  		<font-awesome-icon icon="hammer" size="6x" />
				  	</div>
				  	<h4 class="mb-0">Store Setup</h4>
				  </div>
				</div>
    	</div>
    	<div class="col">
				<div class="card">
				  <div class="card-body text-center">
				  	<div class="mb-3">
				  		<font-awesome-icon icon="cog" size="6x" />
				  	</div>
				  	<h4 class="mb-0">Advance Setting</h4>
				  </div>
				</div>
    	</div>
    	<div class="col">
				<div class="card">
				  <div class="card-body text-center">
				  	<div class="mb-3">
				  		<font-awesome-icon icon="credit-card" size="6x" />
				  	</div>
				  	<h4 class="mb-0">Bank Account</h4>
				  </div>
				</div>
    	</div>
    	<div class="col">
    		<router-link :to="{ name: 'as-midtrans' }">
					<div class="card">
					  <div class="card-body text-center">
					  	<div class="mb-3">
					  		<font-awesome-icon icon="credit-card" size="6x" />
					  	</div>
					  	<h4 class="mb-0">Midtrans API</h4>
					  </div>
					</div>
				</router-link>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
	/*data() {},
	created() {}*/
}
</script>

<style scoped>
</style>
