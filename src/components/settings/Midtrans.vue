<template>
  <div>
		<nav aria-label="breadcrumb">
		  <ol class="breadcrumb">
		    <li class="breadcrumb-item"><a href="#">Settings</a></li>
		    <li class="breadcrumb-item active" aria-current="page">Midtrans API</li>
		  </ol>
		</nav>
    <div class="row">
    	<div class="col-md-6">
				<div class="card">
					<div class="card-header">
						<h4 class="mb-0">Midtrans Account Details</h4>
					</div>
				  <div class="card-body">

						<form>
							<div class="row">
								<div class="col">
								  <div class="form-group">
								    <label>Production server key</label>
								    <input type="password" class="form-control">
								  </div>
								  <div class="form-group">
								    <label>Production client key</label>
								    <input type="password" class="form-control">
								  </div>
								  <div class="form-group">
								    <label>Production javascript link</label>
								    <input type="password" class="form-control">
								  </div>
								</div>

								<div class="col">
								  <div class="form-group">
								    <label>Sandbox server key</label>
								    <input type="password" class="form-control">
								  </div>
								  <div class="form-group">
								    <label>Sandbox client key</label>
								    <input type="password" class="form-control">
								  </div>
								  <div class="form-group">
								    <label>Sandbox javascript link</label>
								    <input type="password" class="form-control">
								  </div>
								</div>
							</div>

							<div class="row">
								<div class="col">
								  <div class="form-group">
								    <label>Payment Method</label>
								    <input type="text" class="form-control">
								    <small id="emailHelp" class="form-text text-muted">(keep empty if you want to use all payment method from midtrans) view payment method list click here</small>
								  </div>
								</div>
							</div>

							<div class="row">
								<div class="col">
								  <div class="form-group form-check">
								    <input type="checkbox" class="form-check-input" id="exampleCheck1">
								    <label class="form-check-label" for="exampleCheck1">Active production version</label>
								  </div>
								  <div class="form-group form-check">
								    <input type="checkbox" class="form-check-input" id="exampleCheck2">
								    <label class="form-check-label" for="exampleCheck2">Active midtrans</label>
								  </div>
								</div>
							</div>
						  <button type="submit" class="btn btn-primary btn-block">Save</button>
						</form>

				  </div>
				</div>
    	</div>
    </div>
  </div>
</template>

<script>
export default {
	/*data() {},
	created() {}*/
}
</script>

<style scoped>
</style>
