<template>
	<div class="cookbook_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_list">
				<el-button
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="$router.push({path:'/Cookbook/AddCookbook'})"
				>添加菜谱</el-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>菜谱列表</h4>
					<div class="top_search">
						<el-col :span="20" style="padding:0 5px;">
							<el-input size="small" clearable placeholder="菜谱名称"></el-input>
						</el-col>
						<el-col :span="4" style="padding:0 5px;">
							<el-button size="small" plain>搜索</el-button>
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
								<span>{{ scope.row.itemName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="分类" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.cateName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="*上架" min-width="80">
							<template slot-scope="scope">
								<div @click.stop.prevent="changeUp(scope.$index, scope.row)">
									<i
										class="iconfont"
										v-if="scope.row.state=='1'"
										style="color:green;cursor: pointer;"
									>&#xe659;</i>
									<i class="iconfont" v-if="scope.row.state=='2'" style="color:red;cursor: pointer;">&#xe658;</i>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="100">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="mini"
									@click.stop.prevent="handleEdit(scope.$index, scope.row)"
								>修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div class="block" style="margin-top:10px;float:right">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-sizes="[15, 30, 100]"
						:page-size="15"
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
			tableData: [
				{
					id: 1,
					name: "土豆肉丝",
					classify: "猪肉",
					state: 1,
					visible: false
				},
				{
					id: 2,
					name: "土豆肉丝",
					classify: "猪肉",
					state: 1,
					visible: false
				},
				{
					id: 3,
					name: "土豆肉丝",
					classify: "猪肉",
					state: 1,
					visible: false
				},
				{
					id: 4,
					name: "土豆肉丝",
					classify: "猪肉",
					state: 1,
					visible: false
				}
			],
			pageIndex: 1,
			pageSize: 15,
			total: 10,
			isHideList: this.$route.params.id !== undefined ? true : false
		};
	},
	methods: {
		changeUp(index, val) {
			if (val.state == "1") {
				this.tableData[index].state = "2";
			} else {
				this.tableData[index].state = "1";
			}
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getServiceList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getServiceList();
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
				size: this.pageIndex,
				page: this.pageSize
			};
			this.Axios(
				{
					params: data,
					option: {},
					type: "get",
					url: "/recipe/listRecipeCate",
					loadingConfig: {
						target: document.querySelector(".cookbook_list")
					}
				},
				this
			).then(
				result => {
					console.log(result);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// this.getCookbookList();
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