<template>
  <div class="mb-4">
		<h2>
			<font-awesome-icon icon="users" /> Customers
			<router-link :to="{ name: 'customer-add' }" class="btn btn-primary">Add customer</router-link>
		</h2>	
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
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
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
								<router-link :to="{ name: 'customer-show', params: { customerId:  data.id } }">
									<strong>{{ `${data.firstname} ${data.lastname}` }}</strong> {{ `${data.address1} ${data.city} ${data.country_code}` }}
								</router-link>
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
			id: 1,
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
			id: 2,
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
			id: 3,
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
			id: 4,
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
			id: 5,
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
			id: 6,
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
