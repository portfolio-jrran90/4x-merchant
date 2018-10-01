<template>
  <div>
		<h2 class="mb-5">Abandoned Checkouts</h2>
		<h4>Manage your abandoned checkouts</h4>
		<p>An abandoned checkout happens when a customer adds<br>items to their cart but doesn't complete the checkout process.</p>
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
