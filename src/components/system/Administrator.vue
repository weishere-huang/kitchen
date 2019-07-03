<template>
	<div class="administrator_list">
		<div class="top_list">
			<el-button size="small" type="primary" @click="toadd" class="el-icon-circle-plus-outline">添加管理员</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>管理员列表</h4>
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
					:deleteShow="true"
					:handleShow="true"
					:editShow="true"
					:permissionuUpdate="permissionuUpdate"
					:permissionDetele="permissionDetele"
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
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				></el-pagination>
			</div>
		</div>
		<el-dialog
			:close-on-click-modal="false"
			title="添加管理员"
			:visible.sync="dialogVisible"
			width="460px"
		>
			<add v-on:beforeadd="beforeadd"></add>
			<!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small" plain>取 消</el-button>
                <el-button type="primary" @click="beforeadd" size="small">确 定</el-button>
			</span>-->
		</el-dialog>
		<el-dialog :close-on-click-modal="false" title="修改管理员" :visible.sync="edit" width="460px">
			<add :editInfo="editUserMsg" v-on:beforeadd="beforeupdate"></add>
			<!-- <span slot="footer" class="dialog-footer">
                <el-button @click="edit = false" size="small" plain>取 消</el-button>
                <el-button type="primary" @click="beforeupdate" size="small">确 定</el-button>
			</span>-->
		</el-dialog>
	</div>
</template>
<script>
import tableList from "../public/table";
import Add from "./adminAdd&edit/Add&Edit";
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";

export default {
	inject: ["reload"],
	data() {
		return {
			permissionuUpdate: "system_employee_lookup.system_employee_update",
			permissionDetele: "system_employee_lookup.system_employee_delete",
			userMsg: {},
			editUserMsg: {},
			dialogVisible: false,
			edit: false,
			items: [
				{
					label: "管理员",
					prop: "account",
					width: 100
				},
				{
					label: "绑定手机",
					prop: "phone",
					width: 90
				},
				{
					label: "角色权限",
					prop: "roleName",
					width: 90
				},
				{
					label: "创建时间",
					prop: "gmt_create",
					width: 140
				}
			],
			tableData: [],
			pageIndex: 1,
			pageSize: 10,
			currentPage: 1,
			total: 0,
			password: ""
		};
	},
	methods: {
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		toadd() {
			(this.userMsg = {}), (this.editUserMsg = {}), (this.dialogVisible = true);
		},
		handleSelectionChange() {},
		getRow(row, event) {},
		handlechange(params) {
			if (params.type === "edit") {
				// (this.userMsg = {}),
				// 	(this.editUserMsg = {}),
				// Object.assign(this.editUserMsg,params.rowData);
				// this.editUserMsg.confirmPassword=this.editUserMsg.password;
				this.findOne(params.rowData.id);

				this.edit = true;
			}
			if (params.type === "delete") {
				this.deleteEMP(params.rowData.id);
			}
			if (params.type === "detalis") {
				this.userIds = params.rowData.order;
				// this.$router.push({ path: "/Order/Details/" + this.userIds });
			}
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
		getlist() {
			this.Axios(
				{
					params: {
						page: this.pageIndex,
						size: this.pageSize
					},
					type: "get",
					url: "/api-platform/employee/findAll",
					option: {
						enableMsg: false
					}
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
		deleteEMP(id) {
			let qs = require("qs");
			let data = qs.stringify({
				employeeIds: id,
				enableOrDisable: -1
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/employee/updateState",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.getlist();
				}
			});
		},
		//添加管理员
		beforeadd(params) {
			if (params.type == "cancel") {
				this.dialogVisible = params.isHide;
			}
			if (params.type == "affirm") {
				this.addMsg = params.value;
				if (this.addMsg.password === "" || this.addMsg.password == null) {
					this.$message.warning("添加管理员时密码不能为空!");
					return;
				}
				// this.addService();

				let pass = this.addMsg.password;
				pass = md5(pass);
				let key = "*chang_hong_device_cloud";
				this.password = this.encryptByDES(pass, key);
				this.addAdmin(params.isHide);
			}
			// if (this.userMsg.confirmPassword !== this.userMsg.password) {
			// 	this.$message.warning("两次密码输入不一致,请重新输入!!!");
			// 	return;
			// }
			// if (
			// 	this.userMsg.account == null ||
			// 	this.userMsg.password == null ||
			// 	this.userMsg.phone == null ||
			// 	this.userMsg.roleId == null
			// ) {
			// 	this.$message.warning("请完善信息!");
			// 	return;
			// }
			// if (
			// 	this.userMsg.password != null &&
			// 	this.userMsg.password !== "" &&
			// 	this.userMsg.password !== undefined
			// ) {

			// }
		},
		addAdmin(params) {
			let qs = require("qs");
			let data = qs.stringify({
				account: this.addMsg.account,
				password: this.password,
				phone: this.addMsg.phone,
				roleId: this.addMsg.roleId
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/employee/add",
					type: "post",
					option: {
						enableMsg: false
					}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.reload();
					this.dialogVisible = params;
				}
			});
		},
		//修改管理员
		beforeupdate(params) {
			if (params.type == "cancel") {
				this.edit = params.isHide;
			}
			if (params.type == "affirm") {
				this.editUserMsg = params.value;
				// this.updateService();
				this.edit = params.isHide;
				if (
					this.editUserMsg.password != null &&
					this.editUserMsg.password !== "" &&
					this.editUserMsg.password !== undefined
				) {
					let pass = this.editUserMsg.password;
					pass = md5(pass);
					let key = "*chang_hong_device_cloud";
					this.editUserMsg.password = this.encryptByDES(pass, key);
				}
				this.updateAdmin();
			}
			// if (this.editUserMsg.confirmPassword !== this.editUserMsg.password) {
			// 	this.$message.warning("两次密码输入不一致,请重新输入!!!");
			// 	return;
			// }
			// if (
			// 	this.editUserMsg.account == null ||
			// 	this.editUserMsg.phone == null ||
			// 	this.editUserMsg.roleId == null
			// ) {
			// 	this.$message.warning("请完善信息!");
			// 	return;
			// }
			// if (
			// 	this.editUserMsg.password != null &&
			// 	this.editUserMsg.password !== "" &&
			// 	this.editUserMsg.password !== undefined
			// ) {
			// 	let pass = this.editUserMsg.password;
			// 	pass = md5(pass);
			// 	let key = "*chang_hong_device_cloud";
			// 	this.editUserMsg.password = this.encryptByDES(pass, key);
			// }
			// this.updateAdmin();
		},
		updateAdmin() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.editUserMsg.id,
				account: this.editUserMsg.account,
				password: this.editUserMsg.password,
				phone: this.editUserMsg.phone,
				roleId: this.editUserMsg.roleId
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/employee/update",
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
		},
		findOne(id) {
			this.Axios(
				{
					params: {
						employeeId: id
					},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/employee/findOne"
				},
				this
			).then(
				result => {
					this.editUserMsg = result.data.data;
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getlist();
	},
	components: {
		tableList,
		Add
	},
	watch: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.administrator_list {
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
