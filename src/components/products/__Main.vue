<template>
  <div class="pt-4 mb-4">
		<router-view></router-view>
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
