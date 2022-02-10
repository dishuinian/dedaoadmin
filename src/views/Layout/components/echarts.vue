<template>
  <div id="goodsChart" :style="{ width: '300px', height: '300px' }">
    echarts
  </div>
</template>

<script>
// https://www.cnblogs.com/zhihua30/p/11194134.html
// https://echarts.apache.org/examples/zh/editor.html?c=pie-custom
import * as echarts from "echarts";

var chartDom = document.getElementById("goodsChart");
// var myChart = echarts.init(chartDom);
var option;

export default {
  mounted() {
    this.getEchartData();
  },
  methods: {
    getEchartData() {
      if (chartDom) {
        this.$echarts.init(chartDom);
        option = {};
      }
    },
  },
};
</script>

<style>
</style>