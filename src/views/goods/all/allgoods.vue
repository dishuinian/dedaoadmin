<template>
  <div class="allGoods">
    <!-- 查询商品 -->
    <el-row>
      <el-col :span="8"
        ><div class="grid-content bg-purple">&nbsp;&nbsp;</div></el-col
      >
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div class="searchSellGoods">
            <!-- 按名称查询表单 -->
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="商品名称">
                <el-input
                  v-model="formInline.goodsName"
                  placeholder="请输入商品名称"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="search" @click="searchGoods">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content bg-purple add-goods">
          <el-button
            type="primary"
            plain
            size="small"
            align="right"
            @click="addGoods"
            >添加</el-button
          >
        </div>
      </el-col>
    </el-row>

    <!-- 在售商品列表 -->
    <div class="sellGoodsTable">
      <el-table :data="tableData" style="width: 100%" :empty-text="nodata">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="right" inline class="demo-table-expand">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                    <el-form-item label="商品id">
                      <span>{{ props.row.goods_id }}</span>
                    </el-form-item>
                    <el-form-item label="库存">
                      <span>{{ props.row.goods_store }}</span>
                    </el-form-item>
                    <el-form-item label="商品特性">
                      <span>{{ mapattribute[props.row.goods_attribute] }}</span>
                    </el-form-item>
                    <el-form-item label="商品状态">
                      <span>{{ mapstate[props.row.goods_state] }}</span>
                    </el-form-item>
                  </div>
                </el-col>

                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="商品名称">
                      <span>{{ props.row.goods_name }}</span>
                    </el-form-item>

                    <el-form-item label="销量">
                      <span>{{ props.row.goods_sales }}</span>
                    </el-form-item>
                    <el-form-item label="商品重量">
                      <span>{{ props.row.goods_weight }}</span>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column label="商品 ID" prop="goods_id"> </el-table-column> -->
        <el-table-column
          type="index"
          label="序号"
          :index="indexCount"
          width="50"
        ></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"> </el-table-column>
        <!-- 商品图片 -->
        <el-table-column prop="goods_litimg" label="商品图片">
          <template v-slot="scope">
            <!-- :src="'http://localhost:3000/upload/' + scope.row.goods_litimg" -->
            <img
              :src="'http://localhost:3000/upload/' + scope.row.goods_litimg"
              alt=""
            />
          </template>
        </el-table-column>

        <el-table-column label="价格" prop="goods_price"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="changePage"
        :current-page="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { selectGoods, delGoods, selectGoodsName } from "../../../api/http";
import soldoutVue from "../soldout/soldout.vue";
export default {
  data() {
    return {
      formInline: {
        goodsName: "",
      },
      nodata: "暂无数据",
      page: 1,
      total: 0,
      pageSize: 5,
      tableData: [
        // {
        //   goods_id: "1",
        //   goods_name: "罗辑思维 得到 阅读器Pro 7.8英寸电子墨水屏 安卓10.0系统 手写功能 全新升级  罗辑思维 经典黑 Pro 升级版",
        //   goods_litimg: "https://img12.360buyimg.com/n7/jfs/t1/193686/7/12238/75394/60e67004Ead7caf91/3cf6f719c21b8b9e.jpg",
        //   goods_price: "2199.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // },
        // {
        //   goods_id: "2",
        //   goods_name: "得到阅读器Max保护套 适用于得到阅读器 保护套罗辑思维 灰色",
        //   goods_litimg: "https://img12.360buyimg.com/n7/jfs/t1/124398/37/18021/272054/6141ed8dE168c955b/d0defc3853ee7b9b.jpg",
        //   goods_price: "168.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // },
        // {
        //   goods_id: "3",
        //   goods_name: "得到x乐范 乐班蝶形人体工学靠背2.0升级款 罗辑思维",
        //   goods_litimg: "https://img14.360buyimg.com/n7/jfs/t1/195580/3/8396/172598/60c8ba7aEb9a543c1/452c2d8f5418d79b.jpg",
        //   goods_price: "269.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // },
        // {
        //   goods_id: "4",
        //   goods_name: "罗辑思维 得到 阅读器Mini",
        //   goods_litimg: "https://img14.360buyimg.com/n7/jfs/t1/201911/24/11884/89492/616ed3c0E36f7f85f/db92b64d91d95061.jpg",
        //   goods_price: "648.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // },
        // {
        //   goods_id: "5",
        //   goods_name: "得到定制 Link up沟通笔记本 职场沟通 一本够用 罗辑思维",
        //   goods_litimg: "https://img12.360buyimg.com/n7/jfs/t1/178432/37/9247/76069/60c8b716Ee60eab21/38929cdb95d66cc1.jpg",
        //   goods_price: "69.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // },
        // {
        //   goods_id: "6",
        //   goods_name: "得到历2022 日历一日一金句：你的私人知识库 橙色支架版",
        //   goods_litimg: "https://img13.360buyimg.com/n7/jfs/t1/219140/18/2418/83053/617c0565Eb93af28d/c7e4261dc6861c3a.jpg",
        //   goods_price: "108.00",
        //   goods_store: "21",
        //   goods_sales: "223",
        //   // 1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣
        //   goods_attribute: "1",
        //   goods_weight: "103",
        //   // 商品状态 0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架
        //   goods_state: "3",
        // }
      ],
      mapattribute: {
        1: "新品",
        2: "热卖",
        3: "推荐",
        4: "包邮",
        5: "限时卖",
        6: "不参与折扣",
      },
      mapstate: {
        0: "未通过",
        1: "审核中",
        2: "已审核",
        3: "上架",
        4: "下架",
      },
    };
  },
  created() {
    if (this.$route.params.page) {
      this.page = this.$route.params.page;
    }
    this.getData(this.page);
  },
  methods: {
    searchGoods() {
      var goodsName = this.formInline.goodsName;
      selectGoodsName({ goodsName })
        .then((res) => {
          let { code, list, total } = res.data;
          if (code === 0) {
            // console.log("获取数据成功");
            this.tableData = list;
            this.total = total;
          }
          if (code === 1) {
            console.log("获取数据失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    indexCount(index) {
      return (this.page - 1) * this.pageSize + index + 1;
    },
    handleEdit(row) {
      this.$router.push({
        name: "add",
        params: {
          row,
          action: "edit",
          page: this.page,
        },
      });
      console.log(row);
    },
    handleDelete(goods_id) {
      this.$confirm("确定删除该商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log("AAA:"+row.goods_id);
          // console.log("goods_id:" + goods_id);
          delGoods({ goods_id })
            .then((res) => {
              // console.log(res);
              let { code } = res.data;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
              this.getData();
            })
            .catch((err) => {
              // console.log(err);
              console.log("异常：" + err);
            });

          // this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getData() {
      // selectGoods({ page: this.page })
      selectGoods({ page: this.page })
        .then((res) => {
          // console.log(res);
          let { code, list, total } = res.data;
          if (code === 0) {
            // console.log("获取数据成功");
            this.tableData = list;
            this.total = total;
          }
          if (code === 1) {
            console.log("获取数据失败");
          }
        })
        .catch((err) => {
          // console.log(err);
          console.log("访问异常");
        });
    },

    // async getData() {
    //   try {
    //     let res = await selectGoods({ page: this.page });
    //     // let res = await selectGoods();
    //     let { code, list, total } = res.data;
    //     if (code === 0) {
    //       this.tableData = list;
    //       this.total = total;
    //     }
    //   } catch (err) {
    //     console.log("访问异常");
    //     // console.log('err',err);
    //   }
    // },
    goods_attributeFormat(goods_attribute) {
      if (goods_attribute === 1) return "新品";
      if (goods_attribute === 2) return "热卖";
      if (goods_attribute === 3) return "推荐";
      if (goods_attribute === 4) return "包邮";
      if (goods_attribute === 5) return "限时卖";
      if (goods_attribute === 6) return "不参与折扣";
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    addGoods() {
      this.$router.push("add");
    },
  },
};
</script>

<style lang='scss' scoped>
::v-deep .el-table td.el-table__cell div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
::v-deep .el-form-item__content {
  line-height: 24px;
  position: relative;

  font-size: 12px;
}
.el-col-12 .grid-content .el-form-item {
  width: 80%;
}
.demo-table-expand {
  font-size: 0;
  background-color: aliceblue;
  padding: 30px;
}
::v-deep .el-form--inline .el-form-item__label {
  float: none;
  display: inline-block;
  font-size: 20px;
  color: #283643;
}
.allGoods {
  line-height: 40px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.cell img {
  width: 80px;
  height: 80px;
}
.add-goods {
  text-align: right;
  margin-right: 20px;
}
.search{
  background-color: #ff6b01;
  // border-color: #a95011;
  border-color: #e9eef3;
}
</style>