<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="store"/> Outlet Merchant
      <a
        href="#"
        class="btn btn-secondary"
        @click.prevent="openModal('AddOutletMerchant')"
      >
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
            placeholder="Search an outlet merchant"
          >
        </div>
      </div>
      <div class="card-body">
        <!-- <div class="loader d-flex w-100 h-100" v-if="loader">
					<div class="align-self-center mx-auto">
						loading...
					</div>
        </div>-->
        <div class="row text-center">
          <div class="col-md-4 mb-4" v-for="data in outletMerchants">
            <div class="card shadow-sm">
              <div class="card-header">
                <h4 class="my-0 font-weight-normal">{{ data.merchant }}</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title mb-4">
                  <small class="text-muted">{{ data.name }}</small>
                </h1>
                <button
                  type="button"
                  class="btn btn-lg btn-block btn-outline-primary"
                  @click="openModal('OutletDetails', data)"
                >Lihat Outlet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modals -->
    <b-modal
      v-model="modalShowAddOutletMerchant"
      title="Add an outlet merchant"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      size="lg"
    >
      <div class="row">
        <div class="col">
          <div>
            <div class="form-group row">
              <label for="inputName" class="col-sm-3 col-form-label">Name</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="Enter name"
                  name="name"
                  :class="{'is-invalid': errors.first('name')}"
                  v-model="dataInputOutletMerchant.name"
                  v-validate="'required'"
                >
                <small class="invalid-feedback">{{ errors.first('name') }}</small>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputTitle" class="col-sm-3 col-form-label">Title</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputTitle"
                  placeholder="Enter title"
                  name="title"
                  :class="{'is-invalid': errors.first('title')}"
                  v-model="dataInputOutletMerchant.title"
                  v-validate="'required'"
                >
                <span class="invalid-feedback">{{ errors.first('title') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputWebsite" class="col-sm-3 col-form-label">Website</label>
              <div class="col-sm-9">
                <input
                  type="url"
                  class="form-control"
                  id="inputWebsite"
                  placeholder="e.g. http://url.com"
                  name="website"
                  :class="{'is-invalid': errors.first('website')}"
                  v-model="dataInputOutletMerchant.website"
                  v-validate="'required|url:require_protocol'"
                >
                <span class="invalid-feedback">{{ errors.first('website') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputTitle" class="col-sm-3 col-form-label">Handphone</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputTitle"
                  placeholder="e.g. 123456"
                  name="handphone"
                  :class="{'is-invalid': errors.first('handphone')}"
                  v-model="dataInputOutletMerchant.hp"
                  v-validate="'required'"
                >
                <span class="invalid-feedback">{{ errors.first('handphone') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputImg" class="col-sm-3 col-form-label">E-mail</label>
              <div class="col-sm-9">
                <input
                  type="email"
                  class="form-control"
                  id="inputImg"
                  placeholder="Enter e-mail"
                  name="email"
                  :class="{'is-invalid': errors.first('email')}"
                  v-model="dataInputOutletMerchant.email"
                  v-validate="'required|email'"
                >
                <span class="invalid-feedback">{{ errors.first('email') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <gmap-autocomplete @place_changed="setPlace" class="form-control"></gmap-autocomplete>
          <small
            class="text-muted"
            style="line-height: normal"
          >Note: if no address inputted, this will capture your current geolocation.</small>
          <GmapMap :center="center" :zoom="12" class="w-100 mt-2" style="height: 320px"></GmapMap>
        </div>
      </div>

      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary mr-2" @click="modalShowAddOutletMerchant=false">Cancel</button>
        <button class="btn btn-primary" type="button" @click="addOutletMerchant">Add</button>
      </div>
    </b-modal>

    <b-modal v-model="modalShowOutletDetails" title="Outlet Details" size="lg">
      <table class="table mb-0">
        <tbody>
          <tr>
            <td class="table-secondary">
              <strong>Name</strong>
            </td>
            <td>{{ outletMerchantDetails.name }}</td>
          </tr>
          <tr>
            <td class="table-secondary">
              <strong>Title</strong>
            </td>
            <td>{{ outletMerchantDetails.title }}</td>
          </tr>
          <tr>
            <td class="table-secondary">
              <strong>Website</strong>
            </td>
            <td>{{ outletMerchantDetails.website }}</td>
          </tr>
          <tr>
            <td class="table-secondary">
              <strong>E-mail</strong>
            </td>
            <td>{{ outletMerchantDetails.email }}</td>
          </tr>
          <tr>
            <td class="table-secondary">
              <strong>Handphone</strong>
            </td>
            <td>{{ outletMerchantDetails.hp }}</td>
          </tr>
        </tbody>
      </table>

      <h4 class="my-3">Location</h4>

      <GmapMap
        :center="{ lat: parseFloat(outletMerchantDetails.lat), lng: parseFloat(outletMerchantDetails.lon) }"
        :zoom="12"
        class="w-100 mt-2"
        style="height: 320px"
      ></GmapMap>

      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary mr-2" @click="modalShowOutletDetails=false">Close</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // loader: true,
      // okBtnDisabled: true,
      modalShowAddOutletMerchant: false,
      modalShowOutletDetails: false, // lihat outlet - see outlet
      dataInputOutletMerchant: {},
      outletMerchants: {},
      outletMerchantDetails: {},

      // Google map
      center: {}
    };
  },
  mounted() {
    this.geolocation();
    console.log(this.geolocation());
  },
  created() {
    let vm = this;
    axios
      .get(`${process.env.VUE_APP_API_URL}/outlet2`)
      .then(res => (vm.outletMerchants = res.data));
  },
  methods: {
    openModal(modal, data) {
      let vm = this;
      switch (modal) {
        case "AddOutletMerchant":
          vm.modalShowAddOutletMerchant = true;
          vm.dataInputOutletMerchant = {};
          vm.errors = [];
          break;
        case "OutletDetails":
          vm.modalShowOutletDetails = true;

          vm.outletMerchantDetails = {}; // reset view
          vm.outletMerchantDetails = data;
          break;
        default:
          alert("error!");
      }
    },
    addOutletMerchant() {
      let vm = this;

      Object.assign(vm.dataInputOutletMerchant, {
        lon: vm.center.lng,
        lat: vm.center.lat
      });
      vm.$validator.validate().then(result => {
        if (!result) {
          alert("Please fix following error(s)!");
        } else {
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/outlet2`,
              vm.dataInputOutletMerchant
            )
            .then(res => {
              alert("Outlet merchant successfully added!");
              axios
                .get(`${process.env.VUE_APP_API_URL}/outlet2`)
                .then(res => (vm.outletMerchants = res.data));
              vm.modalShowAddOutletMerchant = false;
            });
        }
      });
    },
    /**
     * Google Map
     */
    setPlace(place) {
      if (!place) return;
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(pos => {
        this.center = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
      });
    }
  }
};
</script>

<style>
.pac-container {
  z-index: 100000 !important;
}
/*.card-body {
		position: relative;
	}
	.loader {
		position: absolute; left: 0; top: 0;
		background: #333; color: #fff;
	}*/
</style>
