<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工程</el-breadcrumb-item>
      <el-breadcrumb-item>工程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- <div class="search">
      <el-row>
        <el-col>
          <div>
            <span>项目名称：</span>
            <el-input
              type="text"
              prefix-icon="el-icon-search"
              placeholder="使用接口名称进行查询"
              style="width: 270px; cursor: pointer"
            ></el-input>
          </div>
        </el-col>
        </el-row>
    </div> -->
    <el-card class="box-card">
      <el-row>
        <el-button type="text" @click="showProjectDialog">新增工程</el-button>
        <el-dialog
        destroy-on-close
          title="新增工程"
          :visible.sync="projectDialogVisible"
          width="40%">
          <el-form ref="addProjectFormRef" :model="addProjectFormMode" label-width="80px" :rules="projectformRules">
            <el-form-item label="名称" prop="projectName">
              <el-input v-model="addProjectFormMode.projectName" placeholder="请输入工程名称"></el-input>
            </el-form-item>
            <el-form-item label="公共路径" prop="basePath">
              <el-input v-model="addProjectFormMode.basePath" placeholder="请输入该工程的基础URL"></el-input>
            </el-form-item>
            <el-form-item label="是否私密" prop="projectType">
              <el-switch v-model="addProjectFormMode.projectType"></el-switch>
            </el-form-item>
            <div>
              <el-button size="mini" type="text" icon="el-icon-plus" @click="addExtraInput">Env</el-button>
              <el-popover
                placement="top-start"
                title=""
                width="500"
                trigger="hover">
                <el-alert
                  title="参数操作指南"
                  type="info"
                  :closable="false">
                  <template slot='title'>
                    填写环境，ps. 测试环境、生成环境、开发环境
                  </template>
                </el-alert>
                <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
              </el-popover>
            </div>
            <div v-if="envList && envList.length > 0">
              <el-alert title="" type="info" :closable="false" :show-icon="false">
                <template slot='title'>
                  <div v-for="(item,index) in envList" :key="index">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item
                          :rules="[
      { required: true, message: '请输入环境名称', trigger: 'blur' }
    ]">
                          <el-input v-model="item.key" placeholder="请输入环境名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item
                          :rules="[
      { required: true, message: '请输入当前环境的域名', trigger: 'blur' }
    ]">
                          <el-input  v-model="item.value" placeholder="请输入当前环境的域名"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4" >
                        <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                   @click="delFormExtraHeadInput(index)">delete
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-alert>
            </div>
            <div>
              <el-button size="mini" type="text" icon="el-icon-plus" @click="addtagListInput">Tag</el-button>
              <el-popover
                placement="top-start"
                title=""
                width="500"
                trigger="hover">
                <el-alert
                  title="参数操作指南"
                  type="info"
                  :closable="false">
                  <template slot='title'>
                    在这儿填写标签Tag
                  </template>
                </el-alert>
                <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
              </el-popover>
            </div>
            <div v-if="tagList && tagList.length > 0">
              <el-alert title="操作提示" type="info" :closable="false" :show-icon="false">
                <template slot='title'>
                  <div v-for="(item,index) in tagList" :key="index">
                    <el-row>
                      <el-col :span="10">
                        <el-form-item
                          :rules="[
      { required: true, message: '请输入标签的名称', trigger: 'blur' }
    ]">
                          <el-input v-model="item.key" placeholder="请输入标签的名称"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item
                          :rules="[
      { required: true, message: '请输入标签的描述', trigger: 'blur' }
    ]">
                          <el-input  v-model="item.value" placeholder="请输入标签的描述"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4" >
                        <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                   @click="deltagListInput(index)">delete
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </el-alert>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitProjectData">确 定</el-button>
  </span>
        </el-dialog>
      </el-row>
      <el-table
        stripe
        :data="projectList"
        style="width: 100%">
        <el-table-column prop="id" label="ID" width="80"></el-table-column>
        <el-table-column prop="projectName" label="工程名称" width="180"></el-table-column>
        <el-table-column prop="basePath" label="基础路劲" width="180"></el-table-column>
        <el-table-column prop="projectType" width="80" label="是否私有" :formatter="formatType"></el-table-column>
        <el-table-column prop="creater" label="创建人" width="80"></el-table-column>
        <el-table-column prop="addTime" label="创建时间" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column prop="upTime" label="更新时间" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="delOneProject(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="openInterfaceList(scope.row)">接口列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.currentPage" :page-sizes="[2,4,10,20]" :page-size="queryInfo.pageSize"
                     layout="total,prev, pager, next, sizes, jumper" :total="total">
      </el-pagination>
    </el-card>
    </div>
</template>

<script>

import moment from 'moment'

export default {
  data () {
    return {
      projectList: {
      },
      queryInfo: {
        creater: 'admin',
        pageSize: 5,
        currentPage: 1
      },
      envList: [
        {
          key: '',
          value: ''
        }
      ],
      tagList: [
        {
          key: '',
          value: ''
        }
      ],
      total: 0,
      projectDialogVisible: false,
      addProjectFormMode: {
        projectName: '',
        basePath: '',
        projectType: true
      },
      projectformRules: {
        projectName: [
          { required: true, message: '请输入工程名称', trigger: 'blur' },
          { min: 1, max: 10, message: '只能输入1-10个字符', trigger: 'blur' }
        ],
        basePath: [
          { required: true, message: '请输入工程的基础路径', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAllProject()
  },
  methods: {
    openInterfaceList (row) {
      this.$router.push({ path: '/iManagement', query: { id: row.id } })
    },
    reSetData () {
      // eslint-disable-next-line no-unused-expressions,no-sequences
      this.addProjectFormMode.projectName = '',
      this.addProjectFormMode.basePath = '',
      this.addProjectFormMode.projectType = true
      // eslint-disable-next-line no-unused-expressions
      this.envList = [
        {
          key: '',
          value: ''
        }
        // eslint-disable-next-line no-sequences
      ],
      this.tagList = [
        {
          key: '',
          value: ''
        }
      ]
    },
    async delOneProject (row) {
      const confirmRes = await this.$confirm('是否永久删除该工程', '删除工程', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmRes)
      if (confirmRes !== 'confirm') {
        return this.$message.info('删除操作取消')
      }
      const { data: res } = await this.$http.get('/project/delOneProject', {
        params: {
          projectType: row.projectType,
          uid: row.uid,
          id: row.id
        }
      })
      if (res.code !== 20000) return this.$message.error('获取工程失败')
      this.$message.success('删除工程成功')
      this.getAllProject()
    },
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getAllProject()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.currentPage = newPage
      this.getAllProject()
    },
    formatDate (row, column) {
      var date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    formatType (row, column) {
      return row.projectType === true ? '是' : row.projectType === false ? '否' : '未设置'
    },
    async getAllProject () {
      const { data: res } = await this.$http.get('/project/queryProject', { params: this.queryInfo })
      if (res.code !== 20000) return this.$message.error('获取工程失败')
      this.total = res.data.total
      const temList = []
      for (const i in res.data.projects) {
        temList.push(res.data.projects[i])
      }
      this.projectList = temList
    },
    submitProjectData () {
      this.$refs.addProjectFormRef.validate(async (valid) => {
        const { data: res } = await this.$http.post('project/createProject', {
          baseData: this.addProjectFormMode,
          env: this.envList,
          tag: this.tagList
        })
        if (res.code !== 20000) return this.$message.error('工程新建失败')
        this.$message.success('工程新建成功')
        this.getAllProject()
      })
      this.projectDialogVisible = false
    },
    deltagListInput (index) {
      this.tagList.splice(index, 1)
    },
    addtagListInput () {
      this.tagList.push({
        key: '',
        value: ''
      })
    },
    delFormExtraHeadInput (index) {
      this.envList.splice(index, 1)
    },
    addExtraInput () {
      this.envList.push({
        key: '',
        value: ''
      })
    },
    showProjectDialog () {
      this.reSetData()
      this.projectDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 20%;
  margin-bottom: 10px;
  margin-top: 30px;
  // background-color: aqua;
}
</style>
