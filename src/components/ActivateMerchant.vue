<template>
  <div class="container mt-4">

  	<div class="row">
  		<div class="col-md-4 offset-md-4 text-center">
  			<div class="mb-3">
  				<img src="https://empatkali.co.id/assets/img/logo-final.png" alt="empatkali" style="height: 100px">
  			</div>
				<div class="card">
					<div class="card-header">
						<h4 class="mb-0">Change Password</h4>
					</div>
					<div class="card-body">
						<p class="text-left">Welcome junjun, in order for your account to be activated, you have to change your password.</p>
						<form @submit.prevent="changePassword">
						  <div class="form-group">
						    <input type="password" class="form-control" placeholder="Enter current password" name="currentPassword"
						    			 v-model="currentPassword" v-validate="'required'"
						    			 :class="{'is-invalid': errors.first('currentPassword')}"
						    			 data-vv-as="password">
					      <div class="invalid-feedback">{{ errors.first('currentPassword') }}</div>
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" placeholder="Enter new password" name="newPassword"
						    			 v-model="newPassword" v-validate="'required'"
						    			 :class="{'is-invalid': errors.first('newPassword')}"
						    			 data-vv-as="new password"
						    			 ref="newPassword">
								<div class="invalid-feedback">{{ errors.first('newPassword') }}</div>
						  </div>
						  <div class="form-group">
						    <input type="password" class="form-control" placeholder="Re-type new password" name="reType"
						    			 v-model="reType" v-validate="'required|confirmed:newPassword'"
						    			 :class="{'is-invalid': errors.first('reType')}"
						    			 data-vv-as="re-type new password">
								<div class="invalid-feedback">{{ errors.first('reType') }}</div>
						  </div>
						  <button type="submit" class="btn btn-primary btn-block">Update</button>
						</form>
					</div>
				</div>
				<p class="my-2 text-muted">
					<small>Copyright &copy; Empatkali {{ new Date().getFullYear() }}</small>
				</p>
  		</div>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	data() {
		return {
			currentPassword: null,
			newPassword: null,
			reType: null
		}
	},
	methods: {
		changePassword() {
			let vm = this
			let urlParams = new URLSearchParams(window.location.search)

      vm.$validator.validateAll().then((result) => {
        if (result) {
        	let dataInput = {
        		_id: urlParams.get('_id'),
        		oldPassword: vm.currentPassword,
        		newPassword: vm.newPassword,
        	}

        	axios.post(`${process.env.VUE_APP_API_URL}/api/merchants/activation`, dataInput, {
        		headers: {
        			'Authorization': process.env.VUE_APP_AUTHORIZATION,
        			'Content-Type': 'application/json'
        		}
        	})
        	.then(res => {
        		vm.$swal({
						  type: 'success',
						  title: 'Successfully Activated!',
						  text: 'You will be redirected to the dashboard within 5 second(s)!',
						  showConfirmButton: false,
						  allowEscapeKey: false,
						  allowOutsideClick: false,
						  timer: 5000
        		}).then(res2 => {
	        		vm.$auth.token(null, res.data.token) 	// this will reset the token and allow the user to logged in
	        		document.cookie = 'rememberMe=true'		// hacked; since localStorage for auth is being removed since there's no cookie available
	        		vm.$router.push({ name: 'dashboard' })	// redirect to dashboard
        		})
        	})
        	.catch(err => {
        		if (err.response) {
        			vm.$swal(
							  'Error!',
							  err.response.data.message,
							  'error'
							)
        		}
        	})
          return
        }
        alert('Please fix error(s)!')
      })
		}
	}
}
</script>
