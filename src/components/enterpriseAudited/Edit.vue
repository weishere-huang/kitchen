<template>
	<div class="enterprise_edit">
		<div class="bottom_list_edit">
			<div class="top_title">
				<h4>入驻申请</h4>
			</div>
			<div class="table_list">
				<el-form
					size="small"
					label-width="200px"
					style="margin-top:40px;padding-bottom:40px;"
					:model="registerMsg"
					ref="registerMsg"
					:rules="registerMsgRules"
				>
					<el-form-item label="企业名称：" prop="name">
						<el-input v-model="registerMsg.name" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="统一社会信用代码：" prop="creditCode">
						<el-input v-model="registerMsg.creditCode" type="text" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="法人：" prop="legalPerson">
						<el-input v-model="registerMsg.legalPerson" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="注册地址：" prop="address">
						<el-input v-model="registerMsg.address" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="经营范围：" prop="businessScope">
						<el-input
							v-model="registerMsg.businessScope"
							type="textarea"
							rows="4"
							resize="none"
							maxlength="300"
						></el-input>
					</el-form-item>
					<el-form-item label="申请人姓名：" prop="applicant">
						<el-input v-model="registerMsg.applicant" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="申请人手机号：">
						<span>{{registerMsg.phone}}</span>
					</el-form-item>
					<el-form-item label="营业执照：" prop="businessLicenseImg">
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
							:file-list="fileList1"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">上传三证合一营业执照副本扫描件，小于2MB的jpg或png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="法人身份证：" prop="applicantIDCard">
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
							:file-list="fileList2"
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
							:file-list="fileList3"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
					</el-form-item>
					<el-form-item label="申请人身份证：" prop="legalPersonIdCard">
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
							:file-list="fileList4"
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
							:file-list="fileList5"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
					</el-form-item>
					<el-form-item label prop>
						<el-button style="width:160px;" @click="toSave('registerMsg')" type="primary">保存并提交审核</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			registerMsg: {},
			dialogVisible: false,
			dialogImageUrl: "",
			fileList1: [],
			fileList2: [],
			fileList3: [],
			fileList4: [],
			fileList5: [],
			registerMsgRules: {
				name: [
					{ required: true, message: "请输入企业名称", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							this.Axios({
								params: {
									enterpriseName: value,
									enterpriseId: JSON.parse(sessionStorage.getItem("user"))
										.salesTerritoryId
								},
								url: "/api-enterprise/enterprise/verifyEnterpriseName",
								type: "get",
								option: { enableMsg: false, enableLoad: false }
							}).then(
								res => {
									callback();
								},
								({ type, info }) => {
									callback(new Error("企业名称已存在"));
								}
							);
						},
						trigger: "blur"
					}
				],
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
					},
					{
						validator: (rule, value, callback) => {
							this.Axios({
								params: {
									creditCode: value,
									enterpriseId: JSON.parse(sessionStorage.getItem("user"))
										.salesTerritoryId
								},
								url: "/api-enterprise/enterprise/verifyCreditCode",
								type: "get",
								option: { enableMsg: false, enableLoad: false }
							}).then(
								res => {
									callback();
								},
								({ type, info }) => {
									callback(new Error("该信用代码已存在"));
								}
							);
						},
						trigger: "blur"
					}
				],
				legalPerson: [
					{ required: true, message: "请输入法人", trigger: "blur" }
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
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList, a) {
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
		},
		handlePictureCardPreview1(file, a) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
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
				// this.registerMsg.recipeImg = res.data;
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
		findOne(id) {
			this.Axios(
				{
					params: { enterpriseId: id },
					url: "/api-enterprise/enterprise/findOne",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.registerMsg = result.data.data;
					this.fileList1 = [
						{
							name: this.registerMsg.businessLicenseImg.substring(
								this.registerMsg.businessLicenseImg.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.registerMsg.businessLicenseImg.replace("img:", "")
						}
					];
					this.fileList2 = [
						{
							name: this.registerMsg.applicantIDCard.substring(
								this.registerMsg.applicantIDCard.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.registerMsg.applicantIDCard.replace("img:", "")
						}
					];
					this.fileList3 = [
						{
							name: this.registerMsg.applicantIDCardNegative.substring(
								this.registerMsg.applicantIDCardNegative.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.registerMsg.applicantIDCardNegative.replace("img:", "")
						}
					];
					this.fileList4 = [
						{
							name: this.registerMsg.legalPersonIdCard.substring(
								this.registerMsg.legalPersonIdCard.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.registerMsg.legalPersonIdCard.replace("img:", "")
						}
					];
					this.fileList5 = [
						{
							name: this.registerMsg.legalPersonIdCardNegative.substring(
								this.registerMsg.legalPersonIdCardNegative.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.registerMsg.legalPersonIdCardNegative.replace("img:", "")
						}
					];
				}
			});
		},
		register() {
			let qs = require("qs");
			let data = qs.stringify({
				name: this.registerMsg.name,
				type: this.registerMsg.type,
				creditCode: this.registerMsg.creditCode,
				legalPerson: this.registerMsg.legalPerson,
				address: this.registerMsg.address,
				businessScope: this.registerMsg.businessScope,
				applicant: this.registerMsg.applicant,
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
						enableMsg: false
						// successMsg: "提交成功！"
					},
					type: "post",
					url: "/api-enterprise/enterprise/update",
					loadingConfig: {
						target: document.querySelector(".register")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						// window.location.href = "/login.html";
						this.open();
					}
				},
				({ type, info }) => {}
			);
		},
		open() {
			this.$alert(
				"申请资料已成功上传,审核结果我们将以短信的方式通知您。",
				"消息",
				{
					confirmButtonText: "确定",
					callback: action => {
						window.location.href = "/login.html";
					}
				}
			);
		},
		toSave(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.register();
				} else {
					return false;
				}
			});
		}
	},
	created() {
		this.findOne(this.$route.params.id);
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
.enterprise_edit {
	font-size: 14px;
	color: @font-normal;
	.bottom_list_edit {
		background-color: white;
		margin-top: 10px;
		padding-bottom: 10px;
		overflow: hidden;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
			h4 {
				float: left;
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
			.el-form {
				width: 700px;
			}
		}
	}
}
</style>