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
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="documentName" label="文档名称" width="180"> </el-table-column>
      <el-table-column prop="owner" label="所属者" width="180"></el-table-column>
      <el-table-column prop="updateTime" label="最近修改时间"></el-table-column>
      <el-table-column label="公开/私有" prop="isShow">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑"  placement="top">
              <el-button type="primary" icon="el-icon-edit" size="small" @click="editDocument(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small" @click="removeDocument(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="预览" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="small" @click="previewDocument(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
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
    },
    editDocument (id) {
      console.log(id)
    },
    removeDocument (id) {
      console.log(id)
    },
    previewDocument (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
