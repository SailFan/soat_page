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
                <el-select placeholder="请选择协议" v-model="baseInterfaceFormModel.protocol">
                  <el-option label="Post" value="Post"></el-option>
                  <el-option label="Get" value="Get"></el-option>
                  <el-option label="Delete" value="Delete"></el-option>
                  <el-option label="Update" value="Update"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接口路径" label-width="80px">
                <el-input placeholder="请输入请求地址" v-model="baseInterfaceFormModel.path" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 200px" id="c">
                  <el-option label="GET" value="1"></el-option>
                  <el-option label="POST" value="2"></el-option>
                  <el-option label="PUT" value="3"></el-option>
                  <el-option label="DELETE" value="4"></el-option>
                </el-select>
                  <el-button slot="append" @click="savaInterfaceData">保存</el-button>
                  <el-button slot="append" @click="runInterfaceData">运行</el-button>
              </el-input>
              </el-form-item>
            </el-form>
                <el-tabs style="padding-top: 20px">
                  <el-tab-pane label="Params" name="first">
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
                              请根据不同的请求类型,填写不同格式的数据，需要自己做判断，我这个半吊子水前端做不了这些！！
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
                  <el-tab-pane label="Form" name="second">
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
                              请根据不同的请求类型,填写不同格式的数据，需要自己做判断，我这个半吊子水前端做不了这些！！
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
                  </el-tab-pane>
                  <el-tab-pane label="Body" name="third">
                    <el-tabs  type="border-card" v-model="activeName">
                      <el-tab-pane label="file" name="first">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-remove="beforeRemove"
                          multiple
                          :limit="3"
                          :on-exceed="handleExceed"
                          :file-list="fileList">
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                      </el-tab-pane>
                      <el-tab-pane label="form" name="second">
                        <el-form ref="formInline" class="demo-form-inline" label-position="right" label-width='20px'>
                          <div>
                            <el-button size="mini" type="text" icon="el-icon-plus" @click="addFormExtraInput">raw</el-button>
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
                                  请根据不同的请求类型,填写不同格式的数据，需要自己做判断，我这个半吊子水前端做不了这些！！
                                </template>
                              </el-alert>
                              <i slot="reference" style="margin-left: 5px" class="el-icon-info"></i>
                            </el-popover>
                          </div>
                          <div v-if="extraFormList && extraFormList.length > 0">
                            <el-alert title="" type="info" :closable="false" :show-icon="false">
                              <template slot='title'>
                                <div v-for="(item,index) in extraFormList" :key="index">
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
                                                 @click="delFormExtraHeadInput(index)">delete
                                      </el-button>
                                    </el-col>
                                  </el-row>
                                </div>
                              </template>
                            </el-alert>
                          </div>
                        </el-form>
                      </el-tab-pane>
                      <el-tab-pane label="json" name="third" width="100%">
                          <b-code-editor
                          v-if="1<2"
                          v-model="jsonData"
                           theme="mdn-like"
                           height="auto"
                           :indent-unit="4"
                          >
                          </b-code-editor>
                      </el-tab-pane>
                      <el-tab-pane label="raw" name="fourth">
                        <el-input
                          type="textarea"
                          :rows="10"
                          v-model="textarea_raw"
                          :smart-indent="true">
                        </el-input>
                      </el-tab-pane>
                    </el-tabs>
                  </el-tab-pane>
                  <el-tab-pane label="Test" name="fourth">Test</el-tab-pane>
                </el-tabs>
        </div>
      </template>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <span>response</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      textarea_raw: {},
      template: { tempSource: '' },
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      extraList: [
        {
          key: '',
          value: ''
        }
      ],
      extraHeadList: [
        {
          key: '',
          value: ''
        }
      ],
      extraFormList: [
        {
          key: '',
          value: ''
        }
      ],
      baseInterfaceFormModel: {
        interfaceName: '',
        protocol: 'Get',
        path: ''
      },
      activeName: 'first',
      select: '',
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
  methods: {
    handClose () {
      this.dialogVisible = false
    },
    runInterfaceData () {
      this.dialogVisible = true
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
        const { data: res } = await this.$http.post('interfaceApi/insertInterface', {
          baseData: this.baseInterfaceFormModel,
          params: this.extraList,
          headers: this.extraHeadList
        })
        if (res.code !== 20000) return this.$message.error('接口保存失败')
        this.$message.success('接口保存成功')
      })
    },
    addExtraInput () {
      this.extraList.push({
        key: '',
        value: ''
      })
    },
    addFormExtraInput () {
      this.extraFormList.push({
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
    delExtraInput (index) {
      this.extraList.splice(index, 1)
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
</style>
