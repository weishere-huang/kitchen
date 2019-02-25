<template>
  <div class="area_list">
    <div class="province_case">
      <ul>
        <li
          v-for="(item, index) in province"
          :key="index"
          @click="getMsg(index,item)"
          :class="activeIndex==index?'active_class':''"
        >{{item}}</li>
      </ul>
    </div>
    <div class="city_case">
      <el-checkbox-group v-model="checkedCities" :max="1">
        <el-checkbox
          v-for="city in cities"
          :label="city"
          :key="city"
        >{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div
      class="district_case"
      v-if="districtShow"
    >
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox
          v-for="city in distric"
          :label="city"
          :key="city"
        >{{city}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    districtShow: {},
    // province:{},
    // cities:{},
    // distric:{}
    // getMsg:{}
  },
  data() {
    return {
      activeIndex: "0",
      checkedCities: [],
      cities: ["成都市", "遂宁市", "泸州市", "雅安市", "绵阳市", "南充市"],
      province: ["四川", "北京", "云南", "西藏", "湖北", "湖南", "广东"],
      distric:[],
      // districtShow: [],
    };
  },
  methods: {
    getMsg(index, item) {
      this.activeIndex = index;
      console.log(index, item);
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
.area_list {
  display: flex;
  // flex-direction: row;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  font-size: 14px;
  color: @font-normal;
  overflow: hidden;
  padding: 10px 0;
  .province_case {
    // float: left;
    width: 30%;
    height: 200px;
    overflow: scroll;
    li {
      list-style-type: none;
      line-height: 28px;
      margin-bottom: 5px;
      padding: 0 10px;
      cursor: pointer;
      &:hover {
        background-color: #1cc09f;
        color: white;
      }
    }
    border: @border;
    border-radius: 5px;
    padding: 5px;
  }
  .city_case {
    width: 30%;
    // float: left;
    border: @border;
    border-radius: 5px;
    padding: 5px;
    height: 200px;
    overflow: scroll;
    // margin-left: 20px;
    .el-checkbox + .el-checkbox {
      margin-left: 0px;
    }
    .el-checkbox {
      display: block;
      line-height: 28px;
      margin-bottom: 5px;
      padding: 0 10px;
    }
    .el-checkbox__input {
      float: right;
      line-height: 30px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #1cc09f;
      border-color: #1cc09f;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: @font-normal;
    }
  }
  .district_case {
    // margin-left: 20px;
    width: 30%;
    // float: left;
    border: @border;
    border-radius: 5px;
    padding: 5px;
    height: 200px;
    overflow: scroll;
    .el-checkbox + .el-checkbox {
      margin-left: 0px;
    }
    .el-checkbox {
      display: block;
      line-height: 28px;
      margin-bottom: 5px;
      padding: 0 10px;
    }
    .el-checkbox__input {
      float: right;
      line-height: 23px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #1cc09f;
      border-color: #1cc09f;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: @font-normal;
    }
  }
  .active_class {
    background-color: #1cc09f;
    color: white;
  }
}
</style>
