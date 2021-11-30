<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="showAddRoleDialog">添加账号</el-button>
      </el-row>
      <el-table  border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="地址" prop="roleName"></el-table-column>
        <el-table-column label="账号" prop="roleTag"></el-table-column>
        <el-table-column label="密码" prop="roleTag"></el-table-column>
        <el-table-column label="创建人" prop="roleTag"></el-table-column>
        <el-table-column label="类型" prop="roleTag"></el-table-column>
        <el-table-column label="修改人" prop="roleTag"></el-table-column>
        <el-table-column label="修改时间" prop="roleTag"></el-table-column>

        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="editRoleDialog(scope.row)">编辑</el-button>
            <el-button  size="mini" type="danger" icon="el-icon-delete" @click="removeRole(scope.row.rid)">删除</el-button>
            <el-button  size="mini" type="warn" icon="el-icon-setting" @click="showPermissionDialog()">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

</style>
