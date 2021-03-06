<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="chart-pie"/> Sales Report
    </h2>
    <div class="card">
      <div class="card-header">
        <div class="form-inline">
          <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Filter:</label>
          <!-- date range -->
          <date-range-picker
            :opens="filterDateRange.opens"
            :startDate="filterDateRange.startDate"
            :endDate="filterDateRange.endDate"
            @update="updateValues"
            :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY' }"
            :minDate="filterDateRange.minDate"
            :maxDate="filterDateRange.maxDate"
            class="mr-2"
          >
            <div
              slot="input"
              slot-scope="picker"
            >{{ picker.startDate | moment('DD/MM/YYYY') }} - {{ picker.endDate | moment('DD/MM/YYYY') }}</div>
          </date-range-picker>

          <!-- store -->
          <select class="form-control mr-2" v-model="filterSelectedStore">
            <option value="">All store</option>
            <option :value="store._id" v-for="store in filterGetStores">{{ store.name }}</option>
          </select>
          
          <button type="button" class="btn btn-primary my-1" @click="filterResult">Generate Result</button>

          <div class="flex-grow-1 text-right">
            <download-excel 
              class="btn btn-primary ml-2 btn-csv"
              :data="salesCsvData"
              type="csv"
              :name="salesCsvFilename"
              :escapeCsv="false"
            >
              Download as CSV
            </download-excel>
          </div>
          
        </div>

        <div class="alert alert-info mb-0 mt-3">Merchant anda memiliki {{ transactions.length }} transaksi</div>
      </div>

      <div class="card-body">
        <table class="table table-striped table-bordered mb-0 table-sm" style="border: 0 !important">
          <thead class="table-dark">
            <tr>
              <th class="text-left" rowspan="2" style="vertical-align: middle">Invoice</th>
              <th class="text-center" rowspan="2" style="vertical-align: middle">Date</th>
              <th class="text-center" rowspan="2" style="vertical-align: middle">Store</th>
              <th class="text-center" rowspan="2" style="vertical-align: middle">Customer</th>
              <th class="text-center" rowspan="2" style="vertical-align: middle">Total</th>
              <th class="text-center" colspan="2" v-if="isAuthZilingo">Voucher</th>
            </tr>
            <tr class="text-center" v-if="isAuthZilingo">
              <th style="vertical-align: middle;">Code</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody v-if="transactions.length === 0">
            <tr>
              <td colspan="11">No transaction(s)</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="data in transactions">
              <td class="text-left">{{ data.transactionNumber }}</td>
              <td class="text-center">{{ new Date(data.createdAt) | moment('DD/MM/YYYY') }}</td>
              <td class="text-center">{{ data.store_name.data.name }}</td>
              <td class="text-center">{{ data.user }}</td>
              <td class="text-right">{{ data.total | currency }}</td>
              <td class="text-center" v-if="isAuthZilingo">{{ (data.zilingo.code != 'false') ? `KCI${data.zilingo.code}` : '---' }}</td>
              <td class="text-center" v-if="isAuthZilingo">{{ data.zilingo.expire }}</td>
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
import DateRangePicker from "vue2-daterange-picker";
import moment from "moment";

export default {
  components: {
    DateRangePicker
  },
  data() {
    return {
      requestHeaders: {
        headers: {
          Authorization: process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      },
      authDetail: {},
      // Search
      filterGetStores: {},
      filterDateRange: {
        opens: "center",
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      },
      filterSelectedStore: '',

      // stores: {},

      modalShowTransactionDetail: false,
      transactions: {},
      transactionDetails: {},

      salesCsvData: [],
      salesCsvFilename: '',
    };
  },
  computed: {
    // This will identify if the authenticated user is Zilingo
    isAuthZilingo() {
      return this.authDetail.username === 'zilingo'
    }
  },
  created() {
    let vm = this
    vm.getAuthDetail()
    vm.showStores()
    vm.filterResult()
  },
  methods: {
    /**
     * Get Authenticated User Detail
     */
    getAuthDetail() {
      let vm = this
      axios
        .get('/api/merchants/detail', vm.requestHeaders)
        .then(res => vm.authDetail = res.data)
    },

    /**
     * Show stores for filter
     */
    showStores() {
      let vm = this
      axios
        .get('/api/stores?limit=100&skip=0&active=1', vm.requestHeaders)
        .then(res => vm.filterGetStores = res.data)
    },

    /**
     * Filtered Result(s)
     */
    async filterResult() {
      let vm = this

      try {
        let transactions = await axios
          .get(`/api/approvedtransactions?start=${vm.filterDateRange.startDate}&end=${vm.filterDateRange.endDate}&store=${vm.filterSelectedStore}`, vm.requestHeaders)

        let mapAdditionalDetails = transactions.data.map(async v => {
          v.store_name = await axios.get(`/api/stores/${v.store}`, this.requestHeaders)
          return v
        })
        vm.transactions = await Promise.all(mapAdditionalDetails)
        console.log(vm.transactions);
        vm.generateCsvData(vm.transactions);
        
      } catch (err) {
        console.log('error', err)
      }


    },

    /**
     * Show specific store detail
     * 
     * @param  Integer id
    */ 
    showStore(id) {
      /*let store = await axios.get(`/api/stores/${id}`, this.requestHeaders)
      return store.data.email*/
        /*.then(async res => {
          console.log(res.data.email)
          return res.data.email
        })*/
      // return 'store.data.email'
      console.log(id)
      return axios.get(`/api/stores/${id}`, this.requestHeaders)
    },


    openModal(modal, data) {
      let vm = this;

      switch (modal) {
        case "ShowTransactionDetail":
          vm.transactionDetails = {};
          vm.modalShowTransactionDetail = true;
          axios
            .get(
              `${process.env.VUE_APP_API_URL}/merchanttransactions/${data.No}`
            )
            .then(res => {
              vm.transactionDetails = Object.assign(res.data, {
                totals: data.Total
              });
            });
          break;
        default:
          alert("error!");
      }
    },

    updateValues(values) {
      this.filterDateRange.startDate = values.startDate
        .toISOString()
        .slice(0, 10);
      this.filterDateRange.endDate = values.endDate.toISOString().slice(0, 10);
    },

    /*
    * Format data for download CSV (date, sales)
    */
    generateCsvData(transData) {
      let vm = this
      vm.salesCsvData = [];
      vm.salesCsvFilename = "sales-reports-" + moment(vm.filterDateRange.startDate).format('DD/MM/YYYY') + "-" + moment(vm.filterDateRange.endDate).format('DD/MM/YYYY') + ".csv";

      _.map(transData, (value, index) =>  {
        vm.salesCsvData.push({
          storeName: value.store_name.data.name,
          invoiceNumber: value.transactionNumber,
          date: moment(value.createdAt).format('DD/MM/YYYY'),
          customer: value.user,
          total: value.total,
          // voucher: value.voucher
        });
      });
    }
  }
};
</script>
