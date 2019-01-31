<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="users"/> Add Store/Outlet User
      <a
        href="#"
        class="btn btn-secondary"
        @click.prevent="openModal('AddStore_User')"
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
            placeholder="Search User Outlet"
          >
        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Handphone</th>
              <th>Merchant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in UserStore">
              <td>{{ data.id }}</td>
              <td>{{ data.email }}</td>
              <td>{{ data.hp }}</td>
              <td>{{ data.merchant }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- modals -->
    <b-modal
      v-model="modalShowAdd_User"
      title="Tambah Pengguna Store Dashboard"
      :no-close-on-esc="true"
      :no-close-on-backdrop="true"
    >
      <p
        style="color: red"
      >Silahkan isi data pada form dibawah ini untuk menambahkan pengguna agar dapat mengakses Store Dashboard pada outlet/store merchant anda</p>
      <div>
        <div class="form-group row">
          <label for="inputUsername" class="col-sm-4 col-form-label">Username</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputUsername"
              placeholder="Username"
              name="id"
              v-model="dataInputAdd_User.id"
              :class="{'is-invalid': errors.first('id')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('id') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPwd" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-8">
            <input
              type="password"
              class="form-control"
              id="inputPwd"
              placeholder="Password"
              name="pwd"
              v-model="dataInputAdd_User.pwd"
              :class="{'is-invalid': errors.first('pwd')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('pwd') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputOutlet" class="col-sm-4 col-form-label">Assign Outlet</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputOutlet"
              placeholder="Outlet"
              name="outlet"
              v-model="dataInputAdd_User.outlet"
              :class="{'is-invalid': errors.first('outlet')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('outlet') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputEmail"
              placeholder="Email"
              name="email"
              v-model="dataInputAdd_User.email"
              :class="{'is-invalid': errors.first('email')}"
              v-validate="'required|email'"
            >
            <span class="invalid-feedback">{{ errors.first('email') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputHP" class="col-sm-4 col-form-label">Handphone</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputHP"
              placeholder="Handphone"
              name="hp"
              v-model="dataInputAdd_User.hp"
              :class="{'is-invalid': errors.first('hp')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('hp') }}</span>
          </div>
        </div>
      </div>
      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary mr-2" @click="modalShowAdd_User=false">Cancel</button>
        <button class="btn btn-primary" type="button" @click="addStore_User">Add</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      modalShowAdd_User: false,
      dataInputAdd_User: {},
      UserStore: {}
    };
  },
  created() {
    let vm = this;
    /*axios.get(`${process.env.VUE_APP_API_URL}/outletid`).then(res => {
      vm.UserStore = res.data;
    });*/
  },
  methods: {
    openModal(modal, data) {
      let vm = this;
      switch (modal) {
        case "AddStore_User":
          vm.modalShowAdd_User = true;
          break;
        default:
          alert("error!");
      }
    },
    addStore_User() {
      let vm = this;

      vm.$validator.validate().then(result => {
        if (!result) {
          alert("Please fix following error(s)!");
        } else {
          axios
            .post(
              `${process.env.VUE_APP_API_URL}/outletid`,
              vm.dataInputAdd_User
            )
            .then(res => {
              alert("Promotion successfully added!");
              axios
                .get(`${process.env.VUE_APP_API_URL}/outletid`)
                .then(res2 => (vm.dataUser_Store = res2.data));
              vm.modalShowAdd_User = false;
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
