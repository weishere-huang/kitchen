<template>
  <div calss="admin_add">
    <el-form
      label-width="100px"
      style="margin-top:20px;"
    >
      <el-form-item label="登录名：">
        <el-input
          placeholder="6~20位字符组成，以字母开头"
          size="small"
          style="width:95%"
          v-model="addInfo.account"
        ></el-input>
      </el-form-item>
      <el-form-item label="登录密码：">
        <el-input
          placeholder="6~20位字符组成，区分大小写"
          size="small"
          style="width:95%"
          type="password"
          v-model="addInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码：">
        <el-input
          placeholder="请再次输入登录密码"
          size="small"
          style="width:95%"
          type="password"
          v-model="addInfo.confirmPassword"
        ></el-input>
      </el-form-item>
      <el-form-item label="绑定手机：">
        <el-input
          placeholder="输入11位手机号码（可用于登录）"
          size="small"
          style="width:95%"
          v-model="addInfo.phone"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="角色选择："
        style="margin-bottom:5px;"
      >
        <el-select
          v-model="roleId"
          placeholder="请选择"
          style="width:95%"
          size="small"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
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
      roleId:this.addInfo.roleId
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
  methods:{
    clickContro(){

    },
    getRoleList(){
      this.Axios({
        params: {
          page:this.pageIndex,
          size:this.pageSize
        },
        option: {},
        type: "get",
        url: "/api-platform/role/listAllRole"
      }, this).then(result => {
          console.log(result.data);
          this.options = result.data.data;
        }, ({type, info}) => {}
      );
    },
  },
  created(){
    this.getRoleList();
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
