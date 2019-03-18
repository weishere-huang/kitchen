<template>
	<div class="add_supplier">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>添加供应商</h4>
			</div>
			<div class="supplier_form">
				<el-form
					size="small"
					label-width="180px"
					:model="supplierMsg"
					:rules="supplierMsgRules"
					ref="supplierMsg"
				>
					<el-form-item label="供应商名称：" prop="supplierName">
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.supplierName"></el-input>
					</el-form-item>
					<el-form-item label="联系人：" prop="contacts">
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.contacts"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop="phone">
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.phone"></el-input>
					</el-form-item>
					<el-form-item label="详细地址：" prop="address">
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.address"></el-input>
					</el-form-item>
					<el-form-item label="角色选择：" prop="supplierRoleId">
						<el-select
							v-model="supplierMsg.supplierRoleId"
							placeholder="请选择"
							style="width:350px"
							size="small"
						>
							<el-option v-for="item in ruleOptions" :key="item.value" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商账号：" prop="supplierAccount">
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.supplierAccount"></el-input>
						<el-tooltip class="item" effect="light" content="账号格式：agent加3~5数字组成" placement="top">
							<i class="el-icon-warning" style="color:#1cc09f"></i>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="密码：" prop="supplierPassword">
						<el-input
							type="password"
							size="small"
							style="width:350px;"
							v-model="supplierMsg.supplierPassword"
						></el-input>
					</el-form-item>
					<el-form-item label="确认密码：" prop="password">
						<el-input type="password" size="small" style="width:350px;" v-model="supplierMsg.password"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<div class="supplier_area">
				<h4>供应区域</h4>
			</div>
			<div class="table_list" style="padding:10px 20px 10px 180px">
				<el-col :span="8">
					<el-tree
						:data="data1"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree1"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data2"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree2"
					></el-tree>
				</el-col>
				<el-col :span="8">
					<el-tree
						:data="data3"
						:props="defaultProps"
						accordion
						@node-click="handleNodeClick"
						:highlight-current="true"
						show-checkbox
						:check-strictly="false"
						:default-checked-keys="selectarea"
						node-key="adCode"
						ref="tree3"
					></el-tree>
				</el-col>
			</div>
			<div class="top_list" style="padding:10px 200px">
				<el-button size="small" type="primary" @click="addSupplier">
					<i class="iconfont">&#xe62d;</i> 保存
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
import md5 from "js-md5/src/md5.js";
import CryptoJS from "crypto-js/crypto-js.js";
export default {
	inject: ["reload"],
	data() {
		return {
			province: [],
			city: [],
			block: [],
			country: [],
			ruleOptions: [],
			data: [],
			data1: [],
			data2: [],
			data3: [],
			defaultProps: {
				children: "children",
				label: "areaName",
				value: "adCode"
			},
			// selectarea:["110000","120000","350000","530000","820000"],
			selectarea: [],
			supplierMsg: {
				supplierName: "",
				contacts: "",
				phone: "",
				address: "",
				areaCode: [],
				supplierPassword: "",
				password: "",
				supplierRoleId: "",
				supplierAccount: "agent"
			},
			supplierMsgRules: {
				supplierName: [
					{ required: true, message: "请填写供应商名称", trigger: "blur" }
				],
				contacts: [
					{ required: true, message: "请填写联系人", trigger: "blur" }
				],
				phone: [{ required: true, message: "请填写电话", trigger: "blur" }],
				address: [
					{ required: true, message: "请填写详细地址", trigger: "blur" }
				],
				supplierPassword: [
					{ required: true, message: "请填写密码", trigger: "blur" }
				],
				password: [
					{ required: true, message: "请确认输入密码", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value != this.supplierMsg.supplierPassword) {
								callback(new Error("两次输入密码不一致"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				supplierRoleId: [
					{ required: true, message: "请选择角色", trigger: "change" }
				],
				supplierAccount: [
					{ required: true, message: "请填写账号", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (value.includes("agent") == false) {
								callback(new Error("请输入格式为：agent加3~5数字组成"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		getRoleList() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-platform/role/listAllRole"
				},
				this
			).then(
				result => {
					console.log(result.data);
					this.ruleOptions = result.data.data;
				},
				({ type, info }) => {}
			);
		},
		handleNodeClick(data) {
			console.log(data);
		},
		getarea() {
			this.Axios(
				{
					params: {},
					option: {
						enableMsg: false
					},
					type: "get",
					url: "/api-mall/area/list"
				},
				this
			).then(
				result => {
					// console.log(typeof JSON.parse(JSON.stringify(result.data.data)));
					let that = this;
					let data = JSON.parse(JSON.stringify(result.data.data));

					console.log(data);
					for (var item in data) {
						if (data[item].adCode.match(/100000$/)) {
							that.country.push({
								adCode: data[item].adCode,
								areaName: data[item].areaName,
								children: []
							});
						} else if (data[item].adCode.match(/0000$/)) {
							//省
							that.province.push({
								adCode: data[item].adCode,
								areaName: data[item].areaName,
								children: []
							});
						} else if (data[item].adCode.match(/00$/)) {
							//市
							that.city.push({
								adCode: data[item].adCode,
								areaName: data[item].areaName,
								children: []
							});
						} else {
							//区
							that.block.push({
								adCode: data[item].adCode,
								areaName: data[item].areaName
							});
						}
					}
					// 分类市级
					for (var index in that.province) {
						for (var index1 in that.city) {
							if (
								that.province[index].adCode.slice(0, 2) ===
								that.city[index1].adCode.slice(0, 2)
							) {
								that.province[index].children.push(that.city[index1]);
							}
						}
					}
					//  分类区级
					for (var item1 in that.city) {
						for (var item2 in that.block) {
							if (
								that.block[item2].adCode.slice(0, 4) ===
								that.city[item1].adCode.slice(0, 4)
							) {
								that.city[item1].children.push(that.block[item2]);
							}
						}
					}
					that.country[0].children.push(that.province);
					// console.log(that.country);
					this.data = that.country[0].children[0];
					this.data1 = this.data.slice(0, 12);
					this.data2 = this.data.slice(12, 24);
					this.data3 = this.data.slice(24, 34);
				},
				({ type, info }) => {}
			);
		},
		savearea() {
			let arr = [];
			arr = arr.concat(
				this.$refs.tree1.getCheckedKeys(),
				this.$refs.tree2.getCheckedKeys(),
				this.$refs.tree3.getCheckedKeys()
			);
			this.supplierMsg.areaCode = arr;
		},
		encryptByDES(message, key) {
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		addSupplier() {
			this.savearea();
			let pass = this.supplierMsg.supplierPassword;
			pass = md5(pass);
			let key = "*chang_hong_device_cloud";
			let a = pass;
			pass = this.encryptByDES(a, key);
			let qs = require("qs");
			let data = qs.stringify({
				supplierName: this.supplierMsg.supplierName,
				contacts: this.supplierMsg.contacts,
				phone: this.supplierMsg.phone,
				address: this.supplierMsg.address,
				areaCode: this.supplierMsg.areaCode.join(","),
				supplierPassword: pass,
				supplierRoleId: this.supplierMsg.supplierRoleId,
				supplierAccount: this.supplierMsg.supplierAccount
			});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "保存成功"
					},
					type: "post",
					url: "/api-platform/supplier/saveSupplier"
				},
				this
			).then(
				result => {
					console.log(result);
					if (result.data.code === 200) {
						this.$router.back(-1);
						this.reload();
					}
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// console.log(this.$store.state.getArea);

		this.getarea();
		this.getRoleList();
	},
	components: {}
};
</script>

<style lang="less">
@main-color: #1cc09f;
@bgColor: #f0f2f5;
@font-normal: #333333;
@font-subsidiary: #999999;
@font-special: #1cc09f;
@border: 1px solid #dde2eb;
.add_supplier {
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
		}
		.table_list {
			overflow: hidden;
			padding: 10px 200px;
			.el-col {
				max-height: 600px;
				overflow: scroll;
			}
		}
		.supplier_form {
			padding: 20px 20px 0;
			.el-form {
				border-bottom: @border;
				padding-bottom: 20px;
			}
		}
		.supplier_area {
			padding: 0 44px;
			h4 {
				line-height: 40px;
			}
		}
	}
}
</style>

