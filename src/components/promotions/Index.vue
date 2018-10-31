<template>
  <div class="py-4">
		<h2>
			<font-awesome-icon icon="bullhorn" /> Promotions
			<a href="#" class="btn btn-primary" @click.prevent="openModal('AddPromotion')">Add</a>
		</h2>
		<div class="card">
		  <div class="card-header">
				<div class="input-group mb-0">
				  <div class="input-group-prepend">
				    <span class="input-group-text">
				    	<font-awesome-icon icon="search" />
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search a promo">
				</div>
		  </div>
			<div class="card-body">
				<table class="table table-striped table-bordered mb-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Description</th>
							<th>Period</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in promotions">
							<td>{{ data.title }}</td>
							<td>{{ data.detail }}</td>
							<td>{{ data.period }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- modals -->
		<b-modal v-model="modalShowAddPromotion" title="Add promotion" @ok="addPromotion">
			<div>
			  <div class="form-group row">
			    <label for="inputTitle" class="col-sm-3 col-form-label">Title</label>
			    <div class="col-sm-9">
			    	<input type="text" class="form-control" id="inputTitle" placeholder="Enter title"
			    				 v-model="dataInputPromotion.title">
			    </div>
			  </div>
			  <div class="form-group row">
			    <label for="inputImg" class="col-sm-3 col-form-label">Image URL</label>
			    <div class="col-sm-9">
			    	<input type="url" class="form-control" id="inputImg" placeholder="ex. http://url.com/image.jpg"
			    				 v-model="dataInputPromotion.img">
			    </div>
			  </div>
			  <div class="form-group row">
			    <label for="inputPeriod" class="col-sm-3 col-form-label">Period</label>
			    <div class="col-sm-9">
			    	<input type="text" class="form-control" id="inputPeriod" placeholder="ex. 1 Nov - 30 Nov 2018"
			    				 v-model="dataInputPromotion.period">
					</div>
			  </div>
			  <div class="form-group row">
			    <label for="inputDetail" class="col-sm-3 col-form-label">Detail</label>
			    <div class="col-sm-9">
			    	<textarea id="inputDetail" rows="5" class="form-control" placeholder="Enter promo detail"
			    						v-model="dataInputPromotion.detail"></textarea>
			    </div>
			  </div>
			  <div class="form-group row">
			    <label for="inputURL" class="col-sm-3 col-form-label">URL</label>
			    <div class="col-sm-9">
			    	<input type="url" class="form-control" id="inputURL" placeholder="Enter URL"
			    				 v-model="dataInputPromotion.url">
			    </div>
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
			modalShowAddPromotion: false,
			dataInputPromotion: {},
			promotions: {}
		}
	},
	created() {
		let vm = this
		axios.get('http://sandbox.empatkali.co.id/promo').then(res => {
			vm.promotions = res.data
			console.log(res.data)
		})
	},
	methods: {
		openModal(modal, data) {
			let vm = this
			switch (modal) {
				case 'AddPromotion':
					vm.modalShowAddPromotion = true
					break
				default: alert('error!')
			}
		},
		addPromotion() {
			let vm = this
			axios.post(`${process.env.VUE_APP_API_URL}/promotion`, vm.dataInputPromotion).then(res => {
				alert('Promotion successfully added!')
				axios.get('http://sandbox.empatkali.co.id/promo').then(res2 => vm.promotions = res2.data)
			})
		}
	}
}
</script>

<style scoped>
</style>
