<template>
	<div class="system_log_list">
		<div class="bottom_list">
			<div class="top_title">
				<h4>系统日志</h4>
				<div class="top_search">
					<el-col :span="10">
						<span>日期：</span>
						<el-date-picker
							v-model="searchDate1"
							type="date"
							placeholder="起始日期"
							size="small"
							style="width:40%;"
							value-format="yyyy/MM/dd"
						></el-date-picker>&nbsp;至
						<el-date-picker
							v-model="searchDate2"
							type="date"
							placeholder="结束日期"
							size="small"
							style="width:40%;"
							value-format="yyyy/MM/dd"
						></el-date-picker>
					</el-col>
					<el-col :span="5" style="padding:0 4px;">
						<span>日志类型：</span>
						<el-select v-model="logValue" placeholder="请选择" size="small" style="width:94px;">
							<el-option v-for="item in logType" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5" style="padding:0 4px;">
						<el-input size="small" style="width:100%;" clearable placeholder="账号/关键词" v-model="keyWord"></el-input>
					</el-col>
					<el-col :span="4" style="padding:0 5px;">
						<el-button size="small" @click plain>搜索</el-button>
						<el-button size="small" @click="reload()" plain>重置</el-button>
					</el-col>
				</div>
			</div>
			<div class="table_list">
				<table-list
					:selectShow="false"
					:handleSelectionChange="handleSelectionChange"
					:column="items"
					v-on:handlechange="handlechange"
					:data="tableData"
					:rowDblclick="getRow"
					:handle="100"
					:deleteShow="false"
					:handleShow="false"
					:editShow="false"
				></table-list>
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
</template>
<script>
import tableList from "../public/table";
export default {
	inject: ["reload"],
	data() {
		return {
			items: [
				{
					label: "操作时间",
					prop: "time",
					width: 100
				},
				{
					label: "日志类型",
					prop: "logType",
					width: 60
				},
				{
					label: "日志内容",
					prop: "logContent",
					width: 180
				},
				{
					label: "账号",
					prop: "userName",
					width: 90
				},
				{
					label: "角色",
					prop: "management",
					width: 80
				},
				{
					label: "来源IP",
					prop: "ip",
					width: 80
				}
			],
			tableData: [
				{
					time: "2019-03-15 11:44:01",
					logType: "操作",
					logContent: "订单发货，订单编号10429340238",
					userName: "zhangjie",
					management: "供应商管理员",
					ip: "127.0.0.1 "
				}
			],
			pageIndex: 1,
			pageSize: 10,
			currentPage: 1,
			total: 0,
			searchDate1: null,
			searchDate2: null,
			logType: [
				{
					label: "全部",
					value: -2
				},
				{
					label: "登录日志",
					value: 0
				},
				{
					label: "操作日志",
					value: 1
				}
			],
			logValue: -2,
			keyWord: ""
		};
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
		},
		handleSelectionChange() {},
		handlechange(params) {},
		getRow(row, event) {
			console.log(row);
		}
	},
	components: {
		tableList
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
.system_log_list {
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
				width: 850px;
				float: right;
				.el-button + .el-button {
					margin-left: 6px;
				}
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
	.el-form-item {
		margin-bottom: 18px;
	}
}
</style>

