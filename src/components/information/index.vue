<template>
	<div class="information_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_list">
				<permission-button
					permCode="messagepush_lookup.messagepush_list_add"
					banType="disable"
					size="small"
					type="primary"
					class="el-icon-circle-plus-outline"
					@click="$router.push({path:'/Information/NewInformation'})"
				>&nbsp;新建消息</permission-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>历史消息</h4>
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
						:handleShow="true"
						:editShow="false"
						:detalisShow="true"
						:permissionDetails="permissionDetails"
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
		<router-view></router-view>
	</div>
</template>
<script>
import tableList from "../public/table";
export default {
	inject: ["reload"],
	data() {
		return {
			permissionDetails: "messagepush_lookup.messagepush_list_detail",
			isHideList: this.$route.params.id !== undefined ? true : false,
			items: [
				{
					label: "标题",
					prop: "title",
					width: 300
				},
				{
					label: "发送时间",
					prop: "gmtCreate",
					width: 100
				}
			],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			currentPage: 1,
			total: 10,
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
			this.list();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.list();
		},
		handleSelectionChange() {},
		handlechange(params) {
			if (params.type === "detalis") {
				console.log(params);
				this.$router.push(
					"/Information/DetailsInformation/" + params.rowData.messageId
				);
			}
		},
		getRow(row, event) {
			console.log(row);
		},
		list() {
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
					url: "/api-message/message/findList"
				},
				this
			).then(
				result => {
					console.log(result.data);
					this.tableData = result.data.data.content;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.list();
		let a = this.$route.matched.find(item => item.name === "NewInformation")
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
			let a = this.$route.matched.find(item => item.name === "NewInformation")
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
.information_list {
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
			}
		}
		.table_list {
			overflow: hidden;
			padding: 10px;
		}
	}
	.el-form-item {
		margin-bottom: 18px;
	}
}
</style>


