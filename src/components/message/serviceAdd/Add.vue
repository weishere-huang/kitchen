<template>
  <div class="add_service">
    <el-form label-width="90px">
      <el-form-item label="地区：">
        <el-select
          v-model="provinceCode"
          placeholder="请选择"
          style="width:49%"
          size="small"
          @change="getCity"
        >
          <el-option
            v-for="item in provinces"
            :key="item.value"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="citycode"
          placeholder="请选择"
          style="width:49%"
          size="small"
          @change="getcitycode"
        >
          <el-option
            v-for="item in citys"
            :key="item.value"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="网点名称：">
        <el-input
          v-model="addMsg.title"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-input
          v-model="addMsg.address"
          size="small"
          style="width:99%"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务热线：">
        <el-input
          v-model="addMsg.phone"
          size="small"
          style="width:200px"
          placeholder="如：028-12345678"
        ></el-input>
      </el-form-item>
      <el-form-item label="工作时间：">
        <el-input
          v-model="addMsg.workingHours"
          size="small"
          style="width:200px"
          placeholder="如：09:00-18:00"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="服务范围："
        style="margin-bottom: 0px;"
      >
        <el-checkbox-group v-model="addMsg.serviceMode1">
          <el-checkbox label="0">送修</el-checkbox>
          <el-checkbox label="1">寄修</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      provinces: [],
      citys: [],
      areaName:null,
      citycode:"",
      provinceCode:"",
    };
  },
  methods:{
    //获取市
    getCity(){
      this.areaName=this.provinces.find(item =>{return this.provinceCode===item.code}).name;
      console.log(this.areaName);
      this.citys=[];
      this.Axios(
        {
          params: {
            code:this.provinceCode
          },
          option: {
            enableMsg:false
          },
          type: "get",
          url: "/api-platform/network/findAllCity"
        },
        this
      ).then(
        result => {
          this.citys = result.data.data;
        },
        ({type, info}) => {
        }
      );
    },
    //获取所有省
    getAllProvince(){
      this.Axios(
        {
          params: {},
          option: {
            enableMsg:false
          },
          type: "get",
          url: "/api-platform/network/AllProvince"
        },
        this
      ).then(
        result => {
          this.provinces = result.data.data;
        },
        ({type, info}) => {
        }
      );
    },
    //选择市时改变地区名字
    getcitycode(){
      this.areaName += " " + this.citys.find(item =>{return this.citycode===item.code}).name;
      console.log(this.areaName);
    },
  },
  created(){
    this.getAllProvince();
  },
  props: {
    addMsg: {
      areaName: this.areaName,
      title: {},
      address: {},
      phone: {},
      workingHours: {},
      serviceMode: {
      serviceMode1: {},
        type:Array
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
.add_service {
  font-size: 14px;
  color: @font-normal;
  .el-form {
    padding-top: 16px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
}
</style>
