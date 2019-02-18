<template>
  <div class="add_role">
    <div class="top_list">
      <el-button
        size="small"
        type="primary"
        @click="dialogVisible=true"
        class="el-icon-arrow-left"
      >返回</el-button>
    </div>
    <div class="bottom_list">
      <div class="top_title">
        <h4>添加角色</h4>
      </div>
      <div class="role_case">
        <el-col :span="16">
          <el-form label-width="200px">
            <el-form-item label="角色名：">
              <el-input size="small"></el-input>
            </el-form-item>
            <el-form-item label="角色名：">
              <el-input
                type="textarea"
                rows="6"
                size="small"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>
    <div class="role_management">
      <div class="top_title">
        <h4>权限设置</h4>
      </div>
      <div>
        <el-tree
          :data="role"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
      
          
        >
        </el-tree>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role: [
        {
          label: "第一级",
          children: [
            {
              id: 7,
              label: "二级 3-1",
              children: [
                {
                  id: 7,
                  label: "三级 3-1"
                }
              ]
            }
          ]
        },
        {
          label: "第一级"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
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
.add_role {
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
    }
    .role_case {
      overflow: hidden;
      padding: 20px 0;
    }
  }
  .role_management {
    background-color: white;
    margin-top: 10px;
    padding-bottom: 10px;
    overflow: hidden;
    .top_title {
      padding: 0 10px;
      line-height: 60px;
      overflow: hidden;
      border-bottom: @border;
    }
    .el-tree-node__content{
        height: 36px;
    }
    // .el-tree-node>.el-tree-node__children{
    //     padding-left: 18px;
    // }
  }
}
</style>
