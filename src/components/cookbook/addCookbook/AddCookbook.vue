<template>
	<div class="add_cookbook">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>添加菜谱</h4>
			</div>
			<div class="table_list">
				<el-form
					label-width="200px"
					size="small"
					:model="cookbook"
					:rules="cookbookRules"
					ref="cookbook"
					:inline-message="true"
					style="margin-top: 20px;"
				>
					<el-form-item label="菜谱名称：" prop="recipeName">
						<el-input maxlength="20" size="small" style="width:400px;" v-model="cookbook.recipeName"></el-input>
					</el-form-item>
					<el-form-item label="菜谱分类：" prop="cateId">
						<el-cascader
							expand-trigger="hover"
							:options="classify"
							:props="showStyle"
							v-model="cookbook.cateId"
							@change="handleChange"
							style="width:400px;"
							:show-all-levels="false"
							ref="recipeCate"
							filterable
						></el-cascader>
					</el-form-item>
					<el-form-item label="菜谱价格：" prop="recipePrice">
						<el-input
							maxlength="20"
							size="small"
							style="width:400px;"
							type="number"
							placeholder="单位：元"
							v-model="cookbook.recipePrice"
							oninput="if(value.length>10)value=value.slice(0,10)"
						>
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="烹饪时长：" prop="cookingTime">
						<el-input
							size="small"
							style="width:400px;"
							placeholder="请填写整数"
							v-model="cookbook.cookingTime"
							maxlength="20"
							oninput="if(value.length>10)value=value.slice(0,10)"
						>
							<template slot="append">分</template>
						</el-input>
					</el-form-item>
					<el-form-item label="净含量：" prop="weight">
						<el-input
							size="small"
							style="width:400px;"
							placeholder="请填写整数"
							v-model="cookbook.weight"
							maxlength="20"
							oninput="if(value.length>10)value=value.slice(0,10)"
						>
							<template slot="append">克</template>
						</el-input>
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
					<el-form-item label="炒菜步骤：" prop="cookScript">
						<el-table
							:data="cookbook.cookScript"
							style="width: 800px"
							size="mini"
							:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
						>
							<el-table-column prop="number" label="序号" width="50"></el-table-column>
							<el-table-column prop="step" label="步骤" width="80"></el-table-column>
							<el-table-column prop="firepower" label="火力/油量" width="120">
								<template slot-scope="scope">
									<el-input
										size="mini"
										type="number"
										v-model.number="scope.row.firepower"
										style="width:100%;padding:0;"
										:placeholder="`${scope.$index!==1?'0~8':'0~1000(ml)'}`"
										@change="handleFirepower(scope.row,scope.$index)"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="firepowerTime" label="加热时间" width="120">
								<template slot-scope="scope" v-if="scope.row.number!=2">
									<el-input
										size="mini"
										type="number"
										v-model.number="scope.row.firepowerTime"
										style="width:100%;padding:0;"
										placeholder="0~7200（秒）"
										@change="handleFirepowerTime(scope.row,scope.$index)"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="mixingSpeed" label="搅拌速度" width="120">
								<template slot-scope="scope" v-if="scope.row.number!=2&&scope.row.number!=1">
									<el-input
										size="mini"
										type="number"
										v-model.number="scope.row.mixingSpeed"
										style="width:100%;padding:0;"
										placeholder="0~8"
										@change="handleMixingSpeed(scope.row,scope.$index)"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="reversing" label="换向圈数" width="120">
								<template slot-scope="scope" v-if="scope.row.number!=2&&scope.row.number!=1">
									<el-input
										size="mini"
										type="number"
										v-model.number="scope.row.reversing"
										style="width:100%;padding:0;"
										placeholder="0~32767"
										@change="handleReversing(scope.row,scope.$index)"
									></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="mixingTime" label="搅拌时间" width="120">
								<template slot-scope="scope" v-if="scope.row.number!=2&&scope.row.number!=1">
									<el-input
										size="mini"
										type="number"
										v-model.number="scope.row.mixingTime"
										style="width:100%;padding:0;"
										placeholder="0~7200（秒）"
										@change="handleMixingTime(scope.row,scope.$index)"
									></el-input>
								</template>
							</el-table-column>
						</el-table>
					</el-form-item>
					<el-form-item label="上/下架：" prop="state">
						<el-radio v-model="cookbook.state" label="0">是</el-radio>
						<el-radio v-model="cookbook.state" label="1">否</el-radio>
					</el-form-item>
					<el-form-item label="菜谱封面图：" prop="recipeImg">
						<el-upload
							:action="imgApi()"
							list-type="picture-card"
							:on-preview="handlePictureCardPreview1"
							:on-remove="handleRemove1"
							:on-success="handleAvatarSuccess1"
							:before-upload="beforeAvatarUpload1"
							:limit="1"
							class="upload_show"
							accept="image/png"
							:data="{type : 'recipe'}"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
						<div class="el-upload__tip tip_style">建议图片比例1:1，小于1MB的png图片</div>
						<el-dialog :visible.sync="dialogVisible" class="showPic">
							<img width="100%" :src="dialogImageUrl" alt />
						</el-dialog>
					</el-form-item>
					<el-form-item label="主料：" prop="ingredient">
						<el-input
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							class="textarea_style"
							placeholder="如：猪肉450克切片，青蒜苗3根切段，大葱2根切断。（100个字以内）"
							v-model="cookbook.ingredient"
							maxlength="100"
							resize="none"
						></el-input>
					</el-form-item>
					<el-form-item label="辅料：" prop="accessories">
						<el-input
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							class="textarea_style"
							placeholder="如：生姜1块，大蒜2瓣，豆瓣酱1勺，花椒10粒，生抽2勺。（100个字以内）"
							v-model="cookbook.accessories"
							maxlength="100"
							resize="none"
						></el-input>
					</el-form-item>
					<el-form-item label="菜谱介绍：" prop="introduce">
						<el-input
							class="textarea_style"
							size="small"
							style="width:600px;"
							type="textarea"
							rows="6"
							placeholder="选填（200个字以内）"
							maxlength="200"
							v-model="cookbook.introduce"
							resize="none"
						></el-input>
					</el-form-item>
					<el-form-item label="备料过程：" prop="step">
						<div style="width:686px;">
							<el-col
								:span="24"
								v-for="(item, index) in cookbook.step"
								:key="index"
								style="margin-bottom:12px;"
							>
								<el-col :span="3">
									<el-upload
										v-model="item.path"
										:action="imgApi()"
										list-type="picture-card"
										:on-preview="handlePictureCardPreview1"
										:on-remove="(res,file)=>{ return handleRemove(res,file,index)} "
										:on-success="(res,file)=>{ return handleAvatarSuccess(res,file,index)}"
										:limit="1"
										:before-upload="beforeAvatarUpload1"
										class="upload_show"
										accept="image/png, image/jpeg"
									>
										<i class="el-icon-plus"></i>
										<!-- <div slot="tip" class="el-upload__tip">600 × 600像素，≤80 KB的jpg图片</div> -->
									</el-upload>
									<!-- <el-dialog :visible.sync="dialogVisible" class="showPic">
										<img width="100%" :src="dialogImageUrl" alt>
									</el-dialog>-->
								</el-col>
								<el-col :span="18">
									<el-input
										size="small"
										style="width:100%;"
										type="textarea"
										class="textarea_style"
										rows="3"
										placeholder=" 如：将300克五花肉切成2厘米*2厘米的正方形，放入1号料盒…"
										maxlength="200"
										v-model="item.explain"
										resize="none"
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
						<el-button
							permCode="menu_add_lookup.menu_add_save"
							banType="disable"
							size="small"
							type="primary"
							@click="submitForm('cookbook')"
						>添加</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog
			title="绑定烹饪流程"
			:visible.sync="dialogScript"
			width="714px"
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
	inject: ["reload"],
	data() {
		return {
			dialogScript: false,
			cookbook: {
				processName: "",
				processId: "",
				recipeName: "",
				cateName: "",
				cookScript: [
					{
						number: 1,
						step: "热空锅",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 2,
						step: "加油",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 3,
						step: "热油",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 4,
						step: "炒料1",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 5,
						step: "炒料2",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 6,
						step: "炒料3",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					},
					{
						number: 7,
						step: "炒料4",
						firepower: null,
						firepowerTime: null,
						mixingSpeed: null,
						mixingTime: null,
						reversing: null
					}
				],
				cateId: [],
				cookingTime: "",
				spicy: "0",
				recipePrice: "",
				spec: "",
				weight: "",
				state: "1",
				recipeImg: "",
				ingredient: "",
				accessories: "",
				introduce: "",
				step: [
					{
						path: "",
						explain: "",
						plus: true,
						minus: false
					}
				]
			},
			cookbookRules: {
				cookScript: [
					{
						required: true,
						message: "请输入动作编码",
						trigger: "blur"
					}
				],
				cateId: [
					{
						required: true,
						message: "请选择分类",
						trigger: ["change", "blur"]
					},
					{
						validator: (rule, value, callback) => {
							if (value.length == 1) {
								if (
									this.classify
										.find(item => {
											return item.id === value[0];
										})
										.hasOwnProperty("children")
								) {
									callback(new Error("不能选择含有子项的分类"));
								} else {
									callback();
								}
							} else if (value.length > 1) {
								if (
									this.classify
										.find(item => {
											return item.id === value[0];
										})
										.children.find(i => {
											return i.id === value[value.length - 1];
										})
										.hasOwnProperty("children")
								) {
									callback(new Error("不能选择含有子项的分类"));
								} else {
									callback();
								}
							}
						},
						trigger: ["change", "blur"]
					}
				],
				recipeName: [
					{ required: true, message: "请输入菜谱名称", trigger: "blur" }
				],
				recipeImg: [
					{ required: true, message: "请上传图片", trigger: "change" }
				],
				recipePrice: [
					{
						required: true,
						message: "请输入菜谱价格",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (
								/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/g.test(
									value
								) == false
							) {
								callback(new Error("支持小数点后两位，且不能为负数"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				ingredient: [
					{
						required: true,
						message: "请输入主料",
						trigger: "blur"
					}
				],
				state: [
					{
						required: true,
						message: "请选择是否上/下架",
						trigger: "blur"
					}
				],
				weight: [
					{
						required: true,
						message: "请输入净含量",
						trigger: "blur"
					},
					{
						validator: (rule, value, callback) => {
							if (/(^[1-9]{1}[0-9]*$)/g.test(value) == false) {
								callback(new Error("请输入正整数,且不能为0"));
							} else {
								callback();
							}
						},
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
							if (/(^[1-9]{1}[0-9]*$)/g.test(value) == false) {
								callback(new Error("请输入正整数,且不能为0"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				spicy: [{ required: true, message: "请选择辣度", trigger: "blur" }],
				accessories: [
					{
						required: true,
						message: "请输入辅料",
						trigger: "blur"
					}
				]
			},
			classify: [
				{
					label: "猪肉",
					value: "2213"
				}
			],
			showStyle: {
				label: "cateName",
				value: "id"
			},
			dialogVisible: false,
			dialogImageUrl: ""
		};
	},
	methods: {
		handleFirepower(row, index) {
			if (
				(/^[0-9]{1,}[\d]*$/.test(row.firepower) == false ||
					row.firepower > 8) &&
				index !== 1
			) {
				this.$message.error("请填写0~8的正整数");
				this.cookbook.cookScript[index].firepower = null;
			} else if (
				index == 1 &&
				(/^[0-9]{1,}[\d]*$/.test(row.firepower) == false ||
					row.firepower > 1000)
			) {
				this.$message.error("请填写0~1000正整数");
				this.cookbook.cookScript[index].firepower = null;
			}
		},
		handleFirepowerTime(row, index) {
			if (/^[0-9]{1,}[\d]*$/.test(row.firepowerTime) == false) {
				this.$message.error("请填写0~7200的正整数");
				this.cookbook.cookScript[index].firepowerTime = null;
			} else if (row.firepowerTime > 7200) {
				this.$message.error("请填写0~7200的正整数");
				this.cookbook.cookScript[index].firepowerTime = null;
			}
		},
		handleMixingSpeed(row, index) {
			if (/^[0-9]{1,}[\d]*$/.test(row.mixingSpeed) == false) {
				this.$message.error("请填写0~8的正整数");
				this.cookbook.cookScript[index].mixingSpeed = null;
			} else if (row.mixingSpeed > 8) {
				this.$message.error("请填写0~8的正整数");
				this.cookbook.cookScript[index].mixingSpeed = null;
			}
		},
		handleMixingTime(row, index) {
			if (/^[0-9]{1,}[\d]*$/.test(row.mixingTime) == false) {
				this.$message.error("请填写0~7200的正整数");
				this.cookbook.cookScript[index].mixingTime = null;
			} else if (row.mixingTime > 7200) {
				this.$message.error("请填写0~7200的正整数");
				this.cookbook.cookScript[index].mixingTime = null;
			}
		},
		handleReversing(row, index) {
			if (/^[+]{0,1}(\d+)$/.test(row.reversing) == false) {
				this.$message.error("请填写0~32767的正整数");
				this.cookbook.cookScript[index].reversing = null;
			} else if (row.reversing > 32767) {
				this.$message.error("请填写0~32767的正整数");
				this.cookbook.cookScript[index].reversing = null;
			}
		},
		submitForm(formName) {
			if (
				this.cookbook.cookScript
					.map(item => {
						return item.firepower == "" || item.firepower == null;
					})
					.find(item => {
						return item == true;
					})
			) {
				this.$message.error("请填写完整炒菜步骤！");
			} else if (
				this.cookbook.cookScript[0].firepowerTime == "" ||
				this.cookbook.cookScript[0].firepowerTime == null ||
				this.cookbook.cookScript[2].firepowerTime == "" ||
				this.cookbook.cookScript[2].firepowerTime == null ||
				this.cookbook.cookScript[3].firepowerTime == "" ||
				this.cookbook.cookScript[3].firepowerTime == null ||
				this.cookbook.cookScript[4].firepowerTime == "" ||
				this.cookbook.cookScript[4].firepowerTime == null ||
				this.cookbook.cookScript[5].firepowerTime == "" ||
				this.cookbook.cookScript[5].firepowerTime == null ||
				this.cookbook.cookScript[6].firepowerTime == "" ||
				this.cookbook.cookScript[6].firepowerTime == null
			) {
				this.$message.error("请填写完整炒菜步骤！");
			} else if (
				this.cookbook.cookScript[2].mixingSpeed == "" ||
				this.cookbook.cookScript[2].mixingSpeed == null ||
				this.cookbook.cookScript[3].mixingSpeed == "" ||
				this.cookbook.cookScript[3].mixingSpeed == null ||
				this.cookbook.cookScript[4].mixingSpeed == "" ||
				this.cookbook.cookScript[4].mixingSpeed == null ||
				this.cookbook.cookScript[5].mixingSpeed == "" ||
				this.cookbook.cookScript[5].mixingSpeed == null ||
				this.cookbook.cookScript[6].mixingSpeed == "" ||
				this.cookbook.cookScript[6].mixingSpeed == null
			) {
				this.$message.error("请填写完整炒菜步骤！");
			} else if (
				this.cookbook.cookScript[2].mixingTime == "" ||
				this.cookbook.cookScript[2].mixingTime == null ||
				this.cookbook.cookScript[3].mixingTime == "" ||
				this.cookbook.cookScript[3].mixingTime == null ||
				this.cookbook.cookScript[4].mixingTime == "" ||
				this.cookbook.cookScript[4].mixingTime == null ||
				this.cookbook.cookScript[5].mixingTime == "" ||
				this.cookbook.cookScript[5].mixingTime == null ||
				this.cookbook.cookScript[6].mixingTime == "" ||
				this.cookbook.cookScript[6].mixingTime == null
			) {
				this.$message.error("请填写完整炒菜步骤！");
			} else if (
				this.cookbook.cookScript[2].reversing == "" ||
				this.cookbook.cookScript[2].reversing == null ||
				this.cookbook.cookScript[3].reversing == "" ||
				this.cookbook.cookScript[3].reversing == null ||
				this.cookbook.cookScript[4].reversing == "" ||
				this.cookbook.cookScript[4].reversing == null ||
				this.cookbook.cookScript[5].reversing == "" ||
				this.cookbook.cookScript[5].reversing == null ||
				this.cookbook.cookScript[6].reversing == "" ||
				this.cookbook.cookScript[6].reversing == null
			) {
				this.$message.error("请填写完整炒菜步骤！");
			} else {
				this.$refs[formName].validate(valid => {
					if (valid) {
						this.addRecipe();
					} else {
						return false;
					}
				});
			}
		},
		addItem(index) {
			let obj = {
				path: "",
				explain: "",
				plus: true,
				minus: true
			};
			this.cookbook.step.push(obj);
			this.cookbook.step[index].plus = false;
			this.cookbook.step[index].minus = false;
		},
		removeItem(index) {
			this.cookbook.step.pop();
			this.cookbook.step[index - 1].plus = true;
			this.cookbook.step[index - 1].minus = true;
			this.cookbook.step[0].minus = false;
		},
		imgApi() {
			let url = this.global.apiImg + "/api-upload/upload";
			return url;
		},
		handleAvatarSuccess(res, file, index) {
			if (res.code === 200) {
				this.cookbook.step[index].path = res.data;
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
		dialogScriptHide(params) {
			this.dialogScript = params.isHide;
			this.cookbook.processName = params.value.name;
			this.cookbook.processId = params.value.id;
		},
		handleRemove(file, fileList, index) {
			this.cookbook.step[index].path = "";
		},
		handleRemove1(file, fileList) {
			this.cookbook.recipeImg = null;
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
				this.cookbook.recipeImg = res.data;
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
		getClassifyList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/recipeCate/listCate"
				},
				this
			).then(
				result => {
					for (let i = 0; i < result.data.data.length; i++) {
						result.data.data[i].visible = false;
					}
					if (result.data.code === 200) {
						let arr = Math.min.apply(
							null,
							result.data.data.map(item => {
								return item.parentNo;
							})
						);
						this.classify = this.filterArray(result.data.data, arr);
					}
				},
				({ type, info }) => {}
			);
		},
		handleChange(value) {
			// let labels = this.$refs["recipeCate"].currentLabels;
			// console.log(this.$refs["recipeCate"].currentLabels);
			let labels = this.classify.find(item => item.id == value.join(","));
			this.cookbook.cateName = labels.cateName;
		},
		filterArray(data, parent) {
			let vm = this;
			var tree = [];
			var temp;
			for (var i = 0; i < data.length; i++) {
				if (data[i].parentNo == parent) {
					var obj = data[i];
					temp = this.filterArray(data, data[i].cateNo);
					if (temp.length > 0) {
						obj.children = temp;
					}
					tree.push(obj);
				}
			}
			return tree;
		},
		addRecipe() {
			let z = this.cookbook.cookScript;
			let x =
				z[0].firepower +
				"/" +
				z[0].firepowerTime +
				"|" +
				z[1].firepower +
				"|" +
				z[2].firepower +
				"/" +
				z[2].firepowerTime +
				"/" +
				z[2].mixingSpeed +
				"/" +
				z[2].reversing +
				"/" +
				z[2].mixingTime +
				"|" +
				z[3].firepower +
				"/" +
				z[3].firepowerTime +
				"/" +
				z[3].mixingSpeed +
				"/" +
				z[3].reversing +
				"/" +
				z[3].mixingTime +
				"|" +
				z[4].firepower +
				"/" +
				z[4].firepowerTime +
				"/" +
				z[4].mixingSpeed +
				"/" +
				z[4].reversing +
				"/" +
				z[4].mixingTime +
				"|" +
				z[5].firepower +
				"/" +
				z[5].firepowerTime +
				"/" +
				z[5].mixingSpeed +
				"/" +
				z[5].reversing +
				"/" +
				z[5].mixingTime +
				"|" +
				z[6].firepower +
				"/" +
				z[6].firepowerTime +
				"/" +
				z[6].mixingSpeed +
				"/" +
				z[6].reversing +
				"/" +
				z[6].mixingTime;
			let qs = require("qs");
			let data = qs.stringify({
				cookScript: x,
				recipeName: this.cookbook.recipeName,
				cateName: this.cookbook.cateName,
				cateId: this.cookbook.cateId.join(","),
				cookingTime: this.cookbook.cookingTime,
				spicy: this.cookbook.spicy,
				recipePrice: this.cookbook.recipePrice * 100,
				state: this.cookbook.state,
				recipeImg: this.cookbook.recipeImg,
				ingredient: this.cookbook.ingredient,
				accessories: this.cookbook.accessories,
				introduce: this.cookbook.introduce,
				weight: this.cookbook.weight,
				step: JSON.stringify(this.cookbook.step),
				cookJson: JSON.stringify(this.cookbook.cookScript)
			});
			this.Axios(
				{
					params: data,
					url: "/api-recipe/recipe/add",
					type: "post",
					option: {
						successMsg: "添加成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.$router.back(-1);
					// this.reload();
				} else {
					this.$message.error("添加失败,请重新尝试");
				}
			});
		}
	},
	created() {
		this.getClassifyList();
	},
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
