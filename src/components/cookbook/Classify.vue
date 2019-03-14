<template>
	<div class="cookbook_classify">
		<div class="top_list">
			<el-button
				size="small"
				type="primary"
				class="el-icon-circle-plus-outline"
				@click="dialogAdd=true"
			>添加分类</el-button>
			<el-dialog title="添加分类" :visible.sync="dialogAdd" width="500px" :close-on-click-modal="false">
				<el-form
					label-width="100px"
					style="margin-top:16px;"
					:model="classify"
					:rules="classifyRules"
					ref="classify"
				>
					<el-form-item label="上级分类：" prop="label">
						<el-input
							size="small"
							style="width:99%;"
							suffix-icon="el-icon-caret-bottom"
							@focus="selectShow=true"
							v-model="classify.label"
						></el-input>
					</el-form-item>
					<el-form-item label="分类名称：" prop="cateName">
						<el-input size="small" style="width:99%;" v-model="classify.cateName"></el-input>
					</el-form-item>
					<div class="select_case" v-show="selectShow" v-clickoutside="handleClose">
						<select-list v-on:handlechange="handlechange"></select-list>
					</div>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogAdd = false" plain size="small">取 消</el-button>
					<el-button type="primary" @click="addClassify('classify')" size="small">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="bottom_list">
			<div class="top_list">
				<h2>菜谱分类</h2>
			</div>
			<div style="padding:10px;overflow:hidden">
				<div class="tree_title">
					<span style="padding-left:8px;">分类名称</span>
					<span style="display:inline-block;width:190px;">操作</span>
				</div>
				<el-tree
					:data="classifyData"
					:props="defaultProps"
					node-key="id"
					default-expand-all
					:expand-on-click-node="true"
				>
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span style="display:inline-block;width:190px;" @click.stop>
							<el-button type="text" size="mini" @click="() => append(data)">修改</el-button>

							<!-- <el-button type="text" size="mini" @click="() => remove(node, data)">删除</el-button> -->
							<el-popover placement="top" width="180" v-model="data.visible">
								<p style="line-height:32px;text-align:center;">
									<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
								</p>
								<div style="text-align: center; margin: 0">
									<el-button size="small" plain @click="data.visible = false">取消</el-button>
									<el-button type="primary" size="small" @click="() => remove(node, data)">确定</el-button>
								</div>
								<el-button slot="reference" type="text">删除</el-button>
							</el-popover>
						</span>
					</span>
				</el-tree>
			</div>
		</div>
		<el-dialog title="修改分类" :visible.sync="dialogEdit" width="500px" :close-on-click-modal="false">
			<el-form
				label-width="100px"
				style="margin-top:16px;"
				:model="editClassify"
				:rules="editClassifyRules"
				ref="editClassify"
			>
				<!-- <el-form-item label="上级分类：">
					<el-input
						size="small"
						style="width:99%;"
						suffix-icon="el-icon-caret-bottom"
						@focus="selectShow=true"
						v-model="editClassify.cateName"
						:disabled="true"
					></el-input>
				</el-form-item>-->
				<el-form-item label="分类名称：" prop="cateName">
					<el-input size="small" style="width:99%;" v-model="editClassify.cateName"></el-input>
				</el-form-item>
				<!-- <div class="select_case" v-show="selectShow" v-clickoutside="handleClose">
					<select-list v-on:handlechange="handlechange"></select-list>
				</div>-->
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit = false" plain size="small">取 消</el-button>
				<el-button type="primary" @click="handeditClassify('editClassify')" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
import selectList from "../public/select";
export default {
	inject: ["reload"],
	data() {
		return {
			visible: false,
			classify: {
				label: "",
				parentNo: "",
				cateName: ""
			},
			classifyRules: {
				label: [
					{
						required: true,
						message: "请选择上级分类",
						trigger: ["change", "blur"]
					}
				],
				cateName: [
					{ required: true, message: "请填写分类名称", trigger: "blur" }
				]
			},
			editClassify: {},
			editClassifyRules: {
				cateName: [
					{ required: true, message: "请填写分类名称", trigger: "blur" }
				]
			},
			selectShow: false,
			dialogAdd: false,
			dialogEdit: false,
			classifyData: [
				{
					label: "第一级",
					children: [
						{
							id: 7,
							label: "二级 3-1",
							children: [
								{
									id: 7,
									label: "三级 3-1"
								}
							]
						}
					]
				},
				{
					label: "第一级"
				}
			],
			defaultProps: {
				children: "children",
				label: "cateName"
			}
		};
	},
	methods: {
		handeditClassify(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.dialogEdit = false;
					let qs = require("qs");
					let data = qs.stringify({
						cateId: this.editClassify.id,
						cateName: this.editClassify.cateName
					});
					this.Axios(
						{
							params: data,
							url: "/api-recipe/recipeCate/updateCate",
							type: "post",
							option: {
								successMsg: "修改成功"
							}
						},
						this
					).then(result => {
						if (result.data.code === 200) {
							this.reload();
						}
					});
				} else {
					return false;
				}
			});
		},
		addClassify(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.dialogAdd = false;
					let qs = require("qs");
					let data = qs.stringify({
						parentNo: this.classify.parentNo,
						cateName: this.classify.cateName
					});
					this.Axios(
						{
							params: data,
							url: "/api-recipe/recipeCate/addCate",
							type: "post",
							option: {
								successMsg: "保存成功"
							}
						},
						this
					).then(result => {
						if (result.data.code === 200) {
							this.reload();
						}
					});
				} else {
					return false;
				}
			});
		},
		handleClose() {
			this.selectShow = false;
		},
		changeSort(data) {
			console.log(data);
		},
		handleClick(tba, event) {
			this.btnShow = tba.name;
		},
		append(data) {
			console.log(data);
			this.dialogEdit = true;
			Object.assign(this.editClassify, data);
		},
		remove(node, val) {
			console.log(val);
			let qs = require("qs");
			let data = qs.stringify({
				cateId: val.id
			});
			this.Axios(
				{
					params: data,
					url: "/api-recipe/recipeCate/delCate",
					type: "post",
					option: {
						successMsg: "删除成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.reload();
				}
			});
		},
		handlechange(params) {
			this.selectShow = false;
			this.classify.label = params.cateName;
			this.classify.parentNo = params.cateNo;
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
						this.classifyData = this.filterArray(result.data.data, arr);
					}
				},
				({ type, info }) => {}
			);
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
		}
	},
	created() {
		this.getClassifyList();
	},
	components: {
		selectList
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
.cookbook_classify {
	font-size: 14px;
	color: @font-normal;
	.top_list {
		background-color: white;
		padding: 10px;
	}
	.bottom_list {
		background-color: white;
		margin-top: 10px;
		padding: 10px 0;
		.top_list {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
		.tree_title {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding-right: 8px;
			line-height: 40px;
			background-color: #f1f1f1;
		}
		.el-tree-node__content {
			height: 40px;
		}
	}
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	h2 {
		line-height: 40px;
	}
}
.select_case {
	background-color: white;
	height: 150px;
	width: 363px;
	overflow: scroll;
	border: @border;
	border-color: #1cc09f;
	position: absolute;
	top: 92px;
	left: 116px;
}
</style>
