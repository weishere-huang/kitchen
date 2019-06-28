<template>
	<div class="merchant_system_list">
		<el-col :span="24" class="content_case">
			<el-col :span="24" class="top_title">
				<h4>商城设置</h4>
			</el-col>
			<el-col :span="24">
				<el-form
					size="small"
					label-width="200px"
					style="margin-top:20px;"
					:inline-message="true"
					:model="systemMsg"
					:rules="systemMsgRules"
					ref="systemMsg"
				>
					<el-form-item label="商家电话：" prop="phone">
						<el-input
							type="text"
							v-model="systemMsg.phone"
							maxlength="20"
							style="width:300px;"
							placeholder
						></el-input>
					</el-form-item>
					<el-form-item label="店铺名称：" prop="enterpriseName">
						<el-input
							type="text"
							v-model="systemMsg.enterpriseName"
							maxlength="20"
							style="width:300px;"
							placeholder
						></el-input>
					</el-form-item>
					<el-form-item label="店铺LOGO：" prop="logo">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview1"
							:on-remove="handleRemove1"
							:on-success="handleAvatarSuccess1"
							:before-upload="beforeAvatarUpload1"
							:limit="1"
							class="upload_show"
							accept="image/png, image/jpeg"
							:file-list="fileList"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">LOGO要求尺寸200x200，小于200KB的jpg或png</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="运费设置：" prop="shipping">
						每个订单满
						<el-input
							type="number"
							v-model.number="systemMsg.shipping"
							maxlength="20"
							style="width:80px;"
							placeholder
							oninput="if(value.length>5)value=value.slice(0,5)"
						></el-input>元包邮，未满则按
						<el-input
							type="number"
							v-model.number="systemMsg.fare"
							maxlength="20"
							style="width:80px;"
							placeholder
							oninput="if(value.length>5)value=value.slice(0,5)"
						></el-input>元收取。
					</el-form-item>
					<el-form-item label="公告：" prop="announcement">
						<el-input
							type="textarea"
							maxlength="100"
							rows="4"
							resize="none"
							style="width:500px;"
							placeholder="(不超过100字)"
							v-model="systemMsg.announcement"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save('systemMsg')">保 存</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-col>
	</div>
</template>
<script>
export default {
	data() {
		return {
			fileList: [],
			dialogVisible: false,
			dialogImageUrl: "",
			systemMsg: {
				enterpriseName: "",
				phone: "",
				shipping: "",
				logo: "",
				fare: "",
				announcement: ""
			},
			systemMsgRules: {
				phone: [
					{ required: true, message: "请设置客服热线", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^0\d{2,3}-\d{7,8}$/.test(value) == false) {
								callback(new Error("电话格式不正确"));
							} else {
								callback();
							}
						},
						trigger: ["blur"]
					}
				],
				enterpriseName: [
					{ required: true, message: "请设置店铺名称", trigger: "blur" }
				],
				logo: [{ required: true, message: "请设置店铺LOGO", trigger: "blur" }],
				shipping: [
					{
						required: true,
						message: "请设置满减运费条件",
						trigger: ["blur", "change"]
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(this.systemMsg.shipping) == false) {
								callback(new Error("满减条件必须是整数"));
							} else if (
								/^\d*(\.?\d{0,0})$/g.test(this.systemMsg.fare) == false
							) {
								callback(new Error("运费必须是整数"));
							} else {
								callback();
							}
						},
						trigger: ["blur"]
					}
				]
			}
		};
	},
	methods: {
		save(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						enterpriseName: this.systemMsg.enterpriseName,
						phone: this.systemMsg.phone,
						shipping: this.systemMsg.shipping,
						logo: this.systemMsg.logo,
						fare: this.systemMsg.fare,
						announcement: this.systemMsg.announcement
					});
					this.Axios(
						{
							params: data,
							url: "/api-enterprise/enterpriseSet/update",
							type: "post",
							option: {
								successMsg: "修改成功"
							}
						},
						this
					).then(result => {});
				} else {
					return false;
				}
			});
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList) {
			this.systemMsg.logo = null;
		},
		handlePictureCardPreview1(file) {
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
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.systemMsg.logo = res.data;
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
		getSystemMsg() {
			this.Axios(
				{
					params: {
						enterpriseId: JSON.parse(sessionStorage.getItem("user"))
							.salesTerritoryId
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/enterpriseSet/info"
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.systemMsg = result.data.data;
					if (this.systemMsg.logo != null && this.systemMsg.logo != "") {
						this.fileList = [
							{
								name: this.systemMsg.logo.substring(
									this.systemMsg.logo.lastIndexOf("/") + 1
								),
								url:
									this.global.imgPath + this.systemMsg.logo.replace("img:", "")
							}
						];
					}
				}
			});
		}
	},
	created() {
		this.getSystemMsg();
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
.merchant_system_list {
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
