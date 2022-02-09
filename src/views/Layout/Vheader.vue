<template>
  <div class="vheader">
    <el-row :gutter="20">
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <div class="logo">
            <img src="../../assets/images/logo2.jpg" />
          </div></div
      ></el-col>
      <el-col :span="18"
        ><div class="grid-content bg-purple">得到App知识就在得到</div></el-col
      >
      <el-col :span="3"
        ><div class="grid-content bg-purple">
          <el-button type="primary" class="quit" size="small" @click="quit"
            >退出登录</el-button
          >
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    quit() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.vheader {
  background-color: #ff6b01;
  color: #283643;
  font-size: 16px;
}
.quit {
  background: #283643;
  border-color: #bb6426;
  color: #eb8c00;
  font-weight: 600;
}
.logo {
  width: 200px;
  height: 70px;
  img {
    width: 79%;
    height: auto;
  }
}
</style>