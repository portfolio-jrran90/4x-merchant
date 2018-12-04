<template>
  <div class="py-4">
    <h2>
      <font-awesome-icon icon="exchange-alt"/>Transaction
    </h2>
    <div class="card">
      <div class="card-header">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <font-awesome-icon icon="search"/>
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with dropdown button"
            placeholder="Search transaction"
            style="border-left: 0"
          >
        </div>
      </div>
      <div class="card-body">
        <table class="table table-striped table-bordered mb-0" style="border: 0 !important">
          <thead>
            <tr>
              <th>Id Order</th>
              <th>Tanggal Pembayaran</th>
              <th>Status Pembayaran</th>
              <th class="text-right">Total Harga</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in transactions">
              <td>{{ data.No }}</td>
              <td>{{ data.date }}</td>
              <td>
                <span
                  class="badge badge-pill badge-success"
                  v-if="data.status==1 || data.status==2 || data.status==3 || data.status==4"
                >4x approve payment ({{ data.status }})</span>
                <span class="badge badge-pill badge-warning" v-if="data.status==0">Pending</span>
              </td>
              <td
                class="text-right"
              >{{ Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(data.Total) }}</td>
              <td class="text-right">
                <small>
                  <a
                    href="#"
                    @click.prevent="openModal('ShowTransactionDetail', data)"
                  >Lihat detail transaksi</a>
                </small>
              </td>
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
            <th></th>
            <th class="text-center">No</th>
            <th>Jatuh Tempo</th>
            <th>Tanggal Pembayaran</th>
            <th class="text-center">CREDIT / TRANSFER</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in transactionDetails">
            <td class="text-center">{{ data.paymentcount }}</td>
            <td class="text-center">{{ data.No }}</td>
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
            <td colspan="5" class="text-right">
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

export default {
  data() {
    return {
      modalShowTransactionDetail: false,
      transactions: {},
      transactionDetails: {}
    };
  },
  created() {
    let vm = this;
    axios
      .get(`${process.env.VUE_APP_API_URL}/transactions`)
      .then(res => (vm.transactions = res.data));
  },
  methods: {
    openModal(modal, data) {
      let vm = this;

      switch (modal) {
        case "ShowTransactionDetail":
          vm.transactionDetails = {};
          vm.modalShowTransactionDetail = true;
          axios
            .get(`${process.env.VUE_APP_API_URL}/transactions/${data.No}`)
            .then(res => {
              vm.transactionDetails = Object.assign(res.data, {
                totals: data.Total
              });
            });
          break;
        default:
          alert("error!");
      }
    }
  }
};
</script>

<style scoped>
</style>
