<template>
  <div>
  	<div class="mb-4">
			<h2 class="">Orders</h2>
			<a href="#" class="text-secondary">
				<span data-feather="upload" style="width: 18px"></span> Export
			</a>
		</div>
		<div class="card">
		  <div class="card-header">
		    <ul class="nav nav-tabs card-header-tabs">
		      <li class="nav-item">
		        <a class="nav-link active" href="#">All</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Open</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Unfulfilled and partially fulfilled</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Unpaid</a>
		      </li>
		    </ul>
		  </div>
			<div class="card-body">
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <button class="btn btn-secondary dropdown-toggle px-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter</button>
				    <div class="dropdown-menu">
				      <a class="dropdown-item" href="#">Action</a>
				      <a class="dropdown-item" href="#">Another action</a>
				      <a class="dropdown-item" href="#">Something else here</a>
				      <div role="separator" class="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Separated link</a>
				    </div>
				    <span class="input-group-text" style="background: transparent">
				    	<span data-feather="search" style="width: 18px"></span>
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search orders" style="border-left: 0">
				</div>
				<table class="table table-striped table-bordered mb-0" style="border: 0 !important">
					<thead>
						<tr>
							<th><input type="checkbox"></th>
							<th>Order</th>
							<th>Date</th>
							<th>Customer</th>
							<th>Payment status</th>
							<th>Fulfillment status</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th><input type="checkbox"></th>
							<td><a href="">#1001</a></td>
							<td>46 minutes ago</td>
							<td>--</td>
							<td><span class="badge badge-pill badge-secondary">Paid</span></td>
							<td><span class="badge badge-pill badge-warning">Unfulfilled</span></td>
							<td>Rp 0.00</td>
						</tr>
						<tr>
							<th><input type="checkbox"></th>
							<td><a href="">#1001</a></td>
							<td>46 minutes ago</td>
							<td>--</td>
							<td><span class="badge badge-pill badge-secondary">Paid</span></td>
							<td><span class="badge badge-pill badge-warning">Unfulfilled</span></td>
							<td>Rp 0.00</td>
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
