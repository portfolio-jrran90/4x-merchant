<template>
  <div class="py-4">
		<h2>
			<font-awesome-icon icon="store" /> Outlet Merchant
			<a href="#" class="btn btn-primary" @click.prevent="openModal('AddOutletMerchant')">Add</a>
		</h2>
		<div class="card">
		  <div class="card-header">
				<div class="input-group mb-0">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search an outlet merchant">
				</div>
		  </div>
			<div class="card-body">
				<!-- <div class="loader d-flex w-100 h-100" v-if="loader">
					<div class="align-self-center mx-auto">
						loading...
					</div>
				</div> -->
				<table class="table table-striped table-bordered mb-0">
					<thead>
						<tr>
							<!-- <th>Name</th> -->
							<th>Email</th>
							<th>Phone #</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in outletMerchants">
							<!-- <td>{{ `${data.firstname} ${data.lastname}` }}</td> -->
							<td>{{ data.id }}</td>
							<td>{{ data.hp }}</td>
						</tr>
						<!-- <tr v-if="outletMerchants.length == 0">
							<td colspan="3">No record found!</td>
						</tr> -->
					</tbody>
				</table>
			</div>
		</div>

		<!-- modals -->
		<b-modal v-model="modalShowAddOutletMerchant" title="Add an outlet merchant"
						 :no-close-on-esc="true"
						 :no-close-on-backdrop="true">
			<div class="alert alert-danger" v-if="errors.length!=0">
				<h4>Please fix error(s):</h4>
				<ul class="mb-0">
					<li v-for="err in errors">{{ err }}</li>
				</ul>
			</div>
			<div>
			  <div class="form-group row">
			    <label for="inputTitle" class="col-sm-3 col-form-label">Handphone</label>
			    <div class="col-sm-9">
			    	<input type="text" class="form-control" id="inputTitle" placeholder="Enter handphone"
			    				 v-model="dataInputOutletMerchant.hp">
			    </div>
			  </div>
			  <div class="form-group row">
			    <label for="inputImg" class="col-sm-3 col-form-label">E-mail</label>
			    <div class="col-sm-9">
			    	<input type="email" class="form-control" id="inputImg" placeholder="Enter e-mail"
			    				 v-model="dataInputOutletMerchant.email">
			    </div>
			  </div>
			  <div class="form-group row">
			    <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
			    <div class="col-sm-9">
			    	<input type="password" class="form-control" id="inputPassword" placeholder="Enter password"
			    				 v-model="dataInputOutletMerchant.pass">
					</div>
			  </div>
			  <!-- <div class="form-group row">
			    <div class="col-sm-9 offset-md-3">
			    	<input type="password" class="form-control" placeholder="Confirm password"
			    				 v-model="dataInputOutletMerchant.confirm">
					</div>
			  </div> -->
			</div>
			<div slot="modal-footer" class="w-100">
			 	<button class="btn btn-secondary mr-2" @click="modalShowAddOutletMerchant=false">Cancel</button>
			 	<button class="btn btn-primary" type="button" @click="addOutletMerchant">Add</button>
			</div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			// loader: true,
			// okBtnDisabled: true,
			modalShowAddOutletMerchant: false,
			dataInputOutletMerchant: {},
			outletMerchants: [],

			errors: []
		}
	},
	created() {
		let vm = this
		axios.get(`${process.env.VUE_APP_API_URL}/outlet`).then(res => {
			vm.outletMerchants = res.data
			// vm.loader = false
		})
	},
	methods: {
		openModal(modal, data) {
			let vm = this
			switch (modal) {
				case 'AddOutletMerchant':
					vm.modalShowAddOutletMerchant = true
					vm.dataInputOutletMerchant = {}
					vm.errors = []
					break
				default: alert('error!')
			}
		},
		addOutletMerchant() {
			let vm = this

			vm.errors = []
			if (!vm.dataInputOutletMerchant.hp) vm.errors.push('Handphone required!')
			if (!vm.dataInputOutletMerchant.email) vm.errors.push('E-mail required!')
			if (!vm.dataInputOutletMerchant.pass) vm.errors.push('Password required!')

			if (vm.dataInputOutletMerchant.hp && vm.dataInputOutletMerchant.email && vm.dataInputOutletMerchant.pass) {
				axios.post(`${process.env.VUE_APP_API_URL}/outlet`, vm.dataInputOutletMerchant).then(res => {
					alert('Outlet merchant successfully added!')
					axios.get(`${process.env.VUE_APP_API_URL}/outlet`).then(res => vm.outletMerchants = res.data)
					vm.modalShowAddOutletMerchant = false
				})
				// vm.okBtnDisabled = false
				return true
			}
		}
	}
}
</script>

<style scoped>
	/*.card-body {
		position: relative;
	}
	.loader {
		position: absolute; left: 0; top: 0;
		background: #333; color: #fff;
	}*/
</style>
