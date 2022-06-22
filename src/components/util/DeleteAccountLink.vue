<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工具</el-breadcrumb-item>
      <el-breadcrumb-item>删除账号关联</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="delete_account_box">
       <el-form ref="deleteAccountFormRef" :model="linkform" label-width="80px" :rules="deleteAccountFormRules"  >
        <el-form-item label="邮箱名称" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" clearable ></el-input>
        </el-form-item>
         <el-form-item label="ThirdId" prop="thirdId">
        <el-input v-model="form.thirdId" placeholder="请输入ThirdId值" clearable ></el-input>
        </el-form-item>
        <el-form-item>
      <el-button type="primary"  @click="deleteLink">删除</el-button>
      <el-button @click="queryLink">查询</el-button>
      <el-button type="info" @click="resetDeleteAccountForm">重置</el-button>
      </el-form-item>
        </el-form>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      linkform: {
        email: '',
        thirdId: ''
      },
      deleteAccountFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        thirdId: [
          { required: true, message: '请输入thirdId', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetDeleteAccountForm () {
      this.$refs.deleteAccountFormRef.resetFields()
    },
    queryLink () {
      this.$refs.deleteAccountFormRef.validate(async (valid) => {
        if (valid === false) return
        const { data: res } = await this.$http.post('/tools/getAccountLink', this.linkform)
        console.log(res)
      })
    },
    deleteLink () {
      this.$refs.deleteAccountFormRef.validate(async (valid) => {
        if (valid === false) return
        console.log('111')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.delete_account_box {
  width: 60%;
  border-radius: 3px;
  // position: absolute;
  // top: 50%;
  // left: 50%;
  transform: translate(30%);
  }
</style>
