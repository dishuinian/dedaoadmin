<template>
  <div class="Layout">
    <el-container>
      <!--------------------------------- header -->
      <el-header>
        <vheader />
      </el-header>

      <el-container class="navmain">
        <!----------------------------------左侧导航 -->
        <el-aside>
          <nav-menu />
        </el-aside>

        <!-- ---------------------------------主内容区 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./NavMenu.vue";
import Vheader from "./Vheader.vue";
export default {
  components: { Vheader, NavMenu }
};
</script>

<style lang="scss" scoped>
.Layout{
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #283643;
  color: #e9eef3;
  text-align: center;
  line-height: 60px;
  padding-left: 0;
}

.el-aside {
  background-color: #283643;
  color: #e9eef3;
  text-align: center;
  line-height: 200px;
  width: auto !important;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-container {
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
}
.navmain{
  margin-bottom: 40px;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

</style>