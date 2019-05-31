<template>
	<div class="user_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_title">
				<h4>用户列表</h4>
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
					<el-table-column label="订单" min-width="80">
						<template slot-scope="scope">
							<span>--</span>
							<!-- <span
								@click="$router.push({path:'/AdminOrder'})"
								style="cursor: pointer;"
							>{{ scope.row.order }}</span> -->
						</template>
					</el-table-column>
					<el-table-column label="积分" min-width="80">
						<template slot-scope="scope">
							<span
								@click="$router.push({path:'/Integral'})"
								style="cursor: pointer;"
								class="score_style"
							>{{ scope.row.score }}</span>
						</template>
					</el-table-column>
					<el-table-column label="注册时间" min-width="120" show-overflow-tooltip>
						<template slot-scope="scope">
							<span>{{scope.row.gmtCreate}}</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" width="100" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-tooltip :content="scope.row.state==false?'禁用':'正常'" placement="top" effect="light">
								<el-switch
									permCode="user_manager_list_lookup.user_manager_list_resetpsd"
									banType="disable"
									v-model="scope.row.state"
									active-color="#13ce66"
									inactive-color="#ff4949"
									@change="changeState(scope.row,scope.$index)"
								></el-switch>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
						<template slot-scope="scope">
							<el-button
								slot="reference"
								type="text"
								@click="toDetails(scope.row,scope.$index)"
								size="mini"
							>详情</el-button>
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
					label: "全部",
					value: -2
				},
				{
					label: "正常",
					value: 0
				},
				{
					label: "禁用",
					value: 1
				}
			],
			tableData: [],
			states: -2,
			keyWord: null
		};
	},
	methods: {
		toDetails(row, index) {
			this.$router.push({
				path: "/User/UserDetails/" + row.userId
			});
		},
		changeState(row, index) {
			console.log(this.tableData[index].state);
			let qs = require("qs");
			let data = qs.stringify({
				userInfoId: this.tableData[index].id
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "操作成功"
					},
					type: "post",
					url: "/api-user/userInfo/forbiddenUser"
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.getlist();
					}
				},
				({ type, info }) => {
					this.getlist();
				}
			);
		},
		resetPasswords(index, rowData) {
			rowData.resetvisible = false;
			let params = { type: "edit", index: index, rowData: rowData };
			console.log(params);
			this.resetpsw(rowData.userId);
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
		},
		deleteuser(userId) {
			let qs = require("qs");
			let data = qs.stringify({
				id: userId
			});
			this.Axios(
				{
					params: data,
					url: "/api-user/userInfo/deleteInfo",
					// url:"/api-sso/user/resetpassword",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.reload();
				}
				console.log(result.data);
			});
		},
		resetpsw(userId) {
			let qs = require("qs");
			let data = qs.stringify({
				id: userId
			});
			this.Axios(
				{
					params: data,
					url: "/api-sso/user/resetpassword",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.$message.success("修改成功~");
				}
			});
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
.user_list {
	font-size: 14px;
	color: @font-normal;

	padding-bottom: 10px;
	overflow: hidden;
	.top_title {
		padding: 0 10px;
		line-height: 60px;
		overflow: hidden;
		border-bottom: @border;
		background-color: white;

		h4 {
			float: left;
		}
		.top_search {
			width: 400px;
			float: right;
		}
	}
	.table_list {
		background-color: white;
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
