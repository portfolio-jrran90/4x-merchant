<template>
  <div class="mb-4 mt-4">
  	<div class="mb-4">
  		<div class="row">
  			<div class="col-md-10">
					<h2 class="mb-0">
						Customers
						<a href="" class="btn btn-primary">Add customer</a>
					</h2>
					<!-- <ul class="list-inline">
						<li class="list-inline-item">
							<a href="#" class="text-secondary">
								<span data-feather="download" style="width: 18px"></span> Import Customers
							</a>
						</li>
						<li class="list-inline-item">
							<a href="#" class="text-secondary">
								<span data-feather="upload" style="width: 18px"></span> Export
							</a>
						</li>
					</ul> -->
  			</div>
  			<!-- <div class="col-md-2 text-right pt-3"> -->
  			<!-- <div class="col-md-2 text-right">
  				<a href="" class="btn btn-primary">Add Customer</a>
  			</div> -->
  		</div>
		</div>
		<div class="card">
		  <!-- <div class="card-header">
		    <ul class="nav nav-tabs card-header-tabs">
		      <li class="nav-item">
		        <a class="nav-link active" href="#">All</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">New</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Returning</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Abandoned checkouts</a>
		      </li>
		      <li class="nav-item">
		        <a class="nav-link" href="#">Email subscribers</a>
		      </li>
		    </ul>
		  </div> -->
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
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search customer" style="border-left: 0">
				</div>
				<table class="table table-striped mb-0" style="border: 0 !important">
					<thead>
						<tr>
							<th colspan="4"><input type="checkbox"></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in customers">
							<th><input type="checkbox"></th>
							<td>
								<!-- <router-link> -->
								<a href="">
									<strong>{{ `${data.firstname} ${data.lastname}` }}</strong> {{ `${data.address1} ${data.city} ${data.country_code}` }}
								</a>
								<!-- </router-link> -->
							</td>
							<td class="text-right">{{ `${data.total_orders} orders`}}</td>
							<td class="text-right">{{ `${Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.total_spent)} spent` }} </td>
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
			customers: {}
		}
	},
	created() {
		let vm = this
		let userData = [{
			firstname: 'Fina',
			lastname: 'Remin',
			email: 'fina@gmail.com',
			company: 'methmedan',
			address1: '123 Fake Street',
			address2: '123 Fake Street',
			city: 'Jakarta',
			province: 'Jakarta Selatan',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: 'no',
			total_spent: 100,
			total_orders: 1,
			tags: '',
			note: '',
			tax_exempt: 'yes'
		},
		{
			firstname: 'Widya',
			lastname: 'Irma',
			email: 'WidyaIR@gmail.com',
			company: 'Ganesha OP',
			address1: '',
			address2: '',
			city: 'Jakarta',
			province: 'Jakarta Barat',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: 'yes',
			total_spent: 200,
			total_orders: 2,
			tags: '',
			note: 'Very nice customer',
			tax_exempt: 'no'
		},
		{
			firstname: 'Barda',
			lastname: 'Wandrata',
			email: 'Barda@gmailc.om',
			company: 'Own Inc',
			address1: '',
			address2: '',
			city: 'Jakarta',
			province: 'Jakarta Pusat',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: '',
			total_spent: 0,
			total_orders: 0,
			tags: '',
			note: '',
			tax_exempt: ''
		},
		{
			firstname: 'Florencia',
			lastname: 'Regina',
			email: 'flo.Ren@gmail.com',
			company: 'Siloam',
			address1: '',
			address2: '',
			city: 'Jakarta',
			province: 'Jakarta Selatan',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: '',
			total_spent: 0,
			total_orders: 0,
			tags: '',
			note: '',
			tax_exempt: ''
		},
		{
			firstname: 'Regina',
			lastname: 'Gina',
			email: 'gina@gmail.com',
			company: 'Grab',
			address1: '',
			address2: '',
			city: 'Jakarta',
			province: 'Jakarta Barat',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: '',
			total_spent: 0,
			total_orders: 0,
			tags: '',
			note: '',
			tax_exempt: ''
		},
		{
			firstname: 'Burman',
			lastname: 'Bagaskara',
			email: 'bagas.burman@gmail.com',
			company: 'Own Inc',
			address1: '',
			address2: '',
			city: 'Jakarta',
			province: 'Jakarta Selatan',
			province_code: '12440',
			country: 'Indonesia',
			country_code: 'ID',
			zip: '12440',
			phone: '',
			accepts_marketing: '',
			total_spent: 0,
			total_orders: 0,
			tags: '',
			note: '',
			tax_exempt: ''
		}]

		vm.customers = userData
	}
}
</script>

<style scoped>
</style>
