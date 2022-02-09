<template>
  <div class="login">
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-loginForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/http";

export default {
  data() {
    const checkusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    const checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (!/^\d{3,5}$/i.test(value)) {
        callback(new Error("请输入3-5位字符串密码"));
      }
      callback();
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "此项必填",
            validator: checkusername,
            trigger: "blur",
          },
          { min: 2, max: "5", message: "必须是2-5个字符", trigger: "blur" },
        ],
        password: [{ validator: checkpassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          console.log(this.loginForm);
          login(this.loginForm)
            .then((res) => {
              console.log(res);
              let { code ,token} = res.data;

              if (code === 0) {
                // 登陆成功
                sessionStorage.setItem("token",token)
                this.$message({
                  message: "登陆成功",
                  type: "success",
                  duration: 800,
                });
                this.$router.push('/')
              }
              if (code === 1) {
                // 登陆失败
                this.$message({
                  message: "登陆失败",
                  type: "warning",
                  duration: 800,
                });
                this.loginForm = {
                  username: "",
                  password: "",
                };
              }
            })
            .catch((err) => {
              console.log("err");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
