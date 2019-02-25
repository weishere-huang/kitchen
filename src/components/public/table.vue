<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      @row-dblclick="rowDblclick"
      stripe
      size="small"
      tooltip-effect="light"
      @selection-change="handleSelectionChange"
      :header-cell-style="{'background-color':'#f1f1f1','color':'#333333', 'font-weight': 'normal'}"
    >
      <el-table-column
        type="selection"
        width="30"
        v-if="selectShow"
      >
      </el-table-column>
      <el-table-column
        v-for="(item, index) in column"
        :key="index"
        :label="item.label"
        :min-width="item.width"
        :prop="item.prop"
        show-overflow-tooltip
        :formatter="item.formatter"
        :class-name="item.className"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        :width="handle"
        v-if="handleShow"
      >
        <template
          slot-scope="scope"
          @click.stop
        >
          <el-button
            v-if="detalisShow"
            size="small"
            type="text"
            @click.stop.prevent="handleDetails(scope.$index, scope.row)"
          >查看</el-button>
          <el-button
            v-if="editShow"
            size="small"
            type="text"
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
              v-if="deleteShow"
            >删除</el-button>
          </el-popover>
          <!-- <el-button
            v-if="deleteShow"
            size="small"
            type="text"
            @click.stop.prevent="handleDelete(scope.$index, scope.row)"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>
<script>
export default {
  data() {
    return {
      visible2: false
    };
  },
  props: {
    handleShow: {},
    detalisShow: {},
    editShow: {},
    deleteShow: {},
    handleSelectionChange: {
      type: Function
    },
    column: {
      type: Array
    },
    data: {
      type: Array
    },
    rowDblclick: {
      type: Function
    },
    selectShow: {
      type: Boolean
    },
    handle: {
      type: Number
    }
  },
  methods: {
    handleDetails(index, rowData) {
      let params = { type: "detalis", index: index, rowData: rowData };
      this.$emit("handlechange", params);
    },
    handleEdit(index, rowData) {
      let params = { type: "edit", index: index, rowData: rowData };
      this.$emit("handlechange", params);
    },
    handleDelete(index, rowData) {
      rowData.visible = false;
      let params = { type: "delete", index: index, rowData: rowData };
      this.$emit("handlechange", params);
    }
  }
};
</script>
<style lang="less">
.table_title_bgcolor {
  background-color: red;
  font-weight: normal;
}
</style>

