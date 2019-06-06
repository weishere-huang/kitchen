<template>
	<div class="cookbook_classify">
		<div class="top_list">
			<el-button
				permCode="menu_cate_lookup.menu_cate_add"
				banType="disable"
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
					<el-form-item label="上级分类：" prop="parentNo">
						<el-cascader
							expand-trigger="hover"
							:options="data"
							:props="defaultProps1"
							v-model="classify.parentNo"
							@change="handleChange"
							:show-all-levels="false"
							change-on-select
							ref="selectValue"
							style="width:99%;"
							size="small"
						></el-cascader>
					</el-form-item>
					<el-form-item label="分类名称：" prop="cateName">
						<el-input size="small" style="width:99%;" maxlength="20" v-model="classify.cateName"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="resetForm('classify')" plain size="small">取 消</el-button>
					<el-button type="primary" @click="addClassify('classify')" size="small">确 定</el-button>
				</span>
			</el-dialog>
		</div>
		<div class="bottom_list">
			<div class="top_list">
				<h2>分类管理</h2>
			</div>
			<div style="padding:10px;overflow:hidden">
				<div class="tree_title">
					<span style="padding-left:8px;">分类名称</span>
					<span>
						<span style="display:inline-block;width:190px;">排序</span>
						<span style="display:inline-block;width:190px;">操作</span>
					</span>
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
						<span style="display:inline-block;width:385px;" @click.stop>
							<span style="margin-right:90px;">
								<el-input
									size="small"
									type="number"
									@focus="getFocusData(data)"
									v-model="sortChange=data.sortLevel"
									style="width:100px;"
									@change="changeSort(sortChange)"
								></el-input>
							</span>
							<el-button
								permCode="menu_cate_lookup.menu_cate_update"
								banType="disable"
								type="text"
								size="mini"
								@click="() => append(data)"
							>修改</el-button>
							<el-popover placement="top" width="180" v-model="data.visible">
								<p style="line-height:32px;text-align:center;">
									<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
								</p>
								<div style="text-align: center; margin: 0">
									<el-button size="small" plain @click="data.visible = false">取消</el-button>
									<el-button type="primary" size="small" @click="() => remove(node, data)">确定</el-button>
								</div>
								<el-button
									permCode="menu_cate_lookup.menu_cate_delete"
									banType="disable"
									slot="reference"
									type="text"
								>删除</el-button>
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
				<el-form-item label="分类名称：" prop="cateName">
					<el-input size="small" maxlength="20" style="width:99%;" v-model="editClassify.cateName"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit=false" plain size="small">取 消</el-button>
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
			sortChange: "",
			cookbook: [],
			data: [{ cateName: "顶级分类", no: "0" }],
			visible: false,
			classify: {
				label: "",
				parentNo: [],
				cateName: ""
			},
			classifyRules: {
				parentNo: [
					{
						required: true,
						message: "请选择上级分类",
						trigger: ["change", "blur"]
					},
					{
						validator: (rule, value, callback) => {
							if (value.length >= 3) {
								callback(new Error("不能为第三级添加分类"));
							} else {
								callback();
							}
						},
						trigger: ["change", "blur"]
					}
				],
				cateName: [
					{ required: true, message: "请填写分类名称", trigger: "blur" },
					{ max: 8, message: "只能输入8个以内汉字" }
				]
			},
			editClassify: {
				cateName: ""
			},
			editClassifyRules: {
				cateName: [
					{ required: true, message: "请填写分类名称", trigger: "blur" },
					{ max: 8, message: "只能输入8个以内汉字" }
				]
			},
			selectShow: false,
			dialogAdd: false,
			dialogEdit: false,
			classifyData: [],
			defaultProps: {
				children: "child",
				label: "cateName"
			},
			defaultProps1: {
				children: "child",
				label: "cateName",
				value: "no"
			}
		};
	},
	methods: {
		resetForm(formName) {
			this.$refs[formName].resetFields();
			this.dialogAdd = false;
		},
		handleChange(value) {
			console.log(value);
		},
		handeditClassify(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.dialogEdit = false;
					let qs = require("qs");
					let data = qs.stringify({
						cateId: this.editClassify.id,
						cateName: this.editClassify.cateName,
						sortLevel: this.editClassify.sortLevel
					});
					this.Axios(
						{
							params: data,
							url: "/api-mall/itemCat/updateCate",
							type: "post",
							option: {
								successMsg: "修改成功"
							}
						},
						this
					).then(result => {
						if (result.data.code === 200) {
							this.getClassifyList();
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
						parentNo: this.classify.parentNo[this.classify.parentNo.length - 1],
						cateName: this.classify.cateName
					});
					this.Axios(
						{
							params: data,
							url: "/api-mall/itemCat/addItemCate",
							type: "post",
							option: {
								successMsg: "保存成功"
							}
						},
						this
					).then(result => {
						if (result.data.code === 200) {
							this.getClassifyList();
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
		changeSort(sort) {
			this.editClassify.sortLevel = sort;
			let qs = require("qs");
			let data = qs.stringify({
				cateId: this.editClassify.id,
				cateName: this.editClassify.cateName,
				sortLevel: this.editClassify.sortLevel
			});
			this.Axios(
				{
					params: data,
					url: "/api-mall/itemCat/updateCate",
					type: "post",
					option: {
						successMsg: "修改成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.getClassifyList();
				}
			});
		},
		handleClick(tba, event) {
			this.btnShow = tba.name;
		},
		getFocusData(data) {
			Object.assign(this.editClassify, data);
		},
		append(data) {
			this.dialogEdit = true;
			Object.assign(this.editClassify, data);
		},
		remove(node, val) {
			console.log(val);
			if (val.child) {
				this.$message.error("不能删除含有子类的分类");
				val.visible = false;
				return;
			}
			let qs = require("qs");
			let data = qs.stringify({
				cateId: val.id
			});
			this.Axios(
				{
					params: data,
					url: "/api-mall/itemCat/delCate",
					type: "post",
					option: {
						successMsg: "删除成功"
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.getClassifyList();
				}
			});
		},
		handlechange(params) {
			this.selectShow = false;
			// this.classify.label = params.cateName;
			// this.classify.parentNo = params.cateNo;
			this.classify.parentNo = params;
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
						this.classifyData = result.data.data[0];
						this.data = this.data.concat(result.data.data[0]);
						console.log(this.data);
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
					temp = this.filterArray(data, data[i].no);
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
	},
	watch: {
		dialogAdd() {
			if (this.dialogAdd === false) {
				this.classify.cateName = "";
			}
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
