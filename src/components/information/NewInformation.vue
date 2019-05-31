<template>
	<div class="add_information">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>新建消息</h4>
			</div>
			<div class="table_list">
				<el-form
					label-width="200px"
					size="small"
					:inline-message="true"
					style="margin-top: 20px;"
					ref="cookbook"
					:model="addInfo"
					:rules="rulesAddInfo"
				>
					<el-form-item label="消息标题：" prop="title">
						<el-input
							v-model="addInfo.title"
							type="text"
							maxlength="30"
							placeholder="如：双11钜惠，菜品大促销！！！"
							size="small"
							style="width:700px;"
						></el-input>
					</el-form-item>
					<el-form-item label="接收对象：" prop>
						<span>全部用户</span>
					</el-form-item>
					<!-- <el-form-item label="消息内容：" prop="content">
						<el-input
							type="textarea"
							size="small"
							style="width:700px;"
							rows="6"
							maxlength="250"
							v-model="addInfo.content"
						></el-input>
					</el-form-item>-->
					<el-form-item label="消息图片：" prop>
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
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">建议尺寸：宽1000px，高不限，≤2MB的jpg或png（图片可为空）。</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="内容：" prop="content">
						<editor
							id="editorActivity"
							height="300px"
							width="700px"
							:uploadJson="uploadJson()"
							:afterUpload="afterUpload"
							:content.sync="addInfo.content"
							:fileManagerJson="()=>look()"
							pluginsPath="../../../static/kindeditor/plugins"
							filePostName="file"
							:loadStyleMode="false"
						></editor>
					</el-form-item>
					<el-form-item>
						<el-button
							permCode="messagepush_lookup.messagepush_list_add"
							banType="disable"
							size="small"
							type="primary"
							@click="submitForm('cookbook')"
						>立即发送</el-button>
						<!--<el-button size="small" type="primary" @click="saveim">立即发送</el-button>-->
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import editor from "../public/kindeditor";
export default {
	inject: ["reload"],
	data() {
		return {
			editorText: "",
			dialogVisible: false,
			dialogImageUrl: "",
			addInfo: {
				title: null,
				content: null,
				img: null
			},
			rulesAddInfo: {
				title: [{ required: true, message: "请输入标题", trigger: "blur" }],
				content: [{ required: true, message: "请输入内容", trigger: "blur" }]
			}
		};
	},
	methods: {
		afterUpload(data) {
			return this.global.imgPath + data.replace("img:", "");
		},
		look() {
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.saveim();
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
			this.addInfo.img = null;
		},
		handlePictureCardPreview1(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		beforeAvatarUpload1(file) {
			const isPicSize = file.size / 1024 / 1024 <= 2;
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于2M");
				return false;
			} else {
				const isSize = new Promise(function(resolve, reject) {
					let width = 10000000;
					let height = 100000000000;
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
						this.$message.error("上传的图片必须宽在1000px以内的");
						return Promise.reject();
					}
				);
				return isSize;
			}
		},
		handleAvatarSuccess1(res, file) {
			if (res.code === 200) {
				this.addInfo.img = res.data;
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
		saveim() {
			let qs = require("qs");
			let data = qs.stringify({
				title: this.addInfo.title,
				content: this.addInfo.content,
				img: this.addInfo.img
			});
			this.Axios(
				{
					params: data,
					url: "/api-message/notice/addNotice",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.$router.back(-1);
					this.reload();
				}
			});
		}
	},
	created() {},
	components: {
		editor
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
.add_information {
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
