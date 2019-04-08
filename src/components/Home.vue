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
                    {{ weeklySalesGrowth }}%
                  </div>
                </div>
                <div class="card">
                  <div class="card-header">
                    <h5 class="mb-0">Monthly Sales Growth</h5>
                  </div>
                  <div class="card-body" style="font-size: 1.5em">
                    {{ monthlySalesGrowth }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
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
    </div>

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
import moment from 'moment'

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

    vm.getSalesGrowth(merchantJson.data._id)
  },
  methods: {
    /**
     * Get month name
     * 
     * @param  Integer monthIndex
     */
    getCurrentMonthName() {
      return new Date().toLocaleString('en-US', { month: 'long' })
    },

    /**
     * Get result for Sales Report
     *
     * @param ObjectId merchId
     */
    async getSalesReport(merchId) {
      let vm = this

      // Status
      // ========================
      // 0 = pending
      // 1 = on-going
      // 2 = confirm
      // 3 = because dispute mean the item was returned from the user

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
        // let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=5c63b4b88b904e1c13672183&d=2019-02-01&k=2019-02-31&m=${md5Encrypt}`, {
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'x-access-token': localStorage.getItem('auth_token'),
            'Access-Control-Allow-Origin': '*'
          }
        })

        // sort the result from ascending
        let transactionData = transactionJson.data.map(val => {
          return {
            status: val.status,
            paymentdate: new Date(val.paymentdate).getDate(),
            amount: val.jumlah
          }
        })

        // console.log(transactionData)

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
            text: 'For the month of ' + vm.getCurrentMonthName()
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

      // Status
      // ========================
      // 0 = pending
      // 1 = on-going
      // 2 = confirm
      // 3 = because dispute mean the item was returned from the user

      vm.lineChartSettlementReportLoaded = false
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
        // let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=5c63b4b88b904e1c13672183&d=2019-02-01&k=2019-02-31&m=${md5Encrypt}`, {
          headers: {
            'Authorization': process.env.VUE_APP_AUTHORIZATION,
            'x-access-token': localStorage.getItem('auth_token'),
            'Access-Control-Allow-Origin': '*'
          }
        })

        // sort the result from ascending
        let transactionData = transactionJson.data.map(val => {
          return {
            status: val.status,
            paymentdate: new Date(val.paymentdate).getDate(),
            amount: val.jumlah
          }
        })

        console.log(transactionData)

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

        vm.lineChartSettlementReportData = {
          labels: weekIndex,
          datasets: [{
            label: 'confirmed',
            backgroundColor: 'green',
            borderColor: 'green',
            data: weeklyData,
            fill: false,
          },
          {
            label: 'disputed',
            backgroundColor: 'red',
            borderColor: 'red',
            // data: [100000,2100000,3100000,4100000,5100000],
            data: weeklyData,
            fill: false,
          }]
        }
        vm.lineChartSettlementReportOptions = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'For the month of ' + vm.getCurrentMonthName()
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

    /**
     * Get/Calculate Sales Growth
     * 
     * @param  Integer merchId
     */
    // Note: All of this should be processed inside the backend
    async getSalesGrowth(merchId) {
      let vm = this
      let md5Encrypt = md5(merchId + '4XEMPAT!')

      let now = new Date()
      
      // test
      // let now = new Date(2019, 2, 1)

      // current date range
      var currentFirstDate = new Date( now.getFullYear(), now.getMonth(), 1 ),
          currentLastDate = new Date( now.getFullYear(), now.getMonth()+1, 0 ),
          currentDate = currentLastDate.getDate()

      let currentStartDate = `${currentFirstDate.getFullYear()}-${currentFirstDate.getMonth()+1}-${currentFirstDate.getDate()}`
      let currentEndDate = `${currentLastDate.getFullYear()}-${currentLastDate.getMonth()+1}-${currentLastDate.getDate()}`

      // previous date range
      var previousFirstDate = new Date( now.getFullYear(), now.getMonth()-1, 1 ),
          previousLastDate = new Date( now.getFullYear(), now.getMonth(), 0 ),
          previousDate = previousLastDate.getDate()

      let previousStartDate = `${previousFirstDate.getFullYear()}-${previousFirstDate.getMonth()+1}-${previousFirstDate.getDate()}`
      let previousEndDate = `${previousLastDate.getFullYear()}-${previousLastDate.getMonth()+1}-${previousLastDate.getDate()}`

      /*console.log('start', currentStartDate)
      console.log('end', currentEndDate)

      console.log('====')

      console.log('start', previousStartDate)
      console.log('end', previousEndDate)*/

      // Note: create a function for this for simplification

      // get the total transactions for the current month
      let currentTransactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${currentStartDate}&k=${currentEndDate}&m=${md5Encrypt}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      let currentMonth = currentTransactionJson.data.map(val => parseFloat(val.jumlah)).reduce((a,v) => a + v, 0)


      // get the total transactions from the previous month
      let previousTransactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${previousStartDate}&k=${previousEndDate}&m=${md5Encrypt}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      let previousMonth = previousTransactionJson.data.map(val => parseFloat(val.jumlah)).reduce((a,v) => a + v, 0)

      // calculate the monthly growth sales
      vm.monthlySalesGrowth = ( ((currentMonth - previousMonth) / previousMonth) * 100 ).toFixed(2)

    
      // Get week
      let getDaysInAWeekRange = {
        current: {
          /*s: moment().day('Monday').isoWeek( 9 ).format('YYYY-MM-DD'),
          e: moment().day('Sunday').isoWeek( 9 ).format('YYYY-MM-DD'),*/
          s: moment().day('Monday').isoWeek( moment().isoWeek() ).format('YYYY-MM-DD'),
          e: moment().day('Sunday').isoWeek( moment().isoWeek() ).format('YYYY-MM-DD'),
        },
        previous: {
          /*s: moment().day('Monday').isoWeek( 8 ).format('YYYY-MM-DD'),
          e: moment().day('Sunday').isoWeek( 8 ).format('YYYY-MM-DD')*/
          s: moment().day('Monday').isoWeek( moment().isoWeek() - 1 ).format('YYYY-MM-DD'),
          e: moment().day('Sunday').isoWeek( moment().isoWeek() - 1 ).format('YYYY-MM-DD')
        }
      }

      /*console.log('current', getDaysInAWeekRange.current)
      console.log('=======')
      console.log('previous', getDaysInAWeekRange.previous)*/

      // current week
      let currentWeekTransactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${getDaysInAWeekRange.current.s}&k=${getDaysInAWeekRange.current.e}&m=${md5Encrypt}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      let currentWeek = currentWeekTransactionJson.data.map(val => parseFloat(val.jumlah)).reduce((a,v) => a + v, 0)

      // previous week
      let previousWeekTransactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${getDaysInAWeekRange.previous.s}&k=${getDaysInAWeekRange.previous.e}&m=${md5Encrypt}`, {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token'),
          'Access-Control-Allow-Origin': '*'
        }
      })
      let previousWeek = previousWeekTransactionJson.data.map(val => parseFloat(val.jumlah)).reduce((a,v) => a + v, 0)

      /*console.log('current', currentWeekTransactionJson.data)
      console.log('previous', previousWeekTransactionJson.data)
      console.log(currentWeek + ' - ' + previousWeek)*/

      // calculate the monthly growth sales
      // vm.weeklySalesGrowth = ( ((currentWeek - previousWeek) / previousWeek) * 100 ).toFixed(2)
      vm.weeklySalesGrowth = (previousWeek!=0) ? (((currentWeek - previousWeek) / previousWeek) * 100) : (previousWeek/1).toFixed(2)
    }
  }
}
</script>
