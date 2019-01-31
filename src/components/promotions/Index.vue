<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="bullhorn"/> Promosi
      <a href="#" class="btn btn-secondary" @click.prevent="openModal('AddPromotion')">
        <font-awesome-icon icon="plus"/> Add
      </a>
    </h2>
    <div class="card">
      <div class="card-header">
        <div class="input-group mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <font-awesome-icon icon="search"/>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            placeholder="Search a promo"
          >
        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>Promo</th>
              <th>Periode</th>
              <th>Diskon</th>
              <th>Deskripsi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in promotions">
              <td>
                <strong>{{ data.title }}</strong>
                <br>
                <img
                  :src="data.img"
                  class="img-thumbnail float-left mr-2"
                  alt
                  style="width: 250px; height: 250px; object-fit: cover"
                >
              </td>
              <td>{{ data.period }}</td>
              <td>{{ data.diskon }}%</td>
              <td style="width: 30%">{{ data.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- modals -->
    <b-modal
      v-model="modalShowAddPromotion"
      title="Tambahkan Promo"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
    >
      <p
        style="color: red"
      >Silahkan isi data pada form dibawah ini untuk menambahkan promo pada merchant anda</p>
      <div>
        <div class="form-group row">
          <label for="inputTitle" class="col-sm-4 col-form-label">Promo</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Judul Promo"
              name="title"
              v-model="dataInputPromotion.title"
              :class="{'is-invalid': errors.first('title')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('title') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputImg" class="col-sm-4 col-form-label">Gambar Promo</label>
          <div class="col-sm-8">
            <input
              type="url"
              class="form-control"
              id="inputImg"
              placeholder="ex. http://url.com/image.jpg"
              name="img"
              v-model="dataInputPromotion.img"
              :class="{'is-invalid': errors.first('img')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('img') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPeriod" class="col-sm-4 col-form-label">Periode</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputPeriod"
              placeholder="ex. 1 Nov - 30 Nov 2018"
              name="period"
              v-model="dataInputPromotion.period"
              :class="{'is-invalid': errors.first('period')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('period') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDetail" class="col-sm-4 col-form-label">Detail Promo</label>
          <div class="col-sm-8">
            <textarea
              id="inputDetail"
              rows="5"
              class="form-control"
              placeholder="Enter promo detail"
              name="detail"
              v-model="dataInputPromotion.detail"
              :class="{'is-invalid': errors.first('detail')}"
              v-validate="'required'"
            ></textarea>
            <span class="invalid-feedback">{{ errors.first('detail') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputURL" class="col-sm-4 col-form-label">URL</label>
          <div class="col-sm-8">
            <input
              type="url"
              class="form-control"
              id="inputURL"
              placeholder="Enter URL"
              name="url"
              v-model="dataInputPromotion.url"
              :class="{'is-invalid': errors.first('url')}"
              v-validate="'required|url:require_protocol'"
            >
            <span class="invalid-feedback">{{ errors.first('url') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDiskon" class="col-sm-4 col-form-label">Diskon</label>
          <div class="col-sm-8">
            <input
              type="url"
              class="form-control"
              id="inputDiskon"
              placeholder="Insert Diskon"
              name="diskon"
              v-model="dataInputPromotion.diskon"
              :class="{'is-invalid': errors.first('diskon')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('diskon') }}</span>
          </div>
        </div>
      </div>

      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary mr-2" @click="modalShowAddPromotion=false">Cancel</button>
        <button class="btn btn-primary" type="button" @click="addPromotion">Add</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      modalShowAddPromotion: false,
      dataInputPromotion: {},
      promotions: {}
    };
  },
  created() {
    let vm = this;
    /*axios.get(`${process.env.VUE_APP_API_URL}/promotion`).then(res => {
      vm.promotions = res.data;
    });*/
  },
  methods: {
    openModal(modal, data) {
      let vm = this;
      switch (modal) {
        case "AddPromotion":
          vm.modalShowAddPromotion = true;
          break;
        default:
          alert("error!");
      }
    },
    addPromotion() {
      let vm = this;

      vm.$validator.validate().then(result => {
        if (!result) {
          alert("Please fix following error(s)!");
        } else {
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/promotion`,
              vm.dataInputPromotion
            )
            .then(res => {
              alert("Promotion successfully added!");
              axios
                .get(`${process.env.VUE_APP_API_URL}/promotion`)
                .then(res2 => (vm.promotions = res2.data));
              vm.modalShowAddPromotion = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
