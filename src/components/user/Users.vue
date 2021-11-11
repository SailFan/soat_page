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
          <el-input placeholder="请输入姓名搜索" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button @click="userVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="账号" prop="nickname"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="冻结" prop="status">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑"  placement="top">
              <el-button type="primary" icon="el-icon-edit" size="small" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small" @click="removeUserById(scope.row.id)"></el-button>
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
    <el-dialog
      title="添加用户"
      :visible.sync="userVisible"
      width="50%"
      @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"  type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="nickname">
          <el-input v-model="addForm.nickname"   placeholder="请输入登陆账号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"   placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"   placeholder="请输入电话号码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="userVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      title="编辑用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="nickname">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="editUserInfo">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, cb) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (reg.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }

    var checkPhone = (rule, value, cb) => {
      var reg = /^1[3456789]\d{9}$/
      if (reg.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }

    return {
      editForm: {},
      queryInfo: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      userlist: [],
      total: 0,
      editDialogVisible: false,
      userVisible: false,
      addForm: {
        username: '',
        password: '',
        nickname: '',
        email: '',
        phone: ''

      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名1到10位' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '密码6到10位' }
        ],
        nickname: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名3到10位' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkPhone }
        ]
      },
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 10, message: '用户名1到10位' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '密码6到10位' }
        ],
        nickname: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名3到10位' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { validator: checkPhone }
        ]
      }
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
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('/auth/addUser', this.addForm)
        if (res.code !== 20000) {
          return this.$message.error('添加用户失败')
        }
        this.userVisible = false
        this.getUserList()
        return this.$message.success('添加用户成功')
      })
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('/auth/getUserDetail', { params: { id: id } })
      if (res.code !== 20000) return this.$message.error('查询用户失败')
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('/auth/modificationUser', this.editForm)
        if (res.code !== 20000) return this.$message.error('更新失败')
        this.editDialogVisible = false
        this.getUserList()
        this.$message.success('更新用户信息成功')
      })
    },
    async removeUserById (id) {
      const confirmRes = await this.$confirm('是否永久删除该用户', '删除用户', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmRes)
      if (confirmRes !== 'confirm') {
        return this.$message.info('删除操作取消')
      }
      const { data: res } = await this.$http.get('/auth/delUser', { params: { id: id } })
      if (res.code !== 20000) return this.$message.error('删除用户失败')
      this.$message.success('删除用户成功')
      this.getUserList()
    }
  }
}

</script>

<style lang="less" scoped>
</style>
