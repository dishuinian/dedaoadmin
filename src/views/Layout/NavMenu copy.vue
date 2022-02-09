<template>
  <div class="navmenu">
    <h5>
      <i class="el-icon-s-fold"></i>
      <i class="el-icon-s-unfold"></i>
    </h5>
    <el-menu
      :default-active="$route.fullPath"
      :unique-opened="true"
      :collapse-transition="true"
      :router="true"
      class="el-menu-vertical-demo"
      @close="handleClose"
      @open="handleOpen"
      background-color="#283643"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- ---------------------------------------店铺信息 -->
      <el-menu-item index="/shop/shop">
        <i class="el-icon-menu"></i>
        <span slot="title">店铺信息</span>
      </el-menu-item>
      <!-- ----------------------------------------商品管理 -->

      <el-submenu index="/goods">
        <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
        <el-menu-item index="/goods/sell"
          ><i class="el-icon-menu"></i>出售中</el-menu-item
        >
        <el-menu-item index="/goods/soldout"
          ><i class="el-icon-menu"></i>已下架</el-menu-item
        >
        <el-menu-item index="/goods/warehouse"
          ><i class="el-icon-menu"></i>仓库中</el-menu-item
        >
      </el-submenu>
      <!-- ----------------------------------------订单管理 -->

      <el-submenu index="/order">
        <template slot="title"><i class="el-icon-menu"></i>订单管理</template>
        <el-menu-item index="/order/allorders"
          ><i class="el-icon-menu"></i>  全部订单</el-menu-item
        >
        <el-menu-item index="/order/willpay"
          ><i class="el-icon-menu"></i>待付款订单</el-menu-item
        >
        <el-menu-item index="/order/willdeliver"
          ><i class="el-icon-menu"></i>待发货订单</el-menu-item
        >
        <el-menu-item index="/order/willreceiv"
          ><i class="el-icon-menu"></i>待收货订单</el-menu-item
        >
        <el-menu-item index="/order/finish"
          ><i class="el-icon-menu"></i>已完成订单</el-menu-item
        >
        <el-menu-item index="/order/closed"
          ><i class="el-icon-menu"></i>已关闭订单</el-menu-item
        >
      </el-submenu>
      <!-- ----------------------------------------用户管理 -->
       <el-menu-item index="/customer/customer">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import routes from '../../router/index.js'
export default {
    data(){
        return{
             isCollapse: true
        }
    },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
h5{
    height: 36px;
    line-height: 36px;
}
.el-submenu .el-menu-item{
    text-align: left;
}
::v-deep .el-menu{
    background-color:#0a0a0a!important ;
}
</style>