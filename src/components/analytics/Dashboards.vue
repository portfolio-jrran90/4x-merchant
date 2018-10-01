<template>
  <div>
		<h2 class="mb-4">Overview dashboard</h2>
		<div class="mb-3" style="overflow: hidden;">
			<button class="btn btn-secondary float-left mr-2">
				Today
			</button>
			<p class="mb-0" style="padding-top: 7px">compared to Oct. 2, 2018</p>
		</div>
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div>
							<strong>Total Sales</strong>
							<a href="#" class="float-right">View report</a>
						</div>
						<div>
							<p>PHP 0.00</p>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsa repellendus suscipit expedita odit provident, repudiandae eos reprehenderit obcaecati. Inventore, illum laboriosam odio magnam fuga temporibus nam numquam atque corporis.
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div>
							<strong>Returning customer rate</strong>
						</div>
						<div>
							<p>0%</p>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsa repellendus suscipit expedita odit provident, repudiandae eos reprehenderit obcaecati. Inventore, illum laboriosam odio magnam fuga temporibus nam numquam atque corporis.
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div>
							<strong>Total Sales</strong>
							<a href="#" class="float-right">View report</a>
						</div>
						<div>
							<p>PHP 0.00</p>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsa repellendus suscipit expedita odit provident, repudiandae eos reprehenderit obcaecati. Inventore, illum laboriosam odio magnam fuga temporibus nam numquam atque corporis.
					</div>
				</div>
			</div>
		</div>
		<div class="row my-3">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div>
							<strong>Total Orders</strong>
							<a href="#" class="float-right">View report</a>
						</div>
						<div>
							<p>0</p>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsa repellendus suscipit expedita odit provident, repudiandae eos reprehenderit obcaecati. Inventore, illum laboriosam odio magnam fuga temporibus nam numquam atque corporis.
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div>
							<strong>Average order value</strong>
							<a href="#" class="float-right">View report</a>
						</div>
						<div>
							<p>PHP 0.00</p>
						</div>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ipsa repellendus suscipit expedita odit provident, repudiandae eos reprehenderit obcaecati. Inventore, illum laboriosam odio magnam fuga temporibus nam numquam atque corporis.
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div class="mb-4">
							<strong>Top products by units sold</strong>
							<a href="#" class="float-right">View report</a>
						</div>
						<div class="text-center">
							<p class="mb-0">
								There were no sales in this date range.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			filter: {
				dateFrom: new Date().toString(),
				dateTo: new Date(),
			}
		}
	},
	created() {
		
	}
}
</script>

<style scoped>
</style>
