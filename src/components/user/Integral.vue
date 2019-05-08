<template>
	<div class="user_list">
		<div class="top_title">
			<h4>积分明细</h4>
			<div class="top_search">
				<el-col :span="9" style="padding:0 5px;">
					<el-select v-model="states" placeholder="请选择" size="small">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-col>
				<el-col :span="11" style="padding:0 5px;">
					<el-input size="small" style="width:100%;" clearable placeholder="昵称/手机号" v-model="keyWord"></el-input>
				</el-col>
				<el-col :span="4" style="padding:0 5px;">
					<el-button size="small" plain @click="searchlist">搜索</el-button>
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
				<el-table-column label="昵称" min-width="100" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{ scope.row.nickName }}</span>
					</template>
				</el-table-column>
				<el-table-column label="手机号" min-width="120" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{ scope.row.phone }}</span>
					</template>
				</el-table-column>
				<el-table-column label="积分" min-width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.credits }}</span>
					</template>
				</el-table-column>
				<el-table-column label="类型" min-width="80">
					<template slot-scope="scope">
						<span>{{ scope.row.state }}</span>
					</template>
				</el-table-column>
				<el-table-column label="记录时间" min-width="120" show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{scope.row.gmtCreate}}</span>
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
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			options: [
				{
					label: "全部",
					value: -2
				},
				{
					label: "签到",
					value: 0
				},
				{
					label: "购买商品",
					value: 1
				},
				{
					label: "购买菜谱",
					value: 2
				},
				{
					label: "兑换",
					value: 3
				}
			],
			tableData: [],
			states: -2,
			keyWord: null
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			// this.getlist();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			// this.getlist();
		},
		searchlist() {
			this.pageIndex = 1;
			// this.getlist();
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
		// this.getlist();
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
.user_list {
	font-size: 14px;
	color: @font-normal;
	background-color: white;
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
}
</style>
