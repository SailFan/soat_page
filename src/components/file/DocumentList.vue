<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文档</el-breadcrumb-item>
    </el-breadcrumb>
    <el-cart>
     <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入文档名称搜索">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button plain @click="addFile">添加文档</el-button>
        </el-col>
      </el-row>
      <el-table
      style="width: 100%">
      <el-table-column
        prop="date"
        label="文档名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="修改时间">
      </el-table-column>
       <el-table-column
        prop="address"
        label="类型">
      </el-table-column>
    </el-table>
    </el-cart>
  </div>
</template>

<script>
export default {
  methods: {
    addFile () {
      this.$router.push({ path: '/document' })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
