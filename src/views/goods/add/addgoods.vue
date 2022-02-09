<template>
  <div class="addgoods">
    <el-card class="box-card">
      <div slot="header" class="clearfix cardheader">
        <span>{{ action === "edit" ? "编辑" : "添加" }}商品</span>
      </div>
      <!-- 
        商品名称，图片，价格，库存，销量，
        商品特性(1：新品  2：热卖  3：推荐   4：包邮   5：限时卖   6：不参与折扣)
        商品重量，
        商品状态 (0： 未通过   1： 审核中   2： 已审核  3：上架  4：下架)
    -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <!-- 左栏 -->
          <el-col :span="11">
            <div class="grid-content bg-purple">
              <!-- 商品名称 -->
              <el-form-item label="商品名称">
                <el-input v-model="form.goods_name"></el-input>
              </el-form-item>

              <!-- 商品图片 -->
              <el-form-item label="商品图片" prop="goods_litimg">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :headers="headers"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <!-- 商品状态 -->
              <el-form-item label="商品状态">
                <el-radio-group v-model="form.goods_state">
                  <el-radio label="0">未通过</el-radio>
                  <el-radio label="1">审核中</el-radio>
                  <el-radio label="2">已审核</el-radio>
                  <el-radio label="3">上架 </el-radio>
                  <el-radio label="4">下架 </el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </el-col>
          <!-- 右栏 -->
          <el-col :span="11" :offset="1">
            <div class="grid-content bg-purple-light">
              <!-- 商品价格 -->
              <el-form-item label="商品价格">
                <el-input v-model="form.goods_price"></el-input>
              </el-form-item>
              <!-- 商品销量 -->
              <el-form-item label="商品销量">
                <el-input v-model="form.goods_sales"></el-input>
              </el-form-item>
              <!-- 商品库存 -->
              <el-form-item label="商品库存">
                <el-input v-model="form.goods_store"></el-input>
              </el-form-item>
              <!-- 商品重量 -->
              <el-form-item class="inputLeft" label="商品重量">
                <el-input v-model="form.goods_weight"></el-input>g
              </el-form-item>
              <!-- 商品特性 -->
              <el-form-item class="attribute" label="商品特性">
                <el-select
                  v-model="form.goods_attribute"
                  placeholder="请选择商品特性"
                >
                  <el-option label="新品      " value="1"></el-option>
                  <el-option label="热卖      " value="2"></el-option>
                  <el-option label="推荐      " value="3"></el-option>
                  <el-option label="包邮      " value="4"></el-option>
                  <el-option label="限时卖    " value="5"></el-option>
                  <el-option label="不参与折扣" value="6"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-form-item class="subbutton">
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addGoods, editGoods } from "../../../api/http";
export default {
  data() {
    return {
      form: {
        goods_id: "",
        goods_name: "",
        goods_litimg: "",
        goods_price: "",
        goods_store: 0,
        goods_sales: 0,
        goods_attribute: "1",
        goods_weight: "",
        goods_state: "0",
      },
      imageUrl: "",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      action: "",
    };
  },
  created() {
    let { row, action } = this.$route.params;
    // console.log(this.$route.params.row);
    if (action === "edit") {
      this.action = action;
      this.form = row;
      this.form.goods_attribute = row.goods_attribute.toString();
      this.form.goods_state = row.goods_state.toString();
      this.imageUrl = "http://localhost:3000/upload/" + row.goods_litimg;
      this.form.goods_litimg = row.goods_litimg;
    //   console.log(this.form.goods_litimg);
    }
  },
  methods: {
    // 处理图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.goods_litimg = res.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传商品图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传商品图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 添加商品
    handleAdd() {
      addGoods(this.form)
        .then((res) => {
          //   console.log(res);
          let { code } = res.data;
          if (code === 0) {
            this.$message({
              message: "添加商品成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          this.$message.error("添加商品失败");
        });
    },
    // 修改商品
    handleEdit() {
        
      editGoods(this.form)
        .then((res) => {
          //   console.log(res);
          let { code } = res.data;
          if (code === 0) {
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            this.$router.push({
              name: "all",
              params: {
                page: this.$route.params.page,
              },
            });
          }
        })
        .catch((err) => {
          this.$message.error("编辑失败");
        });
    },
    // 提交表单
    submitForm(formName) {
      //   let { row, action } = this.$route.params;
      //   console.log(row);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.action === "edit" ? this.handleEdit() : this.handleAdd();
        } else {
          console.log("提交错误");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.imageUrl = "";
      this.$refs["formName"].resetFilds();
    },
  },
};
</script>

<style>
.inputLeft {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.inputLeft > .el-form-item__content {
  margin-left: 0 !important;
  text-align: left;
  display: inline-block;
  width: 300px;
}
.inputLeft .el-input {
  margin-right: 12px;
  width: 80%;
}
.attribute .el-form-item__content {
  text-align: left;
}
.cardheader {
  height: 30px;
  line-height: 30px;
  font-weight: 600;
  text-align: left;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.subbutton {
  text-align: left;
}
.subbutton .el-form-item__content {
  margin-left: 10px !important;
}
</style>