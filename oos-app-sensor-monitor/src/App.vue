<template>
  <div id="app">

    <ul class="tab tab-block">
      <li class="tab-item active">
        <a href="#">Music</a>
      </li>
      <li class="tab-item">
        <a href="#" class="active">Playlists</a>
      </li>
      <li class="tab-item">
        <a href="#">Radio</a>
      </li>
      <li class="tab-item">
        <a href="#">Connect</a>
      </li>
    </ul>


    <div class="data-chart">

    </div>

  </div>
</template>

<script>
import OnionCDK from '@/OnionCDK.js'
import LineChart from '@/components/LineChart'
export default {
  name: 'App',
  components: {
    LineChart
  },
  mounted () {
    OnionCDK.onInit = function () {
      console.log('OnionCDK Initialzied')
    }
    OnionCDK.init()
  }
}
</script>

<style>
html, body {
    height: 100% !important;
    height: 100%;
}
body {
  margin: 0;
  padding: 0;
  background-color: white;
}
</style>
