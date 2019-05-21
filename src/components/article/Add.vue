<template>
	<div class="article_add">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>文章添加</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small" style="margin-top:20px">
					<el-form-item label="标题：">
						<el-input type="text" maxlength="30" style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="分类：">
						<el-select style="width:400px;">
							<el-option value="1" label="普通文章"></el-option>
							<el-option value="2" label="公告通知"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标签：">
						<el-input maxlength="8" style="width:400px;" type="text"></el-input>
					</el-form-item>
					<el-form-item label="缩略图：">
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
						<div class="el-upload__tip tip_style">要求：750*460像素，小于1MB的jpg或png</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="内容：">
						<editor
							id="editorArticle"
							height="300px"
							width="700px"
							:uploadJson="uploadJson()"
							:content.sync="editorText"
							:fileManagerJson="look()"
							pluginsPath="../../../static/kindeditor/plugins"
							filePostName="file"
							:loadStyleMode="false"
						></editor>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
import editor from "../public/kindeditor";
export default {
	data() {
		return {
			editorText: "",
			dialogImageUrl: "",
			dialogVisible: false
		};
	},
	methods: {
		look() {
			let url = this.global.imgPath;
			return url;
		},
		uploadJson() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleRemove1(file, fileList) {
			// this.cookbook.recipeImg = null;
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
		}
	},
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
.article_add {
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
}
</style>