<template>
	<div class="add_cookbook">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>修改菜谱</h4>
			</div>
			<div class="table_list">
				<el-form label-width="200px" size="small">
					<el-form-item label="烹饪流程：">
						<el-input
							size="small"
							style="width:400px;"
							v-model="cookbook.menuScript"
							@focus="dialogScript=true"
							placeholder="请选择"
							suffix-icon="el-icon-arrow-down"
						></el-input>
					</el-form-item>
					<el-form-item label="菜谱分类：">
						<el-select size="small" style="width:400px;" v-model="cookbook.classify">
							<el-option
								v-for="item in classify"
								:key="item.value"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="菜谱名称：">
						<el-input size="small" style="width:400px;" v-model="cookbook.name"></el-input>
					</el-form-item>
					<el-form-item label="烹饪时长：">
						<el-input
							size="small"
							:disabled="true"
							style="width:400px;"
							placeholder="单位：分钟"
							v-model="cookbook.time"
						></el-input>
					</el-form-item>
					<el-form-item label="参考辣度：" class="hot_case" prop="spicy">
						<el-radio-group v-model="cookbook.spicy" size="small" style="width:192px;">
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
						<span>
							<span v-if="cookbook.spicy==0">无辣</span>
							<span v-if="cookbook.spicy==1">微辣</span>
							<span v-if="cookbook.spicy==2">中辣</span>
							<span v-if="cookbook.spicy==3">特辣</span>
						</span>
					</el-form-item>
					<el-form-item label="菜谱价格：">
						<el-input size="small" style="width:400px;" placeholder="单位：元" v-model="cookbook.price"></el-input>
					</el-form-item>
					<el-form-item label="净含量：" prop="itemWeight">
						<el-input
							v-model.number="cookbook.itemWeight"
							type="number"
							size="small"
							style="width:400px;"
							placeholder="单位：克"
							step="1"
						></el-input>
					</el-form-item>
					<el-form-item label="食材搭配：" prop="itemSpec">
						<el-input
							v-model="cookbook.itemSpec"
							type="text"
							size="small"
							style="width:400px;"
							placeholder=" 如：精选五花肉，青椒，蒜片，姜片"
						></el-input>
					</el-form-item>
					<el-form-item label="上/下架：" prop="state">
						<el-radio v-model="cookbook.state" label="1">是</el-radio>
						<el-radio v-model="cookbook.state" label="2">否</el-radio>
					</el-form-item>
					<el-form-item label="菜谱配图：">
						<el-upload
							action="https://jsonplaceholder.typicode.com/posts/"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview"
							:on-remove="handleRemove"
						>
							<i class="el-icon-plus"></i>
							<div slot="tip" class="el-upload__tip">600 × 600像素，≤80 KB的jpg图片</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt>
						</el-dialog>
					</el-form-item>
					<el-form-item label="主料：">
						<el-input
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							class="textarea_style"
							placeholder="如：猪肉450克切片，青蒜苗3根切段，大葱2根切断。"
							v-model="cookbook.mainIngredient"
						></el-input>
					</el-form-item>
					<el-form-item label="辅料：">
						<el-input
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							class="textarea_style"
							placeholder="如：生姜1块，大蒜2瓣，豆瓣酱1勺，花椒10粒，生抽2勺。"
							v-model="cookbook.ingredients"
						></el-input>
					</el-form-item>
					<el-form-item label="菜谱介绍：">
						<el-input
							class="textarea_style"
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							placeholder="（选填）"
							v-model="cookbook.introduce"
						></el-input>
					</el-form-item>
					<el-form-item label="步骤说明：">
						<div style="width:686px;">
							<el-col
								:span="24"
								v-for="(item, index) in cookbook.imgPath"
								:key="index"
								style="margin-bottom:12px;"
							>
								<el-col :span="3">
									<el-upload
										v-model="item.path"
										:action="imgApi()"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview"
										:on-remove="(res,file)=>{ return handleRemove(res,file,index)} "
										:on-success="(res,file)=>{ return handleAvatarSuccess(res,file,index)}"
										:limit="1"
										class="upload_show"
									>
										<i class="el-icon-plus"></i>
										<!-- <div slot="tip" class="el-upload__tip">600 × 600像素，≤80 KB的jpg图片</div> -->
									</el-upload>
									<el-dialog :visible.sync="dialogVisible" class="showPic">
										<img width="100%" :src="dialogImageUrl" alt>
									</el-dialog>
								</el-col>
								<el-col :span="18">
									<el-input
										size="small"
										style="width:100%;"
										type="textarea"
										class="textarea_style"
										rows="3"
										placeholder="（说明）"
										v-model="item.explain"
									></el-input>
								</el-col>
								<el-col :span="3" style="padding:0 8px;line-height:80px;">
									<i
										v-show="item.plus"
										class="el-icon-plus"
										style="font-size:20px;font-weight:600;color:#1cc09f;cursor: pointer;"
										@click="addItem(index)"
									></i>
									<i
										v-show="item.minus"
										class="el-icon-minus"
										style="font-size:20px;font-weight:600;color:#1cc09f;cursor: pointer;"
										@click="removeItem(index)"
									></i>
								</el-col>
							</el-col>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog
			title="绑定菜谱脚本"
			:visible.sync="dialogScript"
			width="600px"
			:close-on-click-modal="false"
		>
			<div style="overflow:hidden;margin-top:16px;">
				<dialog-script v-on:dialogScriptHide="dialogScriptHide"></dialog-script>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import DialogScript from "./DialogScript";
export default {
	data() {
		return {
			dialogScript: false,
			cookbook: {
				spicy: "0",
				name: "",
				classify: "",
				menuScript: "",
				time: "",
				pic: "",
				mainIngredient: "",
				ingredients: "",
				introduce: "",
				price: "",
				imgPath: [
					{
						path: "",
						explain: "",
						plus: true,
						minus: false
					}
				]
			},
			classify: [
				{
					label: "猪肉",
					value: "2213"
				}
			],
			dialogVisible: false,
			dialogImageUrl: ""
		};
	},
	methods: {
		addItem(index) {
			let obj = {
				path: "",
				explain: "",
				plus: true,
				minus: true
			};
			this.cookbook.imgPath.push(obj);
			this.cookbook.imgPath[index].plus = false;
			this.cookbook.imgPath[index].minus = false;
		},
		removeItem(index) {
			this.cookbook.imgPath.pop();
			this.cookbook.imgPath[index - 1].plus = true;
			this.cookbook.imgPath[index - 1].minus = true;
			this.cookbook.imgPath[0].minus = false;
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleAvatarSuccess(res, file, index) {
			if (res.code === 200) {
				this.cookbook.imgPath[index].path =
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
			console.log(a);
			// console.log(file);
		},
		dialogScriptHide(params) {
			this.dialogScript = params.isHide;
			this.cookbook.menuScript = params.value;
		},
		handleRemove(file, fileList, index) {
			console.log(file, fileList);
			this.cookbook.imgPath[index].path = "";
			console.log(index);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
	},
	created() {},
	components: {
		DialogScript
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
.add_cookbook {
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