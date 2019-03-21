<template>
	<div class="supplier_list">
		<div :class="[{hide:isHideList}]">
			<div class="top_list">
				<el-button size="small" type="primary" class="el-icon-circle-plus-outline" @click="toadd">添加供应商</el-button>
			</div>
			<div class="bottom_list">
				<div class="top_title">
					<h4>供应商列表</h4>
					<div class="top_search">
						<el-col :span="19" style="padding:0 5px;">
							<el-input size="small" placeholder="供应商名称" v-model="keyword"></el-input>
						</el-col>
						<el-col :span="5" style="padding:0 5px;">
							<el-button size="small" plain @click="beforeSearch">搜索</el-button>
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
						:editShow="true"
						:deleteShow="true"
						:handleShow="true"
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
			currentPage: 1,
			items: [
				{
					label: "代理商名称",
					prop: "supplierName",
					width: 200
				},
				{
					label: "联系人",
					prop: "contacts",
					width: 140
				},
				{
					label: "电话",
					prop: "phone",
					width: 140
				},
				{
					label: "账号",
					prop: "supplierAccount",
					width: 140
				}
			],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			total: 10,
			isHideList: this.$route.params.id !== undefined ? true : false,
			keyword: null
		};
	},
	methods: {
		toadd() {
			this.$router.push({ path: "/Supplier/AddSupplier" });
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageIndex = 1;
			this.pageSize = val;
			this.getSupplierList();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.pageIndex = val;
			this.getSupplierList();
		},
		handlechange(params) {
			if (params.type === "edit") {
				console.log(params);
				this.$router.push("/Supplier/EditSupplier/" + params.rowData.id);
			}
			if (params.type === "delete") {
				console.log(params.rowData.id);
				this.deleteSupplier(params.rowData.id);
			}
			if (params.type === "detalis") {
				console.log(params);
			}
		},
		deleteSupplier(id) {
			this.Axios(
				{
					params: {
						supplierId: id
					},
					option: {
						successMsg: "删除成功！"
					},
					type: "get",
					url: "/api-platform/supplier/delSupplier"
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.getSupplierList();
					}
					// this.tableData = result.data.data.content;
					// this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		},
		handleSelectionChange(selection) {
			console.log(selection);
		},
		getRow(row, event) {
			console.log(row);
		},
		beforeSearch() {
			this.pageIndex = 1;
			this.getSupplierList();
		},
		//获取所有网点
		getSupplierList() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize,
						keyWord: this.keyword
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/supplier/findAllList"
				},
				this
			).then(
				result => {
					console.log(result.data.data.content);
					if (result.data.code === 200) {
						this.tableData = result.data.data.content;
					}
					// this.tableData = result.data.data.content;
					// this.total = result.data.data.totalElement;
				},
				({ type, info }) => {}
			);
		},
		deleteService(id) {
			let qs = require("qs");
			let data = qs.stringify({
				ids: id,
				enableOrDisable: 1
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/network/updatestate",
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
			});
		}
	},
	created() {
		this.getSupplierList();
		let a = this.$route.matched.find(item => item.name === "AddSupplier")
			? true
			: false;
		let b = this.$route.params.id !== undefined ? true : false;
		this.isHideList = a || b ? true : false;
	},
	watch: {
		$route() {
			let a = this.$route.matched.find(item => item.name === "AddSupplier")
				? true
				: false;
			let b = this.$route.params.id !== undefined ? true : false;
			this.isHideList = a || b ? true : false;
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
.supplier_list {
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
				width: 300px;
				float: right;
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
}
</style>


