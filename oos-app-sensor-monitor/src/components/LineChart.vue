<template>
  <div class="line-chart__container">
    <div class="switch__container">
      <span class="switcher__text">{{ switcher }}</span>
      <input type="checkbox" id="switcher" class="switcher__checkbox" v-model="switcher" true-value="0x49" false-value="0x48">
      <label for="switcher" class="switcher__label" @click="switcherAction">
        <div class="switcher__label--round"></div>
      </label>
    </div>
    <canvas id="line-chart"></canvas>
    <button class="clear" @click="clearStorage">Clear Cache</button>
  </div>
</template>

<script>
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
      let self = this

      let checkerDataFunction = (arr) => {
        if (arr.length > 9) {
          arr.shift()
        }
        arr.push(self.getRandom(5))
        return arr
      }
      let checkerTimerFunction = (arr) => {
        let currentDate = new Date()
        let currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
        if (arr.length > 9) {
          arr.shift()
        }
        arr.push(currentTime)
        return arr
      }

      checkerTimerFunction(self.chartData.timer)
      checkerDataFunction(self.chartData.ch0)
      checkerDataFunction(self.chartData.ch1)
      checkerDataFunction(self.chartData.ch2)
      checkerDataFunction(self.chartData.ch3)

      localStorage.setItem('chartData', JSON.stringify(self.chartData))
    },
    switcherAction () {
      let self = this
      console.log(self.switcher)
    },
    clearStorage () {
      localStorage.clear()
      this.clearChart()
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

    self.initChart()

    setInterval(function () {
      console.log(self.chartData)
      self.getData()
      self.batteryChart.update()
    }, 1000)
  }
}
</script>

<style scoped>
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
