<template>
	<div class="add_menu">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>添加商品</h4>
			</div>
			<el-form
				label-width="200px"
				size="mini"
				:rules="addMenuRules"
				:inline-message="true"
				:model="addMenu"
				ref="addMenu"
			>
				<el-form-item label="商品名称：" prop="title">
					<el-input size="small" type="text" style="width:300px;" v-model="addMenu.title" maxlength="20"></el-input>
				</el-form-item>
				<el-form-item label="商品分类：" prop="cateId">
					<el-cascader
						expand-trigger="hover"
						:options="classify"
						:props="defaultProps1"
						v-model="addMenu.cateId"
						:show-all-levels="false"
						ref="selectValue"
						style="width:300px;"
						size="small"
					></el-cascader>
				</el-form-item>
				<el-form-item label="价格：" prop="price">
					<el-input
						v-model.number="addMenu.price"
						type="number"
						size="small"
						style="width:300px;"
						placeholder="单位：元"
						step="0.01"
						maxlength="20"
					></el-input>
				</el-form-item>
				<el-form-item label="库存数量：" prop="stockNow">
					<el-input
						maxlength="20"
						type="number"
						size="small"
						style="width:300px;"
						v-model.number="addMenu.stockNow"
					></el-input>
				</el-form-item>
				<el-form-item label="上/下架：" prop="isShelf">
					<el-radio v-model="addMenu.isShelf" label="1">上架</el-radio>
					<el-radio v-model="addMenu.isShelf" label="0">下架</el-radio>
				</el-form-item>
				<el-form-item label="是否推荐：" prop="isRecommend">
					<el-radio v-model="addMenu.isRecommend" label="2">是</el-radio>
					<el-radio v-model="addMenu.isRecommend" label="3">否</el-radio>
				</el-form-item>
				<el-form-item label="商品缩略图：" prop="img">
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
				<el-form-item label="商品描述：" prop="description">
					<el-input
						type="textarea"
						rows="6"
						resize="none"
						style="width:700px;"
						v-model="addMenu.description"
					></el-input>
				</el-form-item>
				<el-form-item label="商品详情：">
					<editor
						id="editorMenu"
						height="300px"
						width="700px"
						:uploadJson="uploadJson()"
						:content.sync="addMenu.info"
						:afterUpload="afterUpload"
						:fileManagerJson="()=>look()"
						pluginsPath="../../../static/kindeditor/plugins"
						filePostName="file"
						:loadStyleMode="false"
					></editor>
				</el-form-item>
				<el-form-item label>
					<!-- <el-button size="small" type="primary" @click="dialogPreview=true">预览</el-button> -->
					<el-button size="small" type="primary" @click="submitForm('addMenu')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-dialog :visible.sync="dialogPreview" width="414px" class="showPic el_show">
			<Preview :MenuMsg="addMenu"></Preview>
		</el-dialog>
	</div>
</template>
<script>
import editor from "../public/kindeditor";
import areaList from "../public/Area";

import Preview from "./preview/Preview";
export default {
	inject: ["reload"],
	data() {
		return {
			defaultProps1: {
				children: "child",
				label: "cateName",
				value: "id"
			},
			editorText: "",
			dialogImageUrl: "",
			dialogVisible: false,
			dialogPreview: false,
			addMenu: {
				title: "",
				description: "",
				price: "",
				cateId: [],
				stockNow: "",
				isRecommend: "",
				isShelf: "",
				img: "",
				info: ""
			},
			addMenuRules: {
				recipeName: [
					{
						required: true,
						message: "请输入商品名称",
						trigger: "change"
					}
				],
				itemCate: [
					{ required: true, message: "请选择分类", trigger: "change" }
				],
				itemPrice: [
					{
						required: true,
						message: "请输入商品价格",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,2})$/g.test(value) == false) {
								callback(new Error("支持小数点后两位，且不能为负数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				stockNow: [
					{
						required: true,
						message: "请输入商品库存",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
								callback(new Error("只能为正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			},
			cookbook: "",
			areaShow: false,
			defaultMsg: "",
			classify: [],
			dialogVisible: false
		};
	},
	methods: {
		afterUpload(data) {
			return this.global.imgPath + data.replace("img:", "");
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.savespu();
				} else {
					this.$message.warning("请填写完整信息！");
					return false;
				}
			});
		},
		// handleInput(row) {
		//   row.target.value = row.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
		// },
		// handleInput1(row) {
		//   row.target.value = row.target.value.match(/^\d*(\.?\d{0,0})/g)[0] || null;
		// },
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		getClassifyList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/itemCat/allCate"
				},
				this
			).then(
				result => {
					console.log(result.data.data[0]);
					// for (let i = 0; i < result.data.data.length; i++) {
					// 	result.data.data[i].visible = false;
					// }
					if (result.data.code === 200) {
						this.classify = result.data.data[0];
					}
				},
				({ type, info }) => {}
			);
		},

		getUEContent() {
			this.savespu();
		},
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
			this.addMenu.img = null;
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
				this.addMenu.img = res.data;
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
		savespu() {
			let qs = require("qs");
			let data = qs.stringify({
				title: this.addMenu.title,
				description: this.addMenu.description,
				price: this.addMenu.price * 100,
				cateId: this.addMenu.cateId[this.addMenu.cateId.length - 1],
				stockNow: this.addMenu.stockNow,
				isRecommend: this.addMenu.isRecommend,
				isShelf: this.addMenu.isShelf,
				img: this.addMenu.img,
				info: this.addMenu.info
			});
			this.Axios(
				{
					params: data,
					url: "/api-mall/product/add",
					type: "post",
					option: {
						successMsg: "保存成功"
					},
					loadingConfig: {
						target: document.querySelector(".add_menu")
					}
				},
				this
			).then(result => {
				console.log(result.data);
				if (result.data.code === 200) {
					this.$router.back(-1);
					this.reload();
				} else {
					this.$message.error("出库失败,请重新尝试");
				}
			});
		}
	},

	mounted() {},
	created() {
		this.getClassifyList();
	},
	components: {
		areaList,

		Preview,
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
.add_menu {
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
		.line {
			width: 90%;
			border-bottom: @border;
			margin: auto;
			margin-bottom: 20px;
		}
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
			h4 {
				float: left;
			}
		}
		.el-form {
			margin-top: 20px;
			.el-dialog__body {
				padding: 0;
				font-size: 0;
				line-height: 0;
			}
			.area_case {
				width: 600px;
				border: @border;
				border-radius: 5px;
				.top_case {
					line-height: 40px;
					padding: 0 15px;
					border-bottom: @border;
					span {
						font-size: 16px;
						float: right;
						line-height: 40px;
						i {
							cursor: pointer;
							color: #333333;
							&:hover {
								color: #1cc09f;
							}
						}
					}
				}
				.content_case {
					padding: 0px 15px;
					li {
						list-style-type: none;
						line-height: 30px;
					}
				}
			}
			.ue_box {
				.el-form-item__content {
					line-height: 20px;
				}
			}
			.hot_case {
				.el-radio-button__inner:hover {
					background-color: #ff9200;
					border-color: #ff9200;
				}
				.el-radio-button__inner:focus {
					background-color: #ff9200;
					border-color: #ff9200;
				}
				.el-radio-button__inner:active {
					background-color: #ff9200;
					border-color: #ff9200;
				}
				.el-radio-button__orig-radio:checked + .el-radio-button__inner {
					background-color: #ff9200;
					border-color: #ff9200;
				}
				.el-checkbox__input.is-checked .el-checkbox__inner,
				.el-checkbox__input.is-indeterminate .el-checkbox__inner {
					background-color: #ff9200;
					border-color: #ff9200;
				}
				.el-checkbox__input.is-checked + .el-checkbox__label {
					color: #ff9200;
				}
				.el-radio-button__orig-radio:checked + .el-radio-button__inner {
					-webkit-box-shadow: -1px 0 0 0 #ff9200;
					box-shadow: -1px 0 0 0 #ff9200;
				}
			}
		}
	}

	.el-upload__tip {
		font-size: 12px;
		color: #606266;
		margin-top: 7px;
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
.el_show {
	.el-dialog {
		background: #fff0;
	}
}
</style>
