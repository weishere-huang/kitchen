<template>
  <div class="server_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="toadd"
      >添加网点</el-button>
      <el-dialog
        :close-on-click-modal="false"
        title="添加网点"
        :visible.sync="dialogAdd"
        width="500px"
      >
        <add-servive :addMsg="addMsg"></add-servive>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            @click="dialogAdd = false"
            size="small"
            plain
          >取 消</el-button>
          <el-button
            type="primary"
            @click="beforeadd"
            size="small"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>网点列表</h4>
        <div class="top_search">
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <el-select
              v-model="provinceCode"
              placeholder="———省———"
              size="small"
              @change="getCity()"
              :clearable="true"
            >
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col
            :span="10"
            style="padding:0 5px;"
          >
            <el-select
              v-model="citycode"
              placeholder="———市———"
              size="small"
              @change="getcitycode"
              :clearable="true"
            >
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col
            :span="4"
            style="padding:0 5px;"
          >
            <el-button
              size="small"
              plain
              @click="beforeSearch"
            >搜索</el-button>
          </el-col>
        </div>
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
          :editShow="true"
          :deleteShow="true"
          :handleShow="true"
        ></table-list>

      </div>
      <div
        class="block"
        style="margin-top:10px;float:right"
      >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[15, 30, 100]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      title="修改网点"
      :visible.sync="dialogEdit"
      width="500px"
    >
      <add-servive :addMsg="editMsg"></add-servive>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogEdit = false"
          size="small"
          plain
        >取 消</el-button>
        <el-button
          type="primary"
          @click="beforeupdate"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tableList from "../public/table";
import addServive from "./serviceAdd/Add";
export default {
  inject: ["reload"],
  data() {
    return {
      addMsg: {
        province: "",
        city: "",
        title:"",
        address: "",
        phone: "",
        workingHours: "",
        serviceMode: []
      },
      editMsg: {
        // province: "",
        // city: "",
        // name: "",
        // address: "",
        // tel: "",
        // time: "",
        // range: []
      },
      dialogAdd: false,
      dialogEdit: false,
      province: [],
      cities: [],
      currentPage: 1,
      provinceCode: "",
      citycode: "",
      items: [
        {
          label: "网点名称",
          prop: "title",
          width: 120
        },
        {
          label: "地区",
          prop: "areaCode",
          width: 80
        },
        {
          label: "详细地址",
          prop: "address",
          width: 140
        },
        {
          label: "服务热线",
          prop: "phone",
          width: 80
        },
        {
          label: "工作时间",
          prop: "workingHours",
          width: 70
        },
        {
          label: "服务范围",
          prop: "serviceMode",
          width: 60
        }
      ],
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      total: 10,
      areaName: null
    };
  },
  methods: {
    toadd() {
      this.editMsg = {};
      this.addMsg = {};
      this.dialogAdd = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
      this.getServiceList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getServiceList();
    },
    handlechange(params) {
      if (params.type === "edit") {
        this.editMsg = {};
        this.addMsg = {};
        Object.assign(this.editMsg, params.rowData);
        console.log(params);
        this.dialogEdit = true;

      }
      if (params.type === "delete") {
        console.log(params);
        this.deleteService(params.rowData.id);
      }
      if (params.type === "detalis") {
        console.log(params);
        this.userIds = params.rowData.order;
        // this.$router.push({ path: "/Order/Details/" + this.userIds });
      }
    },
    handleSelectionChange(selection) {
      console.log(selection);
    },
    getRow(row, event) {
      console.log(row);
    },
    beforeSearch() {
      this.pageIndex = 1;
      this.getServiceList();
    },
    //获取所有网点
    getServiceList() {
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize,
            areaName: this.areaName
          },
          option: {},
          type: "get",
          url: "/api-platform/network/list"
        },
        this
      ).then(
        result => {
          console.log(result.data);
          this.tableData = result.data.data.content;
          this.total = result.data.data.totalElement;
        },
        ({ type, info }) => {}
      );
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
          this.province = result.data.data;
        },
        ({ type, info }) => {}
      );
    },
    //删除网点
    deleteService(id) {
      let qs = require("qs");
      let data = qs.stringify({
        ids: id,
        enableOrDisable: 1
      });
      this.Axios(
        {
          params: data,
          url: "/api-platform/network/updatestate",
          type: "post",
          option: {}
        },
        this
      ).then(result => {
        if (result.data.code === 200) {
          this.reload();
        }
      });
    },
    //获取市
    getCity() {
      let p = this.province.find(item => {
        return this.provinceCode === item.code;
      });
      if(p!=null){
        this.areaName = p.name;
      }else{
        this.areaName = null;
      }
      this.citycode = null;
      console.log(this.areaName);
      this.cities = [];
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
          this.cities = result.data.data;
        },
        ({ type, info }) => {}
      );
    },
    //添加
    beforeadd() {
       this.addService();
    },
    addService() {
      let qs = require("qs");
      let data = qs.stringify({
        address: this.addMsg.address,
        areaCode: this.addMsg.areaCode,
        phone: this.addMsg.phone,
        title: this.addMsg.title,
        workingHours: this.addMsg.workingHours,
        serviceMode: this.addMsg.serviceMode.toString(),
      });
      this.Axios(
        {
          params: data,
          url: "/api-platform/network/add",
          type: "post",
          option: {}
        },
        this
      ).then(result => {
        if (result.data.code === 200) {
          this.reload();
        } else {
          this.$message.error("出错啦,请重新添加~");
        }
      });
    },
    //修改
    beforeupdate() {
       this.updateService();
      console.log(this.editMsg);
    },
    updateService() {
      let qs = require("qs");
      let data = qs.stringify({
        id: this.editMsg.id,
        address: this.editMsg.address,
        areaCode: this.editMsg.areaCode,
        phone: this.editMsg.phone,
        title: this.editMsg.title,
        workingHours: this.editMsg.workingHours,
        serviceMode: this.editMsg.serviceMode.toString()
      });
      this.Axios(
        {
          params: data,
          url: "/api-platform/network/update",
          type: "post",
          option: {
            enableMsg: false
          }
        },
        this
      ).then(result => {
        if (result.data.code === 200) {
          this.reload();
        } else {
          this.$message.error("出错啦,请重新修改~");
        }
      });
    },
    //选择市时改变地区名字
    getcitycode() {
      this.areaName +=
        " " +
        this.cities.find(item => {
          return this.citycode === item.code;
        }).name;
      console.log(this.areaName);
    }
  },
  created() {
    //查询网点列表
    this.getServiceList();
    //查询省
    this.getAllProvince();
  },
  components: {
    tableList,
    addServive
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
.server_list {
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
}
</style>

