<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试集</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <el-card>-->
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="预览" name="first">预览111</el-tab-pane>
          <el-tab-pane label="编辑" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="运行" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </template>
<!--    </el-card>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
