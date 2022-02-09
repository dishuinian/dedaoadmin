<template>
  <div class="navmenu">
    <div class="collapse" @click="togglecollapse">
      <i v-if="collapse" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <el-menu
      :collapse="collapse"
      :default-active="$route.fullPath"
      :unique-opened="true"
      :collapse-transition="true"
      :router="true"
      class="el-menu-vertical-demo"
      @close="handleClose"
      @open="handleOpen"
      background-color="#283643"
      text-color="#fff"
      active-text-color="#ff6b01"
    >
      <!-- 遍历routesList -->
      <menuItem v-for="item in routesList" :key="item.path" :item="item">
      </menuItem>
    </el-menu>
  </div>
</template>

<script>
import asyncRoute from "../../router/asyncRoute.js";
import menuItem from "./menuItem.vue";

export default {
  components: { menuItem },
  data() {
    return {
      isCollapse: true,
      routesList: asyncRoute,
      collapse: false
    };
  },
  mounted() {
    // console.log(this.routesList);
  },
  methods: {
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    togglecollapse(){
      this.collapse = !this.collapse
    }
  },
};
</script>

<style>
.collapse {
  height: 36px;
  line-height: 36px;
}
.el-submenu .el-menu-item {
  text-align: left;
}
::v-deep .el-menu {
  background-color: #0a0a0a !important ;
}
.el-submenu .el-menu-item {
  margin-left: 36px;
}
</style>