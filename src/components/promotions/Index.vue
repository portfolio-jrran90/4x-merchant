<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="bullhorn"/> Promosi
      <a href="#" class="btn btn-secondary px-5 float-right" @click.prevent="openModal('AddPromotion')">
        <font-awesome-icon icon="plus"/> Add
      </a>
    </h2>
    <div class="card">
      <div class="card-header">
        <div class="form-inline">
          <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Filter by:</label>
          <select class="form-control mr-2">
            <option value="">Select merchant</option>
          </select>
          <select class="form-control mr-2">
            <option value="">Select store</option>
          </select>
          <select class="form-control mr-2">
            <option value="">Select category</option>
          </select>
          <input type="text" class="form-control mr-2" placeholder="Search tag">

          <!-- filtering... -->
          <button class="btn btn-primary px-4">Filter Result</button>

        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered table-sm mb-0">
          <thead class="table-dark">
            <tr>
              <th colspan="2">Nama</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in promotions">
              <td>
                <div class="media">
                  <img class="mr-3 img-thumbnail" :src="data.img" alt="" style="width: 150px; height: 150px; object-fit: cover">
                  <div class="media-body">
                    <h5 class="mt-0 pt-2">
                      <a :href="data.url" target="_blank">{{ data.title }}</a>
                    </h5>
                    <p>{{ data.detail | readMore(200, '[...]') }}</p>
                    <div>
                      <ul class="list-unstyled">
                        <li>
                          <small>
                            <strong>Categories:</strong>
                            {{ data.category || '---' }}
                          </small>
                        </li>
                        <li>
                          <small>
                            <strong>Duration:</strong>
                            {{ new Date(data.period.start) | date }} - {{ new Date(data.period.end) | date }}
                          </small>
                        </li>
                        <li v-if="data.tags.length!==0">
                          <small>
                            <strong>Tags:</strong>
                          </small>
                          <span class="badge badge-secondary ml-2" v-for="tag in data.tags">{{ tag }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
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
      <p class="text-muted">Silahkan isi data pada form dibawah ini untuk menambahkan promo pada merchant anda</p>
      <div>
        <div class="form-group row">
          <label for="inputTitle" class="col-sm-4 col-form-label">Title</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Enter title"
              name="title"
              v-model="dataInputPromotion.title"
              :class="{'is-invalid': errors.first('title')}"
              v-validate="'required'"
            >
            <span class="invalid-feedback">{{ errors.first('title') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputImg" class="col-sm-4 col-form-label">Image URL</label>
          <div class="col-sm-8">
            <input
              type="url"
              class="form-control"
              id="inputImg"
              placeholder="ex. http://url.com/image.jpg"
              name="img"
              v-model="dataInputPromotion.img"
              :class="{'is-invalid': errors.first('img')}"
              v-validate="'required|url:require_protocol'"
            >
            <span class="invalid-feedback">{{ errors.first('img') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPeriod" class="col-sm-4 col-form-label">Period</label>
          <div class="col-sm-8">
            <date-range-picker
              :opens="modalAddDateRange.opens"
              :startDate="modalAddDateRange.startDate"
              :endDate="modalAddDateRange.endDate"
              @update="updateModalAddDateRangeValues"
              :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
              :minDate="modalAddDateRange.minDate" :maxDate="modalAddDateRange.maxDate"
            >
              <div slot="input" slot-scope="picker">
                {{ picker.startDate | date }} - {{ picker.endDate | date }}
              </div>
            </date-range-picker>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDetail" class="col-sm-4 col-form-label">Detail</label>
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
          <label for="inputDiskon" class="col-sm-4 col-form-label">Discount</label>
          <div class="col-sm-8">
            <input
              type="url"
              class="form-control"
              id="inputDiskon"
              placeholder="Insert discount"
              name="discount"
              v-model="dataInputPromotion.discount"
              :class="{'is-invalid': errors.first('discount')}"
            >
            <span class="invalid-feedback">{{ errors.first('discount') }}</span>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputDiskon" class="col-sm-4 col-form-label">Tags</label>
          <div class="col-sm-8">
            <vue-tags-input
              v-model="tags"
              :tags="arr_tags"
              @tags-changed="newTags => arr_tags = newTags"
            />
          </div>
        </div>
      </div>

      <div slot="modal-footer" class="w-100">
        <button class="btn btn-secondary px-5 mr-2" @click="modalShowAddPromotion=false">Cancel</button>
        <button class="btn btn-primary px-5" type="button" @click="addPromotion">Add</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios"
import DateRangePicker from 'vue2-daterange-picker'
import VueTagsInput from '@johmun/vue-tags-input'

export default {
  components: {
    DateRangePicker,
    VueTagsInput
  },
  data() {
    return {
      modalShowAddPromotion: false,
      dataInputPromotion: {},
      promotions: {},

      // filter
      filterQuery: '',

      // modal
      modalAddDateRange: {
        opens: 'center',
        startDate: new Date(),
        endDate: new Date(),
        minDate: '2017-09-02',
        maxDate: '2020-10-02'
      },

      // tags
      tags: '',
      arr_tags: []
    };
  },
  created() {
    let vm = this
    axios.get(`${process.env.VUE_APP_API_URL}/api/promotions`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token'),
      }
    }).then(res => vm.promotions = res.data)
  },
  methods: {
    openModal(modal, data) {
      let vm = this;
      switch (modal) {
        case "AddPromotion":
          vm.modalShowAddPromotion = true
          vm.dataInputPromotion = {}
          break;
        default:
          alert("error!");
      }
    },
    addPromotion() {
      let vm = this;

      vm.$validator.validate().then(result => {
        if (result) {
          Object.assign(vm.dataInputPromotion, {
            period: {
              start: vm.modalAddDateRange.startDate,
              end: vm.modalAddDateRange.endDate
            }
          })
          axios.post(`${process.env.VUE_APP_API_URL}/api/promotions`, vm.dataInputPromotion, {
            headers: {
              'Authorization': process.env.VUE_APP_AUTHORIZATION,
              'x-access-token': localStorage.getItem('auth_token'),
              'Content-Type': 'application/json'
            }
          }).then(res => {
            // Note: simplify this
            axios.get(`${process.env.VUE_APP_API_URL}/api/promotions`, {
              headers: {
                'Authorization': process.env.VUE_APP_AUTHORIZATION,
                'x-access-token': localStorage.getItem('auth_token'),
              }
            }).then(res2 => {
              vm.promotions = res2.data
              alert('Promotion Successfully added!')
              vm.modalShowAddPromotion = false
            })
          })
        }
      });
    },

    /**
     * Update data range value
     */
    updateModalAddDateRangeValues(values) {
      let vm = this
      vm.modalAddDateRange.startDate = values.startDate
      vm.modalAddDateRange.endDate = values.endDate
    },
  }
};
</script>

<style scoped>
</style>
