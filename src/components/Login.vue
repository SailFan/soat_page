<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/1.png" alt="">
      </div>
      <!--登录表单-->
      <el-form label-width="0px" class="login_form" :model="Loginform" :rules="LoginformRules" ref="loginFormRef">
        <!--用户名-->
        <el-form-item prop="email">
          <el-input v-model="Loginform.email" prefix-icon="el-icon-s-custom" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="Loginform.password" prefix-icon="el-icon-unlock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--按键-->
        <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      Loginform: {
        email: 'afan6203@126.com',
        password: '123456'
      },
      // 这是表单的验证规则对象
      LoginformRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单函数
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login: function () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (valid === false) return
        const { data: res } = await this.$http.post('/auth/login', this.Loginform)
        if (res.code === 20003) {
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
          return this.$message.success('登录成功')
        } else if (res.code === 400032) {
          return this.$message.error('账号被锁定')
        } else {
          this.$message.error('用户或者密码不正确')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #dddddd;
    img{
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.btns{
  display: flex;
  justify-content: end;
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
