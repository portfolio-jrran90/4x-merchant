<template>
  <div class="py-4">

    <!-- <div class="row mb-2">
      <div class="col">
        <div class="card">
          <div class="card-body py-3">
            <div class="form-inline">
              <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Filter by:</label>
              <select
                class="custom-select my-1 mr-sm-2"
                id="inlineFormCustomSelectPref"
                v-model="filterResultBy"
              >
                <option value="all-stores">All stores</option>
                <option value="online">Online</option>
                <option value="store-select">Store Select</option>
              </select>
              <select
                class="custom-select my-1 mr-sm-2"
                v-model="filteredBySelectStore"
                v-if="filterResultBy === 'store-select'"
              >
                <option value="all-stores">Store 1</option>
                <option value="online">Store 2</option>
                <option value="store-select">Store 3</option>
              </select>
              <button type="button" class="btn btn-primary my-1">Filter Result</button>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row mb-2">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="form-inline">
              <label class="my-1 mr-2" style="font-size:1.4em">Filter by:</label>
              <button class="btn btn-lg px-5 btn-primary">All stores</button>
              <button class="btn btn-lg px-5 mx-2 btn-secondary">Online</button>
              <b-dropdown text="Store select" size="lg">
                <b-dropdown-item v-for="data in stores" @click.prevent="plotData(data._id)">{{ data.name }}</b-dropdown-item>
              </b-dropdown>
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
            <line-chart v-if="lineChartSalesLoaded" :chartdata="lineChartSalesData" :options="lineChartSalesOptions" />
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
            <h4 class="py-2 mb-0">Average Orde Value</h4>    
          </div>
          <div class="card-body">
            <line-chart v-if="lineChartSalesLoaded" :chartdata="lineChartSalesData" :options="lineChartSalesOptions" />
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

    <!-- <div class="row">
      <div class="col">
        <router-link :to="{ name: 'user-setting' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Admin</router-link>
        <router-link :to="{ name: 'inbox' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Notification</router-link>
        <router-link :to="{ name: 'bank-account-setting' }" class="btn btn-lg btn-secondary px-5 py-3 mr-2">Information</router-link>
        <button type="button" class="btn btn-lg btn-secondary px-5 py-3">Contact Us</button>
      </div>
    </div> -->

  </div>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'
import LineChart from '../shared/charts/LineChart.js'
import BarChart from '../shared/charts/BarChart.js'
import moment from 'moment'

// import { getWeeksMixin } from '../mixins/getWeeksMixin.js'

export default {
  components: {
    LineChart,
    BarChart
  },
  // mixins: [getWeeksMixin],
  data() {
    return {
      requestHeaders: {
        headers: {
          'Authorization': process.env.VUE_APP_AUTHORIZATION,
          'x-access-token': localStorage.getItem('auth_token')
        }
      },

      filterResultBy: 'all-stores',
      auth: {},

      stores: {},

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
  created() {
    let vm = this
    vm.getStores()
  },
  async mounted() {
    let vm = this

    // get merchant info
    /*let merchantJson = await axios.get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    })*/

    // Generate Graph
    // This should be filtered inside the API though
    // vm.getSalesReport(merchantJson.data._id)
    // vm.getSettlementReport(merchantJson.data._id)

    // vm.getSalesGrowth(merchantJson.data._id)

    // By default, load all store related to the current logged in merchant.
    // If date is not provided, then it'll display the days for the current month
    // 
    // vm.plotData({ storeId: '5cbd3f0b8c2a8650f0215c28', date_range: { s: '2019-04-01', e: '2019-04-30' }})
    // vm.plotData({ storeId: '5cbd3f0b8c2a8650f0215c28' })
    // vm.plotData()
    // 

    // This is the default
    let startDay = moment().startOf('month').format('YYYY-MM-DD'),
        endDay = moment().endOf('month').format('YYYY-MM-DD')
    /*let startDay = '2019-04-01',
        endDay = '2019-04-30'*/
    vm.plotData({ date_range: { start: startDay, end: endDay }})
  },
  methods: {

    /**
     * Plot data based on the criterias being given
     * 
     * @param  ObjectId paramObj    this is optional
     */
    async plotData(paramObj) {
      let vm = this

      let storeId = (paramObj===undefined)?'':((paramObj.storeId===undefined)?'':paramObj.storeId),
          date_range = (paramObj===undefined)?'':((paramObj.date_range===undefined)?'':paramObj.date_range)

      let filteredUrl = `/api/approvedtransactions?store=${storeId}&start=${date_range.start}&end=${date_range.end}`

      try {
        let transactions = await axios.get(filteredUrl, vm.requestHeaders)
        console.log('tt', transactions.data)
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
        .get('/api/stores?limit=100&skip=0', vm.requestHeaders)
        .then(res => vm.stores = res.data)
    },

    /**
     * Get result for Sales Report
     *
     * @param Object transactionObj   transaction object being passed for plotting to graph
     */
    async getSalesReport(transactionObj) {
      let vm = this

      // the date should be globalize

      // moment test ========================
      let start_day = moment().startOf('month'),
          end_day = moment().endOf('month')

      // test
      /*let start_day = moment('2019-04-01'),
          end_day = moment('2019-04-30')*/

      // formatted version
      let ffday = start_day.format('YYYY-MM-DD'),
          feday = end_day.format('YYYY-MM-DD')

      // the purpose of this is only to create the label on the x axis, i.e. the days in this month
      let dailyIndex = []
      for (let i=0; i<end_day.daysInMonth(); i++) dailyIndex[i] = i+1

      let dailyData = []
      for (let i=1; i<=end_day.daysInMonth(); i++) {       
        let dd = transactionObj
                    .reduce((acc, data) => {
                      if (moment(data.createdAt).format('D') != i) return acc
                      return acc + parseFloat(data.total)
                    }, 0)
        dailyData.push(dd)
      }

      vm.lineChartSalesData = {
        labels: dailyIndex,
        datasets: [{
          label: '',
          backgroundColor: '#38424b',
          borderColor: '#38424b',
          data: dailyData,
          fill: false,
        }]
      }

      vm.lineChartSalesOptions = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          // text: 'Sales for ' + vm.getCurrentMonthName()
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
              labelString: 'Days'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Sales Value (Rp)'
            },
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }


      vm.lineChartSalesLoaded = true

      // vm.lineChartSalesLoaded = false

      // Status
      // ========================
      // 0 = pending
      // 1 = on-going
      // 2 = confirm
      // 3 = because dispute mean the item was returned from the user

      // let testMerchId = '5cbd3f46f3c6f550b51e4857'
      /*try {
        let md5Encrypt = md5(merchId + '4XEMPAT!')
        // let md5Encrypt = md5(testMerchId + '4XEMPAT!')

        // moment test ========================
        // let fday = moment().startOf('month'),
        //     eday = moment().endOf('month')

        // test
        let fday = moment('2019-03-01'),
            eday = moment('2019-03-28')

        // formatted version
        let ffday = fday.format('YYYY-MM-DD'),
            feday = eday.format('YYYY-MM-DD')

        // the purpose of this is only to create the label on the x axis, i.e. the days in this month
        let dailyIndex = []
        for (let i=0; i<eday.daysInMonth(); i++) dailyIndex[i] = i+1

        // 5cbd3f46f3c6f550b51e4857 -- merch
        // 5cbd3f0b8c2a8650f0215c28 - store

        // Get transactions
        let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${merchId}&d=${ffday}&k=${feday}&m=${md5Encrypt}`, vm.requestHeaders)
        // let transactionJson = await axios.get(`http://sandbox.empatkali.co.id/transaksi.php?id=${testMerchId}&d=${ffday}&k=${feday}&m=${md5Encrypt}`, vm.requestHeaders)

        // sort the result from ascending
        let transactionData = transactionJson.data.map(val => {
          return {
            status: val.status,
            paymentdate: new Date(val.paymentdate).getDate(),
            amount: val.jumlah
          }
        })

        console.log('from Davin', transactionData)

        let dailyData = []
        for (let i=1; i<=eday.daysInMonth(); i++) {
          let dd = transactionData
                      .reduce((acc, data) => {
                        if (data.paymentdate != i) return acc
                        return acc + parseFloat(data.amount)
                      }, 0)
          dailyData.push(dd)
        }

        vm.lineChartSalesData = {
          labels: dailyIndex,
          datasets: [{
            label: '',
            backgroundColor: '#38424b',
            borderColor: '#38424b',
            data: dailyData,
            fill: false,
          }]
        }

        vm.lineChartSalesOptions = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            // text: 'Sales for ' + vm.getCurrentMonthName()
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
                labelString: 'Days'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Sales Value (Rp)'
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
      }*/
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
            label: 'Planned',
            backgroundColor: '#38424b',
            borderColor: '#38424b',
            data: [1212121,212,3100000,4100000,5100000,2100000],
            fill: false,
          },
          {
            label: 'Actual',
            backgroundColor: '#98A2AB',
            borderColor: '#98A2AB',
            data: [100000,2100000,3100000,4100000,5100000],
            // data: weeklyData,
            fill: false,
          },
          {
            label: 'Not',
            backgroundColor: '#369',
            borderColor: '#369',
            data: [100000,2100000,3100000,4100000,5100000],
            // data: weeklyData,
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
