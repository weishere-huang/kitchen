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
					@click="$router.push({path:'/cookingPackage/AddCookingPackage'})"
				>添加菜谱包</permission-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>菜谱包列表</h4>
					<div class="top_search">
						<el-col :span="20" style="padding:0 5px;">
							<el-input size="small" clearable placeholder="菜谱包名称" v-model="keyword"></el-input>
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
						<el-table-column label="菜谱包名称" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.packageName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="包含菜谱" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.number }}道</span>
							</template>
						</el-table-column>
						<el-table-column label="售价（元）" min-width="80" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>¥{{ scope.row.price/100 }}</span>
							</template>
						</el-table-column>
						<el-table-column label="*上/下架" min-width="80">
							<template slot-scope="scope">
								<span>
									<permission-button
										permCode="manu_list_lookup.menu_list_add"
										banType="disable"
										type="text"
										v-if="scope.row.state=='0'"
										@click.stop.prevent="changeUp(scope.$index, scope.row)"
									>
										<i class="iconfont" style="color:green;">&#xe659;</i>
									</permission-button>
									<permission-button
										permCode="manu_list_lookup.menu_list_add"
										banType="disable"
										type="text"
										v-if="scope.row.state=='1'"
										@click.stop.prevent="changeUp(scope.$index, scope.row)"
									>
										<i class="iconfont" style="color:red;">&#xe658;</i>
									</permission-button>
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
			items: [],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: 10,
			keyword: null,
			isHideList: this.$route.params.id !== undefined ? true : false
		};
	},
	methods: {
		changeState(val,state) {
			let qs = require("qs");
			let data = qs.stringify({
				id: val.id,
        state:state
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "修改成功"
					},
					type: "post",
					url: "/api-recipe/recipePackage/updatestate",
					loadingConfig: {
						target: document.querySelector(".cookbook_list")
					}
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
					  console.log(result.data);
						this.getCookbookList();
					}
				},
				({ type, info }) => {}
			);
		},
		changeUp(index, val) {
		  let state;
			if (val.state == 1) {
        state = 0
        this.changeState(val,state);
			} else {
        state = 1
        this.changeState(val,state);
			}
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.getCookbookList();
		},
		handleCurrentChange(val) {
			this.pageIndex = val;
			this.getCookbookList();
		},
		handleEdit(index, row) {
			this.$router.push({
				path: "/cookingPackage/EditCookingPackage/" + row.id
			});
		},
		handleSelectionChange(selection) {},
		getRow(row, event) {},
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
					url: "/api-recipe/recipePackage/list",
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
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getCookbookList();
		let a = this.$route.matched.find(item => item.name === "AddCookingPackage")
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
			let a = this.$route.matched.find(
				item => item.name === "AddCookingPackage"
			)
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
