<template>
  <div class="classify_list">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        class="el-icon-circle-plus-outline"
        @click="dialogVisible=true"
      >添加分类
      </el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>商品分类</h4>
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
            label="分类名称"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品数量"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否显示"
            min-width="60"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div @click.stop.prevent="changeUp(scope.$index, scope.row)">
                <i
                  class="iconfont"
                  v-if="scope.row.show=='0'"
                  style="color:green;cursor: pointer;"
                >&#xe659;</i>
                <i
                  class="iconfont"
                  v-if="scope.row.show=='1'"
                  style="color:red;cursor: pointer;"
                >&#xe658;</i>
              </div>

            </template>
          </el-table-column>
          <el-table-column
            label="排序"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="light"
                content="数值越大排序越靠前"
                placement="top"
              >
                <el-input
                  size="small"
                  type="number"
                  v-model="scope.row.sort"
                  style="width:80px;padding:0;"
                ></el-input>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleEdit(scope.$index, scope.row)"
              >修改
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click.stop.prevent="handleDelete(scope.$index, scope.row)"
              >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-form
        label-width="120px"
        style="padding-top:10px;"
      >
        <el-form-item label="分类名称：">
          <el-input
            type="text"
            size="small"
            style="width:90%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input
            type="text"
            size="small"
            style="width:50%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否显示："
          style="margin-bottom: 0px;"
        >
          <el-radio
            v-model="isShow"
            label="1"
          >是
          </el-radio>
          <el-radio
            v-model="isShow"
            label="2"
          >否
          </el-radio>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="dialogVisible = false"
          plain
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改分类"
      :visible.sync="editClassify"
      width="500px"
    >
      <el-form
        label-width="120px"
        style="padding-top:10px;"
      >
        <el-form-item label="分类名称：">
          <el-input
            type="text"
            size="small"
            style="width:90%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input
            type="text"
            size="small"
            style="width:50%;"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否显示："
          style="margin-bottom: 0px;"
        >
          <el-radio
            v-model="isShow"
            label="1"
          >是
          </el-radio>
          <el-radio
            v-model="isShow"
            label="2"
          >否
          </el-radio>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="editClassify = false"
          plain
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="editClassify = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editClassify: false,
      isShow: "1",
      dialogVisible: false,
      value: "",
      tableData: [
        {
          name: "炒菜",
          price: "9.8",
          classify: "素菜",
          number: "10",
          time: "5",
          content: "400克",
          show: "0",
          new: "0",
          hot: "1",
          sort: "100"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, rowData) {
      let params = { type: "edit", index: index, rowData: rowData };
      console.log(params);
      this.editClassify = true;
    },
    handleDelete(index, rowData) {
      let params = { type: "delete", index: index, rowData: rowData };
      console.log(params);
    },
    changeUp(index, val) {
      console.log(val);
      if (val.show == "1") {
        this.tableData[index].show = "0";
      } else {
        this.tableData[index].show = "1";
      }
    },
    getClassfy() {
      this.Axios(
        {
          params: {},
          option: {},
          type: "get",
          url: ""
        },
        this
      ).then(
        result => {
          this.tableData = result.data.data.content;
        },
        ({ type, info }) => {}
      );
    }
  },
  created() {
    this.getClassfy();
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
.classify_list {
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
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #1cc09f;
    background: #1cc09f;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #1cc09f;
  }
  .el-radio__inner:hover {
    border-color: #1cc09f;
  }
  .el-dialog__footer {
    padding: 10px 50px 20px;
  }
}
</style>

