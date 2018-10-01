<template>
  <div>
  	<div class="mb-4">
			<h2 class="">Products</h2>
			<!-- <ul class="list-inline">
				<li class="list-inline-item">
					<a href="#" class="text-secondary">
						<span data-feather="upload" style="width: 18px"></span> Export
					</a>
				</li>
				<li class="list-inline-item">
					<a href="#" class="text-secondary">
						<span data-feather="download" style="width: 18px"></span> Import
					</a>
				</li>
			</ul> -->
		</div>
		<div class="card">
		  <!-- <div class="card-header">
		    <ul class="nav nav-tabs card-header-tabs">
		      <li class="nav-item">
		        <a class="nav-link active" href="#">All</a>
		      </li>
		    </ul>
		  </div> -->
			<div class="card-body">
				<div class="input-group mb-3">
				  <div class="input-group-prepend">
				    <button class="btn btn-secondary dropdown-toggle px-4" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Filter</button>
				    <div class="dropdown-menu">
				      <a class="dropdown-item" href="#">Action</a>
				      <a class="dropdown-item" href="#">Another action</a>
				      <a class="dropdown-item" href="#">Something else here</a>
				      <div role="separator" class="dropdown-divider"></div>
				      <a class="dropdown-item" href="#">Separated link</a>
				    </div>
				    <span class="input-group-text" style="background: transparent">
				    	<span data-feather="search" style="width: 18px"></span>
				    </span>
				  </div>
				  <input type="text" class="form-control" aria-label="Text input with dropdown button" placeholder="Search product(s)" style="border-left: 0">
				</div>
				<table class="table table-striped table-bordered mb-0" style="border: 0 !important">
					<thead>
						<tr>
							<th><input type="checkbox"></th>
							<th>Product</th>
							<th>SKU</th>
							<th class="text-right">Price</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="data in products">
							<td><input type="checkbox"></td>
							<td>
								<img :src="data.image" alt="" class="img-thumbnail float-left mr-2" style="width: 40px">
								<router-link :to="{ name: 'product-show', params: { productId: data.id } }">{{ data.title }}</router-link>
							</td>
							<td>{{ data.sku }}</td>
							<td class="text-right">{{ data.pricing }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
  </div>
</template>

<script>
export default {
	data() {
		return {
			products: {}
		}
	},
	created() {
		let vm = this
		let productData = [{
				id: 1,
				title: "WOMAN'S CROSSBODY BAG DISCOVER IN COWHIDE LEATHER A2751 COLOR RED",
				description: "Woman's Crossbody Bag Discover",
				image: '/products/image6.png',
				pricing: '7.000.0000',
				sku: "A2751..P245",
				material: 'cowhide leather',
				color: 'red',
				metalHardware: 'brass',
				dimension: '24(w), 22,5(h), 7(d) cm | 9,45(w), 8,86(h), 2,76(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent.'
			},
			{
				id: 2,
				title: "BRIEFCASE IN VINTAGE COWHIDE LEATHER D0301 (COLOR DARK BROWN SEPPIA)",
				description: "Handheld briefcase that can be worn also across the body, with adjustable and removable shoulder strap.Flap with 2 snaps fastening. One big back pocket with snap fastening and 2 front pockets. Inner pocket that fits perfectly a note-book/iPad. Lined in cotton canvas.",
				image: '/products/image1.png',
				pricing: '11.600.0000',
				sku: "D0301..PO566",
				material: 'vintage cowhide leather',
				color: 'dark brown seppia',
				metalHardware: 'brass',
				dimension: '38(w), 29(h), 12(d) cm | 14,96(w), 11,42(h), 4,72(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent.'
			},
			{
				id: 3,
				title: "MAN'S BACKPACK ROADWAY IN VINTAGE COWHIDE LEATHER A2757 (COLOR BLACK)",
				description: "Man's Backpack Roadway",
				image: '/products/image2.png',
				pricing: '13.100.0000',
				sku: "A2757..PO798N",
				material: 'vintage cowhide leather',
				color: 'black',
				metalHardware: 'nickel',
				dimension: '33(w), 34(h), 14(d) cm | 12,99(w), 13,39(h), 5,51(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent.'
			},
			{
				id: 4,
				title: "TRAVEL BAG CAMAIORE IN TECHNICAL FABRIC E0538 COLOR BLACK/NATURAL",
				description: "Travel Bag Camaiore",
				image: '/products/image5.png',
				pricing: '5.500.0000',
				sku: "E0538..POLT576N",
				material: 'technical fabric',
				color: 'black',
				metalHardware: 'nickel',
				dimension: '56(w), 27(h), 29(d) cm | 22,05(w), 10,63(h), 11,42(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent.'
			},
			{
				id: 5,
				title: "MAN'S SHOULDER BAG PALAGIO IN VINTAGE COWHIDE LEATHER A2655 COLOR NATURAL",
				description: "Shoulder bag with metal zip fastening. Adjustable handles and strap. Front multipurpose pockets and two back open pockets. Internal zipped pocket. Lined in cotton canvas.",
				image: '/products/image4.png',
				pricing: '12.410.0000',
				sku: "A2655..PO681",
				material: 'vintage cowhide leather',
				color: 'natural',
				metalHardware: 'brass',
				dimension: '35(w), 25(h), 13(d) cm | 13,78(w), 9,84(h), 5,12(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent'
			},
			{
				id: 6,
				title: "MAN'S MESSENGER ARGENTARIO IN VINTAGE COWHIDE LEATHER A2696 COLOR NATURAL",
				description: "Man's Messenger Argentario Lined in cotton canvas.",
				image: '/products/image3.png',
				pricing: '11.038.0000',
				sku: "A2696..PO681",
				material: 'vintage cowhide leather',
				color: 'natural',
				metalHardware: 'brass',
				dimension: '39(w), 27,5(h), 5(d) cm | 15,35(w), 10,83(h), 1,97(d) in',
				features: 'Thanks to vegetable tanning, a traditional process handed down through generations of Tuscan experts, the ‘vacchetta’ cowhide is transformed into a long-lasting material, acquiring unique qualities. Its tannin, the active ingredient that is mostly found in the trunk of chestnut trees, combined with a slight greasing, allows the skin to become soft, resistant and to acquire the typical leathery scent.'
			}]

			vm.products = productData
	}
}
</script>

<style scoped>
</style>
