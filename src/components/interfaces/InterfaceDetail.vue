<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工程</el-breadcrumb-item>
      <el-breadcrumb-item>接口详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <template>
            <h1 style="font-weight: lighter">请求</h1>
            <div class="base">
            <el-form :rules="editBaseSettingFormRules" ref="baseInterfaceFormRef" :model="baseInterfaceFormModel">
              <el-form-item label="接口名称" label-width="80px" prop="interfaceName">
                <el-input placeholder="请输入接口名称" v-model="baseInterfaceFormModel.interfaceName"></el-input>
              </el-form-item>
              <el-form-item label="接口协议" label-width="80px">
                <el-select placeholder="请选择协议" v-model="baseInterfaceFormModel.interfaceProtocol">
                  <el-option label="http" value="http"></el-option>
                  <el-option label="https" value="https"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="接口协议" label-width="80px">
                  <el-input   placeholder="请输入path" v-model="baseInterfaceFormModel.interfacePath" class="input-with-select">
                  <el-select v-model="baseInterfaceFormModel.interfaceMethod" slot="prepend" placeholder="请选择" style="width:150px">
                    <el-option label="GET" value="GET"></el-option>
                    <el-option label="POST" value="POST"></el-option>
                    <el-option label="PUT" value="PUT"></el-option>
                    <el-option label="DELETE" value="DELETE"></el-option>
                  </el-select>
                  <el-button slot="append" @click="savaInterfaceData">保存</el-button>
                  <el-button slot="append" @click="runInterfaceData">运行</el-button>
                </el-input>
                </el-form-item>
            </el-form>
            <!-- get param 开始 -->
            <el-tabs style="padding-top: 20px" v-model="activePart">
                  <el-tab-pane label="Params" name="params">
                    <el-form ref="formInline" class="demo-form-inline" label-position="right" label-width='20px'>
                      <div>
                        <el-button size="mini" type="text" icon="el-icon-plus" @click="addExtraInput">Query Params</el-button>
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
                              请根据不同的请求类型,填写不同格式的数据
                            </template>
                          </el-alert>
                          <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
                        </el-popover>
                      </div>
                      <div v-if="extraList && extraList.length > 0">
                        <el-alert title="" type="info" :closable="false" :show-icon="false">
                          <template slot='title'>
                            <div v-for="(item,index) in extraList" :key="index">
                              <el-row>
                                <el-col :span="5">
                              <el-form-item
                                :rules="[
      { required: true, message: '请输入key', trigger: 'blur' }
    ]">
                                <el-input v-model="item.key" placeholder="key"></el-input>
                              </el-form-item>
                                </el-col>
                                <el-col :span="15">
                              <el-form-item
                                :rules="[
      { required: true, message: '请输入value值', trigger: 'blur' }
    ]">
                                <el-input  v-model="item.value" placeholder="value"></el-input>
                              </el-form-item>
                                </el-col>
                                <el-col :span="4" >
                              <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                         @click="delExtraInput(index)">delete
                              </el-button>
                                </el-col>
                              </el-row>
                            </div>
                          </template>
                        </el-alert>
                      </div>
                    </el-form>
                  </el-tab-pane>
                  <!-- get parms结束 -->
                  <el-tab-pane label="Header" name="header">
                    <!-- 控制头部信息开始 -->
                    <el-form ref="formInline" class="demo-form-inline" label-position="right" label-width='20px'>
                      <div>
                        <el-button size="mini" type="text" icon="el-icon-plus" @click="addExtraHeadInput">Headers</el-button>
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
                              请根据不同的请求类型,填写不同格式的数据！！
                            </template>
                          </el-alert>
                          <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
                        </el-popover>
                      </div>
                      <div v-if="extraHeadList && extraHeadList.length > 0">
                        <el-alert title="" type="info" :closable="false" :show-icon="false">
                          <template slot='title'>
                            <div v-for="(item,index) in extraHeadList" :key="index">
                              <el-row>
                                <el-col :span="5">
                                  <el-form-item
                                    :rules="[
      { required: true, message: '请输入key', trigger: 'blur' }
    ]">
                                    <el-input v-model="item.key" placeholder="key"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="15">
                                  <el-form-item
                                    :rules="[
      { required: true, message: '请输入value值', trigger: 'blur' }
    ]">
                                    <el-input  v-model="item.value" placeholder="value"></el-input>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="4" >
                                  <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                             @click="delExtraHeadInput(index)">delete
                                  </el-button>
                                </el-col>
                              </el-row>
                            </div>
                          </template>
                        </el-alert>
                      </div>
                    </el-form>
                    <!-- 控制头部信息结束 -->
                  </el-tab-pane>
                  <el-tab-pane label="Body" name="body">
                    <el-tabs  type="border-card" v-model="activeName">
                      <!-- 这是post请求，formdata数据格式开始 -->
                      <el-tab-pane label="form-data" name="form-data">
                        <el-form ref="formInline" class="demo-form-inline" label-position="right" label-width='20px'>
                      <div>
                        <el-button size="mini" type="text" icon="el-icon-plus" @click="addPostParam()">Params</el-button>
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
                              post请求，formdata格式
                            </template>
                          </el-alert>
                          <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
                        </el-popover>
                      </div>
                      <div v-if="extraParams && extraParams.length > 0">
                        <el-alert title="" type="info" :closable="false" :show-icon="false">
                          <template slot='title'>
                            <div v-for="(item,index) in extraParams" :key="index">
                              <el-row>
                                <el-col :span="5">
                              <el-form-item
                                :rules="[
      { required: true, message: '请输入key', trigger: 'blur' }
    ]">
                                <el-input v-model="item.key" placeholder="key"></el-input>
                              </el-form-item>
                                </el-col>
                                <el-col :span="15">
                              <el-form-item
                                :rules="[
      { required: true, message: '请输入value值', trigger: 'blur' }
    ]">
                                <el-input  v-model="item.value" placeholder="value"></el-input>
                              </el-form-item>
                                </el-col>
                                <el-col :span="4" >
                              <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                         @click="delPostParam(index)">delete
                              </el-button>
                                </el-col>
                              </el-row>
                            </div>
                          </template>
                        </el-alert>
                      </div>
                    </el-form>
                      </el-tab-pane>
                       <!-- 这是post请求，formdata数据格式结束 -->
                      <el-tab-pane label="x-xxx-form-urlencoded" name="x-xxx-form-urlencoded">
                        <el-form ref="formInline" class="demo-form-inline" label-position="right" label-width='20px'>
                          <div>
                            <el-button size="mini" type="text" icon="el-icon-plus" @click="addUrlencoded()">key/value</el-button>
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
                                  请根据不同的请求类型,填写不同格式的数据，需要自己做判断！
                                </template>
                              </el-alert>
                              <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
                            </el-popover>
                          </div>
                          <div v-if="urlencoded && urlencoded.length > 0">
                            <el-alert title="" type="info" :closable="false" :show-icon="false">
                              <template slot='title'>
                                <div v-for="(item,index) in urlencoded" :key="index">
                                  <el-row>
                                    <el-col :span="5">
                                      <el-form-item
                                        :rules="[
      { required: true, message: '请输入key', trigger: 'blur' }
    ]">
                                        <el-input v-model="item.key" placeholder="key"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="15">
                                      <el-form-item
                                        :rules="[
      { required: true, message: '请输入value值', trigger: 'blur' }
    ]">
                                        <el-input  v-model="item.value" placeholder="value"></el-input>
                                      </el-form-item>
                                    </el-col>
                                    <el-col :span="4" >
                                      <el-button type="text" icon="el-icon-delete" style="color: #F56C6C; margin-left: 20px"
                                                 @click="delUrlencoded(index)">delete
                                      </el-button>
                                    </el-col>
                                  </el-row>
                                </div>
                              </template>
                            </el-alert>
                          </div>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="raw" name="raw" width="100%">
                          <b-code-editor
                          v-if="true"
                           v-model="jsonData"
                           theme="idea"
                           height="auto"
                           :indent-unit="4"
                          >
                          </b-code-editor>
                      </el-tab-pane>
                      <el-tab-pane label="none" name="none" class="none">
                        <span  class="el-upload__tip">当前请求没有请求体</span>
                      </el-tab-pane>
                    </el-tabs>
                  </el-tab-pane>
                  <el-tab-pane label="Test" name="test">
                    121
                  </el-tab-pane>
                  <el-tab-pane label="Response" name="response">
                    <b-code-editor
                          :key="new Date().getTime()"
                           v-model="responseData"
                           readonly
                           theme="idea"
                           height="auto"
                           :indent-unit="4"
                          >
                          </b-code-editor>
                  </el-tab-pane>
                </el-tabs>
        </div>
      </template>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="()=>{}">
      <span>response</span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['projectId'])
  },
  data () {
    return {
      jsonData: '',
      responseData: '',
      dialogVisible: false,
      template: { tempSource: '' },
      extraHeadList: [],
      extraParams: [],
      extraList: [],
      urlencoded: [],
      baseInterfaceFormModel: {
        id: this.$route.query.id,
        interfaceName: '',
        interfaceProtocol: 'http',
        interfacePath: '',
        interfaceMethod: 'GET'
      },
      activeName: 'raw',
      activePart: 'params',
      editBaseSettingFormRules: {
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
    if (this.$route.query.id) {
      this.isAble = true
      this.getInterfaceDate()
    } else {
      this.getDefaultHeaders()
    }
  },
  methods: {
    async getDefaultHeaders () {
      const { data: res } = await this.$http.get('/interface/generateDefaultHeaders')
      this.extraHeadList = res.data
    },
    async getInterfaceDate () {
      const { data: res } = await this.$http.get('/interface/getOneInterface', {
        params: {
          id: this.$route.query.id
        }
      })
      if (res.code === 40039) { return this.$message.error('接口获取失败') }
      this.baseInterfaceFormModel.interfaceName = res.data.name
      this.baseInterfaceFormModel.interfaceProtocol = res.data.procotol
      this.baseInterfaceFormModel.interfacePath = res.data.path
      this.baseInterfaceFormModel.interfaceMethod = res.data.method
      this.extraList = res.data.params
      this.jsonData = res.data.body
      this.urlencoded = res.data.uforms
      this.extraHeadList = res.data.headers
      this.extraParams = res.data.extraParams
    },
    async runInterfaceData () {
      this.activePart = 'response'
      if (typeof this.baseInterfaceFormModel.id === 'undefined') {
        return this.$message.error('先保存，再运行')
      }
      const { data: res } = await this.$http.get('/interface/runInterface', {
        params: {
          id: this.baseInterfaceFormModel.id,
          projectId: this.projectId
        }
      })
      console.log(res.data.response)
      this.responseData = res.data.response
    },
    handClose () {
      this.dialogVisible = false
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    savaInterfaceData () {
      this.$refs.baseInterfaceFormRef.validate(async (valid) => {
        const { data: res } = await this.$http.post('interface/addInterface', {
          baseData: this.baseInterfaceFormModel,
          params: this.extraList,
          body: this.jsonData,
          headers: this.extraHeadList,
          projectId: this.projectId,
          activeName: this.activeName,
          extraParams: this.extraParams,
          urlencoded: this.urlencoded,
          extraFormList: this.extraFormList
        })
        if (res.code === 40036) return this.$message.error('新增接口时，接口名称不可重复')
        if (res.code === 20000) return this.$message.success('保存成功')
      })
      if (typeof this.baseInterfaceFormModel.id === 'undefined') {
        this.getInterfaceDate()
        return this.$router.push({ path: '/iManagement' })
      }
      this.getInterfaceDate()
    },
    addExtraInput () {
      this.extraList.push({
        key: '',
        value: ''
      })
    },
    // x-xxx-form-urlencoded
    addFormExtraInput () {
      this.extraParams.push({
        key: '',
        value: ''
      })
    },
    addPostParam () {
      this.extraParams.push({
        key: '',
        value: ''
      })
    },
    addExtraHeadInput () {
      this.extraHeadList.push({
        key: '',
        value: ''
      })
    },
    addUrlencoded () {
      this.urlencoded.push({
        key: '',
        value: ''
      })
    },
    delExtraInput (index) {
      this.extraList.splice(index, 1
      )
    },
    delUrlencoded (index) {
      this.urlencoded.splice(index, 1
      )
    },
    delPostParam (index) {
      this.extraParams.splice(index, 1)
    },
    delExtraHeadInput (index) {
      this.extraHeadList.splice(index, 1)
    },
    delFormExtraHeadInput (index) {
      this.extraFormList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.base {
  background-color: #dddddd;
  border-radius: 15px;
  background: rgba(40%,40%,40%,0.09);
  padding: 15px;
}

input .el-input-group__prepend {
  padding: inherit;
}
/deep/ .el-alert__content {
  width: 100%;
}
.none {
  text-align: center;
  span {
    color: #dddddd;
  }
}
</style>
