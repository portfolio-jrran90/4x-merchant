<template>
  <div>
  	<router-link to="/customers" class="mt-2 mb-4" style="display: inline-block">&larr; back to customers</router-link>
  	<!-- <h2 class="mb-5">{{ product.title }}</h2> -->

  	<div class="row">
  		<div class="col-md-3">
  			<img :src="customer.image" alt="" class="img-thumbnail" style="width: 250px">
  		</div>
  		<div class="col">
		  	<table class="table table-bordered">
		  		<tbody>
		  			<tr>
		  				<th class="table-info">Name</th>
		  				<td class="table-light">{{ `${customer.firstname} ${customer.lastname}` }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">E-mail</th>
		  				<td class="table-light">{{ customer.email }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Company</th>
		  				<td class="table-light">{{ customer.company }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Address 1</th>
		  				<td class="table-light">{{ customer.address1 }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Address 2</th>
		  				<td class="table-light">{{ customer.address2 }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">City</th>
		  				<td class="table-light">{{ customer.city }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Province</th>
		  				<td class="table-light">{{ customer.province }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Province Code</th>
		  				<td class="table-light">{{ customer.province_code }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Country</th>
		  				<td class="table-light">{{ customer.country }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Zip</th>
		  				<td class="table-light">{{ customer.zip }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Phone</th>
		  				<td class="table-light">{{ customer.phone }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Accept Marketing</th>
		  				<td class="table-light">{{ customer.accepts_marketing }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Total Spent</th>
		  				<td class="table-light">{{ `Rp ${customer.total_spent}` }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Total Orders</th>
		  				<td class="table-light">{{ `Rp ${customer.total_orders}` }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Tags</th>
		  				<td class="table-light">{{ customer.tags }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Note</th>
		  				<td class="table-light">{{ customer.note }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Tax Exempt</th>
		  				<td class="table-light">{{ customer.tax_exempt }}</td>
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
			customer: {}
		}
	},
	created() {
		let vm = this
		let customerData = [{
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
	
			vm.customer = {};
			for (let elem in customerData) {
				if (customerData[elem].id == vm.$route.params.customerId) {
					vm.customer = customerData[elem]
				}
			}
	}
}
</script>

<style scoped>
</style>
