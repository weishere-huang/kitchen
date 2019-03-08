<template>
	<div class="classify_list">
		<div class="top_list">
			<el-button
				size="small"
				type="primary"
				class="el-icon-circle-plus-outline"
				@click="dialogVisible=true"
			>添加分类</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>商品分类</h4>
			</div>
			<div class="table_list">
				<el-table
					:data="tableData"
					style="width: 100%"
					size="mini"
					stripe
					tooltip-effect="light"
					:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
				>
					<el-table-column label="分类名称" min-width="120" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.cateName }}</span>
						</template>
					</el-table-column>
					<el-table-column label="商品数量" min-width="120" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{ scope.row.goodsCount }}</span>
						</template>
					</el-table-column>
					<el-table-column label="排序" min-width="100" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-popover
								popper-class="color_text"
								ref="popover2"
								placement="right"
								trigger="focus"
								content="数值越大排序越靠前"
							></el-popover>
							<el-input
								v-popover:popover2
								size="small"
								type="number"
								step="0"
								v-model="scope.row.sortLevel"
								style="width:80px;padding:0;"
								@change="handleSortLevel(scope.row,scope.$index)"
							></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150">
						<template slot-scope="scope">
							<el-button
								type="text"
								size="mini"
								@click.stop.prevent="handleEdit(scope.$index, scope.row)"
							>修改</el-button>
							<el-popover placement="top" width="180" v-model="scope.row.visible">
								<p style="line-height:32px;text-align:center;">
									<i class="el-icon-warning" style="color:#e6a23c;font-size:18px;margin-right:8px;"></i>确定删除吗？
								</p>
								<div style="text-align: center; margin: 0">
									<el-button size="small" plain @click="scope.row.visible = false">取消</el-button>
									<el-button type="primary" size="small" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
								</div>
								<el-button slot="reference" type="text">删除</el-button>
							</el-popover>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog title="添加分类" :visible.sync="dialogVisible" width="500px">
			<el-form label-width="120px" style="padding-top:10px;" size="small" :model="addClassifyName">
				<el-form-item
					label="分类名称："
					prop="classifyName"
					:rules="{ required: true, message: '名称不能为空', trigger: 'blur'}"
				>
					<el-input type="text" size="small" style="width:90%;" v-model="addClassifyName.classifyName"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="dialogVisible = false" plain>取 消</el-button>
				<el-button size="small" type="primary" @click="addClassify">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="修改分类" :visible.sync="editClassify" width="500px">
			<el-form label-width="120px" style="padding-top:10px;" size="small" :model="editMsg">
				<el-form-item
					label="分类名称："
					prop="cateName"
					:rules="{ required: true, message: '名称不能为空', trigger: ['blur' ,'change']}"
				>
					<el-input type="text" size="small" style="width:90%;" v-model="editMsg.cateName"></el-input>
				</el-form-item>
				<el-form-item
					label="排序："
					prop="sortLevel"
					:rules="[{type: 'number', message: '只能输入正整数', trigger:  'change'},{validator:validator,trigger:['blur','change']}]"
				>
					<el-input type="number" size="small" style="width:50%;" v-model.number="editMsg.sortLevel"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button size="small" @click="editClassify = false" plain>取 消</el-button>
				<el-button size="small" type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			editMsg: {
				sortLevel: "",
				cateName: ""
			},
			addClassifyName: {
				classifyName: ""
			},
			editClassify: false,
			isShow: "1",
			dialogVisible: false,
			value: "",
			tableData: [
				{
					name: "炒菜",
					price: "9.8",
					classify: "素菜",
					number: "10",
					time: "5",
					content: "400克",
					show: "0",
					new: "0",
					hot: "1",
					sort: "100"
				}
			]
		};
	},
	methods: {
		handleSortLevel(row, index) {
			if (/^[0-9]*[1-9][0-9]*$/.test(row.sortLevel)) {
				this.editMsg = row;
				this.saveEdit();
			} else {
				this.$message.error("排序只能为正整数，请重新输入");
				this.getClassfy();
			}
		},
		validator(rule, value, callback) {
			if (/^\d*(\.?\d{0,0})$/g.test(value) == false) {
				callback(new Error("只能为正整数"));
			} else {
				callback();
			}
		},
		addClassify() {
			if (this.addClassifyName.classifyName == "") {
				this.$message.error("名称不能为空！");
			} else {
				let qs = require("qs");
				let datas = qs.stringify({
					cateName: this.addClassifyName.classifyName
				});
				this.Axios(
					{
						params: datas,
						option: {
							successMsg: "保存成功"
						},
						type: "post",
						url: "/api-mall/itemCat/addItemCate",
						loadingConfig: {
							target: document.querySelector(".classify_list")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.dialogVisible = false;
							this.reload();
						}
					},
					({ type, info }) => {}
				);
			}
		},
		saveEdit() {
			if (this.editMsg.cateName == "") {
				this.$message.error("名称不能为空！");
			} else {
				let qs = require("qs");
				let datas = qs.stringify({
					cateName: this.editMsg.cateName,
					cateId: this.editMsg.id,
					sortLevel: this.editMsg.sortLevel
				});
				this.Axios(
					{
						params: datas,
						option: {
							successMsg: "保存成功"
						},
						type: "post",
						url: "/api-mall/itemCat/updateCate",
						loadingConfig: {
							target: document.querySelector(".classify_list")
						}
					},
					this
				).then(
					result => {
						console.log(result);
						if (result.data.code === 200) {
							this.editClassify = false;
							this.getClassfy();
						}
					},
					({ type, info }) => {}
				);
			}
		},
		handleEdit(index, rowData) {
			let params = { type: "edit", index: index, rowData: rowData };
			console.log(params);
			this.editClassify = true;
			Object.assign(this.editMsg, rowData);
			// this.editMsg = rowData;
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			let params = { type: "delete", index: index, rowData: rowData };
			let qs = require("qs");
			let datas = qs.stringify({
				cateId: rowData.id
			});
			this.Axios(
				{
					params: datas,
					option: {
						successMsg: "删除成功"
					},
					type: "post",
					url: "/api-mall/itemCat/delCate",
					loadingConfig: {
						target: document.querySelector(".classify_list")
					}
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.reload();
					}
				},
				({ type, info }) => {}
			);
		},
		changeUp(index, val) {
			console.log(val);
			if (val.show == "1") {
				this.tableData[index].show = "0";
			} else {
				this.tableData[index].show = "1";
			}
		},
		getClassfy() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/itemCat/listCate"
				},
				this
			).then(
				result => {
					console.log(result.data.data);
					this.tableData = result.data.data;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getClassfy();
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
.classify_list {
	font-size: 14px;
	color: @font-normal;
	.top_list {
		// line-height: 60px;
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
			.el-input__inner {
				padding: 0;
				border: none;
				&:focus {
					border: 1px solid #1cc09f;
				}
			}
		}
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		-moz-appearance: textfield;
	}
	.el-radio__input.is-checked .el-radio__inner {
		border-color: #1cc09f;
		background: #1cc09f;
	}
	.el-radio__input.is-checked + .el-radio__label {
		color: #1cc09f;
	}
	.el-radio__inner:hover {
		border-color: #1cc09f;
	}
	.el-dialog__footer {
		padding: 10px 50px 20px;
	}
}
</style>

