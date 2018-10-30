<template>
  <div class="py-4">
		<h2>
			<font-awesome-icon icon="exchange-alt" />
			Transaction
		</h2>
		<div class="card">
		  <div class="card-header">
		    <ul class="nav nav-tabs card-header-tabs">
		      <li class="nav-item">
		        <a class="nav-link active" href="#">Approved</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Pending</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Not approve</a>
		      </li>
		    </ul>
		  </div>
			<div class="card-body">
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search transaction" style="border-left: 0">
				</div>
				<table class="table table-striped table-bordered mb-0" style="border: 0 !important">
					<thead>
						<tr>
							<!-- <th><input type="checkbox"></th> -->
							<th>Order #</th>
							<th>Date</th>
							<th>Payment status</th>
							<th class="text-right">Total price</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<!-- <th><input type="checkbox"></th> -->
							<td><a href="">#1001</a></td>
							<td>2010-10-10</td>
							<td><span class="badge badge-pill badge-success">4x approve payment</span></td>
							<td class="text-right">Rp 0.00</td>
						</tr>
						<tr>
							<!-- <th><input type="checkbox"></th> -->
							<td><a href="">#1002</a></td>
							<td>2010-10-12</td>
							<td><span class="badge badge-pill badge-warning">Pending</span></td>
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
