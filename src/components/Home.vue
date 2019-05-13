<template>
  <div class="py-4">

    <div class="row mb-2 c-filter">
      <div class="col">
        <div class="card">
          <div class="card-body py-3">
            <div class="form-inline">
              <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Filter by:</label>
              <select
                class="form-control form-control-lg my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                v-model="filterResultBy"
              >
                <option value="all-stores">All stores</option>
                <option value="store-select">Select store</option>
                <option value="type">Type</option>
              </select>

              <select
                class="form-control form-control-lg my-1 mr-sm-2"
                v-model="filteredBySelectType"
                v-if="filterResultBy === 'type'"
              >
                <option value="true">Online</option>
                <option value="false">Offline</option>
              </select>

              <select
                class="form-control form-control-lg my-1 mr-sm-2"
                v-model="filteredBySelectStore"
                v-if="filterResultBy === 'store-select'"
              >
                <option :value="data._id" v-for="data in stores">{{ data.name }}</option>
              </select>
              <button type="button" class="btn btn-primary btn-lg my-1" @click="filterResult">Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
      | ============================================================================================================
      |  Graph for the current sales of this month
      | ============================================================================================================
    -->
    <div class="row c-sales-report mb-2">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h4 class="py-2 mb-0">Sales for {{ getCurrentMonthName() }}</h4>
          </div>
          <div class="card-body">
            <apexchart height="350" type="line" :options="salesChartOptions" :series="salesSeries"></apexchart>
            <table class="table table-sm table-bordered">
              <tr>
                <td :colspan="noOfSales.days.length + 1" class="table-dark">
                  <h5 class="mb-0 p-2">
                    Number of sales for {{ getCurrentMonthName() }}
                    <span class="float-right badge badge-secondary">Total: {{ noOfSales.number.reduce((acc, val) => acc + val, 0) }}</span>
                  </h5>
                </td>
              </tr>
              <tr style="font-size: 14px">
                <td class="table-primary text-center"><strong>Days</strong></td>
                <td class="table-secondary text-center" v-for="data in noOfSales.days">
                  <strong>{{ (data<10)?'0'+data:data }}</strong>
                </td>
              </tr>
              <tr style="font-size: 14px">
                <td class="text-center"><strong>Qty</strong></td>
                <td class="text-center" v-for="data in noOfSales.number">{{ data }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!--
      | ============================================================================================================
      |  Graph for the average order value of this month
      | ============================================================================================================
    -->
    <div class="row c-sales-report mb-2">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h4 class="py-2 mb-0">Average Order Value</h4>    
          </div>
          <div class="card-body">
            <apexchart height="350" type="line" :options="salesChartOptions" :series="salesSeries"></apexchart>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row mb-4">
      <div class="col">
        <div class="card">
          <div class="card-header">
            <h4 class="py-2 mb-0">Settlement Report for {{ getCurrentMonthName() }}</h4>    
          </div>
          <div class="card-body">
            <bar-chart
              v-if="lineChartSettlementReportLoaded"
              :chartdata="lineChartSettlementReportData"
              :options="lineChartSettlementReportOptions" />
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      requestHeaders: {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      },

      filterResultBy: 'all-stores',
      filteredBySelectType: 'true',
      filteredBySelectStore: '',

      auth: {},
      stores: {},

      salesChartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      salesSeries: [],
      noOfSales: {
        days: [],
        number: []
      }

    }
  },
  created() {
    let vm = this

    vm.getStores()
  },
  mounted() {
    let vm = this

    let startDay = moment().startOf('month').format('YYYY-MM-DD'),
          endDay = moment().endOf('month').format('YYYY-MM-DD')

    vm.plotData({ date_range: { start: startDay, end: endDay }})
  },
  methods: {
    /**
     * Filter Result
     */
    filterResult() {
      let vm = this

      document.querySelector('.c-filter button').disabled = true
      document.querySelector('.c-filter button').innerHTML = 'Generating...'

      let startDay = moment().startOf('month').format('YYYY-MM-DD'),
            endDay = moment().endOf('month').format('YYYY-MM-DD')

      switch (vm.filterResultBy) {
        case 'all-stores':
          vm.plotData({ date_range: { start: startDay, end: endDay }})
          break
        case 'type':
          vm.plotData({ storeId: vm.filteredBySelectStore, date_range: { start: startDay, end: endDay }, type: vm.filteredBySelectType})
          break
        case 'store-select':
          vm.plotData({ storeId: vm.filteredBySelectStore, date_range: { start: startDay, end: endDay }})
          break
        default: //
      }
    },

    /**
     * Plot data based on the criterias being given
     * 
     * @param  ObjectId paramObj    this is optional
     */
    async plotData(paramObj) {
      let vm = this

      // Note: simplify this later
      let storeId = (paramObj===undefined)?'':((paramObj.storeId===undefined)?'':paramObj.storeId),
          date_range = (paramObj===undefined)?'':((paramObj.date_range===undefined)?'':paramObj.date_range),
          type = (paramObj===undefined)?'':((paramObj.type===undefined)?'': ((paramObj.type)?'online':'offline'))

      let filteredUrl = `/api/approvedtransactions?store=${storeId}&start=${date_range.start}&end=${date_range.end}&type=${type}`

      try {
        let transactions = await axios.get(filteredUrl, vm.requestHeaders)
        vm.getSalesReport(transactions.data)
      } catch (err) {
        console.log('error', err)
      }
    },

    /**
     * Get month name
     *
     * note: just create a filter for this
     * 
     * @param  Integer monthIndex
     */
    getCurrentMonthName() {
      return new Date().toLocaleString('en-US', { month: 'long' })
    },

    /**
     * Get Stores
     */
    getStores() {
      let vm = this
      axios
        .get('/api/stores?limit=100&skip=0&active=1', vm.requestHeaders)
        .then(res => vm.stores = res.data)
    },

    /**
     * Get result for Sales Report
     *
     * @param Object transactionObj   transaction object being passed for plotting to graph
     */
    getSalesReport(transactionObj) {
      let vm = this

      let start_day = moment().startOf('month'),
          end_day = moment().endOf('month')

      // formatted version
      let ffday = start_day.format('YYYY-MM-DD'),
          feday = end_day.format('YYYY-MM-DD')

      // the purpose of this is only to create the label on the x axis, i.e. the days in this month
      let dailyIndex = []
      for (let i=0; i<end_day.daysInMonth(); i++) dailyIndex[i] = i+1
      vm.noOfSales.days = dailyIndex

      vm.salesChartOptions = {
        ...vm.salesChartOptions, ...{
          xaxis: {
            categories: dailyIndex,
          },
          yaxis: {
            labels: {
              formatter: function(value) {
                return Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'}).format(value)
              }
            }
          }
        }
      }

      let dailyData = [],
          dailyNumberOfSales = []

      for (let i=1; i<=end_day.daysInMonth(); i++) {
        let dd = transactionObj
                    .reduce((acc, data) => {
                      if (moment(data.createdAt).format('D') != i) return acc
                      return acc + parseFloat(data.total)
                    }, 0)
        let ee = transactionObj
                    .reduce((acc, data) => {
                      if (moment(data.createdAt).format('D') != i) return acc
                      let arr = []
                      arr.push(data)
                      return acc + arr.length
                    }, 0)
        dailyData.push(dd)
        dailyNumberOfSales.push(ee)
      }

      vm.noOfSales.number = dailyNumberOfSales

      vm.salesSeries = [{
        name: 'sales',
        data: dailyData
      }]

      document.querySelector('.c-filter button').disabled = false
      document.querySelector('.c-filter button').innerHTML = 'Generate'

      // Status
      // ========================
      // 0 = pending
      // 1 = on-going
      // 2 = confirm
      // 3 = because dispute mean the item was returned from the user
    },
  }
}
</script>
