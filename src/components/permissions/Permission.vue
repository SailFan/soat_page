<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type="primary">添加角色</el-button>
      </el-row>
      <el-table :data="permissions" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <span v-if="scope.row.permissionsList.length==0">暂无权限</span>
            <el-row v-else :class="['bdbottom', i1 === 0 ? 'bdtop' : '']" v-for="(item1, i1) in scope.row.permissionsList" :key="item1.pid">
              <el-col :span="10">
                <el-tag>{{item1.name}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="14"></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template>
<!--            slot-scope="scope"-->
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button  size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button  size="mini" type="warn" icon="el-icon-setting">分配权限</el-button>
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
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eeeeee;
}
.bdbottom {
  border-bottom: 1px solid #eeeeee;
}
.el-empty {
  height: 10px;
  image {
    size: 5px;
  }
}
</style>
