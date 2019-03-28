<template>
  <div class="pt-4 pb-5">
    <div class="row mb-4 c-sales-report">
      <div class="col">
        <h2>
          Sales Report
          <small style="font-size: 1.2rem">
            <router-link :to="{ name: 'transactions' }"><font-awesome-icon icon="search" size="sm" /> view</router-link>
          </small>
        </h2>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-9">
                <div>
                  <line-chart v-if="lineChartSalesLoaded" :chartdata="lineChartSalesData" :options="lineChartSalesOptions" />
                </div>
              </div>
              <div class="col text-center">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="mb-0">Weekly Sales Growth</h5>
                  </div>
                  <div class="card-body" style="font-size: 1.5em">
                    10%
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Monthly Sales Growth</h5>
                  </div>
                  <div class="card-body" style="font-size: 1.5em">10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row mb-4">
      <div class="col">
        <h2>Settlement Report</h2>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-9">
                <line-chart
                  v-if="lineChartSettlementReportLoaded"
                  :chartdata="lineChartSettlementReportData"
                  :options="lineChartSettlementReportOptions" />
              </div>
              <div class="col text-center">
                <router-link :to="{ name: 'transactions' }" class="btn btn-secondary btn-block py-3">Search for a transaction</router-link>
                <button type="button" class="btn btn-danger btn-block py-3">Disputed transaction</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row">
      <div class="col">
        <router-link :to="{ name: 'user-setting' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Admin</router-link>
        <router-link :to="{ name: 'inbox' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Notification</router-link>
        <router-link :to="{ name: 'bank-account-setting' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Information</router-link>
        <button type="button" class="btn btn-lg btn-secondary px-5 py-3">Contact Us</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
import LineChart from '../shared/charts/LineChart.js'
// import { getWeeksMixin } from '../mixins/getWeeksMixin.js'

export default {
  components: {
    LineChart
  },
  // mixins: [getWeeksMixin],
  data() {
    return {
      auth: {},

      lineChartSalesData: {},
      lineChartSalesOptions: {},
      lineChartSalesLoaded: false,
      weeklySalesGrowth: 0,
      monthlySalesGrowth: 0,

      lineChartSettlementReportData: {},
      lineChartSettlementReportOptions: {},
      lineChartSettlementReportLoaded: false,
    }
  },
  async mounted() {
    let vm = this

    // get merchant info
    let merchantJson = await axios.get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    })

    // Generate Graph
    // This should be filtered inside the API though
    vm.getSalesReport(merchantJson.data._id)
    vm.getSettlementReport(merchantJson.data._id)
  },
  methods: {
    /**
     * Get result for Sales Report
     *
     * @param ObjectId merchId
     */
    async getSalesReport(merchId) {
      let vm = this

      vm.lineChartSalesLoaded = false
      try {
        // Note: Month always start on index 0
        // Get all weeks in a month
        let now = new Date()
        var weeks = [],
            firstDate = new Date( now.getFullYear(), now.getMonth(), 1 ),
            lastDate = new Date( now.getFullYear(), now.getMonth()+1, 0 ),
            numDays = lastDate.getDate()

        var start = 1
        var end = 7 - firstDate.getDay()
        while(start <= numDays){
          weeks.push({ start: start,end: end })
          start = end + 1
          end = end + 7
          if(end > numDays) end = numDays
        }

        let startDate = `${firstDate.getFullYear()}-${firstDate.getMonth()+1}-${firstDate.getDate()}`
        let endDate = `${lastDate.getFullYear()}-${lastDate.getMonth()+1}-${lastDate.getDate()}`
        let md5Encrypt = md5(merchId + '4XEMPAT!')

        // get transactions
        let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${startDate}&k=${endDate}&m=${md5Encrypt}`, {
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'x-access-token': localStorage.getItem('auth_token'),
            'Access-Control-Allow-Origin': '*'
          }
        })

        // sort the result from ascending
        let transactionData = transactionJson.data.map(val => {
          return {
            paymentdate: new Date(val.paymentdate).getDate(),
            amount: val.jumlah
          }
        })

        let weekData = []
        // weeks in a months
        for (let i=0; i<weeks.length; i++) {
          // extract days
          weekData.push([])
          for (let j=weeks[i].start; j<=weeks[i].end; j++) {
            // data from DB
            let dd = transactionData
                      .reduce((acc, data) => {
                        if (data.paymentdate != j) return acc
                        return acc + parseFloat(data.amount)
                      }, 0)
            weekData[i].push(dd) 
          }
        }

        // this part is too redundant, modify this
        // report should be filtered inside the API though, not in front-end
        let weeklyData = []
        let weekIndex = []
        for (let i=0; i<weeks.length; i++) {
          weekIndex.push('Week ' + (i + 1)) // this will output the week
          let aw = weekData[i].reduce((a, v) => a + v, 0)
          weeklyData.push(aw)
        }

        console.log(weeklyData)

        vm.lineChartSalesData = {
          labels: weekIndex,
          datasets: [{
            label: '',
            backgroundColor: 'red',
            borderColor: 'red',
            data: weeklyData,
            fill: false,
          }]
        }
        vm.lineChartSalesOptions = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'For the month of March'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Weeks'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Amount'
              },
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
        vm.lineChartSalesLoaded = true
      } catch (e) {
        console.error(e)
      }
    },

    /**
     * Get result for Settlement Report
     *
     * @param ObjectId merchId
     */
    async getSettlementReport(merchId) {
      let vm = this

      vm.lineChartSettlementReportLoaded = false
      try {
        // get md5
        // Note: ya need to install md5 plugin for this
        // let generatedMd5 = 

        // Note: Month always start on index 0
        // Get all weeks in a month
        let now = new Date()
        var weeks = [],
            firstDate = new Date( now.getFullYear(), now.getMonth(), 1 ),
            lastDate = new Date( now.getFullYear(), now.getMonth()+1, 0 ),
            numDays = lastDate.getDate()

        var start = 1;
        var end = 7 - firstDate.getDay();
        while(start <= numDays){
           weeks.push({ start: start,end: end });
           start = end + 1;
           end = end + 7;
           if(end > numDays) end = numDays
        }


        let startDate = `${firstDate.getFullYear()}-${firstDate.getMonth()+1}-${firstDate.getDate()}`
        let endDate = `${lastDate.getFullYear()}-${lastDate.getMonth()+1}-${lastDate.getDate()}`

        // get transactions
        let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${startDate}&k=${endDate}&m=c00bdb56c3e31c0761a91b4fc79fa530`, {
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'x-access-token': localStorage.getItem('auth_token'),
            'Access-Control-Allow-Origin': '*'
          }
        })

        // console.log(transactionJson.data)

        // 1. compare date from the DB and then get the day to insert to its appropriate week
        // 2. if the date is in between the 

        // sort the result from ascending
        let transactionData = transactionJson.data.map(val => {
          return {
            paymentdate: new Date(val.paymentdate).getDate(),
            amount: val.jumlah,
            status: val.status
          }
        })
        // console.log(transactionData)
        // console.log('---')
        // 
        let weekData = []
        // weeks in a months
        for (let i=0; i<weeks.length; i++) {
          // console.log('---')
          // extract days
          weekData.push([])
          for (let j=weeks[i].start; j<=weeks[i].end; j++) {
            // data from DB
            let dd = transactionData
                      // .filter(el => el.paymentdate == j)
                      .reduce((acc, data) => {
                        if (data.paymentdate != j) return acc
                        return acc + parseFloat(data.amount)
                      }, 0)
            // console.log('dd', dd)
            // before xa i.push, filter the result already
            weekData[i].push(dd) 
          }
        }
        // console.log(weekData)

        // this part is too redundant, modify this
        // report should be filtered inside the API though, not in front-end
        let weeklyData = []
        let weekIndex = []
        for (let i=0; i<weeks.length; i++) {
          weekIndex.push('Week ' + (i + 1)) // this will output the week
          let aw = weekData[i].reduce((a, v) => a + v, 0)
          weeklyData.push(aw)
        }
        // console.log(weeklyData)

        vm.lineChartSettlementReportData = {
          labels: weekIndex,
          datasets: [{
            label: '',
            backgroundColor: 'red',
            borderColor: 'red',
            data: weeklyData,
            fill: false,
          }]
        }
        vm.lineChartSettlementReportOptions = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'For the month of March'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Weeks'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Amount'
              },
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }
        vm.lineChartSettlementReportLoaded = true
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>
