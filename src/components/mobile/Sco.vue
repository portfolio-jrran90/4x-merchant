<template>
  
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-3">
          <div class="card-header">
            <h2 class="mb-0">Sco</h2>
          </div>
          <div class="card-body">
            <!-- <img src="" alt=""> -->
            <div style="overflow: hidden;" class="mb-3">
              <div class="float-left mr-2" >
                <img style="width: 100px; height: 100px; background: #ccc" src="https://manage.schofficial.com/assets/images/product/kaywa.2-wtb-black-2.jpg"/>
              </div>
              <div>
                <h4>SDT 82</h4>
                <span>Rp 260.000</span>
              </div>
            </div>

            <ul class="list-unstyled mb-0">
              <li><strong>Harga total:</strong> Rp 260.000</li>
              <li><strong>Tagihan yang harus dibayar: <span style="font-size: 20px">Rp 65.000</span></strong></li>
            </ul>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <h4 class="mb-3">MASUKKAN NO TELP UNTUK APPROVAL PEMBAYARAN</h4>
            <input type="text" class="form-control" placeholder="PHONE NUMBER" v-model="hp">
            <button class="btn btn-block btn-secondary mt-2" @click.prevent="send" :disabled="!hp">SEND</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hp: ''
    }
  },
  methods: {
    send() {
      let vm = this
      let data = {
        duit: 260000,
        m: '081808314197',
        p: 'Sch',
        hp: vm.hp
      }
      axios.post('https://sandbox2.empatkali.co.id/initiatepurchase', data).then(res => {
        alert('Successfully Sent!')
        vm.hp = ''
      })
    }
  }
}
</script>
