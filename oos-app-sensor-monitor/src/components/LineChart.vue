<template>
  <div class="line-chart__container" v-cloak>
    <div class="container">
      <div class="columns">
      <div class="col-3 col-mr-auto  size__container">
        <p class="size__text">Select range
        <select name="size" id="chartSize" v-model="chartSize" class="form-select" @change="filterSize">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        </p>
      </div>
      <div class="col-4 col-ml-auto switch__container">
        <div class="switcher__text">{{ switcher }}
        <input type="checkbox" id="switcher" class="switcher__checkbox" v-model="switcher" true-value="0x49" false-value="0x48">
        <label for="switcher" class="switcher__label" @click="switcherAction">
          <div class="switcher__label--round"></div>
        </label>
        </div>
      </div>
      </div>
    </div>
    <canvas id="line-chart"></canvas>
    <button class="clear" @click="clearStorage">Clear Cache</button>
    <div>Connect the <a href="https://onion.io/store/adc-expansion/">ADC Expansion</a> to your Omega and capture samples from all four channels in real time!</div>
  </div>
</template>

<script>
import OnionCDK from '@/OnionCDK.js'
import Chart from 'chart.js/dist/Chart.js'

export default {
  name: 'LineChart',
  components: {
    // Moment
  },
  data () {
    return {
      batteryChart: null,
      switcher: '0x48',
      chartSize: 10,
      chartData: {
        ch0: [],
        ch1: [],
        ch2: [],
        ch3: [],
        timer: []
      } // chartData
    }
  },
  methods: {
    getData () {
      // adc-exp -j -s 0x48 all
      OnionCDK.sendCmd('adc-exp', [
        '-j',
        '-s', this.switcher,
        'all'
      ])
    },
    updateData (ch0, ch1, ch2, ch3) {
      let self = this

      let checkerDataFunction = (arr, val) => {
        // TODO: fix this hard-coded array length
        if (arr.length > 29) {
          arr.shift()
        }
        arr.push(val)
        return arr
      }
      let checkerTimerFunction = (arr) => {
        let currentDate = new Date()
        let currentHours = `${(currentDate.getHours() <= 9) ? '0' + currentDate.getHours() : currentDate.getHours()}`
        let currentMinutes = `${(currentDate.getMinutes() <= 9) ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`
        let currentSeconds = `${(currentDate.getSeconds() <= 9) ? '0' + currentDate.getSeconds() : currentDate.getSeconds()}`

        let currentTime = `${currentHours}:${currentMinutes}:${currentSeconds}`
        if (arr.length > 29) {
          arr.shift()
        }
        arr.push(currentTime)
        return arr
      }
      let zoomFilter = (arr, size) => {
        return arr.slice(-size)
      }

      // Store chartData values
      checkerTimerFunction(self.chartData.timer)
      checkerDataFunction(self.chartData.ch0, ch0)
      checkerDataFunction(self.chartData.ch1, ch1)
      checkerDataFunction(self.chartData.ch2, ch2)
      checkerDataFunction(self.chartData.ch3, ch3)

      // Filter chartData
      self.batteryChart.data.labels = zoomFilter(self.chartData.timer, self.chartSize)
      self.batteryChart.data.datasets[0].data = zoomFilter(self.chartData.ch0, self.chartSize)
      self.batteryChart.data.datasets[1].data = zoomFilter(self.chartData.ch1, self.chartSize)
      self.batteryChart.data.datasets[2].data = zoomFilter(self.chartData.ch2, self.chartSize)
      self.batteryChart.data.datasets[3].data = zoomFilter(self.chartData.ch3, self.chartSize)

      // Save chartData to localStorage
      localStorage.setItem('chartData', JSON.stringify(self.chartData))

      // update the chart
      self.batteryChart.update(0)
    },
    switcherAction () {
      let self = this
      setTimeout(function () {
        localStorage.setItem('switcher', JSON.stringify(self.switcher))
      }, 10)
    },
    clearStorage () {
      localStorage.clear()
      this.clearChart()
    },
    filterSize () {
      localStorage.setItem('filter', JSON.stringify(this.chartSize))
    },
    getRandom (num) {
      return (Math.random() * num).toFixed(2)
    },
    initChart () {
      this.batteryChart = new Chart(document.getElementById('line-chart'), {
        type: 'line',
        data: {
          labels: this.chartData.timer,
          datasets: [
            {
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#2ecc71',
              data: this.chartData.ch0,
              label: 'A0'
            },
            {
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#1298C4',
              data: this.chartData.ch1,
              label: 'A1'
            },
            {
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#C41232',
              data: this.chartData.ch2,
              label: 'A2'
            },
            {
              backgroundColor: 'rgba(0,0,0,0)',
              borderColor: '#DFE629',
              data: this.chartData.ch3,
              label: 'A3'
            }
          ] // datasets
        }, // data
        options: {
          legend: {
            display: true
          },
          animation: {
            easing: 'linear'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }], // xAxes
            yAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Voltage'
              },
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 5
              }
            }] // yAxes
          } // scales
        } // options
      }) // new Chart function
    },
    clearChart () {
      this.batteryChart.destroy()
      this.chartData = {
        ch0: [],
        ch1: [],
        ch2: [],
        ch3: [],
        timer: []
      }
      this.initChart()
    }
  },
  mounted () {
    let self = this

    // Check localStorage
    if (localStorage.getItem('chartData')) {
      self.chartData = JSON.parse(localStorage.getItem('chartData'))
    }
    if (localStorage.getItem('switcher')) {
      self.switcher = JSON.parse(localStorage.getItem('switcher'))
    }
    if (localStorage.getItem('filter')) {
      self.chartSize = JSON.parse(localStorage.getItem('filter'))
    }

    // initialize the chart
    self.initChart()

    // OnionCDK setup
    OnionCDK.onInit = function () {
      console.log('OnionCDK Initialzied')

      // fetch data once a second
      setInterval(function () {
        self.getData()
      }, 1000)
    }
    OnionCDK.init()

    OnionCDK.onCmd = function (cmd, response) {
      if (cmd === 'adc-exp') {
        var values = JSON.parse(response)
        self.updateData(
          values['A0'],
          values['A1'],
          values['A2'],
          values['A3']
        )
      }
    // eslint-disable-next-line
    }.bind(self)
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }
  .line-chart__container {
    margin: 50px auto;
    max-width: 800px;
  }
  .clear {
    display: block;
    margin: 20px 0 10px auto;
    color: #fff;
    background-color: dodgerblue;
    font-size: 16px;
    font-weight:  600;
    border: 2px solid dodgerblue;
    border-radius: 5px;
    padding: 6px 15px 7px 15px;
    text-align: center;
    transition: all 0.3s ease;
  }
  .clear:hover {
    background-color: #fff;
    color: dodgerblue;
    cursor: pointer;
  }

  /* Switch CSS */
  .switch__container {
    margin: 10px 0 10px auto;
    width: 40px;
  }
  .switcher__checkbox {
    display: none;
  }
  .switcher__label {
    display: block;
    background-color: lightseagreen;
    padding: 3px;
    border-radius: 7px;
    width: 35px;
    height: 16px;
    transition: all 0.3s ease;
  }
  .switcher__label--round {
    display: block;
    background-color: #fff;
    border-radius: 50%;
    height: 10px;
    width: 10px;
    margin: 0 auto 0 0;
  }

  .switcher__checkbox:checked + .switcher__label {
    background-color: lightcoral;
  }

  .switcher__checkbox:checked + .switcher__label .switcher__label--round {
    margin: 0 0 0 auto;
  }

</style>
