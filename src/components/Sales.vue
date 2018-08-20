<template>
  <div>

    <div class="pt-3 mb-4">
      <h2 class="border-bottom pb-3 mb-4">Sales</h2>
			<!-- Filter -->
			<div class="form-inline">
			  <select class="custom-select my-1 mr-sm-2">
			    <option selected>Select payment status</option>
			    <option value="1">One</option>
			    <option value="2">Two</option>
			    <option value="3">Three</option>
			  </select>

				<div class="input-group">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<span data-feather="calendar"></span>
				    </span>
				  </div>
				  <input type="date" class="form-control" aria-label="Username" v-model="filter.dateFrom">
				</div>
				<input type="date" class="form-control mx-sm-2" readonly>
			  <button type="submit" class="btn btn-primary my-1">Export to CSV</button>
			</div>
		</div>

		<table class="table table-sm table-bordered table-striped">
			<thead class="thead-dark">
				<tr>
					<th>Status</th>
					<th>Date-In</th>
					<th>ID</th>
					<th>Item Details</th>
					<th>Amount</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
				</tr>
			</tbody>
		</table>

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
