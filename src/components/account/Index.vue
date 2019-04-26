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
	      							<a href="#" class="float-right" @click.prevent="openModal('EditMerchantProfile')">
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
		    					<td colspan="2" class="table-primary">
		    						<h4 class="mb-0 py-2 p-2">
		    							PIC
		    							<a href="#" class="float-right" @click.prevent="openModal('EditPIC')">
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
	      		</div>
	      	</div>
	      </b-tab>

	      <b-tab title="Bank Account">
	      	<table class="table table-sm table-bordered">
    				<tr>
    					<td colspan="2" class="table-primary">
    						<h4 class="mb-0 py-2 p-2">
    							Bank Account
    							<a href="#" class="float-right" @click.prevent="openModal('EditBankAccount')">
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

	  <!-- Modal -->
		<b-modal v-model="modalShow.editMerchantProfile" title="Edit Merchant Profile"
			@ok.prevent="update('MerchantProfile')"
			ok-title="Update"
			:no-close-on-backdrop="true"
			:no-close-on-esc="true">
			<div>
			  <div class="form-group">
			    <label for="inputMerchantName">Nama Merchant</label>
			    <input type="text" class="form-control" id="inputMerchantName" v-model="modalEdit.merchantProfile.name">
			  </div>
			  <div class="form-group">
			    <label for="inputUsername">Nama Penanggung Jawab</label>
			    <input type="text" class="form-control" id="inputUsername" v-model="modalEdit.merchantProfile.username">
			  </div>
			  <div class="form-group">
			    <label for="inputTelNo">Nomor Telepon</label>
			    <input type="text" class="form-control" id="inputTelNo" v-model="modalEdit.merchantProfile.mobileNumber">
			  </div>
			  <div class="form-group">
			    <label for="inputEmail">Alamat Email</label>
			    <input type="email" class="form-control" id="inputEmail" v-model="modalEdit.merchantProfile.email">
			  </div>
			  <div class="form-group">
			    <label for="inputWebsite">Website</label>
			    <input type="url" class="form-control" id="inputWebsite" v-model="modalEdit.merchantProfile.website">
			  </div>
			  <div class="form-group">
			    <label for="inputImage">Image</label>
			    <input type="url" class="form-control" id="inputImage" v-model="modalEdit.merchantProfile.image">
			  </div>
			  <div class="form-group">
			    <label for="inputFImage">Favicon</label>
			    <input type="url" class="form-control" id="inputFImage" v-model="modalEdit.merchantProfile.fImage">
			  </div>
			</div>
		</b-modal>

		<b-modal v-model="modalShow.editPIC" title="Edit PIC"
			@ok.prevent="update('PIC')"
			ok-title="Update"
			:no-close-on-backdrop="true"
			:no-close-on-esc="true">
			<div>
			  <div class="form-group">
			    <label for="inputName">Name</label>
			    <input type="text" class="form-control" id="inputName" v-model="modalEdit.PIC.name">
			  </div>
			  <div class="form-group">
			    <label for="inputCertNo">Certificate No.</label>
			    <input type="text" class="form-control" id="inputCertNo" v-model="modalEdit.PIC.certNumber">
			  </div>
			  <div class="form-group">
			    <label for="inputAddress">Address</label>
			    <input type="text" class="form-control" id="inputAddress" v-model="modalEdit.PIC.address">
			  </div>
			</div>
		</b-modal>

		<b-modal v-model="modalShow.editBankAccount" title="Edit PIC"
			@ok.prevent="update('BankAccount')"
			ok-title="Update"
			:no-close-on-backdrop="true"
			:no-close-on-esc="true">
			<div>
			  <div class="form-group">
			    <label for="inputBankName">Nama</label>
			    <input type="text" class="form-control" id="inputBankName" v-model="modalEdit.bankAccount.name">
			  </div>
			  <div class="form-group">
			    <label for="inputBankNumber">No Rekening</label>
			    <input type="text" class="form-control" id="inputBankNumber" v-model="modalEdit.bankAccount.number">
			  </div>
			  <div class="form-group">
			    <label for="inputBankHolder">Nama Nasabah</label>
			    <input type="text" class="form-control" id="inputBankHolder" v-model="modalEdit.bankAccount.holder">
			  </div>
			</div>
		</b-modal>
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
			modalShow: {
				editMerchantProfile: false,
				editPIC: false,
				editBankAccount: false,
			},
			modalEdit: {
				merchantProfile: {},
				PIC: {},
				bankAccount: {},
			}
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
				console.log('error', err)
			}
		},

		/**
		 * Open a modal
		 * 
		 * @param  String		type
		 * @param  Object		data
		 */
		openModal(type, data) {
			let vm = this
			switch(type) {
				case 'EditMerchantProfile':
					vm.modalShow.editMerchantProfile = true
					vm.modalEdit.merchantProfile = {
						name: vm.authDetails.merchant.name,
						email: vm.authDetails.merchant.email,
						username: vm.authDetails.merchant.username,
						mobileNumber: vm.authDetails.merchant.mobileNumber,
						website: vm.authDetails.merchant.website,
						image: vm.authDetails.merchant.image,
						fImage: vm.authDetails.merchant.fImage,
					}
					break
				case 'EditPIC':
					vm.modalShow.editPIC = true
					vm.modalEdit.PIC = {
						name: vm.authDetails.pic.name,
						certNumber: vm.authDetails.pic.certNumber,
						address: vm.authDetails.pic.address,
					}
					break
				case 'EditBankAccount':
					vm.modalShow.editBankAccount = true
					vm.modalEdit.bankAccount = {
						number: vm.authDetails.bank.number,
						name: vm.authDetails.bank.name,
						holder: vm.authDetails.bank.holder,
					}
					break
			}
		},

		/**
		 * Update
		 */
		update(type) {
			let vm = this
			switch(type) {
				case 'MerchantProfile':
					axios
						.put('/api/merchants', vm.modalEdit.merchantProfile, vm.requestHeaders)
						.then(res => {
							alert('Merchant Profile updated!')
							vm.authDetails.merchant = res.data
							vm.modalShow.editMerchantProfile = false
						})
					break
				case 'PIC':
					axios
						.put('/api/merchants', { pic: vm.modalEdit.PIC }, vm.requestHeaders)
						.then(res => {
							alert('PIC updated!')
							vm.authDetails.pic = res.data.pic
							vm.modalShow.editPIC = false
						})
					break
				case 'BankAccount':
					axios
						.put('/api/merchants', { bank: vm.modalEdit.bankAccount }, vm.requestHeaders)
						.then(res => {
							alert('Bank updated!')
							vm.authDetails.bank = res.data.bank
							vm.modalShow.editBankAccount = false
						})
					break
			}
		}
	}
}
</script>

<style scoped>
</style>
