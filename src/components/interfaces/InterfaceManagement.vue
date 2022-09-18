<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工程</el-breadcrumb-item>
      <el-breadcrumb-item>接口列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-button type="primary" @click="addInterface">添加接口</el-button>
      </el-row>
      <template>
        <el-table
          :data="interfaceList"
          stripe
          style="width: 100%">
          <el-table-column
           prop="id"
           width="50"
           label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="接口名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="path"
            label="接口路径"
            width="180">
          </el-table-column>
          <el-table-column
            prop="method"
            label="接口分类">
          </el-table-column>
          <el-table-column
            prop="env"
            label="域名">
          </el-table-column>
          <el-table-column
            prop="run"
            label="状态">
            <template slot-scope="scope">
           <span>{{scope.row.run|capitalize}}</span>
        </template>
          </el-table-column>
           <el-table-column label="操作" width="200px">
            <template  slot-scope="scope">
                <el-button type="text" size="small" @click="openInterface(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="delInterface(scope.row)">删除</el-button>
                <el-button type="text" size="small" @click="runOneInterface(scope.row)">运行</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </template>
<!--      添加接口dialog开始-->
      <el-dialog
        title="添加接口"
        :visible.sync="addInterfacedialogVisible"
        width="30%">
        <el-form label-width="80px" :rules="addInterfaceFormRules" :model="interfaceform" ref="addInterfaceFormRef">
          <el-form-item label="接口分类" prop="interfaceType">
            <el-input  placeholder="请输入接口分类" v-model="interfaceform.interfaceType"></el-input>
          </el-form-item>
          <el-form-item label="接口名称" prop="interfaceName">
            <el-input  placeholder="请输入接口名称" v-model="interfaceform.interfaceName"></el-input>
          </el-form-item>
          <el-form-item label="接口协议">
          <el-select v-model="interfaceform.interfacePath" placeholder="协议类型">
            <el-option label="get" value="get"></el-option>
            <el-option label="post" value="post"></el-option>
            <el-option label="delete" value="delete"></el-option>
            <el-option label="update" value="update"></el-option>
          </el-select>
          </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button  @click="closeInterfaceDialogClosed">取 消</el-button>
              <el-button type="primary" @click="addInterface">确 定</el-button>
          </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      total: 0,
      interfaceList: {

      },
      queryInfo: {
        pageSize: 20,
        currentPage: 1
      },
      interfaceform: {
        interfaceType: '',
        interfaceName: '',
        interfacePath: 'get'
      },
      addInterfacedialogVisible: false,
      addInterfaceFormRules: {
        interfaceType: [
          {
            required: true,
            message: '请输入接口分类',
            trigger: 'blur'
          }
        ],
        interfaceName: [
          {
            required: true,
            message: '请输入接口名称',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.saveProjectId()
    this.getAllInterface()
  },

  computed: {
    ...mapState(['projectId'])
  },
  filters: {
    capitalize (value) {
      if (value) return '通过'
      // eslint-disable-next-line no-return-assign
      return value = '失败'
    }
  },
  methods: {
    ...mapMutations(['updateProjectId']),
    saveProjectId () {
      const id = this.$route.query.id
      id && this.updateProjectId(id)
    },
    async runOneInterface (row) {
      const { data: res } = await this.$http.get('/interface/runInterface', { params: { id: row.id } })
      if (res.code !== 20000) return this.$message.error('运行接口失败')
    },
    async getAllInterface () {
      const { data: res } = await this.$http.get('/interface/getAllInterface', {
        params: {
          ...this.queryInfo,
          projectId: this.projectId
        }
      })
      if (res.code !== 20000) return this.$message.error('获取接口失败')
      this.total = res.data.total
      const temList = []
      for (const i in res.data.anInterface) {
        temList.push(res.data.anInterface[i])
      }
      this.interfaceList = temList
    },
    openInterface (row) {
      // this.$router.push({ path: '/iManagement', query: { id: row.id } })
      this.$router.push({ path: '/interfaceDetail', query: { id: row.id } })
    },
    showAddInterfaceDialog () {
      this.addInterfacedialogVisible = true
    },
    closeInterfaceDialogClosed () {
      this.addInterfacedialogVisible = false
      // this.$refs.addFormRef.resetFields()
    },
    addInterface () {
      this.$router.push({ path: '/interfaceDetail' })
      // interfaceDetail
      // this.$refs.addInterfaceFormRef.validate(async (valid) => {
      //   if (valid === false) return
      //   const { data: res } = await this.$http.post('/interface/addInterface', this.interfaceform)
      //   console.log(res)
      // })
    },
    async delInterface (row) {
      const { data: res } = await this.$http.get('/interface/delOneInterface', { params: { id: row.id } })
      if (res.code !== 20000) return this.$message.error('删除接口失败')
      this.$message.success('删除成功')
      this.getAllInterface()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
