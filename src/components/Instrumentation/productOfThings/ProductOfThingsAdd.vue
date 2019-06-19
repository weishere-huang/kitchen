<template>
	<div class="product_things_add">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>产品添加</h4>
			</div>
			<div class="table_list">
				<el-form
					:inline-message="true"
					label-width="200px"
					size="small"
					:model="addProduct"
					:rules="addProductRules"
					ref="addProduct"
				>
					<el-form-item label="产品名称：" prop="deviceName">
						<el-input
							type="text"
							maxlength="20"
							v-model="addProduct.deviceName"
							placeholder
							style="width:400px;"
						></el-input>
					</el-form-item>
					<el-form-item label="产品类型：" prop="deviceCateId">
						<el-cascader
							expand-trigger="hover"
							:options="options"
							v-model="addProduct.deviceCateId"
							style="width:400px;"
							@change="getDefinition"
							ref="getLabe"
						></el-cascader>
						<span
							style="color: #1cc09f;cursor: pointer;"
							@click="drawer=true"
							v-if="tableData.length>0"
						>功能定义</span>
					</el-form-item>
					<el-form-item label="连网类型：" prop="networkType">
						<el-select
							type="text"
							v-model="addProduct.networkType"
							maxlength="20"
							placeholder="请选择"
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
					<el-form-item label="产品描述：" prop="introduce">
						<el-input
							v-model="addProduct.introduce"
							type="textarea"
							resize="none"
							rows="4"
							maxlength="200"
							placeholder="请填写产品描述（最多200个字）"
							style="width:400px;"
						></el-input>
					</el-form-item>
					<el-form-item label="产品协议：" prop="agreement">
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
							:before-upload="beforeAvatarUpload2"
							:file-list="fileList"
							accept="image/png, image/jpeg, .PDF"
						>
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">请上传《长虹物联产品接入协议》扫描件，文件小于10MB的pdf/png/jpeg</div>
						</el-upload>
					</el-form-item>
					<el-form-item label="产品LOGO：" prop="logo">
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
						<div class="el-upload__tip tip_style">请上传该产品LOGO图片，要求：256px*256px，小于200KB的jpg或png</div>
					</el-form-item>
					<el-form-item label="产品连接示意图：" prop="linkImg">
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
						<div class="el-upload__tip tip_style">请上传产品连接示意图，要求：600px*800px，小于1MB的jpg或png</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label prop>
						<el-checkbox v-model="addProduct.checkValue" value="1">我已经认真阅读并同意</el-checkbox>《服务条款》《物联产品接入协议》
					</el-form-item>
					<el-form-item label prop>
						<el-button
							type="primary"
							:disabled="addProduct.checkValue==false"
							size="small"
							@click="addProductOfThings('addProduct')"
						>提交申请</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog
			title="查看功能定义"
			:visible.sync="drawer"
			width="600px"
			:close-on-click-modal="true"
			top="0"
		>
			<dir style="padding-top:20px;font-size:16px;">{{classifyLable[classifyLable.length-1]}}</dir>
			<div style="padding-top:12px;color:#999999;padding-bottom:12px;">
				该产品类型包含了{{tableData.length}}项预置功能，预置功能分为必填和选填。
				<br>注：带*表示必填。
			</div>
			<el-table :data="tableData" style="width: 100%" border size="mini">
				<el-table-column prop="function" label="功能"></el-table-column>
				<el-table-column prop="identify" label="变量标识"></el-table-column>
				<el-table-column prop="dataType" label="数据类型"></el-table-column>
				<el-table-column prop="introduce" label="说明"></el-table-column>
			</el-table>
			<span slot="footer" class="dialog-footer">
				<el-button @click="drawer = false" size="small" plain>关 闭</el-button>
			</span>
		</el-dialog>
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
			tableData: [],
			drawer: false,
			options,
			selectedOptions2: [],
			fileList: [],
			dialogImageUrl: "",
			dialogVisible: false,
			addProduct: {
				deviceName: "",
				deviceCateId: [],
				networkType: "",
				introduce: "",
				agreement: "",
				logo: "",
				linkImg: "",
				checkValue: false
			},
			addProductRules: {
				deviceName: [
					{ required: true, message: "请输入产品名称", trigger: "blur" }
				],
				deviceCateId: [
					{ required: true, message: "请选择产品类型", trigger: "change" }
				],
				networkType: [
					{ required: true, message: "请选择联网类型", trigger: "change" }
				],
				introduce: [
					{ required: true, message: "请输入产品描述", trigger: "blur" }
				],
				agreement: [
					{ required: true, message: "请上传产品协议", trigger: "change" }
				],
				logo: [
					{ required: true, message: "请上传产品LOGO", trigger: "change" }
				],
				linkImg: [
					{ required: true, message: "请上传产品连接示意图", trigger: "change" }
				]
			},
			classifyLable: ""
		};
	},
	methods: {
		getDefinition() {
			this.classifyLable = this.$refs["getLabe"].currentLabels;
			this.Axios(
				{
					params: {
						cateId: this.addProduct.deviceCateId[
							this.addProduct.deviceCateId.length - 1
						]
					},
					url: "/api-enterprise/dataModel/findByCateId",
					type: "get",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				console.log(result);
				if (result.data.code === 200) {
					this.tableData = result.data.data;
				}
			});
		},
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				console.log(file);
				this.fileList.push({
					name: file.name,
					url: res.data
				});
				this.addProduct.agreement = this.fileList;
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
		beforeAvatarUpload2(file) {
			// console.log(file.type);
			debugger;
			const isPicSize = file.size / 1024 / 1024 <= 10;
			const isPDF = file.type === "application/pdf";
			const isPNG = file.type === "image/png";
			const isJpg = file.type === "image/jpeg";
			if (!isPDF && !isPNG && !isJpg) {
				this.$message({
					showClose: true,
					message: "上传格式错误，请上传png,jpg,pdf格式的文件",
					type: "error",
					duration: 5000
				});
			}
			if (isPicSize == false) {
				this.$message.error("上传图片不能大于10M");
				return false;
			}
			return isPicSize && (isPDF || isPNG || isJpg);
		},
		handleAvatarSuccess1(res, file, a) {
			if (res.code === 200) {
				if (a == 1) {
					this.addProduct.logo = res.data;
				}
				if (a == 2) {
					this.addProduct.linkImg = res.data;
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
				this.addProduct.logo = "";
			}
			if (a == 2) {
				this.addProduct.linkImg = "";
			}
		},
		addProductOfThings(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let qs = require("qs");
					let data = qs.stringify({
						deviceName: this.addProduct.deviceName,
						deviceCateId: this.addProduct.deviceCateId[
							this.addProduct.deviceCateId.length - 1
						],
						networkType: this.addProduct.networkType,
						introduce: this.addProduct.introduce,
						agreement: JSON.stringify(this.fileList),
						logo: this.addProduct.logo,
						linkImg: this.addProduct.linkImg
					});
					this.Axios(
						{
							params: data,
							url: "/api-enterprise/device/add",
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
						} else {
							this.$message.error("添加失败,请重新尝试");
						}
					});
				} else {
					return false;
				}
			});
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
	.el-dialog {
		margin-top: 0px;
		margin-right: 0;
		height: 100vh;
		margin-bottom: 0;
	}
	.el-dialog__footer {
		position: absolute;
		bottom: 0%;
		width: 100%;
		text-align: right;
	}
}
</style>