<template>
  <div>
		<nav aria-label="breadcrumb">
		  <ol class="breadcrumb">
		    <li class="breadcrumb-item"><a href="#">Merchant Settings</a></li>
		    <li class="breadcrumb-item active" aria-current="page">Account</li>
		  </ol>
		</nav>
    <div class="row">
      <div class="col-md-3">
        <img :src="merchantDetail.image" class="img-thumbnail" style="width: 250px; height: 250px; object-fit: cover" alt="">
      </div>
    	<div class="col">
    		<table class="table table-bordered">
    			<tr>
    				<td class="table-info" style="width: 35%">Id Merchant</td>
    				<td>{{ merchantDetail._id }}</td>
    			</tr>
    			<tr>
    				<td class="table-info">Nama Merchant</td>
    				<td>{{ merchantDetail.name }}</td>
    			</tr>
    			<tr>
    				<td class="table-info">Nama Penanggung Jawab</td>
    				<td>{{ merchantDetail.username }}</td>
    			</tr>
    			<tr>
    				<td class="table-info">No. Akta Perusahaan</td>
    				<td>---</td>
    			</tr>
    			<tr>
    				<td class="table-info">Alamat</td>
    				<td>---</td>
    			</tr>
    			<tr>
    				<td class="table-info">Nomor Telepon</td>
    				<td>---</td>
    			</tr>
    			<tr>
    				<td class="table-info">Alamat Email</td>
    				<td>{{ merchantDetail.email }}</td>
    			</tr>
    		</table>
    	</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      merchantDetail: {}
    }
  },
  created() {
    let vm = this
    axios.get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => vm.merchantDetail = res.data)
  }
}
</script>

<style lang="scss" scoped>
	table tr td:first-child {
		font-weight: 700;
	}
</style>
