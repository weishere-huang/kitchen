<template>
	<div class="forgetpassword">
		<div class="forgetpassword_case">
			<h2 v-show="isHide">忘记密码</h2>
			<el-form v-show="getUser">
				<el-form-item style="text-align:center;margin-bottom:41px;">
					<span>请输入需要找回密码的手机号或用户名</span>
				</el-form-item>
				<el-form-item style="margin-bottom:50px;">
					<el-input type="text" maxlength="20" placeholder="用户名或手机号" v-model="phoneOraccount">
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe646;</i>
					</el-input>
				</el-form-item>
				<el-form-item style>
					<el-button
						type="primary"
						round
						style="width:100%;"
						@click="togetAuthCode"
						:disabled="phoneOraccount!=''?false:true"
					>下一步</el-button>
				</el-form-item>
			</el-form>
			<el-form v-show="getAuthCode">
				<el-form-item style="text-align:center;margin-bottom:40px;">
					<span>
						短信验证码已发送至：
						<span>{{phone}}</span>
					</span>
				</el-form-item>
				<el-form-item style="margin-bottom:50px;">
					<el-input type="text" maxlength="20" placeholder="短信验证码" v-model="code">
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe636;</i>
						<el-button
							class="auth_code"
							v-if="!sendMsgDisabled"
							slot="append"
							type="text"
							@click="togetAuthCode"
						>获取验证码</el-button>
						<el-button
							class="auth_code"
							v-if="sendMsgDisabled"
							:disabled="true"
							slot="append"
							type="text"
							@click="togetAuthCode"
						>{{time+'秒后重新获取'}}</el-button>
					</el-input>
				</el-form-item>
				<el-form-item style>
					<el-button
						type="primary"
						round
						style="width:100%;"
						@click="toNewPassword"
						:disabled="code!=''?false:true"
					>下一步</el-button>
				</el-form-item>
			</el-form>
			<el-form v-show="newPasswordShow" :model="newPasswordMsg" ref="newPasswordMsg">
				<el-form-item style="text-align:center;margin-bottom:6px;">
					<span>设置新的密码</span>
				</el-form-item>
				<el-form-item
					prop="newPassword"
					:rules="[{ required: true, message: '密码不能为空', trigger: 'blur'},{validator:validator1,trigger:'blur'}]"
				>
					<el-input
						type="password"
						maxlength="20"
						placeholder="输入新密码"
						v-model="newPasswordMsg.newPassword"
					>
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe652;</i>
					</el-input>
				</el-form-item>
				<el-form-item
					prop="repetitionPassword"
					:rules="[{ required: true, message: '确认密码不能为空', trigger: 'blur'},{validator:validator,trigger:'blur'}]"
				>
					<el-input
						type="password"
						maxlength="20"
						placeholder="确认新密码"
						v-model="newPasswordMsg.repetitionPassword"
					>
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe652;</i>
					</el-input>
				</el-form-item>
				<el-form-item style>
					<el-button
						type="primary"
						round
						style="width:100%;"
						@click="setNewPassword('newPasswordMsg')"
					>提交</el-button>
				</el-form-item>
			</el-form>
			<div v-show="succeed">
				<div class="succeed_info">
					<i class="iconfont" style="color:#1cc09f;font-size:80px;">&#xe601;</i>
					<p>您的密码已重置成功，请妥善保管</p>
				</div>
				<div style="width:70%;text-align:center;margin:auto;margin-top:70px;">
					<el-button type="primary" round style="width:100%;" @click="toLogin">立即登录</el-button>
				</div>
			</div>
			<div class="forget_password">
				<a href="login.html" v-show="isHide">返回登录</a>
			</div>
		</div>
	</div>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	data() {
		return {
			sendMsgDisabled: false,
			succeed: false,
			isHide: true,
			getUser: true,
			getAuthCode: false,
			newPasswordShow: false,
			phoneOraccount: "",
			phone: "",
			userPhone: "",
			code: "123123",
			newPasswordMsg: {
				newPassword: "",
				repetitionPassword: ""
			},
			time: 60
		};
	},
	methods: {
		validator(rule, value, callback) {
			if (
				this.newPasswordMsg.newPassword !==
				this.newPasswordMsg.repetitionPassword
			) {
				callback(new Error("两次输入的密码不一致"));
			} else {
				callback();
			}
		},
		validator1(rule, value, callback) {
			if (
				/^((?=.*[a-z])|(?=.*\d)|(?=.*[#@!~%^&*]))[a-z\d#@!$~%^&*]{6,20}$/i.test(
					value
				) === false
			) {
				callback(new Error("请输入6到20位的密码"));
			} else if (/(\w)*(\w)\2{5}(\w)*/g.test(value) === true) {
				callback(new Error("不能是6位全部一样"));
			} else {
				callback();
			}
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		togetAuthCode() {
			this.Axios(
				{
					params: {
						phoneOraccount: this.phoneOraccount
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/employee/forgetVerifyCode",
					loadingConfig: {
						target: document.querySelector(".forgetpassword")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$message.success("验证码已发送至绑定手机，请注意查收！");
						this.userPhone = result.data.data;
						this.phone =
							result.data.data.substr(0, 3) +
							"****" +
							result.data.data.substr(7);
						this.getUser = false;
						this.getAuthCode = true;
						let me = this;
						me.sendMsgDisabled = true;
						let interval = window.setInterval(function() {
							if (me.time-- <= 0) {
								me.time = 60;
								me.sendMsgDisabled = false;
								window.clearInterval(interval);
							}
						}, 1000);
					}
				},
				({ type, info }) => {
					// this.$message.error("账户或手机号不存在，请重新填写");
				}
			);
		},
		toNewPassword() {
			this.Axios(
				{
					params: {
						phone: this.userPhone,
						code: this.code
					},
					option: { enableMsg: false },
					type: "get",
					url: "/api-platform/employee/validate",
					loadingConfig: {
						target: document.querySelector(".forgetpassword")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$message.success("验证成功，请填写您的新密码！");
						this.getAuthCode = false;
						this.newPasswordShow = true;
					}
				},
				({ type, info }) => {}
			);
		},
		setNewPassword(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (
						this.newPasswordMsg.newPassword !==
						this.newPasswordMsg.repetitionPassword
					) {
						this.$message.error("两次输入的密码不相同");
					} else if (this.newPasswordMsg.newPassword == "") {
						this.$message.error("密码不能为空");
					} else {
						let pass = this.newPasswordMsg.newPassword;
						pass = md5(pass);
						let key = "*chang_hong_device_cloud";
						let a = pass;
						pass = this.encryptByDES(a, key);
						let qs = require("qs");
						let data = qs.stringify({
							phone: this.userPhone,
							newPassword: pass
						});
						this.Axios(
							{
								params: data,
								option: {
									enableMsg: false
								},
								type: "post",
								url: "/api-platform/employee/forgetPwd",
								loadingConfig: {
									target: document.querySelector(".forgetpassword")
								}
							},
							this
						).then(
							result => {
								if (result.data.code === 200) {
									this.newPasswordShow = false;
									this.isHide = false;
									this.succeed = true;
								}
							},
							({ type, info }) => {}
						);
					}
				} else {
					return false;
				}
			});
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
