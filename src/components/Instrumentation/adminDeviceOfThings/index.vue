<template>
	<div class="admin_devide_things">
		<div :class="[{hide:isHideList}]">
			<div class="bottom_list">
				<div class="top_title">
					<h4>设备列表</h4>
					<div class="top_search">
						<el-col :span="7">
							所属产品：
							<el-select size="small" v-model="productValue" placeholder style="width:150px;">
								<el-option label="全部" value="-1"></el-option>
								<el-option
									v-for="item in productList"
									:key="item.id"
									:label="item.deviceName"
									:value="item.id"
								></el-option>
							</el-select>
						</el-col>
						<el-col :span="5">
							状态：
							<el-select size="small" v-model="state" placeholder style="width:110px;">
								<el-option label="全部" value="-1"></el-option>
								<el-option label="在线" value="0"></el-option>
								<el-option label="离线" value="1"></el-option>
								<el-option label="故障" value="2"></el-option>
							</el-select>
						</el-col>
						<el-col :span="7" style="padding:0 5px;">
							<el-input
								size="small"
								style="width:100%;"
								clearable
								placeholder="设备名称/型号/接入用户/接入IP"
								v-model="keyWord"
							></el-input>
						</el-col>
						<el-col :span="5" style="padding:0 5px;">
							<el-button size="small" plain @click="searchlist">搜索</el-button>
							<el-button size="small" plain @click="reload()">重置</el-button>
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
						<el-table-column label="设备名称/自定义" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.name==""||scope.row.name==null?'默认名称':scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="所属产品" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.deviceName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="设备型号" min-width="80">
							<template slot-scope="scope">
								<span>{{ scope.row.deviceModel }}</span>
							</template>
						</el-table-column>
						<el-table-column label="用户昵称" min-width="120">
							<template slot-scope="scope">
								<span>{{ scope.row.userName }}</span>
							</template>
						</el-table-column>
						<el-table-column label="账号（手机号）" min-width="120">
							<template slot-scope="scope">
								<span>{{ scope.row.phone }}</span>
							</template>
						</el-table-column>
						<el-table-column label="状态" min-width="100">
							<template slot-scope="scope">
								<span>
									<i
										class="iconfont"
										:style="{color:scope.row.isOnline==0?'green':scope.row.isOnline==1?'#999999':'orange'}"
									>&#xe607;</i>
									{{ scope.row.isOnline==0?"在线":scope.row.isOnline==1?"离线":"故障" }}
								</span>
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
							layout="total, sizes, prev, pager, next, jumper"
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
			tableData: [],
			keyWord: null,
			state: "-1",
			productValue: "-1",
			productList: []
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
			this.deleteuser(rowData.userId);
		},
		handleSizeChange(val) {
			this.pageIndex = 1;
			this.pageSize = val;
			this.getlist();
		},
		handleCurrentChange(val) {
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
						deviceId: this.productValue,
						keyword: this.keyWord,
						isOnline: this.state
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/deviceuser/list"
				},
				this
			).then(
				result => {
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		},
		getProductlist() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/device/findPassList"
				},
				this
			).then(
				result => {
					this.productList = result.data.data;
				},
				({ type, info }) => {}
			);
		}
	},
	mounted() {},
	created() {
		this.getProductlist();
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
