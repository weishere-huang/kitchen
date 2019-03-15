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
				<el-form size="small" label-width="180px" :model="supplierMsg">
					<el-form-item label="供应商名称：" prop>
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.supplierName"></el-input>
					</el-form-item>
					<el-form-item label="联系人：" prop>
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.contacts"></el-input>
					</el-form-item>
					<el-form-item label="联系电话：" prop>
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.phone"></el-input>
					</el-form-item>
					<el-form-item label="详细地址：" prop>
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.address"></el-input>
					</el-form-item>
					<el-form-item label="角色选择：">
						<el-select
							v-model="supplierMsg.roleId"
							placeholder="请选择"
							style="width:350px"
							size="small"
							@change="getroleId"
						>
							<el-option v-for="item in ruleOptions" :key="item.value" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="供应商账号：" prop>
						<el-input type="text" size="small" style="width:350px;" v-model="supplierMsg.supplierName"></el-input>
						<el-tooltip class="item" effect="light" content="账号格式：agent加3~5数字组成" placement="top">
							<i class="el-icon-warning" style="color:#1cc09f"></i>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="密码：" prop>
						<el-input type="password" size="small" style="width:350px;"></el-input>
					</el-form-item>
					<el-form-item label="确认密码：" prop>
						<el-input type="password" size="small" style="width:350px;"></el-input>
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
						node-key="adcode"
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
						node-key="adcode"
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
						node-key="adcode"
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
export default {
	inject: ["reload"],
	data() {
		return {
			ruleOptions: [],
			data: [],
			data1: [],
			data2: [],
			data3: [],
			defaultProps: {
				children: "children",
				label: "areaName",
				value: "adcode"
			},
			// selectarea:["110000","120000","350000","530000","820000"],
			selectarea: [],
			supplierMsg: {
				supplierName: "",
				contacts: "",
				phone: "",
				address: "",
				areaCode: [],
				password: "",
				roleId: ""
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
						successMsg: "销售区域加载完成~"
					},
					type: "get",
					url: "/api-mall/area/list"
				},
				this
			).then(
				result => {
					result.data.data.map(item => {
						this.selectarea.push(item.adCode);
					});
					this.selectarea = JSON.parse(JSON.stringify(this.selectarea));
				},
				({ type, info }) => {}
			);
		},
		savearea() {
			let arr = [];
			arr = arr
				.concat(this.$refs.tree1.getCheckedKeys())
				.concat(this.$refs.tree2.getCheckedKeys())
				.concat(this.$refs.tree3.getCheckedKeys());
			let qs = require("qs");
			let data = qs.stringify({
				codes: arr.toString()
			});
			this.Axios(
				{
					params: data,
					option: {
						enableMsg: false
					},
					type: "post",
					url: "/api-mall/area/save"
				},
				this
			).then(
				result => {
					if (result.data.code === 200) {
						this.$message.success("保存成功");
					}
				},
				({ type, info }) => {}
			);
		},
		addSupplier() {
			let qs = require("qs");
			let data = qs.stringify({});
			this.Axios(
				{
					params: data,
					option: {
						successMsg: "保存成功"
					},
					type: "post",
					url: "/supplier/saveSupplier"
				},
				this
			).then(
				result => {
					// if (result.data.code === 200) {
					// }
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		// console.log(this.$store.state.getArea);
		this.data = JSON.parse(sessionStorage.getItem("area"))[0].children[0];
		this.data1 = this.data.slice(0, 12);
		this.data2 = this.data.slice(12, 24);
		this.data3 = this.data.slice(24, 34);
		// this.getarea();
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

