<template>
	<div class="login">
		<div class="login_case">
			<h2>登录</h2>
			<el-form :model="userMsg" :rules="userMsgRules" :status-icon="true" ref="userMsg">
				<el-form-item prop="name">
					<el-input v-model="userMsg.name" type="text" maxlength="20" placeholder="手机号/用户名">
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe646;</i>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="userMsg.password" type="password" maxlength="20" placeholder="密码">
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe652;</i>
					</el-input>
				</el-form-item>
				<el-form-item prop="verifyCode">
					<el-input
						type="number"
						v-model="userMsg.verifyCode"
						placeholder="验证码"
						maxlength="20"
						style="width:60%;"
					>
						<i slot="prefix" class="iconfont" style="color:#999999">&#xe636;</i>
					</el-input>
					<span @click="refreshCode" class="verifyCode_case">
						<Identify :identifyCode="identifyCode" :contentWidth="160" class="identify"></Identify>
						<span class="refresh">看不清，点击刷新</span>
					</span>
					<!-- <span style="width:37%;display:inline-block;height:90%;border:1px solid red;">验证码</span> -->
				</el-form-item>
				<el-form-item style="margin-bottom:5px;">
					<el-button type="primary" round style="width:100%;" @click="login('userMsg')">登录</el-button>
				</el-form-item>
				<el-form-item>
					<div class="forget_password">
						<a href="forgetpassword.html">忘记密码</a>
					</div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import Identify from "./components/public/Identify";
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	data() {
		return {
			identifyCodes: "1234567890",
			identifyCode: "",
			userMsg: {
				name: localStorage.getItem("loginName"),
				// name: "",
				password: "",
				verifyCode: ""
			},
			userMsgRules: {
				name: [
					{ required: true, message: "请输入用户名或手机号", trigger: "blur" },
					{ min: 1, max: 20, message: "请输入正确的用户名或手机号" }
				],
				password: [
					{ required: true, message: "密码不能为空", trigger: "blur" },
					{ max: 20, message: "密码错误" }
				],
				verifyCode: [
					{ required: true, message: "验证码不能为空", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value !== this.identifyCode) {
								callback(new Error("验证码输入错误，请重新输入！"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			}
		};
	},
	mounted() {
		this.identifyCode = "";
		this.makeCode(this.identifyCodes, 4);
	},
	methods: {
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		// 切换验证码
		refreshCode() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		// 生成四位随机验证码
		makeCode(o, l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode += this.identifyCodes[
					this.randomNum(0, this.identifyCodes.length)
				];
			}
			console.log(this.identifyCode);
		},
		makeCode(o, l) {
			for (let i = 0; i < l; i++) {
				this.identifyCode += this.identifyCodes[
					this.randomNum(0, this.identifyCodes.length)
				];
			}
			console.log(this.identifyCode);
		},
		decryptByDES(ciphertext, key) {
			let keyHex = CryptoJS.enc.Utf8.parse(key);
			// direct decrypt ciphertext
			let decrypted = CryptoJS.DES.decrypt(
				{
					ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
				},
				keyHex,
				{
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
				}
			);
			return decrypted.toString(CryptoJS.enc.Utf8);
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		login(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let pass = this.userMsg.password;
					pass = md5(pass);
					let key = "*chang_hong_device_cloud";
					let a = pass;
					pass = this.encryptByDES(a, key);
					let qs = require("qs");
					let data = qs.stringify({
						phoneOrName: this.userMsg.name,
						passWord: pass,
						verifyCode: 1015
					});
					this.Axios(
						{
							params: data,
							option: {},
							type: "post",
							url: "/api-platform/employee/login",
							loadingConfig: {
								target: document.querySelector(".login")
							}
						},
						this
					).then(
						result => {
							console.log(result);

							if (result.data.code === 200) {
								sessionStorage.permissionUrl = JSON.stringify(
									result.data.data.permissionUrl
								);
								sessionStorage.token = result.data.data.tokenStr;
								sessionStorage.user = JSON.stringify(result.data.data);
								localStorage.setItem("loginName", this.userMsg.name);
								localStorage.setItem(
									"loginPassword",
									this.encryptByDES(this.userMsg.password, key)
								);
								// window.location.href = "/Cookbook";
								if (result.data.data.employeeType == 0) {
									window.location.href = "/AdminHome";
								}
								if (result.data.data.employeeType == 1) {
									window.location.href = "/Home";
								}
							}
						},
						({ type, info }) => {}
					);
				} else {
					this.$message.error("请输入账号和密码！");
					return false;
				}
			});
		},
		getImgPath() {
			this.Axios(
				{
					params: {
						config: "imgPath"
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/systemconfig/list"
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						sessionStorage.imgPath = result.data.data.imgPath;
					}
				},
				({ type, info }) => {}
			);
		}
	},
	components: {
		Identify
	},
	created() {
		this.getImgPath();
		this.userMsg.password = this.decryptByDES(
			localStorage.getItem("loginPassword"),
			"*chang_hong_device_cloud"
		);
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
		// height: 400px;
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
		.verifyCode_case {
			&:hover {
				.refresh {
					opacity: 1;
				}
			}
		}
		.identify {
			width: 30;
			height: 40px;
			display: inline-block;
			overflow: hidden;
			line-height: 40px;
			position: relative;
			top: 14px;
		}
		.refresh {
			position: absolute;
			top: 14px;
			right: 4px;
			color: white;
			width: 160px;
			height: 40px;
			background-color: rgba(0, 0, 0, 0.363);
			text-align: center;
			opacity: 0;
			transition: all 0.5s;
		}
	}
}
</style>
