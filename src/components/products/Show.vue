<template>
  <div>
  	<router-link to="/products" class="mt-2 mb-4" style="display: inline-block">&larr; back to products</router-link>
  	<!-- <h2 class="mb-5">{{ product.title }}</h2> -->
  	<div class="row">
  		<div class="col-md-3">
  			<img :src="product.image" alt="" class="img-thumbnail" style="width: 250px">
  		</div>
  		<div class="col">
		  	<table class="table table-bordered">
		  		<tbody>
		  			<tr>
		  				<th class="table-info">Title</th>
		  				<td class="table-light">{{ product.title }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Description</th>
		  				<td class="table-light">{{ product.description }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Price</th>
		  				<td class="table-light">{{ `Rp ${product.pricing}` }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">SKU</th>
		  				<td class="table-light">{{ product.sku }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Material</th>
		  				<td class="table-light">{{ product.material }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Color</th>
		  				<td class="table-light">{{ product.color }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Metal Hardware</th>
		  				<td class="table-light">{{ product.metalHardware }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Dimension</th>
		  				<td class="table-light">{{ product.dimension }}</td>
		  			</tr>
		  			<tr>
		  				<th class="table-info">Features</th>
		  				<td class="table-light">{{ product.features }}</td>
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
			product: {}
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
	
			vm.product = {};
			for (let elem in productData) {
				if (productData[elem].id == vm.$route.params.productId) {
					vm.product = productData[elem]
				}
			}
	}
}
</script>

<style scoped>
</style>
