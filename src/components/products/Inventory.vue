<template>
  <div>
  	<h2 class="mb-5">Inventory</h2>
		<h4>Manage your inventory</h4>
		<p>Enable inventory tracking for each of your products to see when stock levels are low.</p>
		<router-link :to="{ name: 'products-all' }" class="btn btn-primary">View Products</router-link>
  </div>
</template>

<script>
export default {
	data() {
		return {
			filter: {
				dateFrom: new Date().toString(),
				dateTo: new Date(),
			}
		}
	},
	created() {
		
	}
}
</script>

<style scoped>
</style>
