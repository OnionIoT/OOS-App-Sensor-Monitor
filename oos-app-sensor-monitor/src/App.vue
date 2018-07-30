<template>
  <div id="app">

    <div class="data-chart">
      <LineChart></LineChart>
    </div>

  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
export default {
  name: 'App',
  components: {
    LineChart
  }
}
</script>

<style>
html, body {
    height: 100% !important;
}
body {
  margin: 0;
  padding: 0;
  background-color: white;
  box-sizing: border-box;
}
</style>
