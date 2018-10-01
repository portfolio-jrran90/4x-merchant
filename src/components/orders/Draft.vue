<template>
  <div>
  	<div class="mb-4">
  		<div class="row">
  			<div class="col-md-10">
					<h2>Drafts</h2>
					<a href="#" class="text-secondary">
						<span data-feather="upload" style="width: 18px"></span> Export
					</a>
  			</div>
  			<div class="col-md-2 text-right pt-3">
  				<a href="" class="btn btn-primary">Create Order</a>	
  			</div>
  		</div>
		</div>
		<div class="card">
		  <div class="card-header">
		    <ul class="nav nav-tabs card-header-tabs">
		      <li class="nav-item">
		        <a class="nav-link active" href="#">Draft Orders</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Open</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Invoice Sent</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Completed</a>
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
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search draft orders" style="border-left: 0">
				</div>
				<table class="table table-striped table-bordered mb-0" style="border: 0 !important">
					<thead>
						<tr>
							<th><input type="checkbox"></th>
							<th>Draft</th>
							<th>Date</th>
							<th>Customer</th>
							<th>Status</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th><input type="checkbox"></th>
							<td><a href="">#D1</a></td>
							<td>3:56pm</td>
							<td>--</td>
							<td><span class="badge badge-pill badge-secondary">Open</span></td>
							<td>₱0.00</td>
						</tr>
						<tr>
							<th><input type="checkbox"></th>
							<td><a href="">#D1</a></td>
							<td>3:56pm</td>
							<td>--</td>
							<td><span class="badge badge-pill badge-secondary">Open</span></td>
							<td>₱0.00</td>
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
