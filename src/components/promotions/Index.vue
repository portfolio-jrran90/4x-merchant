<template>
  <div class="py-4">
		<h2>
			<font-awesome-icon icon="bullhorn" />
			Promotions
		</h2>
		<div class="card">
		  <div class="card-header">
				<div class="input-group mb-0">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search a promo">
				</div>
		  </div>
			<div class="card-body">
				<table class="table table-striped table-bordered mb-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th class="text-right">Price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Promo 1</td>
							<td>Description for promo 1</td>
							<td class="text-right">Rp 0.00</td>
						</tr>
						<tr>
							<td>Promo 1</td>
							<td>Description for promo 1</td>
							<td class="text-right">Rp 0.00</td>
						</tr>
						<tr>
							<td>Promo 1</td>
							<td>Description for promo 1</td>
							<td class="text-right">Rp 0.00</td>
						</tr>
						<tr>
							<td>Promo 1</td>
							<td>Description for promo 1</td>
							<td class="text-right">Rp 0.00</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
		}
	},
	created() {}
}
</script>

<style scoped>
</style>
