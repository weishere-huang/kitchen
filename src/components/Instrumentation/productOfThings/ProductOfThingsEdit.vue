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
					<el-form-item label="驳回原因：" prop>
						<span style="color:red;">{{editProduct.auditOpinion}}</span>
					</el-form-item>
					<el-form-item label="产品名称：" prop>
						<el-input
							type="text"
							maxlength="20"
							v-model="editProduct.deviceName"
							placeholder
							style="width:400px;"
						></el-input>
					</el-form-item>
					<el-form-item label="产品类型：" prop>
						<el-cascader
							expand-trigger="hover"
							:options="options"
							v-model="editProduct.deviceCateId"
							style="width:400px;"
						></el-cascader>
					</el-form-item>
					<el-form-item label="连网类型：" prop>
						<el-select
							type="text"
							v-model="editProduct.networkType"
							maxlength="20"
							placeholder
							style="width:400px;"
						>
							<el-option label="WIFI" value="0"></el-option>
							<el-option label="4G" value="1"></el-option>
							<el-option label="NB-loT" value="2"></el-option>
							<el-option label="LoRa" value="3"></el-option>
							<el-option label="ZigBee" value="4"></el-option>
							<el-option label="以太网" value="5"></el-option>
							<el-option label="其他" value="6"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="产品描述：" prop>
						<el-input
							v-model="editProduct.introduce"
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
							:file-list="fileListLogo"
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
							:file-list="fileListLink"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">上传法人身份证正反面彩色照片，小于2MB的jpg或png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label prop>
						<el-checkbox value="1" v-model="editProduct.checkValue">我已经认真阅读并同意</el-checkbox>《服务条款》《物联产品接入协议》
					</el-form-item>
					<el-form-item label prop>
						<el-button
							type="primary"
							:disabled="editProduct.checkValue==false"
							size="small"
							@click="editProductOfThings"
						>提交申请</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script>
let options = [
	{
		value: 1,
		label: "智能生活",
		children: [
			{
				value: 2,
				label: "厨房电器",
				children: [
					{
						value: 3,
						label: "炒菜机器人"
					},
					{
						value: 4,
						label: "洗碗机"
					},
					{
						value: 5,
						label: "微波炉"
					},
					{
						value: 6,
						label: "电饭煲"
					}
				]
			}
		]
	}
];
export default {
	inject: ["reload"],
	data() {
		return {
			options,
			fileListLogo: [],
			fileListLink: [],
			fileList: [],
			dialogImageUrl: "",
			dialogVisible: false,
			editProduct: {
				enterpriseId: 123,
				enterpriseName: "光大实业",
				deviceName: "",
				deviceCateName: [],
				networkType: "",
				introduce: "",
				agreement: "",
				logo: "",
				linkImg: "",
				checkValue: false
			}
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
			this.fileList.splice(
				this.fileList.findIndex(item => item.url == file.url),
				1
			);
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
				if (a == 1) {
					this.editProduct.logo = res.data;
				}
				if (a == 2) {
					this.editProduct.linkImg = res.data;
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
		handleRemove1(file, fileList, a) {
			if (a == 1) {
				this.editProduct.logo = "";
			}
			if (a == 2) {
				this.editProduct.linkImg = "";
			}
		},
		getnode(array, label) {
			let stack = [];
			let going = true;
			let walker = (array, label) => {
				array.forEach(item => {
					if (!going) return;
					stack.push(item["value"]);
					if (item["value"] === label) {
						going = false;
					} else if (item["children"]) {
						walker(item["children"], label);
					} else {
						stack.pop();
					}
				});
				if (going) stack.pop();
			};

			walker(array, label);
			this.editProduct.deviceCateId = stack;
			console.log(this.editProduct.deviceCateId);
			return stack.join("-");
		},
		findOne(id) {
			this.Axios(
				{
					params: { id: id },
					url: "/api-enterprise/device/auditone",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					Object.assign(this.editProduct, result.data.data);
					console.log(result.data.data.deviceCateId);
					this.editProduct.agreement = JSON.parse(this.editProduct.agreement);
					this.editProduct.networkType = this.editProduct.networkType.toString();
					this.fileList = this.editProduct.agreement;
					this.fileListLogo = [
						{
							name: this.editProduct.logo.substring(
								this.editProduct.logo.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath + this.editProduct.logo.replace("img:", "")
						}
					];
					this.fileListLink = [
						{
							name: this.editProduct.linkImg.substring(
								this.editProduct.linkImg.lastIndexOf("/") + 1
							),
							url:
								this.global.imgPath +
								this.editProduct.linkImg.replace("img:", "")
						}
					];
					this.getnode(this.options, result.data.data.deviceCateId);
				}
			});
		},
		editProductOfThings() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.editProduct.id,
				deviceName: this.editProduct.deviceName,
				deviceCateId: this.editProduct.deviceCateId[
					this.editProduct.deviceCateId.length - 1
				],
				networkType: this.editProduct.networkType,
				introduce: this.editProduct.introduce,
				agreement: JSON.stringify(this.fileList),
				logo: this.editProduct.logo,
				linkImg: this.editProduct.linkImg
			});
			this.Axios(
				{
					params: data,
					url: "/api-enterprise/device/update",
					type: "post",
					option: {
						successMsg: "添加成功"
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					this.$router.back(-1);
					this.reload();
				} else {
					this.$message.error("添加失败,请重新尝试");
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