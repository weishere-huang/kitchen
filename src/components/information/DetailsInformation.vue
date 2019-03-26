<template>
	<div class="details_information">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>新建消息</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small" :inline-message="true" style="margin-top: 20px;">
					<el-form-item label="消息标题：" prop>
						<el-input
							v-model="addInfo.title"
							:readonly="true"
							type="text"
							maxlength="20"
							placeholder="如：双11钜惠，菜品大促销！！！"
							size="small"
							style="width:700px;"
						></el-input>
					</el-form-item>
					<el-form-item label="接收对象：" prop>
						<span>全部用户</span>
					</el-form-item>
					<el-form-item label="消息内容：" prop>
						<el-input
							v-model="addInfo.content"
							:readonly="true"
							type="textarea"
							size="small"
							style="width:700px;"
							rows="6"
							maxlength="50"
						></el-input>
					</el-form-item>
					<el-form-item label="消息图片：" prop>
						<div class="show_msg_pic">
							<img :src="addInfo.img" alt v-if="addInfo.img!=''" @click="showMsgPic">
							<img src="../../assets/image/pic.png" alt v-else>
						</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<!-- <el-form-item>
						<el-button size="small" type="primary" @click="submitForm('cookbook')">立即发送</el-button>
					</el-form-item>-->
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			msgPic: "",
			dialogVisible: false,
			dialogImageUrl: "",
			addInfo: {
				title: "",
				content: "",
				img: ""
			}
		};
	},
	methods: {
		showMsgPic() {
			this.dialogVisible = true;
			this.dialogImageUrl = this.addInfo.img;
		},

		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
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
			console.log(file, fileList);
			this.cookbook.recipeImg = null;
		},
		handlePictureCardPreview1(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 <= 80;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于80KB");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 600;
					let height = 600;
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
				this.cookbook.recipeImg =
					this.global.imgPath + res.data.replace("img:", "");
				this.$message({
					message: "图片上传成功！",
					type: "success"
				});
				// console.log(this.cookbook.recipeImg);
			} else {
				this.$message({
					message: "图片上传不成功！",
					type: "error"
				});
			}
		},
		getone(id) {
			this.Axios(
				{
					params: {
						messageId: id
					},
					option: {},
					type: "get",
					url: "/api-message/message/getOne"
				},
				this
			).then(
				result => {
					console.log(result.data);
					this.addInfo = result.data.data;
					console.log(this.addInfo);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		let id = this.$route.params.id;
		this.getone(id);
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
.details_information {
	font-size: 14px;
	color: @font-normal;
	.top_list {
		background-color: white;
		padding: 10px;
	}
	.bottom_list {
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
			.top_search {
				width: 400px;
				float: right;
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
			.show_msg_pic {
				width: 100px;
				height: 100px;
				img {
					width: 100%;
				}
			}
		}
	}
	.el-upload__tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
		line-height: 20px;
		display: inline-block;
		vertical-align: bottom;
		padding-left: 8px;
		line-height: 40px;
	}
	.textarea_style {
		textarea {
			height: 80px;
		}
	}
}
</style>
