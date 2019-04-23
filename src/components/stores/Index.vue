<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Merchant Settings</a></li>
        <li class="breadcrumb-item active" aria-current="page">Store List</li>
      </ol>
    </nav>
    <h2>
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
            placeholder="Search an outlet"
          >
        </div>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <div class="text-right">
              <a href="#" class="btn btn-success btn-sm mb-2 px-4" @click.prevent="openModal('AddOutletMerchant')">
                <font-awesome-icon icon="plus"/> Add
              </a>
            </div>
            <table class="table table-sm table-bordered table-hover">
              <thead class="thead-dark">
                <tr>
                  <th colspan="2">Name</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(data, index) in outletMerchants" :class="{ 'table-active': selectedStore === data._id }">
                  <td>{{ data.name }}</td>
                  <td class="text-center">
                    <a href="#" @click.prevent="showStoreDetails(data._id)">
                      <font-awesome-icon icon="search" />
                    </a>
                  </td>
                </tr>
                <tr v-if="Object.keys(outletMerchants).length==0">
                  <td colspan="2">
                    No record! <a href="#" @click.prevent="openModal('AddOutletMerchant')">Add store</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col store-details">
            <div class="card" v-if="(Object.keys(storeDetails).length != 0)">
              <div class="card-body">
                <h4>Details for {{ storeDetails.name || '---' }}</h4>
                <div class="row">
                  <div class="col">
                    <GmapMap
                      :center="{ lat: ((storeDetails.loc)?parseFloat(storeDetails.loc.coordinates[1]):0), lng: ((storeDetails.loc)?parseFloat(storeDetails.loc.coordinates[0]):0) }"
                      :zoom="12"
                      class="w-100 mt-2"
                      style="height: 320px"
                    ></GmapMap>
                  </div>
                  <div class="col">
                    <table class="table table-sm table-bordered">
                      <tbody>
                        <tr>
                          <td class="table-secondary">
                            <font-awesome-icon icon="user" />
                          </td>
                          <td class="table-light">{{ storeDetails.username || '---' }}</td>
                        </tr>
                        <tr>
                          <td class="table-secondary">
                            <font-awesome-icon icon="envelope" />
                          </td>
                          <td class="table-light">{{ storeDetails.email || '---' }}</td>
                        </tr>
                        <tr>
                          <td class="table-secondary">
                            <font-awesome-icon icon="phone" />
                          </td>
                          <td class="table-light">{{ storeDetails.mobileNumber || '---' }}</td>
                        </tr>
                        <tr>
                          <td class="table-secondary">
                            <font-awesome-icon icon="calendar-check" />
                          </td>
                          <td class="table-light">{{ storeDetails.createdAt || '---' }}</td>
                        </tr>
                      </tbody>
                    </table>                    
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- modals -->
    <b-modal
      v-model="modalShowAddOutletMerchant"
      title="Tambahkan outlet / store merchant anda"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
      size="lg"
    >
    <p style="color: red">Silahkan isi data pada form dibawah ini untuk menambahkan outlet / store merchant anda</p>
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

            <div class="form-group row">
              <label for="inputUsername" class="col-sm-3 col-form-label">Username</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputUsername"
                  placeholder="Enter username"
                  name="username"
                  :class="{'is-invalid': errors.first('username')}"
                  v-model="dataInputOutletMerchant.username"
                  v-validate="'required'"
                >
                <span class="invalid-feedback">{{ errors.first('username') }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputMobileNo" class="col-sm-3 col-form-label">Mobile #</label>
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="inputMobileNo"
                  placeholder="e.g. 123456"
                  name="mobileNumber"
                  :class="{'is-invalid': errors.first('mobileNumber')}"
                  v-model="dataInputOutletMerchant.mobileNumber"
                  v-validate="'required'"
                >
                <span class="invalid-feedback">{{ errors.first('mobileNumber') }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-9">
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword"
                  placeholder="Enter password"
                  name="password"
                  :class="{'is-invalid': errors.first('password')}"
                  v-model="dataInputOutletMerchant.password"
                  v-validate="'required'"
                >
                <span class="invalid-feedback">{{ errors.first('password') }}</span>
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

  </div>
</template>

<script>
// Note:
// - sweet alert
// - axios custom error handler

import axios from "axios";

export default {
  data() {
    return {
      modalShowAddOutletMerchant: false,
      dataInputOutletMerchant: {},
      outletMerchants: {},
      outletMerchantDetails: {}, // remove this one

      // Google map
      center: {},

      // Store Details
      storeDetails: {},
      selectedStore: false, // this will highlight the active row
    };
  },
  created() {
    let vm = this;

    // get geolocation
    vm.geolocation()

    axios.get(`${process.env.VUE_APP_API_URL}/api/stores?limit=100&skip=0&active=1`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => {
      vm.outletMerchants = res.data
      // load the first data
      axios.get(`${process.env.VUE_APP_API_URL}/api/stores/${res.data[0]._id}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      }).then(res2 => {
        vm.storeDetails = res2.data
        vm.selectedStore = res.data[0]._id
      })
    })
  },
  methods: {
    openModal(modal, data) {
      let vm = this;
      switch (modal) {
        case "AddOutletMerchant":
          vm.modalShowAddOutletMerchant = true;
          vm.dataInputOutletMerchant = {};
          vm.errors = [];
          break
        default: alert("error!")
      }
    },
    addOutletMerchant() {
      let vm = this;

      Object.assign(vm.dataInputOutletMerchant, {
        loc: {
          coordinates: [vm.center.lng, vm.center.lat] // long, lat
        }
      })

      vm.$validator.validate().then(result => {
        if (!result) {
          alert("Please fix following error(s)!");
        } else {
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/api/stores`,
              vm.dataInputOutletMerchant,
              {
                headers: {
                  'Authorization': process.env.VUE_APP_AUTHORIZATION,
                  'Content-Type': 'application/json',
                  'x-access-token': localStorage.getItem('auth_token')
                }
              }
            )
            .then(res => {
              axios.get(`${process.env.VUE_APP_API_URL}/api/stores?limit=100&skip=0`, {
                headers: {
                  'Authorization': process.env.VUE_APP_AUTHORIZATION,
                  'x-access-token': localStorage.getItem('auth_token')
                }
              }).then(res2 => {
                vm.outletMerchants = res2.data
                alert("Outlet merchant successfully added!");
                vm.modalShowAddOutletMerchant = false
              })
            })
            .catch(err => {
              if (err.response) {
                alert(err.response.data.message)
                console.log(err.response.data.message)
              } else if (err.request) {
                console.log(err.request)
              } else {
                console.log('Error', err.message)
              }
              console.log(err.config)
            });
        }
      });
    },
    /**
     * Google Map
     */
    setPlace(place) {
      if (!place) return
      this.center = {
        lat: parseFloat(place.geometry.location.lat()),
        lng: parseFloat(place.geometry.location.lng())
      };
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition(pos => {
        this.center = {
          lat: parseFloat(pos.coords.latitude),
          lng: parseFloat(pos.coords.longitude)
        }
      })
    },

    /**
     * Display store details
     * 
     * @param  ObjectId storeId
     */
    showStoreDetails(storeId) {
      let vm = this

      axios.get(`${process.env.VUE_APP_API_URL}/api/stores/${storeId}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      }).then(res => {
        vm.storeDetails = res.data
        vm.selectedStore = storeId
      })
    }
  }
};
</script>

<style>
.pac-container {
  z-index: 100000 !important;
}
.store-details table td:first-child{
  text-align: center;
}
</style>
