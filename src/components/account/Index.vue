<template>
  <div class="py-4">
    <h2 class="mb-3 page-title">
			<img :src="'../assets/img/setting.png'" alt="" class="page-title-img"> <span>Account Settings</span> 
    </h2>
		<b-card no-body>
			<b-tabs pills card vertical nav-class="p-3" nav-wrapper-class="w-25">

	      <b-tab title="Merchant Profile" title-link-class="menu-item-div" active>
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
	      							<a v-if="isUserSuperAdmin" href="#" class="float-right" @click.prevent="openModal('EditMerchantProfile')">
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
		    							<a v-if="isUserSuperAdmin" href="#" class="float-right" @click.prevent="openModal('EditPIC')">
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

	      <b-tab title="Bank Account" title-link-class="menu-item-div">
	      	<table class="table table-sm table-bordered">
    				<tr>
    					<td colspan="2" class="table-primary">
    						<h4 class="mb-0 py-2 p-2">
    							Bank Account
    							<a v-if="isUserSuperAdmin" href="#" class="float-right" @click.prevent="openModal('EditBankAccount')">
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

	      <b-tab title="Change password" title-link-class="menu-item-div">
	      	<h4>Change Password</h4>
	      	<hr>
	      	<p>
	      		Further instruction(s) for changing/resetting your password will be sent to this email address
	      		<strong><u>{{ authDetails.merchant.email }}</u></strong>
	      	</p>
	      	<button v-if="isUserSuperAdmin" class="btn btn-primary px-5" @click="changePassword">Send</button>
	      </b-tab>

				<b-tab title="Contract" title-link-class="menu-item-div">
					<div class="contract-container">
						<!-- <vue-pdf :src="authDetails.contract"></vue-pdf> -->
						<iframe id="pdf-div" :src="authDetails.contract" frameborder="0" type="application/pdf" allowtransparency="true"></iframe>
						<!-- <embed id="pdf-div" :src="`https://drive.google.com/viewerng/viewer?embedded=false&url=${ authDetails.contract }`"> -->
						<!-- <div class="text-center">
							<img :src="'../assets/img/EmpatKali_Logo.png'" alt="" class="mb-4" style="width: 330px;">
						</div>

						<div class="d-flex mt-3 mb-4">
							<div class="flex-grow-1">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec vel vulputate nulla, quis consequat risus. Quisque
								ullamcorper justo neque, sit amet malesuada erat effict
								ur vel. Proin ut egestas purus. Sed bibendum, purus vitae
								suscipit semper, odio metus posuere mauris, nec tempu
								s mi velit luctus dolor. Maecenas et fringilla enim. Duis ut
								magna id enim fermentum tincidunt id id metus. Donec
								consectetur facilisis purus et posuere. Pellentesque a nis
								bibendum, efficitur nisi nec, ornare nibh.
							</div>

							<div class="flex-grow-1">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec vel vulputate nulla, quis consequat risus. Quisque
								ullamcorper justo neque, sit amet malesuada erat effict
								ur vel. Proin ut egestas purus. Sed bibendum, purus vitae
								suscipit semper, odio metus posuere mauris, nec tempu
								s mi velit luctus dolor. Maecenas et fringilla enim. Duis ut
								magna id enim fermentum tincidunt id id metus. Donec
								consectetur facilisis purus et posuere. Pellentesque a nis
								bibendum, efficitur nisi nec, ornare nibh.
							</div>
						</div>

						<div class="d-flex">
							<div class="flex-grow-1">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec vel vulputate nulla, quis consequat risus. Quisque
								ullamcorper justo neque, sit amet malesuada erat effict
								ur vel. Proin ut egestas purus. Sed bibendum, purus vitae
								suscipit semper, odio metus posuere mauris, nec tempu
								s mi velit luctus dolor. Maecenas et fringilla enim. Duis ut
								magna id enim fermentum tincidunt id id metus. Donec
								consectetur facilisis purus et posuere. Pellentesque a nis
								bibendum, efficitur nisi nec, ornare nibh.
							</div>

							<div class="flex-grow-1">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec vel vulputate nulla, quis consequat risus. Quisque
								ullamcorper justo neque, sit amet malesuada erat effict
								ur vel. Proin ut egestas purus. Sed bibendum, purus vitae
								suscipit semper, odio metus posuere mauris, nec tempu
								s mi velit luctus dolor. Maecenas et fringilla enim. Duis ut
								magna id enim fermentum tincidunt id id metus. Donec
								consectetur facilisis purus et posuere. Pellentesque a nis
								bibendum, efficitur nisi nec, ornare nibh.
							</div>
						</div> -->
					</div>
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
import pdf from 'vue-pdf'

export default {
	data() {
		return {
			requestHeaders: {
	      headers: {
	        Authorization: process.env.VUE_APP_AUTHORIZATION,
					'x-access-token': localStorage.getItem('auth_token'),
					'Access-Control-Allow-Origin': '*',
	      }
			},
			authDetails: {
				contract: null
			},
			modalShow: {
				editMerchantProfile: false,
				editPIC: false,
				editBankAccount: false,
			},
			modalEdit: {
				merchantProfile: {},
				PIC: {},
				bankAccount: {},
			},
			isUserSuperAdmin: false,
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
					bank: bankDtl.data,
					contract: null,
				}
				console.log(merchantDtl);
				vm.isUserSuperAdmin = merchantDtl.data.adminMerchant ? false : true;

				await vm.getContract();
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
		},

		/**
		 * Change password
		 */
		changePassword() {
			let vm = this
			axios
				.post('/api/merchants/resetpassword', { email: vm.authDetails.merchant.email }, vm.requestHeaders)
				.then(res => {
					alert(res.data.message)
		      vm.$auth.logout({ redirect: "/login" })
				})
		},

		/**
		 * For Contract PDF data
		 */
		getContract() {
			let vm = this
			axios
				.get(`/api/merchants/${vm.authDetails.merchant._id}/contract`, vm.requestHeaders)
				.then(res => {
					console.log(res);
					vm.authDetails.contract = res.data.data.image;

					// let image = res.data.data.image;

					// axios
					// 	.get(image, vm.requestHeaders)
					// 	.then(response => {
					// 		console.log(response);
					// 	})

					// vm.authDetails.contract = {
					// 	url: res.data.data.image,
					// 	httpHeaders: vm.requestHeaders.header,
					// 	withCredentials: true,
					// }
					// vm.authDetails.contract = pdf.createLoadingTask(res.data.data.image, {
					// 	withCredentials: true,
					// 	httpHeaders: vm.requestHeaders.headers
					// });

					// vm.authDetails.contract.promise.then(pdf => {
					// 	console.log(pdf);
					// 	vm.numPages = pdf.numPages;
					// });
				})
		},
	}
}
</script>

<style>
	.menu-item-div{
    border-radius: 10px !important;
    font-weight: 600;
    height: 46px;
		line-height: 30px;
		margin-bottom: 5px;
	}
</style>

<style lang="scss" scoped>
  .page-title{
    .page-title-img{
      width: 24px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
    }
    span{
      vertical-align: middle;
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
    }
	}
	.card{
    border-radius: 10px;
	}
	.contract-container{
		// max-height: 500px;
		height: 500px;
		// overflow-y: auto;

		#pdf-div{
			width: 100%;
    	height: 100%;
		}
	}
</style>
