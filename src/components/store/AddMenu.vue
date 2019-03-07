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
				size="small"
				:model="addMenu"
				:rules="addMenuRules"
				ref="addMenu"
				:inline-message="true"
			>
				<el-form-item label="商品名称：" prop="itemName">
					<el-input type="text" size="small" style="width:300px;" v-model="addMenu.itemName"></el-input>
				</el-form-item>
				<el-form-item label="商品分类：" prop="itemCate">
					<el-select v-model="addMenu.itemCate" placeholder="请选择" size="small">
						<el-option v-for="item in classify" :key="item.value" :label="item.cateName" :value="item.no"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="绑定菜谱：" prop="script">
					<el-input
						type="text"
						size="small"
						style="width:192px;"
						v-model="cookbook"
						@focus="dialogCoobook = true"
						placeholder="请选择"
					></el-input>
				</el-form-item>
				<el-form-item label="商品价格：" prop="itemPrice">
					<el-input
						v-model.number="addMenu.itemPrice"
						type="number"
						size="small"
						style="width:192px;"
						placeholder="单位：元"
						step="0.01"
					></el-input>
				</el-form-item>
				<el-form-item label="商品库存：" prop="number">
					<el-input type="number" size="small" style="width:192px;" v-model.number="addMenu.number"></el-input>
				</el-form-item>
				<el-form-item label="烹饪时长：" prop="cookingTime">
					<el-input
						v-model.number="addMenu.cookingTime"
						type="number"
						size="small"
						style="width:192px;"
						placeholder="单位：分钟"
						step="0"
					></el-input>
				</el-form-item>
				<el-form-item label="参考辣度：" class="hot_case" prop="spicy">
					<el-radio-group v-model="addMenu.spicy" size="small" style="width:192px;">
						<el-radio-button label="0">
							<i class="iconfont" style="color:#999999;">&#xe612;</i>
						</el-radio-button>
						<el-radio-button label="1">
							<i class="iconfont" style="color:red;">&#xe612;</i>
						</el-radio-button>
						<el-radio-button label="2">
							<i class="iconfont" style="color:red;">&#xe613;</i>
						</el-radio-button>
						<el-radio-button label="3">
							<i class="iconfont" style="color:red;">&#xe614;</i>
						</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="净含量：" prop="itemWeight">
					<el-input
						v-model.number="addMenu.itemWeight"
						type="number"
						size="small"
						style="width:192px;"
						placeholder="单位：克"
						step="0.01"
					></el-input>
				</el-form-item>
				<el-form-item label="食材搭配：" prop="itemSpec">
					<el-input
						v-model="addMenu.itemSpec"
						type="text"
						size="small"
						style="width:300px;"
						placeholder=" 如：精选五花肉，青椒，蒜片，姜片"
					></el-input>
				</el-form-item>
				<el-form-item label="商品图片：" prop="itemImg">
					<el-upload
						:action="imgApi()"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-success="handleAvatarSuccess"
						v-model="addMenu.itemImg"
						:before-upload="beforeAvatarUpload"
						accept=".jpg, .jpeg, .png"
						:limit="1"
					>
						<i class="el-icon-plus"></i>
						<div slot="tip" class="el-upload__tip">600 × 600像素，≤80 KB的jpg/png图片</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt>
					</el-dialog>
				</el-form-item>
				<el-form-item label="是否上架：" prop="state">
					<el-radio v-model="addMenu.state" label="1">是</el-radio>
					<el-radio v-model="addMenu.state" label="2">否</el-radio>
				</el-form-item>
				<el-form-item label="加入推荐：" prop="recommendType">
					<el-checkbox v-model="addMenu.recommendType.hotMenu">热销</el-checkbox>
					<el-checkbox v-model="addMenu.recommendType.newMenu">新品</el-checkbox>
				</el-form-item>
				<el-form-item label="详细内容：" prop="des">
					<el-input v-model="addMenu.des" type="textarea" rows="5" style="width:600px;"></el-input>
				</el-form-item>
				<el-form-item label>
					<el-button size="small" type="primary">预览</el-button>
					<el-button size="small" type="primary" @click="submitForm('addMenu')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-dialog title="绑定菜谱" :visible.sync="dialogCoobook" width="714px" :close-on-click-modal="false">
			<div style="overflow:hidden;margin-top:16px;">
				<dialog-coobook v-on:dialogCoobookHide="dialogCoobookHide"></dialog-coobook>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import ueditor from "../public/Ue";
import areaList from "../public/Area";
import dialogCoobook from "./addCookbook/addCookbook";
export default {
	inject: ["reload"],
	data() {
		return {
			addMenu: {
				itemName: "",
				itemCate: "",
				itemImg: "",
				itemPrice: "",
				itemWeight: "",
				itemSpec: "",
				cookingTime: "",
				number: "",
				spicy: "",
				des: "",
				state: "2",
				script: "",
				recommendType: {
					newMenu: false,
					hotMenu: false
				}
			},
			addMenuRules: {
				itemName: [
					{
						required: true,
						message: "请输入商品名称",
						trigger: "blur"
					}
				],
				itemCate: [{ required: true, message: "请选择分类", trigger: "blur" }],
				itemImg: [{ required: true, message: "请上传图片" }],
				script: [
					{ required: false, message: "请选择菜谱脚本", trigger: "focus" }
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
				itemWeight: [
					{
						required: true,
						message: "请输入商品净含量",
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
				],
				number: [
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
				],
				itemSpec: [
					{
						required: true,
						message: "请输入商品食材搭配",
						trigger: "blur"
					}
				],
				cookingTime: [
					{
						required: true,
						message: "请输入烹饪时长",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
								callback(new Error("请输入正整数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				spicy: [{ required: true, message: "请选择辣度", trigger: "blur" }],
				des: [
					{
						required: false,
						message: "请输入详细内容",
						trigger: "blur"
					}
				]
			},
			cookbook: "",
			dialogCoobook: false,
			areaShow: false,
			defaultMsg: "",
			config: {
				initialFrameWidth: null,
				initialFrameHeight: 350
			},
			classify: [
				{
					value: "炒菜",
					label: "炒菜"
				}
			],
			dialogImageUrl: "",
			dialogVisible: false
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.savespu();
				} else {
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
		getClassfy() {
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
					console.log(result.data.data);
					// result.data.data.splice(0,0,{cateName:"全部类别",id:-2})
					this.classify = result.data.data;
				},
				({ type, info }) => {}
			);
		},
		dialogCoobookHide(params) {
			this.dialogCoobook = params.ishide;
			this.cookbook = params.value;
		},
		getUEContent() {
			this.savespu();
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
			this.addMenu.itemImg = null;
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleAvatarSuccess(res, file) {
			if (res.code === 200) {
				this.addMenu.itemImg =
					this.global.imgPath + res.data.replace("img:", "");
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
			console.log(res);
			console.log(file);
		},
		beforeAvatarUpload(file) {
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
			const isPicSize = file.size / 1024 <= 80;
			if (!isPicSize) {
				this.$message.error("上传图片不能大于80KB");
			}
			return isSize && isPicSize;
		},
		savespu() {
			let qs = require("qs");
			let data = qs.stringify({
				itemName: this.addMenu.itemName,
				itemCate: this.addMenu.itemCate,
				itemImg: this.addMenu.itemImg,
				itemPrice: this.addMenu.itemPrice,
				itemWeight: this.addMenu.itemWeight,
				itemSpec: this.addMenu.itemSpec,
				cookingTime: this.addMenu.cookingTime,
				spicy: this.addMenu.spicy,
				des: this.addMenu.des,
				state: this.addMenu.state,
				recommendType: JSON.stringify(this.addMenu.recommendType)
			});
			this.Axios(
				{
					params: data,
					url: "/api-mall/mallManage/addItem",
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
		this.getClassfy();
	},
	components: {
		ueditor,
		areaList,
		dialogCoobook
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
}
</style>
