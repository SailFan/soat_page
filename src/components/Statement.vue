<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计图表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="overview">
      <h1>统计页面</h1>
    <div class="headers">
      <div class="total">总共接口： 3333</div>
      <div class="totalP">总共项目： 333</div>
      <div class="runProject">正在运行的项目 333</div>
    </div>
    <div class="buttonc">
    <h1>统计图表</h1>
    <div class="chart">
      <template>
        <ve-line :data="chartData" :settings="chartSettings"></ve-line>
      </template>
    </div>
  </div>
  </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      chartData: {
        columns: ['日期', '接口响应时间时间', '接口错误率', '未定'],
        rows: [
          { 日期: '1/1', 接口响应时间时间: 1393, 接口错误率: 1093, 未定: 0.32 },
          { 日期: '1/2', 接口响应时间时间: 3530, 接口错误率: 3230, 未定: 0.26 },
          { 日期: '1/3', 接口响应时间时间: 2923, 接口错误率: 2623, 未定: 0.76 },
          { 日期: '1/4', 接口响应时间时间: 1723, 接口错误率: 1423, 未定: 0.49 },
          { 日期: '1/5', 接口响应时间时间: 3792, 接口错误率: 3492, 未定: 0.323 },
          { 日期: '1/6', 接口响应时间时间: 4593, 接口错误率: 4293, 未定: 0.78 }
        ]
      }
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.buttonc{
  margin-top: 20px;
}
.headers {
  width: 100%;
  height: 30%;
  display: flex;
  div {
    border: 1px solid #1e1e1e;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 20px;
    color: rgb(144, 135, 135);
  }
}
</style>
