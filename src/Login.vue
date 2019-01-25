<template>
  <div class="login">
    <div class="login_case">
      <h2>登录</h2>
      <el-form>
        <el-form-item>
          <el-input
            type="text"
            placeholder="手机号/用户名"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe646;</i></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="密码"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe652;</i></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="验证码"
            style="width:60%;"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe636;</i></el-input>
          <span style="width:38%;display:inline-block;height:90%;border:1px solid red;">验证码</span>
        </el-form-item>
        <el-form-item style="margin-bottom:5px;">
          <el-button
            type="primary"
            round
            style="width:100%;"
            @click="login"
          >登录</el-button>
        </el-form-item>
        <el-form-item>
          <div class="forget_password"><a href="forgetpassword.html">忘记密码</a></div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login() {
      window.location.href = "/Home";
    }
  }
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.login {
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 14px;
  //   font-size: 0;
  background: url("../src/assets/image/loginbg.jpg") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  .login_case {
    width: 600px;
    height: 400px;
    background-color: white;
    // margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -300px;
    border-radius: 5px;
    h2 {
      text-align: center;
      line-height: 60px;
      margin-top: 20px;
      letter-spacing: 10px;
    }
    .el-form {
      width: 70%;
      margin: auto;
      .el-input__inner {
        border-left: 0;
        border-right: 0;
        border-top: 0;
        border-bottom: 1px solid #dcdfe6;
        outline: none;
        border-radius: 0;
      }
      .forget_password {
        width: 100%;
        text-align: center;
        color: @font-subsidiary;
        a {
          color: @font-subsidiary;
          text-decoration: none;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: @font-normal;
          }
          &:active {
            color: @font-normal;
          }
        }
      }
    }
  }
}
</style>
