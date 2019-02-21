<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="exchange-alt"/> Transaksi
    </h2>
    <div class="card">
      <div class="card-header">
        <div class="form-inline">
          <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Filter by:</label>
          <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="filterQuery">
            <option value="date">date</option>
            <option value="store">store</option>
          </select>
          
          <!-- date range -->
          <date-range-picker
            :opens="filterDateRange.opens"
            :startDate="filterDateRange.startDate"
            :endDate="filterDateRange.endDate"
            @update="updateValues"
            :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
            :minDate="filterDateRange.minDate" :maxDate="filterDateRange.maxDate"
            class="mr-2"
            v-if="filterQuery==='date'"
          >
            <div slot="input" slot-scope="picker">
              {{ picker.startDate | date }} - {{ picker.endDate | date }}
            </div>
          </date-range-picker>

          <!-- store -->
          <select class="form-control mr-2" v-if="filterQuery==='store'">
            <option value="">-- select</option>
            <option :value="store._id" v-for="store in stores">{{ store.name }}</option>
          </select>

          <button type="button" class="btn btn-primary my-1" @click="filterResult">Filter Result</button>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered mb-0 table-sm" style="border: 0 !important">
          <thead class="table-dark">
            <tr>
              <th rowspan="2" class="text-center">No. Transaksi</th>
              <th rowspan="2" class="text-center">Date Time</th>
              <th colspan="2" class="text-center">Amount</th>
              <th colspan="2" class="text-center">Payment Status</th>
            </tr>
            <tr>
              <th class="text-center">Gross</th>
              <th class="text-center">Net</th>
              <th class="text-center">Approve by EMPATKALI</th>
              <th class="text-center">Payment Confirm</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in transactions">
              <td class="text-center">{{ data.transactionNumber }}</td>
              <!-- <td class="text-right">{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.total) }}</td> -->
              <td class="text-center">2012-12-12</td>
              <td class="text-right">Rp. 1.000.000</td>
              <td class="text-right">Rp. 1.000.000</td>
              <td class="text-center">Approve by EMPATKALI</td>
              <td class="text-center">Payment Confirm</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- modals -->
    <b-modal v-model="modalShowTransactionDetail" size="lg">
      <div
        slot="modal-title"
      >Transaction details for {{ (transactionDetails[0])?transactionDetails[0].invoice:'' }}</div>
      <table class="table table-striped table-sm table-bordered">
        <thead>
          <tr>
            <th>Pembayaran</th>
            <th>Jatuh Tempo</th>
            <th>Tanggal Pembayaran</th>
            <th class="text-center">CREDIT / TRANSFER</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in transactionDetails">
            <td class="text-center" style="width: 20%">Pembayaran ke - {{ data.paymentcount }}</td>
            <td>{{ data.paymentdue }}</td>
            <td>{{ data.paiddate }}</td>
            <td class="text-center">{{ data.pg }}</td>
            <td
              class="text-right"
            >{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.total) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-right">
              <strong>Total</strong>
            </td>
            <td class="text-right">
              <strong>{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(transactionDetails.totals) }}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
      <div slot="modal-footer">
        <button
          type="button"
          class="btn btn-secondary px-5"
          @click="modalShowTransactionDetail = false"
        >Close</button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import DateRangePicker from 'vue2-daterange-picker'
import moment from 'moment'

export default {
  components: {
    DateRangePicker,
  },
  data() {
    return {
      // Search
      filterQuery: 'date',
      filterDateRange: {
        opens: 'center',
        startDate: new Date(),
        endDate: new Date(),
        minDate: '2017-09-02',
        maxDate: '2020-10-02'
      },

      stores: {},

      modalShowTransactionDetail: false,
      transactions: {},
      transactionDetails: {},
    };
  },
  created() {
    let vm = this

    axios.get(`${process.env.VUE_APP_API_URL}/api/approvedtransactions/merchant`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => vm.transactions = res.data)

    axios.get(`${process.env.VUE_APP_API_URL}/api/stores`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => vm.stores = res.data)

    // api/stores?limit=100&skip=0
  },
  methods: {
    openModal(modal, data) {
      let vm = this;

      switch (modal) {
        case "ShowTransactionDetail":
          vm.transactionDetails = {};
          vm.modalShowTransactionDetail = true;
          axios
            .get(`${process.env.VUE_APP_API_URL}/merchanttransactions/${data.No}`)
            .then(res => {
              vm.transactionDetails = Object.assign(res.data, {
                totals: data.Total
              });
            });
          break;
        default: alert("error!");
      }
    },

    updateValues (values) {
      console.log('oh', values)
      this.filterDateRange.startDate = values.startDate.toISOString().slice(0, 10)
      this.filterDateRange.endDate = values.endDate.toISOString().slice(0, 10)
    },

    filterResult() {
      alert()
    }
  }
};
</script>
