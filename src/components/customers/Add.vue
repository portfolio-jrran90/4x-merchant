<template>
  <div>
  	<router-link to="/customers" class="mt-2 mb-4" style="display: inline-block">&larr; back to customers</router-link>
  	<h2 class="mb-4">Add Customer</h2>

  	<div class="row">
  		<div class="col-md-8">
				<form>
				  <div class="form-row">
				    <div class="form-group col-md-6">
				      <label for="inputFirstname">First name</label>
				      <input type="text" class="form-control" id="inputFirstname">
				    </div>
				    <div class="form-group col-md-6">
				      <label for="inputLastname">Last name</label>
				      <input type="text" class="form-control" id="inputLastname">
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="inputEmail">E-mail</label>
				    <input type="email" class="form-control" id="inputEmail">
				  </div>
				  <div class="form-group">
				    <label for="inputAddress1">Address 1</label>
				    <input type="text" class="form-control" id="inputAddress1">
				  </div>
				  <div class="form-group">
				    <label for="inputAddress2">Address 2</label>
				    <input type="text" class="form-control" id="inputAddress2">
				  </div>
				  <div class="form-row">
				    <div class="form-group col-md-4">
				      <label for="inputCity">City</label>
				      <input type="text" class="form-control" id="inputCity">
				    </div>
				    <div class="form-group col-md-4">
				      <label for="inputProvince">Province</label>
				      <input type="text" class="form-control" id="inputProvince">
				    </div>
				    <div class="form-group col-md-4">
				      <label for="inputZipCode">Zip Code</label>
				      <input type="text" class="form-control" id="inputZipCode">
				    </div>
				  </div>
				  <button type="submit" class="btn btn-primary">Add customer</button>
				</form>
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
				if (customerData[elem].id == 1) {
					vm.customer = customerData[elem]
				}
			}
	}
}
</script>

<style scoped>
</style>
