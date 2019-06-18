<template>
	<div class="manufacturer_list">
		<div :class="[{hide:isHideList}]">
			<div class="bottom_list">
				<div class="top_title">
					<h4>设备厂商</h4>
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
						<el-table-column label="单位名称" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.name }}</span>
							</template>
						</el-table-column>
						<el-table-column label="申请人姓名" min-width="100" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.applicant }}</span>
							</template>
						</el-table-column>
						<el-table-column label="申请人手机号" min-width="80">
							<template slot-scope="scope">
								<span>{{ scope.row.phone }}</span>
							</template>
						</el-table-column>
						<el-table-column label="申请时间" min-width="120">
							<template slot-scope="scope">
								<span>{{ scope.row.gmtCreate }}</span>
							</template>
						</el-table-column>
						<el-table-column label="审核时间" min-width="120">
							<template slot-scope="scope">
								<span>{{scope.row.auditState==1?"-": scope.row.enterpriseAuditRecordDOS[scope.row.enterpriseAuditRecordDOS.length-1].gmtCreate }}</span>
							</template>
						</el-table-column>
						<el-table-column label="审核状态" min-width="80">
							<template slot-scope="scope">
								<span
									:style="{color:scope.row.auditState==1?'#ff6600':scope.row.auditState==2?'#999999':'#A54D5E'}"
								>{{ scope.row.auditState==1?'待审核':scope.row.auditState==2?"已通过":"已驳回" }}</span>
							</template>
						</el-table-column>
						<el-table-column label="启用状态" min-width="80">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="mini"
									@click="changeStateEnable(scope.$index, scope.row)"
									v-if="scope.row.state==1"
									style="color:#ff6600"
									:disabled="scope.row.auditState!=2"
								>已禁用</el-button>
								<el-button
									type="text"
									size="mini"
									@click="changeStateDown(scope.$index, scope.row)"
									v-if="scope.row.state==2"
									:disabled="scope.row.auditState!=2"
								>已启用</el-button>
							</template>
						</el-table-column>
						<el-table-column label="操作" width="80">
							<template slot-scope="scope">
								<el-button
									type="text"
									size="mini"
									v-if="scope.row.auditState==1"
									@click="toAudit(scope.$index, scope.row)"
								>审核</el-button>
								<el-button
									type="text"
									size="mini"
									v-if="scope.row.auditState!=1"
									@click="toDetails(scope.$index, scope.row)"
								>详情</el-button>
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
			tableData: []
		};
	},
	methods: {
		changeStateEnable(index, row) {
			let qs = require("qs");
			let data = qs.stringify({
				enterpriseId: row.id
			});
			this.Axios(
				{
					params: data,
					url: "/api-enterprise/enterprise/enableEnterprise",
					type: "post",
					option: {
						successMsg: "启用成功"
					}
				},
				this
			).then(result => {
				// console.log(result);
				if (result.data.code === 200) {
					this.getList();
				} else {
					this.$message.error("操作失败");
				}
			});
		},
		changeStateDown(index, row) {
			let qs = require("qs");
			let data = qs.stringify({
				enterpriseId: row.id
			});
			this.Axios(
				{
					params: data,
					url: "/api-enterprise/enterprise/downEnterprise",
					type: "post",
					option: {
						successMsg: "禁用成功"
					}
				},
				this
			).then(result => {
				// console.log(result);
				if (result.data.code === 200) {
					this.getList();
				} else {
					this.$message.error("操作失败");
				}
			});
		},
		toDetails(index, row) {
			this.$router.push({
				path: "/Manufacturer/ManufacturerDetails/" + row.id
			});
		},
		toAudit(index, row) {
			this.$router.push({
				path: "/Manufacturer/ManufacturerAudit/" + row.id
			});
		},
		handleSizeChange(val) {
			// console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getList();
		},
		handleCurrentChange(val) {
			// console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getList();
		},
		getList() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-enterprise/enterprise/enterpriseList"
				},
				this
			).then(
				result => {
					// console.log(result);
					this.tableData = result.data.data.content;
					this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getList();
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
			this.getList();
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
.manufacturer_list {
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