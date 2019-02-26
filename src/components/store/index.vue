<template>
  <div class="store_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="$router.push('/AddMenu')"
      >添加商品</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>商品列表</h4>
        <div class="top_search">
          <el-col
            :span="9"
            style="padding:0 5px;"
          >
            <el-select
              v-model="value"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col
            :span="11"
            style="padding:0 5px;"
          >
            <el-input
              size="small"
              style="width:100%;"
              placeholder=""
              v-model="keyword"
            ></el-input>
          </el-col>
          <el-col
            :span="4"
            style="padding:0 5px;"
          >
            <el-button
              size="small"
              plain
            >搜索</el-button>
          </el-col>
        </div>
      </div>
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          size="small"
          stripe
          tooltip-effect="light"
          :header-cell-style="{'background-color':'#eee','color':'#333333', 'font-weight': 'normal'}"
        >
          <el-table-column
            label="名称"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.itemName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分类"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.itemCate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="*单价（元）"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-popover
                popper-class="color_text"
                ref="popover1"
                placement="right"
                trigger="focus"
                content="只保留小数点后两位"
              >
              </el-popover>
              ￥<el-input
                v-popover:popover1
                size="small"
                type="number"
                step="0.01"
                v-model="scope.row.itemPrice"
                style="width:60px;padding:0;"
                @change="handleInput(scope.row.price,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="库存"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.inventory }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="*烹饪时长(分钟)"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-input
                size="small"
                type="number"
                v-model="scope.row.cookingTime"
                style="width:60px;padding:0;"
                v-popover:popover
              ></el-input>
              <el-popover
                popper-class="color_text"
                ref="popover"
                placement="right"
                trigger="focus"
                content="只能是整数"
              >
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="净含量"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.itemWeight}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="*上架"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div @click.stop.prevent="changeUp(scope.$index, scope.row)">
                <i
                  class="iconfont"
                  v-if="scope.row.up==='0'"
                  style="color:green;cursor: pointer;"
                >&#xe659;</i>
                <i
                  class="iconfont"
                  v-if="scope.row.up==='1'"
                  style="color:red;cursor: pointer;"
                >&#xe658;</i>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="*新品"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div @click.stop.prevent="changeNew(scope.$index, scope.row)">
                <i
                  class="iconfont"
                  v-if="scope.row.new==='0'"
                  style="color:green;cursor: pointer;"
                >&#xe659;</i>
                <i
                  class="iconfont"
                  v-if="scope.row.new==='1'"
                  style="color:red;cursor: pointer;"
                >&#xe658;</i>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="*热销"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div @click.stop.prevent="changeHot(scope.$index, scope.row)">
                <i
                  class="iconfont"
                  v-if="scope.row.hot==='0'"
                  style="color:green;cursor: pointer;"
                >&#xe659;</i>
                <i
                  class="iconfont"
                  v-if="scope.row.hot==='1'"
                  style="color:red;cursor: pointer;"
                >&#xe658;</i>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="*排序"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-popover
                popper-class="color_text"
                ref="popover2"
                placement="right"
                trigger="focus"
                content="数值越大排序越靠前"
              >
              </el-popover>
              <el-input
                v-popover:popover2
                size="small"
                type="number"
                step="0"
                v-model="scope.row.sort"
                style="width:60px;padding:0;"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleEdit(scope.$index, scope.row)"
              >修改</el-button>
              <el-popover
                placement="top"
                width="180"
                v-model="scope.row.visible"
              >
                <p style="line-height:32px;text-align:center;"> <i
                    class="el-icon-warning"
                    style="color:#e6a23c;font-size:18px;margin-right:8px;"
                  ></i>确定删除吗？</p>
                <div style="text-align: center; margin: 0">
                  <el-button
                    size="small"
                    plain
                    @click="scope.row.visible = false"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)"
                  >确定</el-button>
                </div>
                <el-button
                  slot="reference"
                  type="text"
                >删除</el-button>
              </el-popover>
              <!-- <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleDelete(scope.$index, scope.row)"
              >删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>

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
      <div style="margin-top:10px;line-height:32px;padding-left:10px;color:#999999">提示：带“*”字段可以实时编辑</div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      currentPage: 1,
      value: "",
      options: [
        {
          label: "炒菜",
          value: "炒菜"
        },
        {
          label: "炖菜",
          value: "炖菜"
        },
        {
          label: "盐焗",
          value: "盐焗"
        },
        {
          label: "清蒸",
          value: "清蒸"
        },
        {
          label: "红烧",
          value: "红烧"
        }
      ],
      tableData: [
        {
          name: "素炒花菜",
          price: "9.8",
          classify: "素菜",
          inventory: "10",
          time: "5",
          content: "400克",
          up: "0",
          new: "0",
          hot: "1",
          sort: "100"
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      keyword: "",
      total: 0
    };
  },
  methods: {
    handleInput(e, index) {
      this.tableData[index].price = e.match(/^\d*(\.?\d{0,2})/g)[0] || null;
    },
    handleEdit(index, rowData) {
      let params = { type: "edit", index: index, rowData: rowData };
      console.log(params);
    },
    handleDelete(index, rowData) {
      rowData.visible = false;
      let params = { type: "delete", index: index, rowData: rowData };
      console.log(params);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageIndex = 1;
      this.pageSize = val;
      this.foodlist();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.foodlist();
    },
    changeNew(index, val) {
      console.log(val.new);
      if (val.new === "1") {
        this.tableData[index].new = "0";
      } else {
        this.tableData[index].new = "1";
      }
    },
    changeUp(index, val) {
      console.log(val.new);
      if (val.up === "1") {
        this.tableData[index].up = "0";
      } else {
        this.tableData[index].up = "1";
      }
    },
    changeHot(index, val) {
      console.log(val.new);
      if (val.hot === "1") {
        this.tableData[index].hot = "0";
      } else {
        this.tableData[index].hot = "1";
      }
    },
    foodlist() {
      this.Axios(
        {
          params: {
            page: this.pageIndex,
            size: this.pageSize
          },
          option: {},
          type: "get",
          url: "/api-mall/mallManage/itemList",
          loadingConfig: {
            target: document.querySelector(".store_list")
          }
        },
        this
      ).then(
        result => {
          console.log(result.data.data);
          this.tableData = result.data.data.content;
          this.total = result.data.data.totalElement;
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    this.foodlist();
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
.store_list {
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .el-popover--plain {
    padding: 4px 8px;
  }
}
.color_text {
  color: #1cc09f;
  padding: 4px 8px;
  width: auto;
}
</style>

