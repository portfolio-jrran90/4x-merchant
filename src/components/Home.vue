<template>
  <div class="pt-4 pb-5">
    <div class="row mb-4">
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
                <canvas id="canvas" height="100"></canvas>
              </div>
              <div class="col text-center">
                <div class="card mb-3">
                  <div class="card-header">
                    <h5 class="mb-0">Weekly Sales Growth</h5>
                  </div>
                  <div class="card-body" style="font-size: 1.5em">10%</div>
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

    <div class="row mb-4">
      <div class="col">
        <h2>Settlement Report</h2>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-9">
                <canvas id="canvas2" height="50"></canvas>
                <canvas id="canvas3" height="50"></canvas>
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
import { Line } from 'vue-chartjs'

export default {
  /*extends: Line,
  props: ['chartdata', 'options'],*/
  data() {
    return {
      auth: {}
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/api/merchants/detail`, {
      headers: {
        'Authorization': process.env.VUE_APP_AUTHORIZATION,
        'x-access-token': localStorage.getItem('auth_token')
      }
    }).then(res => this.auth = res.data)
  },
  mounted() {
    // this.renderChart(this.chartdata, this.options)
    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var config = {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: 'dataset',
          backgroundColor: 'red',
          borderColor: 'red',
          data: [12, 19, 3, 5, 2, 3],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        /*title: {
          display: true,
          text: 'Chart.js Line Chart'
        },*/
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
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    };

    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    var ctx2 = document.getElementById('canvas2').getContext('2d');
    window.myLine2 = new Chart(ctx2, config);    

    var ctx3 = document.getElementById('canvas3').getContext('2d');
    window.myLine3 = new Chart(ctx3, config);    
  },
}
</script>
