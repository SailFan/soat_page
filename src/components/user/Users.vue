<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->

    <el-card >
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入用户姓名，邮箱，电话进行搜索" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button>添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="账号" prop="nickname"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="冻结" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="权限" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="small"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[2,4,10,20]" :page-size="queryInfo.pagesize"
        layout="total,prev, pager, next, sizes, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagesize: 2,
        pagenum: 1
      },
      userlist: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/auth/getUser', { params: this.queryInfo })
      if (res.code !== 20000) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.total
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChange (userInfo) {
      const { data: res } = await this.$http.get('/auth/changeStatus', { params: { id: userInfo.id } })
      if (res.code !== 20000) {
        userInfo.id = !userInfo.id
        return this.$message.error('更新用户状态失败')
      }
      return this.$message.success('更新用户状态成功')
    }
  }
}

</script>

<style lang="less" scoped>
</style>
