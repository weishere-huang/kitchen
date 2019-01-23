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
      >
      </el-table-column>
      <el-table-column
        label="操作"
        :width="handle"
      >
        <template slot-scope="scope">
          <el-button
            v-if="detalisShow"
            size="mini"
            type="text"
            @click="handleDetails(scope.$index, scope.row)"
          >查看</el-button>
          <el-button
            v-if="editShow"
            size="mini"
            type="text"
            @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            v-if="deleteShow"
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>

</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    detalisShow:{},
    editShow:{},
    deleteShow:{},
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

