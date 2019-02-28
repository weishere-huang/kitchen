<template>
  <div class="add_service">
    <el-form label-width="90px" :model="addMsg" ref="addMsg" :rules="serviceRules">
      <el-form-item label="地区：">
        <el-select
          v-model="provinceCode"
          placeholder="请选择"
          style="width:49%"
          size="small"
          @change="beforeCity"
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
        <el-checkbox-group
          v-model="serviceMode"
          @change="changeMode"
        >
          <el-checkbox label="送修"></el-checkbox>
          <el-checkbox label="检修"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {

        serviceRules:{

        },
        provinces: [],
        citys: [],
        serviceMode: [],
        areaName: null,
        provinceCode: null,
        citycode: null
      };
    },
    props: {
      addMsg: {
        title: {},
        address: {},
        phone: {},
        workingHours: {},
        serviceMode: {},
        areaCode: {},
      }
    },
    methods: {
      changeMode() {
        this.addMsg.serviceMode = this.serviceMode;
      },
      //获取所有省
      getAllProvince() {
        this.Axios(
          {
            params: {},
            option: {
              enableMsg: false
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
      //获取市
      beforeCity(){
        this.areaName = this.provinces.find(item => {
          return this.provinceCode === item.code;
        }).name;
        this.addMsg.areaCode = this.areaName
        console.log(this.areaName);
        this.citys = [];
        this.getCity();
      },
      getCity() {
        this.Axios(
          {
            params: {
              code: this.provinceCode
            },
            option: {
              enableMsg: false
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
      getcitycode() {
        this.areaName += " " + this.citys.find(item => {
          return this.citycode === item.code;
        }).name;
        this.addMsg.areaCode = this.areaName
        console.log(this.areaName);
        this.citys=[];
      },
      //编辑赋值方法 , 服务范围可以
      startedit() {
        //截取地区长度
        // let arr = this.addMsg.areaCode.split(" ");
        // this.provinceCode = this.provinces.find(item => {
        //   return arr[0] === item.name;
        // }).code;
        //获取市信息
        // this.getCity();
        // if (arr.length > 1) {
        //   let p = this.citys.find(item => {
        //     return arr[1] === item.name;
        //   });
        //   if(p!=null){
        //     this.citycode = p.code;
        //   }
        // }

        // 服务范围
        console.log("执行");
        this.addMsg.serviceMode = this.addMsg.serviceMode.split(",");
        this.serviceMode = this.addMsg.serviceMode;
      }
    },
    created() {
      this.getAllProvince();
      //编辑用
      if(this.addMsg.id!=null){
        this.startedit();
      }
    },
    watch:{
      addMsg(){
        if(this.addMsg.id!=null){
          this.startedit();
        }
      },
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
