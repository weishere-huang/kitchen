<template>
  <div class="forgetpassword">
    <div class="forgetpassword_case">
      <h2 v-show="isHide">忘记密码</h2>
      <el-form v-show="getUser">
        <el-form-item style="text-align:center;margin-bottom:41px;">
          <span>请输入需要找回密码的手机号或用户名</span>
        </el-form-item>
        <el-form-item style="margin-bottom:50px;">
          <el-input
            type="text"
            placeholder="用户名或手机号"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe646;</i></el-input>
        </el-form-item>
        <el-form-item style="">
          <el-button
            type="primary"
            round
            style="width:100%;"
            @click="togetAuthCode"
          >下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="getAuthCode">
        <el-form-item style="text-align:center;margin-bottom:40px;">
          <span>短信验证码已发送至：<span>131****1234</span></span>
        </el-form-item>
        <el-form-item style="margin-bottom:50px;">
          <el-input
            type="text"
            placeholder="短信验证码"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe636;</i>
            <el-button
              class="auth_code"
              slot="append"
              type="text"
            >获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item style="">
          <el-button
            type="primary"
            round
            style="width:100%;"
            @click="toNewPassword"
          >下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form v-show="newPassword">
        <el-form-item style="text-align:center;margin-bottom:6px;">
          <span>设置新的密码</span>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="输入新密码"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe652;</i></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            placeholder="确认新密码"
          ><i
              slot="prefix"
              class="iconfont"
              style="color:#999999"
            >&#xe652;</i></el-input>
        </el-form-item>
        <el-form-item style="">
          <el-button
            type="primary"
            round
            style="width:100%;"
            @click="setNewPassword"
          >提交</el-button>
        </el-form-item>
      </el-form>
      <div v-show="succeed">
        <div class="succeed_info">
          <i
            class="iconfont"
            style="color:#1cc09f;font-size:80px;"
          >&#xe601;</i>
          <p>
            您的密码已重置成功，请妥善保管
          </p>
        </div>
        <div style="width:70%;text-align:center;margin:auto;margin-top:70px;">
          <el-button
            type="primary"
            round
            style="width:100%;"
            @click="toLogin"
          >立即登录</el-button>
        </div>
      </div>
      <div class="forget_password"><a
          href="login.html"
          v-show="isHide"
        >返回登录</a></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      succeed: false,
      isHide: true,
      getUser: true,
      getAuthCode: false,
      newPassword: false
    };
  },
  methods: {
    togetAuthCode() {
      this.getUser = false;
      this.getAuthCode = true;
    },
    toNewPassword() {
      this.getAuthCode = false;
      this.newPassword = true;
    },
    setNewPassword() {
      this.newPassword = false;
      this.isHide = false;
      this.succeed = true;
    },
    toLogin() {
      window.location.href = "login.html";
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
.forgetpassword {
  color: @font-normal;
  position: relative;
  padding: 0;
  margin: 0;
  font-size: 14px;
  background: url("../src/assets/image/loginbg.jpg") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  .forgetpassword_case {
    width: 600px;
    height: 360px;
    background-color: white;
    // margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -180px;
    margin-left: -300px;
    border-radius: 5px;
    h2 {
      text-align: center;
      line-height: 60px;
      margin-top: 20px;
      letter-spacing: 2px;
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
      .el-input-group__append,
      .el-input-group__prepend {
        background-color: white;
        border: 0;
        border-bottom: 1px solid #dcdfe6;
        color: #1cc09f;
        vertical-align: baseline !important;
      }
      .auth_code {
        border-left: 0;
        border-right: 0;
        border-top: 0;
        border-bottom: 0;
        outline: none;
        margin: 0;
        &:hover {
          color: #3cdfbe;
          text-decoration: underline;
        }
        &:focus {
          color: #3cdfbe;
        }
        &:active {
          color: #3cdfbe;
        }
      }
      .el-input-group {
        line-height: 40px !important;
      }
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
    .succeed_info {
      width: 100%;
      text-align: center;
      margin-top: 70px;
      p {
        margin-top: 20px;
      }
    }
  }
}
</style>
