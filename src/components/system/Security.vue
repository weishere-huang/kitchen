<template>
	<div class="security">
		<el-col :span="24" class="content_case">
			<el-col :span="24" class="top_title">
				<h4>系统设置</h4>
			</el-col>
			<el-col :span="24">
				<el-form
					label-width="200px"
					size="small"
					style="margin-top:20px;"
					:model="editPassword"
					ref="editPassword"
					:rules="editPasswordRules"
					:inline-message="true"
				>
					<el-form-item label="账号：">
						<span>{{editPassword.account}}</span>
					</el-form-item>
					<el-form-item label="原密码：" prop="oldPassword">
						<el-input
							type="password"
							maxlength="20"
							style="width:350px;"
							v-model="editPassword.oldPassword"
						></el-input>
					</el-form-item>
					<el-form-item label="新密码：" prop="newPassword">
						<el-input
							type="password"
							maxlength="20"
							style="width:350px;"
							v-model="editPassword.newPassword"
						></el-input>
					</el-form-item>
					<el-form-item label="再次输入：" prop="repetitionPassword">
						<el-input
							type="password"
							maxlength="20"
							style="width:350px;"
							v-model="editPassword.repetitionPassword"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="setEditPassword('editPassword')" size="small">确 定</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-col>
	</div>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	data() {
		return {
			editPassword: {
				oldPassword: "",
				newPassword: "",
				account: "",
				repetitionPassword: ""
			},
			editPasswordRules: {
				oldPassword: [
					{ required: true, message: "请输入旧密码", trigger: "blur" }
				],
				newPassword: [
					{ required: true, message: "请输入新密码", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (
								/^((?=.*[a-z])|(?=.*\d)|(?=.*[#@!~%^&*]))[a-z\d#@!$~%^&*]{6,20}$/i.test(
									value
								) === false
							) {
								callback(new Error("请输入6到20位的密码"));
							} else if (/(\w)*(\w)\2{5}(\w)*/g.test(value) === true) {
								callback(new Error("你的密码过于简单，请重新输入"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				repetitionPassword: [
					{ required: true, message: "请再次输入新密码", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value !== this.editPassword.newPassword) {
								callback(new Error("两次输入密码不一致"));
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
	methods: {
		setEditPassword(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.setPasswordApi();
				} else {
					return false;
				}
			});
		},
		setPasswordApi() {
			let newPassword = this.editPassword.newPassword;
			let oldPassword = this.editPassword.oldPassword;
			newPassword = md5(newPassword);
			oldPassword = md5(oldPassword);
			let key = "*chang_hong_device_cloud";
			oldPassword = this.encryptByDES(oldPassword, key);
			newPassword = this.encryptByDES(newPassword, key);
			let qs = require("qs");
			let data = qs.stringify({
				oldPassword: oldPassword,
				newPassword: newPassword,
				account: this.editPassword.account
			});
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-platform/employee/resetpsw"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.dialogFormVisible = false;
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("user");
						sessionStorage.removeItem("permissionUrl");
						sessionStorage.removeItem("imgPath");
						sessionStorage.removeItem("area");
						sessionStorage.removeItem("activeIndex");
						sessionStorage.removeItem("itemMenu");
						sessionStorage.removeItem("orderIds");
						this.$message.success("密码修改成功，即将跳转至登录页面！");
						setTimeout(() => {
							window.location.href = "/login.html";
						}, 3000);
					}
				},
				({ type, info }) => {}
			);
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		}
	},
	created() {
		this.editPassword.account = JSON.parse(
			sessionStorage.getItem("user")
		).account;
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
.security {
	font-size: 14px;
	color: @font-normal;
	.content_case {
		background-color: white;
		// padding: 10px  0;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
		.el-date-editor .el-range-input {
			width: 35%;
		}
		.el-date-editor .el-range-separator {
			width: 15%;
		}
	}
}
</style>
