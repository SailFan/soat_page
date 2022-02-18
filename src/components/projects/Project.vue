<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试集</el-breadcrumb-item>
      <el-breadcrumb-item>测试集管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-button type="primary" @click="showProjectDialog">新增测试集合</el-button>
        <el-dialog
          title="新增测试集合"
          :visible.sync="projectDialogVisible"
          width="40%"
          :before-close="handleClose">
          <el-form ref="addProjectFormRef" :model="addProjectFormMode" label-width="80px" :rules="projectformRules">
            <el-form-item label="名称" prop="projectName">
              <el-input v-model="addProjectFormMode.projectName" placeholder="请输入测试集名称"></el-input>
            </el-form-item>
            <el-form-item label="公共路径" prop="basePath">
              <el-input v-model="addProjectFormMode.basePath" placeholder="请输入该测试集合的基础URL"></el-input>
            </el-form-item>
            <el-form-item label="是否私密">
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
    </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
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
      projectDialogVisible: false,
      addProjectFormMode: {
        projectName: '',
        basePath: '',
        projectType: true
      },
      projectformRules: {
        projectName: [
          { required: true, message: '请输入测试集合名称', trigger: 'blur' },
          { min: 1, max: 10, message: '只能输入1-10个字符', trigger: 'blur' }
        ],
        basePath: [
          { required: true, message: '请输入测试集合的基础路径', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    submitProjectData () {
      this.$refs.addProjectFormRef.validate(async (valid) => {
        const { data: res } = await this.$http.post('project/createProject', {
          baseData: this.addProjectFormMode,
          env: this.envList,
          tag: this.tagList
        })
        if (res.code !== 20000) return this.$message.error('测试集合新建失败')
        this.$message.success('测试集合新建成功')
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
      this.projectDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
