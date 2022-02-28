/*
 * @Author: sail
 * @Date: 2022-02-28 14:55:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2022-02-28 15:00:18
 */
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文档</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <mavon-editor v-model="value"/>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: '',
      defaultData: 'preview'
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
