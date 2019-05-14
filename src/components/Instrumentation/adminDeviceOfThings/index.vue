<template>
	<div class="admin_devide_things">
		<div :class="[{hide:isHideList}]">
			<div class="bottom_list">
				<div class="top_title">
					<h4>产品列表</h4>
					<div class="top_search">
						<el-col :span="7">
							所属产品：
							<el-select size="small" placeholder style="width:150px;">
								<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							状态：
							<el-select size="small" placeholder style="width:150px;">
								<el-option v-for="item in 3" :key="item.value" :label="item" :value="item"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6" style="padding:0 5px;">
							<el-input
								size="small"
								style="width:100%;"
								clearable
								placeholder="设备名称/型号/接入用户"
								v-model="keyWord"
							></el-input>
						</el-col>
						<el-col :span="5" style="padding:0 5px;">
							<el-button size="small" plain @click="searchlist">搜索</el-button>
							<el-button size="small" plain @click="searchlist">重置</el-button>
						</el-col>
					</div>
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
						<el-table-column label="设备名称" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.nickName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="所属产品" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.phone }}</span>
							</template>
						</el-table-column>
						<el-table-column label="设备型号" min-width="80">
							<template slot-scope="scope">
								<span
									@click="$router.push({path:'/AdminOrder'})"
									style="cursor: pointer;"
								>{{ scope.row.order }}</span>
							</template>
						</el-table-column>
						<el-table-column label="用户昵称" min-width="120">
							<template slot-scope="scope">
								<span
									@click="$router.push({path:'/Integral'})"
									style="cursor: pointer;"
									class="score_style"
								>{{ scope.row.userScoreDO.score }}</span>
							</template>
						</el-table-column>
						<el-table-column label="账号（手机号）" min-width="120">
							<template slot-scope="scope">
								<span
									@click="$router.push({path:'/Integral'})"
									style="cursor: pointer;"
									class="score_style"
								>{{ scope.row.userScoreDO.score }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="100">
							<template slot-scope="scope">
								<span
									@click="$router.push({path:'/Integral'})"
									style="cursor: pointer;"
									class="score_style"
								>{{ scope.row.userScoreDO.score }}</span>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="140">
							<template slot-scope="scope">
								<el-button type="text" size="mini" @click="toDetails(scope.$index, scope.row)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
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
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			isHideList: this.$route.params.id !== undefined ? true : false,
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			options: [
				{
					label: "WIFI",
					value: 0
				},
				{
					label: "4G",
					value: 1
				},
				{
					label: "NB-loT",
					value: 2
				},
				{
					label: "LoRa",
					value: 3
				},
				{
					label: "ZigBee",
					value: 4
				},
				{
					label: "以太网",
					value: 5
				},
				{
					label: "其他",
					value: 6
				}
			],
			tableData: [],
			keyWord: null
		};
	},
	methods: {
		toDetails(index, row) {
			this.$router.push({
				path: "/AdminDeviceOfThings/AdminDeviceOfThingsDetails/" + row.id
			});
		},
		handleDelete(index, rowData) {
			rowData.visible = false;
			let params = { type: "delete", index: index, rowData: rowData };
			console.log(params);
			this.deleteuser(rowData.userId);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getlist();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getlist();
		},
		searchlist() {
			this.pageIndex = 1;
			this.getlist();
		},
		getlist() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize,
						state: this.states,
						keyWord: this.keyWord
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-user/userInfo/listUserInfo"
				},
				this
			).then(
				result => {
					console.log(result);
					this.tableData = result.data.data.content;
					for (let i = 0; i < this.tableData.length; i++) {
						if (this.tableData[i].state == 0) {
							this.tableData[i].state = true;
						} else {
							this.tableData[i].state = false;
						}
						// this.tableData[i].state = this.tableData[i].state.toString;
					}
					this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getlist();
		let a = this.$route.matched.find(item => item.name === "ProductOfThingsAdd")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(
				item => item.name === "ProductOfThingsAdd"
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
.admin_devide_things {
	font-size: 14px;
	color: @font-normal;

	padding-bottom: 10px;
	overflow: hidden;
	.top_list {
		// line-height: 60px;
		background-color: white;
		padding: 10px;
		background-color: white;
	}
	.bottom_list {
		margin-top: 10px;
		background-color: white;
	}
	.top_title {
		padding: 0 10px;
		line-height: 60px;
		overflow: hidden;
		border-bottom: @border;

		h4 {
			float: left;
		}
		.top_search {
			width: 800px;
			float: right;
		}
	}
	.table_list {
		overflow: hidden;
		padding: 10px;
		.el-table--mini td,
		.el-table--mini th {
			padding: 12px 0;
		}
		.state_change {
			cursor: pointer;
			i {
				font-size: 20px;
			}
		}
	}
	.score_style {
		&:hover {
			color: #1cc09f;
			text-decoration: underline;
		}
	}
}
</style>
