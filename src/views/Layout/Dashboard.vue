<template>
  <div class="dashboard">
      dashboard
      <echarts></echarts>
      <router-view></router-view>
  </div>
</template>

<script>
import echarts from './components/echarts.vue'
export default {
  components: { echarts },

}
</script>

<style>

</style>