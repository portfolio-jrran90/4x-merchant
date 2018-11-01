<template>
  <div class="mb-4">
		<h2>
			<font-awesome-icon icon="users" /> Customers
			<!-- <router-link :to="{ name: 'customer-add' }" class="btn btn-primary">Add customer</router-link> -->
		</h2>	
		<div class="card">
		  <div class="card-header">
		    <div class="input-group">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search a customer">
				</div>
		  </div>
			<div class="card-body">
				<table class="table table-striped mb-0 table-bordered" style="border: 0 !important">
					<thead>
						<tr>
							<th>Handphone Customer</th>
							<th>Jumlah Pembelian</th>
							<th class="text-right">Harga Total Pembelian</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in customers">
							<td>{{ data.HP }}</td>
							<td>{{ `${data.jumlah} orders`}}</td>
							<td class="text-right">{{ `${Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.total)} spent` }} </td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			customers: {}
		}
	},
	created() {
		let vm = this
		axios.get(`${process.env.VUE_APP_API_URL}/cust`).then(res => vm.customers = res.data)
	}
}
</script>

<style scoped>
</style>
