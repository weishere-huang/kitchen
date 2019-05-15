<template>
	<div class="product_things_add">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>产品修改</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="产品名称：" prop>
						<el-input type="text" maxlength="20" placeholder style="width:400px;"></el-input>
					</el-form-item>
					<el-form-item label="产品类型：" prop>
						<el-select type="text" maxlength="20" placeholder style="width:130px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
						<el-select type="text" maxlength="20" placeholder style="width:130px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
						<el-select type="text" maxlength="20" placeholder style="width:132px">
							<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<el-select type="text" maxlength="20" placeholder style="width:400px;">
							<el-option v-for="item in 3" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品描述：" prop>
						<el-input
							type="textarea"
							resize="none"
							rows="4"
							maxlength="200"
							placeholder
							style="width:400px;"
						></el-input>
					</el-form-item>
					<el-form-item label="产品协议：" prop>
						<el-upload
							class="upload-demo"
							:action="imgApi()"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:before-remove="beforeRemove"
							:on-success="handleAvatarSuccess"
							multiple
							:limit="5"
							:on-exceed="handleExceed"
							:file-list="fileList"
							accept="image/png, image/jpeg, .PDF"
						>
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">请上传《长虹物联产品接入协议》扫描件，文件小于10MB的pdf/png/jpeg</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="产品LOGO" prop>
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
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
					</el-form-item>
					<el-form-item label="产品连接示意图：" prop>
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
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label prop>
						<el-checkbox value="1">我已经认真阅读并同意《服务条款》《物联产品接入协议》</el-checkbox>
					</el-form-item>
					<el-form-item label prop>
						<el-button type="primary" size="small">提交申请</el-button>
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
			fileList: [],
			dialogImageUrl: "",
			dialogVisible: false
		};
	},
	methods: {
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				console.log(file);
				this.fileList.push({
					name: file.name,
					url: res.data
				});
				this.$message({
					message: "上传成功！",
					type: "success"
				});
			} else {
				this.$message({
					message: "上传不成功！",
					type: "error"
				});
			}
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning("只能上传5个文件");
		},
		beforeRemove(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
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
		handleRemove1(file, fileList, a) {
			// this.cookbook.recipeImg = null;
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
.product_things_add {
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
		.el-upload-list {
			width: 400px;
		}
	}
}
</style>