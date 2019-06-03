<template>
	<div class="register">
		<div style="height:100%;overflow:scroll;">
			<div class="register_case">
				<h2>注册</h2>
				<div class="step_case">
					<el-steps :simple="true" :active="active" finish-status="success">
						<el-step title="选择类型"></el-step>
						<el-step title="填写资料"></el-step>
						<el-step title="完成"></el-step>
					</el-steps>
					<div style="padding-bottom:40px;" v-show="firstCase">
						<el-radio-group
							v-model="registerMsg.type"
							style="width:100%;margin-top:40px;padding-bottom:40px;"
						>
							<el-radio :border="true" label="1">
								<div class="radio_case">
									<p>设备厂商</p>
									<p>主要用于智能设备接入及管理</p>
								</div>
							</el-radio>
							<el-radio :border="true" label="2" style="margin-top:20px;">
								<div class="radio_case">
									<p>商家</p>
									<p>主要用于管理商品、订单等信息</p>
								</div>
							</el-radio>
						</el-radio-group>
						<div style="text-align:center;">
							<el-button style="width:120px;" plain @click="toLogin">返回</el-button>
							<el-button
								type="primary"
								style="width:120px;"
								@click="toNext(1)"
								:disabled="registerMsg.type==''||registerMsg.type==null"
							>下一步</el-button>
						</div>
					</div>
					<div class="register_msg" v-show="secondCase">
						<el-form
							size="small"
							label-width="160px"
							style="margin-top:40px;padding-bottom:40px;"
							:model="registerMsg"
							ref="registerMsg"
							:rules="registerMsgRules"
						>
							<el-form-item label="企业名称" prop="name">
								<el-input v-model="registerMsg.name" placeholder="必须与营业执照名称保持一致" type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="统一社会信用代码" prop="creditCode">
								<el-input
									v-model="registerMsg.creditCode"
									placeholder="填写18位统一社会信用代码"
									type="text"
									maxlength="18"
								></el-input>
							</el-form-item>
							<el-form-item label="法人" prop="legalPerson">
								<el-input
									v-model="registerMsg.legalPerson"
									placeholder="填写营业执照法定代表人姓名"
									type="text"
									maxlength="20"
								></el-input>
							</el-form-item>
							<el-form-item label="注册地址" prop="address">
								<el-input v-model="registerMsg.address" placeholder="填写营业执照住所地址" type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="营业范围" prop="businessScope">
								<el-input
									v-model="registerMsg.businessScope"
									type="textarea"
									rows="4"
									resize="none"
									maxlength="300"
									placeholder="填写营业执经营范围"
								></el-input>
							</el-form-item>
							<el-form-item label="申请人姓名" prop="applicant">
								<el-input v-model="registerMsg.applicant" placeholder="填写申请人姓名" type="text" maxlength="20"></el-input>
							</el-form-item>
							<el-form-item label="申请人手机号" prop="phone">
								<el-input
									v-model.number="registerMsg.phone"
									placeholder="填写申请人11位手机号（用于登录和接收通知类短信）"
									type="number"
									oninput="if(value.length>11)value=value.slice(0,11)"
									maxlength="11"
								></el-input>
							</el-form-item>
							<el-form-item label="初始密码" prop="password">
								<el-input
									v-model="registerMsg.password"
									placeholder="6~20位字母、数字组成，区分大小写"
									type="password"
									maxlength="20"
								></el-input>
							</el-form-item>
							<el-form-item label="营业执照" prop="businessLicenseImg">
								<el-upload
									:action="imgApi()"
									list-type="picture-card"
									:on-preview="(file)=>{ return handlePictureCardPreview1(file,1)}"
									:on-remove="(res,file)=>{ return handleRemove1(res,file,1)}"
									:on-success="(res,file)=>{ return handleAvatarSuccess1(res,file,1)}"
									:before-upload="beforeAvatarUpload1"
									:limit="1"
									class="upload_show"
									accept="image/png, image/jpeg"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
								<div class="el-upload__tip tip_style">上传三证合一营业执照副本扫描件，小于2MB的jpg或png图片</div>
								<el-dialog :visible.sync="dialogVisible" class="showPic">
									<img width="100%" :src="dialogImageUrl" alt>
								</el-dialog>
							</el-form-item>
							<el-form-item label="法人身份证" prop="applicantIDCard">
								<el-upload
									:action="imgApi()"
									list-type="picture-card"
									:on-preview="(file)=>{ return handlePictureCardPreview1(file,2)}"
									:on-remove="(res,file)=>{ return handleRemove1(res,file,2)}"
									:on-success="(res,file)=>{ return handleAvatarSuccess1(res,file,2)}"
									:before-upload="beforeAvatarUpload1"
									:limit="1"
									class="upload_show"
									accept="image/png, image/jpeg"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-upload
									:action="imgApi()"
									list-type="picture-card"
									:on-preview="(file)=>{ return handlePictureCardPreview1(file,3)}"
									:on-remove="(res,file)=>{ return handleRemove1(res,file,3)}"
									:on-success="(res,file)=>{ return handleAvatarSuccess1(res,file,3)}"
									:before-upload="beforeAvatarUpload1"
									:limit="1"
									class="upload_show"
									accept="image/png, image/jpeg"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
								<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
							</el-form-item>
							<el-form-item label="申请人身份证" prop="legalPersonIdCard">
								<el-upload
									:action="imgApi()"
									list-type="picture-card"
									:on-preview="(file)=>{ return handlePictureCardPreview1(file,4)}"
									:on-remove="(res,file)=>{ return handleRemove1(res,file,4)}"
									:on-success="(res,file)=>{ return handleAvatarSuccess1(res,file,4)}"
									:before-upload="beforeAvatarUpload1"
									:limit="1"
									class="upload_show"
									accept="image/png, image/jpeg"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
								<el-upload
									:action="imgApi()"
									list-type="picture-card"
									:on-preview="(file)=>{ return handlePictureCardPreview1(file,5)}"
									:on-remove="(res,file)=>{ return handleRemove1(res,file,5)}"
									:on-success="(res,file)=>{ return handleAvatarSuccess1(res,file,5)}"
									:before-upload="beforeAvatarUpload1"
									:limit="1"
									class="upload_show"
									accept="image/png, image/jpeg"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
								<div class="el-upload__tip tip_style">上传申请人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
							</el-form-item>
							<el-form-item label prop>
								<el-button style="width:120px;" @click="toBack" plain>返回</el-button>
								<el-button type="primary" style="width:120px;" @click="toNext(2,'registerMsg')">下一步</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div v-show="thirdCase">
						<div style="margin-top:40px;text-align:center;font-size:14px;">
							<i class="iconfont" style="color:#1cc09f;font-size:80px;">&#xe601;</i>
							<br>
							<br>
							<p>恭喜您，申请资料已成功上传！</p>
							<br>
							<p>审核结果，我们将以短信的方式通知您。</p>
						</div>
						<div style="text-align:center;padding:40px 0 60px;">
							<el-button type="primary" style="width:120px;" @click="toNext(3)">完成</el-button>
						</div>
					</div>
				</div>
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
			firstCase: true,
			secondCase: false,
			thirdCase: false,
			active: 0,
			radio: "",
			dialogImageUrl: "",
			dialogVisible: false,
			registerMsg: {
				name: "",
				type: "",
				creditCode: "",
				legalPerson: "",
				address: "",
				businessScope: "",
				applicant: "",
				phone: "",
				businessLicenseImg: "",
				applicantIDCard: "",
				legalPersonIdCard: "",
				password: "",
				applicantIDCardNegative: "",
				legalPersonIdCardNegative: ""
			},
			registerMsgRules: {
				name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
				creditCode: [
					{
						required: true,
						message: "请输入统一社会信用代码",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (
								/^[1-9A-GY]{1}[1239]{1}[\d]{6}[\dA-Z]{10}$/.test(value) == false
							) {
								callback(new Error("您输入的统一社会信用代码有误，请重新输入"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				legalPerson: [
					{ required: true, message: "请输入法人", trigger: "blur" }
				],
				phone: [
					{ required: true, message: "请输入申请人手机号", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^[1][0-9]{10}$/.test(value) == false) {
								callback(new Error("您输入的手机号有误，请重新输入"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				address: [
					{ required: true, message: "请输入注册地址", trigger: "blur" }
				],
				businessScope: [
					{ required: true, message: "请输入营业范围", trigger: "blur" }
				],
				applicant: [
					{ required: true, message: "请输入申请人姓名", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请输入初始密码", trigger: "blur" },
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
				businessLicenseImg: [
					{ required: true, message: "请上传营业执照", trigger: "blur" }
				],
				applicantIDCard: [
					{ required: true, message: "请上传法人身份证", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (this.registerMsg.applicantIDCardNegative == "") {
								callback(new Error("请上传完整法人身份证"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				legalPersonIdCard: [
					{ required: true, message: "请上传申请人身份证", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (this.registerMsg.legalPersonIdCardNegative == "") {
								callback(new Error("请上传完整申请人身份证"));
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
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		register() {
			let pass = this.registerMsg.password;
			pass = md5(pass);
			let key = "*chang_hong_device_cloud";
			let a = pass;
			pass = this.encryptByDES(a, key);
			let qs = require("qs");
			let data = qs.stringify({
				name: this.registerMsg.name,
				password: pass,
				type: this.registerMsg.type,
				creditCode: this.registerMsg.creditCode,
				legalPerson: this.registerMsg.legalPerson,
				address: this.registerMsg.address,
				businessScope: this.registerMsg.businessScope,
				applicant: this.registerMsg.applicant,
				phone: this.registerMsg.phone,
				businessLicenseImg: this.registerMsg.businessLicenseImg,
				applicantIDCard: this.registerMsg.applicantIDCard,
				legalPersonIdCard: this.registerMsg.legalPersonIdCard,
				applicantIDCardNegative: this.registerMsg.applicantIDCardNegative,
				legalPersonIdCardNegative: this.registerMsg.legalPersonIdCardNegative
			});
			this.Axios(
				{
					params: data,
					option: {
						// enableMsg: false
						successMsg: "注册成功！"
					},
					type: "post",
					url: "/api-enterprise/enterprise/addEnterprise",
					loadingConfig: {
						target: document.querySelector(".register")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.active = 3;
						this.secondCase = false;
						this.thirdCase = true;
						document.getElementsByClassName(
							"register_case"
						)[0].style.marginTop = "-300px";
					}
				},
				({ type, info }) => {}
			);
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList, a) {
			// this.cookbook.recipeImg = null;
			if (a == 1) {
				this.registerMsg.businessLicenseImg = "";
			}
			if (a == 2) {
				this.registerMsg.applicantIDCard = "";
			}
			if (a == 3) {
				this.registerMsg.applicantIDCardNegative = "";
			}
			if (a == 4) {
				this.registerMsg.legalPersonIdCard = "";
			}
			if (a == 5) {
				this.registerMsg.legalPersonIdCardNegative = "";
			}
			console.log("handleRemove1:" + a);
		},
		handlePictureCardPreview1(file, a) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
			console.log("handlePictureCardPreview1:" + a);
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 / 1024 <= 1;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于1M");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 600000;
					let height = 600000;
					let _URL = window.URL || window.webkitURL;
					let img = new Image();
					img.onload = function() {
						let valid = img.width <= width && img.height <= height;
						valid ? resolve() : reject();
					};
					img.src = _URL.createObjectURL(file);
				}).then(
					() => {
						return file;
					},
					() => {
						this.$message.error("上传的图片必须是等于或小于600*600!");
						return Promise.reject();
					}
				);
				return isSize;
			}
		},
		handleAvatarSuccess1(res, file, a) {
			if (res.code === 200) {
				// this.cookbook.recipeImg = res.data;
				if (a == 1) {
					this.registerMsg.businessLicenseImg = res.data;
				}
				if (a == 2) {
					this.registerMsg.applicantIDCard = res.data;
				}
				if (a == 3) {
					this.registerMsg.applicantIDCardNegative = res.data;
				}
				if (a == 4) {
					this.registerMsg.legalPersonIdCard = res.data;
				}
				if (a == 5) {
					this.registerMsg.legalPersonIdCardNegative = res.data;
				}
				this.$message({
					message: "图片上传成功！",
					type: "success"
				});
			} else {
				this.$message({
					message: "图片上传不成功！",
					type: "error"
				});
			}
		},
		toLogin() {
			window.location.href = "/login.html";
		},
		toNext(a, formName) {
			if (a == 1) {
				this.firstCase = false;
				this.secondCase = true;
				this.active = 1;
				document.getElementsByClassName("register_case")[0].style.marginTop =
					"-400px";
			}
			if (a == 2) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.register();
					} else {
						return false;
					}
				});
			}
			if (a == 3) {
				window.location.href = "/login.html";
			}
		},
		toBack() {
			this.firstCase = true;
			this.secondCase = false;
			this.active = 0;
			document.getElementsByClassName("register_case")[0].style.marginTop =
				"-300px";
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
.register {
	position: relative;
	padding: 0;
	margin: 0;
	font-size: 14px;
	//   font-size: 0;
	background: url("../src/assets/image/loginbg.jpg") no-repeat;
	background-size: cover;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.register_case {
		margin-bottom: 80px;
		width: 800px;
		// height: 400px;
		background-color: white;
		// margin: auto;
		position: relative;
		top: 50%;
		left: 50%;
		margin-top: -300px;
		margin-left: -400px;
		border-radius: 5px;
		overflow: hidden;
		h2 {
			text-align: center;
			line-height: 60px;
			margin-top: 20px;
			letter-spacing: 10px;
		}
		.step_case {
			width: 80%;
			margin: auto;
			.radio_case {
				p:nth-child(1) {
					font-size: 20px;
					padding-bottom: 8px;
				}
				p:nth-child(2) {
					color: #999999;
				}
			}
		}
	}
	.el-radio__label {
		font-size: 14px;
		padding-left: 10px;
		display: inline-block;
		vertical-align: middle;
	}
	.el-radio.is-bordered {
		height: 100px;
		width: 100%;
	}
	.el-radio.is-bordered + .el-radio.is-bordered {
		margin-left: 0;
	}
	.el-radio.is-bordered.is-checked {
		border-color: #1cc09f;
	}
	.el-radio.is-bordered {
		padding-top: 30px;
		padding-left: 50px;
	}
	.el-radio__inner {
		width: 20px;
		height: 20px;
	}
	// .el-step__title.is-process {
	// 	color: #1cc09f;
	// }
	// .el-step__icon.is-text {
	// 	// border-color: #1cc09f;
	// }
	.el-step__head.is-success {
		color: #1cc09f;
		border-color: #1cc09f;
	}
	.el-step__title.is-success {
		color: #1cc09f;
	}
}
</style>