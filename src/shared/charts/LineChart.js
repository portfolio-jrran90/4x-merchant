import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  /*watch: {
    chartData () {
      this.renderChart(this.chartData, this.options)
    }
  },*/
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
