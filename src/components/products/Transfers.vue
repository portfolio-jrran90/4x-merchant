<template>
  <div>
  	<h2 class="mb-5">Transfers</h2>
		<h4>Manage your inventory transfers</h4>
		<p>Track and receive your incoming inventory from suppliers.</p>
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
