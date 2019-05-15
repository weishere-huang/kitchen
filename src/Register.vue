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
						<el-radio-group v-model="radio" style="width:100%;margin-top:40px;padding-bottom:40px;">
							<el-radio :border="true" :label="3">
								<div class="radio_case">
									<p>设备厂商</p>
									<p>主要用于智能设备接入及管理</p>
								</div>
							</el-radio>

							<el-radio :border="true" :label="6" style="margin-top:20px;">
								<div class="radio_case">
									<p>商家</p>
									<p>主要用于管理商品、订单等信息</p>
								</div>
							</el-radio>
						</el-radio-group>
						<div style="text-align:center;">
							<el-button style="width:120px;" plain @click="toLogin">返回</el-button>
							<el-button type="primary" style="width:120px;" @click="toNext(1)">下一步</el-button>
						</div>
					</div>
					<div class="register_msg" v-show="secondCase">
						<el-form size="small" label-width="160px" style="margin-top:40px;padding-bottom:40px;">
							<el-form-item label="企业名称" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="统一社会信用代码" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="法人" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="注册地址" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="营业范围" prop>
								<el-input type="textarea" rows="4" resize="none" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="申请人姓名" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="申请人手机号" prop>
								<el-input type="text" maxlength="30"></el-input>
							</el-form-item>
							<el-form-item label="营业执照" prop>
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
							<el-form-item label="法人身份证" prop>
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
							<el-form-item label="申请人身份证" prop>
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
								<el-button style="width:120px;" plain>返回</el-button>
								<el-button type="primary" style="width:120px;" @click="toNext(2)">下一步</el-button>
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
export default {
	data() {
		return {
			firstCase: true,
			secondCase: false,
			thirdCase: false,
			active: 0,
			radio: "",
			dialogImageUrl: "",
			dialogVisible: false
		};
	},
	methods: {
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList, a) {
			// this.cookbook.recipeImg = null;
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
			console.log("handleAvatarSuccess1:" + a);
			if (res.code === 200) {
				// this.cookbook.recipeImg = res.data;
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
		toNext(a) {
			if (a == 1) {
				this.firstCase = false;
				this.secondCase = true;
				this.active = 1;
				document.getElementsByClassName("register_case")[0].style.marginTop =
					"-400px";
			}
			if (a == 2) {
				this.active = 3;
				this.secondCase = false;
				this.thirdCase = true;
				document.getElementsByClassName("register_case")[0].style.marginTop =
					"-300px";
			}
			if (a == 3) {
				window.location.href = "/login.html";
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