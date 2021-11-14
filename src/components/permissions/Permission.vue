<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="permissions" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="权限名称" prop="permissionsList"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      permissions: []
    }
  },
  created () {
    this.permissionslist()
  },
  methods: {
    async permissionslist () {
      const { data: res } = await this.$http.get('/role/getRoleList')
      if (res.code !== 20000) {
        return this.$message.error('获取角色列表失败')
      }
      this.permissions = res.data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
