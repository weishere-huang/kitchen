<template>
	<div class="edit_role">
		<div class="top_list">
			<el-button size="small" type="primary" class="el-icon-arrow-left" @click="$router.back(-1)">返回</el-button>
		</div>
		<div class="bottom_list">
			<div class="top_title">
				<h4>修改角色</h4>
			</div>
			<div class="role_case">
				<el-col :span="16">
					<el-form label-width="200px">
						<el-form-item label="角色名：">
							<el-input size="small" v-model="name" maxlength="20"></el-input>
						</el-form-item>
						<el-form-item label="描述：">
							<el-input type="textarea" rows="6" size="small" v-model="description" maxlength="100"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</div>
		</div>
		<div class="role_management">
			<div class="top_title">
				<h4>权限设置</h4>
			</div>
			<div>
				<el-tree
					:data="role"
					show-checkbox
					node-key="id"
					ref="tree"
					highlight-current
					:props="defaultProps"
					:default-checked-keys="editpermission"
          :default-expanded-keys="[0,1]"
				>
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span :title="data.name" class="listcontent">{{ data.name +" ("+data.dataUrl+")"}}</span>
					</span>
				</el-tree>
			</div>
			<div style="padding:16px 0 0 200px;">
				<el-button size="small" type="primary" @click="updateContro">确认修改</el-button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	inject: ["reload"],
	data() {
		return {
			role: [],
			defaultProps: {
				children: "children",
				label: "label"
			},
			name: null,
			description: null,
			permissionIds: null,
			editpermission: []
		};
	},
	methods: {
		updateContro() {
			if (this.name == null || this.name === "") {
				this.$message.warning("请输入角色名");
				return;
			}
			let arr = [];
			arr = arr.concat(this.$refs.tree.getCheckedKeys());
			if (arr.length === 0) {
				this.$message.warning("请设置权限 !");
				return;
			}
			this.permissionIds = arr.toString();
			this.updaterole();
		},
		updaterole() {
			let qs = require("qs");
			let data = qs.stringify({
				id: this.$route.params.id,
				name: this.name,
				description: this.description,
				// permissionIds:this.permissionIds
				permissionIds: this.permissionIds
			});
			this.Axios(
				{
					params: data,
					url: "/api-platform/role/update",
					type: "post",
					option: {}
				},
				this
			).then(result => {
				if (result.data.code === 200) {
					this.$router.back(-1);
					this.reload();
				}
			});
		},
		getrole(id) {
			this.Axios(
				{
					params: {
						roleId: id
					},
					option: {enableMsg: false},
					type: "get",
					url: "/api-platform/role/get"
				},
				this
			).then(
				result => {
					this.name = result.data.data.name;
					this.description = result.data.data.description;
					result.data.data.permissionRoles.map(item => {
						this.editpermission.push(item.permissionId);
					});
					this.editpermission = JSON.parse(JSON.stringify(this.editpermission));
					console.log(this.editpermission);
					console.log(result.data);
				},
				({ type, info }) => {}
			);
		},
		getAllpermission() {
			this.Axios(
				{
					params: {},
					option: {enableMsg: false},
					type: "get",
					url: "/api-platform/permission/listAllPermission"
				},
				this
			).then(
				result => {
					let code = Math.min.apply(
						null,
						result.data.data.map(item => {
							return item.parentCode;
						})
					);
					this.role = this.filterArray(result.data.data, code);
				},
				({ type, info }) => {}
			);
		},
		filterArray(data, parent) {
			let vm = this;
			var tree = [];
			var temp;
			for (var i = 0; i < data.length; i++) {
				if (data[i].parentCode == parent) {
					var obj = data[i];
					temp = this.filterArray(data, data[i].id);
					if (temp.length > 0) {
						obj.children = temp;
					}
					tree.push(obj);
				}
			}
			return tree;
		}
	},
	created() {
		this.getAllpermission();
		this.getrole(this.$route.params.id);
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
.edit_role {
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
		}
		.role_case {
			overflow: hidden;
			padding: 20px 0;
		}
	}
	.role_management {
		background-color: white;
		margin-top: 10px;
		padding-bottom: 10px;
		overflow: hidden;
		.top_title {
			padding: 0 10px;
			line-height: 60px;
			overflow: hidden;
			border-bottom: @border;
		}
		.el-tree-node__content {
			height: 36px;
		}
		// .el-tree-node>.el-tree-node__children{
		//     padding-left: 18px;
		// }
	}
}
</style>
