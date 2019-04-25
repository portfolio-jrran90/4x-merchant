<template>
  <div class="py-4">
    <h2 class="mb-3">
      <font-awesome-icon icon="cog"/> Account Settings
    </h2>
	  <b-card no-body>
	    <b-tabs pills card vertical nav-wrapper-class="w-25">
	      <b-tab title="Merchant Profile" active>
	      	<div class="row">
	      		<div class="col-md-3">
	      		<figure class="figure">
							<img :src="authDetails.merchant.image" class="rounded figure-img img-fluid" :alt="authDetails.merchant.name">
							<figcaption class="figure-caption text-center">Main Image</figcaption>
						</figure>
	      		<figure class="figure">
							<img :src="authDetails.merchant.fImage" class="rounded figure-img img-fluid" :alt="authDetails.merchant.name">
							<figcaption class="figure-caption text-center">Favicon Image</figcaption>
						</figure>
	      		</div>
	      		<div class="col">
	      			<table class="table table-bordered table-sm">
	      				<tr>
	      					<td colspan="2" class="table-primary">
	      						<h4 class="mb-0 p-2">
	      							Merchant Profile
	      							<a href="" class="float-right">
	      								<font-awesome-icon icon="edit" />
	      							</a>
	      						</h4>
	      					</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary w-50">Nama Merchant</td>
	      					<td>{{ authDetails.merchant.name }}</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">Nama Penanggung Jawab</td>
	      					<td>{{ authDetails.merchant.username }}</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">No. Akta Perusahaan</td>
	      					<td></td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">Nomor Telepon</td>
	      					<td>{{ authDetails.merchant.mobileNumber }}</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">Alamat Email</td>
	      					<td>{{ authDetails.merchant.email }}</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">Website</td>
	      					<td>
	      						<a :href="authDetails.merchant.website" target="_blank">
	      							{{ authDetails.merchant.website }}
	      						</a>
	      					</td>
	      				</tr>
	      				<tr>
	      					<td class="table-secondary">Alamat</td>
	      					<td></td>
	      				</tr>
	      			</table>
	      		</div>
	      	</div>
	      </b-tab>

	      <b-tab title="PIC">
	      	<table class="table table-sm table-bordered">
    				<tr>
    					<td colspan="2" class="table-primary">
    						<h4 class="mb-0 py-2 p-2">
    							PIC
    							<a href="" class="float-right">
    								<font-awesome-icon icon="edit" />
    							</a>
    						</h4>
    					</td>
    				</tr>
    				<tr>
    					<td class="w-25 table-secondary">Name</td>
    					<td>{{ authDetails.pic.name }}</td>
    				</tr>
    				<tr>
    					<td class="table-secondary">Certificate No.</td>
    					<td>{{ authDetails.pic.certNumber }}</td>
    				</tr>
    				<tr>
    					<td class="table-secondary">Address</td>
    					<td>{{ authDetails.pic.address }}</td>
    				</tr>
	      	</table>
	      </b-tab>

	      <b-tab title="Bank Account">
	      	<table class="table table-sm table-bordered">
    				<tr>
    					<td colspan="2" class="table-primary">
    						<h4 class="mb-0 py-2 p-2">
    							Bank Account
    							<a href="" class="float-right">
    								<font-awesome-icon icon="edit" />
    							</a>
    						</h4>
    					</td>
    				</tr>
    				<tr>
    					<td class="table-secondary w-25">Nama</td>
    					<td>{{ authDetails.bank.name }}</td>
    				</tr>
    				<tr>
    					<td class="table-secondary">No Rekening</td>
    					<td>{{ authDetails.bank.number }}</td>
    				</tr>
    				<tr>
    					<td class="table-secondary">Nama Nasabah</td>
    					<td>{{ authDetails.bank.holder }}</td>
    				</tr>
	      	</table>
	      </b-tab>
	    </b-tabs>
	  </b-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			requestHeaders: {
	      headers: {
	        Authorization: process.env.VUE_APP_AUTHORIZATION,
	        'x-access-token': localStorage.getItem('auth_token')
	      }
			},
			authDetails: {},
		}
	},
	created() {
		this.getAuthDetails()
	},
	methods: {
		/**
		 * Get authenticated details
		 */
		async getAuthDetails() {
			let vm = this

			let merchantDtl = await axios.get('/api/merchants/detail', vm.requestHeaders)

			try {
				let picDtl = await axios.get(`/api/merchants/${merchantDtl.data._id}/pic`, vm.requestHeaders)
				let bankDtl = await axios.get(`/api/merchants/${merchantDtl.data._id}/bank`, vm.requestHeaders)

				vm.authDetails = {
					merchant: merchantDtl.data,
					pic: picDtl.data,
					bank: bankDtl.data
				}
			} catch (err) {
				console.log('aa', err)
			}

		}
	}
}
</script>

<style scoped>
</style>
