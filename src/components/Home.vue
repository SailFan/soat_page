<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="" alt="">
        <span>测试平台</span>
      </div>
      <el-button type="info" @click='logout'>登出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isColl ? '64px' : '200px'">
        <div class="toggle-buttom" @click="toggleC">|||</div>
        <el-menu
          router
          unique-opened
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse-transition="false"
          :collapse="isColl">
          <el-submenu :index="item.path" v-for='item in menulist' :key="item.id" @click="savaNav(item.path)">
            <template slot="title">
              <i :class="iclist[item.id]" @click="savaNav(item.path)"></i>
              <span @click="savaNav(item.path)">{{item.navName}}</span>
            </template>
              <el-menu-item :index="item2.path" v-for="item2 in item.list" :key="item2.id" @click="savaNav(item2.path)" >
                <template slot="title">
                  <i @click="savaNav(item2.path)" class="el-icon-menu"></i>
                  <span @click="savaNav(item2.path)">{{item2.navName}}</span>
                </template>
              </el-menu-item>
          </el-submenu>
<!--          <el-menu-item :index="item.path" v-for="item in menulist" :key="item.path">-->
<!--            <i :class="iclist[item.id]"></i>-->
<!--            <span>{{item.navName}}</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menulist: [],
      iclist: {
        1: 'el-icon-s-unfold',
        2: 'el-icon-s-data',
        3: 'el-icon-s-custom',
        4: 'el-icon-s-management',
        5: 'el-icon-setting'
      },
      isColl: false,
      activePath: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('/nav/getNav')
      if (res.code !== 20000) return this.$message.error(res.msg)
      for (const resKey in res.data) {
        if (res.data[resKey].list.length === 0) {
          delete res.data[resKey].list
        }
      }
      this.menulist = res.data
    },
    toggleC () {
      this.isColl = !this.isColl
    },
    savaNav (activePath) {
      // window.sessionStorage.setItem('activePath', activePath)
      // this.activePath = activePath
      this.$router.push(activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #EAEDF1;
}
.toggle-buttom {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
<!--          :default-active="activePath"-->
