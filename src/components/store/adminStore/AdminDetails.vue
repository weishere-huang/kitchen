<template>
	<div class="edit_menu">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>商品详情</h4>
			</div>
			<el-form label-width="200px" size="small" :inline-message="true" :model="addMenu">
				<el-form-item label="商品名称：" prop="recipeName">
					<span>{{addMenu.title}}</span>
				</el-form-item>
				<el-form-item label="商品分类：" prop="recipeName">
					<span>{{addMenu.cateName}}</span>
				</el-form-item>
				<el-form-item label="价格：" prop="recipeName">
					<span>{{addMenu.price}}</span>
				</el-form-item>
				<el-form-item label="上/下架：" prop="recipeName">
					<span>{{addMenu.isShelf==1?'上架':'下架'}}</span>
				</el-form-item>
				<el-form-item label="是否推荐：" prop="recipeName">
					<span>{{addMenu.isRecommend==2?'是':'否'}}</span>
				</el-form-item>
				<el-form-item label="商品缩略图：" prop="recipeName">
					<img
						style="width:80px;height:80px"
						@click="handlePictureCardPreview1(global.imgPath+addMenu.img.replace('img:',''))"
						:src="global.imgPath+addMenu.img.replace('img:','')"
						alt
					>
				</el-form-item>
				<el-form-item label="商品详情：" prop="recipeName">
					<div style="width:800px;" v-html="addMenu.info"></div>
				</el-form-item>
			</el-form>
		</div>

		<el-dialog :visible.sync="dialogVisible" class="showPic">
			<img width="100%" :src="dialogImageUrl" alt>
		</el-dialog>
	</div>
</template>
<script>
import Preview from "../preview/Preview";
import addCookbook from "../addCookbook/addCookbook";
export default {
	inject: ["reload"],
	data() {
		return {
			filelist: [],
			addMenu: {
				title: "",
				description: "",
				price: "",
				stockNow: "",
				isRecommend: "",
				isShelf: "",
				img: "",
				info: ""
			},
			dialogImageUrl: "",
			dialogVisible: false
		};
	},
	methods: {
		handlePictureCardPreview1(file) {
			this.dialogImageUrl = file;
			this.dialogVisible = true;
		},
		findOne(id) {
			this.Axios(
				{
					params: {
						id: id,
						source: 2
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/product/productInfo"
				},
				this
			).then(
				result => {
					this.addMenu = result.data.data.product;
					// this.getParent(this.classify, result.data.data.product.cateId);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.findOne(this.$route.params.id);
	},
	watch: {},
	mounted() {},
	components: {
		addCookbook,
		Preview
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
.edit_menu {
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
						color: #333333;
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
		.el-input.is-disabled .el-input__inner {
			color: #333333;
		}
		.el-radio__input.is-disabled + span.el-radio__label {
			color: #333333;
		}
		.el-checkbox__input.is-disabled + span.el-checkbox__label {
			color: #333333;
		}
		.el-textarea.is-disabled .el-textarea__inner {
			color: #333333;
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
