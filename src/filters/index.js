import Vue from 'vue'

// Format Date
Vue.filter('date', date => {
  let options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return Intl.DateTimeFormat('en-US', options).format(date)
})

// Indonesian Rupiah Format


// Read more
Vue.filter('readMore', (text, length, suffix) => {
	return (text.length>length) ? (text.substring(0, length) + suffix) : text
})

// Indonesian Rupiah Format
Vue.filter('currency', amount => {
	return Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(amount)
})