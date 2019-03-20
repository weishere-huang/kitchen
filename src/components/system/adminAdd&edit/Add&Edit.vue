<template>
	<div calss="admin_add">
		<el-form label-width="100px" style="margin-top:20px;" :model="addInfo" :rules="rules" ref="ruleForm">
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
				<el-input placeholder="输入11位手机号码（可用于登录）" size="small" style="width:95%" v-model="addInfo.phone" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="角色选择：" style="margin-bottom:5px;" prop="roleId">
				<el-select
					v-model="roleId"
					placeholder="请选择"
					style="width:95%"
					size="small"
					@change="getroleId"
				>
					<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
export default {

	data() {
		return {
			options: {},
			roleId: this.addInfo.roleId,
      rules:{
			  account:[
          { required: true, message: '请输入账号', trigger: 'blur' },
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
        password:[
          {
            validator: (rule, value, callback) => {
              if (/^[\w.]{6,20}$/.test(value) == false) {
                callback(new Error("必须为6~20位字符组成，区分大小写"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        phone:[
          { required: true, message: '请输入电话', trigger: 'blur' },
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
        roleId:[
          { required: true, message: '请选择角色', trigger: 'change' },
        ],
      }
		};
	},
	props: {
		addInfo: {
			userName: {},
			password: {},
			confirmPassword: {},
			phone: {},
			roleId: {}
		}

	},
	methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("信息有误");
          return false;
        }
      });
    },
		getroleId() {
			this.addInfo.roleId = this.roleId;
		},
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
          this.options = result.data.data.filter(item=> item.id!==2)

				},
				({ type, info }) => {}
			);
		}
	},
	created() {
		this.getRoleList();
		console.log("this.addInfo");
		console.log(this.addInfo);
	},
	watch: {
		addInfo() {
			if (this.addInfo.roleId != null) {
				this.roleId = this.addInfo.roleId;
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
