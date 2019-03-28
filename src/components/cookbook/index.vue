<template>
	<div class="cookbook_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_list">
				<permission-button
					permCode="manu_list_lookup.menu_list_add"
					banType="disable"
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="$router.push({path:'/Cookbook/AddCookbook'})"
				>添加菜谱</permission-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>菜谱列表</h4>
					<div class="top_search">
						<el-col :span="20" style="padding:0 5px;">
							<el-input size="small" clearable placeholder="菜谱名称" v-model="keyword"></el-input>
						</el-col>
						<el-col :span="4" style="padding:0 5px;">
							<el-button size="small" plain @click="getCookbookList">搜索</el-button>
						</el-col>
					</div>
				</div>
				<div class="table_list">
					<el-table
						:data="tableData"
						style="width: 100%"
						size="mini"
						tooltip-effect="light"
						:header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
					>
						<el-table-column label="菜谱名称" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.recipeName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="分类" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.cateName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="*上/下架" min-width="80">
							<template slot-scope="scope">
								<span @click.stop.prevent="changeUp(scope.$index, scope.row)">
									<i
										class="iconfont"
										v-if="scope.row.state=='0'"
										style="color:green;cursor: pointer;"
									>&#xe659;</i>
									<i class="iconfont" v-if="scope.row.state=='1'" style="color:red;cursor: pointer;">&#xe658;</i>
								</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="100">
							<template slot-scope="scope">
								<permission-button
									permCode="manu_list_lookup.menu_list_update"
									banType="disable"
									type="text"
									size="mini"
									@click.stop.prevent="handleEdit(scope.$index, scope.row)"
								>修改</permission-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="block" style="margin-top:10px;float:right">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="pageIndex"
						:page-sizes="[10, 20,40, 100]"
						:page-size="pageSize"
						layout="sizes, prev, pager, next"
						:total="total"
					></el-pagination>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import tableList from "../public/table";
export default {
	data() {
		return {
			currentPage: 1,
			items: [
				{
					label: "菜谱名称",
					prop: "name",
					width: 300
				},
				{
					label: "分类",
					prop: "classify",
					width: 80
				},
				{
					label: "已绑定的菜谱脚本",
					prop: "menuScript",
					width: 140
				}
			],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: 10,
			keyword: "",
			isHideList: this.$route.params.id !== undefined ? true : false
		};
	},
	methods: {
		changeState(val) {
			let qs = require("qs");
			let data = qs.stringify({
				id: val.id
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "修改成功"
					},
					type: "post",
					url: "/api-recipe/recipe/updatestate",
					loadingConfig: {
						target: document.querySelector(".cookbook_list")
					}
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						this.getCookbookList();
					}
				},
				({ type, info }) => {}
			);
		},
		changeUp(index, val) {
			if (val.state == 1) {
				this.changeState(val);
			} else {
				this.$confirm("菜谱下架，绑定的商品也同样会下架, 是否继续?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
					cancelButtonClass: "is-plain"
				})
					.then(() => {
						this.changeState(val);
					})
					.catch(() => {});
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getCookbookList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getCookbookList();
		},
		handleEdit(index, row) {
			console.log(row);
			this.$router.push({
				path: "/Cookbook/EditCookbook/" + row.id
			});
		},
		handleSelectionChange(selection) {
			console.log(selection);
		},
		getRow(row, event) {
			console.log(row);
		},
		getCookbookList() {
			let data = {
				page: this.pageIndex,
				size: this.pageSize,
				keyword: this.keyword
			};
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-recipe/recipe/list",
					loadingConfig: {
						target: document.querySelector(".cookbook_list")
					}
				},
				this
			).then(
				result => {
					console.log(result.data);
					if (result.data.code === 200) {
						this.total = result.data.data.totalElement;
						this.tableData = result.data.data.content;
						this.total = result.data.data.totalElement;
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getCookbookList();
		let a = this.$route.matched.find(item => item.name === "AddCookbook")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	components: {
		tableList
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddCookbook")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
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
.cookbook_list {
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
		}
	}
}
</style>