<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>测试集</el-breadcrumb-item>
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
              <el-form-item label="选择分类" label-width="80px" prop="interfaceType">
                <el-select placeholder="请选择分类" v-model="baseInterfaceFormModel.region">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="接口路径" label-width="80px" prop="interfacePath">
                <el-input placeholder="请输入请求地址" v-model="baseInterfaceFormModel.path" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 200px" id="c">
                  <el-option label="GET" value="1"></el-option>
                  <el-option label="POST" value="2"></el-option>
                  <el-option label="PUT" value="3"></el-option>
                  <el-option label="DELETE" value="4"></el-option>
                </el-select>
                  <el-button slot="append" @click="savaInterfaceData">保存</el-button>
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
                  <el-tab-pane label="Headers" name="second">
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
                  <el-tab-pane label="Body" name="third">请求体</el-tab-pane>
                  <el-tab-pane label="Test" name="fourth">测试</el-tab-pane>
                </el-tabs>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
      baseInterfaceFormModel: {
        interfaceName: '',
        region: '',
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
        ],
        interfaceType: [
          {
            required: true,
            message: '请选择接口分类',
            trigger: 'blur'
          }
        ],
        interfacePath: [
          {
            required: true,
            message: '请输入接口路径',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    savaInterfaceData () {
      this.$refs.baseInterfaceFormRef.validate(async (valid) => {
      })
    },
    addExtraInput () {
      this.extraList.push({
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
