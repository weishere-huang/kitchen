<template>
	<div class="enterprise_edit">
		<div class="bottom_list_edit">
			<div class="top_title">
				<h4>入驻申请</h4>
			</div>
			<div class="table_list">
				<el-form size="small" label-width="200px" style="margin-top:40px;padding-bottom:40px;">
					<el-form-item label="企业名称：" prop>
						<el-input v-model="registerMsg.name" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="统一社会信用代码：" prop>
						<el-input v-model="registerMsg.creditCode" type="text" maxlength="18"></el-input>
					</el-form-item>
					<el-form-item label="法人：" prop>
						<el-input v-model="registerMsg.legalPerson" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="注册地址：" prop>
						<el-input v-model="registerMsg.address" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="营业范围：" prop>
						<el-input
							v-model="registerMsg.businessScope"
							type="textarea"
							rows="4"
							resize="none"
							maxlength="30"
						></el-input>
					</el-form-item>
					<el-form-item label="申请人姓名：" prop>
						<el-input v-model="registerMsg.applicant" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="申请人手机号：" prop>
						<el-input v-model="registerMsg.phone" type="text" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="初始密码：" prop>
						<el-input v-model="registerMsg.password" type="password" maxlength="30"></el-input>
					</el-form-item>
					<el-form-item label="营业执照：" prop>
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
					<el-form-item label="法人身份证：" prop>
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
					<el-form-item label="申请人身份证：" prop>
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
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
					</el-form-item>
					<el-form-item label prop>
						<el-button style="width:160px;" @click type="primary">保存并提交审核</el-button>
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
			dialogImageUrl: ""
		};
	},
	methods: {
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