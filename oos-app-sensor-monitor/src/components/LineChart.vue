<template lang="html">
  <div class="">
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>
import Chart from '@/Chart.min.js'
export default {
  name: 'LineChart',
  components: {
    // Moment
  },
  data () {
    return {
      batteryChart: null
      // data: []
    }
  },
  props: {
    title: String,
    data: Array
  },
  mounted () {
    this.batteryChart = new Chart(document.getElementById('line-chart'), {
      type: 'line',
      data: {
        labels: this.getLabels,
        datasets: [{
          backgroundColor: '#eafaf1',
          borderColor: '#2ecc71',
          data: this.getData,
          // hidden: true,
          label: 'Battery Voltage'
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            }
          }]
        }
      }
    })
  },
  computed: {
    getLabels () {
      var label = []
      for (var i = 0; i < this.data.length; i++) {
        label.push(this.data[i].time)
      }
      return label
    },
    getData () {
      var data = []
      for (var i = 0; i < this.data.length; i++) {
        data.push(this.data[i].voltage)
      }
      return data
    }
  },
  watch: {
    'data': function (val, oldVal) {
      var chart = this.batteryChart
      chart.data.labels = this.getLabels
      chart.data.datasets[0].data = this.getData
      chart.update()
    }
  }
}
</script>

<style lang="css">
</style>
