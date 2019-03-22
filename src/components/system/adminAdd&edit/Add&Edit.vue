<template>
	<div calss="admin_add">
		<el-form
			label-width="100px"
			style="margin-top:20px;"
			:model="addInfo"
			:rules="rules"
			ref="ruleForm"
		>
			<el-form-item label="登录名：" prop="account">
				<el-input
					placeholder="6~20位字符组成，以字母开头"
					size="small"
					style="width:95%"
					v-model="addInfo.account"
					maxlength="15"
				></el-input>
			</el-form-item>
			<el-form-item label="登录密码：" prop="password">
				<el-input
					placeholder="6~20位字符组成，区分大小写"
					size="small"
					style="width:95%"
					type="password"
					v-model="addInfo.password"
					maxlength="20"
				></el-input>
			</el-form-item>
			<el-form-item label="确认密码：">
				<el-input
					placeholder="请再次输入登录密码"
					size="small"
					style="width:95%"
					type="password"
					v-model="addInfo.confirmPassword"
					maxlength="20"
				></el-input>
			</el-form-item>
			<el-form-item label="绑定手机：" prop="phone">
				<el-input
					placeholder="输入11位手机号码（可用于登录）"
					size="small"
					style="width:95%"
					v-model="addInfo.phone"
					maxlength="20"
				></el-input>
			</el-form-item>
			<el-form-item label="角色选择：" style="margin-bottom:5px;" prop="roleId">
				<el-select v-model="addInfo.roleId" placeholder="请选择" style="width:95%" size="small">
					<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div style="text-align: right;width:99%;padding:10px 0 20px 0;">
			<el-button @click="handleCancel" size="small" plain>取 消</el-button>
			<el-button type="primary" @click="handleAffirm('ruleForm')" size="small">确 定</el-button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			options: {},
			roleId: '',
			rules: {
				account: [
					{ required: true, message: "请输入账号", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/.test(value) == false) {
								callback(new Error("必须为6~20位字符组成,以字母开头"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				password: [
          {
            validator: (rule, value, callback) => {
              if (/^\w{6,20}$/.test(value) === false) {
                callback(new Error("请输入6到20位的密码"));
              } else if (/(\w)*(\w)\2{5}(\w)*/g.test(value) === true) {
                callback(new Error("你的密码过于简单，请重新输入"));
              } else {
                callback();
              }
            }
          }
				],
				phone: [
					{ required: true, message: "请输入电话", trigger: "blur" },
					{
						validator: (rule, value, callback) => {
							if (/^1[34578]\d{9}$/.test(value) == false) {
								callback(new Error("请输入正确的电话号码"));
							} else {
								callback();
							}
						},
						trigger: "blur"
					}
				],
				roleId: [{ required: true, message: "请选择角色", trigger: "change" }]
			},
			addInfo: {
				userName: "",
				password: "",
				confirmPassword: "",
				phone: "",
				roleId: ""
			}
		};
	},
	props: {
		editInfo: {
			account: {},
			password: {},
			confirmPassword: {},
			phone: {},
			roleId: {}
		}
	},
	methods: {
		handleCancel(value) {
			let params = { type: "cancel", isHide: false };
			this.$emit("beforeadd", params);
		},
		handleAffirm(formName) {
			let params = { type: "affirm", value: this.addInfo, isHide: false };
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit("beforeadd", params);
				} else {
					return false;
				}
			});
		},
		// submitForm(formName) {
		// 	this.$refs[formName].validate(valid => {
		// 		if (valid) {
		// 		} else {
		// 			console.log("信息有误");
		// 			return false;
		// 		}
		// 	});
		// },
		// getroleId() {
		// 	this.addInfo.roleId = this.roleId;
		// },
		getRoleList() {
			this.Axios(
				{
					params: {
						page: -1,
						size: this.pageSize
					},
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
					this.options = result.data.data.filter(item => item.id !== 2);
				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getRoleList();
		console.log("this.addInfo");
		console.log(this.addInfo);
		if (this.editInfo != null) {
			this.addInfo = this.editInfo;
		}
	},
	watch: {
		editInfo() {
			if (this.editInfo != null) {
				this.addInfo = this.editInfo;
			}
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
.admin_add {
	font-size: 14px;
	color: @font-normal;
}
</style>
