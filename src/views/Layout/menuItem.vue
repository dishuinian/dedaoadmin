<template>
  <!-- ---------------------------------------店铺信息 -->
        <el-menu-item
          v-if="item.children.length === 1"
          :index="item.path + '/' + item.children[0].path"
        >
          <i :class="item.children[0].meta.icon"></i>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- ----------------------------------------商品管理 -->

        <el-submenu
         v-else
         :index="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span> {{item.meta.title}}</span>
          </template>


          <el-menu-item
          v-for="smallItem in item.children"
          :key="smallItem.path"
           :index="item.path + '/' + smallItem.path">
            <i :class="smallItem.meta.icon"></i>
            <span>{{smallItem.meta.title}}</span>
          </el-menu-item >
         
        </el-submenu>
</template>

<script>
export default {
props:{
    item:Object
}
}
</script>

<style>

</style>